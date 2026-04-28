export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'
import PlayerProfile from '@/components/dashboard/player/PlayerProfile'
import type { PlayerProfileData, Surface } from '@/lib/types/player'
import { parseStatsHistory } from '@/lib/player/utils'

interface PageProps {
  params: Promise<{ playerName: string }>
}

/**
 * Player profile page — Server Component.
 *
 * Fetches the player's initial data server-side (for SEO),
 * checks auth, and passes data to the PlayerProfile Client Component.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { playerName } = await params
  const displayName = decodeURIComponent(playerName).replace(/-/g, ' ')
  return {
    title: `${displayName} — Haurus`,
    description: `Profil joueur et statistiques pour ${displayName}`,
  }
}

export default async function PlayerPage({ params }: PageProps) {
  const { playerName } = await params
  const decodedName = decodeURIComponent(playerName).replace(/-/g, ' ')

  // Auth check
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch player data
  let profileData: PlayerProfileData | null = null

  try {
    // Fetch player_stats
    const { data: playerStats } = await supabase
      .from('player_stats')
      .select('*')
      .ilike('player_name', decodedName)
      .limit(1)
      .single()

    // Parse stats_history
    const statsHistory = parseStatsHistory(playerStats?.stats_history)

    // Fetch recent matches (5 last)
    const { data: recentMatches } = await supabase
      .from('match_results')
      .select('*')
      .or(`player1.ilike.${decodedName},player2.ilike.${decodedName}`)
      .order('date_match', { ascending: false })
      .limit(5)

    // Fetch next match (upcoming — date_match >= today)
    const today = new Date().toISOString().slice(0, 10)
    const { data: nextMatchRows } = await supabase
      .from('match_stats')
      .select('surface')
      .or(`player1.ilike.${decodedName},player2.ilike.${decodedName}`)
      .gte('date_match', today)
      .order('date_match', { ascending: true })
      .limit(1)

    const nextMatch = nextMatchRows && nextMatchRows.length > 0
      ? { surface: nextMatchRows[0].surface ?? 'Hard' }
      : null

    // Fetch ATP average (for comparison) — default to Hard
    const { data: atpAverage } = await supabase
      .from('atp_averages')
      .select('*')
      .eq('surface', 'hard')
      .limit(1)
      .single()

    profileData = {
      playerStats: playerStats ?? null,
      atpAverage: atpAverage ?? null,
      statsHistory,
      recentMatches: (recentMatches ?? []) as PlayerProfileData['recentMatches'],
      nextMatch,
    }
  } catch {
    // Non-critical: return empty profile
    profileData = {
      playerStats: null,
      atpAverage: null,
      statsHistory: [],
      recentMatches: [],
      nextMatch: null,
    }
  }

  return (
    <PlayerProfile
      playerName={decodedName}
      initialData={profileData}
    />
  )
}
