/**
 * Pure calculation helpers for the daily stats cards.
 *
 * These functions are idempotent and side-effect free — suitable for
 * unit testing and independent of any Supabase or React context.
 *
 * card3 reads from the tournament_pace table.
 * card2 reads from the tournament_weather table.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { TodaysStats, WeatherCardData } from '@/lib/types/dashboard'

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

/** Raw row from tournament_weather — only the columns we need. */
interface WeatherRow {
  tourney_name: string | null
  temperature: number | string | null
  humidity: number | string | null
  conditions: string | null
  conditions_icon: string | null
  wind_speed: number | string | null
  pop: number | string | null
}

/**
 * Builds the TodaysStats object from raw match_stats rows and tournament_pace rows.
 *
 * @param todaysMatches   — match_stats rows where date_match = today
 * @param tournaments     — unique { name, surface } entries from todaysMatches
 * @param paceRows       — rows from tournament_pace (null = query failed)
 * @param weatherData     — weather data from tournament_weather (null = no match found)
 */
export function buildTodaysStats(
  todaysMatches: MatchRow[],
  tournaments: Array<{ name: string; surface: string }>,
  paceRows: PaceRow[] | null,
  weatherData: WeatherCardData | null
): TodaysStats {
  // Card 1 — simple count + tournament list
  const card1 = {
    count: todaysMatches.length,
    tournaments,
  }

  // Card 2 — weather for the active tournament of the day
  const card2 = weatherData

  // Card 3 — surface speed from tournament_pace for each active tournament
  const card3 = buildCard3(tournaments, paceRows)

  return { card1, card2, card3 }
}

/**
 * Normalizes a tournament name for matching purposes.
 *
 * Applies: trim, lowercase, removal of common tour-level prefixes (ATP, WTA,
 * Challenger, ITF), removal of punctuation (commas, periods, apostrophes,
 * dashes), and collapse of multiple whitespace.
 *
 * Examples:
 *   "ATP Rome Masters"  → "rome masters"
 *   "Rome Masters"      → "rome masters"
 *   "Monte Carlo, Monaco" → "monte carlo monaco"
 *   "Monte-Carlo"      → "monte carlo"
 *   "Rome"             → "rome"
 */
export function normalizeTournamentName(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      // Remove common prefixes at the start of the string
      .replace(/^(?:atp|wta|challenger|itf)\s+/i, '')
      // Remove punctuation: commas, periods, apostrophes, dashes
      .replace(/[,.'\-–—]/g, ' ')
      // Collapse multiple spaces into one
      .replace(/\s+/g, ' ')
      .trim()
  )
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

  // Build the ordered list: one entry per tournament, paceIndex resolved via
  // bidirectional contains-matching on normalized names + surface equality
  const card3 = tournaments.map(({ name, surface }) => {
    const normalizedName = normalizeTournamentName(name)

    const match = paceRows.find(
      (p) =>
        (normalizeTournamentName(p.tourney_name).includes(normalizedName) ||
          normalizedName.includes(normalizeTournamentName(p.tourney_name))) &&
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
 * Fetches today's match data, tournament pace metadata, and weather from Supabase,
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

  // ── Card 3: tournament_pace ──────────────────────────────────────────────

  // Fetch tournament_pace rows — normalized matching is done in-memory (see buildCard3)
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

  // ── Card 2: tournament_weather ────────────────────────────────────────────
  // Determine the active tournament by matching the first entry in tournaments
  // against tournament_weather.tourney_name using the same normalizeTournamentName
  // logic as card3.

  let weatherData: WeatherCardData | null = null

  if (tournaments.length > 0) {
    const firstTournament = tournaments[0]
    const normalizedMatchName = normalizeTournamentName(firstTournament.name)

    // Fetch all weather rows for today that match the normalized tournament name
    const { data: weatherRows, error: weatherError } = await supabase
      .from('tournament_weather')
      .select(
        'tourney_name, temperature, humidity, conditions, conditions_icon, wind_speed, pop'
      )
      .eq('date', today)

    console.log('[computeTodaysStats] tournament_weather response:', {
      rowCount: weatherRows?.length ?? null,
      normalizedMatchName,
      surface: firstTournament.surface,
      weatherError,
    })

    if (!weatherError && weatherRows && weatherRows.length > 0) {
      // Find the first row whose normalized tourney_name matches our normalized name
      const matchedRow = weatherRows.find((row: WeatherRow) => {
        const dbName = row.tourney_name ?? ''
        return (
          normalizeTournamentName(dbName).includes(normalizedMatchName) ||
          normalizedMatchName.includes(normalizeTournamentName(dbName))
        )
      })

      if (matchedRow) {
        // Safely coerce numeric fields that come as string | null from the DB
        const toNum = (v: unknown): number =>
          typeof v === 'number'
            ? v
            : v !== null && v !== ''
              ? Number(v)
              : 0

        weatherData = {
          temperature: toNum(matchedRow.temperature),
          humidity: toNum(matchedRow.humidity),
          conditions: matchedRow.conditions ?? '',
          conditions_icon: matchedRow.conditions_icon ?? null,
          wind_speed: toNum(matchedRow.wind_speed),
          pop: toNum(matchedRow.pop),
        }
      }
    }
    // If error or no match: weatherData stays null — StatCardsRow shows "—" gracefully
  }

  return buildTodaysStats(todaysMatches, tournaments, paceRows, weatherData)
}
