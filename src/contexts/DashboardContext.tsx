'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { createClient } from '@/lib/supabase/client'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface DashboardContextValue {
  tournaments: string[]
  selectedTournament: string | null
  setSelectedTournament: (tournament: string) => void
  surfaceSpeed: number | null
  setSurfaceSpeed: (speed: number) => void
  /** Fetches tournaments that have at least one upcoming or today's match.
   *  Intended for SSR / parent use so the initial list is available before
   *  the client hydrates. */
  fetchUpcomingTournaments: () => Promise<string[]>
}

export interface DashboardContextProviderProps {
  children: ReactNode
  /** Optional pre-fetched tournament list coming from the server.
   *  When provided, the context initialises with this list and skips the
   *  client-side query. */
  initialTournaments?: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

export const DashboardContext = createContext<DashboardContextValue | null>(null)

// ─────────────────────────────────────────────────────────────────────────────
// Helpers (client-side Supabase)
// ─────────────────────────────────────────────────────────────────────────────

/** Returns distinct tournament names that have at least one match on or after
 *  today, ordered alphabetically.  Falls back to an empty array on error. */
export async function fetchUpcomingTournaments(): Promise<string[]> {
  const supabase = createClient()
  if (!supabase) return []

  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('match_stats')
    .select('tournoi, surface')
    .gte('date_match', today)
    .order('date_match', { ascending: true })

  if (error || !data) return []

  // Distinct tournament names
  const names = [...new Set(data.map((r) => r.tournoi).filter(Boolean))].sort()
  return names as string[]
}

/** Fetches pace_index from tournament_pace for a given tournament + surface
 *  combination.  Returns null when no record exists (mismatch, unknown
 *  surface, etc.).  Never throws. */
async function fetchTournamentPace(
  tourneyName: string,
  surface: string
): Promise<number | null> {
  const supabase = createClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('tournament_pace')
    .select('pace_index')
    .ilike('tourney_name', tourneyName)
    .ilike('surface', surface)
    .maybeSingle()

  if (error || !data) return null
  return data.pace_index
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardProvider({
  children,
  initialTournaments,
}: DashboardContextProviderProps) {
  // Tournament list — starts with server-provided list if available,
  // otherwise populated lazily by the client query.
  const [tournaments, setTournaments] = useState<string[]>(
    initialTournaments ?? []
  )

  // Loading flag — internal only, not exposed in context value.
  const [isLoading, setIsLoading] = useState(!initialTournaments)

  const [selectedTournament, setSelectedTournamentState] = useState<string | null>(
    initialTournaments && initialTournaments.length > 0 ? initialTournaments[0] : null
  )

  const [surfaceSpeed, setSurfaceSpeedState] = useState<number | null>(null)

  // ── Lazy initial fetch (when no server data provided) ─────────────────────
  useEffect(() => {
    if (initialTournaments && initialTournaments.length > 0) return

    setIsLoading(true)
    fetchUpcomingTournaments()
      .then((names) => {
        setTournaments(names)
        if (names.length > 0 && !selectedTournament) {
          setSelectedTournamentState(names[0])
        }
      })
      .finally(() => setIsLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Public setter ──────────────────────────────────────────────────────────
  const setSelectedTournament = useCallback(
    async (tournament: string) => {
      setSelectedTournamentState(tournament)

      // Resolve surface from the current tournament's match_stats row.
      // We grab any row for today-or-later to get the surface — it is
      // consistent within a tournament.
      const supabase = createClient()
      if (!supabase) return

      const today = new Date().toISOString().split('T')[0]

      const { data } = await supabase
        .from('match_stats')
        .select('surface')
        .ilike('tournoi', tournament)
        .gte('date_match', today)
        .limit(1)

      const surface: string | null =
        data && data.length > 0 && data[0].surface ? data[0].surface : null

      if (!surface) {
        // No surface known — silent skip, keep previous surfaceSpeed.
        return
      }

      // Fetch pace_index and update surfaceSpeed silently.
      const paceIndex = await fetchTournamentPace(tournament, surface)
      if (paceIndex !== null) {
        setSurfaceSpeedState(paceIndex)
      }
      // If paceIndex === null (no record in tournament_pace) → keep previous
      // value — no throw, no console.error.
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // ── Surface speed setter (for consumers that need manual override) ──────────
  const setSurfaceSpeed = useCallback((speed: number) => {
    setSurfaceSpeedState(speed)
  }, [])

  const value: DashboardContextValue = {
    tournaments,
    selectedTournament,
    setSelectedTournament,
    surfaceSpeed,
    setSurfaceSpeed,
    fetchUpcomingTournaments,
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext)
  if (!ctx) {
    throw new Error(
      'useDashboard must be used within a DashboardProvider'
    )
  }
  return ctx
}
