'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Mail,
  ChevronLeft,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/providers/LocaleProvider'
import { getTranslations } from '@/lib/i18n'
import DashboardHeader from './DashboardHeader'

const NAV_ITEMS = [
  { href: '/dashboard', labelKey: 'overview', icon: LayoutDashboard },
  { href: '/dashboard/player', labelKey: 'player', icon: Users },
  { href: '/dashboard/metrics', labelKey: 'metrics', icon: BarChart2 },
]

const ADMIN_ITEMS = [
  { href: '/dashboard/admin/newsletter', labelKey: 'newsletter', icon: Mail },
]

interface DashboardShellProps {
  children: React.ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { locale } = useLocale()
  const t = getTranslations(locale)

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-56 bg-[var(--surface-1)] border-r border-[var(--border)]',
          'flex flex-col transform transition-transform duration-200 ease-out',
          'md:relative md:translate-x-0 md:shrink-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-end p-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label={t.dashboard.sidebar.closePanel}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <X size={16} className="text-[var(--text-2)]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Logo */}
        <div className="px-4 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[var(--accent)] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-black">H</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text-1)] tracking-tight">
              Haurus
            </span>
          </div>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-6">
          <div>
            <p className="px-2 mb-1.5 text-[10px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
              {t.dashboard.shell.welcome}
            </p>
            <ul className="space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const label = t.dashboard.sidebar[item.labelKey as keyof typeof t.dashboard.sidebar] as string
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2.5 h-9 px-2.5 rounded-md text-sm transition-colors duration-150',
                        active
                          ? 'bg-white/[0.07] text-[var(--text-1)] font-medium'
                          : 'text-[var(--text-3)] hover:bg-white/[0.04] hover:text-[var(--text-2)]'
                      )}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.5}
                        className={cn(
                          'shrink-0',
                          active ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'
                        )}
                      />
                      <span className="truncate">{label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <p className="px-2 mb-1.5 text-[10px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
              {t.dashboard.sidebar.admin}
            </p>
            <ul className="space-y-0.5">
              {ADMIN_ITEMS.map((item) => {
                const Icon = item.icon
                const label = t.dashboard.sidebar[item.labelKey as keyof typeof t.dashboard.sidebar] as string
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2.5 h-9 px-2.5 rounded-md text-sm transition-colors duration-150',
                        active
                          ? 'bg-white/[0.07] text-[var(--text-1)] font-medium'
                          : 'text-[var(--text-3)] hover:bg-white/[0.04] hover:text-[var(--text-2)]'
                      )}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.5}
                        className={cn(
                          'shrink-0',
                          active ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'
                        )}
                      />
                      <span className="truncate">{label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
