'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, BookOpen, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { label: 'Aperçu', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Joueur', icon: User, href: '/dashboard/player' },
  { label: 'Métriques', icon: BookOpen, href: '/dashboard/metrics' },
]

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname()

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel — slides from left */}
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed left-0 top-0 bottom-0 w-[260px] shrink-0 z-50 flex flex-col
                       bg-[var(--bg)] border-r border-[var(--border)] md:hidden"
          >
            {/* Header — logo + close button */}
            <div className="flex items-center justify-between px-3 py-4 shrink-0">
              {/* Logo */}
              <div className="flex items-center gap-2 px-2">
                <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center shrink-0">
                  <span className="text-black text-xs font-bold">H</span>
                </div>
                <span className="text-sm font-semibold text-[var(--text-1)] tracking-tight">
                  Haurus
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-1)]
                           transition-colors duration-150 cursor-pointer"
                aria-label="Fermer le menu"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto px-3 py-2">
              {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
                const isActive = href === '/dashboard'
                  ? pathname === href
                  : pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-2.5 px-2 h-9 rounded-md text-sm transition-colors duration-150',
                      isActive
                        ? 'bg-white/[0.07] text-[var(--text-1)] font-medium'
                        : 'text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.03]'
                    )}
                    style={isActive ? { borderLeft: '2px solid var(--accent)', paddingLeft: '10px' } : {}}
                  >
                    <Icon size={15} strokeWidth={1.5} className="shrink-0" />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
