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
export type EnrichedMatchHistory = MatchStats

/**
 * Metric definition for the metrics comparison panel.
 * Used by MatchRow, MatchMetricsModal, and any other component
 * that needs to render the comparative metrics table.
 */
export type MetricDefMode =
  | 'higher'
  | 'lower'
  | 'neutral'
  | 'delta'
  | 'rank'
  | 'breaks_lost'
  | 'fatigue'
  | 'delta_rank'

export interface MetricDef {
  label: string
  p1Key: keyof MatchStats
  p2Key: keyof MatchStats
  mode: MetricDefMode
}

/**
 * Ordered list of all 16 pre-match metrics to display in the comparison table.
 * Forme is excluded from the modal (only used in MatchRow).
 */
export const METRIC_DEFS: MetricDef[] = [
  { label: 'Classement ATP',         p1Key: 'rank_p1',              p2Key: 'rank_p2',              mode: 'rank'       },
  { label: 'Évolution rank 6 mois', p1Key: 'delta_rank_6m_p1',     p2Key: 'delta_rank_6m_p2',     mode: 'delta_rank' },
  { label: 'P-Serve',               p1Key: 'p_serve_p1',            p2Key: 'p_serve_p2',            mode: 'higher'     },
  { label: 'P-Return',              p1Key: 'p_return_p1',           p2Key: 'p_return_p2',           mode: 'higher'     },
  { label: 'Glicko Rating',          p1Key: 'glicko_rating_p1',      p2Key: 'glicko_rating_p2',      mode: 'higher'     },
  { label: 'TSD',                   p1Key: 'tsd_p1',                p2Key: 'tsd_p2',                mode: 'higher'     },
  { label: 'BPPI',                  p1Key: 'bppi_p1',               p2Key: 'bppi_p2',               mode: 'higher'     },
  { label: 'MAP',                   p1Key: 'map_p1',                p2Key: 'map_p2',                mode: 'higher'     },
  { label: 'Win Rate TD',           p1Key: 'win_rate_td_p1',        p2Key: 'win_rate_td_p2',        mode: 'higher'     },
  { label: 'Win Rate Surface TD',   p1Key: 'win_rate_surf_td_p1',   p2Key: 'win_rate_surf_td_p2',   mode: 'higher'     },
  { label: 'Momentum TD',           p1Key: 'momentum_td_p1',        p2Key: 'momentum_td_p2',        mode: 'higher'     },
  { label: 'Breaks Won TD',        p1Key: 'breaks_won_td_p1',      p2Key: 'breaks_won_td_p2',      mode: 'higher'     },
  { label: 'Breaks Lost TD',       p1Key: 'breaks_lost_td_p1',     p2Key: 'breaks_lost_td_p2',     mode: 'breaks_lost'},
  { label: 'Fatigue 72H',          p1Key: 'fatigue_72h_p1',        p2Key: 'fatigue_72h_p2',        mode: 'fatigue'    },
  { label: 'Jours de repos',       p1Key: 'jours_repos_p1',        p2Key: 'jours_repos_p2',        mode: 'neutral'    },
  { label: 'Forme',                p1Key: 'form_p1',                p2Key: 'form_p2',                mode: 'neutral'    },
]
