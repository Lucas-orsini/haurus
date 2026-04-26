/**
 * Edge middleware — refreshes Supabase session cookies on every request,
 * and handles authentication redirects.
 *
 * - Unauthenticated users accessing /dashboard/* → redirect to /login with redirectTo param
 * - Authenticated users accessing /login or /signup → redirect to /dashboard/overview
 * - All other routes pass through freely.
 *
 * Uses createServerClient from @supabase/ssr (Edge-compatible).
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Auth pages — check session and redirect if already authenticated
  const isAuthPage =
    pathname === '/login' ||
    pathname === '/signup'

  // Dashboard routes — protect with session check
  const isProtectedRoute = pathname.startsWith('/dashboard/')

  // If neither auth page nor protected route, pass through
  if (!isAuthPage && !isProtectedRoute) {
    return NextResponse.next({ request })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Fail-safe: if env vars are missing, redirect to /login
  // This prevents critical auth bypass
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      '[Middleware] Supabase env vars missing — redirecting to /login'
    )
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url, 302)
  }

  // Mutable response — must be the one returned so cookie updates propagate
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        // Propagate refreshed cookies to downstream handlers via request
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

  // getUser() validates token with Supabase server — more secure than getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ── Auth page logic: redirect if already logged in ────────────────────────
  if (isAuthPage) {
    if (user) {
      // User is authenticated → redirect to /dashboard/overview
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard/overview'
      return NextResponse.redirect(url, 302)
    }
    // Not authenticated on auth page → allow through to login/signup
    return supabaseResponse
  }

  // ── Protected route logic: redirect if not authenticated ─────────────────
  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // Preserve the original path so user is redirected after login
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url, 302)
  }

  // Authenticated user accessing protected route → allow through
  return supabaseResponse
}

export const config = {
  matcher: [
    // Match /dashboard routes with any sub-path
    '/dashboard/:path*',
    // Match auth pages
    '/login',
    '/signup',
    // Exclude static files and image optimization
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)$).*)',
  ],
}
