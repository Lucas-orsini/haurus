import { formatMetricValue } from '@/lib/utils'

describe('formatMetricValue', () => {
  // Branche null/undefined
  describe('null and undefined values', () => {
    it('should return em dash when value is null', () => {
      // Arrange
      const value = null
      // Act
      const result = formatMetricValue(value, 'rank_p1')
      // Assert
      expect(result).toBe('—')
    })

    it('should return em dash when value is undefined', () => {
      // Arrange
      const value = undefined
      // Act
      const result = formatMetricValue(value, 'p_serve_p1')
      // Assert
      expect(result).toBe('—')
    })
  })

  // Branche type non numérique
  describe('non-numeric string values', () => {
    it('should return string representation when value is not a number', () => {
      // Arrange
      const value = 'VDVDV'
      // Act
      const result = formatMetricValue(value, 'form_p1')
      // Assert
      expect(result).toBe('VDVDV')
    })
  })

  // Branche Rank ATP (clé rank_p1 / rank_p2)
  describe('Rank ATP formatting', () => {
    it('should round rank to integer without decimals', () => {
      // Arrange
      const value = 15.7
      // Act
      const result = formatMetricValue(value, 'rank_p1')
      // Assert
      expect(result).toBe('16')
    })

    it('should return integer string for rank', () => {
      // Arrange
      const value = 3
      // Act
      const result = formatMetricValue(value, 'rank_p2')
      // Assert
      expect(result).toBe('3')
    })
  })

  // Branche Δ Rank 6M (clé delta_rank_6m_p1 / delta_rank_6m_p2)
  describe('Delta Rank 6M formatting', () => {
    it('should format positive delta with + prefix', () => {
      // Arrange
      const value = 5
      // Act
      const result = formatMetricValue(value, 'delta_rank_6m_p1')
      // Assert
      expect(result).toBe('+5')
    })

    it('should format negative delta without explicit minus (already in value)', () => {
      // Arrange
      const value = -3
      // Act
      const result = formatMetricValue(value, 'delta_rank_6m_p2')
      // Assert
      expect(result).toBe('-3')
    })

    it('should round delta to integer', () => {
      // Arrange
      const value = 2.7
      // Act
      const result = formatMetricValue(value, 'delta_rank_6m_p1')
      // Assert
      expect(result).toBe('+3')
    })
  })

  // Branche P-Serve et P-Return (clé dans PERCENT_1_DECIMAL_KEYS)
  describe('P-Serve and P-Return formatting', () => {
    it('should multiply by 100 and format with 1 decimal and percent sign', () => {
      // Arrange
      const value = 0.652
      // Act
      const result = formatMetricValue(value, 'p_serve_p1')
      // Assert
      expect(result).toBe('65.2%')
    })

    it('should format zero with 0.0%', () => {
      // Arrange
      const value = 0
      // Act
      const result = formatMetricValue(value, 'p_return_p2')
      // Assert
      expect(result).toBe('0.0%')
    })
  })

  // Branche Glicko Rating (clé glicko_rating_p1 / glicko_rating_p2)
  describe('Glicko Rating formatting', () => {
    it('should round glicko rating to integer', () => {
      // Arrange
      const value = 1825.6
      // Act
      const result = formatMetricValue(value, 'glicko_rating_p1')
      // Assert
      expect(result).toBe('1826')
    })
  })

  // Branche TSD et BPPI (clé dans DECIMAL_2_SIGNED_KEYS)
  describe('TSD and BPPI formatting', () => {
    it('should format positive value with + prefix and 2 decimals', () => {
      // Arrange
      const value = 0.123
      // Act
      const result = formatMetricValue(value, 'tsd_p1')
      // Assert
      expect(result).toBe('+0.12')
    })

    it('should format negative value with - sign and 2 decimals', () => {
      // Arrange
      const value = -0.05
      // Act
      const result = formatMetricValue(value, 'bppi_p2')
      // Assert
      expect(result).toBe('-0.05')
    })
  })

  // Branche MAP, Win Rate TD, Win Rate Surface TD (clé dans PERCENT_ROUNDED_KEYS)
  describe('MAP and Win Rate formatting', () => {
    it('should multiply by 100, round, and append percent sign for map', () => {
      // Arrange
      const value = 0.5833
      // Act
      const result = formatMetricValue(value, 'map_p1')
      // Assert
      expect(result).toBe('58%')
    })

    it('should format win_rate_td with integer percent', () => {
      // Arrange
      const value = 0.6
      // Act
      const result = formatMetricValue(value, 'win_rate_td_p2')
      // Assert
      expect(result).toBe('60%')
    })

    it('should format win_rate_surf_td with integer percent', () => {
      // Arrange
      const value = 0.75
      // Act
      const result = formatMetricValue(value, 'win_rate_surf_td_p1')
      // Assert
      expect(result).toBe('75%')
    })
  })

  // Branche Momentum TD (clé momentum_td_p1 / momentum_td_p2)
  describe('Momentum TD formatting', () => {
    it('should format positive momentum with arrow, + sign, and 2 decimals', () => {
      // Arrange
      const value = 0.42
      // Act
      const result = formatMetricValue(value, 'momentum_td_p1')
      // Assert
      expect(result).toBe('↑ +0.42')
    })

    it('should format negative momentum with arrow, - sign, and 2 decimals', () => {
      // Arrange
      const value = -0.15
      // Act
      const result = formatMetricValue(value, 'momentum_td_p2')
      // Assert
      expect(result).toBe('↓ -0.15')
    })
  })

  // Branche Breaks Won/Lost TD (clé dans DECIMAL_1_NO_SIGN_KEYS)
  describe('Breaks formatting', () => {
    it('should format breaks with 1 decimal and absolute value (positive)', () => {
      // Arrange
      const value = 2.5
      // Act
      const result = formatMetricValue(value, 'breaks_won_td_p1')
      // Assert
      expect(result).toBe('2.5')
    })

    it('should format breaks_lost with absolute value and 1 decimal', () => {
      // Arrange
      const value = -1.333
      // Act
      const result = formatMetricValue(value, 'breaks_lost_td_p2')
      // Assert
      expect(result).toBe('1.3')
    })
  })

  // Branche Fatigue 72H (clé fatigue_72h_p1 / fatigue_72h_p2)
  describe('Fatigue 72H formatting', () => {
    it('should format fatigue with rounded integer and min suffix', () => {
      // Arrange
      const value = 45.7
      // Act
      const result = formatMetricValue(value, 'fatigue_72h_p1')
      // Assert
      expect(result).toBe('46 min')
    })
  })

  // Branche Jours de repos (clé jours_repos_p1 / jours_repos_p2)
  describe('Jours de repos formatting', () => {
    it('should format singular day with jour suffix', () => {
      // Arrange
      const value = 1
      // Act
      const result = formatMetricValue(value, 'jours_repos_p1')
      // Assert
      expect(result).toBe('1 jour')
    })

    it('should format plural days with jours suffix', () => {
      // Arrange
      const value = 3
      // Act
      const result = formatMetricValue(value, 'jours_repos_p2')
      // Assert
      expect(result).toBe('3 jours')
    })

    it('should format zero as plural 0 jours', () => {
      // Arrange
      const value = 0
      // Act
      const result = formatMetricValue(value, 'jours_repos_p1')
      // Assert
      expect(result).toBe('0 jours')
    })
  })

  // Branche Glicko RD (clé glicko_rd_p1 / glicko_rd_p2)
  describe('Glicko RD formatting', () => {
    it('should round glicko RD to integer', () => {
      // Arrange
      const value = 52.8
      // Act
      const result = formatMetricValue(value, 'glicko_rd_p1')
      // Assert
      expect(result).toBe('53')
    })
  })

  // Fallback pour clé non reconnue
  describe('fallback for unknown metric key', () => {
    it('should fall back to Math.round for unknown metric key', () => {
      // Arrange
      const value = 123.6
      // Act
      const result = formatMetricValue(value, 'unknown_metric_p1')
      // Assert
      expect(result).toBe('124')
    })
  })
})
