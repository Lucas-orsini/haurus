/**
 * MatchStats — Type representing a row from the match_stats table.
 *
 * Guaranteed non-null fields: id, date_match, player1, player2, surface.
 * All other columns (metrics, rankings, ratings, etc.) are nullable.
 * This type is consumed by DashboardOverview, MatchRow, MatchHistoryTable, and MatchMetricsModal.
 *
 * Source: match_stats table schema from Supabase Database type.
 *
 * Note: `winner` and `score` live here for backward compatibility with consumers
 * that spread MatchStats (e.g. EnrichedMatchHistory). When the source is
 * match_results, these fields are populated. When the source is match_stats,
 * they are always null — the join logic in PlayerProfileClient is the gatekeeper.
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

  // ── Match result — populated via match_results; always null when sourced from match_stats ──
  winner: string | null
  score: string | null

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

  // ── Model prediction ───────────────────────────────────────────────────
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

/**
 * EnrichedMatchHistory — extends MatchStats with the fields sourced from match_results.
 *
 * The primary query now targets match_results (which contains winner, score, tournoi,
 * surface) instead of the fragile join via match_stats. Computed fields
 * (adversaire, resultat) are added at the component level before rendering.
 *
 * @see PlayerProfileClient.tsx — enriches via query on match_results
 * @see MatchHistoryTable.tsx   — consumes EnrichedMatchHistory[]
 */
export type EnrichedMatchHistory = {
  // ── From match_results ────────────────────────────────────────────────────
  id: string
  date_match: string
  player1: string
  player2: string
  winner: string | null
  score: string | null
  tournoi: string | null
  surface: string | null
  best_of: number | null

  // ── Computed fields (added by PlayerProfileClient before passing to MatchHistoryTable) ──
  adversaire: string
  resultat: 'V' | 'D' | null
}
