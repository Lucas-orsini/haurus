'use client'

import { useMemo } from 'react'
import { formatDate } from '@/lib/utils'
import type { Database } from '@/lib/supabase/database.types'
import type { MatchStats } from '@/lib/types/match'

type MatchResult = Database['public']['Tables']['match_results']['Row']

interface MatchHistoryTableProps {
  matchHistory: MatchResult[]
  playerName: string
  onOpenMetrics: (date_match: string, player1: string, player2: string) => void
}

export function formatDateTest(dateStr: string): string {
  return formatDate(dateStr)
}

export default function MatchHistoryTable({
  matchHistory,
  playerName,
  onOpenMetrics,
}: MatchHistoryTableProps) {
  const matches = useMemo(() => {
    if (!matchHistory || matchHistory.length === 0) {
      return []
    }
    return matchHistory
  }, [matchHistory])

  if (!matches || matches.length === 0) {
    return (
      <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg p-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <p className="text-xs font-medium text-[var(--text-2)]">Aucun match trouvé</p>
          <p className="text-xs text-[var(--text-3)] mt-0.5">Historique indisponible pour ce joueur</p>
        </div>
      </div>
    )
  }

  function getMatchResult(match: MatchResult): { result: 'W' | 'L' | '—'; resultClass: string } {
    if (!match.winner || !playerName) {
      return { result: '—', resultClass: 'text-[var(--text-3)]' }
    }
    const won = match.winner.toLowerCase() === playerName.toLowerCase()
    return {
      result: won ? 'W' : 'L',
      resultClass: won ? 'text-green-400' : 'text-red-400',
    }
  }

  function getScoreDisplay(match: MatchResult): string {
    return match.score ?? '—'
  }

  function getOpponent(match: MatchResult): string {
    const p1Lower = match.player1?.toLowerCase() ?? ''
    const p2Lower = match.player2?.toLowerCase() ?? ''
    const playerLower = playerName?.toLowerCase() ?? ''

    if (p1Lower === playerLower) {
      return match.player2 ?? '—'
    }
    if (p2Lower === playerLower) {
      return match.player1 ?? '—'
    }
    return match.player2 ?? '—'
  }

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)]">
        <h3 className="text-sm font-semibold text-[var(--text-1)]">Historique des matchs</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">Date</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">Tournoi</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">Surface</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">Adversaire</th>
              <th className="px-4 py-2.5 text-center text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">Score</th>
              <th className="px-4 py-2.5 text-center text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">Résultat</th>
              <th className="px-4 py-2.5 text-center text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">Métriques</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => {
              const { result, resultClass } = getMatchResult(match)
              const opponent = getOpponent(match)

              return (
                <tr
                  key={match.id}
                  className="border-b border-[var(--border)] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-[var(--text-1)] whitespace-nowrap">
                    {formatDate(match.date_match)}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-2)] truncate max-w-[150px]">
                    {match.tournoi ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-2)]">
                    {match.surface ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-1)] whitespace-nowrap">
                    {opponent}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-2)] text-center font-mono">
                    {getScoreDisplay(match)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-semibold ${resultClass}`}>
                      {result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onOpenMetrics(match.date_match, match.player1, match.player2)}
                      className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/[0.06] hover:bg-white/[0.10] transition-colors text-[var(--text-2)] hover:text-[var(--text-1)]"
                      title="Voir les métriques"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3v18h18" />
                        <path d="M18 17V9" />
                        <path d="M13 17V5" />
                        <path d="M8 17v-3" />
                      </svg>
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
