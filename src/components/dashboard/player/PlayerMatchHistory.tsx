'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatMatchDate } from '@/lib/player/utils'
import MatchMetricsModal from './MatchMetricsModal'
import type { MatchResultRow, MatchStatsRow } from '@/lib/types/player'

interface PlayerMatchHistoryProps {
  recentMatches: MatchResultRow[]
}

export default function PlayerMatchHistory({ recentMatches }: PlayerMatchHistoryProps) {
  const [selectedMatch, setSelectedMatch] = useState<{
    player1: string
    player2: string
    date: string
    matchStats: MatchStatsRow | null
  } | null>(null)

  if (recentMatches.length === 0) {
    return (
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center">
            <ChevronRight size={16} className="text-[var(--text-3)]" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-[var(--text-2)]">Aucun match récent</p>
          <p className="text-xs text-[var(--text-3)]">
            Les matchs apparaîtront une fois le joueur inscrit sur Haurus.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            Derniers matchs
          </p>
          <span className="text-[11px] text-[var(--text-3)] font-mono tabular-nums">
            {recentMatches.length} match{recentMatches.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Date', 'Adversaire', 'Tournoi', 'Surface', 'Score', ''].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentMatches.map((match, i) => {
                const isWin = match.winner !== null
                const opponent = match.player1 !== match.player2
                  ? (match.player1 ?? match.player2)
                  : '—'

                return (
                  <tr
                    key={match.id}
                    className={cn(
                      'border-b border-[var(--border)] last:border-0',
                      'hover:bg-white/[0.02] transition-colors duration-100'
                    )}
                  >
                    <td className="px-4 py-3 text-[var(--text-3)] text-xs whitespace-nowrap">
                      {formatMatchDate(match.date_match)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-[var(--text-1)] text-sm">
                        {opponent}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--text-3)] text-xs whitespace-nowrap">
                      {match.tournoi ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-3)] text-xs whitespace-nowrap">
                      {match.surface ?? '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--text-2)] whitespace-nowrap">
                      {match.score ?? '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {/* Result badge */}
                      {isWin && (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--green)]/10 text-[var(--green)] text-[11px] font-bold mr-1">
                          V
                        </span>
                      )}
                      {match.winner === null && match.score !== null && (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--red)]/10 text-[var(--red)] text-[11px] font-bold mr-1">
                          D
                        </span>
                      )}
                      {/* Metric button */}
                      <button
                        onClick={() =>
                          setSelectedMatch({
                            player1: match.player1,
                            player2: match.player2,
                            date: match.date_match,
                            matchStats: null, // Would be fetched from match_stats table
                          })
                        }
                        className={cn(
                          'h-6 px-2 flex items-center justify-center gap-1 rounded text-[11px] font-medium',
                          'border border-[var(--border-md)] bg-white/[0.03]',
                          'text-[var(--text-3)] hover:text-[var(--text-2)]',
                          'hover:bg-white/[0.06] transition-colors duration-150'
                        )}
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

      {/* Metrics modal */}
      {selectedMatch && (
        <MatchMetricsModal
          isOpen={true}
          onClose={() => setSelectedMatch(null)}
          player1={selectedMatch.player1}
          player2={selectedMatch.player2}
          date={selectedMatch.date}
          matchStats={selectedMatch.matchStats}
        />
      )}
    </>
  )
}
