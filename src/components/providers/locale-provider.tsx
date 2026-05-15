'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { LOCALE_COOKIE_NAME, LOCALE_COOKIE_OPTIONS } from '@/lib/i18n/config'
import type { Dictionary, Locale } from '@/lib/i18n/types'

interface LocaleContextValue {
  locale: Locale
  dictionary: Dictionary
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

interface LocaleProviderProps {
  initialLocale: Locale
  initialDictionary: Dictionary
  children: React.ReactNode
}

export function LocaleProvider({
  initialLocale,
  initialDictionary,
  children,
}: LocaleProviderProps) {
  const router = useRouter()
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [dictionary, setDictionary] = useState<Dictionary>(initialDictionary)

  // Keep locale in sync if the server re-renders with a different initialLocale
  // (e.g., after a full page navigation where the cookie was set server-side)
  useEffect(() => {
    setLocaleState(initialLocale)
  }, [initialLocale])

  const setLocale = useCallback(
    (newLocale: Locale) => {
      // Write HTTP cookie so the server can read it on next request
      const expires = new Date(Date.now() + LOCALE_COOKIE_OPTIONS.maxAge * 1000).toUTCString()
      document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=${LOCALE_COOKIE_OPTIONS.path}; max-age=${LOCALE_COOKIE_OPTIONS.maxAge}; SameSite=${LOCALE_COOKIE_OPTIONS.sameSite}; expires=${expires}`
      // Update client state
      setLocaleState(newLocale)
      // Load the new dictionary
      const loadDict = async () => {
        const mod = await import(`@/lib/i18n/dictionaries/${newLocale}`)
        setDictionary(mod[newLocale])
      }
      void loadDict()
      // Trigger Next.js server component re-render with new locale
      router.refresh()
    },
    [router]
  )

  return (
    <LocaleContext.Provider value={{ locale, dictionary, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

/**
 * Returns the current locale and the setter.
 * Must be called within a LocaleProvider tree.
 */
export function useLocale(): Pick<LocaleContextValue, 'locale' | 'setLocale'> {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within <LocaleProvider>')
  }
  return { locale: ctx.locale, setLocale: ctx.setLocale }
}

/**
 * Returns the current dictionary (all UI strings for the active locale).
 * Must be called within a LocaleProvider tree.
 */
export function useDictionary(): Dictionary {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useDictionary must be used within <LocaleProvider>')
  }
  return ctx.dictionary
}
