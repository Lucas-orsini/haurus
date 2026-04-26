import type { Metadata } from 'next'
import Link from 'next/link'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { signOut } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Dashboard — Haurus',
  description: 'Overview de vos matchs tennis',
}

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-[220px] shrink-0 h-screen flex flex-col bg-[var(--bg)] border-r border-[var(--border-md)]">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-5 shrink-0 border-b border-[var(--border)]">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center shrink-0">
            <span className="text-black text-xs font-bold">H</span>
          </div>
          <span className="text-sm font-semibold text-[var(--text-1)] tracking-tight">Haurus</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1 overflow-y-auto">
          <p className="px-2 mb-1.5 text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider shrink-0">
            Navigation
          </p>
          {NAV_ITEMS.map(({ label, icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-2 h-8 rounded-md text-sm transition-colors duration-150
                         bg-white/[0.07] text-[var(--text-1)] font-medium"
            >
              <Icon size={15} strokeWidth={1.5} className="shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer logout */}
        <div className="shrink-0 border-t border-[var(--border-md)] px-3 py-3">
          <form action={async () => {
            'use server'
            await signOut()
          }}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-2 h-8 rounded-md text-sm
                         text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.03]
                         transition-colors duration-150"
            >
              <LogOut size={14} strokeWidth={1.5} className="shrink-0" />
              <span className="truncate">Se déconnecter</span>
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
