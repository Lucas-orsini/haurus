'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { fetchMatches } from '@/lib/data'
import type { MatchStat } from '@/lib/data'
import type { MatchFilters } from '@/lib/filters'
import SearchFilters from '@/components/dashboard/SearchFilters'
import MatchesTable from '@/components/dashboard/MatchesTable'

type PageState = 'idle' | 'loading' | 'success' | 'error'

export default function DashboardPage() {
  const [matches, setMatches] = useState<MatchStat[]>([])
  const [tournaments, setTournaments] = useState<string[]>([])
  const [pageState, setPageState] = useState<PageState>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<MatchFilters>({
    today: false,
    tournaments: [],
  })

  useEffect(() => {
    async function load() {
      setPageState('loading')
      setErrorMessage(null)
      try {
        const data = await fetchMatches()
        setMatches(data)
        setTournaments(
          Array.from(new Set(data.map((m) => m.tournament))).sort()
        )
        setPageState('success')
      } catch (err) {
        setPageState('error')
        setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue.')
      }
    }
    load()
  }, [])

  function handleSearch(query: string) {
    setSearchQuery(query)
  }

  function handleFilterToday(today: boolean) {
    setFilters((f) => ({ ...f, today }))
  }

  function handleFilterTournament(tournament: string, checked: boolean) {
    setFilters((f) => ({
      ...f,
      tournaments: checked
        ? [...f.tournaments, tournament]
        : f.tournaments.filter((t) => t !== tournament),
    }))
  }

  async function handleRetry() {
    setPageState('loading')
    setErrorMessage(null)
    try {
      const data = await fetchMatches()
      setMatches(data)
      setTournaments(Array.from(new Set(data.map((m) => m.tournament))).sort())
      setPageState('success')
    } catch (err) {
      setPageState('error')
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  if (pageState === 'loading') {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-10 bg-[var(--surface-2)] rounded-lg animate-pulse" />
        <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b border-[var(--border)] last:border-0 animate-pulse">
              <div className="h-3 bg-white/[0.06] rounded w-20" />
              <div className="h-3 bg-white/[0.05] rounded w-32" />
              <div className="h-3 bg-white/[0.05] rounded w-48" />
              <div className="h-3 bg-white/[0.04] rounded w-16 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (pageState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-[var(--red)]/10 border border-[var(--red)]/20 flex items-center justify-center mb-4">
          <AlertCircle size={18} className="text-[var(--red)]" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-[var(--text-2)] mb-1">Impossible de charger les matchs</p>
        <p className="text-sm text-[var(--text-3)] max-w-xs">{errorMessage}</p>
        <button
          onClick={handleRetry}
          className="mt-5 h-8 px-4 flex items-center justify-center gap-2 rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors"
        >
          <RefreshCw size={12} className="shrink-0" />
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex flex-col gap-5"
    >
      <SearchFilters
        tournaments={tournaments}
        onSearch={handleSearch}
        onFilterToday={handleFilterToday}
        onFilterTournament={handleFilterTournament}
      />

      <MatchesTable
        matches={matches}
        searchQuery={searchQuery}
        filters={filters}
      />
    </motion.div>
  )
}
