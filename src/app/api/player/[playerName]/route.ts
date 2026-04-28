/**
 * Route Handler: /api/player/{playerName}
 *
 * Loads the initial player profile data for the Server Component page.tsx.
 *
 * GET ?surface={Hard|Clay|Grass}
 *
 * - playerStats  — full row from player_stats filtered by player_name
 * - atpAverage   — ATP averages for the selected (or determined) surface
 * - statsHistory — parsed stats_history JSON array
 * - recentMatches— last 5 match_results for this player
 * - nextMatch    — upcoming match surface info (null if none found)
 *
 * Surface logic:
 * - If ?surface= is provided and valid → use it
 * - Otherwise → try to find next upcoming match to derive surface
 * - Fallback → 'Hard'
 *
 * Response:
 * → 200 { playerStats, atpAverage, statsHistory, recentMatches, nextMatch }
 * → 404 if player not found
 * → 500 on error
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { parseStatsHistory, mapSurfaceFromMatchStats } from '@/lib/player/utils'
import type { Surface, PlayerProfileData } from '@/lib/types/player'

type RouteContext = {
  params: Promise<{ playerName: string }>
}

// ── GET ───────────────────────────────────────────────────────────────────────

export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const { playerName } = await context.params
  const { searchParams } = new URL(request.url)
  const surfaceParam = searchParams.get('surface') as Surface | null

  // Validate surface if provided
  const validSurfaces: Surface[] = ['Hard', 'Clay', 'Grass']
  const requestedSurface: Surface | null =
    surfaceParam && validSurfaces.includes(surfaceParam as Surface)
      ? (surfaceParam as Surface)
      : null

  return loadPlayerData(playerName, requestedSurface)
}

// ── Core loader ────────────────────────────────────────────────────────────────

async function loadPlayerData(
  playerName: string,
  requestedSurface: Surface | null
): Promise<NextResponse> {
  if (!playerName || !playerName.trim()) {
    return NextResponse.json({ error: 'Player name required' }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    const normalizedName = playerName.trim()

    // ── 1. Player stats ───────────────────────────────────────────────────────

    const { data: playerData, error: playerError } = await supabase
      .from('player_stats')
      .select('*')
      .ilike('player_name', normalizedName)
      .limit(1)
      .maybeSingle()

    if (playerError) {
      console.error('[player] player_stats error:', playerError.message)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!playerData) {
      return NextResponse.json({ error: 'Joueur non trouvé' }, { status: 404 })
    }

    // ── 2. Determine effective surface ───────────────────────────────────────

    let effectiveSurface: Surface = requestedSurface ?? 'Hard'

    if (!requestedSurface) {
      // No surface param → find next upcoming match to determine surface
      const { data: nextMatch } = await supabase
        .from('match_stats')
        .select('surface')
        .or(`player1.ilike.${encodeURIComponent(normalizedName)},player2.ilike.${encodeURIComponent(normalizedName)}`)
        .gte('date_match', new Date().toISOString().slice(0, 10))
        .order('date_match', { ascending: true })
        .limit(1)
        .maybeSingle()

      if (nextMatch?.surface) {
        effectiveSurface = mapSurfaceFromMatchStats(nextMatch.surface)
      }
    }

    // ── 3. ATP averages for effective surface ────────────────────────────────

    const atpSurfaceKey = effectiveSurface.toLowerCase()

    const { data: atpData } = await supabase
      .from('atp_averages')
      .select('*')
      .eq('surface', atpSurfaceKey)
      .maybeSingle()

    // ── 4. Stats history ─────────────────────────────────────────────────────

    const statsHistory = parseStatsHistory(playerData.stats_history)

    // ── 5. Recent matches (last 5) ──────────────────────────────────────────

    const { data: recentData } = await supabase
      .from('match_results')
      .select('*')
      .or(`player1.ilike.${encodeURIComponent(normalizedName)},player2.ilike.${encodeURIComponent(normalizedName)}`)
      .order('date_match', { ascending: false })
      .limit(5)

    // ── 6. Next match surface (for client-side surface selector default) ──────

    const { data: upcomingMatch } = await supabase
      .from('match_stats')
      .select('surface, date_match')
      .or(`player1.ilike.${encodeURIComponent(normalizedName)},player2.ilike.${encodeURIComponent(normalizedName)}`)
      .gte('date_match', new Date().toISOString().slice(0, 10))
      .order('date_match', { ascending: true })
      .limit(1)
      .maybeSingle()

    const nextMatchSurface = upcomingMatch?.surface
      ? mapSurfaceFromMatchStats(upcomingMatch.surface)
      : null

    // ── Build and return response ────────────────────────────────────────────

    const response: PlayerProfileData = {
      playerStats: playerData,
      atpAverage: atpData,
      statsHistory,
      recentMatches: (recentData ?? []) as PlayerProfileData['recentMatches'],
      nextMatch: nextMatchSurface ? { surface: nextMatchSurface } : null,
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error('[player] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
