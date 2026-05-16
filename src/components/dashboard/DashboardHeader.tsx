'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useDictionary } from '@/components/providers/locale-provider'
import LanguageSwitcher from '@/components/layout/language-switcher'

const ROUTE_KEYS: Record<string, 'dashboard' | 'player' | 'metrics'> = {
  '/dashboard': 'dashboard',
  '/dashboard/player': 'player',
  '/dashboard/metrics': 'metrics',
}

const DEFAULT_ROUTE_KEY: 'dashboard' = 'dashboard'

interface DashboardHeaderProps {
  onMenuToggle?: () => void
}

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const pathname = usePathname()
  const dict = useDictionary()

  const routeKey = ROUTE_KEYS[pathname] ?? DEFAULT_ROUTE_KEY
  const titleMap: Record<'dashboard' | 'player' | 'metrics', { title: string; subtitle: string }> = {
    dashboard: { title: dict.header.titleOverview, subtitle: dict.header.subtitleOverview },
    player: { title: dict.header.titlePlayer, subtitle: dict.header.subtitlePlayer },
    metrics: { title: dict.header.titleMetrics, subtitle: dict.header.subtitleMetrics },
  }
  const { title, subtitle } = titleMap[routeKey]

  return (
    <header className="shrink-0 flex items-center justify-between h-14 px-4 md:px-6 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Mobile hamburger — visible only < md */}
      <button
        onClick={onMenuToggle}
        aria-label={dict.header.menuOpen}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-[var(--surface-1)] transition-colors duration-150 shrink-0"
      >
        <Menu size={20} strokeWidth={1.5} className="text-[var(--text-2)]" />
      </button>

      <div className="min-w-0 flex-1 md:flex-none">
        <h1 className="text-sm font-semibold text-[var(--text-1)] truncate">{title}</h1>
        <p className="text-xs text-[var(--text-3)] truncate">{subtitle}</p>
      </div>

      {/* Language switcher */}
      <div className="ml-3 shrink-0">
        <LanguageSwitcher />
      </div>
    </header>
  )
}
