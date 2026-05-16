/**
 * French dictionary — toutes les chaînes visibles du dashboard, sidebar
 * et UI partagée. Structure identique à en.ts.
 */
import type { Dictionary } from '../types'

export const frDict: Dictionary = {
  sidebar: {
    nav: {
      overview: 'Aperçu',
      liveAlerts: 'Alertes en direct',
      upcomingMatches: 'Matchs à venir',
      myBets: 'Mes paris',
      players: 'Joueurs',
      metrics: 'Métriques',
      settings: 'Paramètres',
      admin: 'Admin',
    },
    profile: 'Profil',
    signOut: 'Se déconnecter',
    signOutLoading: 'Déconnexion…',
    sessionUnavailable: 'Session indisponible',
    openMenu: 'Ouvrir le menu',
  },
  dashboard: {
    title: 'Aperçu',
    subtitle: 'Statistiques des matchs ATP',
    playerTitle: 'Joueur',
    playerSubtitle: 'Profil et suivi des joueurs',
    metricsTitle: 'Métriques',
    metricsSubtitle: 'Définitions des métriques',
    searchPlaceholder: 'Rechercher un joueur…',
    todayFilter: "Aujourd'hui",
    favoritesBtn: 'Favoris',
    favoritesEmpty: 'Aucun favori',
    noFavoritesDesc: 'Ajoutez des matchs en étoile.',
    noMatchFound: 'Aucun match trouvé',
    noMatchFoundDesc: 'Modifiez vos critères de recherche ou filtres.',
    clearFilters: 'Effacer les filtres',
    clearAllFilters: 'Effacer',
    matchCount: 'matchs',
    table: {
      date: 'Date',
      tournament: 'Tournoi',
      players: 'Joueurs',
      surface: 'Surface',
    },
    error: 'Échec du chargement des matchs. Veuillez réessayer.',
    retry: 'Réessayer',
  },
  statCards: {
    todaysMatches: 'Matchs du jour',
    noMatchesScheduled: 'Aucun match prévu',
    weather: 'Météo',
    dataUnavailable: 'Données indisponibles',
    noActiveTournament: 'Aucun tournoi actif',
    surfaceSpeed: 'Vitesse de surface',
    forecast: 'Prévision',
  },
  player: {
    myPlayers: 'Mes joueurs',
    atpRank: 'ATP #',
    searchPlaceholder: 'Recherchez un joueur ATP',
    searchHint: "Tapez au moins 2 caractères pour démarrer",
    noMatchAvailable: 'Aucun match disponible',
    lastMatches: 'Derniers matchs',
    metrics: 'Métriques',
    noHistory: 'Aucun match disponible',
    noHistoryDesc: "L'historique de ce joueur est vide",
    chart: {
      insufficientHistory: "Historique insuffisant — revenez dans quelques jours",
    },
    search: {
      placeholder: 'Rechercher un joueur ATP...',
      noResults: 'Aucun joueur trouvé',
      errorGeneric: 'Échec de la recherche. Veuillez réessayer.',
      errorUnauthorized: 'Session expirée. Veuillez vous reconnecter.',
    },
    tracking: {
      title: 'Suivre {playerName}',
      bodyLock:
        "Une fois ajouté à vos suivis, ce joueur sera verrouillé jusqu'au premier jour du mois suivant. Vous ne pourrez pas le retirer de vos suivis avant cette date.",
      bodyUserNote:
        "Note : aucune restriction ne s'applique pour le moment sur votre plan.",
      cancel: 'Annuler',
      confirm: 'Suivre et consulter',
    },
    tracked: {
      headerLabel: 'Suivis',
      emptyTitle: 'Aucun joueur suivi',
      emptyDesc:
        'Recherchez un joueur et ajoutez-le à vos suivis',
      lockedUntil: "Verrouillé jusqu'au {date}",
      unlocked: 'Débloqué',
      removeTooltip: 'Retirer des suivis',
    },
  },
  metrics: {
    pageTitle: 'Comprendre les métriques',
    pageDescription:
      'Chaque métrique expliquée simplement — descriptions courtes pour tous, contenus experts pour approfondir.',
    searchPlaceholder: 'Rechercher une métrique…',
    badgeBeta: 'Bêta',
    modalClose: 'Fermer',
    openMetricDetails: 'Ouvrir les détails de {metric}',
    metricCount: 'métriques',
    metricCountSingular: 'métrique',
    metricCountPlural: 'métriques',
    emptyStateTitle: 'Aucune métrique ne correspond à votre recherche',
    emptyStateDescription: 'Essayez un autre terme — nom, description ou surface.',
    // ── Performance metrics education details ────────────────────
    details: {
      columns: {
        metric: 'Métrique',
        description: 'Description',
      },
      sections: {
        serviceRetour: 'Service & Retour',
        ratingNiveau: 'Classement & Niveau',
        formeDynamique: 'Forme & Dynamique',
        conditionPhysique: 'Condition physique',
      },
      legend: {
        higherIsBetter: 'Plus c\'est haut, mieux c\'est',
        lowerIsBetter: 'Plus c\'est bas, mieux c\'est',
      },
      // ── Metric translations ──────────────────────────────────
      metrics: {
        // Section 1: Service & Retour
        pServe: {
          name: 'P-Serve',
          shortDescription:
            'Probabilité de remporter un point au service.',
          expertDescription:
            'Calculée sur les matchs récents du joueur, pondérée par surface. Plus la valeur est proche de 100 %, plus le joueur est dominant au service.',
        },
        pReturn: {
          name: 'P-Return',
          shortDescription:
            'Probabilité de remporter un point en retour de service.',
          expertDescription:
            "Calculée sur les matchs récents. Elle reflète la capacité globale à gêner l'adversaire sur son service. Plus la valeur est haute, plus le joueur est efficace en retour.",
        },
        tsd: {
          name: 'TSD',
          shortDescription:
            "Score comparatif du service par rapport à la moyenne ATP sur cette surface.",
          expertDescription:
            "Un score positif indique que le joueur est au-dessus de la moyenne ATP sur cette surface, négatif qu'il est en dessous. Permet de comparer des joueurs de niveaux différents sur un pied d'égalité.",
        },
        bppi: {
          name: 'BPPI',
          shortDescription:
            'Mesure la résistance du joueur sur les balles de break.',
          expertDescription:
            "Un score positif indique qu'il sauve plus de balles de break que ce que ses statistiques de service laissent attendre — signe de solidité mentale sur les moments clés.",
        },
        // Section 2: Classement & Niveau
        classementAtp: {
          name: 'Classement ATP',
          shortDescription: 'Rang officiel ATP du joueur.',
          expertDescription:
            "Donne une indication du niveau général mais ne reflète pas les spécificités par surface ni la forme récente.",
        },
        glicko2: {
          name: 'Glicko-2',
          shortDescription:
            'Système de rating calculé séparément pour chaque surface.',
          expertDescription:
            "Plus précis que le classement ATP car il se met à jour après chaque match et intègre l'incertitude autour du niveau du joueur. Plus la valeur est haute, plus le joueur est fort sur cette surface.",
        },
        deltaRank6m: {
          name: 'Δ Classement 6 mois',
          shortDescription:
            "Évolution du classement ATP sur les 6 derniers mois.",
          expertDescription:
            "Une valeur négative signifie que le joueur a progressé au classement, positive qu'il a reculé. Permet de détecter les joueurs en montée ou en descente sur le moyen terme.",
        },
        // Section 3: Forme & Dynamique
        forme: {
          name: 'Forme',
          shortDescription:
            'Résultats des 5 derniers matchs joués.',
          expertDescription:
            'V = victoire, D = défaite. Les matchs sont affichés du plus ancien au plus récent. Donne une lecture immédiate de la séquence de résultats récents.',
        },
        winRateTd: {
          name: 'Win Rate TD',
          shortDescription:
            'Pourcentage de victoires récentes toutes surfaces confondues.',
          expertDescription:
            'Les matchs récents ont plus de poids que les anciens. Reflète la tendance générale du joueur en ce moment.',
        },
        winRateSurfaceTd: {
          name: 'Win Rate Surface TD',
          shortDescription:
            'Pourcentage de victoires récentes sur la surface de ce tournoi.',
          expertDescription:
            "Deux joueurs de niveau global similaire peuvent avoir des écarts importants selon la surface. Cette métrique capture directement la performance sur la surface jouée.",
        },
        momentumTd: {
          name: 'Momentum TD',
          shortDescription:
            "Compare la forme très récente à la forme habituelle sur cette surface.",
          expertDescription:
            "Une valeur positive signifie que le joueur surperforme par rapport à son niveau habituel en ce moment. Négative, il est en dessous. Détecte les joueurs en montée ou en descente de forme.",
        },
        breaksWonTd: {
          name: 'Breaks Won TD',
          shortDescription:
            'Nombre moyen de breaks réalisés par match sur cette surface.',
          expertDescription:
            'Mesure la capacité à concrétiser les opportunités sur le service adverse. Un joueur qui breake souvent exerce une pression constante.',
        },
        breaksLostTd: {
          name: 'Breaks Lost TD',
          shortDescription:
            'Nombre moyen de breaks concédés par match sur cette surface.',
          expertDescription:
            "Plus la valeur est basse, mieux le joueur tient son service sous pression. Indicateur de solidité sur les moments décisifs.",
        },
        // Section 4: Condition physique
        fatigue72h: {
          name: 'Fatigue 72H',
          shortDescription:
            'Charge physique accumulée dans les 72 heures avant le match.',
          expertDescription:
            "Cumul des minutes jouées dans ce tournoi et dans les 72 heures précédant le match. Plus cette valeur est haute, plus le joueur aborde ce match fatigué.",
        },
        joursRepos: {
          name: 'Jours de repos',
          shortDescription:
            'Nombre de jours depuis le dernier match joué.',
          expertDescription:
            "Reflète la fraîcheur physique du joueur. Ni trop peu ni trop de repos n'est objectivement meilleur — c'est un élément de contexte.",
        },
      },
    },
  },
  common: {
    date: 'Date',
    tournament: 'Tournoi',
    surface: 'Surface',
    score: 'Score',
    result: 'Résultat',
    opponent: 'Adversaire',
    win: 'V',
    loss: 'D',
    loading: 'Chargement…',
    error: 'Une erreur est survenue.',
    noData: '—',
    close: 'Fermer',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    edit: 'Modifier',
  },
  surfaces: {
    hard: 'Dur',
    clay: 'Terre battue',
    grass: 'Gazon',
  },
}
