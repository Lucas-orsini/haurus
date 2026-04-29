import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MatchHistoryTable from '@/components/MatchHistoryTable'
import { formatDate } from '@/lib/utils'

// Mock pour Supabase
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          date_match: '2024-03-15',
          player1: 'Player A',
          player2: 'Player B',
          winner: 'Player A',
          loser: 'Player B',
          score: '6-4 6-3',
          surface: 'Hard',
          tournoi: 'Test Tournament',
          round: 'R32',
          minutes: 95,
          best_of: 3,
          rank_winner: 15,
          rank_loser: 45,
        },
      ],
      error: null,
    }),
  })),
}))

describe('MatchHistoryTable', () => {
  describe('formatDate', () => {
    const invalidInputs = ['', null, undefined, 'invalid-date', 'not-a-date']

    it('should return "—" when input is not a valid date string', () => {
      for (const input of invalidInputs) {
        // Act
        const result = formatDate(input as string)

        // Assert
        expect(result).toBe('—')
      }
    })

    it('should format a valid YYYY-MM-DD string to DD/MM/YYYY', () => {
      // Arrange
      const input = '2024-03-15'

      // Act
      const result = formatDate(input)

      // Assert
      expect(result).toBe('15/03/2024')
    })

    it('should format dates at month boundaries correctly', () => {
      // Arrange & Act & Assert
      expect(formatDate('2024-01-01')).toBe('01/01/2024')
      expect(formatDate('2024-12-31')).toBe('31/12/2024')
    })
  })
})
