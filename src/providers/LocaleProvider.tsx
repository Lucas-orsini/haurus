'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/i18n/types'
import { enDict } from '@/lib/i18n/dictionaries/en'
import { frDict } from '@/lib/i18n/dictionaries/fr'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  dict: Dictionary
}

const dictionaries: Record<Locale, Dictionary> = {
  fr: frDict,
  en: enDict,
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'fr',
  setLocale: () => {},
  dict: frDict,
})

const STORAGE_KEY = 'haurus-locale'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  const dict = dictionaries[locale]

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
    // Also update the cookie so Server Components re-render with the new locale
    document.cookie = `locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dict }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}
