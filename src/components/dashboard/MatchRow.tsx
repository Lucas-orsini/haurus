'use client'

import { useState } from 'react'
import { cn, getMetricColor } from '@/lib/utils'
import type { MatchStats } from '@/lib/types/match'

interface MatchRowProps {
  match: MatchStats
  isEven: boolean
}

// Metric definition for the accordion panel
interface MetricDef {
  label: string
  p1Key: keyof MatchStats
  p2Key: keyof MatchStats
  mode: 'higher' | 'lower' | 'neutral'
}

const METRIC_DEFS: MetricDef[] = [
  { label: 'Classement ATP',         p1Key: 'rank_p1',              p2Key: 'rank_p2',              mode: 'lower'   },
  { label: 'Évolution rank 6 mois', p1Key: 'delta_rank_6m_p1',     p2Key: 'delta_rank_6m_p2',     mode: 'lower'   },
  { label: 'P-Serve',               p1Key: 'p_serve_p1',            p2Key: 'p_serve_p2',            mode: 'higher'  },
  { label: 'P-Return',              p1Key: 'p_return_p1',           p2Key: 'p_return_p2',           mode: 'higher'  },
  { label: 'Glicko Rating',          p1Key: 'glicko_rating_p1',      p2Key: 'glicko_rating_p2',      mode: 'higher'  },
  { label: 'Glicko RD',             p1Key: 'glicko_rd_p1',          p2Key: 'glicko_rd_p2',          mode: 'neutral' },
  { label: 'TSD',                   p1Key: 'tsd_p1',                p2Key: 'tsd_p2',                mode: 'higher'  },
  { label: 'BPPI',                  p1Key: 'bppi_p1',               p2Key: 'bppi_p2',               mode: 'higher'  },
  { label: 'MAP',                   p1Key: 'map_p1',                p2Key: 'map_p2',                mode: 'higher'  },
  { label: 'Win Rate TD',           p1Key: 'win_rate_td_p1',        p2Key: 'win_rate_td_p2',        mode: 'higher'  },
  { label: 'Win Rate Surface TD',   p1Key: 'win_rate_surf_td_p1',   p2Key: 'win_rate_surf_td_p2',   mode: 'higher'  },
  { label: 'Win Rate 5M',          p1Key: 'win_rate_5m_p1',        p2Key: 'win_rate_5m_p2',        mode: 'neutral' },
  { label: 'Momentum TD',           p1Key: 'momentum_td_p1',        p2Key: 'momentum_td_p2',        mode: 'higher'  },
  { label: 'Breaks Won TD',        p1Key: 'breaks_won_td_p1',      p2Key: 'breaks_won_td_p2',      mode: 'higher'  },
  { label: 'Breaks Lost TD',       p1Key: 'breaks_lost_td_p1',     p2Key: 'breaks_lost_td_p2',     mode: 'lower'   },
  { label: 'Fatigue 72H',          p1Key: 'fatigue_72h_p1',        p2Key: 'fatigue_72h_p2',        mode: 'lower'   },
  { label: 'Jours de repos',       p1Key: 'jours_repos_p1',        p2Key: 'jours_repos_p2',        mode: 'neutral' },
  { label: 'Forme',                p1Key: 'form_p1',                p2Key: 'form_p2',                mode: 'neutral' },
]

// Set of keys that should be displayed as integers (no decimal)
const INTEGER_KEYS = new Set<keyof MatchStats>([
  'rank_p1', 'rank_p2', 'jours_repos_p1', 'jours_repos_p2',
])

function formatValue(value: unknown, key?: keyof MatchStats): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'number') {
    // Entiers pour Rank ATP et Jours de repos
    if (key && INTEGER_KEYS.has(key)) return Math.round(value).toString()
    // Sinon 3 décimales pour les autres valeurs numériques
    return value.toFixed(3)
  }
  return String(value)
}

export default function MatchRow({ match, isEven }: MatchRowProps) {
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
      </tr>

      {/* Accordion panel — separate table row */}
      <tr className="border-b border-[var(--border)] last:border-0">
        <td colSpan={4} className="p-0">
          <div
            className={cn(
              'overflow-hidden transition-all duration-200',
              open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="px-6 py-5 bg-[var(--surface-2)] border-t border-[var(--border)]">
              {/* Player headers — aligned with the 3-column metrics grid below */}
              <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 mb-4">
                {/* Col 1: player 1 name + rank, right-aligned */}
                <div className="flex flex-col items-end min-w-0">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate">
                    {match.player1}
                  </span>
                  {match.rank_p1 && (
                    <span className="text-[11px] text-[var(--text-3)] font-mono">
                      #{match.rank_p1}
                    </span>
                  )}
                </div>

                {/* Col 2: empty — metric labels occupy this space below */}
                <div />

                {/* Col 3: player 2 name + rank, left-aligned */}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate">
                    {match.player2}
                  </span>
                  {match.rank_p2 && (
                    <span className="text-[11px] text-[var(--text-3)] font-mono">
                      #{match.rank_p2}
                    </span>
                  )}
                </div>
              </div>

              {/* Metrics grid — scrollable, comparative, 3-column per row */}
              <div className="overflow-y-auto max-h-[420px] pr-1 -mr-1">
                <div className="space-y-0">
                  {METRIC_DEFS.map(({ label, p1Key, p2Key, mode }, idx) => {
                    const val1 = match[p1Key] as number | null
                    const val2 = match[p2Key] as number | null
                    const [classA, classB] = getMetricColor(val1, val2, mode)

                    return (
                      <div
                        key={label}
                        className={cn(
                          'grid grid-cols-[1fr_2fr_1fr] gap-3 py-2.5',
                          // Séparation visuelle : border-bottom sur toutes les lignes sauf la dernière
                          idx < METRIC_DEFS.length - 1 && 'border-b border-[var(--border)]'
                        )}
                      >
                        {/* Valeur P1 — right-aligned */}
                        <div className="flex items-center justify-end">
                          <span
                            className={cn(
                              'text-xs font-mono tabular-nums',
                              val1 === null || val1 === undefined
                                ? 'text-[var(--text-3)]'
                                : classA
                            )}
                          >
                            {formatValue(val1, p1Key)}
                          </span>
                        </div>

                        {/* Label — centered, non coloré */}
                        <div className="flex items-center justify-center">
                          <span className="text-[11px] text-[var(--text-3)] leading-none text-center">
                            {label}
                          </span>
                        </div>

                        {/* Valeur P2 — left-aligned */}
                        <div className="flex items-center justify-start">
                          <span
                            className={cn(
                              'text-xs font-mono tabular-nums',
                              val2 === null || val2 === undefined
                                ? 'text-[var(--text-3)]'
                                : classB
                            )}
                          >
                            {formatValue(val2, p2Key)}
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
