'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, X, ChevronDown, AlertCircle, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import MatchRow from './MatchRow'
import StatCardsRow from './StatCardsRow'
import WeatherForecastModal from './WeatherForecastModal'
import TournamentSelector from './TournamentSelector'
import { TournamentProvider, useTournament } from '@/contexts/TournamentContext'
import type { MatchStats } from '@/lib/types/match'
import type { TodaysStats } from '@/lib/types/dashboard'
import { createClient } from '@/lib/supabase/client'
import { useDashboardDict } from './DashboardDictContext'

interface DashboardOverviewProps {
  matches: MatchStats[]
  fetchError?: string
  favoriteMatchIds?: string[]
  todaysStats?: TodaysStats
}

const TODAY_FILTER_KEY = '__today__'

export default function DashboardOverview({
  matches,
  fetchError,
  favoriteMatchIds = [],
  todaysStats,
}: DashboardOverviewProps) {
  const dict = useDashboardDict()
  const t = dict.overview

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [localFavoriteIds, setLocalFavoriteIds] = useState<string[]>(favoriteMatchIds)

  // ── Tournament context setup ─────────────────────────────────────────────
  // Fetch distinct tournament names from tournament_weather at mount.
  const [tournamentList, setTournamentList] = useState<string[]>([])

  useEffect(() => {
    async function loadTournaments() {
      const supabase = createClient()
      if (!supabase) return

      const { data, error } = await supabase
        .from('tournament_weather')
        .select('tourney_name')
        .order('tourney_name', { ascending: true })

      if (error || !data) return

      const seen = new Set<string>()
      const sorted: string[] = []
      for (const row of data) {
        if (row.tourney_name && !seen.has(row.tourney_name)) {
          seen.add(row.tourney_name)
          sorted.push(row.tourney_name)
        }
      }
      setTournamentList(sorted)
    }

    loadTournaments()
  }, [])

  // ── Weather modal state ───────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOpenWeatherModal(_tourneyName: string) {
    setIsModalOpen(true)
  }

  function handleModalClose() {
    setIsModalOpen(false)
  }

  // ── Consume TournamentContext BEFORE filteredMatches so the hook is called first ──
  const { selectedTournament } = useTournament()

  const tournaments = useMemo(() => {
    const seen = new Set<string>()
    matches.forEach((m) => {
      if (m.tournoi) seen.add(m.tournoi)
    })
    return Array.from(seen).sort()
  }, [matches])

  const filteredMatches = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10)
    const query = searchQuery.trim().toLowerCase()

    return matches.filter((m) => {
      if (favoritesOnly && !localFavoriteIds.includes(m.id)) {
        return false
      }
      if (query) {
        const p1 = m.player1.toLowerCase()
        const p2 = m.player2.toLowerCase()
        if (!p1.includes(query) && !p2.includes(query)) return false
      }
      if (activeFilters.size > 0) {
        if (activeFilters.has(TODAY_FILTER_KEY) && m.date_match !== todayStr) {
          return false
        }
        const activeTournaments = tournaments.filter((tourney) =>
          activeFilters.has(tourney)
        )
        if (activeTournaments.length > 0) {
          if (!activeTournaments.includes(m.tournoi ?? '')) return false
        }
      }
      if (selectedTournament && m.tournoi) {
        if (m.tournoi.toLowerCase() !== selectedTournament.toLowerCase()) {
          return false
        }
      }
      return true
    })
  }, [matches, searchQuery, activeFilters, tournaments, favoritesOnly, localFavoriteIds, selectedTournament])

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
    <TournamentProvider initialTournaments={tournamentList}>
      <div className="space-y-4">
        {/* Tournament selector — always visible once list is loaded */}
        <div className="flex items-center justify-end mb-4">
          {tournamentList.length > 0 && <TournamentSelector />}
        </div>

        {/* Stat cards row — onOpenModal opens the weather forecast modal */}
        <StatCardsRow
          todaysStats={todaysStats}
          onOpenModal={handleOpenWeatherModal}
        />

        {/* Error banner */}
        {fetchError && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--red)]/10 border border-[var(--red)]/25">
            <AlertCircle size={15} className="text-[var(--red)] shrink-0" strokeWidth={1.5} />
            <p className="text-sm text-[var(--red)] flex-1">{fetchError}</p>
            <button
              onClick={() => window.location.reload()}
              className="h-7 px-3 flex items-center justify-center gap-1.5 rounded-md bg-[var(--red)]/15 hover:bg-[var(--red)]/25 text-[var(--red)] text-xs font-medium transition-colors"
            >
              {t.error.retry}
            </button>
          </div>
        )}

        {/* Search + filter bar — flex-col on mobile */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* Search input */}
            <div className="relative flex-1 max-w-sm">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
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

            {/* Filter buttons — wrap on mobile */}
            <div className="flex flex-wrap items-center gap-2">
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
                {t.filters.today}
              </button>

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
                {localFavoriteIds.length > 0
                  ? t.filters.favoritesWithCount.replace('{count}', String(localFavoriteIds.length))
                  : t.filters.favorites}
              </button>

              {selectedTournament && (
                <span className="h-8 px-2.5 flex items-center justify-center gap-1.5 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent-hi)] text-xs font-medium whitespace-nowrap">
                  {selectedTournament}
                </span>
              )}

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="h-8 px-2.5 flex items-center justify-center gap-1 rounded-md text-xs text-[var(--text-3)] hover:text-[var(--red)] transition-colors"
                >
                  <X size={11} />
                  {t.filters.clear}
                </button>
              )}

              <p className="text-xs text-[var(--text-3)] shrink-0 ml-auto">
                <span className="text-[var(--text-2)] font-medium tabular-nums">
                  {filteredMatches.length}
                </span>
                {' match'}
                {filteredMatches.length !== 1 ? 'es' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="md:overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                    {t.table.date}
                  </th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                    {t.table.tournament}
                  </th>
                  <th className="px-2 md:px-4 py-2.5 text-left text-[10px] md:text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                    {t.table.players}
                  </th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                    {t.table.surface}
                  </th>
                  <th className="px-2 md:px-4 py-2.5 w-10" />
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
                                {t.empty.favoritesTitle}
                              </p>
                              <p className="text-xs text-[var(--text-3)] mt-0.5">
                                {t.empty.favoritesDesc}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-sm font-medium text-[var(--text-2)]">
                                {t.empty.noMatchesTitle}
                              </p>
                              <p className="text-xs text-[var(--text-3)] mt-0.5">
                                {t.empty.noMatchesDesc}
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
                            {t.filters.clearFilters}
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

        {/* Weather forecast modal — reads selectedTournament from context internally */}
        {isModalOpen && (
          <WeatherForecastModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        )}
      </div>
    </TournamentProvider>
  )
}
