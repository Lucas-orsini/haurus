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
 * Détermine les classes de couleur pour une métrique Δ Rank 6M.
 * Logique inversée : valeur négative = amélioration = vert, positive = dégradation = rouge.
 *
 * @param value - Valeur de la métrique (peut être null)
 * @returns Classe Tailwind pour la couleur, ou neutral si null/zero
 */
export function getDeltaColor(value: number | null): string {
  if (value === null || value === 0) return 'text-[var(--text-1)]'
  return value < 0 ? 'text-[var(--green)]' : 'text-[var(--red)]'
}

/**
 * Retourne les classes Tailwind de couleur pour une comparaison de métriques.
 *
 * @param valueA   - Valeur du joueur 1 (peut être null)
 * @param valueB   - Valeur du joueur 2 (peut être null)
 * @param mode     - 'higher' : plus grand = vert, plus petit = rouge
 *                   'lower'   : plus petit = vert, plus grand = rouge
 *                   'neutral' : aucune coloration
 *                   'delta'   : inversé — négatif = vert (amélioration), positif = rouge (dégradation)
 * @param tolerance - Seuil sous lequel aucune coloration n'est appliquée (défaut 0.001)
 * @returns [classA, classB] - Tuple de classes Tailwind
 */
export function getMetricColor(
  valueA: number | null,
  valueB: number | null,
  mode: 'higher' | 'lower' | 'neutral' | 'delta',
  tolerance = 0.001
): [string, string] {
  const greenClass   = 'text-[var(--green)]'
  const redClass     = 'text-[var(--red)]'
  const neutralClass = 'text-[var(--text-1)]'

  if (valueA === null || valueB === null) {
    return [neutralClass, neutralClass]
  }

  if (mode === 'neutral') {
    return [neutralClass, neutralClass]
  }

  const diff = Math.abs(valueA - valueB)

  if (diff <= tolerance) {
    return [neutralClass, neutralClass]
  }

  // Mode delta : valeur la plus négative = mieux
  if (mode === 'delta') {
    // Plus la valeur est négative, meilleure elle est
    return valueA < valueB
      ? [greenClass, redClass]
      : [redClass, greenClass]
  }

  const aIsBetter = mode === 'higher' ? valueA > valueB : valueA < valueB

  return aIsBetter
    ? [greenClass, redClass]
    : [redClass, greenClass]
}

/** Ensemble des clés de métriques à afficher en pourcentages (×100 + '%') */
const PERCENT_KEYS = new Set([
  'p_serve_p1', 'p_serve_p2',
  'p_return_p1', 'p_return_p2',
  'win_rate_td_p1', 'win_rate_td_p2',
  'win_rate_surf_td_p1', 'win_rate_surf_td_p2',
  'win_rate_5m_p1', 'win_rate_5m_p2',
  'momentum_td_p1', 'momentum_td_p2',
  'breaks_won_td_p1', 'breaks_won_td_p2',
  'breaks_lost_td_p1', 'breaks_lost_td_p2',
])

/** Ensemble des clés de métriques affichées en entier (pas de décimales) */
const INTEGER_KEYS = new Set([
  'rank_p1', 'rank_p2',
  'delta_rank_6m_p1', 'delta_rank_6m_p2',
  'glicko_rating_p1', 'glicko_rating_p2',
  'glicko_rd_p1', 'glicko_rd_p2',
  'jours_repos_p1', 'jours_repos_p2',
  'fatigue_72h_p1', 'fatigue_72h_p2',
])

/**
 * Formate une valeur de métrique selon son type.
 * - Pourcentages : valeur × 100 avec '%'
 * - Entiers : valeur arrondie sans décimales
 * - Delta rank : entier signé (+N / -N)
 * - Glicko rating : entier sans préfixe
 * - Autres : 3 décimales avec préfixe ↑/↓ selon le signe
 *
 * @param value     - Valeur à formater (peut être null)
 * @param metricKey - Clé de la métrique (ex: 'p_serve_p1', 'delta_rank_6m_p1')
 * @returns Chaîne formatée, ou '—' si null/undefined
 */
export function formatMetricValue(
  value: unknown,
  metricKey: string
): string {
  if (value === null || value === undefined) return '—'
  if (typeof value !== 'number') return String(value)

  // Δ Rank 6M : entier signé sans préfixe flèche
  if (metricKey === 'delta_rank_6m_p1' || metricKey === 'delta_rank_6m_p2') {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${Math.round(value)}`
  }

  // Pourcentages : ×100 avec '%'
  if (PERCENT_KEYS.has(metricKey)) {
    return `${(value * 100).toFixed(1)}%`
  }

  // Entiers : pas de décimales
  if (INTEGER_KEYS.has(metricKey)) {
    return Math.round(value).toString()
  }

  // Autres : 3 décimales avec préfixe ↑/↓
  const sign = value >= 0 ? '↑' : '↓'
  return `${sign}${Math.abs(value).toFixed(3)}`
}
