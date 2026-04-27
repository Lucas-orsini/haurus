import { createClient } from '@/lib/supabase/server'

// ──────────────────────────────────────────────────────────────────────────────
// Types de retour exportés
// ──────────────────────────────────────────────────────────────────────────────

export interface MatchsJourData {
  count: number
  tournaments: { tournoi: string; surface: string }[]
}

export interface SpecialisteSurfaceData {
  playerName: string
  winRate: number
  surface: string
  adversaire: string
}

export interface MomentumExtremeData {
  playerName: string
  momentum: number
  adversaire: string
}

// ──────────────────────────────────────────────────────────────────────────────
// Helpers internes
// ──────────────────────────────────────────────────────────────────────────────

/** Retourne la date du jour au format ISO YYYY-MM-DD. */
function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Map une surface (issue de match_stats surface, ex: "Hard", "Clay", "Grass")
 * vers la colonne win_rate_*_td correspondante dans player_stats.
 * Retourne null si la surface n'est pas reconnue.
 */
function surfaceToWinRateColumn(
  surface: string | null | undefined
): 'win_rate_hard_td' | 'win_rate_clay_td' | 'win_rate_grass_td' | null {
  switch ((surface ?? '').toLowerCase()) {
    case 'hard':
      return 'win_rate_hard_td'
    case 'clay':
      return 'win_rate_clay_td'
    case 'grass':
      return 'win_rate_grass_td'
    default:
      return null
  }
}

/**
 * Map une surface vers la clé de momentum dans player_stats.
 * Retourne 'momentum_td' qui est la seule colonne disponible.
 */
function surfaceToMomentumColumn(
  _surface: string | null | undefined
): 'momentum_td' {
  return 'momentum_td'
}

// ──────────────────────────────────────────────────────────────────────────────
// Fonctions de fetch
// ──────────────────────────────────────────────────────────────────────────────

/**
 * fetchMatchsduJour
 *
 * Interroge match_stats où date_match = today (ISO YYYY-MM-DD).
 * Retourne le count total de lignes et la liste distincte de paires
 * (tournoi, surface) pour ces matchs.
 */
export async function fetchMatchsduJour(): Promise<MatchsJourData> {
  try {
    const supabase = await createClient()
    const today = todayISO()

    const { data, error } = await supabase
      .from('match_stats')
      .select('tournoi, surface')
      .eq('date_match', today)

    if (error) {
      console.error('[fetchMatchsduJour]', error.message)
      return { count: 0, tournaments: [] }
    }

    if (!data || data.length === 0) {
      return { count: 0, tournaments: [] }
    }

    // Dédoublonnage sur les paires (tournoi, surface)
    const seen = new Set<string>()
    const tournaments: { tournoi: string; surface: string }[] = []

    for (const row of data) {
      const tournoi = row.tournoi ?? ''
      const surface = row.surface ?? ''
      const key = `${tournoi}||${surface}`
      if (!seen.has(key)) {
        seen.add(key)
        tournaments.push({ tournoi, surface })
      }
    }

    return { count: data.length, tournaments }
  } catch (err) {
    console.error('[fetchMatchsduJour] unexpected error', err)
    return { count: 0, tournaments: [] }
  }
}

/**
 * fetchSpecialisteSurface
 *
 * Pour chaque joueur des matchs du jour (player1 ET player2),
 * joint player_stats sur player_name pour lire le win rate
 * correspondant à la surface du match :
 *   - hard  → win_rate_hard_td
 *   - clay  → win_rate_clay_td
 *   - grass → win_rate_grass_td
 *
 * Retourne le joueur ayant le win rate surface le plus élevé.
 * Si aucune donnée ou jointure nulle → retourne null.
 */
