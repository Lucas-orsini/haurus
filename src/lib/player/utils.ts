/**
 * Player-specific helpers for stats parsing and metric formatting.
 *
 * parseStatsHistory  — safely parses the stats_history JSON column from player_stats.
 * getSurfaceColumn   — maps Surface enum to the correct column suffix in player_stats.
 * formatPlayerMetric — formats individual player metrics for display in metric cards.
 * formatMomentum     — formats momentum_td value with ↑/↓ arrow and signed 2 decimals.
 * formatMatchDate    — formats an ISO date string for display in match history.
 * formatFullDate     — formats a full date for display in the metrics modal.
 */

import { formatMetricValue } from '@/lib/utils'
import type { Surface, StatsHistoryEntry } from '@/lib/types/player'

// ── parseStatsHistory ─────────────────────────────────────────────────────────

/**
 * Parses the stats_history JSON column from player_stats.
 *
 * Handles:
 * - null         → returns []
 * - empty object {} → returns []
 * - invalid JSON string → returns []
 * - valid JSON array  → returns StatsHistoryEntry[]
 *
 * @param raw - The raw value from the stats_history column (Json type from Supabase)
 * @returns Array of parsed StatsHistoryEntry, or [] on any parsing failure
 */
export function parseStatsHistory(raw: unknown): StatsHistoryEntry[] {
  if (raw === null || raw === undefined) {
    return []
  }

  if (Array.isArray(raw)) {
    return parseArray(raw)
  }

  if (typeof raw === 'string') {
    if (raw.trim() === '') {
      return []
    }

    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parseArray(parsed)
      }
      return []
    } catch {
      return []
    }
  }

  if (typeof raw === 'object') {
    return []
  }

  return []
}

/**
 * Internal: validates and filters a potentially-nested array from JSON.parse result.
 */
