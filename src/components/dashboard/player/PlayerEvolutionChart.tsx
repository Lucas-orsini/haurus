'use client'

import { useState } from 'react'
import { formatPlayerMetric } from '@/lib/player/utils'
import { cn } from '@/lib/utils'
import type { StatsHistoryEntry } from '@/lib/types/player'
import { ChevronDown } from 'lucide-react'

interface PlayerEvolutionChartProps {
  statsHistory: StatsHistoryEntry[]
}

type MetricOption = {
  key: 'glicko' | 'p_serve' | 'momentum_td' | 'win_rate_surf_td' | 'bppi'
  label: string
}

const METRICS: MetricOption[] = [
  { key: 'glicko', label: 'Glicko-2' },
  { key: 'p_serve', label: 'P-Serve%' },
  { key: 'momentum_td', label: 'Momentum TD' },
  { key: 'win_rate_surf_td', label: 'Win Rate Surface' },
  { key: 'bppi', label: 'BPPI' },
]

// Format date for x-axis: "9 avr."
function formatAxisDate(dateStr: string): string {
  try {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  } catch {
    return dateStr
  }
}

// Custom tooltip
function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="bg-[var(--surface-2)] border border-[var(--border-md)] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[11px] text-[var(--text-3)] mb-1">{label}</p>
      <p className="text-sm font-medium text-[var(--text-1)] tabular-nums font-mono">
        {payload[0].value.toFixed(2)}
      </p>
    </div>
  )
}

export default function PlayerEvolutionChart({
  statsHistory,
}: PlayerEvolutionChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricOption>(METRICS[0])

  // Show message if less than 3 data points
  if (statsHistory.length < 3) {
    return (
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-6">
        <p className="text-xs text-[var(--text-3)] text-center">
          Historique insuffisant — revenez dans quelques jours
        </p>
      </div>
    )
  }

  // Prepare chart data with formatted values for display
  const chartData = statsHistory.map((entry) => ({
    date: formatAxisDate(entry.date),
    fullDate: entry.date,
    rawValue: entry.value,
    displayValue: formatPlayerMetric(entry.key ?? selectedMetric.key, entry.value),
  }))

  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4">
      {/* Header with metric selector */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          Évolution
        </p>

        {/* Select */}
        <div className="relative">
          <select
            value={selectedMetric.key}
            onChange={(e) => {
              const found = METRICS.find((m) => m.key === e.target.value)
              if (found) setSelectedMetric(found)
            }}
            className={cn(
              'h-6 pl-2.5 pr-7 text-[11px] rounded appearance-none cursor-pointer',
              'bg-[var(--surface-2)] border border-[var(--border-md)]',
              'text-[var(--text-2)] focus:outline-none transition-colors'
            )}
          >
            {METRICS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={11}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
          />
        </div>
      </div>

      {/* Fallback chart placeholder — recharts removed, renders a data table instead */}
      <div className="space-y-1">
        {chartData.slice(-10).map((entry) => (
          <div key={entry.fullDate} className="flex items-center justify-between py-1.5 border-b border-[var(--border)] last:border-0">
            <span className="text-xs text-[var(--text-3)] font-mono tabular-nums w-16 shrink-0">
              {entry.date}
            </span>
            <span className="text-xs text-[var(--text-2)] font-mono tabular-nums text-right">
              {entry.displayValue}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
