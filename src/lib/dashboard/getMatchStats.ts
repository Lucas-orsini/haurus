/**
 * Dashboard data access layer — match statistics.
 * Queries the Supabase match_stats table from Server Components.
 */
import { createClient } from '@/lib/supabase/server'

/**
 * Shape of a row from the match_stats table.
 * The metrics column contains a JSONB object with dynamic tennis metrics.
 */
export interface MatchStats {
  id: string
  date: string // ISO 8601
  tournament: string
  player1_name: string
  player2_name: string
  surface: string
  metrics: Record<string, string | number> // JSONB dynamic metrics
}

/**
 * Fetch all rows from the match_stats table.
 * Designed to be called from Server Components (async, server-side).
 *
 * @throws Error if Supabase client cannot be created or query fails.
 */
export async function getMatchStats(): Promise<MatchStats[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('match_stats')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    throw new Error(
      `Failed to fetch match stats: ${error.message} (code: ${error.code ?? 'unknown'})`
    )
  }

  return (data as MatchStats[]) ?? []
}
