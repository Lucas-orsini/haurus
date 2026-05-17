'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useDashboardDict } from './DashboardDictContext'
import TournamentSelector from './TournamentSelector'

const DEFAULT_ROUTE_KEY = '/dashboard'

interface DashboardHeaderProps {
  onMenuToggle?: () => void
}

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const pathname = usePathname()
  const dict = useDashboardDict()
  const { routes, openMenu } = dict.header
  const routeMeta = routes[pathname] ?? routes[DEFAULT_ROUTE_KEY]
  const { title, subtitle } = routeMeta

  return (
    <header className="shrink-0 flex items-center justify-between h-14 px-4 md:px-6 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Mobile hamburger — visible only < md */}
      <button
        onClick={onMenuToggle}
        aria-label={openMenu}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-[var(--surface-1)] transition-colors duration-150 shrink-0"
      >
        <Menu size={20} strokeWidth={1.5} className="text-[var(--text-2)]" />
      </button>

      <div className="min-w-0 flex-1 md:flex-none">
        <h1 className="text-sm font-semibold text-[var(--text-1)] truncate">{title}</h1>
        <p className="text-xs text-[var(--text-3)] truncate">{subtitle}</p>
      </div>

      <TournamentSelector />
    </header>
  )
}
