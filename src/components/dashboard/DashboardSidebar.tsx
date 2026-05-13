'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, LogOut, User, BookOpen, Settings, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getSession, type AuthUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'
import UserProfileModal from './UserProfileModal'

const NAV_ITEMS = [
  { label: 'Aperçu', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Joueur', icon: User, href: '/dashboard/player' },
  { label: 'Métriques', icon: BookOpen, href: '/dashboard/metrics' },
]

interface DashboardSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
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
    <>
      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-y-0 left-0 z-50 w-[220px] flex flex-col bg-[var(--bg)] border-r border-[var(--border)] px-3 py-4 md:hidden"
          >
            {/* Logo */}
            <div className="flex items-center justify-between px-2 mb-6 shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-transform duration-200">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 122 110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#f2cb38"
                      d="M66.68,9.92c2.15,1.49,3.96,3.12,5.25,5.38l34.14,59.88c5.06,8.87,2.55,20.18-4.92,26.71-8.61,7.53-21.36,6.81-29.45-1.16-1.57-1.55-4.23-.7-5.26.93-1.21,1.93-.49,3.85,1.11,5.31,9.01,8.23,22.26,9.97,33.06,4.27,2.82-1.49,5.2-3.39,7.41-5.71,4.51-4.74,7.16-10.82,7.8-17.35.68-6.84-1.28-13.25-4.64-19.12L78.53,11.95c-7.59-13.26-25.14-15.81-36.15-6.05l-3.15,3.13,13.66,23.9c.64,1.12.47,2.14-.14,3.21l-22.12,38.66c-1.75,3.06-2.08,6.5-.25,9.68,1.54,2.69,4.51,4.68,7.88,4.56,2.15-.08,3.74-1.72,3.69-3.76s-1.57-3.61-3.66-3.63c-.66,0-1.3-.46-1.53-.91-.33-.65-.29-1.24.07-1.88l25.42-44.46-13.7-23.97c5.46-3.83,12.5-4.03,18.14-.54ZM65.72,55.42l13.4,23.43c.37.64.45,1.23.13,1.87-.21.41-.82.97-1.49.97h-21.94s-8.51,14.86-8.51,14.86c-6.69,11.69-22.83,14.2-32.85,5.05-7.65-6.99-9.33-18.27-4.19-27.28l26.46-46.27c1.09-1.91.28-4.18-1.47-5.13-1.89-1.02-3.93-.27-4.99,1.58L4.36,69.68c-7.23,12.27-5.43,27.78,5.19,37.47,13.41,12.25,35.13,8.78,43.89-6.43l6.68-11.6h17.36c3.27,0,6.16-1.51,7.82-4.1,1.74-2.72,2.18-6.37.54-9.25l-13.84-24.28c-1.05-1.84-3.38-2.33-5.08-1.3-1.78,1.08-2.3,3.29-1.19,5.23Z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-semibold tracking-tight text-[var(--text-1)]">
                  Haur<span className="text-[var(--accent)]">u</span>s
                </span>
              </Link>
              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-[var(--text-2)] text-lg leading-none">×</span>
              </button>
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
                    <AnimatePresence initial={false} mode="wait">
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-indicator-mobile"
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
                      onClick={onClose}
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

            {/* User footer */}
            <div className="shrink-0 border-t border-[var(--border)] pt-3 mt-2">
              {sessionState === 'loading' && (
                <div className="flex items-center gap-2 px-2 py-2 animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-white/[0.06] shrink-0" />
                  <div className="flex flex-col min-w-0 flex-1 gap-1">
                    <div className="h-2.5 bg-white/[0.06] rounded w-24" />
                    <div className="h-2 bg-white/[0.04] rounded w-32" />
                  </div>
                </div>
              )}
              {sessionState === 'error' && (
                <div className="flex items-center gap-2 px-2 py-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center shrink-0">
                    <User size={12} className="text-[var(--text-3)]" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs text-[var(--text-3)]">Session indisponible</span>
                </div>
              )}
              {sessionState === 'success' && user && (
                <div className="flex items-center gap-2 px-2 py-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center shrink-0 overflow-hidden">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-medium text-[var(--text-2)]">
                        {getInitials(user.name ?? '')}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium text-[var(--text-1)] truncate block">
                      {user.name ?? 'User'}
                    </span>
                    <span className="text-[10px] text-[var(--text-3)] truncate block">
                      {user.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar — always visible, ignores isOpen/onClose */}
      <aside className="hidden md:flex w-[220px] shrink-0 h-screen flex-col bg-[var(--bg)] border-r border-[var(--border)] px-3 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 px-2 mb-6 shrink-0">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-transform duration-200">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 122 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#f2cb38"
                d="M66.68,9.92c2.15,1.49,3.96,3.12,5.25,5.38l34.14,59.88c5.06,8.87,2.55,20.18-4.92,26.71-8.61,7.53-21.36,6.81-29.45-1.16-1.57-1.55-4.23-.7-5.26.93-1.21,1.93-.49,3.85,1.11,5.31,9.01,8.23,22.26,9.97,33.06,4.27,2.82-1.49,5.2-3.39,7.41-5.71,4.51-4.74,7.16-10.82,7.8-17.35.68-6.84-1.28-13.25-4.64-19.12L78.53,11.95c-7.59-13.26-25.14-15.81-36.15-6.05l-3.15,3.13,13.66,23.9c.64,1.12.47,2.14-.14,3.21l-22.12,38.66c-1.75,3.06-2.08,6.5-.25,9.68,1.54,2.69,4.51,4.68,7.88,4.56,2.15-.08,3.74-1.72,3.69-3.76s-1.57-3.61-3.66-3.63c-.66,0-1.3-.46-1.53-.91-.33-.65-.29-1.24.07-1.88l25.42-44.46-13.7-23.97c5.46-3.83,12.5-4.03,18.14-.54ZM65.72,55.42l13.4,23.43c.37.64.45,1.23.13,1.87-.21.41-.82.97-1.49.97h-21.94s-8.51,14.86-8.51,14.86c-6.69,11.69-22.83,14.2-32.85,5.05-7.65-6.99-9.33-18.27-4.19-27.28l26.46-46.27c1.09-1.91.28-4.18-1.47-5.13-1.89-1.02-3.93-.27-4.99,1.58L4.36,69.68c-7.23,12.27-5.43,27.78,5.19,37.47,13.41,12.25,35.13,8.78,43.89-6.43l6.68-11.6h17.36c3.27,0,6.16-1.51,7.82-4.1,1.74-2.72,2.18-6.37.54-9.25l-13.84-24.28c-1.05-1.84-3.38-2.33-5.08-1.3-1.78,1.08-2.3,3.29-1.19,5.23Z"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[var(--text-1)]">
            Haur<span className="text-[var(--accent)]">u</span>s
          </span>
        </Link>

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
          {sessionState === 'loading' && (
            <div className="flex items-center gap-2 px-2 py-2 animate-pulse">
              <div className="w-6 h-6 rounded-full bg-white/[0.06] shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-1">
                <div className="h-2.5 bg-white/[0.06] rounded w-24" />
                <div className="h-2 bg-white/[0.04] rounded w-32" />
              </div>
            </div>
          )}
          {sessionState === 'error' && (
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center shrink-0">
                <User size={12} className="text-[var(--text-3)]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs text-[var(--text-3)] truncate">Session indisponible</span>
              </div>
            </div>
          )}
          {sessionState === 'success' && user && (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
                className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-white/[0.04] cursor-pointer transition-colors w-full"
              >
                <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center shrink-0 overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-medium text-[var(--text-2)]">
                      {getInitials(user.name ?? '')}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-1 text-left">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate">
                    {user.name ?? 'User'}
                  </span>
                  <span className="text-[10px] text-[var(--text-3)] truncate">
                    {user.email}
                  </span>
                </div>
              </button>

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
                      {signingOut ? 'Signing out...' : 'Sign out'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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
    </>
  )
}
