'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navLinks = [
  { label: 'Metrics', href: '#metrics' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center shrink-0">
            <span className="text-black text-xs font-bold leading-none">H</span>
          </div>
          <span className="text-base font-medium tracking-tight text-[var(--text-1)]">
            Haur<span className="text-[var(--accent)]">u</span>s
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#"
            className="group relative px-4 py-1.5 rounded-full text-sm font-medium text-[var(--text-2)] hover:text-[var(--text-1)] transition-all border border-[var(--border-md)] hover:border-[var(--accent)] hover:bg-[var(--accent-glow)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get access
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform duration-150"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </span>
          </Link>
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
          <Link
            href="#"
            className="mt-2 h-9 px-4 flex items-center justify-center rounded-lg text-sm font-medium bg-[var(--accent)] text-black hover:bg-[var(--accent-hi)] transition-colors"
          >
            Get access
          </Link>
        </div>
      </div>
    </header>
  )
}
