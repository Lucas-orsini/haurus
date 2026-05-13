'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/i18n'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Lookup a translation by dot-separated key, e.g. 'dashboard.overview.title'. Falls back to the key itself in dev. */
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'fr',
  setLocale: () => {},
  t: (key) => key,
})

const STORAGE_KEY = 'haurus-locale'

/**
 * Recursively traverses a nested object with a dot-separated key.
 * Returns undefined if the path does not exist.
 */
function getNestedValue(obj: unknown, path: string): unknown {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined
    }
    current = (current as Record<string, unknown>)[part]
  }
  return current
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Default to 'fr' to avoid hydration mismatch — avoids flash on first SSR render
  const [locale, setLocaleState] = useState<Locale>('fr')

  // Sync document.documentElement lang attribute whenever locale changes
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // Load persisted locale from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'fr' || stored === 'en') {
      setLocaleState(stored as Locale)
    }
  }, [])

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }

  /**
   * Translation lookup function.
   * - Returns the translated string if the key exists.
   * - Falls back to the raw key so that missing translations are visible in dev.
   */
  function t(key: string): string {
    const translations = getTranslations(locale)
    const value = getNestedValue(translations, key)
    if (typeof value === 'string') return value
    // Fallback to raw key — makes missing translations visually obvious in dev
    return key
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}
