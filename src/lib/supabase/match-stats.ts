/**
 * fetchMatchStats — récupère tous les matchs ordonnés par date décroissante.
 * Utilise le client Supabase SSR (coté serveur uniquement).
 * Retourne un tableau vide en cas d'erreur, avec log de l'erreur.
 */
import { createClient } from '@/lib/supabase/server'
import type { MatchStats } from '@/types/match-stats'

/**
 * Normalise une ligne brute de Supabase en MatchStats typé.
 *
 * Supabase peut retourner les colonnes JSON (metric_names, player1_values,
 * player2_values) soit comme tableaux JavaScript, soit comme strings JSON
 * sérialisées. Cette fonction désérialise les strings et préserve les nulls
 * ou undefined sans tentative de parse.
 *
 * La colonne de timestamp du schéma Supabase peut être `created_at`,
 * `played_at` ou `match_date` selon la configuration du projet.
 * On lit la première qui existe dans le raw object.
 *
 * @param raw - Ligne brute retournée par le client Supabase
 * @returns MatchStats correctement typé, avec les champs JSON désérialisés
 */
function normalizeMatchRow(raw: Record<string, unknown>): MatchStats {
  const safeParse = <T>(value: unknown, fallback: T | null): T | null => {
    if (value === null || value === undefined) {
      return fallback
    }
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as T
      } catch {
        console.warn('[fetchMatchStats] JSON.parse failed, returning fallback:', value)
        return fallback
      }
    }
    return value as T
  }

  // Fallback en cascade sur les noms de colonne timestamp possibles
  const timestampValue =
    (raw.created_at as string | undefined) ??
    (raw.played_at as string | undefined) ??
    (raw.match_date as string | undefined) ??
    null

  return {
    id: String(raw.id ?? ''),
    date: String(timestampValue ?? ''),
    tournament: String(raw.tournament ?? ''),
    surface: String(raw.surface ?? ''),
    player1_name: String(raw.player1_name ?? ''),
    player2_name: String(raw.player2_name ?? ''),
    metric_names: safeParse<string[]>(raw.metric_names, null),
    player1_values: safeParse<(number | null)[]>(raw.player1_values, null),
    player2_values: safeParse<(number | null)[]>(raw.player2_values, null),
  }
}

export async function fetchMatchStats(): Promise<MatchStats[]> {
  try {
    const supabase = await createClient()

    // On sélectionne created_at (colonne timestamp par défaut Supabase).
    // Si elle n'existe pas dans le schéma réel, remplacer par played_at
    // puis par match_date dans cet ordre.
    const { data, error } = await supabase
      .from('match_stats')
      .select(
        'id, created_at, tournament, surface, player1_name, player2_name, metric_names, player1_values, player2_values'
      )
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[fetchMatchStats] Supabase error:', error)
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    return data.map((row) => normalizeMatchRow(row as Record<string, unknown>))
  } catch (err) {
    console.error('[fetchMatchStats] Unexpected error:', err)
    return []
  }
}
