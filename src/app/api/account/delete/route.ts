import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * POST /api/account/delete
 *
 * Deletes the authenticated user's account.
 *
 * Flow:
 *   1. Verify auth via getUser() server-side → 401 if unauthenticated
 *   2. Instantiate service_role client → clean avatars Storage bucket
 *   3. Call auth.admin.deleteUser() → returns { ok: true } on success
 *   4. Any Supabase error → { error: string } with status 500
 *
 * signOut() is NOT called here — handled client-side after receiving 200.
 */
export async function POST(): Promise<Response> {
  // ── Step 1: Auth verification ─────────────────────────────────────────────
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId: string = user.id

  // ── Step 2: Service role client ──────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('[account/delete] Missing Supabase env vars for admin client')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  const admin = createServiceClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })

  // ── Step 3: Cleanup Storage files ──────────────────────────────────────
  // Attempt to remove avatar files for this user.
  // Errors here are logged but do NOT block the account deletion —
  // we must never leave the user orphaned in auth.users.
  try {
    const { data: files, error: listError } = await admin.storage
      .from('avatars')
      .list(userId)

    if (!listError && files && files.length > 0) {
      const pathsToRemove = files.map((f) => `${userId}/${f.name}`)
      await admin.storage.from('avatars').remove(pathsToRemove)
    }
  } catch (storageErr) {
    // Log but do not fail — cleanup is best-effort
    console.warn('[account/delete] Storage cleanup failed:', storageErr)
  }

  // ── Step 4: Delete user from auth.users ──────────────────────────────────
  // This triggers ON DELETE CASCADE on tables that reference auth.users(id).
  // The data_engineer must ensure profiles.id → auth.users(id) has CASCADE.
  try {
    const { error: deleteError } = await admin.auth.admin.deleteUser(userId)

    if (deleteError) {
      console.error('[account/delete] Failed to delete user:', deleteError)
      return NextResponse.json(
        { error: deleteError.message ?? 'Failed to delete account' },
        { status: 500 }
      )
    }
  } catch (err) {
    console.error('[account/delete] Unexpected error during deleteUser:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }

  // ── Step 5: Success ──────────────────────────────────────────────────────
  // signOut() is intentionally NOT called here.
  // The client (UserProfileModal) handles signOut + router.push('/') after 200.
  return NextResponse.json({ ok: true }, { status: 200 })
}
