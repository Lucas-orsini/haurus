'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPlayerMetric, formatMomentum, formatFullDate } from '@/lib/player/utils'
import type { MatchStatsRow } from '@/lib/types/player'

interface MatchMetricsModalProps {
  isOpen: boolean
  onClose: () => void
  player1: string
  player2: string
  date: string
  matchStats: MatchStatsRow | null
}

interface MetricRowProps {
  label: string
  valueP1: string
  valueP2: string
}

function MetricRow({ label, valueP1, valueP2 }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
      <p className="text-xs text-[var(--text-3)] uppercase tracking-wider w-32 shrink-0">{label}</p>
      <div className="flex items-center gap-4 flex-1 justify-center">
        <span className="text-sm font-medium text-[var(--text-1)] tabular-nums font-mono text-right w-20">
          {valueP1}
        </span>
        <div className="w-px h-4 bg-[var(--border)] shrink-0" />
        <span className="text-sm font-medium text-[var(--text-1)] tabular-nums font-mono text-left w-20">
          {valueP2}
        </span>
      </div>
    </div>
  )
}

export default function MatchMetricsModal({
  isOpen,
  onClose,
  player1,
  player2,
  date,
  matchStats,
}: MatchMetricsModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handler)
      return () => document.removeEventListener('keydown', handler)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Fallback if matchStats not available
  if (!matchStats) {
    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="w-full max-w-md bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <h2 className="text-sm font-semibold text-[var(--text-1)]">
              {player1} vs {player2}
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          <div className="px-5 py-6">
            <p className="text-sm text-[var(--text-3)] text-center">
              Métriques pré-match non disponibles.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Format rank: integer or '—'
  const formatRank = (v: number | null) => {
    if (v === null) return '—'
    return Math.round(v).toString()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-1)]">
              {player1} vs {player2}
            </h2>
            <p className="text-xs text-[var(--text-3)] mt-0.5">
              {formatFullDate(date)} · {matchStats.surface ?? '—'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Player headers */}
        <div className="flex items-center justify-between px-5 py-3 bg-[var(--surface-2)] border-b border-[var(--border)]">
          <p className="text-sm font-medium text-[var(--text-1)] truncate max-w-[120px]">{player1}</p>
          <p className="text-[11px] text-[var(--text-3)] font-mono uppercase tracking-wider">vs</p>
          <p className="text-sm font-medium text-[var(--text-1)] truncate max-w-[120px] text-right">{player2}</p>
        </div>

        {/* Metrics grid */}
        <div className="px-5 py-2">
          <MetricRow
            label="Rang ATP"
            valueP1={formatRank(matchStats.rank_p1)}
            valueP2={formatRank(matchStats.rank_p2)}
          />
          <MetricRow
            label="Glicko-2"
            valueP1={formatPlayerMetric('glicko_rating_p1', matchStats.glicko_rating_p1)}
            valueP2={formatPlayerMetric('glicko_rating_p2', matchStats.glicko_rating_p2)}
          />
          <MetricRow
            label="P-Serve%"
            valueP1={formatPlayerMetric('p_serve_p1', matchStats.p_serve_p1)}
            valueP2={formatPlayerMetric('p_serve_p2', matchStats.p_serve_p2)}
          />
          <MetricRow
            label="P-Return%"
            valueP1={formatPlayerMetric('p_return_p1', matchStats.p_return_p1)}
            valueP2={formatPlayerMetric('p_return_p2', matchStats.p_return_p2)}
          />
          <MetricRow
            label="Win Rate Surf."
            valueP1={formatPlayerMetric('win_rate_surf_td_p1', matchStats.win_rate_surf_td_p1)}
            valueP2={formatPlayerMetric('win_rate_surf_td_p2', matchStats.win_rate_surf_td_p2)}
          />
          <MetricRow
            label="Momentum TD"
            valueP1={formatMomentum(matchStats.momentum_td_p1)}
            valueP2={formatMomentum(matchStats.momentum_td_p2)}
          />
          <MetricRow
            label="BPPI"
            valueP1={formatPlayerMetric('bppi_p1', matchStats.bppi_p1)}
            valueP2={formatPlayerMetric('bppi_p2', matchStats.bppi_p2)}
          />
          <MetricRow
            label="TSD"
            valueP1={formatPlayerMetric('tsd_p1', matchStats.tsd_p1)}
            valueP2={formatPlayerMetric('tsd_p2', matchStats.tsd_p2)}
          />
          <MetricRow
            label="Breaks Won"
            valueP1={formatPlayerMetric('breaks_won_td_p1', matchStats.breaks_won_td_p1)}
            valueP2={formatPlayerMetric('breaks_won_td_p2', matchStats.breaks_won_td_p2)}
          />
          <MetricRow
            label="Fatigue 72H"
            valueP1={matchStats.fatigue_72h_p1 !== null ? `${Math.round(matchStats.fatigue_72h_p1)} min` : '—'}
            valueP2={matchStats.fatigue_72h_p2 !== null ? `${Math.round(matchStats.fatigue_72h_p2)} min` : '—'}
          />
          <MetricRow
            label="Repos"
            valueP1={matchStats.jours_repos_p1 !== null ? `${Math.round(matchStats.jours_repos_p1)}j` : '—'}
            valueP2={matchStats.jours_repos_p2 !== null ? `${Math.round(matchStats.jours_repos_p2)}j` : '—'}
          />
          <MetricRow
            label="Δ Rang 6M"
            valueP1={matchStats.delta_rank_6m_p1 !== null
              ? `${matchStats.delta_rank_6m_p1 >= 0 ? '+' : ''}${Math.round(matchStats.delta_rank_6m_p1)}`
              : '—'}
            valueP2={matchStats.delta_rank_6m_p2 !== null
              ? `${matchStats.delta_rank_6m_p2 >= 0 ? '+' : ''}${Math.round(matchStats.delta_rank_6m_p2)}`
              : '—'}
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[var(--border)] flex items-center justify-end">
          <button
            onClick={onClose}
            className="h-8 px-4 flex items-center justify-center rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
