'use client'
import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TableFilters } from './TableFilters'
import type { MatchStats } from '@/types/match-stats'

interface MatchTableProps {
  matches: MatchStats[]
}

export function MatchTable({ matches }: MatchTableProps) {
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set())

  const tournaments = useMemo(() => {
    const unique = new Set(matches.map((m) => m.tournament))
    return Array.from(unique).sort()
  }, [matches])

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)]">
        <TableFilters
          tournaments={tournaments}
          matches={matches}
          onFilterChange={() => {}}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                Tournoi
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                Match
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                Surface
              </th>
            </tr>
          </thead>
          <tbody>
            {matches.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--text-3)]"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-[var(--text-2)]">
                      Aucun match trouvé
                    </p>
                    <p className="text-xs text-[var(--text-3)]">
                      Modifiez vos filtres ou ajoutez des matchs
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              matches.map((match, index) => {
                const isOpen = openAccordions.has(match.id)
                const isEven = index % 2 === 0

                return (
                  <>
                    <tr
                      key={match.id}
                      onClick={() => toggleAccordion(match.id)}
                      className={cn(
                        'border-b border-[var(--border)] last:border-0 cursor-pointer transition-colors duration-150',
                        isEven ? 'bg-[var(--surface-1)]' : 'bg-[var(--surface-2)]/50',
                        'hover:bg-white/[0.02]'
                      )}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[var(--text-2)] font-mono text-xs">
                          {formatDate(match.date)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[var(--text-2)]">
                          {match.tournament}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--text-1)] font-medium">
                            {match.player1_name}
                          </span>
                          <span className="text-[var(--text-3)] text-xs">vs</span>
                          <span className="text-[var(--text-1)] font-medium">
                            {match.player2_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap bg-white/[0.05] text-[var(--text-3)] border border-[var(--border)]">
                          {match.surface}
                        </span>
                      </td>
                    </tr>

                    {isOpen && (
                      <tr key={`${match.id}-accordion`} className="border-b border-[var(--border)] last:border-0">
                        <td colSpan={4} className="px-4 py-0">
                          <div
                            className={cn(
                              'overflow-hidden transition-all duration-200',
                              isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                            )}
                          >
                            <div className="py-4 bg-[var(--surface-2)]/30">
                              {match.metric_names === null || match.metric_names.length === 0 ? (
                                <p className="text-xs text-[var(--text-3)] text-center py-4">
                                  Aucune métrique disponible
                                </p>
                              ) : (
                                <table className="w-full text-xs">
                                  <thead>
                                    <tr className="border-b border-[var(--border)]">
                                      <th className="px-3 py-2 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                                        Métrique
                                      </th>
                                      <th className="px-3 py-2 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                                        {match.player1_name}
                                      </th>
                                      <th className="px-3 py-2 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                                        {match.player2_name}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {match.metric_names.map((metricName, metricIndex) => (
                                      <tr
                                        key={metricName}
                                        className={cn(
                                          'border-b border-[var(--border)] last:border-0',
                                          metricIndex % 2 === 0 ? 'bg-[var(--surface-1)]/50' : 'bg-transparent'
                                        )}
                                      >
                                        <td className="px-3 py-2 text-[var(--text-2)]">
                                          {metricName}
                                        </td>
                                        <td className="px-3 py-2 text-[var(--text-1)] font-mono tabular-nums">
                                          {match.player1_values?.[metricIndex] !== null
                                            ? match.player1_values?.[metricIndex]
                                            : '—'}
                                        </td>
                                        <td className="px-3 py-2 text-[var(--text-1)] font-mono tabular-nums">
                                          {match.player2_values?.[metricIndex] !== null
                                            ? match.player2_values?.[metricIndex]
                                            : '—'}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
