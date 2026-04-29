import { getOpponent, isWin, formatDate } from '@/lib/player-history'

describe('getOpponent', () => {
  const match = {
    id: 'm1',
    date_match: '2024-06-10',
    player1: 'Alcaraz',
    player2: 'Sinner',
    winner: 'Alcaraz',
    loser: 'Sinner',
    score: '2-0',
    surface: 'Hard',
    tournoi: 'Wimbledon',
    round: null,
    best_of: null,
    minutes: null,
    rank_winner: null,
    rank_loser: null,
    created_at: null,
  }

  it('should return player2 when playerName matches player1', () => {
    // Arrange
    const input = { ...match, player1: 'Alcaraz', player2: 'Sinner' }
    // Act
    const result = getOpponent(input, 'Alcaraz')
    // Assert
    expect(result).toBe('Sinner')
  })

  it('should return player1 when playerName matches player2', () => {
    // Arrange
    const input = { ...match, player1: 'Alcaraz', player2: 'Sinner' }
    // Act
    const result = getOpponent(input, 'Sinner')
    // Assert
    expect(result).toBe('Alcaraz')
  })

  it('should return player1 as fallback when playerName matches neither', () => {
    // Arrange
    const input = { ...match, player1: 'Alcaraz', player2: 'Sinner' }
    // Act
    const result = getOpponent(input, 'Djokovic')
    // Assert
    expect(result).toBe('Alcaraz')
  })
})

describe('isWin', () => {
  it('should return true when playerName is the winner', () => {
    // Arrange
    const match = { id: 'm1', winner: 'Alcaraz', player1: 'Alcaraz', player2: 'Sinner', date_match: '', loser: '', score: '', surface: null, tournoi: null, round: null, best_of: null, minutes: null, rank_winner: null, rank_loser: null, created_at: null }
    // Act
    const result = isWin(match, 'Alcaraz')
    // Assert
    expect(result).toBe(true)
  })

  it('should return false when playerName is not the winner', () => {
    // Arrange
    const match = { id: 'm1', winner: 'Sinner', player1: 'Alcaraz', player2: 'Sinner', date_match: '', loser: '', score: '', surface: null, tournoi: null, round: null, best_of: null, minutes: null, rank_winner: null, rank_loser: null, created_at: null }
    // Act
    const result = isWin(match, 'Alcaraz')
    // Assert
    expect(result).toBe(false)
  })

  it('should return null when winner is null', () => {
    // Arrange
    const match = { id: 'm1', winner: null, player1: 'Alcaraz', player2: 'Sinner', date_match: '', loser: null, score: null, surface: null, tournoi: null, round: null, best_of: null, minutes: null, rank_winner: null, rank_loser: null, created_at: null }
    // Act
    const result = isWin(match, 'Alcaraz')
    // Assert
    expect(result).toBeNull()
  })
})

describe('formatDate', () => {
  it('should return formatted date string for valid ISO date', () => {
    // Arrange
    const dateStr = '2024-06-10'
    // Act
    const result = formatDate(dateStr)
    // Assert
    expect(result).toBe('10 juin 2024')
  })

  it('should return original string when Date parsing fails', () => {
    // Arrange
    const dateStr = 'invalid-date-string'
    // Act
    const result = formatDate(dateStr)
    // Assert
    expect(result).toBe('invalid-date-string')
  })
})
