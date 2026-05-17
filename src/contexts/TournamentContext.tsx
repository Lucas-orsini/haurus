'use client'

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

export interface TournamentSelectorOption {
  tourney_name: string
  surface: string
}

export interface TournamentContextValue {
  tournaments: TournamentSelectorOption[]
  selectedTournament: string | null
  selectedSurface: string | null
  setSelectedTournament: (tournament: string) => void
  setSelectedSurface: (surface: string) => void
}

export const TournamentContext = createContext<TournamentContextValue | null>(null)

export function TournamentProvider({
  children,
  initialTournaments,
}: {
  children: ReactNode
  initialTournaments: TournamentSelectorOption[]
}) {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(
    initialTournaments.length > 0 ? initialTournaments[0].tourney_name : null
  )
  const [selectedSurface, setSelectedSurface] = useState<string | null>(
    initialTournaments.length > 0 ? initialTournaments[0].surface : null
  )

  return (
    <TournamentContext.Provider
      value={{
        tournaments: initialTournaments,
        selectedTournament,
        selectedSurface,
        setSelectedTournament,
        setSelectedSurface,
      }}
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
