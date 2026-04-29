import type { Database } from '@/lib/supabase/database.types'

export type MatchStats = Database['public']['Tables']['match_stats']['Row'] & {
  /**
   * Enriched fields populated via LEFT JOIN with match_results.
   * Nullable: LEFT JOIN means match_stats rows without a match_results match
   * keep these as null.
   */
  winner?: string | null
  loser?: string | null
  score?: string | null
}
