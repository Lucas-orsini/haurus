import type { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  mainValue: ReactNode
  subtitle?: string
  children?: ReactNode
}

export default function StatsCard({
  title,
  mainValue,
  subtitle,
  children,
}: StatsCardProps) {
  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4 flex flex-col gap-2">
      <p className="text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">
        {title}
      </p>
      <div className="text-2xl font-semibold text-[var(--text-1)] tracking-tight tabular-nums leading-none">
        {mainValue}
      </div>
      {subtitle && (
        <p className="text-xs text-[var(--text-2)]">{subtitle}</p>
      )}
      {children && (
        <div className="mt-1">{children}</div>
      )}
    </div>
  )
}
