'use client'

import { useMemo } from 'react'
import { X } from 'lucide-react'
import { cn, formatMetricValue, getMetricColor } from '@/lib/utils'
import { useDictionary } from '@/components/providers/locale-provider'
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
  onClose,
}: MatchMetricsModalProps) {
  const dict = useDictionary()

  // Ne rien rendre si le modal est fermé
  if (!isOpen) return null

  // Détection de l'orientation : playerName est-il stocké en player1 (à gauche) en base ?
  const isPlayerOnLeft = useMemo(
    () => (stats ? stats.player1 === playerName : true),
    [stats, playerName]
  )

  // Noms affichés : toujours playerName à gauche, opponent à droite
  const leftPlayer  = isPlayerOnLeft ? stats?.player1 : stats?.player2
  const rightPlayer = isPlayerOnLeft ? stats?.player2 : stats?.player1

  // Ranks affichés selon l'orientation en base (rank_p1 pour le joueur en player1, rank_p2 pour celui en player2)
  const leftRank  = isPlayerOnLeft ? stats?.rank_p1 : stats?.rank_p2
  const rightRank = isPlayerOnLeft ? stats?.rank_p2 : stats?.rank_p1

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal content */}
      <div className="relative w-full max-w-none md:max-w-lg bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
          <h2 className="text-sm font-semibold text-[var(--text-1)]">
            {dict.player.matchMetricsModal.title}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md
                       hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)]
                       transition-colors duration-150"
            aria-label={dict.player.matchMetricsModal.close}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        {stats === null ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-[var(--border)] flex items-center justify-center mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--text-2)]">
              {dict.player.matchMetricsModal.unavailable}
            </p>
          </div>
        ) : (
          <div className="px-5 py-5 max-h-[70vh] overflow-y-auto">
            {/* En-têtes joueurs */}
            <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr] gap-3 mb-4 pb-3 border-b border-[var(--border)]">
              <div className="flex flex-col items-center min-w-0">
                <span className="text-xs font-medium text-[var(--text-1)] truncate">
                  {leftPlayer}
                </span>
                <span className="text-[10px] text-[var(--text-3)] font-mono mt-0.5">
                  {leftRank !== null && leftRank !== undefined ? `#${leftRank}` : '—'}
                </span>
              </div>
              <div className="hidden md:block" />
              <div className="flex flex-col items-center min-w-0">
                <span className="text-xs font-medium text-[var(--text-1)] truncate">
                  {rightPlayer}
                </span>
                <span className="text-[10px] text-[var(--text-3)] font-mono mt-0.5">
                  {rightRank !== null && rightRank !== undefined ? `#${rightRank}` : '—'}
                </span>
              </div>
            </div>

            {/* Métriques */}
            <div className="space-y-0">
              {METRIC_DEFS.filter((m) => m.label !== 'Forme').map((metric, idx, arr) => {
                const p1Key = metric.p1Key as keyof MatchStats
                const p2Key = metric.p2Key as keyof MatchStats

                const rawP1 = stats[p1Key] as number | null
                const rawP2 = stats[p2Key] as number | null

                const val1 = isPlayerOnLeft ? rawP1 : rawP2
                const val2 = isPlayerOnLeft ? rawP2 : rawP1

                let [classA, classB] = getMetricColor(
                  rawP1,
                  rawP2,
                  metric.mode as 'higher' | 'lower' | 'neutral'
                )
                if (!isPlayerOnLeft) {
                  ;[classA, classB] = [classB, classA]
                }

                const isGlickoP1 = p1Key === 'glicko_rating_p1'
                const isGlickoP2 = p2Key === 'glicko_rating_p2'

                const rdP1 = isGlickoP1 ? (stats.glicko_rd_p1 as number | null) : null
                const rdP2 = isGlickoP2 ? (stats.glicko_rd_p2 as number | null) : null

                const leftRd  = isPlayerOnLeft ? rdP1 : rdP2
                const rightRd = isPlayerOnLeft ? rdP2 : rdP1

                return (
                  <div
                    key={metric.label}
                    className={cn(
                      'grid grid-cols-[1fr_2fr_1fr] gap-3 py-2.5',
                      idx < arr.length - 1 && 'border-b border-[var(--border)]'
                    )}
                  >
                    {/* Valeur à gauche */}
                    <div className="flex flex-col items-center">
                      {isGlickoP1 ? (
                        <>
                          <span className={cn('text-xs font-mono tabular-nums', classA)}>
                            {val1 !== null ? Math.round(val1) : '—'}
                          </span>
                          {leftRd !== null && (
                            <span className="text-[10px] text-[var(--text-3)] mt-0.5">
                              RD&nbsp;{Math.round(leftRd)}
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

                    {/* Valeur à droite */}
                    <div className="flex flex-col items-center">
                      {isGlickoP2 ? (
                        <>
                          <span className={cn('text-xs font-mono tabular-nums', classB)}>
                            {val2 !== null ? Math.round(val2) : '—'}
                          </span>
                          {rightRd !== null && (
                            <span className="text-[10px] text-[var(--text-3)] mt-0.5">
                              RD&nbsp;{Math.round(rightRd)}
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

            {/* Légende */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-[var(--border)]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[var(--green)]" />
                <span className="text-[10px] text-[var(--text-3)]">
                  {dict.player.matchMetricsModal.advantage.replace('{player}', playerName)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[var(--red)]" />
                <span className="text-[10px] text-[var(--text-3)]">
                  {dict.player.matchMetricsModal.disadvantage.replace('{player}', playerName)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
