'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, LogOut, User, BookOpen, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getSession, type AuthUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'
import UserProfileModal from './UserProfileModal'

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Player', icon: User, href: '/dashboard/player' },
  { label: 'Metrics', icon: BookOpen, href: '/dashboard/metrics' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const [sessionState, setSessionState] = useState<'loading' | 'success' | 'error'>('loading')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  // Fermer le dropdown au clic extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  async function handleSignOut() {
    setSigningOut(true)
    setIsProfileModalOpen(false)
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
          const isActive = href === '/dashboard'
            ? pathname === href
            : pathname === href || pathname.startsWith(href + '/')
          return (
            <motion.div
              key={href}
              className="relative"
              initial={false}
            >
              {/* Sliding active indicator */}
              <AnimatePresence initial={false} mode="wait">
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-white/[0.07] rounded-md"
                    style={{ borderLeft: '2px solid var(--accent)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>

              <Link
                href={href}
                className={cn(
                  'relative flex items-center justify-start gap-2.5 px-2 h-8 rounded-md text-sm',
                  isActive
                    ? 'text-[var(--text-1)] font-medium pl-3'
                    : 'text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.03] pl-3'
                )}
              >
                <Icon size={15} strokeWidth={1.5} className="shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* User footer — bloc profil */}
      <div className="shrink-0 border-t border-[var(--border)] pt-3 mt-2">

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

        {/* Success — bloc profil cliquable avec dropdown */}
        {sessionState === 'success' && user && (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-white/[0.04] cursor-pointer transition-colors w-full"
            >
              {/* Avatar initiales ou image */}
              <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center shrink-0 overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] font-medium text-[var(--text-2)]">
                    {getInitials(user.name ?? '')}
                  </span>
                )}
              </div>

              {/* Nom + email */}
              <div className="flex flex-col min-w-0 flex-1 text-left">
                <span className="text-xs font-medium text-[var(--text-1)] truncate">
                  {user.name ?? 'User'}
                </span>
                <span className="text-[10px] text-[var(--text-3)] truncate">
                  {user.email}
                </span>
              </div>
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute bottom-full left-0 right-0 mb-1.5 z-50
                             bg-[var(--surface-2)] border border-[var(--border-md)]
                             rounded-lg shadow-xl overflow-hidden py-1"
                >
                  <button
                    onClick={() => {
                      setIsProfileModalOpen(true)
                      setIsDropdownOpen(false)
                    }}
                    className="w-full flex items-center gap-2.5 px-3 h-8 text-sm
                               text-[var(--text-2)] hover:bg-white/[0.05] hover:text-[var(--text-1)]
                               transition-colors duration-100 whitespace-nowrap"
                  >
                    <User size={13} strokeWidth={1.5} className="shrink-0" />
                    Profil
                  </button>

                  <button
                    disabled
                    className="w-full flex items-center gap-2.5 px-3 h-8 text-sm
                               text-[var(--text-3)] opacity-50 cursor-default pointer-events-none
                               transition-colors duration-100 whitespace-nowrap"
                  >
                    <Settings size={13} strokeWidth={1.5} className="shrink-0" />
                    Réglage
                  </button>

                  <div className="h-px bg-[var(--border)] my-1" />

                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsDropdownOpen(false)
                    }}
                    disabled={signingOut}
                    className="w-full flex items-center gap-2.5 px-3 h-8 text-sm
                               text-[var(--red)] hover:bg-[var(--red)]/10
                               transition-colors duration-100 whitespace-nowrap
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut size={13} strokeWidth={1.5} className="shrink-0" />
                    {signingOut ? 'Déconnexion...' : 'Se déconnecter'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Modale profil */}
        {sessionState === 'success' && user && isProfileModalOpen && (
          <UserProfileModal
            user={user}
            onClose={() => setIsProfileModalOpen(false)}
            onUpdateSuccess={(updated: AuthUser) => {
              setUser(updated)
              setIsProfileModalOpen(false)
            }}
          />
        )}
      </div>
    </aside>
  )
}
