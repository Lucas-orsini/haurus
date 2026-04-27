'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, LogOut, ChevronDown, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSession, type AuthUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const [sessionState, setSessionState] = useState<'loading' | 'success' | 'error'>('loading')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  // Charger la session au montage
  useEffect(() => {
    let cancelled = false
    async function loadSession() {
      try {
        const authUser = await getSession()
        if (!cancelled) {
          if (authUser) {
            setUser(authUser)
            setSessionState('success')
          } else {
            setSessionState('error')
          }
        }
      } catch {
        if (!cancelled) setSessionState('error')
      }
    }
    loadSession()
    return () => { cancelled = true }
  }, [])

  // Fermer le dropdown au clic extérieur + touche Escape
  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  async function handleSignOut() {
    setSigningOut(true)
    setMenuOpen(false)
    try {
      const supabase = createClient()
      if (supabase) await supabase.auth.signOut()
      router.push('/login')
    } catch {
      setSigningOut(false)
    }
  }

  // Extraire les initiales depuis le nom complet
  function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const last = parts[1]?.[0] ?? ''
    return (first + last).toUpperCase() || '?'
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

      {/* User footer — bloc profil */}
      <div className="shrink-0 border-t border-[var(--border)] pt-3 mt-2">
        <div ref={containerRef} className="relative">

          {/* Skeleton loading */}
          {sessionState === 'loading' && (
            <div className="flex items-center gap-2 px-2 py-2 animate-pulse">
              <div className="w-6 h-6 rounded-full bg-white/[0.06] shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-1">
                <div className="h-2.5 bg-white/[0.06] rounded w-24" />
                <div className="h-2 bg-white/[0.04] rounded w-32" />
              </div>
            </div>
          )}

          {/* Error state */}
          {sessionState === 'error' && (
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center shrink-0">
                <User size={12} className="text-[var(--text-3)]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs text-[var(--text-3)] truncate">Session unavailable</span>
              </div>
            </div>
          )}

          {/* Success — bloc profil cliquable */}
          {sessionState === 'success' && user && (
            <>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-white/[0.04] cursor-pointer transition-colors w-full"
              >
                {/* Avatar initiales */}
                <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-medium text-[var(--text-2)]">
                    {getInitials(user.name)}
                  </span>
                </div>

                {/* Nom + email */}
                <div className="flex flex-col min-w-0 flex-1 text-left">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-[var(--text-3)] truncate">
                    {user.email}
                  </span>
                </div>

                {/* ChevronDown pivote */}
                <ChevronDown
                  size={11}
                  strokeWidth={1.5}
                  className={cn(
                    'text-[var(--text-3)] shrink-0 transition-transform duration-150',
                    menuOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Dropdown menu */}
              {menuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-1.5 z-50
                                bg-[var(--surface-2)] border border-[var(--border-md)]
                                rounded-lg shadow-xl overflow-hidden py-1">
                  <Link
                    href="/settings/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 h-8 text-sm text-[var(--text-2)]
                               hover:bg-white/[0.05] hover:text-[var(--text-1)] transition-colors whitespace-nowrap"
                  >
                    <User size={13} strokeWidth={1.5} className="shrink-0" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 h-8 text-sm text-[var(--text-2)]
                               hover:bg-white/[0.05] hover:text-[var(--text-1)] transition-colors whitespace-nowrap"
                  >
                    <LayoutDashboard size={13} strokeWidth={1.5} className="shrink-0" />
                    Settings
                  </Link>

                  <div className="h-px bg-[var(--border)] my-1" />

                  <button
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="w-full flex items-center gap-2.5 px-3 h-8 text-sm
                               text-[var(--red)] hover:bg-[var(--red)]/10 transition-colors whitespace-nowrap
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut size={13} strokeWidth={1.5} className="shrink-0" />
                    {signingOut ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
