/**
 * Shared TypeScript types for the i18n system.
 * All components consuming the dictionary MUST import from this file
 * so that missing keys cause compile-time errors rather than runtime undefined.
 */

export type Locale = 'en' | 'fr'

export interface Dictionary {
  nav: {
    overview: string
    player: string
    metrics: string
    profile: string
    signOut: string
    signingOut: string
    sessionUnavailable: string
  }
  header: {
    menuOpen: string
    menuClose: string
    titleOverview: string
    subtitleOverview: string
    titlePlayer: string
    subtitlePlayer: string
    titleMetrics: string
    subtitleMetrics: string
  }
  langSwitcher: {
    label: string
    en: string
    fr: string
  }
  dashboard: {
    fetchError: string
    retry: string
    searchPlaceholder: string
    today: string
    favorites: string
    favoritesCount: string
    clear: string
    matchCount: string
    matches: string
    noFavorites: string
    noFavoritesHint: string
    noResults: string
    noResultsHint: string
    clearFilters: string
    date: string
    tournament: string
    players: string
    surface: string
    actions: string
  }
  stats: {
    card1Title: string
    card1NoMatch: string
    card1Surface: string
    card2Title: string
    card2Unavailable: string
    card2NoTournament: string
    card2Forecast: string
    temperature: string
    humidity: string
    wind: string
    pop: string
    card3Title: string
    card3Unavailable: string
    precipitations: string
    hourlyForecast: string
    forecast24h: string
    noDataAvailable: string
    noDataAvailableHint: string
    close: string
    retryForecast: string
  }
  profile: {
    title: string
    close: string
    tabProfile: string
    tabTelegram: string
    avatar: string
    avatarHint: string
    photoUrlLabel: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    nonModifiable: string
    unsubscribeNewsletter: string
    saveError: string
    cancel: string
    save: string
    saving: string
    profileTab: string
    telegramTab: string
    telegramState: {
      notEligibleBadge: string
      notEligibleText: string
      notEligibleCta: string
      connectedBadge: string
      connectedText: string
      connectedCta: string
      suspendedBadge: string
      suspendedText: string
      suspendedCta: string
      tokenLabel: string
      showKey: string
      hideKey: string
      copy: string
      copied: string
      openBot: string
      notConnectedTitle: string
      notConnectedText: string
      notConnectedCta: string
    }
    dangerZone: string
    deleteAccount: string
    disconnect: string
    disconnecting: string
    reconnect: string
    copyToken: string
    copiedToken: string
  }
  weather: {
    modalLabel: string
    subtitle: string
    close: string
    retry: string
    noData: string
    noDataDesc: string
    precipitations: string
    forecast24h: string
  }
}
