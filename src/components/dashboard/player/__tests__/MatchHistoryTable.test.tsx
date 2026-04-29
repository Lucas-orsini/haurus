import { formatDateTest } from '../MatchHistoryTable'

const formatDate = formatDateTest

describe('MatchHistoryTable', () => {
  describe('formatDate', () => {
    const invalidInputs = [null, undefined, '', 'invalid', 'not-a-date', '2024-13-45', '00-00-0000']

    it('should return "—" when input is not a valid date string', () => {
      for (const input of invalidInputs) {
        const result = formatDate(input as string)
        expect(result).toBe('—')
      }
    })

    it('should format a valid YYYY-MM-DD string to DD/MM/YYYY', () => {
      const input = '2024-03-15'
      const result = formatDate(input)
      expect(result).toBe('15/03/2024')
    })

    it('should format dates at month boundaries correctly', () => {
      expect(formatDate('2024-01-01')).toBe('01/01/2024')
      expect(formatDate('2024-12-31')).toBe('31/12/2024')
    })
  })
})
