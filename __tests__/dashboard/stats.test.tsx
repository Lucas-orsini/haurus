import { buildTodaysStats, extractTournaments } from '@/lib/dashboard/stats'

describe('buildTodaysStats', () => {
  it('should return card1 with correct match count', () => {
    // Arrange
    const matches = [
      { player1: 'A', player2: 'B', surface: 'Hard', tournoi: 'Wimbledon', win_rate_surf_td_p1: 0.65, win_rate_surf_td_p2: null, momentum_td_p1: 0.4, momentum_td_p2: null },
    ]
    const tournaments = [{ name: 'Wimbledon', surface: 'Hard' }]
    // Act
    const result = buildTodaysStats(matches, tournaments)
    // Assert
    expect(result.card1.count).toBe(1)
    expect(result.card1.tournaments).toEqual(tournaments)
  })

  it('should select player with highest win_rate_surf_td for card2', () => {
    // Arrange
    const matches = [
      { player1: 'Alcaraz', player2: 'Sinner', surface: 'Clay', win_rate_surf_td_p1: 0.70, win_rate_surf_td_p2: 0.55, momentum_td_p1: 0, momentum_td_p2: 0 },
    ]
    // Act
    const result = buildTodaysStats(matches, [])
    // Assert
    expect(result.card2?.player1).toBe('Alcaraz')
    expect(result.card2?.player2).toBe('Sinner')
    expect(result.card2?.winRate).toBeCloseTo(0.70)
  })

  it('should return card2 as null when all win rates are null', () => {
    const matches = [
      { player1: 'A', player2: 'B', surface: 'Hard', win_rate_surf_td_p1: null, win_rate_surf_td_p2: null, momentum_td_p1: 0, momentum_td_p2: 0 },
    ]
    const result = buildTodaysStats(matches, [])
    expect(result.card2).toBeNull()
  })

  it('should select player with highest absolute momentum for card3', () => {
    // Arrange
    const matches = [
      { player1: 'Alcaraz', player2: 'Sinner', surface: 'Hard', win_rate_surf_td_p1: null, win_rate_surf_td_p2: null, momentum_td_p1: -0.8, momentum_td_p2: 0.3 },
    ]
    // Act
    const result = buildTodaysStats(matches, [])
    // Assert
    expect(result.card3?.player1).toBe('Alcaraz')
    expect(result.card3?.momentum).toBe(-0.8)
  })

  it('should return card3 as null when all momentum values are null', () => {
    const matches = [
      { player1: 'A', player2: 'B', surface: 'Hard', win_rate_surf_td_p1: null, win_rate_surf_td_p2: null, momentum_td_p1: null, momentum_td_p2: null },
    ]
    const result = buildTodaysStats(matches, [])
    expect(result.card3).toBeNull()
  })
})

describe('extractTournaments', () => {
  it('should deduplicate matches and return unique tournament-surface pairs', () => {
    // Arrange
    const matches = [
      { tournoi: 'Wimbledon', surface: 'Grass' },
      { tournoi: 'Roland Garros', surface: 'Clay' },
      { tournoi: 'Wimbledon', surface: 'Grass' }, // duplicate
      { tournoi: 'Wimbledon', surface: 'Grass' }, // duplicate
    ] as any[]
    // Act
    const result = extractTournaments(matches)
    // Assert
    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Wimbledon')
    expect(result[1].name).toBe('Roland Garros')
  })

  it('should skip matches with null tournoi', () => {
    const matches = [
      { tournoi: null, surface: null },
      { tournoi: 'US Open', surface: 'Hard' },
    ] as any[]
    const result = extractTournaments(matches)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('US Open')
  })
})
