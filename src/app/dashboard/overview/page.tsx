'use client'

import { useState, useEffect, useMemo } from 'react'
import { useMatches } from '@/hooks/useMatches'
import MatchesToolbar from '@/components/dashboard/MatchesToolbar'
import MatchesTable from '@/components/dashboard/MatchesTable'
import type { MatchStats } from '@/types/match'

function formatDateOnly(date: Date): string {
  return date.toISOString().split('T')[0]
}

export default function OverviewPage() {
  const { matches, loading, error, refetch } = useMatches()

  // Local filter state
  const [searchValue, setSearchValue] = useState('')
  const [todayOnly, setTodayOnly] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState('')

  // Derive unique tournaments from raw data
  const tournaments = useMemo(() => {
    if (!matches) return []
    const seen = new Set<string>()
    matches.forEach((m: MatchStats) => {
      if (m.tournament) seen.add(m.tournament)
    })
    return Array.from(seen).sort()
  }, [matches])

  // Apply client-side filtering
  const filteredMatches = useMemo(() => {
    if (!matches) return []
    const today = formatDateOnly(new Date())

    return matches.filter((match: MatchStats) => {
      // Search filter — case-insensitive on player names
      if (searchValue) {
        const query = searchValue.toLowerCase()
        const player1 = match.player1_name?.toLowerCase() ?? ''
        const player2 = match.player2_name?.toLowerCase() ?? ''
        if (!player1.includes(query) && !player2.includes(query)) {
          return false
        }
      }

      // Today filter — compare match date to today
      if (todayOnly) {
        const matchDate = formatDateOnly(new Date(match.date))
        if (matchDate !== today) {
          return false
        }
      }

      // Tournament filter — exact match
      if (selectedTournament) {
        if (match.tournament !== selectedTournament) {
          return false
        }
      }

      return true
    })
  }, [matches, searchValue, todayOnly, selectedTournament])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-3)] mb-3 min-w-0">
          <span>dashboard</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="text-[var(--text-2)]">Overview</span>
        </nav>
        <h1 className="text-base font-semibold text-[var(--text-1)] tracking-tight">
          Overview
        </h1>
      </div>

      {/* Toolbar */}
      <div className="mb-4">
        <MatchesToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          todayOnly={todayOnly}
          onTodayChange={setTodayOnly}
          tournaments={tournaments}
          selectedTournament={selectedTournament}
          onTournamentChange={setSelectedTournament}
          totalCount={filteredMatches.length}
        />
      </div>

      {/* Table */}
      <MatchesTable
        matches={filteredMatches}
        loading={loading}
        error={error}
        onRetry={refetch}
      />
    </div>
  )
}
