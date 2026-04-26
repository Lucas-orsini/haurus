/**
 * fetchMatchStats — récupère tous les matchs ordonnés par date décroissante.
 * Utilise le client Supabase SSR (coté serveur uniquement).
 * Retourne un tableau vide en cas d'erreur, avec log de l'erreur.
 */
import { createClient } from '@/lib/supabase/server'
import type { MatchStats } from '@/types/match-stats'

export async function fetchMatchStats(): Promise<MatchStats[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('match_stats')
      .select(
        'id, date, tournament, surface, player1_name, player2_name, metric_names, player1_values, player2_values'
      )
      .order('date', { ascending: false })

    if (error) {
      console.error('[fetchMatchStats] Supabase error:', error)
      return []
    }

    return (data as MatchStats[]) ?? []
  } catch (err) {
    console.error('[fetchMatchStats] Unexpected error:', err)
    return []
  }
}
