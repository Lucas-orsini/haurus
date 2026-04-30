'use client'

import { useState } from 'react'
import { cn, formatMetricValue, formatForme, getDeltaColor, getMetricColor } from '@/lib/utils'
import type { MatchStats } from '@/lib/types/match'
import FavoriteButton from './FavoriteButton'

interface MatchRowProps {
  match: MatchStats
  isEven: boolean
  isFavorite: boolean
  onToggleFavorite: (matchId: string, favorited: boolean) => void
}

/**
 * Metric definition for the accordion panel.
 * This local interface mirrors the MetricDef shape expected by METRIC_DEFS.
 */
interface MetricDef {
  label: string
  p1Key: keyof MatchStats
  p2Key: keyof MatchStats
  mode: 'higher' | 'lower' | 'neutral'
}

/**
 * Ordered list of all 16 pre-match metrics displayed in the accordion panel.
 * Exported so MatchMetricsModal can import the same definitions.
 */
export const METRIC_DEFS: MetricDef[] = [
  { label: 'Classement ATP',         p1Key: 'rank_p1',              p2Key: 'rank_p2',              mode: 'lower'   },
  { label: 'Évolution rank 6 mois', p1Key: 'delta_rank_6m_p1',     p2Key: 'delta_rank_6m_p2',     mode: 'lower'   },
  { label: 'P-Serve',               p1Key: 'p_serve_p1',            p2Key: 'p_serve_p2',            mode: 'higher'  },
  { label: 'P-Return',              p1Key: 'p_return_p1',           p2Key: 'p_return_p2',           mode: 'higher'  },
  { label: 'Glicko Rating',          p1Key: 'glicko_rating_p1',      p2Key: 'glicko_rating_p2',      mode: 'higher'  },
  { label: 'TSD',                   p1Key: 'tsd_p1',                p2Key: 'tsd_p2',                mode: 'higher'  },
  { label: 'BPPI',                  p1Key: 'bppi_p1',               p2Key: 'bppi_p2',               mode: 'higher'  },
  { label: 'MAP',                   p1Key: 'map_p1',                p2Key: 'map_p2',                mode: 'higher'  },
  { label: 'Win Rate TD',           p1Key: 'win_rate_td_p1',        p2Key: 'win_rate_td_p2',        mode: 'higher'  },
  { label: 'Win Rate Surface TD',   p1Key: 'win_rate_surf_td_p1',   p2Key: 'win_rate_surf_td_p2',   mode: 'higher'  },
  { label: 'Momentum TD',           p1Key: 'momentum_td_p1',        p2Key: 'momentum_td_p2',        mode: 'higher'  },
  { label: 'Breaks Won TD',        p1Key: 'breaks_won_td_p1',      p2Key: 'breaks_won_td_p2',      mode: 'higher'  },
  { label: 'Breaks Lost TD',       p1Key: 'breaks_lost_td_p1',     p2Key: 'breaks_lost_td_p2',     mode: 'lower'   },
  { label: 'Fatigue 72H',          p1Key: 'fatigue_72h_p1',        p2Key: 'fatigue_72h_p2',        mode: 'lower'   },
  { label: 'Jours de repos',       p1Key: 'jours_repos_p1',        p2Key: 'jours_repos_p2',        mode: 'neutral' },
  { label: 'Forme',                p1Key: 'form_p1',                p2Key: 'form_p2',                mode: 'neutral' },
]

