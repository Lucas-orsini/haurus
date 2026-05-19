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
  hour: number
}

/**
 * Builds the TodaysStats object from raw match_stats rows and tournament_pace rows.
 *
 * @param todaysMatches   — match_stats rows where date_match = today
 * @param tournaments     — unique { name, surface } entries from todaysMatches
 * @param paceRows       — rows from tournament_pace (null = query failed)
 * @param weatherEntries — weather data per tournament (null = query failed, [] = no matches)
 */
export function buildTodaysStats(
  todaysMatches: MatchRow[],
  tournaments: Array<{ name: string; surface: string }>,
  paceRows: PaceRow[] | null,
  weatherEntries: Array<{ name: string; weather: WeatherCardData }> | null
): TodaysStats {
  // Card 1 — simple count + tournament list
  const card1 = {
    count: todaysMatches.length,
    tournaments,
  }

  // Card 2 — weather per active tournament (array, or null if no tournaments)
  const card2 = weatherEntries

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
  // bidirectional contains-matching on normalized names + surface equality (case-insensitive)
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

/** Safely coerce numeric fields that come as string | null from the DB */
function toNum(v: unknown): number {
  return typeof v === 'number'
    ? v
    : v !== null && v !== ''
      ? Number(v)
      : 0
}

/** Maps a WeatherRow to WeatherCardData */
function toWeatherCardData(row: WeatherRow): WeatherCardData {
  return {
    temperature: toNum(row.temperature),
    humidity: toNum(row.humidity),
    conditions: row.conditions ?? null,
    conditions_icon: row.conditions_icon ?? null,
    wind_speed: toNum(row.wind_speed),
    pop: toNum(row.pop),
  }
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
  // ── Compute Paris date + hour ──────────────────────────────────────────────
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
  })

  const parts = formatter.formatToParts(new Date())
  const get = (k: string) => parts.find((p) => p.type === k)?.value ?? '01'

  const parisDate = `${get('year')}-${get('month')}-${get('day')}`
  const parisHour = parseInt(get('hour'), 10)

  // Fetch today's matches
  const { data: todaysMatches, error: matchesError } = await supabase
    .from('match_stats')
    .select(
      'player1, player2, surface, tournoi, win_rate_surf_td_p1, win_rate_surf_td_p2, momentum_td_p1, momentum_td_p2'
    )
    .eq('date_match', parisDate)

  if (matchesError || !todaysMatches || todaysMatches.length === 0) {
    return undefined
  }

  const tournaments = extractTournaments(todaysMatches)

  // ── Card 3: tournament_pace ──────────────────────────────────────────────
  //
  // SELECT pace_index (NOT surface_speed — the column does not exist in DB)
  // Surface matching uses .toLowerCase() on both sides, which aligns with the
  // existing idx_tournament_pace_lower_name_surface index that uses lower().
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

  // ── Card 2: tournament_weather per tournament ────────────────────────────
  // For each active tournament:
  //   1. Exact query: date = parisDate, hour = parisHour, name normalized match
  //   2. Fallback:    date = parisDate, hour <= parisHour, order hour DESC, limit 1
  // Use normalizeTournamentName bidirectionally on both sides.

  const weatherEntries: Array<{ name: string; weather: WeatherCardData }> = []

  for (const tournament of tournaments) {
    const normalizedName = normalizeTournamentName(tournament.name)

    // Helper: check if a DB row's name matches our normalized name bidirectionally
    const rowMatches = (rowTourneyName: string | null): boolean => {
      if (!rowTourneyName) return false
      const dbNorm = normalizeTournamentName(rowTourneyName)
      return (
        dbNorm.includes(normalizedName) ||
        normalizedName.includes(dbNorm)
      )
    }

    // Exact query: date + hour + matching name
    const { data: exactRows } = await supabase
      .from('tournament_weather')
      .select(
        'tourney_name, temperature, humidity, conditions, conditions_icon, wind_speed, pop, hour'
      )
      .eq('date', parisDate)
      .eq('hour', parisHour)
      .limit(1)

    const exactMatch = (exactRows ?? []).find((r) => rowMatches(r.tourney_name))

    if (exactMatch) {
      weatherEntries.push({
        name: tournament.name,
        weather: toWeatherCardData(exactMatch as WeatherRow),
      })
      continue
    }

    // Fallback: closest hour <= parisHour for this date + matching name
    const { data: fallbackRows } = await supabase
      .from('tournament_weather')
      .select(
        'tourney_name, temperature, humidity, conditions, conditions_icon, wind_speed, pop, hour'
      )
      .eq('date', parisDate)
      .lte('hour', parisHour)
      .order('hour', { ascending: false })
      .limit(10)

    const fallbackMatch = (fallbackRows ?? []).find((r) => rowMatches(r.tourney_name))

    if (fallbackMatch) {
      weatherEntries.push({
        name: tournament.name,
        weather: toWeatherCardData(fallbackMatch as WeatherRow),
      })
    }
    // If no match for this tournament: skip (weatherEntries stays shorter)
  }

  console.log('[computeTodaysStats] tournament_weather results:', {
    parisDate,
    parisHour,
    tournamentCount: tournaments.length,
    weatherEntryCount: weatherEntries.length,
    entries: weatherEntries.map((e) => ({ name: e.name, temp: e.weather.temperature })),
  })

  // Pass null if no tournament has weather data (no entries found)
  const weatherData: Array<{ name: string; weather: WeatherCardData }> | null =
    weatherEntries.length === 0 ? null : weatherEntries

  return buildTodaysStats(todaysMatches, tournaments, paceRows, weatherData)
}
