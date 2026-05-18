import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { DashboardDictContext, type DashboardDict } from '@/components/dashboard/DashboardDictContext'
import type { TournamentSelectorOption } from '@/contexts/TournamentContext'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch distinct tournaments with their surface from tournament_weather,
  // shaped as TournamentSelectorOption[] for TournamentProvider.
  const { data: rawData } = await supabase
    .from('tournament_weather')
    .select('tourney_name, surface')
    .order('tourney_name', { ascending: true })

  const seen = new Set<string>()
  const initialTournaments: TournamentSelectorOption[] = []
  if (rawData) {
    for (const row of rawData) {
      if (row.tourney_name && !seen.has(row.tourney_name)) {
        seen.add(row.tourney_name)
        initialTournaments.push({
          tourney_name: row.tourney_name,
          surface: row.surface ?? 'Hard',
        })
      }
    }
  }

  // Build the dict for DashboardDictContext.
  // The dict prop is passed to DashboardShell, which wraps children in
  // DashboardDictContext.Provider internally — no extra provider here.
  const dict: DashboardDict = {
    header: {
      routes: {
        '/dashboard': { title: 'Dashboard', subtitle: '' },
        '/player': { title: 'Joueurs', subtitle: '' },
        '/metrics': { title: 'Métriques', subtitle: '' },
      },
      openMenu: 'Ouvrir le menu',
    },
    sidebar: {
      nav: {
        overview: 'Vue d\'ensemble',
        player: 'Joueurs',
        metrics: 'Métriques',
      },
      footer: {
        sessionUnavailable: 'Session indisponible',
        defaultUserName: 'Utilisateur',
      },
      dropdown: {
        profile: 'Profil',
        settings: 'Paramètres',
        signOut: 'Déconnexion',
        signingOut: 'Déconnexion…',
      },
      closeMenu: 'Fermer le menu',
    },
    overview: {
      searchPlaceholder: 'Rechercher un joueur…',
      filters: {
        today: 'Aujourd\'hui',
        favorites: 'Favoris',
        favoritesWithCount: 'Favoris ({count})',
        clear: 'Effacer',
        clearFilters: 'Effacer les filtres',
      },
      table: {
        date: 'Date',
        tournament: 'Tournoi',
        players: 'Joueurs',
        surface: 'Surface',
      },
      matchesCount: '{count} matchs',
      error: {
        fetchFailed: 'Échec du chargement',
        retry: 'Réessayer',
      },
      empty: {
        favoritesTitle: 'Aucun favori',
        favoritesDesc: 'Ajoutez des matchs en favoris pour les retrouver ici.',
        noMatchesTitle: 'Aucun match',
        noMatchesDesc: 'Aucun match prévu aujourd\'hui.',
      },
    },
    statCards: {
      card1: {
        label: 'Matchs aujourd\'hui',
        noMatches: 'Aucun match',
      },
      card2: {
        label: 'Météo',
        unavailable: 'Données indisponibles',
        noTournament: 'Pas de tournoi',
        forecast: 'Prévisions',
      },
      card3: {
        label: 'Vitesse surface',
        unavailable: 'Données indisponibles',
      },
    },
    weatherModal: {
      close: 'Fermer',
      precipitations: 'Précipitations',
      forecast24h: 'Prévisions 24h',
      temperature: 'Température',
      humidity: 'Humidité',
      wind: 'Vent',
      noDataTitle: 'Pas de données',
      noDataDesc: 'Aucune prévision météo disponible pour ce tournoi.',
    },
    metrics: {
      pageTitle: 'Métriques de，性能',
      pageSubtitle: 'Suivi des performances des joueurs',
      searchPlaceholder: 'Rechercher une métrique…',
      metricCount: '{count} métrique',
      metricCountPlural: '{count} métriques',
      emptyTitle: 'Aucune métrique',
      emptyDesc: 'Aucune métrique disponible.',
      modalClose: 'Fermer',
      modalOpenDetails: 'Voir détails',
    },
  }

  return (
    <DashboardShell dict={dict}>
      {children}
    </DashboardShell>
  )
}
