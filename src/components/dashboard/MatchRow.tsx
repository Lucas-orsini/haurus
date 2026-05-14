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
  'Classement ATP': 'Rang officiel ATP du joueur. Plus le chiffre est bas, meilleur est le joueur.',
  'Évolution rank 6 mois': "Variation du classement ATP sur les 6 derniers mois. Une valeur négative signifie que le joueur a progressé au classement.",
  'P-Serve': 'Probabilité de remporter un point quand le joueur sert, calculée sur ses matchs récents. Plus la valeur est haute, plus il est efficace au service.',
  'P-Return': 'Probabilité de remporté un point quand le joueur est en retour de service. Plus la valeur est haute, plus il gêne l\'adversaire sur son service.',
  'Glicko Rating': 'Système de rating par surface, plus précis que le classement ATP. Il se recalcule après chaque match et intègre l\'incertitude autour du niveau du joueur. Plus la valeur est haute, meilleur est le joueur sur cette surface.',
  'TSD': "Mesure à quel point le joueur domine au service par rapport à la moyenne ATP sur cette surface. Une valeur positive indique qu'il est au-dessus de la moyenne, négative qu'il est en dessous.",
  'BPPI': 'Mesure si le joueur résiste mieux ou moins bien que prévu sur les balles de break. Une valeur positive indique qu\'il sauve plus de balles de break que ce que ses statistiques laissent attendre.',
  'Win Rate TD': 'Pourcentage de victoires du joueur sur la période récente, toutes surfaces confondues. Les matchs récents ont plus de poids que les anciens.',
  'Win Rate Surface TD': 'Pourcentage de victoires du joueur sur la surface de ce tournoi, calculé sur la période récente. Capture la spécialisation sur cette surface.',
  'Momentum TD': 'Compare la forme très récente du joueur à sa forme habituelle sur cette surface. Une valeur positive signifie qu\'il surperforme en ce moment, négative qu\'il est en dessous de son niveau habituel.',
  'Breaks Won TD': 'Nombre moyen de breaks de service réalisés par match sur cette surface récemment. Mesure la capacité à concrétiser les opportunités sur le service adverse.',
  'Breaks Lost TD': 'Nombre moyen de breaks concédés par match sur cette surface récemment. Plus la valeur est basse, mieux le joueur tient son service sous pression.',
  'Fatigue 72H': 'Cumul des minutes jouées dans ce tournoi et dans les 72 heures précédant le match. Plus cette valeur est haute, plus le joueur aborde ce match avec une charge physique importante.',
  'Jours de repos': 'Nombre de jours depuis le dernier match joué. Reflète la fraîcheur physique du joueur à l\'approche du match.',
  'Forme': "Résultats des 5 derniers matchs joués. V = victoire, D = défaite. Le match le plus récent est affiché en dernier.",
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
                    const [classA, classB] = getMetricColor(val1, val2, mode)
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
