'use client'

import { cn } from '@/lib/utils'
import { formatPlayerMetric, formatMomentum, getSurfaceColumn } from '@/lib/player/utils'
import type { PlayerStatsRow, AtpAverageRow, Surface } from '@/lib/types/player'

interface PlayerMetricCardsProps {
  playerStats: PlayerStatsRow | null
  atpAverage: AtpAverageRow | null
  surface: Surface
}

export default function PlayerMetricCards({
  playerStats,
  atpAverage,
  surface,
}: PlayerMetricCardsProps) {
  const col = getSurfaceColumn(surface)

  // ── Card 1: Glicko-2 ─────────────────────────────────────────────────────
  const glickoKey = `glicko_${col}` as keyof PlayerStatsRow
  const glickoValue = playerStats ? (playerStats[glickoKey] as number | null) : null

  // ── Card 2: P-Serve% ─────────────────────────────────────────────────────
  const pServeKey = `p_serve_${col}` as keyof PlayerStatsRow
  const pServeValue = playerStats ? (playerStats[pServeKey] as number | null) : null
  const atpPServe = atpAverage?.p_serve ?? null
  const pServeDiff = pServeValue !== null && atpPServe !== null
    ? pServeValue - atpPServe
    : null
  const pServeBetter = pServeDiff !== null ? pServeDiff >= 0 : null

  // ── Card 3: Momentum TD ─────────────────────────────────────────────────
  const momentumValue = playerStats?.momentum_td ?? null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Card 1: Glicko-2 */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
        <p className="text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider mb-3">
          Glicko-2 {surface}
        </p>
        <p className="text-2xl font-semibold text-[var(--text-1)] tracking-tight tabular-nums font-mono">
          {formatPlayerMetric(glickoKey, glickoValue)}
        </p>
        {playerStats?.rank && (
          <p className="text-xs text-[var(--text-3)] mt-1">
            ATP #{playerStats.rank}
          </p>
        )}
      </div>

      {/* Card 2: P-Serve% */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
        <p className="text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider mb-3">
          P-Serve%
        </p>
        <p className="text-2xl font-semibold text-[var(--text-1)] tracking-tight tabular-nums font-mono">
          {formatPlayerMetric(pServeKey, pServeValue)}
        </p>
        {pServeDiff !== null && (
          <p className={cn(
            'text-xs mt-1 flex items-center gap-1',
            pServeBetter ? 'text-[var(--green)]' : 'text-[var(--red)]'
          )}>
            {pServeBetter ? '↑' : '↓'} {atpPServe !== null
              ? `${(atpPServe * 100).toFixed(1)}% ATP avg`
              : pServeBetter ? 'au-dessus de la moyenne' : 'en dessous de la moyenne'}
          </p>
        )}
      </div>

      {/* Card 3: Momentum TD */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
        <p className="text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider mb-3">
          Momentum TD
        </p>
        <p className={cn(
          'text-2xl font-semibold tracking-tight tabular-nums font-mono',
          momentumValue === null ? 'text-[var(--text-1)]' :
          momentumValue >= 0 ? 'text-[var(--green)]' : 'text-[var(--red)]'
        )}>
          {formatMomentum(momentumValue)}
        </p>
        {momentumValue !== null && (
          <p className="text-xs mt-1 text-[var(--text-3)]">
            Tendance depuis 5 matchs
          </p>
        )}
      </div>
    </div>
  )
}
