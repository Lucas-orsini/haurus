/**
 * fetchMatchStats — récupère tous les matchs ordonnés par date décroissante.
 * Mode sans base de données : retourne les fixtures locales en mémoire.
 * TODO: replace with the real Supabase client once the schema is confirmed.
 */
import { MATCH_STATS_FIXTURES } from '@/lib/data'
import type { MatchStats } from '@/types/match-stats'

export async function fetchMatchStats(): Promise<MatchStats[]> {
  // TODO: replace with the real Supabase client once the schema is confirmed.
  return Promise.resolve([...MATCH_STATS_FIXTURES])
}
