/**
 * MatchStats — Type representing a row from the match_stats table.
 *
 * Guaranteed non-null fields: id, date_match, player1, player2, surface.
 * All other columns (metrics, rankings, ratings, etc.) are nullable.
 * This type is consumed by DashboardOverview, MatchRow, MatchHistoryTable, and MatchMetricsModal.
 *
 * Source: match_stats table schema from Supabase Database type.
 *
 * @TODO: data pipeline — match_stats does not have `score` or `winner` columns.
 *        - `winner` exists in match_results but not in match_stats.
 *        - `score` exists in match_results but not in match_stats.
 *        The data pipeline should add both columns directly to match_stats
 *        or maintain a join on (date_match, player1, player2) to populate them.
 */
export type MatchStats = {
  // ── Primary identifiers ──────────────────────────────────────────────────
  id: string
  created_at: string | null

  // ── Match context — guaranteed non-null ────────────────────────────────
  date_match: string
  player1: string
  player2: string
  surface: string | null
  tournoi: string | null
  best_of: number | null

  // ── Match result (populated via join with match_results) ──────────────
  // TODO: data pipeline — winner exists in match_results but not in match_stats
  winner: string | null

  // ── Rankings ───────────────────────────────────────────────────────────
  rank_p1: number | null
  rank_p2: number | null
  delta_rank_6m_p1: number | null
  delta_rank_6m_p2: number | null

  // ── Serve / Return percentages ─────────────────────────────────────────
  p_serve_p1: number | null
  p_serve_p2: number | null
  p_return_p1: number | null
  p_return_p2: number | null

  // ── Glicko-2 ratings ────────────────────────────────────────────────────
  glicko_rating_p1: number | null
  glicko_rating_p2: number | null
  glicko_rd_p1: number | null
  glicko_rd_p2: number | null

  // ── Serve/return differentials ─────────────────────────────────────────
  tsd_p1: number | null
  tsd_p2: number | null
  bppi_p1: number | null
  bppi_p2: number | null

  // ── Model prediction ────────────────────────────────────────────────────
  map_p1: number | null
  map_p2: number | null

  // ── Recent form (string of V/D characters) ─────────────────────────────
  form_p1: string | null
  form_p2: string | null

  // ── Win rates ───────────────────────────────────────────────────────────
  win_rate_td_p1: number | null
  win_rate_td_p2: number | null
  win_rate_surf_td_p1: number | null
  win_rate_surf_td_p2: number | null
  win_rate_5m_p1: number | null
  win_rate_5m_p2: number | null

  // ── Momentum & fatigue ───────────────────────────────────────────────────
  momentum_td_p1: number | null
  momentum_td_p2: number | null
  fatigue_72h_p1: number | null
  fatigue_72h_p2: number | null

  // ── Breaks ──────────────────────────────────────────────────────────────
  breaks_won_td_p1: number | null
  breaks_won_td_p2: number | null
  breaks_lost_td_p1: number | null
  breaks_lost_td_p2: number | null

  // ── Rest days before match ──────────────────────────────────────────────
  jours_repos_p1: number | null
  jours_repos_p2: number | null
}
