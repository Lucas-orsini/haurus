'use client'

import { useLocale } from '@/components/providers/locale-provider'

interface LanguageSwitcherProps {
  /** Hardcoded list of supported locales — mirrors config.ts */
  locales?: ReadonlyArray<'en' | 'fr'>
}

/**
 * Compact locale toggle button rendered in the dashboard header.
 * Displays the active locale abbreviation (FR / EN) and switches on click.
 * Uses cookies to persist the preference across page navigations.
 */
export default function LanguageSwitcher({
  locales = ['en', 'fr'],
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()

  function handleSwitch(newLocale: 'en' | 'fr') {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return (
    <div className="flex items-center gap-0.5 h-7 rounded-md bg-[var(--surface-1)] border border-[var(--border-md)] p-0.5">
      {locales.map((loc) => {
        const isActive = loc === locale
        return (
          <button
            key={loc}
            onClick={() => handleSwitch(loc)}
            aria-label={`Switch to ${loc === 'en' ? 'English' : 'Français'}`}
            aria-pressed={isActive}
            className={[
              'h-full px-2 rounded text-[11px] font-medium transition-colors duration-150',
              isActive
                ? 'bg-[var(--accent)]/15 text-[var(--accent-hi)]'
                : 'text-[var(--text-3)] hover:text-[var(--text-2)]',
            ].join(' ')}
          >
            {loc.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