export async function fetchSpecialisteSurface(): Promise<SpecialisteSurfaceData | null> {
  try {
    const supabase = await createClient()
    const today = todayISO()

    // 1. Récupérer les matchs du jour
    const { data: matches, error: matchesError } = await supabase
      .from('match_stats')
      .select('player1, player2, surface')
      .eq('date_match', today)

    if (matchesError) {
      console.error('[fetchSpecialisteSurface]', matchesError.message)
      return null
    }

    if (!matches || matches.length === 0) {
      return null
    }

    // 2. Collecter tous les noms de joueurs uniques
    const playerNames = new Set<string>()
    for (const m of matches) {
      if (m.player1) playerNames.add(m.player1)
      if (m.player2) playerNames.add(m.player2)
    }

    if (playerNames.size === 0) return null

    // 3. Récupérer les player_stats pour ces joueurs
    const { data: playerStats, error: statsError } = await supabase
      .from('player_stats')
      .select('player_name, win_rate_hard_td, win_rate_clay_td, win_rate_grass_td')
      .in('player_name', Array.from(playerNames))

    if (statsError) {
      console.error('[fetchSpecialisteSurface]', statsError.message)
      return null
    }

    if (!playerStats || playerStats.length === 0) {
      return null
    }

    // 4. Construire une map player_name → row player_stats
    const statsMap = new Map<string, (typeof playerStats)[0]>()
    for (const ps of playerStats) {
      statsMap.set(ps.player_name, ps)
    }

    // 5. Pour chaque joueur de chaque match, calculer le win rate surface
    // et garder le meilleur candidat
    type Candidate = {
      playerName: string
      winRate: number
      surface: string
      adversaire: string
    }

    let best: Candidate | null = null

    for (const m of matches) {
      const surface = m.surface
      const winRateCol = surfaceToWinRateColumn(surface)
      if (!winRateCol) continue // surface non supportée

      // Cas player1
      if (m.player1) {
        const ps = statsMap.get(m.player1)
        if (ps) {
          const winRate = (ps[winRateCol] as number | null) ?? null
          if (winRate !== null) {
            const c: Candidate = {
              playerName: m.player1,
              winRate,
              surface: surface ?? '',
              adversaire: m.player2 ?? '',
            }
            if (!best || c.winRate > best.winRate) best = c
          }
        }
      }

      // Cas player2
      if (m.player2) {
        const ps = statsMap.get(m.player2)
        if (ps) {
          const winRate = (ps[winRateCol] as number | null) ?? null
          if (winRate !== null) {
            const c: Candidate = {
              playerName: m.player2,
              winRate,
              surface: surface ?? '',
              adversaire: m.player1 ?? '',
            }
            if (!best || c.winRate > best.winRate) best = c
          }
        }
      }
    }

    return best
  } catch (err) {
    console.error('[fetchSpecialisteSurface] unexpected error', err)
    return null
  }
}

/**
 * fetchMomentumExtreme
 *
 * Pour chaque joueur des matchs du jour (player1 ET player2),
 * joint player_stats sur player_name pour lire momentum_td.
 *
 * Retourne le joueur ayant la valeur absolue de momentum_td la plus élevée.
 * Si aucune donnée → retourne null.
 */
export async function fetchMomentumExtreme(): Promise<MomentumExtremeData | null> {
  try {
    const supabase = await createClient()
    const today = todayISO()

    // 1. Récupérer les matchs du jour
    const { data: matches, error: matchesError } = await supabase
      .from('match_stats')
      .select('player1, player2')
      .eq('date_match', today)

    if (matchesError) {
      console.error('[fetchMomentumExtreme]', matchesError.message)
      return null
    }

    if (!matches || matches.length === 0) {
      return null
    }

    // 2. Collecter tous les noms de joueurs uniques
    const playerNames = new Set<string>()
    for (const m of matches) {
      if (m.player1) playerNames.add(m.player1)
      if (m.player2) playerNames.add(m.player2)
    }

    if (playerNames.size === 0) return null

    // 3. Récupérer les player_stats pour ces joueurs
    const { data: playerStats, error: statsError } = await supabase
      .from('player_stats')
      .select('player_name, momentum_td')
      .in('player_name', Array.from(playerNames))

    if (statsError) {
      console.error('[fetchMomentumExtreme]', statsError.message)
      return null
    }

    if (!playerStats || playerStats.length === 0) {
      return null
    }

    // 4. Construire une map player_name → row player_stats
    const statsMap = new Map<string, (typeof playerStats)[0]>()
    for (const ps of playerStats) {
      statsMap.set(ps.player_name, ps)
    }

    // 5. Pour chaque joueur, garder celui avec |momentum| max
    type Candidate = MomentumExtremeData

    let maxAbs: number = 0
    let best: Candidate | null = null

    for (const m of matches) {
      // Cas player1
      if (m.player1) {
        const ps = statsMap.get(m.player1)
        const momentum = ps?.momentum_td ?? null
        if (momentum !== null && momentum !== 0) {
          const abs = Math.abs(momentum)
          if (abs > maxAbs) {
            maxAbs = abs
            best = {
              playerName: m.player1,
              momentum,
              adversaire: m.player2 ?? '',
            }
          }
        }
      }

      // Cas player2
      if (m.player2) {
        const ps = statsMap.get(m.player2)
        const momentum = ps?.momentum_td ?? null
        if (momentum !== null && momentum !== 0) {
          const abs = Math.abs(momentum)
          if (abs > maxAbs) {
            maxAbs = abs
            best = {
              playerName: m.player2,
              momentum,
              adversaire: m.player1 ?? '',
            }
          }
        }
      }
    }

    return best
  } catch (err) {
    console.error('[fetchMomentumExtreme] unexpected error', err)
    return null
  }
}
