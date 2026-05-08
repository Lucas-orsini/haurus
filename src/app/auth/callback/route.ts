import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * OAuth callback handler — exchanges the authorization code for a session.
 *
 * Flow:
 *   1. Extract `code` and `next` from the URL query parameters.
 *   2. If no code, redirect to /auth/auth-code-error immediately.
 *   3. Create a server-side Supabase client and call exchangeCodeForSession(code).
 *      This writes the session into an HTTP-only cookie via @supabase/ssr.
 *   4. If exchange fails, redirect to /auth/auth-code-error.
 *   5. Otherwise, redirect to `next` (validated as relative path) or /dashboard.
 *
 * Handles x-forwarded-host/x-forwarded-proto for deployments behind a reverse
 * proxy (Vercel, Cloudflare, Nginx, etc.), ensuring the final redirect URL uses
 * the correct protocol and domain.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)

  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/dashboard'

  // Guard: must have a code to exchange.
  if (!code) {
    const origin = url.origin
    return NextResponse.redirect(new URL('/auth/auth-code-error', origin))
  }

  // Guard: `next` must be a relative path to prevent open-redirect attacks.
  // Only paths starting with '/' are allowed; external URLs are rejected.
  const safeNext = next.startsWith('/') ? next : '/dashboard'

  // Create server-side Supabase client (reads/writes HTTP-only cookies).
  const supabase = await createClient()

  // Exchange the OAuth code for a session. This writes the session cookie
  // via the cookie store configured in createClient().
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    console.error('[OAuth callback] Code exchange failed:', exchangeError.message)
    const origin = url.origin
    return NextResponse.redirect(new URL('/auth/auth-code-error', origin))
  }

  // Build the final redirect URL.
  // In production (Vercel / reverse proxy), x-forwarded-host carries the real
  // domain and x-forwarded-proto carries the protocol (https).
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto')

  if (forwardedHost) {
    // Production: use the forwarded host and protocol to construct the base URL.
    // This ensures the redirect lands on the correct domain even behind a proxy.
    const baseUrl = `${forwardedProto ?? 'https'}://${forwardedHost}`
    return NextResponse.redirect(new URL(safeNext, baseUrl))
  }

  // Local development: use the request origin directly.
  return NextResponse.redirect(new URL(safeNext, url.origin))
}
