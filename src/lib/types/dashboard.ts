/**
 * TodaysStats — Types for the daily stats cards displayed above the match table.
 *
 * Exported from src/lib/types/dashboard.ts so both the page (server) and
 * DashboardOverview (client) can reference the same contract.
 *
 * card2 / card3 expose player1 and player2 (with raw stats from match_stats
 * columns _p1 / _p2) instead of a single playerName.
 */
export type TodaysStats = {
  card1: {
    count: number
    tournaments: Array<{ name: string; surface: string }>
  }
  card2: {
    /** Name of the player with the highest surface win rate in this match. */
    player1: string
    /** Name of the opponent in the same match. */
    player2: string
    winRate: number
    surface: string
  } | null
  card3: {
    /** Name of the player with the highest |momentum| in this match. */
    player1: string
    /** Name of the opponent in the same match. */
    player2: string
    momentum: number
  } | null
}
