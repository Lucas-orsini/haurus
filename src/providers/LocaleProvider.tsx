'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'fr',
  setLocale: () => {},
  t: () => '',
})

const LOCALE_COOKIE = 'NEXT_LOCALE'

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? 'fr')

  // Sync document.documentElement lang attribute whenever locale changes
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // Read persisted locale from cookie on mount — runs once after hydration.
  // Using cookie (not localStorage) ensures SSR and client share the same value,
  // eliminating the locale flash on first render.
  useEffect(() => {
    const match = document.cookie.match(new RegExp('(?:^|; )' + LOCALE_COOKIE + '=([^;]*)'))
    const cookieLocale = match?.[1] as Locale | undefined
    if (cookieLocale === 'fr' || cookieLocale === 'en') {
      setLocaleState(cookieLocale)
    }
  }, [])

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale)
    // Persist via HTTP cookie — read by the Next.js middleware on subsequent requests
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
  }

  // Build t() — uses dynamic import to avoid circular deps and resolve the
  // translations object at call time rather than module-evaluation time.
  function t(key: string): string {
    const { getTranslations } = require('@/lib/i18n')
    const dict = getTranslations(locale) as Record<string, unknown>
    const parts = key.split('.')
    let current: unknown = dict
    for (const part of parts) {
      if (current === null || current === undefined) return key
      current = (current as Record<string, unknown>)[part]
    }
    return typeof current === 'string' ? current : key
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
