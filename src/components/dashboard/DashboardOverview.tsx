'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronDown, AlertCircle, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import MatchRow from './MatchRow'
import StatCardsRow from './StatCardsRow'
import WeatherForecastModal from './WeatherForecastModal'
import type { MatchStats } from '@/lib/types/match'
import type { TodaysStats, HourlyForecastEntry } from '@/lib/types/dashboard'
import type { Dictionary } from '@/lib/i18n/types'
import { createClient } from '@/lib/supabase/client'

interface DashboardOverviewProps {
  matches: MatchStats[]
  fetchError?: string
  favoriteMatchIds?: string[]
  todaysStats?: TodaysStats
  statCardsDict?: Dictionary['statCards']
  dashboardDict?: Dictionary['dashboard']
}

const TODAY_FILTER_KEY = '__today__'

export default function DashboardOverview({
  matches,
  fetchError,
  favoriteMatchIds = [],
  todaysStats,
  statCardsDict,
  dashboardDict,
}: DashboardOverviewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [localFavoriteIds, setLocalFavoriteIds] = useState<string[]>(favoriteMatchIds)

  // ── Weather modal state ───────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null)
  const [hourlyData, setHourlyData] = useState<HourlyForecastEntry[]>([])
  const [hourlyLoading, setHourlyLoading] = useState(false)
  const [hourlyError, setHourlyError] = useState<string | null>(null)

  async function handleWeatherClick(tourneyName: string) {
    setSelectedTournament(tourneyName)
    setHourlyError(null)
    setHourlyData([])
    setIsModalOpen(true)
    setHourlyLoading(true)

    try {
      const supabase = createClient()
      if (!supabase) {
        throw new Error('Client Supabase non disponible')
      }

      // Compute Paris date + hour for rolling 24h window
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hour12: false,
      })
      const parts = formatter.formatToParts(new Date())
      const get = (k: string) => parts.find((p) => p.type === k)?.value ?? '01'
      const today = `${get('year')}-${get('month')}-${get('day')}`

      // Compute tomorrow date
      const tomorrowDate = new Date()
      tomorrowDate.setDate(tomorrowDate.getDate() + 1)
      const tomorrow = tomorrowDate.toISOString().slice(0, 10)

      // Fetch both today and tomorrow weather entries for this tournament
      const { data, error } = await supabase
        .from('tournament_weather')
        .select(
          'hour, rain_mm_h, temperature, pop, conditions_icon, conditions, date, wind_speed, humidity, pressure, feels_like'
        )
        .eq('tourney_name', tourneyName)
        .in('date', [today, tomorrow])
        .order('date', { ascending: true })
        .order('hour', { ascending: true })

      if (error) throw error

      // Build entries with dayOffset: 0 = today, 1 = tomorrow
      const entries: HourlyForecastEntry[] = (data ?? []).map((row) => ({
        hour: row.hour as number,
        rain_mm_h: (row.rain_mm_h as number) ?? null,
        temperature: (row.temperature as number) ?? null,
        pop: (row.pop as number) ?? null,
        conditions_icon: (row.conditions_icon as string) ?? null,
        conditions: (row.conditions as string) ?? null,
        dayOffset: (row.date as string) === today ? (0 as const) : (1 as const),
        wind_speed: (row.wind_speed as number) ?? null,
        humidity: (row.humidity as number) ?? null,
        pressure: (row.pressure as number) ?? null,
        feels_like: (row.feels_like as number) ?? null,
      }))

      // Build the rolling 24h window starting from current hour today
      const now = new Date()
      const cutoff = new Date(now.getTime() + 24 * 60 * 60 * 1000)

      const windowEntries = entries.filter((e) => {
        const entryDate = new Date(
          e.dayOffset === 0
            ? `${today}T${String(e.hour).padStart(2, '0')}:00:00`
            : `${tomorrow}T${String(e.hour).padStart(2, '0')}:00:00`
        )
        return entryDate >= now && entryDate < cutoff
      })

      setHourlyData(windowEntries.slice(0, 24))
    } catch (err) {
      setHourlyError(
        err instanceof Error ? err.message : 'Échec du chargement des prévisions météo.'
      )
      setHourlyData([])
    } finally {
      setHourlyLoading(false)
    }
  }

  function handleModalClose() {
    setIsModalOpen(false)
    setSelectedTournament(null)
    setHourlyData([])
    setHourlyError(null)
  }

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

  // ── Resolved translation strings ─────────────────────────────────────────
  const t = {
    retry: dashboardDict?.retry ?? 'Réessayer',
    searchPlaceholder: dashboardDict?.searchPlaceholder ?? 'Rechercher un joueur...',
    todayFilter: dashboardDict?.todayFilter ?? "Aujourd'hui",
    favoritesBtn: dashboardDict?.favoritesBtn ?? 'Favoris',
    clearFilters: dashboardDict?.clearFilters ?? 'Effacer',
    favoritesEmpty: dashboardDict?.favoritesEmpty ?? 'Aucun favori',
    noFavoritesDesc: dashboardDict?.noFavoritesDesc ?? 'Ajoutez des matchs en étoile.',
    noMatchFound: dashboardDict?.noMatchFound ?? 'Aucun match trouvé',
    noMatchFoundDesc: dashboardDict?.noMatchFoundDesc ?? 'Modifiez vos critères de recherche ou filtres.',
    clearAllFilters: dashboardDict?.clearAllFilters ?? 'Effacer les filtres',
    table: {
      date: dashboardDict?.table?.date ?? 'Date',
      tournament: dashboardDict?.table?.tournament ?? 'Tournoi',
      players: dashboardDict?.table?.players ?? 'Joueurs',
      surface: dashboardDict?.table?.surface ?? 'Surface',
    },
  }

  return (
    <div className="space-y-4">

      {/* Stat cards row */}
      <StatCardsRow
        todaysStats={todaysStats}
        onWeatherClick={handleWeatherClick}
        dict={statCardsDict ?? {
          todaysMatches: "Today's matches",
          noMatchesScheduled: 'No matches scheduled',
          weather: 'Weather',
          dataUnavailable: 'Data unavailable',
          noActiveTournament: 'No active tournament',
          surfaceSpeed: 'Surface speed',
          forecast: 'Forecast',
        }}
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
            {t.retry}
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
              {t.todayFilter}
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
                ? `${t.favoritesBtn} (${localFavoriteIds.length})`
                : t.favoritesBtn}
            </button>

            {tournaments.slice(0, 5).map((tournoi) => (
              <button
                key={tournoi}
                onClick={() => toggleFilter(tournoi)}
                className={cn(
                  'h-8 px-2.5 flex items-center justify-center gap-1.5 rounded-md border text-xs font-medium transition-colors duration-150 whitespace-nowrap max-w-[160px]',
                  activeFilters.has(tournoi)
                    ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                    : 'border-[var(--border-md)] bg-white/[0.03] text-[var(--text-2)] hover:bg-white/[0.06]'
                )}
              >
                <span className="truncate">{tournoi}</span>
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="h-8 px-2.5 flex items-center justify-center gap-1 rounded-md text-xs text-[var(--text-3)] hover:text-[var(--red)] transition-colors"
              >
                <X size={11} />
                {t.clearFilters}
              </button>
            )}

            <p className="text-xs text-[var(--text-3)] shrink-0 ml-auto">
              <span className="text-[var(--text-2)] font-medium tabular-nums">
                {filteredMatches.length}
              </span>
              {' '}match{filteredMatches.length !== 1 ? 's' : ''}
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
                              {t.favoritesEmpty}
                            </p>
                            <p className="text-xs text-[var(--text-3)] mt-0.5">
                              {t.noFavoritesDesc}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-[var(--text-2)]">
                              {t.noMatchFound}
                            </p>
                            <p className="text-xs text-[var(--text-3)] mt-0.5">
                              {t.noMatchFoundDesc}
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
                          {t.clearAllFilters}
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

      {/* Weather forecast modal */}
      {isModalOpen && (
        <WeatherForecastModal
          tourneyName={selectedTournament ?? ''}
          hourlyData={hourlyData}
          isLoading={hourlyLoading}
          error={hourlyError}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}
