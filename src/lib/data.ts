/**
 * Mock data layer — placeholder until Supabase schema is confirmed.
 * TODO: replace with the real Supabase client once the schema is confirmed.
 */
import type { MatchStats } from '@/types/match-stats'

export const MATCH_STATS_FIXTURES: MatchStats[] = [
  {
    id: 'match-001',
    date: '2025-01-15',
    tournament: 'Australian Open',
    surface: 'Hard',
    player1_name: 'J. Sinner',
    player2_name: 'D. Medvedev',
    metric_names: ['Glicko-2', 'p_serve', 'BPPI', 'win_rate'],
    player1_values: [2856.4, 0.734, 0.412, 0.892],
    player2_values: [2743.1, 0.698, 0.387, 0.841],
  },
  {
    id: 'match-002',
    date: '2025-01-14',
    tournament: 'Australian Open',
    surface: 'Hard',
    player1_name: 'C. Alcaraz',
    player2_name: 'A. Zverev',
    metric_names: ['Glicko-2', 'p_serve', 'BPPI', 'win_rate'],
    player1_values: [2812.7, 0.719, 0.398, 0.867],
    player2_values: [2689.3, 0.681, 0.374, 0.823],
  },
  {
    id: 'match-003',
    date: '2025-01-13',
    tournament: 'Adelaide International',
    surface: 'Hard',
    player1_name: 'A. de Minaur',
    player2_name: 'G. Dimitrov',
    metric_names: ['Glicko-2', 'p_serve', 'BPPI', 'win_rate'],
    player1_values: [2541.8, 0.654, 0.341, 0.778],
    player2_values: [2603.2, 0.672, 0.359, 0.801],
  },
]
