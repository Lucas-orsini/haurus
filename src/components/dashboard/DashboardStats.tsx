'use client'

import { cn } from '@/lib/utils'
import type { DashboardStatsData } from '@/lib/types/match'

interface DashboardStatsProps {
  stats: DashboardStatsData
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* ── Card 1 : Matchs du jour ─────────────────────────────────── */}
      <div className="p-4 rounded-lg bg-[var(--surface-1)] border border-[var(--border-md)] flex flex-col gap-2">
        <span className="text-xs text-[var(--text-3)]">Matchs du jour</span>
        <div>
          <span className="text-2xl font-semibold text-[var(--text-1)] tabular-nums">
            {stats.card1.matchCount}
          </span>
        </div>
        {stats.card1.matchCount > 0 ? (
          <div className="flex flex-col gap-0.5">
            {stats.card1.tournaments.map((t, i) => (
              <span key={i} className="text-xs text-[var(--text-2)]">
                {t.name}
                {t.surface ? ` · ${t.surface}` : ''}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-xs text-[var(--text-3)] not-italic">
            Aucun match prévu
          </span>
        )}
      </div>

      {/* ── Card 2 : Spécialiste surface ────────────────────────────── */}
      <div className="p-4 rounded-lg bg-[var(--surface-1)] border border-[var(--border-md)] flex flex-col gap-2">
        <span className="text-xs text-[var(--text-3)]">Spécialiste surface</span>
        {stats.card2.playerName !== null ? (
          <>
            <span className="text-sm font-medium text-[var(--text-1)]">
              {stats.card2.playerName}
            </span>
            <span className="text-xs text-[var(--text-2)]">
              {stats.card2.winRate !== null
                ? `${Math.round(stats.card2.winRate * 100)}%`
                : '—'}{' '}
              {stats.card2.surface ?? ''}
              {stats.card2.opponent ? ` vs ${stats.card2.opponent}` : ''}
            </span>
          </>
        ) : (
          <span className="text-xs text-[var(--text-3)] mt-auto">
            Données indisponibles
          </span>
        )}
      </div>

      {/* ── Card 3 : Momentum extrême ────────────────────────────────── */}
      <div className="p-4 rounded-lg bg-[var(--surface-1)] border border-[var(--border-md)] flex flex-col gap-2">
        <span className="text-xs text-[var(--text-3)]">Momentum extrême</span>
        {stats.card3.playerName !== null ? (
          <>
            <span className="text-sm font-medium text-[var(--text-1)]">
              {stats.card3.playerName}
            </span>
            <span className="text-xs text-[var(--text-2)]">
              {stats.card3.momentum !== null && (
                <>
                  {stats.card3.momentum >= 0 ? '↑ ' : '↓ '}
                  <span
                    className={cn(
                      stats.card3.momentum >= 0
                        ? 'text-[var(--green)]'
                        : 'text-[var(--red)]'
                    )}
                  >
                    {stats.card3.momentum >= 0
                      ? `+${stats.card3.momentum.toFixed(2)}`
                      : stats.card3.momentum.toFixed(2)}
                  </span>
                  {stats.card3.opponent ? ` vs ${stats.card3.opponent}` : ''}
                </>
              )}
            </span>
          </>
        ) : (
          <span className="text-xs text-[var(--text-3)] mt-auto">
            Données indisponibles
          </span>
        )}
      </div>
    </div>
  )
}
