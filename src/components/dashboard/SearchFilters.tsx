'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Input from '@/components/ui/Input'

interface SearchFiltersProps {
  tournaments: string[]
  onSearch: (query: string) => void
  onFilterToday: (today: boolean) => void
  onFilterTournament: (tournament: string, checked: boolean) => void
}

export default function SearchFilters({
  tournaments,
  onSearch,
  onFilterToday,
  onFilterTournament,
}: SearchFiltersProps) {
  const [searchInput, setSearchInput] = useState('')
  const [filterToday, setFilterToday] = useState(false)
  const [activeTournaments, setActiveTournaments] = useState<Set<string>>(new Set())

  function handleSearchChange(value: string) {
    setSearchInput(value)
    onSearch(value)
  }

  function handleTodayToggle() {
    const next = !filterToday
    setFilterToday(next)
    onFilterToday(next)
  }

  function handleTournamentToggle(tournament: string) {
    const next = new Set(activeTournaments)
    if (next.has(tournament)) {
      next.delete(tournament)
    } else {
      next.add(tournament)
    }
    setActiveTournaments(next)
    onFilterTournament(tournament, next.has(tournament))
  }

  const hasFilters = filterToday || activeTournaments.size > 0

  return (
    <div className="flex flex-col gap-3">
      {/* Main toolbar row */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Search bar */}
        <div className="relative flex-1 min-w-0 max-w-xs">
          <Search
            size={14}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none z-10"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Rechercher un joueur..."
            className={cn(
              'h-9 w-full pl-9 pr-8 rounded-lg text-sm',
              'bg-[var(--surface-1)] border border-[var(--border-md)]',
              'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
              'outline-none transition-all duration-150',
              'focus:ring-2 focus:ring-[var(--accent)]/15 focus:border-[var(--accent)]',
              'hover:border-[var(--border-hi)]'
            )}
          />
          {searchInput && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
            >
              <X size={13} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Toggle "Aujourd'hui" */}
        <button
          onClick={handleTodayToggle}
          className={cn(
            'h-9 px-3.5 flex items-center justify-center gap-2 rounded-lg text-xs font-medium border transition-colors duration-150 whitespace-nowrap shrink-0',
            filterToday
              ? 'bg-[var(--accent)] text-black border-[var(--accent)]'
              : 'bg-[var(--surface-1)] border-[var(--border-md)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--border-hi)]'
          )}
        >
          Aujourd'hui
        </button>

        {/* Tournament toggles — scroll horizontal si overflow */}
        <div className="flex items-center gap-2 overflow-x-auto pb-px scrollbar-hide">
          {tournaments.map((tournament) => (
            <button
              key={tournament}
              onClick={() => handleTournamentToggle(tournament)}
              className={cn(
                'h-9 px-3 flex items-center justify-center rounded-lg text-xs font-medium border transition-colors duration-150 whitespace-nowrap shrink-0',
                activeTournaments.has(tournament)
                  ? 'bg-[var(--accent)] text-black border-[var(--accent)]'
                  : 'bg-[var(--surface-1)] border-[var(--border-md)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--border-hi)]'
              )}
            >
              {tournament}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters summary */}
      {hasFilters && (
        <div className="flex items-center gap-2">
          <p className="text-xs text-[var(--text-3)]">Filtres actifs :</p>
          {filterToday && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap bg-[var(--accent)]/10 text-[var(--accent-hi)] border border-[var(--accent)]/20">
              Aujourd'hui
            </span>
          )}
          {Array.from(activeTournaments).map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap bg-[var(--accent)]/10 text-[var(--accent-hi)] border border-[var(--accent)]/20"
            >
              {t}
            </span>
          ))}
          <button
            onClick={() => {
              setFilterToday(false)
              setActiveTournaments(new Set())
              onFilterToday(false)
              tournaments.forEach((t) => onFilterTournament(t, false))
            }}
            className="text-[11px] text-[var(--text-3)] hover:text-[var(--red)] transition-colors ml-1"
          >
            Tout effacer
          </button>
        </div>
      )}
    </div>
  )
}
