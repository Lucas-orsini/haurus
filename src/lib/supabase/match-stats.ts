/**
 * fetchMatchStats — récupère tous les matchs ordonnés par date décroissante.
 * Utilise le client Supabase SSR (coté serveur uniquement).
 *
 * Retourne un objet { matches, error } pour permettre au consommateur de distinguer
 * une erreur d'un tableau vide légitime.
 *
 * @example
 * // Succès (avec ou sans données)
 * { matches: [...], error: null }
 *
 * // Erreur Supabase
 * { matches: [], error: { code: '42P01', message: '...', details: '...', hint: '...' } }
 */
import { createClient } from '@/lib/supabase/server'
import type { MatchStats, FetchMatchStatsResult } from '@/types/match-stats'

export async function fetchMatchStats(): Promise<FetchMatchStatsResult> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('match_stats')
      .select(
        'id, date, tournament, surface, player1_name, player2_name, metric_names, player1_values, player2_values'
      )
      .order('date', { ascending: false })

    if (error) {
      const errorObj = error as { code?: string; details?: string; hint?: string; message?: string }

      // Cas spécifique : error === {} — la table match_stats est peut-être absente ou inaccessible.
      // On log un warning explicite pour faciliter le diagnostic.
      if (Object.keys(error).length === 0) {
        console.warn(
          '[fetchMatchStats] Supabase returned an empty error object. ' +
            'The table "match_stats" may be missing or inaccessible. ' +
            'Check your Supabase project configuration.'
        )
        return {
          matches: [],
          error: {
            code: undefined,
            message: 'Unable to fetch match stats. The data source may be unavailable.',
            details: undefined,
            hint: 'Verify that the "match_stats" table exists in your Supabase project and that RLS policies allow read access.',
          },
        }
      }

      // Log de diagnostic enrichi avec les champs Supabase disponibles
      console.error('[fetchMatchStats] Supabase error:', {
        code: errorObj.code,
        message: errorObj.message,
        details: errorObj.details,
        hint: errorObj.hint,
      })

      return {
        matches: [],
        error: {
          code: errorObj.code,
          message: errorObj.message ?? 'Unknown Supabase error',
          details: errorObj.details,
          hint: errorObj.hint,
        },
      }
    }

    return {
      matches: (data as MatchStats[]) ?? [],
      error: null,
    }
  } catch (err) {
    console.error('[fetchMatchStats] Unexpected error:', err)
    return {
      matches: [],
      error: {
        code: undefined,
        message: err instanceof Error ? err.message : 'Unexpected error while fetching match stats',
        details: undefined,
        hint: undefined,
      },
    }
  }
}
