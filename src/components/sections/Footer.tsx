'use client'
import { motion, type Variants } from 'framer-motion'
import { Link2 } from 'lucide-react'

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

const columns = [
  {
    title: 'Data',
    links: ['Glicko-2', 'BPPI', 'p_serve', 'Momentum TD', 'TSD', 'Fatigue Index'],
  },
  {
    title: 'Players',
    links: ['ATP Rankings', 'Form Curve', 'Head-to-Head', 'Surface Records', 'Live Tracking'],
  },
  {
    title: 'Platform',
    links: ['Documentation', 'API Access', 'Pricing', 'Changelog', 'Status'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Privacy', 'Terms', 'Contact'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-md)] bg-[var(--bg)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand column */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center">
                  <span className="text-black text-[11px] font-bold">B</span>
                </div>
                <span className="text-sm font-semibold text-[var(--text-1)] tracking-tight">
                  BettingStats
                </span>
              </div>
              <p className="text-xs text-[var(--text-3)] max-w-[180px] leading-relaxed">
                The analytical layer that professional bettors use to price ATP match odds.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="#"
                  aria-label="Follow on X"
                  className="text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors duration-150"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Join Discord"
                  className="text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors duration-150"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.101.12 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0-.032-.054c-.5-.87-1.095-1.68-1.78-2.405a.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.076.076 0 0 0-.032.027C20.47 14.5 19.182 19 18.309 18.057a.076.076 0 0 0-.01-.12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="API documentation"
                  className="text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors duration-150"
                >
                  <Link2 size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Link columns */}
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[var(--text-1)] font-medium mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-2 text-xs text-[var(--text-3)]">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-[var(--text-1)] transition-colors duration-150"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--border-md)] gap-4">
            <p className="text-xs text-[var(--text-3)]">
              © 2025 BettingStats. Built for serious bettors.
            </p>
            <div className="flex items-center gap-1">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
              <span className="text-xs text-[var(--text-3)]">All systems operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
