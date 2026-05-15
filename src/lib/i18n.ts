/**
 * Centralised i18n dictionary — single source of truth for all dashboard UI strings.
 * French (FR) is the default locale.
 */

export type Locale = 'fr' | 'en'

export const DEFAULT_LOCALE: Locale = 'fr'

export const LOCALE_COOKIE_NAME = 'haurus-locale'

/** Simple string interpolation — replaces {{key}} placeholders with values. */
export function interpolate(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => String(values[key] ?? `{{${key}}}`))
}

// ── Shared keys ────────────────────────────────────────────────────────────────

const common = {
  closePanelAria: 'Fermer le panneau',
} as const

// ── Sidebar ────────────────────────────────────────────────────────────────────

const sidebar = {
  nav: {
    overview: { fr: 'Aperçu', en: 'Overview' },
    player:   { fr: 'Joueur',   en: 'Player'   },
    metrics:  { fr: 'Métriques', en: 'Metrics' },
  },
  sessionUnavailable: 'Session indisponible',
  signOut: 'Déconnexion...',
  signOutConfirm: 'Se déconnecter',
  profile: 'Profil',
  settings: 'Réglage',
  closeMenu: 'Fermer le menu',
  common,
} as const

// ── Header ──────────────────────────────────────────────────────────────────────

const header = {
  routes: {
    '/dashboard': {
      title:    { fr: 'Aperçu',              en: 'Overview'              },
      subtitle: { fr: 'Statistiques des matchs ATP', en: 'ATP match statistics' },
    },
    '/dashboard/player': {
      title:    { fr: 'Joueur',               en: 'Player'               },
      subtitle: { fr: 'Profil et suivi des joueurs', en: 'Player profile & tracking' },
    },
    '/dashboard/metrics': {
      title:    { fr: 'Métriques',            en: 'Metrics'              },
      subtitle: { fr: 'Définitions des métriques', en: 'Metric definitions' },
    },
  },
  mobileMenu: 'Ouvrir le menu',
  common,
} as const

// ── Dashboard overview ───────────────────────────────────────────────────────────

const dashboard = {
  retryButton: 'Réessayer',
  clearFilters: 'Effacer',
  clearAllFilters: 'Effacer les filtres',
  searchPlaceholder: 'Rechercher un joueur...',
  today: "Aujourd'hui",
  favorites: 'Favoris',
  noMatchFound: 'Aucun match trouvé',
  noMatchFoundHint: 'Modifiez vos critères de recherche ou filtres.',
  noFavorites: 'Aucun favori',
  noFavoritesHint: 'Ajoutez des matchs en étoile.',
  matchesCount: (n: number) => `${n} match${n !== 1 ? 's' : ''}`,
  common,
} as const

// ── Stat cards ────────────────────────────────────────────────────────────────────

const statCards = {
  card1: {
    label:    'Matchs du jour',
    noMatch:  'Aucun match prévu',
  },
  card2: {
    label:    'Météo',
    noData:   'Données indisponibles',
    noActive: 'Aucun tournoi actif',
    forecast: 'Prévision',
  },
  card3: {
    label:        'Vitesse de surface',
    noData:       'Données indisponibles',
    temperature:  'Température',
    humidity:     'Humidité',
    wind:         'Vent',
    pop:          'POP',
    common,
  },
  common,
} as const

// ── Player page ────────────────────────────────────────────────────────────────

const player = {
  searchPlaceholder: 'Rechercher un joueur ATP...',
  searchErrorSession: 'Session expirée. Veuillez vous reconnecter.',
  searchErrorGeneric: 'Échec de la recherche. Veuillez réessayer.',
  searchEmpty: 'Aucun joueur trouvé',
  trackedSectionTitle: 'Suivis',
  trackedEmptyTitle: 'Aucun joueur suivi',
  trackedEmptyHint: 'Recherchez un joueur et ajoutez-le à vos suivis',
  trackedLockedUntil: 'Verrouillé jusqu\'au {{date}}',
  trackedUnlocked: 'Débloqué',
  trackedRemoveHint: 'Retirer des suivis',
  trackedRemoveHintLocked: 'Joueur verrouillé jusqu\'au {{date}}',
  trackModalTitle: 'Suivre {{playerName}}',
  trackModalDescription: 'Une fois ajouté à vos suivis, ce joueur sera {{lockedText}}. Vous ne pourrez pas le retirer avant cette date.',
  trackModalLockedText: 'verrouillé jusqu\'au premier jour du mois suivant',
  trackModalNoteUser: 'Note : aucune restriction ne s\'applique pour le moment sur votre plan.',
  trackModalCancel: 'Annuler',
  trackModalConfirm: 'Suivre et consulter',
  surfaceHard: 'Dur',
  surfaceClay: 'Terre battue',
  surfaceGrass: 'Gazon',
  myPlayersButton: 'Mes joueurs',
  openMyPlayersAria: 'Ouvrir ou fermer le panneau Mes joueurs',
  profileEmptyTitle: 'Recherchez un joueur ATP',
  profileEmptyHint: 'Tapez au moins 2 caractères pour démarrer',
  statsChartMetricLabel: 'Métrique',
  statsChartPoints: 'pts',
  statsChartInsufficientHistory: 'Historique insuffisant — revenez dans quelques jours',
  common,
} as const

// ── Match row / metrics ────────────────────────────────────────────────────────

const matchRow = {
  favoriteAdd: 'Ajouter aux favoris',
  favoriteRemove: 'Retirer des favoris',
  date: 'Date',
  tournament: 'Tournoi',
  players: 'Joueurs',
  surface: 'Surface',
  common,
} as const

// ── Build final dictionary ─────────────────────────────────────────────────────

export const dictionary = {
  sidebar,
  header,
  dashboard,
  statCards,
  player,
  matchRow,
  common,
} as const

export type Dictionary = typeof dictionary

export function getDictionary(locale: Locale): Dictionary {
  return dictionary
}
