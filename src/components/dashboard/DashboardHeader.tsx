'use client'

import { usePathname } from 'next/navigation'

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

export default function DashboardHeader() {
  const pathname = usePathname()
  const { title, subtitle } = ROUTE_META[pathname] ?? DEFAULT_META

  return (
    <header className="shrink-0 flex items-center justify-between h-14 px-6 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="min-w-0">
        <h1 className="text-sm font-semibold text-[var(--text-1)] truncate">{title}</h1>
        <p className="text-xs text-[var(--text-3)] truncate">{subtitle}</p>
      </div>
    </header>
  )
}