export default function MatchRow({ match, isEven, isFavorite, onToggleFavorite }: MatchRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Row */}
      <tr
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'border-b border-[var(--border)] last:border-0 cursor-pointer transition-colors duration-150',
          isEven ? 'bg-[var(--surface-1)]' : 'bg-[var(--bg)]',
          'hover:bg-white/[0.02]'
        )}
      >
        {/* Date */}
        <td className="px-4 py-3.5 whitespace-nowrap">
          <span className="text-xs font-mono text-[var(--text-3)] tabular-nums">
            {match.date_match}
          </span>
        </td>

        {/* Tournoi */}
        <td className="px-4 py-3.5 max-w-[180px]">
          <span className="truncate block text-sm text-[var(--text-2)]">
            {match.tournoi ?? '—'}
          </span>
        </td>

        {/* Joueurs */}
        <td className="px-4 py-3.5 min-w-0">
          <span className="text-sm text-[var(--text-1)] whitespace-nowrap">
            {match.player1}{' '}
            <span className="text-[var(--text-3)] text-xs mx-1">vs</span>{' '}
            {match.player2}
          </span>
        </td>

        {/* Surface */}
        <td className="px-4 py-3.5 whitespace-nowrap">
          <span className="text-xs text-[var(--text-3)]">
            {match.surface ?? '—'}
          </span>
        </td>

        {/* Favoris */}
        <td className="px-4 py-3.5">
          <FavoriteButton
            matchId={match.id}
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
          />
        </td>
      </tr>

      {/* Accordion panel — separate table row */}
      <tr className="border-b border-[var(--border)] last:border-0">
        <td colSpan={5} className="p-0">
          <div
            className={cn(
              'overflow-hidden transition-all duration-200',
              open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="px-6 py-5 bg-[var(--surface-2)] border-t border-[var(--border)]">
              {/* Player headers — aligned with the 3-column metrics grid below */}
              <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 mb-4">
                {/* Col 1: player 1 name, centered */}
                <div className="flex flex-col items-center min-w-0">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate">
                    {match.player1}
                  </span>
                </div>

                {/* Col 2: empty — metric labels occupy this space below */}
                <div />

                {/* Col 3: player 2 name, centered */}
                <div className="flex flex-col items-center min-w-0">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate">
                    {match.player2}
                  </span>
                </div>
              </div>

              {/* Metrics grid — comparative, 3-column per row */}
              <div>
                <div className="space-y-0">
                  {METRIC_DEFS.map(({ label, p1Key, p2Key, mode }, idx) => {
                    const val1 = match[p1Key] as number | null
                    const val2 = match[p2Key] as number | null
                    const [classA, classB] = getMetricColor(val1, val2, mode)

                    const isGlickoP1 = p1Key === 'glicko_rating_p1'
                    const isGlickoP2 = p2Key === 'glicko_rating_p2'

                    return (
                      <div
                        key={label}
                        className={cn(
                          'grid grid-cols-[1fr_2fr_1fr] gap-3 py-2.5',
                          idx < METRIC_DEFS.length - 1 && 'border-b border-[var(--border)]'
                        )}
                      >
                        {/* Valeur P1 — centered */}
                        <div className="flex items-center justify-center">
                          <span
                            className={cn(
                              'text-xs font-mono tabular-nums',
                              val1 === null || val1 === undefined
                                ? 'text-[var(--text-3)]'
                                : isGlickoP1
                                  ? ''
                                  : classA
                            )}
                          >
                            {isGlickoP1 ? (
                              <span className={cn(classA)}>
                                {val1 !== null ? Math.round(val1) : '—'}
                              </span>
                            ) : p1Key === 'form_p1' ? (
                              <FormeCell value={match.form_p1} />
                            ) : p1Key === 'delta_rank_6m_p1' ? (
                              <span className={cn(getDeltaColor(val1))}>
                                {formatMetricValue(val1, p1Key as string)}
                              </span>
                            ) : (
                              <span>{formatMetricValue(val1, p1Key as string)}</span>
                            )}
                          </span>
                        </div>

                        {/* Label — centered */}
                        <div className="flex items-center justify-center">
                          <span className="text-[11px] text-[var(--text-3)] leading-none text-center">
                            {label}
                          </span>
                        </div>

                        {/* Valeur P2 — centered */}
                        <div className="flex items-center justify-center">
                          <span
                            className={cn(
                              'text-xs font-mono tabular-nums',
                              val2 === null || val2 === undefined
                                ? 'text-[var(--text-3)]'
                                : isGlickoP2
                                  ? ''
                                  : classB
                            )}
                          >
                            {isGlickoP2 ? (
                              <span className={cn(classB)}>
                                {val2 !== null ? Math.round(val2) : '—'}
                              </span>
                            ) : p2Key === 'form_p2' ? (
                              <FormeCell value={match.form_p2} />
                            ) : p2Key === 'delta_rank_6m_p2' ? (
                              <span className={cn(getDeltaColor(val2))}>
                                {formatMetricValue(val2, p2Key as string)}
                              </span>
                            ) : (
                              <span>{formatMetricValue(val2, p2Key as string)}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

// ─── Sous-composants pour les cas spéciaux ───────────────────────────────────

/**
 * Affiche la forme (V/D/N) avec couleurs : V=vert, D=rouge, N=neutre.
 * Séparé par des espaces.
 */
function FormeCell({ value }: { value: string | null }) {
  const segments = formatForme(value)

  if (!segments) {
    return <span className="text-[var(--text-3)]">—</span>
  }

  return (
    <span className="flex items-center gap-px">
      {segments.map((seg, i) => (
        <span
          key={i}
          className={cn(
            seg.color === 'green'  && 'text-[var(--green)]',
            seg.color === 'red'    && 'text-[var(--red)]',
            seg.color === 'neutral' && 'text-[var(--text-3)]'
          )}
        >
          {seg.char}
        </span>
      ))}
    </span>
  )
}
