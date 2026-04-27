/**
 * Unit tests for formatMetric — pure formatting functions for tennis match metrics.
 * Extracted from src/components/dashboard/MatchRow.tsx
 * Pattern: AAA — Arrange / Act / Assert visible in every test.
 */

import {
  formatMetric,
  formatRank,
  formatDeltaRank,
  formatPercentage,
  formatGlicko,
  formatDifferential,
  formatIntegerWithUnit,
  formatMomentum,
  formatForm,
} from '@/lib/dashboard/formatMetric'

describe('formatMetric', () => {
  describe('null and undefined values', () => {
    it('should return em dash for null', () => {
      // Arrange — null input
      // Act
      const result = formatMetric(null, 'rank_p1')
      // Assert
      expect(result).toBe('—')
    })

    it('should return em dash for undefined', () => {
      // Arrange — undefined input
      // Act
      const result = formatMetric(undefined, 'rank_p1')
      // Assert
      expect(result).toBe('—')
    })

    it('should return em dash for NaN', () => {
      // Arrange
      // Act
      const result = formatMetric(NaN, 'rank_p1')
      // Assert
      expect(result).toBe('—')
    })
  })

  describe('Rank ATP — integer, no decimal', () => {
    it('should return integer string for rank_p1', () => {
      // Arrange — Rank ATP value
      const value = 47
      // Act
      const result = formatMetric(value, 'rank_p1')
      // Assert
      expect(result).toBe('47')
    })

    it('should return integer string for rank_p2', () => {
      // Arrange
      const value = 12
      // Act
      const result = formatMetric(value, 'rank_p2')
      // Assert
      expect(result).toBe('12')
    })

    it('should not add decimal places for rank', () => {
      // Arrange
      const value = 1
      // Act
      const result = formatMetric(value, 'rank_p1')
      // Assert
      expect(result).not.toContain('.')
    })
  })

  describe('Delta Rank 6M — signed integer', () => {
    it('should return negative signed integer for delta_rank_6m_p1', () => {
      // Arrange — negative delta (progression in ranking)
      const value = -22
      // Act
      const result = formatMetric(value, 'delta_rank_6m_p1')
      // Assert
      expect(result).toBe('-22')
    })

    it('should return positive signed integer with plus for delta_rank_6m_p2', () => {
      // Arrange — positive delta (regression)
      const value = 5
      // Act
      const result = formatMetric(value, 'delta_rank_6m_p2')
      // Assert
      expect(result).toBe('+5')
    })

    it('should return zero as signed integer', () => {
      // Arrange
      const value = 0
      // Act
      const result = formatMetric(value, 'delta_rank_6m_p1')
      // Assert
      expect(result).toBe('0')
    })
  })

  describe('P-Serve and P-Return — percentage with 1 decimal', () => {
    it('should multiply by 100 and append % with 1 decimal for p_serve_p1', () => {
      // Arrange — raw decimal 0.64
      const value = 0.64
      // Act
      const result = formatMetric(value, 'p_serve_p1')
      // Assert
      expect(result).toBe('64.0%')
    })

    it('should multiply by 100 for p_return_p1', () => {
      // Arrange
      const value = 0.312
      // Act
      const result = formatMetric(value, 'p_return_p1')
      // Assert
      expect(result).toBe('31.2%')
    })

    it('should round to 1 decimal for p_serve_p2', () => {
      // Arrange — 0.645 rounded to 64.5%
      const value = 0.645
      // Act
      const result = formatMetric(value, 'p_serve_p2')
      // Assert
      expect(result).toBe('64.5%')
    })
  })

  describe('Glicko Rating — integer + RD below', () => {
    it('should return integer rating for glicko_rating_p1', () => {
      // Arrange
      const value = 1567
      // Act
      const result = formatMetric(value, 'glicko_rating_p1')
      // Assert
      expect(result).toBe('1567')
    })

    it('should not contain decimal for glicko rating', () => {
      // Arrange — rating with decimal
      const value = 1567.89
      // Act
      const result = formatMetric(value, 'glicko_rating_p1')
      // Assert
      expect(result).toBe('1567')
      expect(result).not.toContain('.')
    })
  })

  describe('TSD and BPPI — 2 decimals with sign', () => {
    it('should return 2 decimal places with sign for tsd_p1', () => {
      // Arrange — positive differential
      const value = 0.19
      // Act
      const result = formatMetric(value, 'tsd_p1')
      // Assert
      expect(result).toBe('+0.19')
    })

    it('should return 2 decimal places with sign for bppi_p1', () => {
      // Arrange — negative differential
      const value = -0.05
      // Act
      const result = formatMetric(value, 'bppi_p1')
      // Assert
      expect(result).toBe('-0.05')
    })

    it('should show exactly 2 decimal places for tsd_p2', () => {
      // Arrange
      const value = 0.1
      // Act
      const result = formatMetric(value, 'tsd_p2')
      // Assert
      expect(result).toBe('+0.10')
    })
  })

  describe('MAP — integer percentage', () => {
    it('should multiply by 100 and show integer for map_p1', () => {
      // Arrange — raw 0.35
      const value = 0.35
      // Act
      const result = formatMetric(value, 'map_p1')
      // Assert
      expect(result).toBe('35%')
    })

    it('should not show decimal for map_p2', () => {
      // Arrange — 0.3519 → 35%
      const value = 0.3519
      // Act
      const result = formatMetric(value, 'map_p2')
      // Assert
      expect(result).toBe('35%')
    })
  })

  describe('Win Rate TD and Surface TD — integer percentage', () => {
    it('should multiply by 100 and show integer for win_rate_td_p1', () => {
      // Arrange
      const value = 0.52
      // Act
      const result = formatMetric(value, 'win_rate_td_p1')
      // Assert
      expect(result).toBe('52%')
    })

    it('should multiply by 100 for win_rate_surf_td_p1', () => {
      // Arrange
      const value = 0.48
      // Act
      const result = formatMetric(value, 'win_rate_surf_td_p1')
      // Assert
      expect(result).toBe('48%')
    })
  })

  describe('Momentum TD — 2 decimals with arrow prefix', () => {
    it('should prefix positive value with arrow up for momentum_td_p1', () => {
      // Arrange — positive momentum
      const value = 0.03
      // Act
      const result = formatMetric(value, 'momentum_td_p1')
      // Assert
      expect(result).toBe('↑ +0.03')
    })

    it('should prefix negative value with arrow down for momentum_td_p2', () => {
      // Arrange — negative momentum
      const value = -0.07
      // Act
      const result = formatMetric(value, 'momentum_td_p2')
      // Assert
      expect(result).toBe('↓ -0.07')
    })

    it('should show exactly 2 decimal places for momentum', () => {
      // Arrange
      const value = 0.001
      // Act
      const result = formatMetric(value, 'momentum_td_p1')
      // Assert
      expect(result).toBe('↑ +0.00')
    })
  })

  describe('Breaks Won/Lost TD — 1 decimal', () => {
    it('should show 1 decimal for breaks_won_td_p1', () => {
      // Arrange
      const value = 1.9
      // Act
      const result = formatMetric(value, 'breaks_won_td_p1')
      // Assert
      expect(result).toBe('1.9')
    })

    it('should show 1 decimal for breaks_lost_td_p1', () => {
      // Arrange
      const value = 2.3
      // Act
      const result = formatMetric(value, 'breaks_lost_td_p1')
      // Assert
      expect(result).toBe('2.3')
    })

    it('should pad with zero when needed for breaks_won_td_p2', () => {
      // Arrange
      const value = 2.0
      // Act
      const result = formatMetric(value, 'breaks_won_td_p2')
      // Assert
      expect(result).toBe('2.0')
    })
  })

  describe('Fatigue 72H — integer with "min" suffix', () => {
    it('should return integer with "min" suffix for fatigue_72h_p1', () => {
      // Arrange
      const value = 75
      // Act
      const result = formatMetric(value, 'fatigue_72h_p1')
      // Assert
      expect(result).toBe('75 min')
    })

    it('should return 0 min for zero fatigue', () => {
      // Arrange — zero fatigue still shows "0 min", never hidden
      const value = 0
      // Act
      const result = formatMetric(value, 'fatigue_72h_p1')
      // Assert
      expect(result).toBe('0 min')
    })
  })

  describe('Jours de repos — integer with "jour(s)" suffix', () => {
    it('should return integer with "jour" for singular', () => {
      // Arrange — 1 day
      const value = 1
      // Act
      const result = formatMetric(value, 'jours_repos_p1')
      // Assert
      expect(result).toBe('1 jour')
    })

    it('should return integer with "jours" for plural', () => {
      // Arrange — multiple days
      const value = 28
      // Act
      const result = formatMetric(value, 'jours_repos_p2')
      // Assert
      expect(result).toBe('28 jours')
    })
  })

  describe('Forme — spaced characters', () => {
    it('should return spaced string for form_p1', () => {
      // Arrange — "VDDVV"
      const value = 'VDDVV'
      // Act
      const result = formatMetric(value, 'form_p1')
      // Assert
      expect(result).toBe('V D D V V')
    })

    it('should return spaced string for form_p2', () => {
      // Arrange — mixed form
      const value = 'DVNV'
      // Act
      const result = formatMetric(value, 'form_p2')
      // Assert
      expect(result).toBe('D V N V')
    })
  })
})

