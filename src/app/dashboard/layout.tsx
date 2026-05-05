import type { Metadata } from 'next'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

export const metadata: Metadata = {
  title: 'Dashboard — Haurus',
  description: 'Your tennis analytics dashboard.',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      {/* Sidebar — fixed width, full height, never scrolls */}
      <DashboardSidebar />

      {/* Main zone — takes remaining space */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Page header — fixed, never scrolls */}
        <header className="shrink-0 flex items-center justify-between h-14 px-6 border-b border-[var(--border)] bg-[var(--bg)]">
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-[var(--text-1)] truncate">Aperçu</h1>
            <p className="text-xs text-[var(--text-3)] truncate">Statistiques des matchs ATP</p>
          </div>
        </header>

        {/* Content — sole scrollable zone */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
