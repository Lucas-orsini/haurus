'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, LogOut, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from '@/lib/auth'

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    try {
      await signOut()
      window.location.href = '/login'
    } catch {
      setSigningOut(false)
    }
  }

  return (
    <aside className="w-[220px] shrink-0 h-screen flex flex-col bg-[var(--bg)] border-r border-[var(--border)] px-3 py-4">

      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-6 shrink-0">
        <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center shrink-0">
          <span className="text-black text-xs font-bold">H</span>
        </div>
        <span className="text-sm font-semibold text-[var(--text-1)] tracking-tight truncate">
          Haurus
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-2 h-8 rounded-md text-sm transition-all duration-150',
                isActive
                  ? 'bg-white/[0.07] text-[var(--text-1)] font-medium border-l-2 border-[var(--accent)]'
                  : 'text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.03] border-l-2 border-transparent'
              )}
            >
              <Icon size={15} strokeWidth={1.5} className="shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="shrink-0 border-t border-[var(--border)] pt-3 mt-2">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-white/[0.04] cursor-pointer transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center shrink-0">
            <LogOut size={12} className="text-[var(--text-3)]" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col min-w-0 flex-1 text-left">
            <span className="text-xs font-medium text-[var(--text-2)] truncate">
              {signingOut ? 'Signing out...' : 'Sign out'}
            </span>
          </div>
          <ChevronDown size={12} className="text-[var(--text-3)] shrink-0 hidden" />
        </button>
      </div>
    </aside>
  )
}
