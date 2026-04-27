import { formatMetricValue, getDeltaColor, getMetricColor } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// formatMetricValue
// ─────────────────────────────────────────────────────────────────────────────

describe('formatMetricValue', () => {
  describe('null / undefined — always return em dash', () => {
    it('should return em dash when value is null', () => {
      const result = formatMetricValue(null, 'rank_p1')
      expect(result).toBe('—')
    })

    it('should return em dash when value is undefined', () => {
      const result = formatMetricValue(undefined, 'p_serve_p1')
      expect(result).toBe('—')
    })
  })

  describe('delta_rank_6m — integer signed with +/- prefix, no arrow', () => {
    it('should return positive integer with + sign', () => {
      const result = formatMetricValue(5, 'delta_rank_6m_p1')
      expect(result).toBe('+5')
    })

    it('should return negative integer with - sign', () => {
      const result = formatMetricValue(-22, 'delta_rank_6m_p1')
      expect(result).toBe('-22')
    })

    it('should return +0 when value is zero', () => {
      const result = formatMetricValue(0, 'delta_rank_6m_p2')
      expect(result).toBe('+0')
    })
  })

  describe('percentage keys — multiply by 100, 1 decimal, % suffix', () => {
    it('should format p_serve as percentage with 1 decimal', () => {
      const result = formatMetricValue(0.64, 'p_serve_p1')
      expect(result).toBe('64.0%')
    })

    it('should format p_return as percentage with 1 decimal', () => {
      const result = formatMetricValue(0.427, 'p_return_p2')
      expect(result).toBe('42.7%')
    })

    it('should format win_rate_td as percentage with 1 decimal', () => {
      const result = formatMetricValue(0.52, 'win_rate_td_p1')
      expect(result).toBe('52.0%')
    })

    it('should format win_rate_surf_td as percentage with 1 decimal', () => {
      const result = formatMetricValue(0.352, 'win_rate_surf_td_p2')
      expect(result).toBe('35.2%')
    })

    it('should format momentum_td as percentage with 1 decimal', () => {
      const result = formatMetricValue(0.031, 'momentum_td_p1')
      expect(result).toBe('3.1%')
    })
  })

  describe('integer keys — round to integer, no decimals', () => {
    it('should return rank as integer without decimals', () => {
      const result = formatMetricValue(47.8, 'rank_p1')
      expect(result).toBe('47')
    })

    it('should return glicko_rating as integer', () => {
      const result = formatMetricValue(1567.3, 'glicko_rating_p1')
      expect(result).toBe('1567')
    })

    it('should return glicko_rd as integer', () => {
      const result = formatMetricValue(118.9, 'glicko_rd_p1')
      expect(result).toBe('119')
    })

    it('should return jours_repos as integer', () => {
      const result = formatMetricValue(7.6, 'jours_repos_p1')
      expect(result).toBe('8')
    })

    it('should return fatigue_72h as integer', () => {
      const result = formatMetricValue(75.3, 'fatigue_72h_p1')
      expect(result).toBe('75')
    })
  })

  describe('fallback — arrow prefix with 3 decimals', () => {
    it('should prefix positive with ↑ and format 3 decimals', () => {
      const result = formatMetricValue(0.192, 'tsd_p1')
      expect(result).toBe('↑0.192')
    })

    it('should prefix negative with ↓ and format 3 decimals', () => {
      const result = formatMetricValue(-0.051, 'bppi_p2')
      expect(result).toBe('↓0.051')
    })

    it('should prefix zero with ↑', () => {
      const result = formatMetricValue(0, 'tsd_p1')
      expect(result).toBe('↑0.000')
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// getDeltaColor
// ─────────────────────────────────────────────────────────────────────────────

describe('getDeltaColor', () => {
  it('should return neutral when value is null', () => {
    const result = getDeltaColor(null)
    expect(result).toBe('text-[var(--text-1)]')
  })

  it('should return neutral when value is zero', () => {
    const result = getDeltaColor(0)
    expect(result).toBe('text-[var(--text-1)]')
  })

  it('should return green when value is negative (progression)', () => {
    const result = getDeltaColor(-22)
    expect(result).toBe('text-[var(--green)]')
  })

  it('should return red when value is positive (recul)', () => {
    const result = getDeltaColor(5)
    expect(result).toBe('text-[var(--red)]')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// getMetricColor
// ─────────────────────────────────────────────────────────────────────────────

describe('getMetricColor', () => {
  describe('null handling', () => {
    it('should return neutral when valueA is null', () => {
      const result = getMetricColor(null, 10, 'higher')
      expect(result).toEqual(['text-[var(--text-1)]', 'text-[var(--text-1)]'])
    })

    it('should return neutral when valueB is null', () => {
      const result = getMetricColor(10, null, 'higher')
      expect(result).toEqual(['text-[var(--text-1)]', 'text-[var(--text-1)]'])
    })
  })

  describe('neutral mode — always neutral regardless of values', () => {
    it('should return neutral when values are equal', () => {
      const result = getMetricColor(10, 10, 'neutral')
      expect(result).toEqual(['text-[var(--text-1)]', 'text-[var(--text-1)]'])
    })

    it('should return neutral when values differ', () => {
      const result = getMetricColor(5, 15, 'neutral')
      expect(result).toEqual(['text-[var(--text-1)]', 'text-[var(--text-1)]'])
    })
  })

  describe('tolerance — no color when values are within tolerance', () => {
    it('should return neutral when difference is below tolerance', () => {
      const result = getMetricColor(10.0005, 10.0004, 'higher', 0.001)
      expect(result).toEqual(['text-[var(--text-1)]', 'text-[var(--text-1)]'])
    })
  })

  describe('higher mode — greater value = green, lower = red', () => {
    it('should return green for player A when valueA > valueB', () => {
      const result = getMetricColor(65, 55, 'higher')
      expect(result).toEqual(['text-[var(--green)]', 'text-[var(--red)]'])
    })

    it('should return red for player A when valueA < valueB', () => {
      const result = getMetricColor(45, 55, 'higher')
      expect(result).toEqual(['text-[var(--red)]', 'text-[var(--green)]'])
    })
  })

  describe('lower mode — smaller value = green, greater = red', () => {
    it('should return green for player A when valueA < valueB', () => {
      const result = getMetricColor(47, 52, 'lower')
      expect(result).toEqual(['text-[var(--green)]', 'text-[var(--red)]'])
    })

    it('should return red for player A when valueA > valueB', () => {
      const result = getMetricColor(60, 52, 'lower')
      expect(result).toEqual(['text-[var(--red)]', 'text-[var(--green)]'])
    })
  })

  describe('delta mode — more negative = better = green', () => {
    it('should return green for more negative value (improvement)', () => {
      const result = getMetricColor(-22, 5, 'delta')
      expect(result).toEqual(['text-[var(--green)]', 'text-[var(--red)]'])
    })

    it('should return green for player B when player B is more negative', () => {
      const result = getMetricColor(10, -15, 'delta')
      expect(result).toEqual(['text-[var(--red)]', 'text-[var(--green)]'])
    })
  })
})
