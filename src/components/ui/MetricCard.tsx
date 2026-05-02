'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string
  change?: string
  changePositive?: boolean
  icon?: React.ReactNode
  iconColor?: string
}

export default function MetricCard({
  label,
  value,
  change,
  changePositive,
  icon,
  iconColor = 'text-[var(--accent)]',
}: MetricCardProps) {
  const hasPercentSign = value.includes('%')
  const numericMatch = value.replace(/[^0-9.]/g, '')
  const numericValue = parseFloat(numericMatch) || 0

  // For percentage values, display the raw value directly to avoid animation
  // artifacts that can produce "%71%" when count=0 renders alongside suffix="%".
  if (hasPercentSign) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)] overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          {icon && (
            <div className="p-2 rounded-lg bg-[var(--accent-glow)] flex items-center justify-center">
              <div className={cn('shrink-0', iconColor)}>{icon}</div>
            </div>
          )}
          {change && (
            <span
              className={cn(
                'text-xs flex items-center',
                changePositive ? 'text-[var(--green)]' : 'text-[var(--text-3)]',
              )}
            >
              {changePositive && '↑ '}
              {change}
            </span>
          )}
        </div>
        <div className="text-2xl font-medium text-[var(--text-1)] mb-1 font-mono tracking-tight">
          {value}
        </div>
        <div className="text-xs text-[var(--text-3)]">{label}</div>
      </div>
    )
  }

  const [count, setCount] = useState(0)
  const prefix = value.replace(/[0-9.]/g, '').trim()
  const suffix = value.replace(/[^a-zA-Z%]/g, '').trim()

  useEffect(() => {
    if (!numericValue) return
    const total = 60 * 2
    let frame = 0
    const id = setInterval(() => {
      frame++
      const p = 1 - Math.pow(1 - frame / total, 3)
      setCount(Math.min(numericValue * p, numericValue))
      if (frame >= total) clearInterval(id)
    }, 1000 / 60)
    return () => clearInterval(id)
  }, [numericValue])

  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)] overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        {icon && (
          <div className="p-2 rounded-lg bg-[var(--accent-glow)] flex items-center justify-center">
            <div className={cn('shrink-0', iconColor)}>{icon}</div>
          </div>
        )}
        {change && (
          <span
            className={cn(
              'text-xs flex items-center',
              changePositive ? 'text-[var(--green)]' : 'text-[var(--text-3)]',
            )}
          >
            {changePositive && '↑ '}
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-medium text-[var(--text-1)] mb-1 font-mono tracking-tight">
        {prefix}
        {Math.round(count).toLocaleString()}
        {suffix}
      </div>
      <div className="text-xs text-[var(--text-3)]">{label}</div>
    </div>
  )
}
