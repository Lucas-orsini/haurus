'use client'

import { useLocale } from '@/hooks/useLocale'
import type { Locale } from '@/lib/i18n'

const LOCALES: Locale[] = ['fr', 'en']

/**
 * Autonomous language toggle — reads and writes locale via context.
 * No props required. Styled to match the existing dashboard header aesthetic.
 */
export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center gap-0 rounded-md border border-[var(--border-md)] bg-[var(--surface-1)] p-0.5">
      {LOCALES.map((l) => {
        const isActive = locale === l
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={`
              px-2.5 py-1 rounded-sm text-xs font-medium transition-all duration-150 cursor-pointer
              ${isActive
                ? 'bg-[var(--accent)] text-[var(--bg)]'
                : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
              }
            `}
            aria-label={l === 'fr' ? 'Passer en français' : 'Switch to English'}
            aria-pressed={isActive}
          >
            {l.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
