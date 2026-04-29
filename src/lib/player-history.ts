/**
 * Pure helper functions for PlayerMatchHistory.
 * Extracted from PlayerMatchHistory.tsx to enable unit testing.
 * These functions are also used inline in the component.
 */

export type MatchResultRow = {
  id: string
  date_match: string
  player1: string
  player2: string
  winner: string | null
  loser: string | null
  score: string | null
  surface: string | null
  tournoi: string | null
  round: string | null
  best_of: number | null
  minutes: number | null
  rank_winner: number | null
  rank_loser: number | null
  created_at: string | null
}

/**
 * Returns the name of the opponent player.
 * - If playerName matches player1 → return player2
 * - If playerName matches player2 → return player1
 * - If playerName matches neither → fallback to player1
 */
export function getOpponent(match: MatchResultRow, playerName: string): string {
  if (match.player1 === playerName) return match.player2
  if (match.player2 === playerName) return match.player1
  return match.player1
}

/**
 * Determines whether the player won the match.
 * - Returns true if playerName matches the winner
 * - Returns false if playerName does not match the winner
 * - Returns null if winner is null (no result yet)
 */
export function isWin(match: MatchResultRow, playerName: string): boolean | null {
  if (!match.winner) return null
  return match.winner === playerName
}

/**
 * Formats a date string to French locale date.
 * Returns the original string if Date parsing fails.
 */
export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return dateStr
  }
}
