'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useLocale } from '@/providers/LocaleProvider'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'

const ROUTE_META: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Aperçu',
    subtitle: 'Statistiques des matchs ATP',
  },
  '/dashboard/player': {
    title: 'Joueur',
    subtitle: 'Profil et suivi des joueurs',
  },
  '/dashboard/metrics': {
    title: 'Métriques',
    subtitle: 'Définitions des métriques',
  },
}

const DEFAULT_META = ROUTE_META['/dashboard']

interface DashboardHeaderProps {
  onMenuToggle?: () => void
}

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const pathname = usePathname()
  const { dict } = useLocale()
  const { title, subtitle } = ROUTE_META[pathname] ?? DEFAULT_META

  return (
    <header className="shrink-0 flex items-center justify-between h-14 px-4 md:px-6 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Mobile hamburger — visible only < md */}
      <button
        onClick={onMenuToggle}
        aria-label={dict.sidebar.openMenu}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-[var(--surface-1)] transition-colors duration-150 shrink-0"
      >
        <Menu size={20} strokeWidth={1.5} className="text-[var(--text-2)]" />
      </button>

      <div className="min-w-0 flex-1 md:flex-none">
        <h1 className="text-sm font-semibold text-[var(--text-1)] truncate">{title}</h1>
        <p className="text-xs text-[var(--text-3)] truncate">{subtitle}</p>
      </div>

      {/* Language switcher — right side */}
      <div className="shrink-0 ml-3">
        <LanguageSwitcher />
      </div>
    </header>
  )
}
