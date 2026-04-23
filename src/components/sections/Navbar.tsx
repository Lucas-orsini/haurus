'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--text-1)] font-semibold tracking-tight"
        >
          <div className="w-7 h-7 rounded-md bg-[var(--accent)] flex items-center justify-center">
            <span className="text-black text-xs font-bold">B</span>
          </div>
          <span className="text-base tracking-tighter">BettingStats</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--text-2)]">
          {[
            { label: 'Metrics', href: '#metrics' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Data', href: '#data' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[var(--text-1)] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:block text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-200"
          >
            Log in
          </a>
          <a
            href="#pricing"
            className="h-8 px-4 rounded-full bg-[var(--accent)] text-black text-sm font-medium hover:bg-[var(--accent-hi)] transition-colors duration-150"
          >
            Get started
          </a>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border-md)] bg-[var(--surface-1)] px-6 py-4 flex flex-col gap-3">
          {[
            { label: 'Metrics', href: '#metrics' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Data', href: '#data' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
          <a href="#" className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors py-1">
            Log in
          </a>
        </div>
      )}
    </header>
  )
}
