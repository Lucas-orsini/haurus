'use client'

import { useState, useEffect } from 'react'
import { useLocale } from '@/components/providers/LocaleProvider'
import { localeNames, type Locale } from '@/i18n/config'

// Placeholder de même largeur que "EN | FR" — évite le layout shift avant le mount
const PLACEHOLDER_WIDTH = 'w-14'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avant le mount (SSR + premier render) : placeholder pour éviter le hydration mismatch
  if (!mounted) {
    return <span className={`${PLACEHOLDER_WIDTH} h-5 block`} aria-hidden="true" />
  }

  const otherLocale: Locale = locale === 'en' ? 'fr' : 'en'

  return (
    <span className="inline-flex items-center gap-1.5 text-sm select-none" role="group" aria-label="Language selector">
      {/* Locale active : couleur vive + font-medium */}
      <span className="text-[var(--text-1)] font-medium cursor-default" aria-current="true">
        {localeNames[locale]}
      </span>

      {/* Séparateur — non cliquable */}
      <span className="text-[var(--text-3)] pointer-events-none" aria-hidden="true">
        |
      </span>

      {/* Locale inactive : couleur atténuée, underline au hover */}
      <button
        onClick={() => setLocale(otherLocale)}
        className="text-[var(--text-3)] hover:text-[var(--text-2)] hover:underline transition-colors duration-150 cursor-pointer bg-transparent border-none p-0"
        aria-label={`Switch to ${localeNames[otherLocale]}`}
      >
        {localeNames[otherLocale]}
      </button>
    </span>
  )
}
