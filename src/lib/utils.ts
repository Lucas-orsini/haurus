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

/**
 * Retourne les classes Tailwind de couleur pour une comparaison de métriques.
 *
 * @param valueA   - Valeur du joueur 1 (peut être null)
 * @param valueB   - Valeur du joueur 2 (peut être null)
 * @param mode     - 'higher' : plus grand = vert, plus petit = rouge
 *                   'lower'   : plus petit = vert, plus grand = rouge
 *                   'neutral' : aucune coloration
 * @param tolerance - Seuil sous lequel aucune coloration n'est appliquée (défaut 0.001)
 * @returns [classA, classB] - Tuple de classes Tailwind
 */
export function getMetricColor(
  valueA: number | null,
  valueB: number | null,
  mode: 'higher' | 'lower' | 'neutral',
  tolerance = 0.001
): [string, string] {
  const greenClass    = 'text-[var(--green)]'
  const redClass      = 'text-[var(--red)]'
  const neutralClass  = 'text-[var(--text-1)]'

  // Valeurs nulles → pas de coloration
  if (valueA === null || valueB === null) {
    return [neutralClass, neutralClass]
  }

  // Mode neutre → pas de coloration
  if (mode === 'neutral') {
    return [neutralClass, neutralClass]
  }

  const diff = Math.abs(valueA - valueB)

  // Sous le seuil de tolérance → pas de coloration
  if (diff <= tolerance) {
    return [neutralClass, neutralClass]
  }

  const aIsBetter = mode === 'higher' ? valueA > valueB : valueA < valueB

  return aIsBetter
    ? [greenClass, redClass]
    : [redClass, greenClass]
}
