/**
 * Données des matchs tennis — point de remplacement unique.
 * Remplace le contenu de `fetchMatches` par un vrai appel Supabase quand la DB est disponible.
 * Le contrat TypeScript reste identique.
 */

import { createClient } from '@/lib/supabase/client'

// ── Type ─────────────────────────────────────────────────────────────────────

export interface MatchStat {
  id: string
  date: string // ISO "YYYY-MM-DD"
  tournament: string
  player1_name: string
  player2_name: string
  surface: 'Hard' | 'Clay' | 'Grass'
  metrics: Record<string, { player1: number | string; player2: number | string }>
}

// ── Normalisation ─────────────────────────────────────────────────────────────

/**
 * Parse une date en entrée (ISO, timestamp, locale) et retourne "YYYY-MM-DD".
 * Ne dépend d'aucune bibliothèque externe.
 */
export function normalizeDate(dateStr: string): string {
  if (!dateStr) return ''
  // Coupe au format ISO court (ignore l'heure/timezone)
  return dateStr.split('T')[0]
}

// ── Fetch ─────────────────────────────────────────────────────────────────────

/**
 * Charge tous les matchs depuis Supabase, ordonnés par date décroissante.
 * @throws Error si l'appel réseau échoue ou si le client Supabase est unavailable.
 */
export async function fetchMatches(): Promise<MatchStat[]> {
  const supabase = createClient()

  if (!supabase) {
    throw new Error(
      'Supabase client unavailable. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    )
  }

  const { data, error } = await supabase
    .from('match_stats')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch match_stats: ${error.message}`)
  }

  return (data as MatchStat[]) ?? []
}

/*
───────────────────────────────────────────────────────────────────────────────
DEV PLACEHOLDER —fixtures mockées (supprimer quand la DB est connectée)
───────────────────────────────────────────────────────────────────────────────

export async function fetchMatches(): Promise<MatchStat[]> {
  return MOCK_MATCHES
}

const MOCK_MATCHES: MatchStat[] = [
  {
    id: 'm1',
    date: '2025-01-15',
    tournament: 'Australian Open',
    player1_name: 'Jannik Sinner',
    player2_name: 'Daniil Medvedev',
    surface: 'Hard',
    metrics: {
      'p_serve':   { player1: 74.2, player2: 68.1 },
      'BPPI':      { player1: 0.31, player2: 0.44 },
      'Glicko-2':  { player1: 2156, player2: 2103 },
      '1st%':      { player1: 81,   player2: 76 },
      '2nd%':      { player1: 58,   player2: 52 },
      'ace':       { player1: 12,   player2: 8  },
      'df':        { player1: 2,    player2: 4  },
      'saved%':    { player1: 68,   player2: 61 },
    },
  },
  {
    id: 'm2',
    date: '2025-01-15',
    tournament: 'Australian Open',
    player1_name: 'Carlos Alcaraz',
    player2_name: 'Alexander Zverev',
    surface: 'Hard',
    metrics: {
      'p_serve':   { player1: 71.8, player2: 69.4 },
      'BPPI':      { player1: 0.38, player2: 0.41 },
      'Glicko-2':  { player1: 2180, player2: 2072 },
      '1st%':      { player1: 78,   player2: 74 },
      '2nd%':      { player1: 55,   player2: 50 },
      'ace':       { player1: 9,    player2: 11 },
      'df':        { player1: 3,    player2: 2 },
      'saved%':    { player1: 64,   player2: 59 },
    },
  },
  {
    id: 'm3',
    date: '2025-01-14',
    tournament: 'Adelaide International',
    player1_name: 'Grigor Dimitrov',
    player2_name: 'Tommy Paul',
    surface: 'Hard',
    metrics: {
      'p_serve':   { player1: 67.3, player2: 65.0 },
      'BPPI':      { player1: 0.47, player2: 0.52 },
      'Glicko-2':  { player1: 1989, player2: 1961 },
      '1st%':      { player1: 73,   player2: 70 },
      '2nd%':      { player1: 51,   player2: 48 },
      'ace':       { player1: 7,    player2: 5 },
      'df':        { player1: 5,    player2: 3 },
      'saved%':    { player1: 58,   player2: 55 },
    },
  },
  {
    id: 'm4',
    date: '2025-01-13',
    tournament: 'Adelaide International',
    player1_name: 'Karen Khachanov',
    player2_name: 'Sebastian Korda',
    surface: 'Hard',
    metrics: {
      'p_serve':   { player1: 66.0, player2: 64.5 },
      'BPPI':      { player1: 0.49, player2: 0.53 },
      'Glicko-2':  { player1: 1975, player2: 1922 },
      '1st%':      { player1: 70,   player2: 68 },
      '2nd%':      { player1: 50,   player2: 47 },
      'ace':       { player1: 8,    player2: 6 },
      'df':        { player1: 4,    player2: 3 },
      'saved%':    { player1: 56,   player2: 53 },
    },
  },
  {
    id: 'm5',
    date: '2025-01-12',
    tournament: 'United Cup',
    player1_name: 'Taylor Fritz',
    player2_name: 'Alex de Minaur',
    surface: 'Hard',
    metrics: {
      'p_serve':   { player1: 69.0, player2: 63.2 },
      'BPPI':      { player1: 0.42, player2: 0.55 },
      'Glicko-2':  { player1: 2025, player2: 1968 },
      '1st%':      { player1: 76,   player2: 71 },
      '2nd%':      { player1: 54,   player2: 49 },
      'ace':       { player1: 10,   player2: 6 },
      'df':        { player1: 3,    player2: 5 },
      'saved%':    { player1: 62,   player2: 57 },
    },
  },
]

*/
