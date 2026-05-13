'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import { useLocale } from '@/providers/LocaleProvider'
import { getTranslations } from '@/lib/i18n'

// Flat map: route → direct translation key paths inside t.dashboard.header
const ROUTE_META: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'overview.title',
    subtitle: 'overview.subtitle',
  },
  '/dashboard/player': {
    title: 'player.title',
    subtitle: 'player.subtitle',
  },
  '/dashboard/metrics': {
    title: 'metrics.title',
    subtitle: 'metrics.subtitle',
  },
}

const DEFAULT_META = ROUTE_META['/dashboard']

interface DashboardHeaderProps {
  onMenuToggle?: () => void
}

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const pathname = usePathname()
  const { locale } = useLocale()
  const t = getTranslations(locale)

  const routeMeta = ROUTE_META[pathname] ?? DEFAULT_META

  const headerTitle = t.dashboard.header[routeMeta.title as keyof typeof t.dashboard.header] as string
  const headerSubtitle = t.dashboard.header[routeMeta.subtitle as keyof typeof t.dashboard.header] as string

  return (
    <header className="shrink-0 flex items-center justify-between h-14 px-4 md:px-6 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Mobile hamburger — visible only < md */}
      <button
        onClick={onMenuToggle}
        aria-label={t.dashboard.header.openMenu}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-[var(--surface-1)] transition-colors duration-150 shrink-0"
      >
        <Menu size={20} strokeWidth={1.5} className="text-[var(--text-2)]" />
      </button>

      <div className="min-w-0 flex-1 md:flex-none">
        <h1 className="text-sm font-semibold text-[var(--text-1)] truncate">
          {headerTitle}
        </h1>
        <p className="text-xs text-[var(--text-3)] truncate">
          {headerSubtitle}
        </p>
      </div>

      {/* Right zone — language switcher */}
      <div className="shrink-0 flex items-center justify-center ml-3">
        <LanguageSwitcher />
      </div>
    </header>
  )
}