describe('formatRank', () => {
  it('should return integer string without decimals', () => {
    // Arrange
    // Act
    expect(formatRank(47)).toBe('47')
    expect(formatRank(1)).toBe('1')
    expect(formatRank(999)).toBe('999')
  })
})

describe('formatDeltaRank', () => {
  it('should return negative number as-is', () => {
    // Arrange
    // Act
    const result = formatDeltaRank(-22)
    // Assert
    expect(result).toBe('-22')
  })

  it('should return positive number with plus sign', () => {
    // Arrange
    // Act
    const result = formatDeltaRank(5)
    // Assert
    expect(result).toBe('+5')
  })

  it('should return zero without sign', () => {
    // Arrange
    // Act
    const result = formatDeltaRank(0)
    // Assert
    expect(result).toBe('0')
  })
})

describe('formatPercentage', () => {
  it('should multiply by 100 and format with 1 decimal', () => {
    // Arrange
    // Act
    expect(formatPercentage(0.64)).toBe('64.0%')
    expect(formatPercentage(0.5)).toBe('50.0%')
  })

  it('should multiply and round to 1 decimal', () => {
    // Arrange
    // Act
    expect(formatPercentage(0.645)).toBe('64.5%')
  })
})

describe('formatIntegerWithUnit', () => {
  it('should append unit suffix', () => {
    // Arrange
    // Act
    expect(formatIntegerWithUnit(75, 'min')).toBe('75 min')
    expect(formatIntegerWithUnit(28, 'jour')).toBe('28 jour')
    expect(formatIntegerWithUnit(1, 'min')).toBe('1 min')
  })
})

describe('formatMomentum', () => {
  it('should prefix positive with arrow up and plus sign', () => {
    // Arrange
    // Act
    expect(formatMomentum(0.03)).toBe('↑ +0.03')
    expect(formatMomentum(1.5)).toBe('↑ +1.50')
  })

  it('should prefix negative with arrow down', () => {
    // Arrange
    // Act
    expect(formatMomentum(-0.07)).toBe('↓ -0.07')
    expect(formatMomentum(-1.5)).toBe('↓ -1.50')
  })
})

describe('formatForm', () => {
  it('should space each character', () => {
    // Arrange
    // Act
    expect(formatForm('VDV')).toBe('V D V')
    expect(formatForm('DDVNN')).toBe('D D V N N')
  })
})
