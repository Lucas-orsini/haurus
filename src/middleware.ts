/**
 * Edge middleware — refreshes Supabase session cookies on every request,
 * and protects authenticated routes by redirecting to /login when no session.
 *
 * Also manages the NEXT_LOCALE cookie: if no locale cookie is present,
 * sets it to the default locale ('en'). This ensures the locale is always
 * available for the root layout's lang attribute and the LocaleProvider.
 *
 * Protects all routes under (app)/ only.
 * Auth pages (login, signup) are NOT in (app)/ so they pass through freely.
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_COOKIE_NAME, DEFAULT_LOCALE } from '@/lib/i18n/config'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Telegram webhook uses its own HMAC-based authentication (X-Telegram-Bot-Api-Secret-Token header).
  // Bypass auth check — the handler at /api/telegram/webhook validates the signature itself.
  if (pathname.startsWith('/api/telegram/webhook')) {
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

  // ── Locale cookie management ─────────────────────────────────────────────
  // If no locale cookie is present, set the default locale.
  // This ensures the HTML lang attribute and LocaleProvider always have a valid locale.
  const localeCookie = request.cookies.get(LOCALE_COOKIE_NAME)
  if (!localeCookie) {
    supabaseResponse.cookies.set(LOCALE_COOKIE_NAME, DEFAULT_LOCALE, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
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
