/**
 * Unit tests for the pure calculation helpers in src/lib/dashboard/stats.ts.
 *
 * These tests cover the three exported pure functions:
 * - buildTodaysStats
 * - extractTournaments
 *
 * Async function computeTodaysStats is not unit tested (requires Supabase client).
 * Private helpers (findSurfaceSpecialist, findExtremeMomentum) are tested
 * through the public buildTodaysStats contract.
 */

import type { MatchRow } from '@/lib/dashboard/stats'

describe('extractTournaments', () => {
  it('should return an empty array when given no matches', () => {
    // Arrange
    const matches: MatchRow[] = []

    // Act
    const result = extractTournaments(matches)

    // Assert
    expect(result).toEqual([])
  })

  it('should return unique tournament + surface pairs in insertion order', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: 'Hard', tournoi: 'Roland Garros', win_rate_surf_td_p1: 0.5, win_rate_surf_td_p2: 0.6, momentum_td_p1: 1, momentum_td_p2: 2 },
      { player1: 'C', player2: 'D', surface: 'Clay', tournoi: 'Roland Garros', win_rate_surf_td_p1: 0.5, win_rate_surf_td_p2: 0.6, momentum_td_p1: 1, momentum_td_p2: 2 },
      { player1: 'E', player2: 'F', surface: 'Hard', tournoi: 'Wimbledon', win_rate_surf_td_p1: 0.5, win_rate_surf_td_p2: 0.6, momentum_td_p1: 1, momentum_td_p2: 2 },
      { player1: 'G', player2: 'H', surface: 'Hard', tournoi: 'Roland Garros', win_rate_surf_td_p1: 0.5, win_rate_surf_td_p2: 0.6, momentum_td_p1: 1, momentum_td_p2: 2 }, // duplicate
    ]

    // Act
    const result = extractTournaments(matches)

    // Assert
    expect(result).toHaveLength(3)
    expect(result[0]).toEqual({ name: 'Roland Garros', surface: 'Hard' })
    expect(result[1]).toEqual({ name: 'Roland Garros', surface: 'Clay' })
    expect(result[2]).toEqual({ name: 'Wimbledon', surface: 'Hard' })
  })

  it('should ignore matches without a tournoi', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: 'Hard', tournoi: null, win_rate_surf_td_p1: 0.5, win_rate_surf_td_p2: 0.6, momentum_td_p1: 1, momentum_td_p2: 2 },
      { player1: 'C', player2: 'D', surface: 'Clay', tournoi: 'Australian Open', win_rate_surf_td_p1: 0.5, win_rate_surf_td_p2: 0.6, momentum_td_p1: 1, momentum_td_p2: 2 },
    ]

    // Act
    const result = extractTournaments(matches)

    // Assert
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Australian Open')
  })
})

describe('buildTodaysStats', () => {
  it('should return card1 with correct count and tournaments', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: 'Hard', tournoi: 'Wimbledon', win_rate_surf_td_p1: 0.5, win_rate_surf_td_p2: 0.6, momentum_td_p1: 1, momentum_td_p2: 2 },
      { player1: 'C', player2: 'D', surface: 'Clay', tournoi: 'Roland Garros', win_rate_surf_td_p1: 0.5, win_rate_surf_td_p2: 0.6, momentum_td_p1: 1, momentum_td_p2: 2 },
    ]
    const tournaments = [{ name: 'Wimbledon', surface: 'Hard' }, { name: 'Roland Garros', surface: 'Clay' }]

    // Act
    const result = buildTodaysStats(matches, tournaments)

    // Assert
    expect(result.card1.count).toBe(2)
    expect(result.card1.tournaments).toEqual(tournaments)
  })

  it('should return card2 and card3 as null when all player stats are null', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'A', player2: 'B', surface: 'Hard', tournoi: 'Wimbledon', win_rate_surf_td_p1: null, win_rate_surf_td_p2: null, momentum_td_p1: null, momentum_td_p2: null },
    ]
    const tournaments = [{ name: 'Wimbledon', surface: 'Hard' }]

    // Act
    const result = buildTodaysStats(matches, tournaments)

    // Assert
    expect(result.card2).toBeNull()
    expect(result.card3).toBeNull()
  })

  it('should return card2 with highest win rate player across matches', () => {
    // Arrange
    const matches: MatchRow[] = [
      { player1: 'PlayerA', player2: 'PlayerB', surface: 'Hard', tournoi: 'Wimbledon', win_rate_surf_td_p1: 0.4, win_rate_surf_td_p2: 0.8, momentum_td_p1: 1, momentum_td_p2: 2 },
      { player1: 'PlayerC', player2: 'PlayerD', surface: 'Clay', tournoi: 'RG', win_rate_surf_td_p1: 0.3, win_rate_surf_td_p2: 0.9, momentum_td_p1: 1, momentum_td_p2: 2 },
    ]
    const tournaments = [{ name: 'Wimbledon', surface: 'Hard' }, { name: 'RG', surface: 'Clay' }]

    // Act
    const result = buildTodaysStats(matches, tournaments)

    // Assert
    expect(result.card2).not.toBeNull()
    expect(result.card2!.player1).toBe('PlayerD')
    expect(result.card2!.winRate).toBe(0.9)
  })
})
