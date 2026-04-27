'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
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
}

const METRIC_DEFS: MetricDef[] = [
  { label: 'Classement ATP', p1Key: 'rank_p1', p2Key: 'rank_p2' },
  { label: 'Évolution rank 6 mois', p1Key: 'delta_rank_6m_p1', p2Key: 'delta_rank_6m_p2' },
  { label: 'P-Serve', p1Key: 'p_serve_p1', p2Key: 'p_serve_p2' },
  { label: 'P-Return', p1Key: 'p_return_p1', p2Key: 'p_return_p2' },
  { label: 'Glicko Rating', p1Key: 'glicko_rating_p1', p2Key: 'glicko_rating_p2' },
  { label: 'Glicko RD', p1Key: 'glicko_rd_p1', p2Key: 'glicko_rd_p2' },
  { label: 'TSD', p1Key: 'tsd_p1', p2Key: 'tsd_p2' },
  { label: 'BPPI', p1Key: 'bppi_p1', p2Key: 'bppi_p2' },
  { label: 'MAP', p1Key: 'map_p1', p2Key: 'map_p2' },
  { label: 'Win Rate TD', p1Key: 'win_rate_td_p1', p2Key: 'win_rate_td_p2' },
  { label: 'Win Rate Surface TD', p1Key: 'win_rate_surf_td_p1', p2Key: 'win_rate_surf_td_p2' },
  { label: 'Win Rate 5M', p1Key: 'win_rate_5m_p1', p2Key: 'win_rate_5m_p2' },
  { label: 'Momentum TD', p1Key: 'momentum_td_p1', p2Key: 'momentum_td_p2' },
  { label: 'Breaks Won TD', p1Key: 'breaks_won_td_p1', p2Key: 'breaks_won_td_p2' },
  { label: 'Breaks Lost TD', p1Key: 'breaks_lost_td_p1', p2Key: 'breaks_lost_td_p2' },
  { label: 'Fatigue 72H', p1Key: 'fatigue_72h_p1', p2Key: 'fatigue_72h_p2' },
  { label: 'Jours de repos', p1Key: 'jours_repos_p1', p2Key: 'jours_repos_p2' },
  { label: 'Forme', p1Key: 'form_p1', p2Key: 'form_p2' },
]

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'number') {
    if (Number.isInteger(value)) return value.toString()
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

              {/* Metrics grid — true 3-column: P1 values | labels | P2 values */}
              <div className="grid grid-cols-[1fr_2fr_1fr] gap-3">
                {/* Column 1: player 1 metric values — right-aligned */}
                <div className="flex flex-col gap-3">
                  {METRIC_DEFS.map(({ label, p1Key }) => {
                    const val1 = match[p1Key]
                    return (
                      <div key={label} className="flex items-center justify-end h-[20px]">
                        <span
                          className={cn(
                            'text-xs font-mono tabular-nums',
                            val1 === null || val1 === undefined
                              ? 'text-[var(--text-3)]'
                              : 'text-[var(--text-1)]'
                          )}
                        >
                          {formatValue(val1)}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Column 2: metric labels — left-aligned */}
                <div className="flex flex-col gap-3">
                  {METRIC_DEFS.map(({ label }) => (
                    <div key={label} className="flex items-center h-[20px]">
                      <span className="text-[11px] text-[var(--text-3)] leading-none">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Column 3: player 2 metric values — left-aligned */}
                <div className="flex flex-col gap-3">
                  {METRIC_DEFS.map(({ label, p2Key }) => {
                    const val2 = match[p2Key]
                    return (
                      <div key={label} className="flex items-center h-[20px]">
                        <span
                          className={cn(
                            'text-xs font-mono tabular-nums',
                            val2 === null || val2 === undefined
                              ? 'text-[var(--text-3)]'
                              : 'text-[var(--text-1)]'
                          )}
                        >
                          {formatValue(val2)}
                        </span>
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
