'use client'

import { useLocaleContext } from '@/providers/LocaleProvider'
import { interpolate, type Locale } from '@/lib/i18n'

/**
 * Client hook — consumes LocaleContext.
 * All dashboard components use this to get the current locale,
 * the setter, and the active translation dictionary.
 */
export function useLocale() {
  const { locale, setLocale, t } = useLocaleContext()
  return { locale, setLocale, t, interpolate }
}
