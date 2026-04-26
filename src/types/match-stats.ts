/**
 * MatchStats — contrat de type partagé entre fetchMatchStats(), le Server Component dashboard,
 * et les Client Components MatchTable + TableFilters.
 */
export interface MatchStats {
  id: string
  date: string
  tournament: string
  surface: string
  player1_name: string
  player2_name: string
  metric_names: string[] | null
  player1_values: (number | null)[] | null
  player2_values: (number | null)[] | null
}
