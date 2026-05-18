'use client'

import {
  createContext,
  useContext,
  useState,
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
