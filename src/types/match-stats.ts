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
  metric_names: string[]
  player1_values: (number | null)[]
  player2_values: (number | null)[]
}

/**
 * FetchMatchStatsResult — retour enrichi de fetchMatchStats.
 * Permet au consommateur de distinguer une erreur d'un tableau vide légitime.
 * - error === null → succès, matches contient les données (ou tableau vide si aucune donnée)
 * - error !== null → erreur, matches === []
 */
export type FetchMatchStatsResult = {
  matches: MatchStats[]
  error: {
    code?: string
    message: string
    details?: string
    hint?: string
  } | null
}
