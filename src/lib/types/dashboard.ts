/**
 * TodaysStats — Types for the daily stats cards displayed above the match table.
 *
 * Exported from src/lib/types/dashboard.ts so both the page (server) and
 * DashboardOverview (client) can reference the same contract.
 */
export type TodaysStats = {
  card1: {
    count: number
    tournaments: Array<{ name: string; surface: string }>
  }
  card2: {
    playerName: string
    winRate: number
    surface: string
    opponent: string
  } | null
  card3: {
    playerName: string
    momentum: number
    opponent: string
  } | null
}
