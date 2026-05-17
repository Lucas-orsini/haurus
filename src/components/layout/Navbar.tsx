'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X, LogOut, User, ChevronDown, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { getSession, signOut, type AuthUser } from '@/lib/auth'
import UserProfileModal from '@/components/dashboard/UserProfileModal'
import { useLocale } from '@/providers/LocaleProvider'
import { getTranslations } from '@/lib/i18n'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const { locale } = useLocale()
  const t = getTranslations(locale)

  useEffect(() => {
    getSession().then(setUser).catch(() => setUser(null))
  }, [])

  async function handleSignOut() {
    await signOut()
    setUser(null)
    setUserMenuOpen(false)
    window.location.href = '/'
  }

  const navLinks = [
    { label: t.nav.metrics, href: '#metrics' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.about, href: '#about' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
        {/* Left zone: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center justify-center gap-2 group">
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

        {/* Right zone: LanguageSwitcher + Auth actions */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-2">
          <LanguageSwitcher />

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
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center justify-start gap-2.5 px-3 h-8 text-sm text-[var(--text-2)] hover:bg-white/[0.05] hover:text-[var(--text-1)] transition-colors whitespace-nowrap"
                    >
                      <LayoutDashboard size={13} strokeWidth={1.5} className="shrink-0" />
                      {t.nav.dashboard}
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileModalOpen(true)
                        setUserMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-start gap-2.5 px-3 h-8 text-sm text-[var(--text-2)] hover:bg-white/[0.05] hover:text-[var(--text-1)] transition-colors whitespace-nowrap"
                    >
                      <User size={13} strokeWidth={1.5} className="shrink-0" />
                      {t.nav.myProfile}
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-start gap-2.5 px-3 h-8 text-sm text-[var(--red)] hover:bg-[var(--red)]/10 transition-colors whitespace-nowrap"
                    >
                      <LogOut size={13} strokeWidth={1.5} className="shrink-0" />
                      {t.nav.signOut}
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
                {t.nav.login}
              </Link>
              <Link
                href="#pricing"
                className="h-8 px-4 flex items-center justify-center rounded-full text-sm font-medium bg-[var(--accent)] text-black hover:bg-[var(--accent-hi)] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_16px_rgba(242,203,56,0.25)] hover:shadow-[0_0_24px_rgba(242,203,56,0.40)]"
              >
                {t.nav.start}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
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
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
          </div>
          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="mt-2 h-9 px-4 flex items-center justify-center gap-2 rounded-lg text-sm font-medium border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] transition-colors"
              >
                <LayoutDashboard size={14} strokeWidth={1.5} />
                {t.nav.dashboard}
              </Link>
              <button
                onClick={() => { handleSignOut(); setMobileOpen(false) }}
                className="h-9 px-4 flex items-center justify-center gap-2 rounded-lg text-sm font-medium border border-[var(--red)]/25 bg-[var(--red)]/[0.06] hover:bg-[var(--red)]/10 text-[var(--red)] transition-colors"
              >
                <LogOut size={14} strokeWidth={1.5} />
                {t.nav.signOut}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 h-9 px-4 flex items-center justify-center rounded-lg text-sm font-medium border border-[var(--border-md)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-white/[0.04] transition-colors"
              >
                {t.nav.login}
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="h-9 px-4 flex items-center justify-center rounded-lg text-sm font-medium bg-[var(--accent)] text-black hover:bg-[var(--accent-hi)] transition-colors"
              >
                {t.nav.start}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Profile modal */}
      {isProfileModalOpen && user && (
        <UserProfileModal
          user={user}
          onClose={() => setIsProfileModalOpen(false)}
          onUpdateSuccess={(updatedUser) => {
            setUser(updatedUser)
            setIsProfileModalOpen(false)
          }}
        />
      )}
    </header>
  )
}
