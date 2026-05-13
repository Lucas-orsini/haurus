'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const LOCALES = [
  { code: 'fr' as const, label: 'Français', flag: 'FR' },
  { code: 'en' as const, label: 'English', flag: 'EN' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function handleSelect(code: 'fr' | 'en') {
    setLocale(code)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className={cn(
          'h-8 px-2.5 flex items-center justify-center gap-1.5 rounded-full',
          'border border-[var(--border-md)]',
          'hover:border-[var(--border-hi)] hover:bg-white/[0.04]',
          'transition-all duration-150 text-xs font-medium text-[var(--text-2)] shrink-0'
        )}
      >
        <span className="font-mono tracking-tight">{current.flag}</span>
        <ChevronDown
          size={11}
          strokeWidth={2}
          className={cn('text-[var(--text-3)] transition-transform duration-150', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            'absolute right-0 top-full mt-1.5 z-50',
            'min-w-[120px] py-1',
            'bg-[var(--surface-2)] border border-[var(--border-md)] rounded-lg shadow-xl',
            'overflow-hidden'
          )}
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === locale}
              onClick={() => handleSelect(l.code)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 h-8 text-xs text-left',
                'transition-colors duration-100',
                l.code === locale
                  ? 'bg-[var(--accent)]/10 text-[var(--accent-hi)] font-medium'
                  : 'text-[var(--text-2)] hover:bg-white/[0.04] hover:text-[var(--text-1)]'
              )}
            >
              <span className="font-mono tracking-tight w-5 shrink-0">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
