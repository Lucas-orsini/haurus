'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRef, useState, useCallback } from 'react'

interface MatchesToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  todayOnly: boolean
  onTodayChange: (value: boolean) => void
  tournaments: string[]
  selectedTournament: string
  onTournamentChange: (value: string) => void
  totalCount: number
}

export default function MatchesToolbar({
  searchValue,
  onSearchChange,
  todayOnly,
  onTodayChange,
  tournaments,
  selectedTournament,
  onTournamentChange,
  totalCount,
}: MatchesToolbarProps) {
  const [localSearch, setLocalSearch] = useState(searchValue)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearch(value)
      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onSearchChange(value)
      }, 300)
    },
    [onSearchChange]
  )

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search input */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
        />
        <input
          type="text"
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Rechercher un joueur..."
          className={cn(
            'w-full h-8 pl-8 pr-3 rounded-md text-sm',
            'bg-[var(--surface-1)] border border-[var(--border-md)]',
            'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
            'focus:outline-none focus:border-[var(--accent)]/60',
            'focus:ring-2 focus:ring-[var(--accent)]/15',
            'transition-colors duration-150'
          )}
        />
      </div>

      {/* Today toggle */}
      <button
        onClick={() => onTodayChange(!todayOnly)}
        className={cn(
          'h-8 px-3 flex items-center justify-center gap-1.5 rounded-md text-xs font-medium',
          'border transition-colors duration-150 whitespace-nowrap',
          todayOnly
            ? 'bg-[var(--accent)]/10 border-[var(--accent)]/40 text-[var(--accent-hi)]'
            : 'border-[var(--border-md)] bg-white/[0.03] text-[var(--text-2)] hover:bg-white/[0.06]'
        )}
      >
        Aujourd&apos;hui
      </button>

      {/* Tournament select */}
      <div className="relative min-w-[180px]">
        <select
          value={selectedTournament}
          onChange={(e) => onTournamentChange(e.target.value)}
          className={cn(
            'h-8 w-full pl-3 pr-8 rounded-md text-sm appearance-none cursor-pointer',
            'bg-[var(--surface-1)] border border-[var(--border-md)] text-[var(--text-1)]',
            'focus:outline-none focus:border-[var(--accent)]/60',
            'focus:ring-2 focus:ring-[var(--accent)]/15',
            'transition-colors duration-150'
          )}
        >
          <option value="">Tous les tournois</option>
          {tournaments.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
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
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {/* Result count */}
      <p className="text-xs text-[var(--text-3)] shrink-0 ml-auto">
        <span className="text-[var(--text-2)] font-medium tabular-nums">{totalCount}</span>{' '}
        match{totalCount !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
