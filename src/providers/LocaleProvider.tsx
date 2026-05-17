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

const COOKIE_NAME = 'locale'
const COOKIE_MAX_AGE = 31536000 // 1 year in seconds

/** Reads the locale cookie value from document.cookie. Returns null if not set or invalid. */
function readCookie(): Locale | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`))
  const value = match?.[1]
  if (value === 'fr' || value === 'en') return value as Locale
  return null
}

/** Writes the locale to a cookie with a 1-year expiry. */
function writeCookie(locale: Locale) {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Default to 'fr' to avoid hydration mismatch — avoids flash on first SSR render
  const [locale, setLocaleState] = useState<Locale>('fr')

  // Sync document.documentElement lang attribute whenever locale changes
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // Load persisted locale from cookie on mount
  useEffect(() => {
    const stored = readCookie()
    if (stored) {
      setLocaleState(stored)
    }
  }, [])

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale)
    writeCookie(newLocale)
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
