'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getMetricColor } from '@/lib/utils'
import { formatMetricValue } from '@/lib/utils'
import type { MatchStats } from '@/lib/types/match'

interface MatchMetricsModalProps {
  matchStats: MatchStats | null
  playerName: string
  onClose: () => void
}

/**
 * Row definition for the metrics comparison table.
 * label: displayed in the left label column
 * p1Key / p2Key: keys passed to formatMetricValue
 * mode: 'higher' | 'lower' | 'neutral' | 'delta'
 *   'higher' → higher value = green for player1
 *   'lower'  → lower value = green for player1
 *   'delta'  → negative = green (improvement)
 *   'neutral'→ no coloring
 * isBreak: if true, inserts a horizontal divider before this row
 */
interface MetricRow {
  label: string
  p1Key: string
  p2Key: string
  mode: 'higher' | 'lower' | 'neutral' | 'delta'
  isBreak?: boolean
  suffix?: string
}

// Ordered metrics with grouping labels
const METRIC_ROWS: Array<MetricRow | null> = [
  null, // header spacer — handled via isBreak on first metric
  { label: 'Classement ATP', p1Key: 'rank_p1', p2Key: 'rank_p2', mode: 'lower' },
  { label: 'Δ Classement 6M', p1Key: 'delta_rank_6m_p1', p2Key: 'delta_rank_6m_p2', mode: 'delta' },
  null, // break
  { label: 'P-Serve', p1Key: 'p_serve_p1', p2Key: 'p_serve_p2', mode: 'higher' },
  { label: 'P-Return', p1Key: 'p_return_p1', p2Key: 'p_return_p2', mode: 'higher' },
  null, // break
  { label: 'Glicko Rating', p1Key: 'glicko_rating_p1', p2Key: 'glicko_rating_p2', mode: 'higher' },
  { label: 'Glicko RD', p1Key: 'glicko_rd_p1', p2Key: 'glicko_rd_p2', mode: 'neutral' },
  null, // break
  { label: 'TSD', p1Key: 'tsd_p1', p2Key: 'tsd_p2', mode: 'higher' },
  { label: 'BPPI', p1Key: 'bppi_p1', p2Key: 'bppi_p2', mode: 'higher' },
  null, // break
  { label: 'Win Rate TD', p1Key: 'win_rate_td_p1', p2Key: 'win_rate_td_p2', mode: 'higher' },
  { label: 'Win Rate Surface TD', p1Key: 'win_rate_surf_td_p1', p2Key: 'win_rate_surf_td_p2', mode: 'higher' },
  { label: 'MAP', p1Key: 'map_p1', p2Key: 'map_p2', mode: 'higher' },
  null, // break
  { label: 'Momentum TD', p1Key: 'momentum_td_p1', p2Key: 'momentum_td_p2', mode: 'higher' },
  { label: 'Fatigue 72H', p1Key: 'fatigue_72h_p1', p2Key: 'fatigue_72h_p2', mode: 'lower' },
  { label: 'Jours de repos', p1Key: 'jours_repos_p1', p2Key: 'jours_repos_p2', mode: 'neutral' },
  null, // break
  { label: 'Breaks Won TD', p1Key: 'breaks_won_td_p1', p2Key: 'breaks_won_td_p2', mode: 'higher' },
  { label: 'Breaks Lost TD', p1Key: 'breaks_lost_td_p1', p2Key: 'breaks_lost_td_p2', mode: 'lower' },
]

function getValue(stats: MatchStats, key: string): number | null {
  const val = (stats as unknown as Record<string, unknown>)[key]
  return typeof val === 'number' ? val : null
}

