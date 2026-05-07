/**
 * Pure calculation helpers for the daily stats cards.
 *
 * These functions are idempotent and side-effect free — suitable for
 * unit testing and independent of any Supabase or React context.
 *
 * card3 now reads from the tournament_pace table instead of momentum_td.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { TodaysStats } from '@/lib/types/dashboard'

/** Raw match row — includes the per-player _p1 / _p2 stats needed for card2. */
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

/** Raw row from tournament_pace. */
interface PaceRow {
  tourney_name: string
  surface: string
  pace_index: number
}

/**
 * Builds the TodaysStats object from raw match_stats rows and tournament_pace rows.
 *
 * @param todaysMatches — match_stats rows where date_match = today
 * @param tournaments   — unique { name, surface } entries from todaysMatches
 * @param paceRows     — rows from tournament_pace (null = query failed)
 */
export function buildTodaysStats(
  todaysMatches: MatchRow[],
  tournaments: Array<{ name: string; surface: string }>,
  paceRows: PaceRow[] | null
): TodaysStats {
  // Card 1 — simple count + tournament list
  const card1 = {
    count: todaysMatches.length,
    tournaments,
  }

  // Card 2 — highest surface win rate across both players in all matches
  const card2 = findSurfaceSpecialist(todaysMatches)

  // Card 3 — surface speed from tournament_pace for each active tournament
  const card3 = buildCard3(tournaments, paceRows)

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
 * Card 3: surface speed from tournament_pace for each active tournament.
 *
 * @param tournaments — unique { name, surface } from match_stats
 * @param paceRows   — null when the query failed; [] when no rows returned;
 *                     entries with paceIndex = null mean no match found in tournament_pace
 */
function buildCard3(
  tournaments: Array<{ name: string; surface: string }>,
  paceRows: PaceRow[] | null
): TodaysStats['card3'] {
  // Query failed — signal to the UI to show "Données indisponibles"
  if (paceRows === null) return null

  // Build the ordered list: one entry per tournament, paceIndex resolved via lowercase matching
  const card3 = tournaments.map(({ name, surface }) => {
    const match = paceRows.find(
      (p) =>
        p.tourney_name.toLowerCase() === name.toLowerCase() &&
        p.surface.toLowerCase() === surface.toLowerCase()
    )
    return {
      name,
      surface,
      paceIndex: match?.pace_index ?? null,
    }
  })

  return card3
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
 * Fetches today's match data and tournament pace metadata from Supabase,
 * then computes TodaysStats.
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

  // Fetch today's matches — includes all _p1 / _p2 columns needed for card2
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

  // Fetch tournament_pace rows — lowercase matching is done in-memory (see buildCard3)
  const { data: paceData, error: paceError } = await supabase
    .from('tournament_pace')
    .select('tourney_name, surface, pace_index')

  console.log('[computeTodaysStats] tournament_pace response:', {
    rowCount: paceData?.length ?? null,
    surfacesAndNames: paceData?.map((p) => ({
      tourney_name: p.tourney_name,
      surface: p.surface,
    })),
    paceError,
  })

  const paceRows: PaceRow[] | null =
    paceError || !paceData ? null : paceData

  return buildTodaysStats(todaysMatches, tournaments, paceRows)
}
