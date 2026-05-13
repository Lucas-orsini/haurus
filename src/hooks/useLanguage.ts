'use client'

import { useLocale } from '@/providers/LocaleProvider'

/**
 * Access the current language and translation function.
 * Must be used inside a <LocaleProvider> tree.
 */
export function useLanguage() {
  return useLocale()
}