function parseArray(arr: unknown[]): StatsHistoryEntry[] {
  return arr
    .filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object')
    .filter(
      (item) =>
        typeof item.date === 'string' &&
        typeof item.value === 'number' &&
        !isNaN(item.value)
    )
    .map((item) => ({
      date: String(item.date),
      value: Number(item.value),
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// ── getSurfaceColumn ───────────────────────────────────────────────────────────

/**
 * Returns the column key suffix for a given surface in the player_stats table.
 *
 * player_stats stores per-surface metrics in suffixed columns:
 *   glicko_hard, p_serve_hard, win_rate_hard_td, etc.
 *
 * @param surface - One of the three supported surfaces
 * @returns The lowercase surface key (e.g., 'hard', 'clay', 'grass')
 */
export function getSurfaceColumn(surface: Surface): string {
  const map: Record<Surface, string> = {
    Hard: 'hard',
    Clay: 'clay',
    Grass: 'grass',
  }
  return map[surface] ?? 'hard'
}

/**
 * Returns the column name for the Glicko rating on a given surface.
 * e.g., 'glicko_hard' when surface = 'Hard'
 */
export function getGlickoColumn(surface: Surface): string {
  return `glicko_${getSurfaceColumn(surface)}`
}

/**
 * Returns the column name for the P-Serve metric on a given surface.
 * e.g., 'p_serve_hard' when surface = 'Hard'
 */
export function getPServeColumn(surface: Surface): string {
  return `p_serve_${getSurfaceColumn(surface)}`
}

/**
 * Returns the column name for Win Rate TD on a given surface.
 * e.g., 'win_rate_hard_td' when surface = 'Hard'
 */
export function getWinRateColumn(surface: Surface): string {
  return `win_rate_${getSurfaceColumn(surface)}_td`
}

// ── formatPlayerMetric ────────────────────────────────────────────────────────

/**
 * Keys that are stored as decimals and need ×100 + % formatting.
 */
const PERCENT_KEYS = new Set([
  'p_serve',
  'p_return',
  'win_rate',
])

/**
 * Formats a player metric value for display in metric cards.
 *
 * Rules per key prefix:
 * - glicko  → integer (Math.round)
 * - p_serve, p_return, win_rate → percentage (×100, 1 decimal, %)
 * - momentum → 2 decimals, signed (+/-), with ↑/↓ prefix
 * - bppi     → 2 decimals, signed (+/-)
 * - tsd      → 2 decimals, signed (+/-)
 * - null     → '—'
 *
 * Reuses formatMetricValue from src/lib/utils.ts for keys that match
 * the existing convention (p_serve, glicko, momentum, etc.).
 *
 * @param key   - Metric key (e.g., 'glicko_hard', 'p_serve_hard', 'momentum_td')
 * @param value - Numeric value (can be null)
 * @returns Formatted string for display, or '—' if null
 */
export function formatPlayerMetric(key: string, value: number | null): string {
  if (value === null) return '—'

  // Strip surface suffix from key for base matching (e.g., 'glicko_hard' → 'glicko')
  const baseKey = key.replace(/_hard$|_clay$|_grass$|_td$/, '')

  // Glicko: integer
  if (baseKey === 'glicko' || key === 'glicko_rating_p1' || key === 'glicko_rating_p2') {
    return Math.round(value).toString()
  }

  // P-Serve, P-Return, Win Rate: percentage
  if (
    baseKey === 'p_serve' ||
    baseKey === 'p_return' ||
    baseKey === 'win_rate' ||
    PERCENT_KEYS.has(baseKey)
  ) {
    return `${(value * 100).toFixed(1)}%`
  }

  // Momentum: signed 2 decimals with ↑/↓
  if (baseKey === 'momentum' || key === 'momentum_td_p1' || key === 'momentum_td_p2') {
    return formatMomentum(value)
  }

  // BPPI: signed 2 decimals
  if (baseKey === 'bppi') {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}`
  }

  // TSD: signed 2 decimals
  if (baseKey === 'tsd' || key === 'tsd_p1' || key === 'tsd_p2') {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}`
  }

  // Breaks: 1 decimal
  if (baseKey === 'breaks_won' || baseKey === 'breaks_lost') {
    return Math.abs(value).toFixed(1)
  }

  // Delta rank: signed integer
  if (baseKey === 'delta_rank') {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${Math.round(value)}`
  }

  // Form: raw string
  if (baseKey === 'form') {
    return String(value)
  }

  // Fallback: rounded integer
  return Math.round(value).toString()
}

// ── formatMomentum ────────────────────────────────────────────────────────────

/**
 * Formats a momentum_td value with ↑/↓ arrow and signed 2-decimal precision.
 *
 * @param value - Momentum value (number | null)
 * @returns Formatted string e.g. "↑ +0.12" or "↓ -0.05", or "—" if null
 */
export function formatMomentum(value: number | null): string {
  if (value === null) return '—'
  const arrow = value >= 0 ? '↑' : '↓'
  const sign = value >= 0 ? '+' : '-'
  return `${arrow} ${sign}${Math.abs(value).toFixed(2)}`
}

// ── formatMatchDate ───────────────────────────────────────────────────────────

/**
 * Formats an ISO date string (YYYY-MM-DD) for display in the match history table.
 *
 * @param dateStr - ISO date string (e.g. "2026-04-09")
 * @returns Short date string, e.g. "9 avr."
 */
export function formatMatchDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  try {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  } catch {
    return dateStr
  }
}

// ── formatFullDate ────────────────────────────────────────────────────────────

/**
 * Formats an ISO date string for display in the metrics modal header.
 *
 * @param dateStr - ISO date string (e.g. "2026-04-09")
 * @returns Full date string, e.g. "9 avril 2026"
 */
export function formatFullDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  try {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

// ── mapSurfaceFromNextMatch ────────────────────────────────────────────────────

/**
 * Derives the Surface type from a match_stats surface string.
 *
 * @param surface - Raw surface string from match_stats (e.g., 'Hard', 'Clay', 'Grass', 'hard')
 * @returns The matched Surface, or 'Hard' as default fallback
 */
export function mapSurfaceFromMatchStats(surface: string | null): Surface {
  if (!surface) return 'Hard'
  const normalized = surface.charAt(0).toUpperCase() + surface.slice(1).toLowerCase()
  if (normalized === 'Hard' || normalized === 'Clay' || normalized === 'Grass') {
    return normalized as Surface
  }
  return 'Hard'
}
