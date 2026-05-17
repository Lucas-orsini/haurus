'use client'

import { useState, useMemo } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'
import type { Database } from '@/lib/supabase/database.types'
import type { StatsHistoryPoint } from '@/lib/types/player'
import { useDashboardDict } from '@/components/dashboard/DashboardDictContext'

type Json = Database['public']['Tables']['player_stats']['Row']['stats_history'] extends infer T ? T : never

const METRICS_KEYS = [
  'bppi',
  'rank',
  'p_serve',
  'p_return',
  'tsd_clay',
  'tsd_hard',
  'tsd_grass',
  'glicko_clay',
  'glicko_hard',
  'glicko_grass',
  'momentum_td',
  'win_rate_td',
  'win_rate_clay_td',
  'win_rate_hard_td',
  'win_rate_grass_td',
  'breaks_won_td',
  'breaks_lost_td',
  'delta_rank_6m',
] as const

interface PlayerStatsChartProps {
  statsHistory: Json | null
}

function parseStatsHistory(raw: Json | null, metricKey: string): StatsHistoryPoint[] {
  if (raw === null || typeof raw !== 'object') return []

  const obj = raw as Record<string, unknown>
  const metricData = obj[metricKey]
  if (!metricData) return []
  if (!Array.isArray(metricData)) return []

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

  return points
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-60)
}

function MetricChart({
  data,
  color,
  chartHeight = 250,
}: {
  data: StatsHistoryPoint[]
  color: string
  chartHeight?: number
}) {
  const validData = data.filter(
    (d) => !isNaN(d.value) && d.value !== null && d.value !== undefined
  )

  if (validData.length < 3) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-[var(--text-3)]">Historique insuffisant — revenez dans quelques jours</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <AreaChart data={validData} margin={{ top: 4, right: 16, bottom: 0, left: -20 }}>
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
          wrapperStyle={{ zIndex: 60 }}
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
  const [selectedMetric, setSelectedMetric] = useState<string>(METRICS_KEYS[0])
  const dict = useDashboardDict()
  const t = dict.player?.statsChart

  const parsedData = useMemo(
    () => parseStatsHistory(statsHistory, selectedMetric),
    [statsHistory, selectedMetric]
  )

  const METRICS_WITH_LABELS = METRICS_KEYS.map((key) => ({
    key,
    label: t?.[key] ?? key,
  }))

  const activeLabel = METRICS_WITH_LABELS.find((m) => m.key === selectedMetric)?.label ?? selectedMetric

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
      {/* Metric selector — column mobile, row desktop */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
        <label
          htmlFor="metric-select"
          className="text-xs font-medium text-[var(--text-2)] shrink-0"
        >
          {t?.metricLabel ?? 'Metric'}
        </label>

        <div className="relative flex-1 max-w-full md:max-w-[220px]">
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
            {METRICS_WITH_LABELS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>

          {/* Chevron */}
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

        {/* Active label */}
        {parsedData.length > 0 && (
          <span className="text-xs text-[var(--text-3)] font-mono tabular-nums md:ml-auto">
            {parsedData.length} pts
          </span>
        )}
      </div>

      {/* Chart — 250px mobile, 200px desktop */}
      <div className="h-[250px] md:h-[200px]">
        {parsedData.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-[var(--text-3)]">
              {t?.insufficientHistory ?? 'Insufficient history — come back in a few days'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop chart — hidden on mobile */}
            <div className="hidden md:block h-full">
              <MetricChart data={parsedData} color="var(--accent)" chartHeight={200} />
            </div>
            {/* Mobile chart — hidden on desktop */}
            <div className="md:hidden h-full">
              <MetricChart data={parsedData} color="var(--accent)" chartHeight={250} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
