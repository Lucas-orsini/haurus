import { getDeltaColor, getMetricColor, formatForme, formatMetricValue } from '@/lib/utils'

// ── getDeltaColor ─────────────────────────────────────────────────────────────

describe('getDeltaColor', () => {
  it('should return neutral class when value is null', () => {
    // Arrange
    const value: number | null = null
    // Act
    const result = getDeltaColor(value)
    // Assert
    expect(result).toBe('text-[var(--text-1)]')
  })

  it('should return neutral class when value is zero', () => {
    // Arrange
    const value = 0
    // Act
    const result = getDeltaColor(value)
    // Assert
    expect(result).toBe('text-[var(--text-1)]')
  })

  it('should return green class when value is negative (improvement)', () => {
    // Arrange
    const value = -15
    // Act
    const result = getDeltaColor(value)
    // Assert
    expect(result).toBe('text-[var(--green)]')
  })

  it('should return red class when value is positive (decline)', () => {
    // Arrange
    const value = 8
    // Act
    const result = getDeltaColor(value)
    // Assert
    expect(result).toBe('text-[var(--red)]')
  })
})

// ── getMetricColor ────────────────────────────────────────────────────────────

describe('getMetricColor', () => {
  it('should return neutral classes when both values are null', () => {
    // Arrange
    const valueA: number | null = null
    const valueB: number | null = null
    // Act
    const result = getMetricColor(valueA, valueB, 'higher')
    // Assert
    expect(result).toEqual(['text-[var(--text-1)]', 'text-[var(--text-1)]'])
  })

  it('should return neutral classes when mode is neutral', () => {
    // Arrange
    const valueA = 50
    const valueB = 80
    // Act
    const result = getMetricColor(valueA, valueB, 'neutral')
    // Assert
    expect(result).toEqual(['text-[var(--text-1)]', 'text-[var(--text-1)]'])
  })

  it('should return green for higher and red for lower in higher mode', () => {
    // Arrange
    const valueA = 80
    const valueB = 60
    // Act
    const result = getMetricColor(valueA, valueB, 'higher')
    // Assert
    expect(result).toEqual(['text-[var(--green)]', 'text-[var(--red)]'])
  })

  it('should return red for higher and green for lower in lower mode', () => {
    // Arrange
    const valueA = 80
    const valueB = 60
    // Act
    const result = getMetricColor(valueA, valueB, 'lower')
    // Assert
    expect(result).toEqual(['text-[var(--red)]', 'text-[var(--green)]'])
  })

  it('should return neutral when difference is within tolerance', () => {
    // Arrange
    const valueA = 50.0005
    const valueB = 50.0004
    // Act
    const result = getMetricColor(valueA, valueB, 'higher', 0.001)
    // Assert
    expect(result).toEqual(['text-[var(--text-1)]', 'text-[var(--text-1)]'])
  })
})

// ── formatForme ────────────────────────────────────────────────────────────────

describe('formatForme', () => {
  it('should return null when value is null', () => {
    // Arrange
    const value: string | null = null
    // Act
    const result = formatForme(value)
    // Assert
    expect(result).toBeNull()
  })

  it('should return null when value is undefined', () => {
    // Arrange
    const value: string | undefined = undefined
    // Act
    const result = formatForme(value)
    // Assert
    expect(result).toBeNull()
  })

  it('should return null when value is empty string', () => {
    // Arrange
    const value = ''
    // Act
    const result = formatForme(value)
    // Assert
    expect(result).toBeNull()
  })

  it('should return all green segments for all wins', () => {
    // Arrange
    const value = 'VVVV'
    // Act
    const result = formatForme(value)
    // Assert
    expect(result).toEqual([
      { char: 'V', color: 'green' },
      { char: 'V', color: 'green' },
      { char: 'V', color: 'green' },
      { char: 'V', color: 'green' },
    ])
  })

  it('should return all red segments for all defeats', () => {
    // Arrange
    const value = 'DDDD'
    // Act
    const result = formatForme(value)
    // Assert
    expect(result).toEqual([
      { char: 'D', color: 'red' },
      { char: 'D', color: 'red' },
      { char: 'D', color: 'red' },
      { char: 'D', color: 'red' },
    ])
  })

  it('should return neutral for non V/D/N characters', () => {
    // Arrange
    const value = 'XYZ'
    // Act
    const result = formatForme(value)
    // Assert
    expect(result).toEqual([
      { char: 'X', color: 'neutral' },
      { char: 'Y', color: 'neutral' },
      { char: 'Z', color: 'neutral' },
    ])
  })

  it('should filter out spaces from the result', () => {
    // Arrange
    const value = 'V D V'
    // Act
    const result = formatForme(value)
    // Assert
    expect(result).toEqual([
      { char: 'V', color: 'green' },
      { char: 'D', color: 'red' },
      { char: 'V', color: 'green' },
    ])
  })
})

