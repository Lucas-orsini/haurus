'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { getSession, signOut, type AuthUser } from '@/lib/auth'

const navLinks = [
  { label: 'Metrics', href: '#metrics' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    getSession().then(setUser).catch(() => setUser(null))
  }, [])

  async function handleSignOut() {
    await signOut()
    setUser(null)
    setUserMenuOpen(false)
    window.location.href = '/'
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
        {/* Left zone: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center justify-center gap-2 group">
            <div className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center shrink-0">
              <span className="text-black text-xs font-bold leading-none">H</span>
            </div>
            <span className="text-base font-medium tracking-tight text-[var(--text-1)]">
              Haur<span className="text-[var(--accent)]">u</span>s
            </span>
          </Link>
        </div>

        {/* Center: Desktop navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-150 group py-1"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Right zone: Auth actions */}
        <div className="hidden md:flex flex-1 items-center justify-end">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center justify-center gap-2 h-8 pl-1 pr-3 rounded-full border border-[var(--border-md)] hover:border-[var(--border-hi)] hover:bg-white/[0.04] transition-all duration-150"
              >
                {/* Avatar initials */}
                <div className="w-6 h-6 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center text-[11px] text-[var(--accent-hi)] font-medium shrink-0">
                  {user.name ? user.name.slice(0, 2).toUpperCase() : user.email.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm text-[var(--text-2)] font-medium max-w-[120px] truncate">
                  {user.name || user.email}
                </span>
                <ChevronDown size={12} strokeWidth={1.5} className={cn('text-[var(--text-3)] shrink-0 transition-transform duration-150', userMenuOpen && 'rotate-180')} />
              </button>

              {/* User dropdown */}
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[180px] w-max bg-[var(--surface-2)] border border-[var(--border-md)] rounded-lg shadow-xl overflow-hidden py-1">
                    <div className="px-3 py-2 border-b border-[var(--border)]">
                      <p className="text-xs text-[var(--text-3)] truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center justify-start gap-2.5 px-3 h-8 text-sm text-[var(--text-2)] hover:bg-white/[0.05] hover:text-[var(--text-1)] transition-colors whitespace-nowrap"
                    >
                      <User size={13} strokeWidth={1.5} className="shrink-0" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-start gap-2.5 px-3 h-8 text-sm text-[var(--red)] hover:bg-[var(--red)]/10 transition-colors whitespace-nowrap"
                    >
                      <LogOut size={13} strokeWidth={1.5} className="shrink-0" />
                      Se déconnecter
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="h-8 px-4 flex items-center justify-center rounded-full border border-[var(--border-md)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--border-hi)] hover:bg-white/[0.04] transition-all duration-150 text-sm font-medium"
              >
                Connexion
              </Link>
              <Link
                href="/signup"
                className="h-8 px-4 flex items-center justify-center rounded-full text-sm font-medium bg-[var(--accent)] text-black hover:bg-[var(--accent-hi)] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_16px_rgba(242,203,56,0.25)] hover:shadow-[0_0_24px_rgba(242,203,56,0.40)]"
              >
                Créer un compte
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-200 border-t border-[var(--border-md)]',
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-3 bg-[var(--bg)]">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors py-1"
            >
              {label}
            </a>
          ))}
          <div className="h-px bg-[var(--border)] my-1" />
          {user ? (
            <button
              onClick={() => { handleSignOut(); setMobileOpen(false) }}
              className="mt-2 h-9 px-4 flex items-center justify-center gap-2 rounded-lg text-sm font-medium border border-[var(--red)]/25 bg-[var(--red)]/[0.06] hover:bg-[var(--red)]/10 text-[var(--red)] transition-colors"
            >
              <LogOut size={14} strokeWidth={1.5} />
              Se déconnecter
            </button>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 h-9 px-4 flex items-center justify-center rounded-lg text-sm font-medium border border-[var(--border-md)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-white/[0.04] transition-colors"
              >
                Connexion
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="h-9 px-4 flex items-center justify-center rounded-lg text-sm font-medium bg-[var(--accent)] text-black hover:bg-[var(--accent-hi)] transition-colors"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
