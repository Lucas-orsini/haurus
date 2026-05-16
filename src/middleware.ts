/**
 * Edge middleware — refreshes Supabase session cookies on every request,
 * and protects authenticated routes by redirecting to /login when no session.
 *
 * Also reads the NEXT_LOCALE cookie and passes the detected locale to
 * downstream handlers via the x-locale request header so that the dashboard
 * layout can render in the correct language without re-reading the cookie.
 *
 * Protects all routes under (app)/ only.
 * Auth pages (login, signup) are NOT in (app)/ so they pass through freely.
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Telegram webhook — HMAC-based auth handled by the handler itself ──
  if (pathname.startsWith('/api/telegram/webhook')) {
    return NextResponse.next({ request })
  }

  // ── Locale detection from cookie ─────────────────────────────────────────
  // Read NEXT_LOCALE from cookies. If absent or invalid, fall back to 'fr'.
  // Inject x-locale into the request headers so Server Components can use it
  // without re-reading the cookie (avoids cookie re-read on the server side).
  const LOCALE_COOKIE = 'NEXT_LOCALE'
  const DEFAULT_LOCALE = 'fr'
  const SUPPORTED_LOCALES = ['fr', 'en'] as const

  const rawLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const detectedLocale =
    rawLocale && (SUPPORTED_LOCALES as readonly string[]).includes(rawLocale)
      ? (rawLocale as typeof DEFAULT_LOCALE)
      : DEFAULT_LOCALE

  // Clone the request and set the locale header on the clone.
  // We cannot mutate request.headers directly in Edge runtime.
  const requestWithLocale = request.clone()
  requestWithLocale.headers.set('x-locale', detectedLocale)

  // ── Auth guard for protected routes ─────────────────────────────────────
  const PROTECTED_PREFIXES = ['/dashboard', '/settings', '/api']
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))

  if (!isProtected) {
    // Fast path — set x-locale even on non-protected routes, then pass through
    const response = NextResponse.next({ request: requestWithLocale })
    response.headers.set('x-locale', detectedLocale)
    return response
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
  let supabaseResponse = NextResponse.next({ request: requestWithLocale })

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

  // Pass the detected locale to the response so downstream Server Components
  // can read it without re-parsing the cookie
  supabaseResponse.headers.set('x-locale', detectedLocale)

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
