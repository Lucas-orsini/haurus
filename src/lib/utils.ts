import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes conditionally.
 * clsx handles conditionals (string | undefined | null | boolean)
 * tailwind-merge deduplicates conflicting Tailwind prefixes (e.g. two bg-)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
