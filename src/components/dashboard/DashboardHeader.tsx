'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useLocale } from '@/hooks/useLocale'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const DEFAULT_ROUTE = '/dashboard'

interface DashboardHeaderProps {
  onMenuToggle?: () => void
}

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const pathname = usePathname()
  const { locale, t } = useLocale()

  const routeMeta =
    t.header.routes[pathname as keyof typeof t.header.routes] ??
    t.header.routes[DEFAULT_ROUTE]

  return (
    <header className="shrink-0 flex items-center justify-between h-14 px-4 md:px-6 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Mobile hamburger — visible only < md */}
      <button
        onClick={onMenuToggle}
        aria-label={t.header.mobileMenu}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-[var(--surface-1)] transition-colors duration-150 shrink-0"
      >
        <Menu size={20} strokeWidth={1.5} className="text-[var(--text-2)]" />
      </button>

      <div className="min-w-0 flex-1 md:flex-none">
        <h1 className="text-sm font-semibold text-[var(--text-1)] truncate">
          {routeMeta.title[locale]}
        </h1>
        <p className="text-xs text-[var(--text-3)] truncate">
          {routeMeta.subtitle[locale]}
        </p>
      </div>

      {/* Language switcher */}
      <div className="hidden md:flex items-center ml-4 shrink-0">
        <LanguageSwitcher />
      </div>
    </header>
  )
}
