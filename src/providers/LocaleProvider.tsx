'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'fr',
  setLocale: () => {},
})

const STORAGE_KEY = 'haurus-locale'

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

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}
