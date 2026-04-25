/**
 * Type definitions for tennis match statistics.
 * Matches the schema of the Supabase `match_stats` table.
 */

/**
 * Dynamic metrics associated with a match.
 * Keys are metric names (e.g., "p_serve", "glicko2", "bppi").
 * Values are numeric — rating, percentage, or count.
 */
export type MatchMetrics = Record<string, number>

/**
 * A single row from the `match_stats` table.
 */
export interface MatchStats {
  id: string
  date: string
  tournament: string
  player1_name: string
  player2_name: string
  surface: string
  metrics: MatchMetrics
}
