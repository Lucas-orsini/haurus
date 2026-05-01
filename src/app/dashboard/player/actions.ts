'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { PLAN_LIMITS, type PlanKey } from '@/config/planLimits'

/**
 * Shape of a tracked player row returned to the client.
 */
export type TrackedPlayerRow = {
  player_name: string
  added_at: string
  locked_until: string
}

/**
 * Shape of a row from tracked_players_history.
 */
type HistoryRow = {
  action: string
  player_name: string
}

/**
 * GET — read all tracked players for a given user.
 * Returns rows ordered by added_at ascending.
 */
export async function getTrackedPlayers(
  userId: string
): Promise<TrackedPlayerRow[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tracked_players')
    .select('player_name, added_at, locked_until')
    .eq('user_id', userId)
    .order('added_at', { ascending: true })

  if (error) {
    console.error('[actions] getTrackedPlayers error:', error)
    return []
  }

  return (data as TrackedPlayerRow[]) ?? []
}

/**
 * POST — add a player to the user's tracked list.
 *
 * Business logic:
 *  1. Resolve plan → PLAN_LIMITS[plan]
 *  2. Count current tracked players; if count >= limit (and limit !== Infinity) → LIMIT_REACHED
 *  3. Check for duplicate entry → ALREADY_TRACKED
 *  4. Call RPC get_next_month_first_day() to get locked_until
 *  5. INSERT tracked_players
 *  6. INSERT tracked_players_history(action = 'added')
 *  7. revalidatePath
 *
 * Note: locked_until is ALWAYS inserted even when lockDays: false.
 * The lock value simply won't be displayed or used for blocking.
 */
export async function addTrackedPlayer(
  userId: string,
  playerName: string
): Promise<{ success: true } | { error: 'LIMIT_REACHED' | 'ALREADY_TRACKED' | string }> {
  const supabase = await createClient()

  // 1 — Resolve user's plan
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', userId)
    .single()

  if (profileError || !profileData) {
    console.error('[actions] addTrackedPlayer — failed to read profile:', profileError)
    return { error: 'Profile not found' }
  }

  const plan = (profileData.plan ?? 'free') as PlanKey
  const limits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free

  // 2 — Count current tracked players and check limit
  const { count, error: countError } = await supabase
    .from('tracked_players')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (countError) {
    console.error('[actions] addTrackedPlayer — failed to count:', countError)
    return { error: 'Internal error' }
  }

  const currentCount = count ?? 0
  if (limits.trackedPlayers !== Infinity && currentCount >= limits.trackedPlayers) {
    return { error: 'LIMIT_REACHED' }
  }

  // 3 — Check for duplicate entry
  const { error: duplicateError } = await supabase
    .from('tracked_players')
    .select('id')
    .eq('user_id', userId)
    .eq('player_name', playerName)
    .limit(1)

  if (!duplicateError) {
    // Query returned rows → player already tracked
    return { error: 'ALREADY_TRACKED' }
  }

  // 4 — Get first day of next month via RPC
  const { data: lockedUntilData, error: rpcError } = await supabase.rpc(
    'get_next_month_first_day'
  )

  if (rpcError || !lockedUntilData) {
    console.error('[actions] addTrackedPlayer — RPC failed:', rpcError)
    return { error: 'Internal error' }
  }

  const lockedUntil: string = lockedUntilData

  // 5 — INSERT tracked_players
  const { error: insertError } = await supabase.from('tracked_players').insert({
    user_id: userId,
    player_name: playerName,
    locked_until: lockedUntil,
  })

  if (insertError) {
    // Unique constraint violation is the most likely cause after our check above
    if (insertError.code === '23505') {
      return { error: 'ALREADY_TRACKED' }
    }
    console.error('[actions] addTrackedPlayer — insert error:', insertError)
    return { error: 'Failed to add player' }
  }

  // 6 — INSERT history entry
  await supabase.from('tracked_players_history').insert({
    user_id: userId,
    player_name: playerName,
    action: 'added',
  } as Omit<HistoryRow, never>)

  // 7 — Revalidate
  revalidatePath('/dashboard/player')

  return { success: true }
}

/**
 * DELETE — remove a player from the user's tracked list.
 *
 * Business logic:
 *  1. Fetch the row to read locked_until
 *  2. Resolve plan → PLAN_LIMITS[plan]
 *  3. If lockDays: true AND locked_until > today → LOCKED
 *  4. DELETE tracked_players
 *  5. INSERT tracked_players_history(action = 'removed')
 *  6. revalidatePath
 */
export async function removeTrackedPlayer(
  userId: string,
  playerName: string
): Promise<
  | { success: true }
  | { error: 'LOCKED'; lockedUntil: string }
  | { error: string }
> {
  const supabase = await createClient()

  // 1 — Fetch the row
  const { data: row, error: fetchError } = await supabase
    .from('tracked_players')
    .select('player_name, locked_until')
    .eq('user_id', userId)
    .eq('player_name', playerName)
    .single()

  if (fetchError || !row) {
    console.error('[actions] removeTrackedPlayer — row not found:', fetchError)
    return { error: 'Player not found in your tracked list' }
  }

  // 2 — Resolve plan
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', userId)
    .single()

  if (profileError || !profileData) {
    return { error: 'Profile not found' }
  }

  const plan = (profileData.plan ?? 'free') as PlanKey
  const limits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free

  // 3 — Lock check
  if (limits.lockDays) {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    if (row.locked_until > today) {
      return {
        error: 'LOCKED',
        lockedUntil: row.locked_until,
      }
    }
  }

  // 4 — DELETE
  const { error: deleteError } = await supabase
    .from('tracked_players')
    .delete()
    .eq('user_id', userId)
    .eq('player_name', playerName)

  if (deleteError) {
    console.error('[actions] removeTrackedPlayer — delete error:', deleteError)
    return { error: 'Failed to remove player' }
  }

  // 5 — INSERT history entry
  await supabase.from('tracked_players_history').insert({
    user_id: userId,
    player_name: playerName,
    action: 'removed',
  } as Omit<HistoryRow, never>)

  // 6 — Revalidate
  revalidatePath('/dashboard/player')

  return { success: true }
}
