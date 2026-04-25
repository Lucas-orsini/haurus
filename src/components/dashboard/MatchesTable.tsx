'use client'

import { useState } from 'react'
import { AlertCircle, RefreshCw, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import MetricCard from '@/components/ui/MetricCard'
import type { MatchStats } from '@/types/match'

interface MatchesTableProps {
  matches: MatchStats[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function MatchRow({ match }: { match: MatchStats }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <tr
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'border-b border-[var(--border)] last:border-0 cursor-pointer',
          'hover:bg-white/[0.03] transition-colors duration-150'
        )}
      >
        {/* Date */}
        <td className="px-4 py-3 whitespace-nowrap">
          <span className="text-xs font-mono text-[var(--text-3)]">
            {formatDate(match.date)}
          </span>
        </td>

        {/* Tournament */}
        <td className="px-4 py-3 whitespace-nowrap">
          <span className="text-sm text-[var(--text-2)] truncate max-w-[160px] block">
            {match.tournament}
          </span>
        </td>

        {/* Match */}
        <td className="px-4 py-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm text-[var(--text-1)] font-medium truncate">
              {match.player1_name}
            </span>
            <span className="text-xs text-[var(--text-3)] shrink-0">vs</span>
            <span className="text-sm text-[var(--text-1)] font-medium truncate">
              {match.player2_name}
            </span>
          </div>
        </td>

        {/* Surface */}
        <td className="px-4 py-3 whitespace-nowrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap bg-white/[0.05] text-[var(--text-3)] border border-[var(--border)]">
            {match.surface}
          </span>
        </td>

        {/* Expand indicator */}
        <td className="px-4 py-3 w-8 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              'text-[var(--text-3)] ml-auto transition-transform duration-200 block',
              isOpen && 'rotate-180'
            )}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </td>
      </tr>

      {/* Accordion panel */}
      <tr className="border-b border-[var(--border)] last:border-0">
        <td colSpan={5} className="p-0">
          <div
            className={cn(
              'overflow-hidden transition-all duration-200',
              isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="px-4 py-5 bg-[var(--surface-1)]">
              {match.metrics && Object.keys(match.metrics).length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {Object.entries(match.metrics).map(([key, value]) => (
                    <MetricCard
                      key={key}
                      label={key}
                      value={typeof value === 'number' ? value.toFixed(2) : String(value)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[var(--text-3)] text-center py-4">
                  Aucune métrique disponible pour ce match.
                </p>
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

function SkeletonRow() {
  return (
    <>
      <tr className="border-b border-[var(--border)] animate-pulse">
        <td className="px-4 py-3">
          <div className="h-3 bg-white/[0.06] rounded w-20" />
        </td>
        <td className="px-4 py-3">
          <div className="h-3 bg-white/[0.06] rounded w-32" />
        </td>
        <td className="px-4 py-3">
          <div className="h-3 bg-white/[0.06] rounded w-48" />
        </td>
        <td className="px-4 py-3">
          <div className="h-5 bg-white/[0.06] rounded-full w-14" />
        </td>
        <td className="px-4 py-3 w-8">
          <div className="h-3 bg-white/[0.04] rounded w-3 ml-auto" />
        </td>
      </tr>
      {/* Accordion skeleton row */}
      <tr className="border-b border-[var(--border)] animate-pulse">
        <td colSpan={5} className="px-4 py-5 bg-[var(--surface-1)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
                <div className="h-2.5 bg-white/[0.06] rounded w-12 mb-3" />
                <div className="h-6 bg-white/[0.05] rounded w-16 mb-2" />
                <div className="h-2 bg-white/[0.04] rounded w-8" />
              </div>
            ))}
          </div>
        </td>
      </tr>
    </>
  )
}

export default function MatchesTable({
  matches,
  loading,
  error,
  onRetry,
}: MatchesTableProps) {
  // Loading state
  if (loading) {
    return (
      <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Date', 'Tournoi', 'Match', 'Surface', ''].map((h) => (
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
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-[var(--red)]/10 border border-[var(--red)]/20 flex items-center justify-center mb-4">
          <AlertCircle size={18} className="text-[var(--red)]" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-[var(--text-2)] mb-1">
          Impossible de charger les matchs
        </p>
        <p className="text-sm text-[var(--text-3)] max-w-xs mb-5">
          {error}
        </p>
        <button
          onClick={onRetry}
          className="h-8 px-4 flex items-center justify-center gap-1.5 rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors duration-150"
        >
          <RefreshCw size={12} className="shrink-0" />
          Réessayer
        </button>
      </div>
    )
  }

  // Empty state
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
          <Search size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-[var(--text-2)] mb-1">
          Aucun match trouvé
        </p>
        <p className="text-sm text-[var(--text-3)] max-w-xs">
          Essayez de modifier vos filtres ou de réinitialiser la recherche.
        </p>
      </div>
    )
  }

  // Data rows
  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Date', 'Tournoi', 'Match', 'Surface', ''].map((h) => (
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
            {matches.map((match, i) => (
              <MatchRow
                key={match.id}
                match={match}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
