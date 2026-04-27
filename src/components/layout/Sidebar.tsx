'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[220px] shrink-0 h-screen flex flex-col bg-[var(--bg)] border-r border-[var(--border)] px-3 py-4">

      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-6 shrink-0">
        <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center shrink-0">
          <span className="text-black text-xs font-bold leading-none">H</span>
        </div>
        <span className="text-sm font-semibold text-[var(--text-1)] tracking-tight truncate">
          Haur<span className="text-[var(--accent)]">u</span>s
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive =
            pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-2 h-8 rounded-md text-sm transition-all duration-150',
                isActive
                  ? 'bg-white/[0.07] text-[var(--text-1)] font-medium border-l-2 border-[var(--accent)] pl-[6px]'
                  : 'text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.03] border-l-2 border-transparent pl-[6px]'
              )}
            >
              <Icon size={15} strokeWidth={1.5} className="shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-[var(--border)] pt-3 mt-2">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center text-[10px] text-[var(--text-2)] font-medium shrink-0">
            JD
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-medium text-[var(--text-1)] truncate">John Doe</span>
            <span className="text-[11px] text-[var(--text-3)] truncate">john@acme.com</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
