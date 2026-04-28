import { formatForme } from '@/lib/utils'

describe('formatForme', () => {
  describe('null / undefined / empty input', () => {
    it('should return null when value is null', () => {
      const result = formatForme(null)
      expect(result).toBeNull()
    })

    it('should return null when value is undefined', () => {
      const result = formatForme(undefined)
      expect(result).toBeNull()
    })

    it('should return null when value is empty string', () => {
      const result = formatForme('')
      expect(result).toBeNull()
    })
  })

  describe('valid forme string', () => {
    it('should map V to green segments', () => {
      const result = formatForme('V')
      expect(result).toEqual([{ char: 'V', color: 'green' as const }])
    })

    it('should map D to red segments', () => {
      const result = formatForme('D')
      expect(result).toEqual([{ char: 'D', color: 'red' as const }])
    })

    it('should map N and unknown characters to neutral', () => {
      const result = formatForme('N')
      expect(result).toEqual([{ char: 'N', color: 'neutral' as const }])
    })

    it('should filter out spaces and preserve non-space characters', () => {
      const result = formatForme('V D V')
      expect(result).toEqual([
        { char: 'V', color: 'green' as const },
        { char: 'D', color: 'red' as const },
        { char: 'V', color: 'green' as const },
      ])
    })

    it('should handle mixed valid string', () => {
      const result = formatForme('VDVDV')
      expect(result).toEqual([
        { char: 'V', color: 'green' as const },
        { char: 'D', color: 'red' as const },
        { char: 'V', color: 'green' as const },
        { char: 'D', color: 'red' as const },
        { char: 'V', color: 'green' as const },
      ])
    })

    it('should handle all neutral characters', () => {
      const result = formatForme('NNN')
      expect(result).toEqual([
        { char: 'N', color: 'neutral' as const },
        { char: 'N', color: 'neutral' as const },
        { char: 'N', color: 'neutral' as const },
      ])
    })
  })
})
