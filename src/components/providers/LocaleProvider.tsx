'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { type Locale } from '@/i18n/config'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

import { createContext, useContext } from 'react'

export const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
})

const STORAGE_KEY = 'haurus-locale'

function detectBrowserLocale(): Locale {
  if (typeof navigator !== 'undefined' && navigator.language) {
    const lang = navigator.language.toLowerCase()
    if (lang.startsWith('fr')) return 'fr'
  }
  return 'en'
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && (stored === 'en' || stored === 'fr')) {
      setLocaleState(stored)
    } else {
      const detected = detectBrowserLocale()
      setLocaleState(detected)
    }
    setMounted(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)

    // Persist in cookie so SSR gets the same locale on next full page load
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`

    // Replace locale in URL without full reload
    const segments = pathname.split('/')
    const hasLocale = segments[1] === 'en' || segments[1] === 'fr'
    if (hasLocale) {
      segments[1] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    router.push(segments.join('/'))
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
