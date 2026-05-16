'use client'

import { createContext, useContext, type ReactNode } from 'react'

export type DashboardDict = {
  header: {
    routes: Record<string, { title: string; subtitle: string }>
    openMenu: string
  }
  sidebar: {
    nav: {
      overview: string
      player: string
      metrics: string
    }
    footer: {
      sessionUnavailable: string
      defaultUserName: string
    }
    dropdown: {
      profile: string
      settings: string
      signOut: string
      signingOut: string
    }
    closeMenu: string
  }
  overview: {
    searchPlaceholder: string
    filters: {
      today: string
      favorites: string
      favoritesWithCount: string
      clear: string
      clearFilters: string
    }
    table: {
      date: string
      tournament: string
      players: string
      surface: string
    }
    matchesCount: string
    error: {
      fetchFailed: string
      retry: string
    }
    empty: {
      favoritesTitle: string
      favoritesDesc: string
      noMatchesTitle: string
      noMatchesDesc: string
    }
  }
}

export const DashboardDictContext = createContext<DashboardDict | null>(null)

export function DashboardDictProvider({
  children,
  dict,
}: {
  children: ReactNode
  dict: DashboardDict
}) {
  return (
    <DashboardDictContext.Provider value={dict}>
      {children}
    </DashboardDictContext.Provider>
  )
}

export function useDashboardDict(): DashboardDict {
  const ctx = useContext(DashboardDictContext)
  if (!ctx) {
    throw new Error('useDashboardDict must be used within DashboardDictProvider')
  }
  return ctx
}
