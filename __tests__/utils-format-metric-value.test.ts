import { formatMetricValue } from '@/lib/utils'

describe('formatMetricValue', () => {
  describe('null / undefined input', () => {
    it('should return em dash when value is null', () => {
      const result = formatMetricValue(null, 'rank_p1')
      expect(result).toBe('—')
    })

    it('should return em dash when value is undefined', () => {
      const result = formatMetricValue(undefined, 'p_serve_p1')
      expect(result).toBe('—')
    })
  })

  describe('non-numeric input', () => {
    it('should return stringified value for non-number', () => {
      const result = formatMetricValue('VDVDV', 'form_p1')
      expect(result).toBe('VDVDV')
    })
  })

  describe('rank_p1 / rank_p2', () => {
    it('should return integer rounded value', () => {
      expect(formatMetricValue(1.7, 'rank_p1')).toBe('2')
      expect(formatMetricValue(42.3, 'rank_p2')).toBe('42')
    })
  })

  describe('delta_rank_6m_p1 / delta_rank_6m_p2', () => {
    it('should return integer with plus sign when value >= 0', () => {
      expect(formatMetricValue(5, 'delta_rank_6m_p1')).toBe('+5')
      expect(formatMetricValue(0, 'delta_rank_6m_p2')).toBe('+0')
    })

    it('should return integer without plus sign when value < 0', () => {
      expect(formatMetricValue(-3, 'delta_rank_6m_p1')).toBe('-3')
    })
  })

  describe('p_serve_p1 / p_serve_p2, p_return_p1 / p_return_p2', () => {
    it('should format as percentage with 1 decimal', () => {
      expect(formatMetricValue(0.653, 'p_serve_p1')).toBe('65.3%')
      expect(formatMetricValue(0.712, 'p_return_p2')).toBe('71.2%')
    })
  })

  describe('glicko_rating_p1 / glicko_rating_p2', () => {
    it('should return integer rounded value', () => {
      expect(formatMetricValue(1500.7, 'glicko_rating_p1')).toBe('1501')
      expect(formatMetricValue(1723.9, 'glicko_rating_p2')).toBe('1724')
    })
  })

  describe('tsd_p1 / tsd_p2, bppi_p1 / bppi_p2', () => {
    it('should return 2 decimals with plus sign when value >= 0', () => {
      expect(formatMetricValue(0.05, 'tsd_p1')).toBe('+0.05')
    })

    it('should return absolute 2 decimals without plus sign when value < 0', () => {
      expect(formatMetricValue(-0.12, 'tsd_p2')).toBe('-0.12')
    })
  })

  describe('map_p1 / map_p2, win_rate_td_p1 / win_rate_td_p2, win_rate_surf_td_p1 / win_rate_surf_td_p2', () => {
    it('should format as integer percentage', () => {
      expect(formatMetricValue(0.65, 'map_p1')).toBe('65%')
      expect(formatMetricValue(0.58, 'win_rate_td_p2')).toBe('58%')
      expect(formatMetricValue(0.71, 'win_rate_surf_td_p1')).toBe('71%')
    })
  })

  describe('momentum_td_p1 / momentum_td_p2', () => {
    it('should return arrow and signed 2-decimal value', () => {
      expect(formatMetricValue(0.15, 'momentum_td_p1')).toBe('↑ +0.15')
      expect(formatMetricValue(-0.08, 'momentum_td_p2')).toBe('↓ -0.08')
    })
  })

  describe('breaks_won_td_p1 / breaks_won_td_p2, breaks_lost_td_p1 / breaks_lost_td_p2', () => {
    it('should return absolute 1 decimal without sign', () => {
      expect(formatMetricValue(3.7, 'breaks_won_td_p1')).toBe('3.7')
      expect(formatMetricValue(-2.3, 'breaks_lost_td_p2')).toBe('2.3')
    })
  })

  describe('fatigue_72h_p1 / fatigue_72h_p2', () => {
    it('should return rounded integer with min suffix', () => {
      expect(formatMetricValue(48.6, 'fatigue_72h_p1')).toBe('49 min')
      expect(formatMetricValue(24.2, 'fatigue_72h_p2')).toBe('24 min')
    })
  })

  describe('jours_repos_p1 / jours_repos_p2', () => {
    it('should return singular jour for 1', () => {
      expect(formatMetricValue(1, 'jours_repos_p1')).toBe('1 jour')
    })

    it('should return plural jours for values other than 1', () => {
      expect(formatMetricValue(0, 'jours_repos_p1')).toBe('0 jours')
      expect(formatMetricValue(2, 'jours_repos_p2')).toBe('2 jours')
    })
  })

  describe('form_p1 / form_p2', () => {
    it('should return the raw string value', () => {
      expect(formatMetricValue('VDVDV', 'form_p1')).toBe('VDVDV')
    })
  })

  describe('fallback for unknown metric key', () => {
    it('should return rounded integer for unknown key', () => {
      expect(formatMetricValue(42.7, 'unknown_key')).toBe('43')
    })
  })
})
