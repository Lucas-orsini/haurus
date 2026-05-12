import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * OAuth callback handler — exchanges the authorization code for a session.
 *
 * Flow:
 *   1. Supabase redirects the browser here with ?code=xxx&next=/dashboard
 *   2. This handler exchanges the code for a session cookie (via exchangeCodeForSession)
 *   3. Upserts a profiles row (role: 'user') so Google users have a profile row,
 *      matching the behaviour of the email/password signup() flow.
 *   4. Fire-and-forget POST to /api/newsletter/subscribe (never blocks the redirect).
 *   5. Redirects to /dashboard on success, or /auth/auth-code-error on failure
 *
 * Steps 3 and 4 are non-blocking: if they fail (e.g. transient DB error),
 * the redirect still proceeds — the OAuth flow must never be blocked.
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

  // exchangeCodeForSession returns the full session object — extract user from it
  // to avoid a second round-trip to fetch the authenticated identity.
  const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('[auth/callback] exchangeCodeForSession failed:', error.message)
    const origin = url.origin
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const user = sessionData?.user

  // Non-blocking profile upsert — mirrors signup() pattern (auth.ts lines 214-228).
  // Idempotent via onConflict: 'id'; a pre-existing profile is left intact
  // (e.g. admin-promoted plan, name, etc. are preserved).
  if (user?.id) {
    try {
      const { error: profileError } = await supabase.from('profiles').upsert(
        {
          id: user.id,
          role: 'user',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      if (profileError) {
        console.error('[auth/callback] Failed to upsert profile:', profileError)
      }
    } catch (err) {
      // Catch any unexpected error (network, serialization, etc.) — never block the redirect.
      console.error('[auth/callback] Unexpected error during profile upsert:', err)
    }
  }

  // Fire-and-forget newsletter subscription via server-side Route Handler.
  // Uses upsert on email to handle re-signups without duplicates.
  // Payload includes subscribed: true for consistency with the email/password signup() flow.
  // Errors are swallowed silently — the OAuth redirect must never be blocked.
  const userEmail = user?.email
  if (userEmail) {
    fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail }),
    }).catch(() => {})
  }

  // Success — redirect to the intended destination.
  const origin = url.origin
  return NextResponse.redirect(`${origin}${redirectTarget}`)
}
