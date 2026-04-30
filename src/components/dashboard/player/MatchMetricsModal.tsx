'use client'

import { X } from 'lucide-react'
import { cn, formatMetricValue, getMetricColor } from '@/lib/utils'
import type { MatchStats } from '@/lib/types/match'
import { METRIC_DEFS } from '@/components/dashboard/MatchRow'

interface MatchMetricsModalProps {
  isOpen: boolean
  stats: MatchStats | null
  playerName: string
  player1: string
  player2: string
  onClose: () => void
}

export default function MatchMetricsModal({
  isOpen,
  stats,
  playerName,
  player1,
  player2,
  onClose,
}: MatchMetricsModalProps) {
  // Ne rien rendre si le modal est fermé
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal content */}
      <div className="relative w-full max-w-lg bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
          <h2 className="text-sm font-semibold text-[var(--text-1)]">
            Métriques pré-match
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md
                       hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)]
                       transition-colors duration-150"
            aria-label="Fermer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        {stats === null ? (
          // Stats non disponibles
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-[var(--border)] flex items-center justify-center mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--text-2)]">
              Métriques pré-match non disponibles pour ce match
            </p>
          </div>
        ) : (
          <div className="px-5 py-5 max-h-[70vh] overflow-y-auto">
            {/* En-têtes joueurs */}
            <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 mb-4 pb-3 border-b border-[var(--border)]">
              <div className="flex flex-col items-center min-w-0">
                <span className="text-xs font-medium text-[var(--text-1)] truncate">
                  {player1}
                </span>
              </div>
              <div />
              <div className="flex flex-col items-center min-w-0">
                <span className="text-xs font-medium text-[var(--text-1)] truncate">
                  {player2}
                </span>
              </div>
            </div>

            {/* Métriques — exclut 'Forme' (non demandé dans la spec) */}
            <div className="space-y-0">
              {METRIC_DEFS.filter((m) => m.label !== 'Forme').map((metric, idx, arr) => {
                // Cast explicite de la clé pour permettre l'indexation sur MatchStats
                const p1Key = metric.p1Key as keyof MatchStats
                const p2Key = metric.p2Key as keyof MatchStats
                const val1 = stats[p1Key] as number | null
                const val2 = stats[p2Key] as number | null
                const [classA, classB] = getMetricColor(
                  val1,
                  val2,
                  // Le mode de METRIC_DEFS dans MatchRow.tsx est 'higher'|'lower'|'neutral'
                  // On le passe tel quel — getMetricColor accepte ce sous-ensemble
                  metric.mode as 'higher' | 'lower' | 'neutral'
                )

                const isGlickoP1 = p1Key === 'glicko_rating_p1'
                const isGlickoP2 = p2Key === 'glicko_rating_p2'

                // Extraire le RD pour Glicko
                const rdP1 = isGlickoP1 ? (stats.glicko_rd_p1 as number | null) : null
                const rdP2 = isGlickoP2 ? (stats.glicko_rd_p2 as number | null) : null

                return (
                  <div
                    key={metric.label}
                    className={cn(
                      'grid grid-cols-[1fr_2fr_1fr] gap-3 py-2.5',
                      idx < arr.length - 1 && 'border-b border-[var(--border)]'
                    )}
                  >
                    {/* Valeur P1 */}
                    <div className="flex flex-col items-center">
                      {isGlickoP1 ? (
                        <>
                          <span className={cn('text-xs font-mono tabular-nums', classA)}>
                            {val1 !== null ? Math.round(val1) : '—'}
                          </span>
                          {rdP1 !== null && (
                            <span className="text-[10px] text-[var(--text-3)] mt-0.5">
                              RD&nbsp;{Math.round(rdP1)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span
                          className={cn(
                            'text-xs font-mono tabular-nums',
                            val1 === null || val1 === undefined
                              ? 'text-[var(--text-3)]'
                              : classA
                          )}
                        >
                          {formatMetricValue(val1, p1Key as string)}
                        </span>
                      )}
                    </div>

                    {/* Label métrique */}
                    <div className="flex items-center justify-center">
                      <span className="text-[11px] text-[var(--text-3)] leading-none text-center">
                        {metric.label}
                      </span>
                    </div>

                    {/* Valeur P2 */}
                    <div className="flex flex-col items-center">
                      {isGlickoP2 ? (
                        <>
                          <span className={cn('text-xs font-mono tabular-nums', classB)}>
                            {val2 !== null ? Math.round(val2) : '—'}
                          </span>
                          {rdP2 !== null && (
                            <span className="text-[10px] text-[var(--text-3)] mt-0.5">
                              RD&nbsp;{Math.round(rdP2)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span
                          className={cn(
                            'text-xs font-mono tabular-nums',
                            val2 === null || val2 === undefined
                              ? 'text-[var(--text-3)]'
                              : classB
                          )}
                        >
                          {formatMetricValue(val2, p2Key as string)}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legende */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-[var(--border)]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[var(--green)]" />
                <span className="text-[10px] text-[var(--text-3)]">Avantage {playerName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[var(--red)]" />
                <span className="text-[10px] text-[var(--text-3)]">Désavantage {playerName}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
