/**
 * Match statistics types and mock data.
 *
 * Structure is compatible with a future Supabase query:
 *   const { data } = await supabase
 *     .from('match_stats')
 *     .select('id, date, tournoi, joueur1, joueur2, surface, metrics')
 *
 * To switch from mock to real data, replace the body of fetchMatchStats()
 * with the Supabase call — no other file needs to change.
 */

// ── Types ────────────────────────────────────────────────────────────────────

export type Surface = 'Clay' | 'Hard' | 'Grass'

export interface Metric {
  name: string
  /** Value for player 1 (joueur1). null if unavailable. */
  joueur1_value: number | null
  /** Value for player 2 (joueur2). null if unavailable. */
  joueur2_value: number | null
}

export interface MatchStats {
  id: string
  /** ISO 8601 date string, e.g. "2025-06-10". */
  date: string
  /** Tournament name. */
  tournoi: string
  /** Name of player 1. */
  joueur1: string
  /** Name of player 2. */
  joueur2: string
  /** Court surface for this match. */
  surface: Surface
  /** Performance metrics for both players. */
  metrics: Metric[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns today's date as an ISO YYYY-MM-DD string.
 * Used to seed filter logic in the dashboard client component.
 */
export function getTodayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

// ── Mock data ────────────────────────────────────────────────────────────────
// 8 matches: 2 today, 6 on previous days
// 3 tournaments: Roland Garros, Wimbledon, US Open
// 5 metrics per match: p_serve, BPPI, Glicko-2, FSP, Saved BP

const MOCK_MATCHES: MatchStats[] = [
  // ── Today (2025-06-10) ──────────────────────────────────────────────────
  {
    id: 'match-001',
    date: '2025-06-10',
    tournoi: 'Roland Garros',
    joueur1: 'R. Nadal',
    joueur2: 'N. Djokovic',
    surface: 'Clay',
    metrics: [
      { name: 'p_serve',    joueur1_value: 65.4,  joueur2_value: 71.8  },
      { name: 'BPPI',       joueur1_value: 0.34,   joueur2_value: 0.41  },
      { name: 'Glicko-2',   joueur1_value: 1842,   joueur2_value: 1921  },
      { name: 'FSP',        joueur1_value: 61,      joueur2_value: 58    },
      { name: 'Saved BP',   joueur1_value: 72,      joueur2_value: 68    },
    ],
  },
  {
    id: 'match-002',
    date: '2025-06-10',
    tournoi: 'Wimbledon',
    joueur1: 'C. Alcaraz',
    joueur2: 'J. Sinner',
    surface: 'Grass',
    metrics: [
      { name: 'p_serve',    joueur1_value: 70.1,  joueur2_value: 68.4  },
      { name: 'BPPI',       joueur1_value: 0.28,   joueur2_value: 0.31  },
      { name: 'Glicko-2',   joueur1_value: 1956,  joueur2_value: 1934  },
      { name: 'FSP',        joueur1_value: 63,    joueur2_value: 60    },
      { name: 'Saved BP',   joueur1_value: 75,    joueur2_value: 71    },
    ],
  },

  // ── Previous days ────────────────────────────────────────────────────────
  {
    id: 'match-003',
    date: '2025-06-09',
    tournoi: 'Roland Garros',
    joueur1: 'S. Tsitsipas',
    joueur2: 'A. Zverev',
    surface: 'Clay',
    metrics: [
      { name: 'p_serve',    joueur1_value: 62.3,  joueur2_value: 66.7  },
      { name: 'BPPI',       joueur1_value: 0.39,   joueur2_value: 0.36  },
      { name: 'Glicko-2',   joueur1_value: 1789,  joueur2_value: 1853  },
      { name: 'FSP',        joueur1_value: 58,    joueur2_value: 55    },
      { name: 'Saved BP',   joueur1_value: 67,    joueur2_value: 70    },
    ],
  },
  {
    id: 'match-004',
    date: '2025-06-08',
    tournoi: 'US Open',
    joueur1: 'D. Medvedev',
    joueur2: 'A. Rublev',
    surface: 'Hard',
    metrics: [
      { name: 'p_serve',    joueur1_value: 68.9,  joueur2_value: 64.2  },
      { name: 'BPPI',       joueur1_value: 0.31,   joueur2_value: 0.44  },
      { name: 'Glicko-2',   joueur1_value: 1876,  joueur2_value: 1792  },
      { name: 'FSP',        joueur1_value: 59,    joueur2_value: 57    },
      { name: 'Saved BP',   joueur1_value: 69,    joueur2_value: 62    },
    ],
  },
  {
    id: 'match-005',
    date: '2025-06-07',
    tournoi: 'Wimbledon',
    joueur1: 'N. Djokovic',
    joueur2: 'M. Kecmanovic',
    surface: 'Grass',
    metrics: [
      { name: 'p_serve',    joueur1_value: 73.2,  joueur2_value: 60.5  },
      { name: 'BPPI',       joueur1_value: 0.25,   joueur2_value: 0.48  },
      { name: 'Glicko-2',   joueur1_value: 1921,  joueur2_value: 1654  },
      { name: 'FSP',        joueur1_value: 65,    joueur2_value: 54    },
      { name: 'Saved BP',   joueur1_value: 78,    joueur2_value: 59    },
    ],
  },
  {
    id: 'match-006',
    date: '2025-06-06',
    tournoi: 'Roland Garros',
    joueur1: 'R. Nadal',
    joueur2: 'S. Tsitsipas',
    surface: 'Clay',
    metrics: [
      { name: 'p_serve',    joueur1_value: 67.1,  joueur2_value: 63.8  },
      { name: 'BPPI',       joueur1_value: 0.29,   joueur2_value: 0.37  },
      { name: 'Glicko-2',   joueur1_value: 1842,  joueur2_value: 1789  },
      { name: 'FSP',        joueur1_value: 60,    joueur2_value: 56    },
      { name: 'Saved BP',   joueur1_value: 74,    joueur2_value: 65    },
    ],
  },
  {
    id: 'match-007',
    date: '2025-06-05',
    tournoi: 'US Open',
    joueur1: 'T. Fritz',
    joueur2: 'F. Tiafoe',
    surface: 'Hard',
    metrics: [
      { name: 'p_serve',    joueur1_value: 69.4,  joueur2_value: 65.1  },
      { name: 'BPPI',       joueur1_value: 0.33,   joueur2_value: 0.40  },
      { name: 'Glicko-2',   joueur1_value: 1821,  joueur2_value: 1768  },
      { name: 'FSP',        joueur1_value: 61,    joueur2_value: 58    },
      { name: 'Saved BP',   joueur1_value: 71,    joueur2_value: 66    },
    ],
  },
  {
    id: 'match-008',
    date: '2025-06-04',
    tournoi: 'Wimbledon',
    joueur1: 'C. Alcaraz',
    joueur2: 'B. Shelton',
    surface: 'Grass',
    metrics: [
      { name: 'p_serve',    joueur1_value: 71.6,  joueur2_value: 67.9  },
      { name: 'BPPI',       joueur1_value: 0.26,   joueur2_value: 0.38  },
      { name: 'Glicko-2',   joueur1_value: 1956,  joueur2_value: 1712  },
      { name: 'FSP',        joueur1_value: 64,    joueur2_value: 59    },
      { name: 'Saved BP',   joueur1_value: 77,    joueur2_value: 68    },
    ],
  },
]

// ── Data access ─────────────────────────────────────────────────────────────

/**
 * Fetches match statistics.
 *
 * Currently returns mock data.
 * To connect a real Supabase source, replace the body with:
 *
 *   const supabase = createClient()
 *   const { data, error } = await supabase
 *     .from('match_stats')
 *     .select('id, date, tournoi, joueur1, joueur2, surface, metrics')
 *   if (error) throw error
 *   return data as MatchStats[]
 *
 * @throws Error if the data source fails.
 */
export async function fetchMatchStats(): Promise<MatchStats[]> {
  // Simulate a short async call — remove when wired to Supabase.
  // The artificial delay is excluded from production paths.
  await Promise.resolve()

  return MOCK_MATCHES
}

/**
 * Returns the unique list of tournament names found in the dataset.
 * Used to build dynamic filter toggles in the dashboard UI.
 */
export function getUniqueTournaments(matches: MatchStats[]): string[] {
  return [...new Set(matches.map((m) => m.tournoi))].sort()
}
