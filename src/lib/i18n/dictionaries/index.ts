/**
 * Factory — returns the correct dictionary for the given locale.
 * TypeScript infers the return type as `Dictionary` (the shared type alias).
 */
import { enDict } from './en'
import { frDict } from './fr'
import type { Locale } from '../types'

const dictionaries: Record<Locale, typeof frDict> = {
  fr: frDict,
  en: enDict,
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
