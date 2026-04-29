'use client'

import { cn } from '@/lib/utils'
import type { Database } from '@/lib/supabase/database.types'

type MatchResult = Database['public']['Tables']['match_results']['Row']

interface PlayerMatchHistoryProps {
  matches: MatchResult[]
  playerName: string
  onOpenMetrics: (matchId: string) => void
}

function getOpponent(match: MatchResult, playerName: string): string {
  if (match.player1 === playerName) return match.player2
  if (match.player2 === playerName) return match.player1
  return match.player1
}

function isWin(match: MatchResult, playerName: string): boolean | null {
  if (!match.winner) return null
  return match.winner === playerName
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return dateStr
  }
}

export default function PlayerMatchHistory({ matches, playerName, onOpenMetrics }: PlayerMatchHistoryProps) {
  if (!matches || matches.length === 0) {
    return (
      <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg px-6 py-10 flex flex-col items-center text-center">
        <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
            <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 0-2 2h-2a2 2 0 0 0-2-2Z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-[var(--text-2)]">Aucun match trouvé</p>
        <p className="text-xs text-[var(--text-3)] mt-1">Aucun résultat pour ce joueur dans la base.</p>
      </div>
    )
  }

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
              {['Date', 'Adversaire', 'Tournoi', 'Surface', 'Score', 'Résultat', ''].map((h) => (
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
            {matches.map((match) => {
              const won = isWin(match, playerName)
              const opponent = getOpponent(match, playerName)
              return (
                <tr
                  key={match.id}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 text-[var(--text-2)] font-mono text-xs whitespace-nowrap">
                    {formatDate(match.date_match)}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-1)] whitespace-nowrap">
                    {opponent}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-3)] text-xs whitespace-nowrap truncate max-w-[160px]">
                    {match.tournoi ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-3)] text-xs whitespace-nowrap">
                    {match.surface ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-2)] text-xs font-mono whitespace-nowrap">
                    {match.score ?? '—'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {won !== null ? (
                      <span
                        className={cn(
                          'inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded text-[11px] font-semibold',
                          won
                            ? 'bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20'
                            : 'bg-[var(--red)]/10 text-[var(--red)] border border-[var(--red)]/20'
                        )}
                      >
                        {won ? 'V' : 'D'}
                      </span>
                    ) : (
                      <span className="text-[var(--text-3)]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onOpenMetrics(match.id)}
                      className="h-7 px-2.5 flex items-center justify-center rounded-md
                                 border border-[var(--border-md)] bg-transparent
                                 text-[var(--text-2)] text-xs font-medium
                                 hover:bg-white/[0.06] hover:text-[var(--text-1)]
                                 transition-all duration-150"
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
