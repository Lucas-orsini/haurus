export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { fetchLastMatches } from '@/lib/dashboard/stats'
import PlayerProfileClient from '@/components/dashboard/player/PlayerProfileClient'
import type { LastMatch } from '@/lib/dashboard/stats'
import type { Database } from '@/lib/supabase/database.types'

type PlayerStats = Database['public']['Tables']['player_stats']['Row']

/**
 * Player Profile page.
 *
 * Server Component — verifies session.
 *
 * If a ?player= query param is present, fetches the last matches for that player
 * server-side and passes them to the client for immediate display.
 * Also fetches player_stats to initialize selectedPlayer so the full profile
 * section (header, metric cards, chart, history table) renders on first render.
 * Otherwise the client fetches match history interactively via PlayerSearchBar.
 *
 * If no active Supabase session, redirects to /login.
 */
export default async function PlayerPage({
  searchParams,
}: {
  searchParams: Promise<{ player?: string }>
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { player } = await searchParams
  let lastMatches: LastMatch[] | undefined
  let initialPlayerStats: PlayerStats | undefined

  if (player) {
    // Server-side pre-fetch when player is in the URL (e.g., shared link)
    lastMatches = await fetchLastMatches(supabase, player)

    // Also fetch player_stats to initialize selectedPlayer on the client
    // so the full profile section (header, metric cards, chart, history table)
    // renders immediately without requiring a second interaction.
    const { data: statsData } = await supabase
      .from('player_stats')
      .select('*')
      .ilike('player_name', player)
      .single()

    if (statsData) {
      initialPlayerStats = statsData as PlayerStats
    }
  }

  return (
    <PlayerProfileClient
      initialLastMatches={lastMatches}
      initialPlayerStats={initialPlayerStats}
    />
  )
}
