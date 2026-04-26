'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, LogOut, User } from 'lucide-react'
import { signOut, type AuthUser } from '@/lib/auth'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    // Client-side session read — middleware handles server-side guard
    import('@/lib/auth').then(({ getSession }) => {
      getSession().then(setUser).catch(() => setUser(null))
    })
  }, [])

  async function handleSignOut() {
    await signOut()
    window.location.href = '/login'
  }

  const NAV_ITEMS = [
    {
      label: 'Overview',
      href: '/dashboard/overview',
      icon: LayoutDashboard,
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-[220px] shrink-0 flex flex-col h-full bg-[var(--surface-1)] border-r border-[var(--border-md)]">
        {/* Logo */}
        <div className="flex items-center h-14 px-4 border-b border-[var(--border-md)]">
          <Link href="/" className="flex items-center justify-center gap-2 group">
            <div className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center shrink-0">
              <span className="text-black text-xs font-bold leading-none">H</span>
            </div>
            <span className="text-sm font-medium tracking-tight text-[var(--text-1)]">
              Haur<span className="text-[var(--accent)]">u</span>s
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5 px-2 py-3">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-2.5 h-9 px-3 rounded-md text-sm transition-all duration-150
                  ${isActive
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium border-l-2 border-[var(--accent)]'
                    : 'text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-white/[0.04]'
                  }
                `}
              >
                <Icon size={15} strokeWidth={1.5} className="shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User menu */}
        <div className="relative px-2 py-3 border-t border-[var(--border-md)]">
          <button
            onClick={() => setUserMenuOpen((o) => !o)}
            className="w-full flex items-center gap-2 h-9 px-2 rounded-md hover:bg-white/[0.04] transition-all duration-150"
          >
            <div className="w-6 h-6 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center text-[11px] text-[var(--accent-hi)] font-medium shrink-0">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : '??'}
            </div>
            <span className="flex-1 text-left text-xs text-[var(--text-2)] truncate">
              {user?.name ?? user?.email ?? 'Utilisateur'}
            </span>
          </button>

          {userMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="absolute left-2 right-2 bottom-full mb-1 z-50 bg-[var(--surface-2)] border border-[var(--border-md)] rounded-lg shadow-xl overflow-hidden">
                <div className="px-3 py-2 border-b border-[var(--border)]">
                  <p className="text-xs text-[var(--text-3)] truncate">{user?.email}</p>
                </div>
                <Link
                  href="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center justify-start gap-2.5 px-3 h-8 text-sm text-[var(--text-2)] hover:bg-white/[0.05] hover:text-[var(--text-1)] transition-colors"
                >
                  <User size={13} strokeWidth={1.5} className="shrink-0" />
                  Profil
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-start gap-2.5 px-3 h-8 text-sm text-[var(--red)] hover:bg-[var(--red)]/10 transition-colors"
                >
                  <LogOut size={13} strokeWidth={1.5} className="shrink-0" />
                  Se déconnecter
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
