'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

interface DashboardHeaderProps {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

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

export default function DashboardHeader({ onToggleSidebar, sidebarOpen }: DashboardHeaderProps) {
  const pathname = usePathname()
  const { title, subtitle } = ROUTE_META[pathname] ?? DEFAULT_META

  return (
    <header className="shrink-0 flex items-center justify-between h-14 px-4 md:px-6 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Hamburger — mobile only */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-1.5 -ml-1.5 mr-1 rounded-md hover:bg-white/[0.06] text-[var(--text-2)] hover:text-[var(--text-1)]
                   transition-colors duration-150 cursor-pointer"
        aria-label={sidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={sidebarOpen}
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      {/* Title block */}
      <div className="min-w-0 flex-1">
        <h1 className="text-sm font-semibold text-[var(--text-1)] truncate">{title}</h1>
        <p className="text-xs text-[var(--text-3)] truncate">{subtitle}</p>
      </div>
    </header>
  )
}
