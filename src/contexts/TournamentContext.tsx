'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

export interface TournamentContextValue {
  tournaments: string[]
  selectedTournament: string | null
  setSelectedTournament: (tournament: string) => void
}

export const TournamentContext = createContext<TournamentContextValue | null>(null)

export function TournamentProvider({
  children,
  initialTournaments,
}: {
  children: ReactNode
  initialTournaments: string[]
}) {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(
    initialTournaments.length > 0 ? initialTournaments[0] : null
  )

  /**
   * Sync selectedTournament whenever the tournaments list changes.
   *
   * Handles:
   * - Race condition: initialTournaments arrives empty first, then gets populated
   *   asynchronously → useEffect fires on update and picks the new first element.
   * - Day rollover: a new list of tournaments arrives for a new day →
   *   selectedTournament is reset to the new first item.
   * - Stale selection: selectedTournament no longer exists in the updated list →
   *   automatically falls back to the new first element.
   *
   * Only depends on the array reference so it doesn't fire on unrelated parent
   * re-renders that don't change the tournament list.
   */
  useEffect(() => {
    if (initialTournaments.length === 0) {
      setSelectedTournament(null)
      return
    }
    // Reset to first element only if current selection is no longer valid
    const currentIsValid =
      selectedTournament !== null &&
      initialTournaments.includes(selectedTournament)
    if (!currentIsValid) {
      setSelectedTournament(initialTournaments[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTournaments])

  return (
    <TournamentContext.Provider
      value={{ tournaments: initialTournaments, selectedTournament, setSelectedTournament }}
    >
      {children}
    </TournamentContext.Provider>
  )
}

export function useTournament(): TournamentContextValue {
  const ctx = useContext(TournamentContext)
  if (!ctx) {
    throw new Error('useTournament must be used within a TournamentProvider')
  }
  return ctx
}