// ── formatMetricValue ──────────────────────────────────────────────────────────

describe('formatMetricValue', () => {
  it('should return em dash for null value', () => {
    // Arrange
    const value: number | null = null
    // Act
    const result = formatMetricValue(value, 'rank_p1')
    // Assert
    expect(result).toBe('—')
  })

  it('should return em dash for undefined value', () => {
    // Arrange
    const value: undefined = undefined
    // Act
    const result = formatMetricValue(value, 'rank_p1')
    // Assert
    expect(result).toBe('—')
  })

  it('should return rounded integer for rank keys', () => {
    // Arrange
    const value = 42.7
    // Act
    const result = formatMetricValue(value, 'rank_p1')
    // Assert
    expect(result).toBe('43')
  })

  it('should return signed integer for delta rank keys', () => {
    // Arrange
    const value = 5
    // Act
    const result = formatMetricValue(value, 'delta_rank_6m_p1')
    // Assert
    expect(result).toBe('+5')
  })

  it('should return negative signed integer for delta rank keys', () => {
    // Arrange
    const value = -12
    // Act
    const result = formatMetricValue(value, 'delta_rank_6m_p1')
    // Assert
    expect(result).toBe('-12')
  })

  it('should return percentage with 1 decimal for P-Serve keys', () => {
    // Arrange
    const value = 0.7234
    // Act
    const result = formatMetricValue(value, 'p_serve_p1')
    // Assert
    expect(result).toBe('72.3%')
  })

  it('should return rounded percentage for MAP keys', () => {
    // Arrange
    const value = 0.456
    // Act
    const result = formatMetricValue(value, 'map_p1')
    // Assert
    expect(result).toBe('46%')
  })

  it('should return signed 2 decimals with plus sign for TSD keys', () => {
    // Arrange
    const value = 0.1234
    // Act
    const result = formatMetricValue(value, 'tsd_p1')
    // Assert
    expect(result).toBe('+0.12')
  })

  it('should return negative signed 2 decimals for TSD keys', () => {
    // Arrange
    const value = -0.0567
    // Act
    const result = formatMetricValue(value, 'tsd_p1')
    // Assert
    expect(result).toBe('-0.06')
  })

  it('should return momentum with arrow and signed 2 decimals', () => {
    // Arrange
    const value = 1.234
    // Act
    const result = formatMetricValue(value, 'momentum_td_p1')
    // Assert
    expect(result).toBe('↑ +1.23')
  })

  it('should return momentum with down arrow for negative values', () => {
    // Arrange
    const value = -0.876
    // Act
    const result = formatMetricValue(value, 'momentum_td_p2')
    // Assert
    expect(result).toBe('↓ -0.88')
  })

  it('should return fatigue with min suffix', () => {
    // Arrange
    const value = 48.7
    // Act
    const result = formatMetricValue(value, 'fatigue_72h_p1')
    // Assert
    expect(result).toBe('49 min')
  })

  it('should return single day with singular suffix', () => {
    // Arrange
    const value = 1
    // Act
    const result = formatMetricValue(value, 'jours_repos_p1')
    // Assert
    expect(result).toBe('1 jour')
  })

  it('should return plural days with plural suffix', () => {
    // Arrange
    const value = 3
    // Act
    const result = formatMetricValue(value, 'jours_repos_p2')
    // Assert
    expect(result).toBe('3 jours')
  })

  it('should return absolute value for breaks keys without sign', () => {
    // Arrange
    const value = -2.55
    // Act
    const result = formatMetricValue(value, 'breaks_won_td_p1')
    // Assert
    expect(result).toBe('2.6')
  })

  it('should return rounded integer for Glicko Rating', () => {
    // Arrange
    const value = 1654.7
    // Act
    const result = formatMetricValue(value, 'glicko_rating_p1')
    // Assert
    expect(result).toBe('1655')
  })
})
