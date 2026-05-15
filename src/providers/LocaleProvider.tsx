'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, getDictionary, type Locale, type Dictionary } from '@/lib/i18n'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)')
  )
  return match ? decodeURIComponent(match[1]) : null
}

function writeCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`
}

interface LocaleProviderProps {
  children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // Read persisted locale from cookie after mount (client-side only)
  useEffect(() => {
    const saved = readCookie(LOCALE_COOKIE_NAME)
    if (saved === 'en' || saved === 'fr') {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    writeCookie(LOCALE_COOKIE_NAME, newLocale, 31536000) // 1 year
  }

  const t = getDictionary(locale)

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocaleContext() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocaleContext must be used within <LocaleProvider>')
  }
  return ctx
}
