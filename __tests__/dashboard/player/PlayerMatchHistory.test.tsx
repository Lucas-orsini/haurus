import { formatDate } from '@/components/dashboard/player/PlayerMatchHistory'

describe('PlayerMatchHistory', () => {
  describe('pure helpers', () => {
    describe('formatDate', () => {
      it('should format a valid date string to French locale', () => {
        const input = '2024-03-15'
        const result = formatDate(input)
        expect(result).toMatch(/15/)
        expect(result).toMatch(/mars/i)
        expect(result).toMatch(/2024/)
      })

      it('should return the raw string when date is invalid', () => {
        const input = 'not-a-date'
        const result = formatDate(input)
        expect(result).toBe('not-a-date')
      })

      it('should handle ISO date format with time', () => {
        const input = '2024-03-15T10:30:00Z'
        const result = formatDate(input)
        expect(result).toMatch(/mars/i)
        expect(result).toMatch(/2024/)
      })

      it('should handle dates in different months', () => {
        expect(formatDate('2024-01-01')).toMatch(/janvier/i)
        expect(formatDate('2024-06-15')).toMatch(/juin/i)
        expect(formatDate('2024-12-25')).toMatch(/décembre/i)
      })
    })
  })
})
