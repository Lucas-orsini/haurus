/**
 * Logique de filtrage 100% côté client.
 * Toutes les fonctions sont pures — pas d'effet de bord, pas d'appel réseau.
 */

import type { MatchStat } from '@/lib/data'
import { normalizeDate } from '@/lib/data'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MatchFilters {
  today: boolean
  tournaments: string[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Extrait la liste triée alphabétiquement de tournois uniques présents dans les matchs.
 */
export function getUniqueTournaments(matches: MatchStat[]): string[] {
  const seen = new Set<string>()
  for (const match of matches) {
    if (match.tournament) {
      seen.add(match.tournament)
    }
  }
  return Array.from(seen).sort((a, b) => a.localeCompare(b))
}

// ── Filtrage ─────────────────────────────────────────────────────────────────

/**
 * Filtre les matchs selon les critères données.
 * - query : recherche insensitive sur player1_name et player2_name
 * - filters.today : match si la date = aujourd'hui (YYYY-MM-DD)
 * - filters.tournaments : match si tournament est dans le tableau (array vide = pas de filtre)
 */
export function filterMatches(
  matches: MatchStat[],
  query: string,
  filters: MatchFilters
): MatchStat[] {
  const todayISO = new Date().toISOString().split('T')[0]
  const q = query.trim().toLowerCase()

  return matches.filter((match) => {
    // ── Recherche texte ──
    if (q) {
      const p1 = match.player1_name.toLowerCase()
      const p2 = match.player2_name.toLowerCase()
      if (!p1.includes(q) && !p2.includes(q)) {
        return false
      }
    }

    // ── Filtre today ──
    if (filters.today) {
      if (normalizeDate(match.date) !== todayISO) {
        return false
      }
    }

    // ── Filtre tournaments ──
    if (filters.tournaments.length > 0) {
      if (!filters.tournaments.includes(match.tournament)) {
        return false
      }
    }

    return true
  })
}
