import { getSurfaceWinRate, buildTodaysStats, extractTournaments } from '@/lib/dashboard/stats'
import type { TodaysStats } from '@/lib/types/dashboard'
import type { PlayerStatsRow, MatchRow } from '@/lib/dashboard/stats'

// ── getSurfaceWinRate ─────────────────────────────────────────────────────────

describe('getSurfaceWinRate', () => {
  const stats: PlayerStatsRow = {
    player_name: 'Djokovic',
    win_rate_clay_td: 0.82,
    win_rate_hard_td: 0.91,
    win_rate_grass_td: 0.88,
    momentum_td: 0.5,
  }

  it('should return null when surface is null', () => {
    // Arrange
    const surface: string | null = null
    // Act
    const result = getSurfaceWinRate(stats, surface)
    // Assert
    expect(result).toBeNull()
  })

  it('should return null when surface is empty string', () => {
    // Arrange
    const surface = ''
    // Act
    const result = getSurfaceWinRate(stats, surface)
    // Assert
    expect(result).toBeNull()
  })

  it('should return clay win rate for Clay surface', () => {
    // Arrange
    const surface = 'Clay'
    // Act
    const result = getSurfaceWinRate(stats, surface)
    // Assert
    expect(result).toBe(0.82)
  })

  it('should return hard win rate for Hard surface (case insensitive)', () => {
    // Arrange
    const surface = 'HARD'
    // Act
    const result = getSurfaceWinRate(stats, surface)
    // Assert
    expect(result).toBe(0.91)
  })

  it('should return grass win rate for Grass surface', () => {
    // Arrange
    const surface = 'Grass'
    // Act
    const result = getSurfaceWinRate(stats, surface)
    // Assert
    expect(result).toBe(0.88)
  })

  it('should return null for unknown surface', () => {
    // Arrange
    const surface = 'Carpet'
    // Act
    const result = getSurfaceWinRate(stats, surface)
    // Assert
    expect(result).toBeNull()
  })

  it('should return null when the specific surface win rate is null in stats', () => {
    // Arrange
    const statsWithNull: PlayerStatsRow = {
      ...stats,
      win_rate_clay_td: null,
    }
    // Act
    const result = getSurfaceWinRate(statsWithNull, 'clay')
    // Assert
    expect(result).toBeNull()
  })
})

// ── extractTournaments ────────────────────────────────────────────────────────

describe('extractTournaments', () => {
  it('should return empty array for empty matches', () => {
    // Arrange
    const matches: MatchRow[] = []
    // Act
    const result = extractTournaments(matches)
    // Assert
    expect(result).toEqual([])
  })

  it('should return empty array when no matches have tournament', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: 'Hard', tournoi: null },
    ]
    // Act
    const result = extractTournaments(matches)
    // Assert
    expect(result).toEqual([])
  })

  it('should extract unique tournaments with their surfaces', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: 'Clay', tournoi: 'RG' },
      { player1: 'C', player2: 'D', surface: 'Hard', tournoi: 'US Open' },
    ]
    // Act
    const result = extractTournaments(matches)
    // Assert
    expect(result).toEqual([
      { name: 'RG', surface: 'Clay' },
      { name: 'US Open', surface: 'Hard' },
    ])
  })

  it('should deduplicate same tournament with same surface', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: 'Clay', tournoi: 'RG' },
      { player1: 'C', player2: 'D', surface: 'Clay', tournoi: 'RG' },
    ]
    // Act
    const result = extractTournaments(matches)
    // Assert
    expect(result).toEqual([{ name: 'RG', surface: 'Clay' }])
  })

  it('should keep same tournament separate when surface differs', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: 'Clay', tournoi: 'RG' },
      { player1: 'C', player2: 'D', surface: 'Indoor Clay', tournoi: 'RG' },
    ]
    // Act
    const result = extractTournaments(matches)
    // Assert
    expect(result).toEqual([
      { name: 'RG', surface: 'Clay' },
      { name: 'RG', surface: 'Indoor Clay' },
    ])
  })

  it('should preserve first occurrence order', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: 'Hard', tournoi: 'Wimbledon' },
      { player1: 'C', player2: 'D', surface: 'Clay', tournoi: 'RG' },
      { player1: 'E', player2: 'F', surface: 'Hard', tournoi: 'Wimbledon' },
    ]
    // Act
    const result = extractTournaments(matches)
    // Assert
    expect(result).toEqual([
      { name: 'Wimbledon', surface: 'Hard' },
      { name: 'RG', surface: 'Clay' },
    ])
  })

  it('should handle null surface in tournament entry', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: null, tournoi: 'Masters' },
    ]
    // Act
    const result = extractTournaments(matches)
    // Assert
    expect(result).toEqual([{ name: 'Masters', surface: '' }])
  })
})

// ── buildTodaysStats ──────────────────────────────────────────────────────────