export default function MatchMetricsModal({
  matchStats,
  playerName,
  onClose,
}: MatchMetricsModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const hasStats = matchStats !== null

  // Determine which column corresponds to the current player
  // (match_stats stores player1 = first entry, player2 = second entry)
  const isP1 = hasStats && matchStats.player1 === playerName
  const isP2 = hasStats && matchStats.player2 === playerName

  // Derive the display names based on which player is current
  const p1Display = hasStats ? matchStats.player1 : 'Joueur 1'
  const p2Display = hasStats ? matchStats.player2 : 'Joueur 2'

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-2xl bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Métriques pré-match"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-sm font-semibold text-[var(--text-1)]">
              Métriques pré-match
            </h2>
            {hasStats && matchStats.tournoi && (
              <p className="text-xs text-[var(--text-3)]">{matchStats.tournoi}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150"
            aria-label="Fermer"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {!hasStats ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[var(--text-3)]"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <p className="text-sm font-medium text-[var(--text-2)]">
                Métriques pré-match non disponibles
              </p>
              <p className="text-xs text-[var(--text-3)] mt-1 max-w-xs">
                Les données de préparation pour ce match ne sont pas présentes dans notre base.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                {/* Player name headers */}
                <thead>
                  <tr>
                    <th className="pb-3 pr-4 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider w-1/3" />
                    <th className="pb-3 px-2 text-center text-[11px] font-semibold text-[var(--text-1)] w-1/3">
                      {p1Display}
                    </th>
                    <th className="pb-3 pl-2 text-center text-[11px] font-semibold text-[var(--text-1)] w-1/3">
                      {p2Display}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {METRIC_ROWS.map((row, idx) => {
                    // Section separator
                    if (row === null) {
                      return (
                        <tr key={`sep-${idx}`}>
                          <td colSpan={3} className="pt-2 pb-1">
                            <div className="h-px bg-[var(--border)]" />
                          </td>
                        </tr>
                      )
                    }

                    const v1 = getValue(matchStats, row.p1Key)
                    const v2 = getValue(matchStats, row.p2Key)
                    const [cls1, cls2] = getMetricColor(v1, v2, row.mode)

                    // Special handling for Glicko Rating — show RD below in small text
                    const isGlicko = row.p1Key === 'glicko_rating_p1'

                    return (
                      <tr key={row.label} className="group">
                        {/* Label */}
                        <td className="py-2 pr-4 text-[12px] text-[var(--text-2)] text-left">
                          {row.label}
                        </td>

                        {/* Player 1 value */}
                        <td className={cn('py-2 px-2 text-center font-mono text-[12px]', cls1)}>
                          {isGlicko ? (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="tabular-nums">
                                {formatMetricValue(getValue(matchStats, 'glicko_rating_p1'), 'glicko_rating_p1')}
                              </span>
                              <span className="text-[10px] text-[var(--text-3)] font-mono">
                                RD{' '}
                                {formatMetricValue(getValue(matchStats, 'glicko_rd_p1'), 'glicko_rd_p1')}
                              </span>
                            </div>
                          ) : (
                            <span className="tabular-nums">
                              {formatMetricValue(v1, row.p1Key)}
                            </span>
                          )}
                        </td>

                        {/* Player 2 value */}
                        <td className={cn('py-2 pl-2 text-center font-mono text-[12px]', cls2)}>
                          {isGlicko ? (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="tabular-nums">
                                {formatMetricValue(getValue(matchStats, 'glicko_rating_p2'), 'glicko_rating_p2')}
                              </span>
                              <span className="text-[10px] text-[var(--text-3)] font-mono">
                                RD{' '}
                                {formatMetricValue(getValue(matchStats, 'glicko_rd_p2'), 'glicko_rd_p2')}
                              </span>
                            </div>
                          ) : (
                            <span className="tabular-nums">
                              {formatMetricValue(v2, row.p2Key)}
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-5 py-4 border-t border-[var(--border)]">
          <button
            onClick={onClose}
            className="h-8 px-4 flex items-center justify-center rounded-md
                       border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06]
                       text-[var(--text-2)] text-xs font-medium transition-colors duration-150"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
