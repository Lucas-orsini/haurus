/**
 * Shared types for i18n.
 * Exported from here so dictionaries can import Dictionary without
 * creating circular references with the main i18n.ts module.
 */

/** Supported locales */
export type Locale = 'fr' | 'en'

/**
 * Shape of the complete translation object.
 * Mirrors the structure of the fr/en objects in src/lib/i18n.ts.
 * Must be kept in sync whenever new keys are added.
 */
export type Dictionary = {
  sidebar: {
    nav: {
      overview: string
      liveAlerts: string
      upcomingMatches: string
      myBets: string
      players: string
      metrics: string
      settings: string
      admin: string
    }
    profile: string
    signOut: string
    signOutLoading: string
    sessionUnavailable: string
  }
  dashboard: {
    title: string
    subtitle: string
    playerTitle: string
    playerSubtitle: string
    metricsTitle: string
    metricsSubtitle: string
    searchPlaceholder: string
    todayFilter: string
    favoritesBtn: string
    favoritesEmpty: string
    noFavoritesDesc: string
    noMatchFound: string
    noMatchFoundDesc: string
    clearFilters: string
    clearAllFilters: string
    matchCount: string
    table: {
      date: string
      tournament: string
      players: string
      surface: string
    }
    error: string
    retry: string
  }
  statCards: {
    todaysMatches: string
    noMatchesScheduled: string
    weather: string
    dataUnavailable: string
    noActiveTournament: string
    surfaceSpeed: string
    forecast: string
  }
  player: {
    myPlayers: string
    atpRank: string
    searchPlaceholder: string
    searchHint: string
    noMatchAvailable: string
    lastMatches: string
    metrics: string
    noHistory: string
    noHistoryDesc: string
    chart: {
      insufficientHistory: string
    }
    search: {
      placeholder: string
      noResults: string
      errorGeneric: string
      errorUnauthorized: string
    }
    tracking: {
      title: string
      bodyLock: string
      bodyUserNote: string
      cancel: string
      confirm: string
    }
    tracked: {
      headerLabel: string
      emptyTitle: string
      emptyDesc: string
      lockedUntil: string
      unlocked: string
      removeTooltip: string
    }
  }
  metrics: {
    pageTitle: string
    pageDescription: string
    searchPlaceholder: string
    badgeBeta: string
    modalClose: string
    openMetricDetails: string
    metricCount: string
    metricCountSingular: string
    metricCountPlural: string
    emptyStateTitle: string
    emptyStateDescription: string
  }
  common: {
    date: string
    tournament: string
    surface: string
    score: string
    result: string
    opponent: string
    win: string
    loss: string
    loading: string
    error: string
    noData: string
    close: string
    confirm: string
    cancel: string
    save: string
    delete: string
    edit: string
  }
  surfaces: {
    hard: string
    clay: string
    grass: string
  }
}
