/**
 * Edge middleware — refreshes Supabase session cookies on every request,
 * and protects authenticated routes by redirecting to /login when no session.
 *
 * Protects all routes under (app)/ only.
 * Auth pages (login, signup) are NOT in (app)/ so they pass through freely.
 *
 * Development bypass: set DEV_BYPASS_AUTH=true in .env.local to skip auth
 * checks during local development (useful when auth is not yet implemented).
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Development auth bypass — never active in production
  const devBypass = process.env.DEV_BYPASS_AUTH === 'true'
  if (devBypass) {
    return NextResponse.next({ request })
  }

  // Routes to protect — only (app) group routes require authentication
  const PROTECTED_PREFIXES = ['/dashboard', '/settings', '/api']
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))

  // Allow all non-protected routes through without session check
  if (!isProtected) {
    return NextResponse.next({ request })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Fail-safe: if env vars are missing, redirect to /login rather than
  // silently letting everyone through (critical auth bypass prevention)
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      '[Middleware] Supabase env vars missing — redirecting to /login'
    )
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url, 302)
  }

  // Mutable response object — must be the one returned at the end
  // so that cookie updates set by setAll are propagated
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        // Propagate refreshed cookies to the request (for downstream handlers)
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set({ name, value, ...options })
        )
        // Propagate refreshed cookies to the response
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // getUser() triggers a network revalidation — unlike getSession(),
  // it checks the token is still valid with the Supabase server
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url, 302)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - image and font assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)$).*)',
  ],
}
