'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  Settings,
  LogOut,
} from 'lucide-react'

type SignOutState = 'idle' | 'signing-out'

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Paramètres', icon: Settings, href: '/dashboard/settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [signOutState, setSignOutState] = useState<SignOutState>('idle')

  async function handleSignOut() {
    if (signOutState !== 'idle') return
    setSignOutState('signing-out')
    const supabase = createClient()
    await supabase?.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-[220px] shrink-0 h-screen flex flex-col bg-[var(--bg)] border-r border-[var(--border)] px-3 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-6 shrink-0">
        <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">H</span>
        </div>
        <span className="text-sm font-semibold text-[var(--text-1)] tracking-tight truncate">
          Haurus
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
        <p className="px-2 mb-1 mt-2 text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider shrink-0">
          Navigation
        </p>
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
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

      {/* Séparateur */}
      <div className="h-px bg-[var(--border)] my-2 shrink-0" />

      {/* Footer utilisateur */}
      <div className="shrink-0">
        <button
          onClick={handleSignOut}
          disabled={signOutState !== 'idle'}
          className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-white/[0.04] cursor-pointer transition-colors w-full disabled:cursor-not-allowed"
        >
          <div className={cn(
            'w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center text-[10px] text-[var(--text-2)] font-medium shrink-0 transition-opacity duration-200',
            signOutState === 'signing-out' && 'opacity-40'
          )}>
            U
          </div>
          <div className="flex flex-col min-w-0 flex-1 text-left">
            <span className="text-xs font-medium text-[var(--text-1)] truncate">
              Utilisateur
            </span>
            <span className="text-[11px] text-[var(--text-3)] truncate">
              Connecté
            </span>
          </div>
          <LogOut size={14} className={cn(
            'text-[var(--text-3)] shrink-0 transition-opacity duration-200',
            signOutState === 'signing-out' && 'opacity-40'
          )} />
        </button>
      </div>
    </aside>
  )
}
