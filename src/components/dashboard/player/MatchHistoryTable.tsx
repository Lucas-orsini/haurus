'use client'

import { BarChart2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchStats } from '@/lib/types/match'

interface MatchHistoryTableProps {
  matchHistory: MatchStats[]
  playerName: string
  onOpenMetrics: (date_match: string, player1: string, player2: string) => void
}

/**
 * Formats a date string (YYYY-MM-DD) to DD/MM/YYYY.
 */
function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  if (!year || !month || !day) return '—'
  return `${day}/${month}/${year}`
}

export default function MatchHistoryTable({
  matchHistory,
  playerName,
  onOpenMetrics,
}: MatchHistoryTableProps) {
  // Empty state
  if (matchHistory.length === 0) {
    return (
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-6">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
            <BarChart2 size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-[var(--text-2)]">Aucun match récent</p>
          <p className="text-xs text-[var(--text-3)] mt-1">
            Les derniers matchs apparaîtront ici
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <p className="text-sm font-medium text-[var(--text-1)]">Historique des matchs</p>
        <span className="text-xs text-[var(--text-3)] font-mono tabular-nums">
          {matchHistory.length} match{matchHistory.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Date', 'Adversaire', 'Tournoi', 'Surface', 'Score', 'Résultat', ''].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {matchHistory.map((match) => {
              // Winner may be null until the data pipeline populates it via join with match_results
              const isWin = match.winner !== null ? match.winner === playerName : null
              const opponent =
                match.player1 === playerName ? match.player2 : match.player1

              return (
                <tr
                  key={match.id}
                  className={cn(
                    'border-b border-[var(--border)] last:border-0',
                    'hover:bg-white/[0.02] transition-colors duration-100'
                  )}
                >
                  {/* Date */}
                  <td className="px-4 py-3 font-mono text-xs text-[var(--text-2)] whitespace-nowrap">
                    {formatDate(match.date_match)}
                  </td>

                  {/* Adversaire */}
                  <td className="px-4 py-3 text-[var(--text-1)] font-medium max-w-[160px]">
                    <span className="truncate block">{opponent}</span>
                  </td>

                  {/* Tournoi */}
                  <td className="px-4 py-3 text-[var(--text-2)] max-w-[140px]">
                    <span className="truncate block">{match.tournoi ?? '—'}</span>
                  </td>

                  {/* Surface */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={cn(
                        'inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium',
                        match.surface === 'Clay' &&
                          'bg-[var(--yellow)]/10 text-[var(--yellow)] border border-[var(--yellow)]/20',
                        match.surface === 'Hard' &&
                          'bg-white/[0.07] text-[var(--text-2)] border border-[var(--border-md)]',
                        match.surface === 'Grass' &&
                          'bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20',
                        (!match.surface ||
                          (!['Clay', 'Hard', 'Grass'].includes(match.surface))) &&
                          'bg-white/[0.04] text-[var(--text-3)] border border-[var(--border)]'
                      )}
                    >
                      {match.surface ?? '—'}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="px-4 py-3 font-mono text-xs text-[var(--text-2)] whitespace-nowrap">
                    {match.score ?? '—'}
                  </td>

                  {/* Résultat */}
                  <td className="px-4 py-3">
                    {match.winner === null ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded text-[11px] font-bold bg-white/[0.04] text-[var(--text-3)] border border-[var(--border)]">
                        {'—'}
                      </span>
                    ) : (
                      <span
                        className={cn(
                          'inline-flex items-center justify-center w-6 h-6 rounded text-[11px] font-bold',
                          isWin
                            ? 'bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/25'
                            : 'bg-[var(--red)]/15 text-[var(--red)] border border-[var(--red)]/25'
                        )}
                      >
                        {isWin ? 'V' : 'D'}
                      </span>
                    )}
                  </td>

                  {/* Bouton Métriques */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        onOpenMetrics(match.date_match, match.player1, match.player2)
                      }
                      className="h-7 px-2.5 flex items-center justify-center gap-1.5 rounded-md
                                 border border-[var(--border-md)] bg-white/[0.03]
                                 hover:bg-white/[0.07] hover:border-[var(--border-hi)]
                                 text-[var(--text-2)] text-[11px] font-medium
                                 transition-colors duration-150 whitespace-nowrap"
                    >
                      Métriques
                    </button>
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
