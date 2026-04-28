/**
 * Shared TypeScript types for the Player Profile feature.
 *
 * These types are derived from the Supabase schema:
 * - player_stats      → PlayerSearchResult, PlayerSurfaceStats
 * - atp_averages      → AtpAverages
 * - match_results     → PlayerMatch
 * - match_stats       → PlayerMatchStats
 *
 * All types are non-nullable where the schema guarantees a value,
 * nullable everywhere else.
 */

/**
 * PlayerSearchResult — lightweight row for the search dropdown.
 * Consumed by PlayerProfileClient (search results list).
 */
export type PlayerSearchResult = {
  id: string
  player_name: string
  rank: number | null
}

/**
 * Columns in player_stats that vary by surface.
 * Used to index the right column at runtime via keyof SurfaceColumns.
 */
export type SurfaceColumns = {
  hard: {
    glicko: number | null
    glicko_rd: number | null
    p_serve: number | null
    p_return: number | null
    tsd: number | null
    map: number | null
    win_rate_td: number | null
  }
  clay: SurfaceColumns['hard']
  grass: SurfaceColumns['hard']
}

/**
 * PlayerSurfaceStats — full surface-specific snapshot from player_stats.
 * Consumed by PlayerMetricCards and PlayerStatsChart.
 */
export type PlayerSurfaceStats = {
  id: string
  player_name: string
  rank: number | null
  form: string | null
  bppi: number | null
  momentum_td: number | null
  fatigue_72h: number | null
  jours_repos: number | null
  delta_rank_6m: number | null
  win_rate_td: number | null
  win_rate_5m: number | null
  breaks_won_td: number | null
  breaks_lost_td: number | null
  last_match_date: string | null
  updated_at: string | null
  /** stats_history is a dict { "YYYY-MM-DD": { metricName: number, ... } } */
  stats_history: Record<string, Record<string, number>> | null
  // Per-surface columns — access via SurfaceKey
  glicko_hard: number | null
  glicko_rd_hard: number | null
  glicko_clay: number | null
  glicko_rd_clay: number | null
  glicko_grass: number | null
  glicko_rd_grass: number | null
  p_serve_hard: number | null
  p_return_hard: number | null
  p_serve_clay: number | null
  p_return_clay: number | null
  p_serve_grass: number | null
  p_return_grass: number | null
  tsd_hard: number | null
  tsd_clay: number | null
  tsd_grass: number | null
  map_hard: number | null
  map_clay: number | null
  map_grass: number | null
  win_rate_hard_td: number | null
  win_rate_clay_td: number | null
  win_rate_grass_td: number | null
}

/** Valid surface keys matching player_stats columns and atp_averages.surface. */
export type SurfaceKey = 'hard' | 'clay' | 'grass'

/**
 * AtpAverages — ATP average benchmarks per surface from atp_averages table.
 * Consumed by PlayerMetricCards for the "vs ATP avg" comparison.
 */
export type AtpAverages = {
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

/**
 * StatsHistoryPoint — a single data point for the evolution chart.
 * Derived by parsing the stats_history JSON dict from player_stats.
 */
export type StatsHistoryPoint = {
  date: string
  value: number
}

/**
 * PlayerMatch — a completed match from match_results.
 * Consumed by PlayerMatchHistory (table rows).
 *
 * result: 'W' if the authenticated player was the winner, 'L' if the loser.
 * opponent: the other player's name.
 */
export type PlayerMatch = {
  id: string
  date_match: string
  player1: string
  player2: string
  /** Always populated in match_results */
  winner: string | null
  loser: string | null
  /** Derived: 'W' if player_name === winner, 'L' if player_name === loser */
  result: 'W' | 'L'
  /** Name of the opponent (the other player) */
  opponent: string
  tournoi: string | null
  surface: string | null
  round: string | null
  score: string | null
  best_of: number | null
  minutes: number | null
  rank_winner: number | null
  rank_loser: number | null
}

/**
 * PlayerMatchStats — pre-match metrics for both players in a given match.
 * Consumed by PlayerMatchModal (side-by-side comparison table).
 *
 * player1 is the authenticated player; player2 is the opponent.
 * Column naming follows the match_stats schema (_p1 / _p2 suffix).
 */
export type PlayerMatchStats = {
  id: string
  date_match: string
  player1: string
  player2: string
  surface: string | null
  tournoi: string | null
  best_of: number | null
  // Rankings — player 1
  rank_p1: number | null
  delta_rank_6m_p1: number | null
  // Rankings — player 2
  rank_p2: number | null
  delta_rank_6m_p2: number | null
  // Serve percentages — player 1
  p_serve_p1: number | null
  p_return_p1: number | null
  // Serve percentages — player 2
  p_serve_p2: number | null
  p_return_p2: number | null
  // Glicko ratings — player 1
  glicko_rating_p1: number | null
  glicko_rd_p1: number | null
  // Glicko ratings — player 2
  glicko_rating_p2: number | null
  glicko_rd_p2: number | null
  // Serve/return differentials — player 1
  tsd_p1: number | null
  bppi_p1: number | null
  // Serve/return differentials — player 2
  tsd_p2: number | null
  bppi_p2: number | null
  // Model prediction — player 1
  map_p1: number | null
  // Model prediction — player 2
  map_p2: number | null
  // Recent form — player 1
  form_p1: string | null
  // Recent form — player 2
  form_p2: string | null
  // Win rates — player 1
  win_rate_td_p1: number | null
  win_rate_surf_td_p1: number | null
  win_rate_5m_p1: number | null
  // Win rates — player 2
  win_rate_td_p2: number | null
  win_rate_surf_td_p2: number | null
  win_rate_5m_p2: number | null
  // Momentum & fatigue — player 1
  momentum_td_p1: number | null
  fatigue_72h_p1: number | null
  jours_repos_p1: number | null
  // Momentum & fatigue — player 2
  momentum_td_p2: number | null
  fatigue_72h_p2: number | null
  jours_repos_p2: number | null
  // Breaks — player 1
  breaks_won_td_p1: number | null
  breaks_lost_td_p1: number | null
  // Breaks — player 2
  breaks_won_td_p2: number | null
  breaks_lost_td_p2: number | null
}
