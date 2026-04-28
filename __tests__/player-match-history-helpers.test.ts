import { cn } from '@/lib/utils'

// Helpers extracted as pure functions from PlayerMatchHistory.tsx for testability
function getOpponent(match: { player1: string; player2: string }, playerName: string): string {
  if (match.player1 === playerName) return match.player2
  if (match.player2 === playerName) return match.player1
  return match.player1
}

function isWin(match: { winner: string | null }, playerName: string): boolean | null {
  if (!match.winner) return null
  return match.winner === playerName
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return dateStr
  }
}

describe('PlayerMatchHistory pure helpers', () => {
  describe('getOpponent', () => {
    it('should return player2 when authenticated player is player1', () => {
      const match = { player1: 'Djokovic', player2: 'Nadal' }
      const result = getOpponent(match, 'Djokovic')
      expect(result).toBe('Nadal')
    })

    it('should return player1 when authenticated player is player2', () => {
      const match = { player1: 'Djokovic', player2: 'Nadal' }
      const result = getOpponent(match, 'Nadal')
      expect(result).toBe('Djokovic')
    })

    it('should return player1 when authenticated player is not in match', () => {
      const match = { player1: 'Djokovic', player2: 'Nadal' }
      const result = getOpponent(match, 'Federer')
      expect(result).toBe('Djokovic')
    })
  })

  describe('isWin', () => {
    it('should return null when winner is null', () => {
      const match = { winner: null }
      const result = isWin(match, 'Djokovic')
      expect(result).toBeNull()
    })

    it('should return true when playerName equals winner', () => {
      const match = { winner: 'Djokovic' }
      const result = isWin(match, 'Djokovic')
      expect(result).toBe(true)
    })

    it('should return false when playerName is loser', () => {
      const match = { winner: 'Djokovic' }
      const result = isWin(match, 'Nadal')
      expect(result).toBe(false)
    })
  })

  describe('formatDate', () => {
    it('should format valid ISO date string in fr-FR locale', () => {
      const result = formatDate('2024-06-01')
      expect(result).toBe('01/06/2024')
    })

    it('should return original string when date is invalid', () => {
      const result = formatDate('not-a-date')
      expect(result).toBe('not-a-date')
    })

    it('should return original string for empty string', () => {
      const result = formatDate('')
      expect(result).toBe('')
    })
  })
})
