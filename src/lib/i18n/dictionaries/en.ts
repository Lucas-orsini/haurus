/**
 * English dictionary — all user-facing strings for the dashboard, sidebar,
 * and shared UI. Mirrors the structure of fr.ts exactly.
 */
import type { Dictionary } from '../types'

export const enDict: Dictionary = {
  sidebar: {
    nav: {
      overview: 'Overview',
      liveAlerts: 'Live Alerts',
      upcomingMatches: 'Upcoming Matches',
      myBets: 'My Bets',
      players: 'Players',
      metrics: 'Metrics',
      settings: 'Settings',
      admin: 'Admin',
    },
    profile: 'Profile',
    signOut: 'Sign out',
    signOutLoading: 'Signing out…',
    sessionUnavailable: 'Session unavailable',
    openMenu: 'Open menu',
  },
  dashboard: {
    title: 'Overview',
    subtitle: 'ATP match statistics',
    playerTitle: 'Player',
    playerSubtitle: 'Player profile and tracking',
    metricsTitle: 'Metrics',
    metricsSubtitle: 'Metric definitions',
    searchPlaceholder: 'Search a player…',
    todayFilter: 'Today',
    favoritesBtn: 'Favorites',
    favoritesEmpty: 'No favorites',
    noFavoritesDesc: 'Star matches to add them here.',
    noMatchFound: 'No match found',
    noMatchFoundDesc: 'Adjust your search or filters.',
    clearFilters: 'Clear filters',
    clearAllFilters: 'Clear',
    matchCount: 'matches',
    table: {
      date: 'Date',
      tournament: 'Tournament',
      players: 'Players',
      surface: 'Surface',
    },
    error: 'Failed to load matches. Please try again.',
    retry: 'Retry',
  },
  statCards: {
    todaysMatches: "Today's matches",
    noMatchesScheduled: 'No matches scheduled',
    weather: 'Weather',
    dataUnavailable: 'Data unavailable',
    noActiveTournament: 'No active tournament',
    surfaceSpeed: 'Surface speed',
    forecast: 'Forecast',
  },
  player: {
    myPlayers: 'My players',
    atpRank: 'ATP #',
    searchPlaceholder: 'Search an ATP player',
    searchHint: 'Type at least 2 characters to start',
    noMatchAvailable: 'No matches available',
    lastMatches: 'Recent matches',
    metrics: 'Metrics',
    noHistory: 'No matches available',
    noHistoryDesc: 'This player has no match history',
    chart: {
      insufficientHistory: 'Insufficient history — check back in a few days',
    },
    search: {
      placeholder: 'Search an ATP player...',
      noResults: 'No player found',
      errorGeneric: 'Search failed. Please try again.',
      errorUnauthorized: 'Session expired. Please sign in again.',
    },
    tracking: {
      title: 'Track {playerName}',
      bodyLock:
        'Once added to your tracked players, this player will be locked until the first day of the following month. You will not be able to remove them before that date.',
      bodyUserNote: 'Note: no restriction applies at this time on your plan.',
      cancel: 'Cancel',
      confirm: 'Track & view',
    },
    tracked: {
      headerLabel: 'Tracked',
      emptyTitle: 'No tracked players',
      emptyDesc: 'Search for a player and add them to your tracked list',
      lockedUntil: 'Locked until {date}',
      unlocked: 'Unlocked',
      removeTooltip: 'Remove from tracked',
    },
  },
  metrics: {
    pageTitle: 'Understanding metrics',
    pageDescription:
      'Each metric explained simply — short descriptions for everyone, expert content to go deeper.',
    searchPlaceholder: 'Search a metric…',
    badgeBeta: 'Beta',
    modalClose: 'Close',
    openMetricDetails: 'Open details for {metric}',
    metricCount: 'metrics',
    metricCountSingular: 'metric',
    metricCountPlural: 'metrics',
    emptyStateTitle: 'No metric matches your search',
    emptyStateDescription:
      'Try another term — name, description or surface.',
    // ── Performance metrics education details ────────────────────
    details: {
      columns: {
        metric: 'Metric',
        description: 'Description',
      },
      sections: {
        serviceRetour: 'Serve & Return',
        ratingNiveau: 'Rating & Level',
        formeDynamique: 'Form & Momentum',
        conditionPhysique: 'Physical Condition',
      },
      legend: {
        higherIsBetter: 'Higher is better',
        lowerIsBetter: 'Lower is better',
      },
      // ── Metric translations ──────────────────────────────────
      metrics: {
        // Section 1: Serve & Return
        pServe: {
          name: 'P-Serve',
          shortDescription:
            'Probability of winning a point on serve.',
          expertDescription:
            'Calculated from the player\'s recent matches, weighted by surface. The closer to 100%, the more dominant the player is on serve.',
        },
        pReturn: {
          name: 'P-Return',
          shortDescription:
            'Probability of winning a point on return of serve.',
          expertDescription:
            'Calculated from recent matches. It reflects the player\'s ability to put pressure on the opponent\'s serve. The higher the value, the more effective the return game.',
        },
        tsd: {
          name: 'TSD',
          shortDescription:
            'Serve score relative to the ATP average on this surface.',
          expertDescription:
            'A positive score means the player is above the ATP average on this surface; negative means below. Enables fair comparison between players of different levels.',
        },
        bppi: {
          name: 'BPPI',
          shortDescription:
            'Measures a player\'s mental resilience on break points.',
          expertDescription:
            'A positive score means the player saves more break points than expected based on serve statistics — a sign of mental toughness in key moments.',
        },
        // Section 2: Rating & Level
        classementAtp: {
          name: 'ATP Ranking',
          shortDescription: 'Official ATP ranking position.',
          expertDescription:
            'Indicates overall level but does not reflect surface-specific strengths or recent form.',
        },
        glicko2: {
          name: 'Glicko-2',
          shortDescription:
            'Rating system calculated independently for each surface.',
          expertDescription:
            'More accurate than ATP ranking because it updates after each match and accounts for uncertainty about the player\'s true level. Higher value means stronger on that surface.',
        },
        deltaRank6m: {
          name: 'Δ Rank 6 months',
          shortDescription:
            'Change in ATP ranking over the last 6 months.',
          expertDescription:
            'A negative value means the player has improved their ranking; positive means they have dropped. Useful for spotting players on the rise or in decline.',
        },
        // Section 3: Form & Momentum
        forme: {
          name: 'Form',
          shortDescription:
            'Results from the last 5 matches played.',
          expertDescription:
            'W = win, L = loss. Matches shown oldest to newest. Provides an immediate view of the recent results sequence.',
        },
        winRateTd: {
          name: 'Win Rate TD',
          shortDescription:
            'Recent win percentage across all surfaces.',
          expertDescription:
            'Recent matches carry more weight than older ones. Reflects the player\'s overall current trajectory.',
        },
        winRateSurfaceTd: {
          name: 'Win Rate Surface TD',
          shortDescription:
            'Recent win percentage on the surface of this tournament.',
          expertDescription:
            'Two players of similar overall level can show large gaps on a specific surface. This metric captures performance directly on the surface being played.',
        },
        momentumTd: {
          name: 'Momentum TD',
          shortDescription:
            'Compares very recent form to usual form on this surface.',
          expertDescription:
            'Positive means the player is overperforming relative to their baseline on this surface. Negative means underperforming. Detects players on a hot streak or in a slump.',
        },
        breaksWonTd: {
          name: 'Breaks Won TD',
          shortDescription:
            'Average number of break points converted per match on this surface.',
          expertDescription:
            'Measures the ability to capitalise on return opportunities. A player who breaks often applies constant pressure on the server.',
        },
        breaksLostTd: {
          name: 'Breaks Lost TD',
          shortDescription:
            'Average number of service games lost per match on this surface.',
          expertDescription:
            'The lower the value, the better the player holds serve under pressure. A key indicator of composure in decisive moments.',
        },
        // Section 4: Physical Condition
        fatigue72h: {
          name: 'Fatigue 72H',
          shortDescription:
            'Physical load accumulated in the 72 hours before the match.',
          expertDescription:
            'Cumulative minutes played in this tournament and in the 72 hours before the match. The higher the value, the more fatigued the player approaches this match.',
        },
        joursRepos: {
          name: 'Rest Days',
          shortDescription: 'Number of days since the last match played.',
          expertDescription:
            'Reflects the player\'s physical freshness heading into the match. Neither too little nor too much rest is objectively better — it is contextual information.',
        },
      },
    },
  },
  common: {
    date: 'Date',
    tournament: 'Tournament',
    surface: 'Surface',
    score: 'Score',
    result: 'Result',
    opponent: 'Opponent',
    win: 'W',
    loss: 'L',
    loading: 'Loading…',
    error: 'Something went wrong.',
    noData: '—',
    close: 'Close',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
  },
  surfaces: {
    hard: 'Hard',
    clay: 'Clay',
    grass: 'Grass',
  },
}
