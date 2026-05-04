'use client'

import { cn, getDeltaColor, getMomentumColor } from '@/lib/utils'
import type { Database } from '@/lib/supabase/database.types'

type PlayerStats = Database['public']['Tables']['player_stats']['Row']
type AtpAverage = Database['public']['Tables']['atp_averages']['Row']

interface PlayerMetricCardsProps {
  surface: 'Hard' | 'Clay' | 'Grass'
  playerStats: PlayerStats
  atpAverages: AtpAverage[]
}

function getGlicko(surface: 'Hard' | 'Clay' | 'Grass', stats: PlayerStats): number | null {
  if (surface === 'Hard') return stats.glicko_hard
  if (surface === 'Clay') return stats.glicko_clay
  return stats.glicko_grass
}

function getPServe(surface: 'Hard' | 'Clay' | 'Grass', stats: PlayerStats): number | null {
  if (surface === 'Hard') return stats.p_serve_hard
  if (surface === 'Clay') return stats.p_serve_clay
  return stats.p_serve_grass
}

function getAtpPServe(surface: string, atpAverages: AtpAverage[]): number | null {
  const avg = atpAverages.find((a) => a.surface?.toLowerCase() === surface.toLowerCase())
  return avg?.p_serve ?? null
}

export default function PlayerMetricCards({ surface, playerStats, atpAverages }: PlayerMetricCardsProps) {
  const glicko = getGlicko(surface, playerStats)
  const pServe = getPServe(surface, playerStats)
  const atpPServe = getAtpPServe(surface, atpAverages)
  const momentum = playerStats.momentum_td

  const pServePct = pServe !== null ? (pServe * 100).toFixed(1) + '%' : '—'
  const pServeDelta = pServe !== null && atpPServe !== null ? pServe - atpPServe : null

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Card 1 — Glicko-2 */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
        <p className="text-xs text-[var(--text-3)] mb-2 uppercase tracking-wider">Glicko-2</p>
        <p className="text-2xl font-semibold text-[var(--text-1)] tabular-nums font-mono">
          {glicko !== null ? Math.round(glicko).toLocaleString() : '—'}
        </p>
        <p className="text-xs text-[var(--text-3)] mt-1">{surface}</p>
      </div>

      {/* Card 2 — P-Serve + comparaison ATP */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
        <p className="text-xs text-[var(--text-3)] mb-2 uppercase tracking-wider">P-Serve</p>
        <p className="text-2xl font-semibold text-[var(--text-1)] tabular-nums font-mono">
          {pServePct}
        </p>
        {pServeDelta !== null ? (
          <p className={cn('text-xs mt-1 flex items-center gap-1', getDeltaColor(pServeDelta > 0 ? 1 : -1))}>
            <span>{pServeDelta >= 0 ? '↑' : '↓'}</span>
            <span>
              {pServeDelta >= 0 ? '+' : ''}{(pServeDelta * 100).toFixed(1)}% vs ATP
            </span>
          </p>
        ) : (
          <p className="text-xs text-[var(--text-3)] mt-1">{surface}</p>
        )}
      </div>

      {/* Card 3 — Momentum JJ */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
        <p className="text-xs text-[var(--text-3)] mb-2 uppercase tracking-wider">Momentum JJ</p>
        <p className={cn(
          'text-2xl font-semibold tabular-nums font-mono',
          momentum !== null ? getMomentumColor(momentum) : 'text-[var(--text-1)]'
        )}>
          {momentum !== null
            ? `${momentum >= 0 ? '↑' : '↓'} ${momentum >= 0 ? '+' : ''}${momentum.toFixed(2)}`
            : '—'}
        </p>
        <p className="text-xs text-[var(--text-3)] mt-1">30 jours</p>
      </div>
    </div>
  )
}
