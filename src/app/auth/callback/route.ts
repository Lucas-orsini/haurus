import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * OAuth callback handler — exchanges the authorization code for a session.
 *
 * Flow:
 *   1. Supabase redirects the browser here with ?code=xxx&next=/dashboard
 *   2. This handler exchanges the code for a session cookie (via exchangeCodeForSession)
 *   3. Redirects to /dashboard on success, or /auth/auth-code-error on failure
 *
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/dashboard'

  // Guard: a code must always be present in a valid OAuth callback.
  if (!code) {
    const origin = url.origin
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  // Ensure the 'next' redirect target is a safe relative path.
  const redirectTarget = next.startsWith('/') ? next : '/dashboard'

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('[auth/callback] exchangeCodeForSession failed:', error.message)
    const origin = url.origin
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  // Success — redirect to the intended destination.
  const origin = url.origin
  return NextResponse.redirect(`${origin}${redirectTarget}`)
}
