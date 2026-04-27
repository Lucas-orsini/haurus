export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { MatchStats } from '@/lib/types/match'
import DashboardOverview from '@/components/dashboard/DashboardOverview'

/**
 * Dashboard overview page.
 *
 * Server Component — fetches upcoming match_stats (date_match >= today) on first load.
 * If the user has no active Supabase session, redirects to /login.
 * The middleware already protects this route, but we double-check here
 * as a fail-safe (defense in depth).
 */
export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD in server timezone

  const { data: matches, error } = await supabase
    .from('match_stats')
    .select('*')
    .gte('date_match', today)
    .order('date_match', { ascending: true })

  if (error) {
    // Propagate a clean error state to the client component
    // so it can render the error UI instead of crashing
    return (
      <DashboardOverview
        matches={[]}
        fetchError="Failed to load match data. Please try again."
      />
    )
  }

  return <DashboardOverview matches={(matches as MatchStats[]) ?? []} />
}
