import type { Metadata } from 'next'
import Sidebar from '@/components/layout/Sidebar'

export const metadata: Metadata = {
  title: 'Dashboard — Haurus',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between h-14 px-6 border-b border-[var(--border)] bg-[var(--bg)]">
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-[var(--text-1)] tracking-tight">Overview</h1>
            <p className="text-xs text-[var(--text-3)]">Tous les matchs · Données en direct</p>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
