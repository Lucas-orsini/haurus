'use client'

import { useState, useMemo } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'
import type { Database } from '@/lib/supabase/database.types'

type Json = Database['public']['Tables']['player_stats']['Row']['stats_history'] extends infer T ? T : never

interface StatsHistoryPoint {
  date: string
  value: number
}

const METRICS: Array<{ key: string; label: string }> = [
  { key: 'glicko', label: 'Glicko' },
  { key: 'p_serve', label: 'P-Serve' },
  { key: 'momentum_td', label: 'Momentum TD' },
  { key: 'win_rate_surf_td', label: 'Win Rate Surf TD' },
  { key: 'bppi', label: 'BPPI' },
]

interface PlayerStatsChartProps {
  statsHistory: Json | null
}

function parseStatsHistory(raw: Json | null): StatsHistoryPoint[] {
  if (!raw || typeof raw !== 'object') return []
  const obj = raw as Record<string, Json>
  const keys = Object.keys(obj)
  if (keys.length === 0) return []

  const firstKey = keys[0]
  const firstVal = obj[firstKey]

  if (firstVal !== null && typeof firstVal === 'object' && !Array.isArray(firstVal)) {
    return keys
      .map((date) => {
        return { date, value: 0 }
      })
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30)
  }

  return []
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

  const parsedData = useMemo(() => parseStatsHistory(statsHistory), [statsHistory])

  const activeLabel = METRICS.find((m) => m.key === selectedMetric)?.label ?? 'Glicko'

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
      {/* Metric selector */}
      <div className="flex items-center gap-1 mb-4 flex-wrap">
        {METRICS.map((m) => {
          const active = selectedMetric === m.key
          return (
            <button
              key={m.key}
              onClick={() => setSelectedMetric(m.key)}
              className={cn(
                'h-7 px-2.5 flex items-center justify-center rounded-md text-xs font-medium',
                'transition-all duration-150 whitespace-nowrap',
                active
                  ? 'border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                  : 'border border-[var(--border-md)] bg-white/[0.03] text-[var(--text-2)] hover:bg-white/[0.06]'
              )}
            >
              {m.label}
            </button>
          )
        })}
      </div>

      {/* Chart or fallback */}
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
