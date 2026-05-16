'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useLocale } from '@/providers/LocaleProvider'

const ROUTE_META: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'overview',
    subtitle: 'overviewSubtitle',
  },
  '/dashboard/player': {
    title: 'player',
    subtitle: 'playerSubtitle',
  },
  '/dashboard/metrics': {
    title: 'metrics',
    subtitle: 'metricsSubtitle',
  },
}

const DEFAULT_META = ROUTE_META['/dashboard']

interface DashboardHeaderProps {
  onMenuToggle?: () => void
}

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const pathname = usePathname()
  const { t } = useLocale()
  const routeKey = ROUTE_META[pathname] ?? DEFAULT_META
  const title = t(`dashboard.header.${routeKey.title}`)
  const subtitle = t(`dashboard.header.${routeKey.subtitle}`)

  return (
    <header className="shrink-0 flex items-center justify-between h-14 px-4 md:px-6 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Mobile hamburger — visible only < md */}
      <button
        onClick={onMenuToggle}
        aria-label={t('nav.openMenu')}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-[var(--surface-1)] transition-colors duration-150 shrink-0"
      >
        <Menu size={20} strokeWidth={1.5} className="text-[var(--text-2)]" />
      </button>

      <div className="min-w-0 flex-1 md:flex-none">
        <h1 className="text-sm font-semibold text-[var(--text-1)] truncate">{title}</h1>
        <p className="text-xs text-[var(--text-3)] truncate">{subtitle}</p>
      </div>
    </header>
  )
}
