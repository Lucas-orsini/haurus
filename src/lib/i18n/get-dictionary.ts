import type { Dictionary } from './types'
import type { SupportedLocale } from './config'
import { en } from './dictionaries/en'
import { fr } from './dictionaries/fr'
import { DEFAULT_LOCALE, isSupportedLocale, SUPPORTED_LOCALES } from './config'

const dictionaries: Record<SupportedLocale, Dictionary> = {
  en,
  fr,
}

/**
 * Loads the dictionary for the given locale.
 * Falls back to English if the locale is unknown or unsupported.
 * This function is for Server Components / Server Actions only.
 */
export async function getDictionary(locale: string): Promise<Dictionary> {
  // Validate locale — unknown locales fall back to default
  if (isSupportedLocale(locale)) {
    return dictionaries[locale]
  }

  // If locale is in SUPPORTED_LOCALES but not a valid SupportedLocale
  // (shouldn't happen with the current const, but safe defensive check)
  if (SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number])) {
    return dictionaries[locale as SupportedLocale]
  }

  // Unknown locale — return English as default
  console.warn(
    `[i18n] Unknown locale "${locale}". Falling back to "${DEFAULT_LOCALE}".`
  )
  return dictionaries[DEFAULT_LOCALE]
}
