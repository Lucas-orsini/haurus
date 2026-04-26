'use client'

import { useState, useMemo } from 'react'
import { AlertTriangle, Search } from 'lucide-react'
import type { MatchStats } from '@/lib/dashboard/getMatchStats'
import SearchAndFilters from './SearchAndFilters'
import MatchRow from './MatchRow'

interface MatchesTableProps {
  matches: MatchStats[]
}

type TableState = 'data' | 'empty' | 'error'

export default function MatchesTable({ matches }: MatchesTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterToday, setFilterToday] = useState(false)
  const [filterTournament, setFilterTournament] = useState('')
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  // Extract distinct tournaments from raw data
  const tournaments = useMemo(() => {
    const set = new Set<string>()
    matches.forEach((m) => set.add(m.tournament))
    return Array.from(set).sort()
  }, [matches])

  // Combined client-side filter: search × today × tournament (AND)
  const filteredMatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return matches.filter((m) => {
      // Search filter — case-insensitive on both player names
      if (query) {
        const matchName = `${m.player1_name} ${m.player2_name}`.toLowerCase()
        if (!matchName.includes(query)) return false
      }

      // Today filter — compare date part only (local time)
      if (filterToday) {
        const today = new Date()
        const matchDate = new Date(m.date)
        const sameDay =
          matchDate.getFullYear() === today.getFullYear() &&
          matchDate.getMonth() === today.getMonth() &&
          matchDate.getDate() === today.getDate()
        if (!sameDay) return false
      }

      // Tournament filter — exact match
      if (filterTournament && m.tournament !== filterTournament) {
        return false
      }

      return true
    })
  }, [matches, searchQuery, filterToday, filterTournament])

  // Derive table state
  const tableState: TableState = matches.length === 0 ? 'error' : filteredMatches.length === 0 ? 'empty' : 'data'

  function toggleRow(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // ── Error state — no data at all ────────────────────────────
  if (tableState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="w-12 h-12 rounded-xl bg-[var(--surface-2)] border border-[var(--border-md)] flex items-center justify-center">
          <AlertTriangle size={20} strokeWidth={1.5} className="text-[var(--yellow)]" />
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--text-1)]">
            Impossible de charger les matchs
          </p>
          <p className="mt-1 text-xs text-[var(--text-2)]">
            Une erreur est survenue lors de la récupération des données.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Filters bar */}
      <SearchAndFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterToday={filterToday}
        setFilterToday={setFilterToday}
        filterTournament={filterTournament}
        setFilterTournament={setFilterTournament}
        tournaments={tournaments}
      />

      {/* Table */}
      <div className="rounded-lg border border-[var(--border-md)] overflow-hidden">
        {/* Table header */}
        <div className="flex items-center h-9 px-4 bg-[var(--surface-1)] border-b border-[var(--border-md)]">
          <span className="w-28 shrink-0 text-xs font-medium text-[var(--text-3)]">Date</span>
          <span className="w-44 shrink-0 text-xs font-medium text-[var(--text-3)]">Tournoi</span>
          <span className="flex-1 min-w-0 text-xs font-medium text-[var(--text-3)]">Match</span>
          <span className="w-20 shrink-0 text-xs font-medium text-[var(--text-3)]">Surface</span>
          <span className="w-5 shrink-0" />
        </div>

        {/* Empty state */}
        {tableState === 'empty' && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border-md)] flex items-center justify-center">
              <Search size={16} strokeWidth={1.5} className="text-[var(--text-3)]" />
            </div>
            <p className="text-sm text-[var(--text-2)]">
              Aucun match ne correspond à vos filtres.
            </p>
            <p className="text-xs text-[var(--text-3)]">
              Essayez de modifier votre recherche ou de retirer des filtres.
            </p>
          </div>
        )}

        {/* Rows */}
        {tableState === 'data' &&
          filteredMatches.map((match, index) => (
            <div
              key={match.id}
              className={index % 2 === 0 ? 'bg-[var(--surface-2)]/40' : ''}
            >
              <MatchRow
                match={match}
                isOpen={openIds.has(match.id)}
                onToggle={() => toggleRow(match.id)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
