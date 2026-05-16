/**
 * Shared i18n constants — single source of truth for the entire i18n pipeline.
 * Import this from middleware, layout, and any component that needs locale config.
 */

export const SUPPORTED_LOCALES = ['en', 'fr'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE' as const

export const DEFAULT_LOCALE: SupportedLocale = 'en'

/** Cookie options shared between middleware (server-side) and locale-provider (client-side). */
export const LOCALE_COOKIE_OPTIONS = {
  path: '/',
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax' as const,
}

/** Validate that a locale string is in SUPPORTED_LOCALES. */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}
