'use client'

import { useState } from 'react'
import { cn, formatMetricValue, formatForme, getDeltaColor, getMetricColor } from '@/lib/utils'
import type { MatchStats } from '@/lib/types/match'
import FavoriteButton from './FavoriteButton'
import MetricTooltip from '@/components/ui/MetricTooltip'

interface MatchRowProps {
  match: MatchStats
  isEven: boolean
  isFavorite: boolean
  onToggleFavorite: (matchId: string, favorited: boolean) => void
}

interface MetricDef {
  label: string
  p1Key: keyof MatchStats
  p2Key: keyof MatchStats
  mode: 'higher' | 'lower' | 'neutral'
}

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

export const METRIC_TOOLTIPS: Record<string, string> = {
  'ATP Ranking': "Official ATP ranking of the player. The lower the number, the better the player.",
  'Rank change 6 months': "Change in ATP ranking over the last 6 months. A negative value means the player has improved in the rankings.",
  'P-Serve': "Probability of winning a point when the player serves, calculated from recent matches. The higher the value, the more effective they are on serve.",
  'P-Return': "Probability of winning a point when returning serve. The higher the value, the more they trouble opponents on their serve.",
  'Glicko Rating': "Surface-specific rating system, more precise than ATP ranking. Recalculated after each match and includes uncertainty about the player's level. The higher the value, the better the player on this surface.",
  'TSD': "Measures how much the player dominates on serve compared to the ATP average on this surface. A positive value means they are above average, negative means they are below.",
  'BPPI': "Measures whether the player resists break points better or worse than expected. A positive value means they save more break points than their stats suggest.",
  'MAP': "Theoretical match win probability, calculated point by point from both players' serve and return statistics. Independent of odds.",
  'Win Rate TD': "Win percentage of the player over the recent period, all surfaces combined. Recent matches carry more weight than older ones.",
  'Win Rate Surface TD': "Win percentage of the player on this tournament's surface, calculated over the recent period. Captures surface specialization.",
  'Momentum TD': "Compares the player's very recent form to their usual form on this surface. A positive value means they are overperforming right now, negative means they are below their usual level.",
  'Breaks Won TD': "Average number of service breaks per match on this surface recently. Measures the ability to capitalize on return opportunities.",
  'Breaks Lost TD': "Average number of breaks conceded per match on this surface recently. The lower the value, the better the player holds serve under pressure.",
  'Fatigue 72H': "Cumulative minutes played in this tournament and in the 72 hours before the match. The higher this value, the more physically demanding the approach to this match.",
  'Rest days': "Number of days since the last match played. Reflects the player's physical freshness approaching the match.",
  'Form': "Results of the last 5 matches played. W = win, L = loss. The most recent match is shown last.",
}

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
        {/* Date — hidden on mobile */}
        <td className="px-4 py-3.5 whitespace-nowrap hidden md:table-cell">
          <span className="text-xs font-mono text-[var(--text-3)] tabular-nums">
            {match.date_match}
          </span>
        </td>

        {/* Tournoi — hidden on mobile */}
        <td className="px-4 py-3.5 max-w-[180px] hidden md:table-cell">
          <span className="truncate block text-sm text-[var(--text-2)]">
            {match.tournoi ?? '—'}
          </span>
        </td>

        {/* Joueurs */}
        <td className="px-2 md:px-4 py-3.5 min-w-0">
          <span className="text-xs md:text-sm text-[var(--text-1)] whitespace-normal md:whitespace-nowrap">
            {match.player1}{' '}
            <span className="text-[var(--text-3)] text-[10px] md:text-xs mx-1">vs</span>{' '}
            {match.player2}
          </span>
        </td>

        {/* Surface */}
        <td className="px-4 py-3.5 whitespace-nowrap hidden md:table-cell">
          <span className="text-xs text-[var(--text-3)]">
            {match.surface ?? '—'}
          </span>
        </td>

        {/* Favoris — touch target 44px */}
        <td className="px-2 md:px-4 py-3.5 min-h-[44px] flex items-center">
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
              open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="px-4 md:px-6 py-5 bg-[var(--surface-2)] border-t border-[var(--border)]">

              {/* Desktop: player headers in 3-column grid */}
              <div className="hidden md:grid grid-cols-[1fr_2fr_1fr] gap-3 mb-4">
                <div className="flex flex-col items-center min-w-0">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate">
                    {match.player1}
                  </span>
                </div>
                <div />
                <div className="flex flex-col items-center min-w-0">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate">
                    {match.player2}
                  </span>
                </div>
              </div>

              {/* Mobile: player names stacked */}
              <div className="flex md:hidden mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[var(--text-1)]">{match.player1}</span>
                  <span className="text-[10px] text-[var(--text-3)]">vs</span>
                  <span className="text-xs font-medium text-[var(--text-1)]">{match.player2}</span>
                </div>
              </div>

              {/* Metrics grid */}
              <div>
                <div className="space-y-0">
                  {METRIC_DEFS.map(({ label, p1Key, p2Key, mode }, idx) => {
                    const val1 = match[p1Key] as number | null
                    const val2 = match[p2Key] as number | null
                    const [classA, classB] = getMetricColor(val1, val2, mode as 'higher' | 'lower' | 'neutral')
                    const isGlickoP1 = p1Key === 'glicko_rating_p1'
                    const isGlickoP2 = p2Key === 'glicko_rating_p2'

                    return (
                      <>
                        {/* Desktop row */}
                        <div
                          key={`desktop-${label}`}
                          className={cn(
                            'hidden md:grid grid-cols-[1fr_2fr_1fr] gap-3 py-2.5',
                            idx < METRIC_DEFS.length - 1 && 'border-b border-[var(--border)]'
                          )}
                        >
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

                          <div className="flex items-center justify-center">
                            <MetricTooltip
                              label={label}
                              tooltip={METRIC_TOOLTIPS[label] ?? ''}
                            />
                          </div>

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

                        {/* Mobile: 2-column grid, each cell is a compact metric card */}
                        <div
                          key={`mobile-${label}`}
                          className={cn(
                            'grid md:hidden grid-cols-2 gap-x-4 gap-y-0 py-2 px-0',
                            idx < METRIC_DEFS.length - 1 && 'border-b border-[var(--border)]'
                          )}
                        >
                          {/* Cell content: 3 compact rows */}
                          <div className="flex flex-col gap-px">
                            {/* Row 1: label */}
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-[var(--text-3)] leading-tight">{label}</span>
                              <MetricTooltip
                                label=""
                                tooltip={METRIC_TOOLTIPS[label] ?? ''}
                              />
                            </div>
                            {/* Row 2: player1 name + value */}
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-[var(--text-3)] leading-tight truncate max-w-[90px]">{match.player1}</span>
                              <span
                                className={cn(
                                  'text-xs font-mono tabular-nums font-medium leading-tight shrink-0',
                                  val1 === null || val1 === undefined
                                    ? 'text-[var(--text-3)]'
                                    : isGlickoP1
                                      ? 'text-[var(--text-1)]'
                                      : classA
                                )}
                              >
                                {isGlickoP1 ? (
                                  <span className={cn(classA)}>
                                    {val1 !== null ? Math.round(val1) : '—'}
                                  </span>
                                ) : p1Key === 'form_p1' ? (
                                  <FormeCell value={match.form_p1} small />
                                ) : p1Key === 'delta_rank_6m_p1' ? (
                                  <span className={cn(getDeltaColor(val1))}>
                                    {formatMetricValue(val1, p1Key as string)}
                                  </span>
                                ) : (
                                  <span>{formatMetricValue(val1, p1Key as string)}</span>
                                )}
                              </span>
                            </div>
                            {/* Row 3: player2 name + value */}
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-[var(--text-3)] leading-tight truncate max-w-[90px]">{match.player2}</span>
                              <span
                                className={cn(
                                  'text-xs font-mono tabular-nums font-medium leading-tight shrink-0',
                                  val2 === null || val2 === undefined
                                    ? 'text-[var(--text-3)]'
                                    : isGlickoP2
                                      ? 'text-[var(--text-1)]'
                                      : classB
                                )}
                              >
                                {isGlickoP2 ? (
                                  <span className={cn(classB)}>
                                    {val2 !== null ? Math.round(val2) : '—'}
                                  </span>
                                ) : p2Key === 'form_p2' ? (
                                  <FormeCell value={match.form_p2} small />
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
                        </div>
                      </>
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

function FormeCell({ value, small }: { value: string | null; small?: boolean }) {
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
            seg.color === 'neutral' && 'text-[var(--text-3)]',
            small && 'text-[10px]',
            !small && 'text-xs'
          )}
        >
          {seg.char}
        </span>
      ))}
    </span>
  )
}
