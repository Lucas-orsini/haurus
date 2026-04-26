'use client'
import { useState, useEffect, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchStats } from '@/types/match-stats'

interface TableFiltersProps {
  tournaments: string[]
  matches: MatchStats[]
  onFilterChange: (filteredMatches: MatchStats[]) => void
}

export function TableFilters({
  tournaments,
  matches,
  onFilterChange,
}: TableFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [todayActive, setTodayActive] = useState(false)
  const [activeTournaments, setActiveTournaments] = useState<Set<string>>(new Set())

  // Toggle un tournoi dans le filtre
  const toggleTournament = (tournament: string) => {
    setActiveTournaments((prev) => {
      const next = new Set(prev)
      if (next.has(tournament)) {
        next.delete(tournament)
      } else {
        next.add(tournament)
      }
      return next
    })
  }

  // Calcul de la date du jour au format YYYY-MM-DD
  const getTodayString = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Appliquer les filtres avec debounce sur la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = [...matches]

      // Filtre recherche textuelle (insensible à la casse sur les noms des joueurs)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (m) =>
            m.player1_name.toLowerCase().includes(query) ||
            m.player2_name.toLowerCase().includes(query)
        )
      }

      // Filtre aujourd'hui
      if (todayActive) {
        const today = getTodayString()
        filtered = filtered.filter((m) => m.date === today)
      }

      // Filtre tournois actifs (si aucun actif, ce filtre est ignoré)
      if (activeTournaments.size > 0) {
        filtered = filtered.filter((m) => activeTournaments.has(m.tournament))
      }

      onFilterChange(filtered)
    }, 150) // debounce 150ms

    return () => clearTimeout(timer)
  }, [searchQuery, todayActive, activeTournaments, matches, onFilterChange])

  return (
    <div className="flex items-center gap-2">
      {/* Input de recherche */}
      <div className="relative w-48">
        <Search
          size={13}
          strokeWidth={1.5}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un joueur..."
          className={cn(
            'w-full h-8 pl-8 pr-8 rounded-md text-xs',
            'bg-[var(--surface-2)] border border-[var(--border-md)]',
            'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
            'focus:outline-none focus:border-[var(--accent)]/60',
            'focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150'
          )}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Bouton toggle Aujourd'hui */}
      <button
        onClick={() => setTodayActive(!todayActive)}
        className={cn(
          'h-8 px-3 flex items-center justify-center gap-1.5 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap',
          todayActive
            ? 'bg-[var(--accent)] text-white shadow-[0_0_8px_var(--accent-glow)]'
            : 'bg-[var(--surface-2)] border border-[var(--border-md)] text-[var(--text-2)] hover:bg-white/[0.04]'
        )}
      >
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
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Aujourd'hui
      </button>

      {/* Séparateur */}
      <div className="w-px h-5 bg-[var(--border)] shrink-0" />

      {/* Boutons toggle tournois */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {tournaments.map((tournament) => {
          const isActive = activeTournaments.has(tournament)
          return (
            <button
              key={tournament}
              onClick={() => toggleTournament(tournament)}
              className={cn(
                'h-8 px-2.5 flex items-center justify-center gap-1.5 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0',
                isActive
                  ? 'bg-[var(--accent)]/15 text-[var(--accent-hi)] border border-[var(--accent)]/30'
                  : 'bg-[var(--surface-2)] border border-[var(--border-md)] text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.04]'
              )}
            >
              {isActive && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {tournament}
            </button>
          )
        })}
      </div>

      {/* Reset filtres si quelque chose est actif */}
      {(searchQuery || todayActive || activeTournaments.size > 0) && (
        <button
          onClick={() => {
            setSearchQuery('')
            setTodayActive(false)
            setActiveTournaments(new Set())
          }}
          className="h-8 px-2.5 flex items-center justify-center gap-1.5 rounded-md text-xs text-[var(--text-3)] hover:text-[var(--red)] transition-colors ml-auto shrink-0"
        >
          <X size={11} />
          Réinitialiser
        </button>
      )}
    </div>
  )
}
