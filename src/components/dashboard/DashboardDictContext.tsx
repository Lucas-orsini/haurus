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
  player?: {
    searchBar: {
      placeholder: string
      minCharsHint: string
      noResults: string
      sessionExpired: string
      searchFailed: string
    }
    trackedPanelButton: string
    trackedPanelAriaLabel: string
    trackedEmptyHint: string
    trackedEmptySubHint: string
    metricCards: {
      glicko2: string
      pServe: string
      momentum: string
      vsAtp: string
      days30: string
    }
    matchHistory: {
      title: string
      emptyTitle: string
      emptyDesc: string
      columns: {
        date: string
        opponent: string
        tournament: string
        surface: string
        score: string
        result: string
        metrics: string
      }
      metricsButton: string
      resultWin: string
      resultLoss: string
    }
    statsChart?: {
      metricLabel: string
      insufficientHistory: string
      bppi: string
      rank: string
      p_serve: string
      p_return: string
      tsd_clay: string
      tsd_hard: string
      tsd_grass: string
      glicko_clay: string
      glicko_hard: string
      glicko_grass: string
      momentum_td: string
      win_rate_td: string
      win_rate_clay_td: string
      win_rate_hard_td: string
      win_rate_grass_td: string
      breaks_won_td: string
      breaks_lost_td: string
      delta_rank_6m: string
    }
    surface?: {
      hard: string
      clay: string
      grass: string
    }
    trackModal?: {
      followTitle: string
      body: string
      lockedUntil: string
      cannotRemove: string
      noRestrictionNote: string
      cancel: string
      confirm: string
    }
    tracked?: {
      label: string
      emptyTitle: string
      emptyDesc: string
      lockedUntil: string
      unlocked: string
      removeFromTracked: string
      closePanel: string
    }
    matchMetrics?: {
      title: string
      close: string
      notAvailable: string
      advantage: string
      disadvantage: string
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
