/**
 * Pure calculation helpers for the daily stats cards.
 *
 * These functions are idempotent and side-effect free — suitable for
 * unit testing and independent of any Supabase or React context.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { TodaysStats } from '@/lib/types/dashboard'

/** Row shape returned by the player_stats join query. */
export interface PlayerStatsRow {
  player_name: string
  win_rate_clay_td: number | null
  win_rate_hard_td: number | null
  win_rate_grass_td: number | null
  momentum_td: number | null
}

/** Raw match row for today's matches. */
export interface MatchRow {
  player1: string
  player2: string
  surface: string | null
  tournoi: string | null
}

/**
 * Returns the surface win rate for a given surface string,
 * or null if the value is unavailable.
 *
 * Uses explicit conditionals instead of a key lookup so TypeScript
 * can narrow the return type to `number | null` (avoids widening
 * through `player_name: string` in PlayerStatsRow).
 */
export function getSurfaceWinRate(
  stats: PlayerStatsRow,
  surface: string | null
): number | null {
  if (!surface) return null
  const s = surface.toLowerCase()
  if (s === 'clay')  return stats.win_rate_clay_td
  if (s === 'hard')  return stats.win_rate_hard_td
  if (s === 'grass') return stats.win_rate_grass_td
  return null
}

/**
 * Builds the TodaysStats object from raw query results.
 *
 * @param todaysMatches   — match_stats rows where date_match = today
 * @param playerStatsMap — Map<playerName, PlayerStatsRow> from the player_stats join
 * @param tournaments    — unique { name, surface } entries from todaysMatches
 */
export function buildTodaysStats(
  todaysMatches: MatchRow[],
  playerStatsMap: Map<string, PlayerStatsRow>,
  tournaments: Array<{ name: string; surface: string }>
): TodaysStats {
  // Card 1 — simple count + tournament list
  const card1 = {
    count: todaysMatches.length,
    tournaments,
  }

  // Card 2 — highest surface win rate
  const card2 = findSurfaceSpecialist(todaysMatches, playerStatsMap)

  // Card 3 — highest |momentum|
  const card3 = findExtremeMomentum(todaysMatches, playerStatsMap)

  return { card1, card2, card3 }
}

/**
 * Card 2: selects the player with the highest win rate matching their match surface.
 * Returns null if no player has a non-null value for their surface.
 */
function findSurfaceSpecialist(
  matches: MatchRow[],
  statsMap: Map<string, PlayerStatsRow>
): TodaysStats['card2'] {
  let best: { playerName: string; winRate: number; surface: string; opponent: string } | null = null

  for (const match of matches) {
    for (const playerName of [match.player1, match.player2]) {
      const opponent = playerName === match.player1 ? match.player2 : match.player1
      const stats = statsMap.get(playerName.toLowerCase())
      if (!stats) continue

      const winRate = getSurfaceWinRate(stats, match.surface)
      if (winRate === null) continue

      if (best === null || winRate > best.winRate) {
        best = {
          playerName,
          winRate,
          surface: match.surface ?? 'Unknown',
          opponent,
        }
      }
    }
  }

  return best
}

/**
 * Card 3: selects the player with the highest absolute momentum.
 * Returns null if no player has a non-null momentum value.
 */
function findExtremeMomentum(
  matches: MatchRow[],
  statsMap: Map<string, PlayerStatsRow>
): TodaysStats['card3'] {
  let best: { playerName: string; momentum: number; opponent: string } | null = null

  for (const match of matches) {
    for (const playerName of [match.player1, match.player2]) {
      const opponent = playerName === match.player1 ? match.player2 : match.player1
      const stats = statsMap.get(playerName.toLowerCase())
      if (!stats || stats.momentum_td === null) continue

      const absMomentum = Math.abs(stats.momentum_td)
      if (best === null || absMomentum > Math.abs(best.momentum)) {
        best = {
          playerName,
          momentum: stats.momentum_td,
          opponent,
        }
      }
    }
  }

  return best
}

/**
 * Extracts unique tournament + surface pairs from a list of matches.
 * Stable order: tournaments appear in the order they first appear in matches.
 */
export function extractTournaments(
  matches: MatchRow[]
): Array<{ name: string; surface: string }> {
  const seen = new Set<string>()
  const result: Array<{ name: string; surface: string }> = []

  for (const match of matches) {
    if (!match.tournoi) continue
    const key = `${match.tournoi}|||${match.surface ?? ''}`
    if (seen.has(key)) continue
    seen.add(key)
    result.push({ name: match.tournoi, surface: match.surface ?? '' })
  }

  return result
}

/**
 * Fetches today's match data from Supabase and computes TodaysStats.
 *
 * This is the async wrapper intended for use in Server Components.
 * Pure calculation lives in `buildTodaysStats` for testability.
 *
 * Returns `undefined` when there are no matches for today (no error — the
 * StatCardsRow component handles the empty case gracefully).
 */
export async function computeTodaysStats(
  supabase: SupabaseClient
): Promise<TodaysStats | undefined> {
  const today = new Date().toISOString().slice(0, 10)

  // Fetch today's matches
  const { data: todaysMatches, error: matchesError } = await supabase
    .from('match_stats')
    .select('player1, player2, surface, tournoi')
    .eq('date_match', today)

  if (matchesError || !todaysMatches || todaysMatches.length === 0) {
    return undefined
  }

  // Collect unique player names
  const playerNames = Array.from(
    new Set(
      todaysMatches.flatMap((m) => [m.player1, m.player2])
    )
  )

  if (playerNames.length === 0) {
    return undefined
  }

  // Batch-fetch player stats
  const { data: playerStatsRows, error: statsError } = await supabase
    .from('player_stats')
    .select('player_name, win_rate_clay_td, win_rate_hard_td, win_rate_grass_td, momentum_td')
    .in('player_name', playerNames)

  if (statsError || !playerStatsRows) {
    return undefined
  }

  // Normalise en minuscules pour éviter les défaillances de jointure
  // dues à des différences de casse entre match_stats et player_stats
  const playerStatsMap = new Map<string, PlayerStatsRow>(
    playerStatsRows.map((r) => [r.player_name.toLowerCase(), r])
  )

  const tournaments = extractTournaments(todaysMatches)

  return buildTodaysStats(todaysMatches, playerStatsMap, tournaments)
}
