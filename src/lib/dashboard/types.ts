/**
 * Dashboard shared types — loaded from match_stats table.
 */

export interface MatchRow {
  id: string
  created_at: string | null
  date_match: string
  tournoi: string | null
  surface: string | null
  best_of: number | null
  player1: string
  player2: string
  rank_p1: number | null
  rank_p2: number | null
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
  momentum_td_p1: number | null
  momentum_td_p2: number | null
  breaks_won_td_p1: number | null
  breaks_won_td_p2: number | null
  breaks_lost_td_p1: number | null
  breaks_lost_td_p2: number | null
  fatigue_72h_p1: number | null
  fatigue_72h_p2: number | null
  jours_repos_p1: number | null
  jours_repos_p2: number | null
  delta_rank_6m_p1: number | null
  delta_rank_6m_p2: number | null
  win_rate_5m_p1: number | null
  win_rate_5m_p2: number | null
}

export interface MetricDefinition {
  key: string
  label: string
  format: 'pct' | 'rank' | 'glicko' | 'integer' | 'form'
}
