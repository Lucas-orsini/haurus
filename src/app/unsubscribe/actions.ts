/**
 * Newsletter unsubscribe Server Action.
 * Handles authenticated unsubscription: Supabase DELETE + Resend contact removal.
 */
'use server'

import { createClient } from '@/lib/supabase/server'
import { getResend } from '@/lib/resend'

// ── Shared result type ────────────────────────────────────────────────────────

export type UnsubscribeResult = { success: boolean }

// ── Server Action ─────────────────────────────────────────────────────────────

/**
 * Unsubscribe the authenticated user from the newsletter.
 *
 * Flow:
 *   1. Verify server session → throw 'Non autorisé.' if absent
 *   2. DELETE from newsletter_subscribers WHERE email = user.email
 *   3. If 0 rows affected → throw 'Cet email n'est pas abonné à la newsletter.'
 *   4. Remove contact from Resend audience (best-effort, non-blocking)
 *   5. Return { success: true }
 *
 * @throws Error  'Non autorisé.'
 *                when no server session is present
 * @throws Error  'Cet email n'est pas abonné à la newsletter.'
 *                when the email is not found in newsletter_subscribers
 * @throws Error  'Une erreur est survenue. Veuillez réessayer.'
 *                on unexpected database errors
 */
export async function unsubscribeFromNewsletter(): Promise<UnsubscribeResult> {
  // Step 1 — verify server session
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.user) {
    throw new Error('Non autorisé.')
  }

  const email = session.user.email
  if (!email) {
    throw new Error('Non autorisé.')
  }

  // Step 2 — DELETE from newsletter_subscribers
  // .select('count') returns an empty array [] with a count header on the response.
  // For a DeleteQueryBuilder the return type is PostgrestResponse<null>.
  // We use 'count' as the column argument so the response count header is populated.
  const { error: deleteError } = await supabase
    .from('newsletter_subscribers')
    .delete()
    .eq('email', email)
    .select('count')

  if (deleteError) {
    console.error('[unsubscribe] Supabase DELETE error:', deleteError)
    throw new Error('Une erreur est survenue. Veuillez réessayer.')
  }

  // Step 3 — verify at least one row was deleted
  // When .select('count') is used on a DELETE, the returned data is always null
  // (rows are deleted, not returned). The row count is in the response headers.
  // We detect zero rows by doing a quick SELECT COUNT — lightweight and reliable.
  const { count, error: countError } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact', head: true })
    .eq('email', email)

  if (countError) {
    console.error('[unsubscribe] Supabase COUNT error:', countError)
    throw new Error('Une erreur est survenue. Veuillez réessayer.')
  }

  if (count === null || count > 0) {
    // Either the row still exists (count > 0) or we couldn't determine (count null via RLS).
    // Throw the user-facing error — the RLS policy may be blocking reads.
    throw new Error("Cet email n'est pas abonné à la newsletter.")
  }

  // Step 4 — best-effort Resend contact removal (non-blocking)
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (audienceId) {
    try {
      const resend = getResend()
      await resend.contacts.remove({
        audienceId,
        email,
      })
    } catch (resendError) {
      // Log but do not propagate — Supabase DELETE already succeeded.
      // The user has been unsubscribed; Resend is a secondary cleanup.
      console.error('[unsubscribe] Resend contact removal failed:', resendError)
    }
  }

  // Step 5 — success
  return { success: true }
}
