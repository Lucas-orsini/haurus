'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn, formatMetricValue } from '@/lib/utils'
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
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Empty state — no match stats available for this match
  if (!matchStats) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative w-full max-w-sm bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl p-6">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150"
          >
            <X size={14} />
          </button>
          <div className="flex flex-col items-center text-center pt-2 pb-1">
            <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--text-3)]"
              >
                <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 0-2 2h-2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-1)] mb-1.5">
              Métriques non disponibles
            </h3>
            <p className="text-xs text-[var(--text-3)] max-w-[200px] leading-relaxed">
              Aucune donnée pré-match n&apos;est disponible pour ce match.
            </p>
            <button
              onClick={onClose}
              className="mt-5 h-8 px-4 flex items-center justify-center gap-1.5 rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors duration-150"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    )
  }

  const player1 = matchStats.player1
  const player2 = matchStats.player2

  const metrics: MetricRow[] = [
    { label: 'Rank', p1Key: 'rank_p1', p2Key: 'rank_p2', p1Value: matchStats.rank_p1, p2Value: matchStats.rank_p2 },
    { label: 'Glicko', p1Key: 'glicko_rating_p1', p2Key: 'glicko_rating_p2', p1Value: matchStats.glicko_rating_p1, p2Value: matchStats.glicko_rating_p2 },
    { label: 'P-Serve', p1Key: 'p_serve_p1', p2Key: 'p_serve_p2', p1Value: matchStats.p_serve_p1, p2Value: matchStats.p_serve_p2 },
    { label: 'P-Return', p1Key: 'p_return_p1', p2Key: 'p_return_p2', p1Value: matchStats.p_return_p1, p2Value: matchStats.p_return_p2 },
    { label: 'TSD', p1Key: 'tsd_p1', p2Key: 'tsd_p2', p1Value: matchStats.tsd_p1, p2Value: matchStats.tsd_p2 },
    { label: 'BPPI', p1Key: 'bppi_p1', p2Key: 'bppi_p2', p1Value: matchStats.bppi_p1, p2Value: matchStats.bppi_p2 },
    { label: 'MAP', p1Key: 'map_p1', p2Key: 'map_p2', p1Value: matchStats.map_p1, p2Value: matchStats.map_p2 },
    { label: 'Win Rate', p1Key: 'win_rate_td_p1', p2Key: 'win_rate_td_p2', p1Value: matchStats.win_rate_td_p1, p2Value: matchStats.win_rate_td_p2 },
    { label: 'Momentum', p1Key: 'momentum_td_p1', p2Key: 'momentum_td_p2', p1Value: matchStats.momentum_td_p1, p2Value: matchStats.momentum_td_p2 },
    { label: 'Forme', p1Key: 'form_p1', p2Key: 'form_p2', p1Value: matchStats.form_p1, p2Value: matchStats.form_p2 },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl max-h-[80vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-1)]">Métriques pré-match</h2>
            <p className="text-xs text-[var(--text-3)] mt-0.5">
              {matchStats.tournoi ?? 'Tournoi'} · {matchStats.date_match} · {matchStats.surface ?? 'Surface inconnue'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Players header */}
          <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-[var(--border)]">
            <div className="text-center">
              <p
                className={cn(
                  'text-sm font-semibold truncate',
                  player1 === playerName ? 'text-[var(--accent-hi)]' : 'text-[var(--text-1)]'
                )}
              >
                {player1}
              </p>
            </div>
            <div className="text-center">
              <p
                className={cn(
                  'text-sm font-semibold truncate',
                  player2 === playerName ? 'text-[var(--accent-hi)]' : 'text-[var(--text-1)]'
                )}
              >
                {player2}
              </p>
            </div>
          </div>

          {/* Metrics table */}
          <div className="space-y-0">
            {metrics.map((m) => {
              const p1Formatted = formatMetricValue(m.p1Value, m.p1Key)
              const p2Formatted = formatMetricValue(m.p2Value, m.p2Key)

              return (
                <div
                  key={m.label}
                  className="grid grid-cols-[1fr_120px_1fr] items-center gap-2 py-2.5 border-b border-[var(--border)] last:border-0"
                >
                  {/* p1 value */}
                  <div className="text-right pr-4">
                    <span className="text-sm font-mono text-[var(--text-1)] tabular-nums">
                      {p1Formatted}
                    </span>
                  </div>
                  {/* label centered */}
                  <div className="text-center">
                    <span className="text-[11px] text-[var(--text-3)] uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>
                  {/* p2 value */}
                  <div className="text-left pl-4">
                    <span className="text-sm font-mono text-[var(--text-1)] tabular-nums">
                      {p2Formatted}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
