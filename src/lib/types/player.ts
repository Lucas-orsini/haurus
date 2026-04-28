/**
 * Player-related TypeScript types.
 *
 * These types correspond exactly to Supabase table columns:
 * - player_stats   → PlayerStatsRow, StatsHistoryEntry
 * - atp_averages  → AtpAverageRow
 * - match_results → MatchResultRow
 * - match_stats    → MatchStatsRow
 *
 * Consumed by Route Handlers and (via props) PlayerProfile frontend components.
 */

// ── Json type (inline — no @/lib/types/database dependency) ──────────────────

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ── Surface ────────────────────────────────────────────────────────────────────

export type Surface = 'Hard' | 'Clay' | 'Grass'

// ── Player Stats (player_stats table) ────────────────────────────────────────

/**
 * Row from the player_stats table.
 *
 * Surface-specific metrics are stored in suffixed columns (glicko_hard, p_serve_clay, etc.).
 * Global metrics (bppi, momentum_td, win_rate_td) are not surface-specific.
 */
export interface PlayerStatsRow {
  id: string
  player_name: string
  rank: number | null

  // Glicko-2 ratings per surface
  glicko_hard: number | null
  glicko_rd_hard: number | null
  glicko_clay: number | null
  glicko_rd_clay: number | null
  glicko_grass: number | null
  glicko_rd_grass: number | null

  // Serve percentages per surface
  p_serve_hard: number | null
  p_return_hard: number | null
  p_serve_clay: number | null
  p_return_clay: number | null
  p_serve_grass: number | null
  p_return_grass: number | null

  // Serve differentials per surface
  tsd_hard: number | null
  tsd_clay: number | null
  tsd_grass: number | null

  // Break point percentage index — global (not surface-specific)
  bppi: number | null

  // Model probability per surface
  map_hard: number | null
  map_clay: number | null
  map_grass: number | null

  // Recent form
  form: string | null

  // Win rates
  win_rate_td: number | null
  win_rate_hard_td: number | null
  win_rate_clay_td: number | null
  win_rate_grass_td: number | null
  win_rate_5m: number | null

  // Momentum — global
  momentum_td: number | null

  // Breaks — global
  breaks_won_td: number | null
  breaks_lost_td: number | null

  // Fatigue — global
  fatigue_72h: number | null
  jours_repos: number | null

  // Rank delta
  delta_rank_6m: number | null

  // Meta
  last_match_date: string | null
  stats_history: Json | null
  updated_at: string | null
}

// ── Stats History ─────────────────────────────────────────────────────────────

/**
 * Single entry from the player stats history JSON array.
 * date: ISO date string (YYYY-MM-DD)
 * value: numeric value of the tracked metric on that date
 * key: optional metric key (e.g., 'glicko', 'p_serve')
 */
export interface StatsHistoryEntry {
  date: string
  value: number
  key?: string
}

// ── ATP Averages (atp_averages table) ────────────────────────────────────────

/**
 * Row from the atp_averages table.
 * Contains ATP-level averages per surface for comparison in metric cards.
 */
export interface AtpAverageRow {
  id: string
  surface: string | null
  p_serve: number | null
  p_return: number | null
  glicko: number | null
  tsd: number | null
  bppi: number | null
  momentum_td: number | null
  win_rate_td: number | null
  breaks_won: number | null
  breaks_lost: number | null
  updated_at: string | null
}

// ── Match Results (match_results table) ───────────────────────────────────────

/**
 * Row from the match_results table.
 * Used to display the 5 most recent matches in PlayerMatchHistory.
 */
export interface MatchResultRow {
  id: string
  date_match: string
  player1: string
  player2: string
  winner: string | null
  loser: string | null
  score: string | null
  tournoi: string | null
  surface: string | null
  best_of: number | null
  round: string | null
  minutes: number | null
  rank_winner: number | null
  rank_loser: number | null
  created_at: string | null
}

// ── Match Stats (match_stats table) ───────────────────────────────────────────

/**
 * Row from the match_stats table.
 * Used in MatchMetricsModal to display pre-match metrics for both players.
 * Guaranteed non-null: id, date_match, player1, player2, surface.
 * All other columns are nullable.
 */
export interface MatchStatsRow {
  id: string
  created_at: string | null
  date_match: string
  player1: string
  player2: string
  surface: string | null
  tournoi: string | null
  best_of: number | null

  rank_p1: number | null
  rank_p2: number | null
  delta_rank_6m_p1: number | null
  delta_rank_6m_p2: number | null

  p_serve_p1: number | null
  p_serve_p2: number | null
  p_return_p1: number | null
  p_return_p2: number | null

  glicko_rating_p1: number | null
  glicko_rating_p2: number | null
  glicko_rd_p1: number | null
  glicko_rd_p2: number | null

  tsd_p1: number | null
  tsd_p2: number | null
  bppi_p1: number | null
  bppi_p2: number | null

  map_p1: number | null
  map_p2: number | null

  form_p1: string | null
  form_p2: string | null

  win_rate_td_p1: number | null
  win_rate_td_p2: number | null
  win_rate_surf_td_p1: number | null
  win_rate_surf_td_p2: number | null
  win_rate_5m_p1: number | null
  win_rate_5m_p2: number | null

  momentum_td_p1: number | null
  momentum_td_p2: number | null
  fatigue_72h_p1: number | null
  fatigue_72h_p2: number | null

  breaks_won_td_p1: number | null
  breaks_won_td_p2: number | null
  breaks_lost_td_p1: number | null
  breaks_lost_td_p2: number | null

  jours_repos_p1: number | null
  jours_repos_p2: number | null
}

// ── Next Match ────────────────────────────────────────────────────────────────

/**
 * Lightweight representation of the next upcoming match,
 * used only to determine the default surface when loading a player profile.
 */
export interface NextMatchInfo {
  surface: string
}

// ── API Response Shapes ─────────────────────────────────────────────────────────

export interface PlayerSearchResponse {
  results: Array<{ player_name: string }>
}

export interface PlayerProfileData {
  playerStats: PlayerStatsRow | null
  atpAverage: AtpAverageRow | null
  statsHistory: StatsHistoryEntry[]
  recentMatches: MatchResultRow[]
  nextMatch: NextMatchInfo | null
}
