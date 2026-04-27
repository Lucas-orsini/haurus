'use client'

import { useState } from 'react'
import { ChevronsUpDown, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { filterMatches } from '@/lib/filters'
import { normalizeDate } from '@/lib/data'
import type { MatchStat } from '@/lib/data'
import type { MatchFilters } from '@/lib/filters'

interface MatchesTableProps {
  matches: MatchStat[]
  searchQuery: string
  filters: MatchFilters
}

type MetricValue = { player1: number | string; player2: number | string }

export default function MatchesTable({ matches, searchQuery, filters }: MatchesTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = filterMatches(matches, searchQuery, filters)

  function toggleRow(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  function handleKeyDown(e: React.KeyboardEvent, id: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleRow(id)
    }
  }

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-[var(--surface-1)] border border-[var(--border)] rounded-lg">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
          <FolderOpen size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-[var(--text-2)] mb-1">Aucun match disponible</p>
        <p className="text-sm text-[var(--text-3)] max-w-xs">
          Les matchs apparaîtront ici dès qu'ils seront disponibles dans la base.
        </p>
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-[var(--surface-1)] border border-[var(--border)] rounded-lg">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
          <FolderOpen size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-[var(--text-2)] mb-1">Aucun résultat</p>
        <p className="text-sm text-[var(--text-3)] max-w-xs">
          Aucun match ne correspond à vos critères de recherche.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
      {/* Table header */}
      <div className="flex items-center px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]">
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          {filtered.length} match{filtered.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Date', 'Tournoi', 'Match', 'Surface'].map((col) => (
                <th
                  key={col}
                  className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((match: MatchStat, index: number) => {
              const isEven = index % 2 === 0
              const isExpanded = expandedId === match.id

              return (
                <tr key={match.id}>
                  {/* Main row */}
                  <td
                    tabIndex={0}
                    onClick={() => toggleRow(match.id)}
                    onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, match.id)}
                    colSpan={4}
                    className={cn(
                      'border-b border-[var(--border)] last:border-0 transition-colors duration-150 cursor-pointer select-none',
                      isEven ? 'bg-[var(--bg)]' : 'bg-white/[0.02]',
                      isExpanded
                        ? 'bg-[var(--accent)]/[0.05]'
                        : 'hover:bg-white/[0.04]'
                    )}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center">
                      {/* Date */}
                      <div className="w-[140px] shrink-0 px-4 py-3.5">
                        <span className="text-xs font-mono text-[var(--text-2)]">
                          {normalizeDate(match.date)}
                        </span>
                      </div>

                      {/* Tournament */}
                      <div className="w-[200px] shrink-0 px-4 py-3.5">
                        <span className="text-sm text-[var(--text-2)]">{match.tournament}</span>
                      </div>

                      {/* Match */}
                      <div className="flex-1 min-w-0 px-4 py-3.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm text-[var(--text-1)] font-medium truncate">
                            {match.player1_name}
                          </span>
                          <span className="text-sm text-[var(--text-3)] shrink-0">vs</span>
                          <span className="text-sm text-[var(--text-1)] font-medium truncate">
                            {match.player2_name}
                          </span>
                          <ChevronsUpDown size={12} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0 ml-1" />
                        </div>
                      </div>

                      {/* Surface */}
                      <div className="w-[100px] shrink-0 px-4 py-3.5">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap',
                            match.surface === 'Hard'  && 'bg-[var(--surface-3)] text-[var(--text-2)] border border-[var(--border-md)]',
                            match.surface === 'Clay'  && 'bg-[var(--orange)]/10 text-[var(--orange)] border border-[var(--orange)]/20',
                            match.surface === 'Grass' && 'bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20'
                          )}
                        >
                          {match.surface}
                        </span>
                      </div>
                    </div>

                    {/* Accordion panel — metrics row */}
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-200',
                        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      )}
                      aria-hidden={!isExpanded}
                    >
                      <div className="px-4 py-4 bg-[var(--surface-2)] border-t border-[var(--border)]">
                        <div className="flex gap-8 min-w-0">
                          {/* Player 1 */}
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[var(--text-1)] mb-3 uppercase tracking-wider">
                              {match.player1_name}
                            </p>
                            <div className="flex flex-col gap-1.5">
                              {Object.entries(match.metrics).map(([metricName, value]: [string, MetricValue]) => (
                                <div key={metricName} className="flex items-center gap-3 min-w-0">
                                  <span className="text-xs text-[var(--text-3)] w-36 truncate text-right">
                                    {metricName}
                                  </span>
                                  <span className="text-sm font-mono text-[var(--text-1)] tabular-nums">
                                    {typeof value.player1 === 'number' ? value.player1 : value.player1}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="w-px bg-[var(--border)] self-stretch shrink-0" />

                          {/* Player 2 */}
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[var(--text-1)] mb-3 uppercase tracking-wider">
                              {match.player2_name}
                            </p>
                            <div className="flex flex-col gap-1.5">
                              {Object.entries(match.metrics).map(([metricName, value]: [string, MetricValue]) => (
                                <div key={metricName} className="flex items-center gap-3 min-w-0">
                                  <span className="text-xs text-[var(--text-3)] w-36 truncate text-right">
                                    {metricName}
                                  </span>
                                  <span className="text-sm font-mono text-[var(--text-1)] tabular-nums">
                                    {typeof value.player2 === 'number' ? value.player2 : value.player2}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
