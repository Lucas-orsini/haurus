'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronDown, AlertCircle, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import MatchRow from './MatchRow'
import type { MatchStats } from '@/lib/types/match'

interface DashboardOverviewProps {
  matches: MatchStats[]
  fetchError?: string
  favoriteMatchIds?: string[]
}

const TODAY_FILTER_KEY = '__today__'

export default function DashboardOverview({
  matches,
  fetchError,
  favoriteMatchIds = [],
}: DashboardOverviewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [localFavoriteIds, setLocalFavoriteIds] = useState<string[]>(favoriteMatchIds)

  // Collect unique tournaments from data
  const tournaments = useMemo(() => {
    const seen = new Set<string>()
    matches.forEach((m) => {
      if (m.tournoi) seen.add(m.tournoi)
    })
    return Array.from(seen).sort()
  }, [matches])

  // Build the full set of filter keys (today + tournaments)
  const allFilterKeys = useMemo(
    () => [TODAY_FILTER_KEY, ...tournaments],
    [tournaments]
  )

  // Filter matches client-side
  const filteredMatches = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    const query = searchQuery.trim().toLowerCase()

    return matches.filter((m) => {
      // Favorites filter
      if (favoritesOnly && !localFavoriteIds.includes(m.id)) {
        return false
      }

      // Text search: player1 OR player2
      if (query) {
        const p1 = m.player1.toLowerCase()
        const p2 = m.player2.toLowerCase()
        if (!p1.includes(query) && !p2.includes(query)) return false
      }

      // Active filters
      if (activeFilters.size > 0) {
        // Today filter
        if (activeFilters.has(TODAY_FILTER_KEY) && m.date_match !== todayStr) {
          return false
        }

        // Tournament filters (cumulative)
        const activeTournaments = tournaments.filter((t) =>
          activeFilters.has(t)
        )
        if (activeTournaments.length > 0) {
          if (!activeTournaments.includes(m.tournoi ?? '')) return false
        }
      }

      return true
    })
  }, [matches, searchQuery, activeFilters, tournaments, favoritesOnly, localFavoriteIds])

  function toggleFilter(key: string) {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function clearFilters() {
    setActiveFilters(new Set())
    setSearchQuery('')
    setFavoritesOnly(false)
  }

  function handleToggleFavorite(matchId: string, favorited: boolean) {
    setLocalFavoriteIds((prev) =>
      favorited
        ? [...prev, matchId]
        : prev.filter((id) => id !== matchId)
    )
  }

  const hasActiveFilters =
    activeFilters.size > 0 || searchQuery.trim().length > 0 || favoritesOnly
  const showFavoritesEmpty = favoritesOnly && localFavoriteIds.length === 0

  return (
    <div className="space-y-4">

      {/* Error banner */}
      {fetchError && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--red)]/10 border border-[var(--red)]/25">
          <AlertCircle size={15} className="text-[var(--red)] shrink-0" strokeWidth={1.5} />
          <p className="text-sm text-[var(--red)] flex-1">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="h-7 px-3 flex items-center justify-center gap-1.5 rounded-md bg-[var(--red)]/15 hover:bg-[var(--red)]/25 text-[var(--red)] text-xs font-medium transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Search + filter bar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {/* Search input */}
          <div className="relative flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un joueur..."
              className={cn(
                'w-full h-8 pl-8 pr-8 rounded-md text-sm',
                'bg-[var(--surface-1)] border border-[var(--border-md)]',
                'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
                'focus:outline-none focus:border-[var(--accent)]/60',
                'focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150'
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Filter: Aujourd'hui */}
          <button
            onClick={() => toggleFilter(TODAY_FILTER_KEY)}
            className={cn(
              'h-8 px-3 flex items-center justify-center gap-1.5 rounded-md border text-xs font-medium transition-colors duration-150 whitespace-nowrap',
              activeFilters.has(TODAY_FILTER_KEY)
                ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                : 'border-[var(--border-md)] bg-white/[0.03] text-[var(--text-2)] hover:bg-white/[0.06]'
            )}
          >
            <ChevronDown size={11} strokeWidth={1.5} />
            Aujourd&apos;hui
          </button>

          {/* Filter: Favoris */}
          <button
            onClick={() => setFavoritesOnly((v) => !v)}
            className={cn(
              'h-8 px-3 flex items-center justify-center gap-1.5 rounded-md border text-xs font-medium transition-colors duration-150 whitespace-nowrap',
              favoritesOnly
                ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                : 'border-[var(--border-md)] bg-white/[0.03] text-[var(--text-3)] hover:bg-white/[0.06] hover:text-[var(--text-2)]'
            )}
          >
            <Star size={11} strokeWidth={1.5} />
            Favoris
          </button>

          {/* Tournament filter toggles */}
          {tournaments.slice(0, 5).map((t) => (
            <button
              key={t}
              onClick={() => toggleFilter(t)}
              className={cn(
                'h-8 px-2.5 flex items-center justify-center gap-1.5 rounded-md border text-xs font-medium transition-colors duration-150 whitespace-nowrap max-w-[160px]',
                activeFilters.has(t)
                  ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                  : 'border-[var(--border-md)] bg-white/[0.03] text-[var(--text-2)] hover:bg-white/[0.06]'
              )}
            >
              <span className="truncate">{t}</span>
            </button>
          ))}

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="h-8 px-2.5 flex items-center justify-center gap-1 rounded-md text-xs text-[var(--text-3)] hover:text-[var(--red)] transition-colors"
            >
              <X size={11} />
              Effacer
            </button>
          )}

          {/* Count */}
          <p className="text-xs text-[var(--text-3)] shrink-0 ml-auto">
            <span className="text-[var(--text-2)] font-medium tabular-nums">
              {filteredMatches.length}
            </span>
            {' '}match{filteredMatches.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                  Date
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                  Tournoi
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                  Joueurs
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                  Surface
                </th>
                <th className="px-4 py-2.5 w-10" />
              </tr>
            </thead>
            <tbody>
              {filteredMatches.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center">
                        {showFavoritesEmpty ? (
                          <Star size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
                        ) : (
                          <Search size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
                        )}
                      </div>
                      <div>
                        {showFavoritesEmpty ? (
                          <>
                            <p className="text-sm font-medium text-[var(--text-2)]">
                              Aucun favori
                            </p>
                            <p className="text-xs text-[var(--text-3)] mt-0.5">
                              Ajoutez des matchs en étoile.
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-[var(--text-2)]">
                              Aucun match trouvé
                            </p>
                            <p className="text-xs text-[var(--text-3)] mt-0.5">
                              Modifiez vos critères de recherche ou filtres.
                            </p>
                          </>
                        )}
                      </div>
                      {hasActiveFilters && !showFavoritesEmpty && (
                        <button
                          onClick={clearFilters}
                          className="h-7 px-3 flex items-center justify-center gap-1.5 rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors mt-1"
                        >
                          <X size={11} />
                          Effacer les filtres
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMatches.map((match, i) => (
                  <MatchRow
                    key={match.id}
                    match={match}
                    isEven={i % 2 === 1}
                    isFavorite={localFavoriteIds.includes(match.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
