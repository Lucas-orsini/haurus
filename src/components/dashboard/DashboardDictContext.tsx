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
  statCards: {
    card1: {
      label: string
      noMatches: string
    }
    card2: {
      label: string
      unavailable: string
      noTournament: string
      forecast: string
    }
    card3: {
      label: string
      unavailable: string
    }
  }
  weatherModal: {
    close: string
    precipitations: string
    forecast24h: string
    temperature: string
    humidity: string
    wind: string
    noDataTitle: string
    noDataDesc: string
  }
  metrics: {
    pageTitle: string
    pageSubtitle: string
    searchPlaceholder: string
    metricCount: string
    metricCountPlural: string
    emptyTitle: string
    emptyDesc: string
    modalClose: string
    modalOpenDetails: string
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
