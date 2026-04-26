import { formatDate, formatMatch } from '@/lib/dashboard/matchFormatters'

describe('formatDate', () => {
  // Arrange — ISO date string
  // Act — call formatDate()
  // Assert — result matches fr-FR locale format

  it('should format ISO date 2024-03-15 to 15 mars 2024', () => {
    const input = '2024-03-15'
    const result = formatDate(input)
    expect(result).toContain('15')
    expect(result).toContain('mars')
    expect(result).toContain('2024')
  })

  it('should format year-end date 2024-12-31 correctly', () => {
    const input = '2024-12-31'
    const result = formatDate(input)
    expect(result).toContain('31')
    expect(result).toContain('déc.')
    expect(result).toContain('2024')
  })

  it('should format leap year date 2024-02-29', () => {
    const input = '2024-02-29'
    const result = formatDate(input)
    expect(result).toContain('29')
    expect(result).toContain('fév.')
    expect(result).toContain('2024')
  })
})

describe('formatMatch', () => {
  // Arrange — two player names
  // Act — call formatMatch()
  // Assert — result is "{player1} vs {player2}"

  it('should format player names Djokovic and Alcaraz to Djokovic vs Alcaraz', () => {
    const result = formatMatch('Djokovic', 'Alcaraz')
    expect(result).toBe('Djokovic vs Alcaraz')
  })

  it('should handle single letter names correctly', () => {
    const result = formatMatch('N', 'A')
    expect(result).toBe('N vs A')
  })
})
