/**
 * Pure calculation helpers for the daily stats cards.
 *
 * These functions are idempotent and side-effect free — suitable for
 * unit testing and independent of any Supabase or React context.
 *
 * All stats (win rate surface, momentum) are now read directly from
 * match_stats columns _p1 / _p2. The player_stats table query is removed.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { TodaysStats } from '@/lib/types/dashboard'

/** Raw match row — includes the per-player _p1 / _p2 stats needed for card2/card3. */
export interface MatchRow {
  player1: string
  player2: string
  surface: string | null
  tournoi: string | null
  win_rate_surf_td_p1: number | null
  win_rate_surf_td_p2: number | null
  momentum_td_p1: number | null
  momentum_td_p2: number | null
}

/**
 * Builds the TodaysStats object from raw match_stats rows.
 *
 * @param todaysMatches — match_stats rows where date_match = today
 * @param tournaments   — unique { name, surface } entries from todaysMatches
 */
export function buildTodaysStats(
  todaysMatches: MatchRow[],
  tournaments: Array<{ name: string; surface: string }>
): TodaysStats {
  // Card 1 — simple count + tournament list
  const card1 = {
    count: todaysMatches.length,
    tournaments,
  }

  // Card 2 — highest surface win rate across both players in all matches
  const card2 = findSurfaceSpecialist(todaysMatches)

  // Card 3 — highest |momentum| across both players in all matches
  const card3 = findExtremeMomentum(todaysMatches)

  return { card1, card2, card3 }
}

/**
 * Card 2: selects the match where one player has the highest win_rate_surf_td.
 * Returns null if no player has a non-null value in any match.
 */
function findSurfaceSpecialist(
  matches: MatchRow[]
): TodaysStats['card2'] {
  let best: { player1: string; player2: string; winRate: number; surface: string } | null = null

  for (const match of matches) {
    const { win_rate_surf_td_p1, win_rate_surf_td_p2, surface } = match

    for (const [player1, winRate] of [
      [match.player1, win_rate_surf_td_p1] as [string, number | null],
      [match.player2, win_rate_surf_td_p2] as [string, number | null],
    ]) {
      if (winRate === null) continue
      const player2 = player1 === match.player1 ? match.player2 : match.player1

      if (best === null || winRate > best.winRate) {
        best = {
          player1,
          player2,
          winRate,
          surface: surface ?? 'Unknown',
        }
      }
    }
  }

  return best
}

/**
 * Card 3: selects the player with the highest absolute momentum across all matches.
 * Returns null if no player has a non-null momentum value.
 */
function findExtremeMomentum(
  matches: MatchRow[]
): TodaysStats['card3'] {
  let best: { player1: string; player2: string; momentum: number } | null = null

  for (const match of matches) {
    const { momentum_td_p1, momentum_td_p2 } = match

    for (const [player1, momentum] of [
      [match.player1, momentum_td_p1] as [string, number | null],
      [match.player2, momentum_td_p2] as [string, number | null],
    ]) {
      if (momentum === null) continue
      const player2 = player1 === match.player1 ? match.player2 : match.player1
      const absMomentum = Math.abs(momentum)

      if (best === null || absMomentum > Math.abs(best.momentum)) {
        best = {
          player1,
          player2,
          momentum,
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

  // Fetch today's matches — now includes all _p1 / _p2 columns needed
  // for card2 (win_rate_surf_td) and card3 (momentum_td)
  const { data: todaysMatches, error: matchesError } = await supabase
    .from('match_stats')
    .select(
      'player1, player2, surface, tournoi, win_rate_surf_td_p1, win_rate_surf_td_p2, momentum_td_p1, momentum_td_p2'
    )
    .eq('date_match', today)

  if (matchesError || !todaysMatches || todaysMatches.length === 0) {
    return undefined
  }

  const tournaments = extractTournaments(todaysMatches)

  return buildTodaysStats(todaysMatches, tournaments)
}
