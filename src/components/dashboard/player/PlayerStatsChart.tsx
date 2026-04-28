'use client'

import { useState, useMemo } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'
import type { Database } from '@/lib/supabase/database.types'
import type { StatsHistoryPoint } from '@/lib/types/player'

type Json = Database['public']['Tables']['player_stats']['Row']['stats_history'] extends infer T ? T : never

/**
 * 16 métriques disponibles dans stats_history.
 * Chaque clé correspond à la propriété stockée dans le JSON,
 * la valeur est le label affiché dans le dropdown.
 */
const METRICS: Array<{ key: string; label: string }> = [
  { key: 'bppi', label: 'BPPI' },
  { key: 'rank', label: 'Classement' },
  { key: 'p_serve', label: 'Service %' },
  { key: 'p_return', label: 'Retour %' },
  { key: 'tsd_clay', label: 'TSD Terre battue' },
  { key: 'tsd_hard', label: 'TSD Dur' },
  { key: 'tsd_grass', label: 'TSD Gazon' },
  { key: 'glicko_clay', label: 'Glicko Terre battue' },
  { key: 'glicko_hard', label: 'Glicko Dur' },
  { key: 'glicko_grass', label: 'Glicko Gazon' },
  { key: 'momentum_td', label: 'Momentum' },
  { key: 'win_rate_td', label: 'Win Rate' },
  { key: 'win_rate_clay_td', label: 'Win Rate Terre battue' },
  { key: 'win_rate_hard_td', label: 'Win Rate Dur' },
  { key: 'win_rate_grass_td', label: 'Win Rate Gazon' },
  { key: 'breaks_won_td', label: 'Breaks gagnés' },
  { key: 'breaks_lost_td', label: 'Breaks perdus' },
  { key: 'delta_rank_6m', label: 'Δ Classement 6M' },
]

interface PlayerStatsChartProps {
  statsHistory: Json | null
}

/**
 * Retourne le label lisible d'une clé de métrique.
 */
export function formatMetricLabel(key: string): string {
  return METRICS.find((m) => m.key === key)?.label ?? key
}

/**
 * Parse le JSON stats_history et extrait les points pour une métrique donnée.
 *
 * Format réel attendu :
 * {
 *   "glicko_clay": [["2024-01-01", 1800.5], ["2024-01-08", 1810.2], ...],
 *   "win_rate_td": [["2024-01-01", 0.72], ...],
 *   ...
 * }
 *
 * Chaque valeur est un tableau [date, valeur] avec date au format ISO (YYYY-MM-DD).
 *
 * @param raw   — le JSON brut (objet ou null)
 * @param metricKey — la clé de métrique à extraire (ex: 'glicko_clay')
 * @returns     — tableau de StatsHistoryPoint trié par date, limité aux 60 derniers
 */
function parseStatsHistory(raw: Json | null, metricKey: string): StatsHistoryPoint[] {
  // Validation défensive
  if (raw === null || typeof raw !== 'object') return []

  const obj = raw as Record<string, unknown>

  // Vérifie que la clé existe et que la valeur est un tableau
  const metricData = obj[metricKey]
  if (!metricData) return []
  if (!Array.isArray(metricData)) return []

  // Chaque élément est un couple [date, valeur]
  const points: StatsHistoryPoint[] = []

  for (const item of metricData) {
    if (!Array.isArray(item) || item.length < 2) continue
    const [rawDate, rawValue] = item
    if (typeof rawDate !== 'string') continue
    if (typeof rawValue !== 'number' || isNaN(rawValue)) continue

    points.push({
      date: rawDate,
      value: rawValue,
    })
  }

  // Trié par date, garder les 60 derniers
  return points
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-60)
}

function MetricChart({ data, color }: { data: StatsHistoryPoint[]; color: string }) {
  const validData = data.filter((d) => !isNaN(d.value) && d.value !== null && d.value !== undefined)

  if (validData.length < 3) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <p className="text-sm text-[var(--text-3)]">Historique insuffisant — revenez dans quelques jours</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={validData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="grad-chart" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.15} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: 'var(--text-3)', fontFamily: 'monospace' }}
          axisLine={false}
          tickLine={false}
          tickMargin={8}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--text-3)', fontFamily: 'monospace' }}
          axisLine={false}
          tickLine={false}
          tickMargin={8}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--surface-2)',
            border: '1px solid var(--border-md)',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'var(--text-1)',
          }}
          labelStyle={{ color: 'var(--text-3)', marginBottom: '4px' }}
          cursor={{ stroke: 'var(--border-hi)', strokeWidth: 1 }}
          formatter={(value: unknown) => [Number(value).toFixed(2), '']}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill="url(#grad-chart)"
          dot={false}
          activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default function PlayerStatsChart({ statsHistory }: PlayerStatsChartProps) {
  const [selectedMetric, setSelectedMetric] = useState(METRICS[0].key)

  const parsedData = useMemo(
    () => parseStatsHistory(statsHistory, selectedMetric),
    [statsHistory, selectedMetric]
  )

  const activeLabel = formatMetricLabel(selectedMetric)

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
      {/* Sélecteur de métrique — dropdown natif */}
      <div className="flex items-center gap-2 mb-4">
        <label
          htmlFor="metric-select"
          className="text-xs font-medium text-[var(--text-2)] shrink-0"
        >
          Métrique
        </label>

        <div className="relative flex-1 max-w-[220px]">
          <select
            id="metric-select"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className={cn(
              'h-8 w-full pl-3 pr-8 rounded-md text-sm appearance-none cursor-pointer',
              'bg-[var(--surface-2)] border border-[var(--border-md)] text-[var(--text-1)]',
              'focus:outline-none focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15',
              'transition-colors duration-150'
            )}
          >
            {METRICS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>

          {/* Chevron absolute — pointer-events-none pour que le clic passe au select */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {/* Label actif — информация */}
        {parsedData.length > 0 && (
          <span className="text-xs text-[var(--text-3)] font-mono tabular-nums ml-auto">
            {parsedData.length} pts
          </span>
        )}
      </div>

      {/* Chart ou fallback */}
      {parsedData.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-sm text-[var(--text-3)]">Historique insuffisant — revenez dans quelques jours</p>
        </div>
      ) : (
        <MetricChart data={parsedData} color="var(--accent)" />
      )}
    </div>
  )
}