describe('buildTodaysStats', () => {
  const matches: MatchRow[] = [
    { player1: 'Alcaraz', player2: 'Sinner', surface: 'Clay', tournoi: 'RG' },
    { player1: 'Djokovic', player2: 'Nadal', surface: 'Clay', tournoi: 'RG' },
  ]

  const playerStatsMap = new Map<string, PlayerStatsRow>([
    ['Alcaraz', {
      player_name: 'Alcaraz',
      win_rate_clay_td: 0.92,
      win_rate_hard_td: 0.85,
      win_rate_grass_td: 0.75,
      momentum_td: 1.5,
    }],
    ['Sinner', {
      player_name: 'Sinner',
      win_rate_clay_td: 0.78,
      win_rate_hard_td: 0.88,
      win_rate_grass_td: 0.70,
      momentum_td: 0.8,
    }],
    ['Djokovic', {
      player_name: 'Djokovic',
      win_rate_clay_td: 0.88,
      win_rate_hard_td: 0.92,
      win_rate_grass_td: 0.90,
      momentum_td: -0.3,
    }],
    ['Nadal', {
      player_name: 'Nadal',
      win_rate_clay_td: 0.95,
      win_rate_hard_td: 0.70,
      win_rate_grass_td: 0.65,
      momentum_td: 0.2,
    }],
  ])

  const tournaments = [{ name: 'RG', surface: 'Clay' }]

  it('should build card1 with correct match count and tournaments', () => {
    // Arrange
    // Act
    const result = buildTodaysStats(matches, playerStatsMap, tournaments)
    // Assert
    expect(result.card1.count).toBe(2)
    expect(result.card1.tournaments).toEqual([{ name: 'RG', surface: 'Clay' }])
  })

  it('should select player with highest surface win rate for card2', () => {
    // Arrange
    // Act
    const result = buildTodaysStats(matches, playerStatsMap, tournaments)
    // Assert
    expect(result.card2).not.toBeNull()
    expect(result.card2!.playerName).toBe('Nadal')
    expect(result.card2!.winRate).toBe(0.95)
    expect(result.card2!.surface).toBe('Clay')
    expect(result.card2!.opponent).toBe('Djokovic')
  })

  it('should select player with highest absolute momentum for card3', () => {
    // Arrange
    // Act
    const result = buildTodaysStats(matches, playerStatsMap, tournaments)
    // Assert
    expect(result.card3).not.toBeNull()
    expect(result.card3!.playerName).toBe('Alcaraz')
    expect(result.card3!.momentum).toBe(1.5)
    expect(result.card3!.opponent).toBe('Sinner')
  })

  it('should return null for card2 when no player has surface win rate', () => {
    // Arrange
    const emptyStatsMap = new Map<string, PlayerStatsRow>()
    // Act
    const result = buildTodaysStats(matches, emptyStatsMap, tournaments)
    // Assert
    expect(result.card2).toBeNull()
  })

  it('should return null for card3 when no player has momentum', () => {
    // Arrange
    const noMomentumStatsMap = new Map<string, PlayerStatsRow>([
      ['Alcaraz', { ...playerStatsMap.get('Alcaraz')!, momentum_td: null }],
      ['Sinner', { ...playerStatsMap.get('Sinner')!, momentum_td: null }],
    ])
    // Act
    const result = buildTodaysStats(matches, noMomentumStatsMap, tournaments)
    // Assert
    expect(result.card3).toBeNull()
  })

  it('should handle empty matches gracefully', () => {
    // Arrange
    const emptyMatches: MatchRow[] = []
    // Act
    const result = buildTodaysStats(emptyMatches, playerStatsMap, [])
    // Assert
    expect(result.card1.count).toBe(0)
    expect(result.card1.tournaments).toEqual([])
    expect(result.card2).toBeNull()
    expect(result.card3).toBeNull()
  })

  it('should compare absolute momentum values for card3', () => {
    // Arrange — player with -2.1 momentum should win over player with +1.8
    const mixedMomentumMatches: MatchRow[] = [
      { player1: 'PlayerA', player2: 'PlayerB', surface: 'Hard', tournoi: 'Test' },
    ]
    const mixedMap = new Map<string, PlayerStatsRow>([
      ['PlayerA', {
        player_name: 'PlayerA',
        win_rate_clay_td: 0.5,
        win_rate_hard_td: 0.6,
        win_rate_grass_td: 0.5,
        momentum_td: -2.1,
      }],
      ['PlayerB', {
        player_name: 'PlayerB',
        win_rate_clay_td: 0.5,
        win_rate_hard_td: 0.6,
        win_rate_grass_td: 0.5,
        momentum_td: 1.8,
      }],
    ])
    // Act
    const result = buildTodaysStats(mixedMomentumMatches, mixedMap, [{ name: 'Test', surface: 'Hard' }])
    // Assert
    expect(result.card3!.playerName).toBe('PlayerA')
    expect(result.card3!.momentum).toBe(-2.1)
  })
})
