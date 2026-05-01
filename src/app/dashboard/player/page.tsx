export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getTrackedPlayers } from './actions'
import { PLAN_LIMITS, type PlanKey } from '@/config/planLimits'
import PlayerProfileClient from '@/components/dashboard/player/PlayerProfileClient'

/**
 * Player Profile page — server-side data loading.
 *
 * Fetches:
 *  - The authenticated user's session
 *  - Their plan from profiles
 *  - Their initial list of tracked players (for client-side badge / list)
 *
 * Then passes all data down to PlayerProfileClient as props so the
 * client renders immediately with no extra round-trip.
 */
export default async function PlayerPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user plan — defaults to 'free' if column is null (old users, migration not yet applied)
  const { data: profileData } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const userPlan = (profileData?.plan ?? 'free') as PlanKey
  const planLimit = PLAN_LIMITS[userPlan]?.trackedPlayers ?? PLAN_LIMITS.free.trackedPlayers

  // Fetch tracked players server-side so PlayerProfileClient renders immediately
  const initialTrackedPlayers = await getTrackedPlayers(user.id)

  return (
    <PlayerProfileClient
      userId={user.id}
      initialTrackedPlayers={initialTrackedPlayers}
      userPlan={userPlan}
      planLimit={planLimit}
    />
  )
}
