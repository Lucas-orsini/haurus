/**
 * Route Handler: /api/player-search
 *
 * Dual-mode endpoint:
 *
 * 1. Search mode  — GET ?q={query}
 *    Returns up to 5 player names matching the query.
 *    → 200 { results: Array<{ player_name: string }> }
 *    → 400 if q is missing or empty
 *    → 500 on Supabase error
 *
 * 2. Player data mode — GET ?player={name}&surface={Hard|Clay|Grass}
 *    Loads player profile data: stats, ATP averages, history, recent matches,
 *    and next match info (for default surface determination).
 *    → 200 { playerStats, atpAverage, statsHistory, recentMatches, nextMatch }
 *    → 404 if player not found
 *    → 500 on Supabase error
 *
 * Modes are mutually exclusive. If both ?q= and ?player= are present,
 * search mode takes precedence.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { parseStatsHistory, mapSurfaceFromMatchStats } from '@/lib/player/utils'
import type { Surface, PlayerProfileData, PlayerSearchResponse } from '@/lib/types/player'

// ── GET ───────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('q')
  const player = searchParams.get('player')
  const surface = searchParams.get('surface')

  // ── Mode 1: Search ──────────────────────────────────────────────────────────

  if (query !== null) {
    return handleSearch(query)
  }

  // ── Mode 2: Player data ─────────────────────────────────────────────────────

  if (player !== null) {
    return handlePlayerData(player, surface as Surface | null)
  }

  // ── No valid mode ──────────────────────────────────────────────────────────

  return NextResponse.json(
    { error: 'Missing required parameter: provide ?q= for search or ?player= for data' },
    { status: 400 }
  )
}

// ── Search handler ─────────────────────────────────────────────────────────────

async function handleSearch(query: string): Promise<NextResponse> {
  const trimmed = query.trim()

  if (!trimmed) {
    return NextResponse.json({ error: 'query required' }, { status: 400 })
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('player_stats')
      .select('player_name')
      .ilike('player_name', `%${trimmed}%`)
      .order('player_name')
      .limit(5)

    if (error) {
      console.error('[player-search] Supabase error:', error.message)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    const response: PlayerSearchResponse = {
      results: (data ?? []).map((row) => ({ player_name: row.player_name })),
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error('[player-search] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── Player data handler ───────────────────────────────────────────────────────

async function handlePlayerData(
  playerName: string,
  surface: Surface | null
): Promise<NextResponse> {
  if (!playerName.trim()) {
    return NextResponse.json({ error: 'player name required' }, { status: 400 })
  }

  try {
    const supabase = await createClient()

    // ── 1. Player stats ───────────────────────────────────────────────────────

    const { data: playerData, error: playerError } = await supabase
      .from('player_stats')
      .select('*')
      .ilike('player_name', playerName.trim())
      .limit(1)
      .maybeSingle()

    if (playerError) {
      console.error('[player-search] player_stats error:', playerError.message)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!playerData) {
      return NextResponse.json({ error: 'Joueur non trouvé' }, { status: 404 })
    }

    // ── 2. ATP averages for the selected surface ─────────────────────────────

    const effectiveSurface = surface ?? 'Hard'
    const atpSurfaceKey = effectiveSurface.toLowerCase()

    const { data: atpData } = await supabase
      .from('atp_averages')
      .select('*')
      .eq('surface', atpSurfaceKey)
      .maybeSingle()

    // ── 3. Stats history (parsed) ────────────────────────────────────────────

    const statsHistory = parseStatsHistory(playerData.stats_history)

    // ── 4. Recent matches (last 5, by date DESC) ────────────────────────────

    // Fetch where player is either player1 or player2
    const { data: recentData } = await supabase
      .from('match_results')
      .select('*')
      .or(`player1.ilike.${encodeURIComponent(playerName.trim())},player2.ilike.${encodeURIComponent(playerName.trim())}`)
      .order('date_match', { ascending: false })
      .limit(5)

    // ── 5. Next upcoming match (for default surface) ──────────────────────────

    let nextMatchSurface: Surface = effectiveSurface

    const { data: nextMatchData } = await supabase
      .from('match_stats')
      .select('surface, date_match')
      .or(`player1.ilike.${encodeURIComponent(playerName.trim())},player2.ilike.${encodeURIComponent(playerName.trim())}`)
      .gte('date_match', new Date().toISOString().slice(0, 10))
      .order('date_match', { ascending: true })
      .limit(1)
      .maybeSingle()

    if (nextMatchData?.surface) {
      nextMatchSurface = mapSurfaceFromMatchStats(nextMatchData.surface)
    }

    // ── Build response ────────────────────────────────────────────────────────

    const response: PlayerProfileData = {
      playerStats: playerData,
      atpAverage: atpData,
      statsHistory,
      recentMatches: (recentData ?? []) as PlayerProfileData['recentMatches'],
      nextMatch: { surface: nextMatchSurface },
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error('[player-search] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
