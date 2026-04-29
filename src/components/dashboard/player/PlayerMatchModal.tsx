'use client'

import { useEffect } from 'react'
import { X, Info } from 'lucide-react'
import { cn, formatMetricValue, getBetterValue } from '@/lib/utils'
import type { Database } from '@/lib/supabase/database.types'

type MatchStat = Database['public']['Tables']['match_stats']['Row']

interface PlayerMatchModalProps {
  isOpen: boolean
  onClose: () => void
  matchStats: MatchStat | null
  playerName: string
}

interface MetricRow {
  label: string
  p1Key: string
  p2Key: string
  p1Value: unknown
  p2Value: unknown
}

export default function PlayerMatchModal({ isOpen, onClose, matchStats, playerName }: PlayerMatchModalProps) {
  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // ── État vide : pas de match_stats ─────────────────────────────────────
  if (!matchStats) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative w-full max-w-2xl bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl max-h-[80vh] flex flex-col overflow-hidden">
          <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-1)]">Métriques pré-match</h2>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center min-h-[200px]">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
              <Info size={18} className="text-[var(--accent-hi)]" strokeWidth={1.5} />
            </div>
            <p className="text-sm text-[var(--text-2)]">Métriques pré-match non disponibles pour ce match</p>
          </div>
        </div>
      </div>
    )
  }

  const player1 = matchStats.player1
  const player2 = matchStats.player2

  // ── Les 17 métriques à afficher ────────────────────────────────────────
  const metrics: MetricRow[] = [
    { label: 'Rank ATP',       p1Key: 'rank_p1',           p2Key: 'rank_p2',           p1Value: matchStats.rank_p1,           p2Value: matchStats.rank_p2 },
    { label: 'Δ Rank 6M',      p1Key: 'delta_rank_6m_p1',  p2Key: 'delta_rank_6m_p2',  p1Value: matchStats.delta_rank_6m_p1,  p2Value: matchStats.delta_rank_6m_p2 },
    { label: 'P-Serve',        p1Key: 'p_serve_p1',        p2Key: 'p_serve_p2',        p1Value: matchStats.p_serve_p1,        p2Value: matchStats.p_serve_p2 },
    { label: 'P-Return',       p1Key: 'p_return_p1',        p2Key: 'p_return_p2',        p1Value: matchStats.p_return_p1,        p2Value: matchStats.p_return_p2 },
    { label: 'Glicko',         p1Key: 'glicko_rating_p1',  p2Key: 'glicko_rating_p2',  p1Value: matchStats.glicko_rating_p1,  p2Value: matchStats.glicko_rating_p2 },
    { label: 'TSD',            p1Key: 'tsd_p1',            p2Key: 'tsd_p2',            p1Value: matchStats.tsd_p1,            p2Value: matchStats.tsd_p2 },
    { label: 'BPPI',           p1Key: 'bppi_p1',           p2Key: 'bppi_p2',           p1Value: matchStats.bppi_p1,           p2Value: matchStats.bppi_p2 },
    { label: 'MAP',            p1Key: 'map_p1',             p2Key: 'map_p2',             p1Value: matchStats.map_p1,             p2Value: matchStats.map_p2 },
    { label: 'Win Rate TD',    p1Key: 'win_rate_td_p1',    p2Key: 'win_rate_td_p2',    p1Value: matchStats.win_rate_td_p1,    p2Value: matchStats.win_rate_td_p2 },
    { label: 'Win Rate Surf',  p1Key: 'win_rate_surf_td_p1', p2Key: 'win_rate_surf_td_p2', p1Value: matchStats.win_rate_surf_td_p1, p2Value: matchStats.win_rate_surf_td_p2 },
    { label: 'Momentum',       p1Key: 'momentum_td_p1',     p2Key: 'momentum_td_p2',    p1Value: matchStats.momentum_td_p1,    p2Value: matchStats.momentum_td_p2 },
    { label: 'Breaks Won',     p1Key: 'breaks_won_td_p1',   p2Key: 'breaks_won_td_p2',  p1Value: matchStats.breaks_won_td_p1,  p2Value: matchStats.breaks_won_td_p2 },
    { label: 'Breaks Lost',    p1Key: 'breaks_lost_td_p1',  p2Key: 'breaks_lost_td_p2', p1Value: matchStats.breaks_lost_td_p1, p2Value: matchStats.breaks_lost_td_p2 },
    { label: 'Fatigue 72H',    p1Key: 'fatigue_72h_p1',     p2Key: 'fatigue_72h_p2',    p1Value: matchStats.fatigue_72h_p1,    p2Value: matchStats.fatigue_72h_p2 },
    { label: 'Repos',          p1Key: 'jours_repos_p1',    p2Key: 'jours_repos_p2',    p1Value: matchStats.jours_repos_p1,    p2Value: matchStats.jours_repos_p2 },
    { label: 'Forme',          p1Key: 'form_p1',           p2Key: 'form_p2',           p1Value: matchStats.form_p1,           p2Value: matchStats.form_p2 },
  ]

  function getColor(better: 'p1' | 'p2' | null, cell: 'p1' | 'p2'): string {
    if (better === null) return 'text-[var(--text-1)]'
    if (better === cell) return 'text-[var(--green)]'
    return 'text-[var(--red)]'
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl max-h-[80vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-1)]">Métriques pré-match</h2>
            <p className="text-xs text-[var(--text-3)] mt-0.5">
              {matchStats.tournoi ?? 'Tournoi'} · {matchStats.date_match} · {matchStats.surface ?? 'Surface inconnu'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto p-5">

          {/* Joueurs header — nom + rank en dessous */}
          <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-[var(--border)]">
            <div className="text-center">
              <p className={cn(
                'text-sm font-semibold truncate',
                player1 === playerName ? 'text-[var(--accent-hi)]' : 'text-[var(--text-1)]'
              )}>
                {player1}
              </p>
              <p className="text-[9px] text-[var(--text-3)] mt-0.5 font-mono tabular-nums">
                {matchStats.rank_p1 != null ? `#${matchStats.rank_p1}` : '—'}
              </p>
            </div>
            <div className="text-center">
              <p className={cn(
                'text-sm font-semibold truncate',
                player2 === playerName ? 'text-[var(--accent-hi)]' : 'text-[var(--text-1)]'
              )}>
                {player2}
              </p>
              <p className="text-[9px] text-[var(--text-3)] mt-0.5 font-mono tabular-nums">
                {matchStats.rank_p2 != null ? `#${matchStats.rank_p2}` : '—'}
              </p>
            </div>
          </div>

          {/* Metrics table */}
          <div className="space-y-0">
            {metrics.map((m) => {
              const p1Val = m.p1Value as number | string | null
              const p2Val = m.p2Value as number | string | null
              const p1Formatted = formatMetricValue(p1Val, m.p1Key)
              const p2Formatted = formatMetricValue(p2Val, m.p2Key)

              // Coloration comparative — null pour jours_repos (pas de coloration)
              const isJoursRepos = m.label === 'Repos'
              const better = isJoursRepos ? null : getBetterValue(p1Val as number | null, p2Val as number | null, m.p1Key)
              const p1Color = getColor(better, 'p1')
              const p2Color = getColor(better, 'p2')

              // Cas spécial Glicko : afficher le RD en sous-texte
              const isGlicko = m.label === 'Glicko'
              const p1Rd = isGlicko ? matchStats.glicko_rd_p1 : null
              const p2Rd = isGlicko ? matchStats.glicko_rd_p2 : null

              return (
                <div
                  key={m.label}
                  className="grid grid-cols-[1fr_120px_120px_1fr] items-start gap-2 py-2.5 border-b border-[var(--border)] last:border-0"
                >
                  {/* Valeur p1 */}
                  <div className="text-right pr-4">
                    <span className={cn('text-sm font-mono tabular-nums', p1Color)}>
                      {p1Formatted}
                    </span>
                    {isGlicko && p1Rd != null && (
                      <span className="block text-[9px] text-[var(--text-3)] font-mono mt-0.5">
                        ±{Math.round(p1Rd)}
                      </span>
                    )}
                  </div>

                  {/* Label centré */}
                  <div className="text-center">
                    <span className="text-[11px] text-[var(--text-3)] uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>

                  {/* Valeur p2 */}
                  <div className="text-left pl-4">
                    <span className={cn('text-sm font-mono tabular-nums', p2Color)}>
                      {p2Formatted}
                    </span>
                    {isGlicko && p2Rd != null && (
                      <span className="block text-[9px] text-[var(--text-3)] font-mono mt-0.5">
                        ±{Math.round(p2Rd)}
                      </span>
                    )}
                  </div>

                  {/* Espacement droit */}
                  <div />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
