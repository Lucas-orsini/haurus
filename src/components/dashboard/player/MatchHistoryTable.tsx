'use client'

import type { EnrichedMatchHistory } from './PlayerProfileClient'
import { useLocale } from '@/providers/LocaleProvider'

interface MatchHistoryTableProps {
  matchHistory: EnrichedMatchHistory[]
  selectedPlayerName: string
  onOpenMetrics: (date_match: string, player1: string, player2: string) => void
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/** Safe dictionary access with bracket fallback */
function t(dict: Record<string, unknown>, path: string): string {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key]
    return undefined
  }, dict as unknown)
  return typeof value === 'string' ? value : `[${path}]`
}

export default function MatchHistoryTable({
  matchHistory,
  selectedPlayerName,
  onOpenMetrics,
}: MatchHistoryTableProps) {
  const { locale } = useLocale()
  const dict = locale === 'en'
    ? EN_MATCH_HISTORY
    : FR_MATCH_HISTORY

  if (matchHistory.length === 0) {
    return (
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-[var(--border)] flex items-center justify-center mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M3 15h18" />
              <path d="M9 3v18" />
              <path d="M15 3v18" />
            </svg>
          </div>
          <p className="text-sm text-[var(--text-2)]">{dict.empty}</p>
          <p className="text-xs text-[var(--text-3)] mt-1">{dict.emptySubtitle}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border-md)]">
        <h3 className="text-sm font-medium text-[var(--text-1)]">{dict.title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-md)]">
              <th className="hidden md:table-cell px-4 py-2.5 text-left text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">{dict.date}</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">{dict.opponent}</th>
              <th className="hidden md:table-cell px-4 py-2.5 text-left text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">{dict.tournament}</th>
              <th className="hidden md:table-cell px-4 py-2.5 text-left text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">{dict.surface}</th>
              <th className="hidden md:table-cell px-4 py-2.5 text-left text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">{dict.score}</th>
              <th className="px-4 py-2.5 text-center text-xs font-medium text-[var(--text-3)] uppercase tracking-wide">{dict.result}</th>
              <th className="px-4 py-2.5 text-center text-xs font-medium text-[var(--text-3)] uppercase tracking-wide w-24">{dict.metrics}</th>
            </tr>
          </thead>
          <tbody>
            {matchHistory.map((match) => {
              const isWin = match.winner
                ? match.winner.toLowerCase() === selectedPlayerName.toLowerCase()
                : null

              return (
                <tr
                  key={match.id}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-white/[0.02] transition-colors duration-150"
                >
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-[var(--text-2)] font-mono">
                    {formatDate(match.date_match)}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-1)]">
                    {match.adversaire}
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-[var(--text-2)]">
                    {match.tournoi ?? '—'}
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-[var(--text-2)]">
                    {match.surface ?? '—'}
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-[var(--text-2)] font-mono">
                    {match.score ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {isWin === true && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[var(--green)]/10 text-[var(--green)] text-xs font-semibold">
                        V
                      </span>
                    )}
                    {isWin === false && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[var(--red)]/10 text-[var(--red)] text-xs font-semibold">
                        D
                      </span>
                    )}
                    {isWin === null && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-white/[0.04] text-[var(--text-3)] text-xs">
                        —
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onOpenMetrics(match.date_match, match.player1, match.player2)}
                      className="inline-flex items-center justify-center h-7 px-3 rounded text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-[var(--text-2)] hover:text-[var(--text-1)] border border-[var(--border-md)] hover:border-[var(--border)] transition-all duration-150"
                    >
                      {dict.metricsBtn}
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

const FR_MATCH_HISTORY = {
  empty: "Aucun match disponible",
  emptySubtitle: "L'historique de ce joueur est vide",
  title: 'Derniers matchs',
  date: 'Date',
  opponent: 'Adversaire',
  tournament: 'Tournoi',
  surface: 'Surface',
  score: 'Score',
  result: 'Résultat',
  metrics: 'Métriques',
  metricsBtn: 'Métriques',
}

const EN_MATCH_HISTORY = {
  empty: 'No matches available',
  emptySubtitle: 'This player has no match history',
  title: 'Recent matches',
  date: 'Date',
  opponent: 'Opponent',
  tournament: 'Tournament',
  surface: 'Surface',
  score: 'Score',
  result: 'Result',
  metrics: 'Metrics',
  metricsBtn: 'Metrics',
}
