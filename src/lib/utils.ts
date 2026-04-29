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
 * Retourne les classes Tailwind de couleur pour la métrique Momentum.
 * Sémantique directe : positif = bonne forme = vert, négatif = mauvaise forme = rouge.
 *
 * @param value - Valeur du momentum (peut être null)
 * @returns Classe Tailwind : vert si > 0, rouge si < 0, neutre si null ou 0
 */
export function getMomentumColor(value: number | null): string {
  if (value === null || value === 0) return 'text-[var(--text-1)]'
  return value > 0 ? 'text-[var(--green)]' : 'text-[var(--red)]'
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

/**
 * Segment de forme coloré pour le rendu.
 */
export interface FormeSegment {
  char: string
  color: 'green' | 'red' | 'neutral'
}

/**
 * Formate une chaîne de forme (V/D/N) en segments colorés.
 * Chaque caractère non-espace est mapper à une couleur :
 *   V → green, D → red, N → neutral
 *
 * @param value - Chaîne de forme (ex: "VDVDV")
 * @returns Tableau de segments colorés, ou null si value est null/undefined/vide
 */
export function formatForme(value: string | null | undefined): FormeSegment[] | null {
  if (value === null || value === undefined || value === '') return null
  return Array.from(value)
    .filter((char) => char !== ' ')
    .map((char) => {
      if (char === 'V') return { char, color: 'green' as const }
      if (char === 'D') return { char, color: 'red' as const }
      return { char, color: 'neutral' as const }
    })
}

/**
 * Ensemble des clés de métriques à afficher en pourcentages (×100 + 1 décimale + '%')
 */
const PERCENT_1_DECIMAL_KEYS = new Set([
  'p_serve_p1', 'p_serve_p2',
  'p_return_p1', 'p_return_p2',
])

/**
 * Ensemble des clés de métriques ×100 + Math.round + '%'
 */
const PERCENT_ROUNDED_KEYS = new Set([
  'map_p1', 'map_p2',
  'win_rate_td_p1', 'win_rate_td_p2',
  'win_rate_surf_td_p1', 'win_rate_surf_td_p2',
])

/**
 * Ensemble des clés de métriques 1 décimale, sans signe
 */
const DECIMAL_1_NO_SIGN_KEYS = new Set([
  'breaks_won_td_p1', 'breaks_won_td_p2',
  'breaks_lost_td_p1', 'breaks_lost_td_p2',
])

/**
 * Ensemble des clés de métriques 2 décimales, préfixe + si >= 0
 */
const DECIMAL_2_SIGNED_KEYS = new Set([
  'tsd_p1', 'tsd_p2',
  'bppi_p1', 'bppi_p2',
])

/**
 * Formate une valeur de métrique selon son type.
 *
 * Règles par clé :
 * - rank_p1 / rank_p2 : entier (Math.round)
 * - delta_rank_6m_p1 / delta_rank_6m_p2 : entier signé (+ si >= 0)
 * - p_serve_p1 / p_serve_p2, p_return_p1 / p_return_p2 : ×100, 1 décimale, %
 * - glicko_rating_p1 / glicko_rating_p2 : entier
 * - tsd_p1 / tsd_p2, bppi_p1 / bppi_p2 : 2 décimales, préfixe + si >= 0
 * - map_p1 / map_p2, win_rate_td_p1 / win_rate_td_p2, win_rate_surf_td_p1 / win_rate_surf_td_p2 : ×100, Math.round, %
 * - momentum_td_p1 / momentum_td_p2 : 2 décimales, ↑/↓ + signe
 * - breaks_won_td_p1 / breaks_won_td_p2, breaks_lost_td_p1 / breaks_lost_td_p2 : 1 décimale
 * - fatigue_72h_p1 / fatigue_72h_p2 : entier, suffixe ' min'
 * - jours_repos_p1 / jours_repos_p2 : entier, suffixe ' jour' / ' jours'
 * - form_p1 / form_p2 : valeur brute (le formatage coloré est géré par formatForme)
 * - null / undefined : '—'
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

  // Rank ATP : entier
  if (metricKey === 'rank_p1' || metricKey === 'rank_p2') {
    return Math.round(value).toString()
  }

  // Δ Rank 6M : entier signé (+ si >= 0)
  if (metricKey === 'delta_rank_6m_p1' || metricKey === 'delta_rank_6m_p2') {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${Math.round(value)}`
  }

  // P-Serve et P-Return : ×100, 1 décimale, %
  if (PERCENT_1_DECIMAL_KEYS.has(metricKey)) {
    return `${(value * 100).toFixed(1)}%`
  }

  // Glicko Rating : entier
  if (metricKey === 'glicko_rating_p1' || metricKey === 'glicko_rating_p2') {
    return Math.round(value).toString()
  }

  // TSD et BPPI : 2 décimales, préfixe + si >= 0
  if (DECIMAL_2_SIGNED_KEYS.has(metricKey)) {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${Math.abs(value).toFixed(2)}`
  }

  // MAP, Win Rate TD, Win Rate Surface TD : ×100, Math.round, %
  if (PERCENT_ROUNDED_KEYS.has(metricKey)) {
    return `${Math.round(value * 100)}%`
  }

  // Momentum TD : 2 décimales, ↑/↓ + signe
  if (metricKey === 'momentum_td_p1' || metricKey === 'momentum_td_p2') {
    const arrow = value >= 0 ? '↑' : '↓'
    const sign = value >= 0 ? '+' : '-'
    return `${arrow} ${sign}${Math.abs(value).toFixed(2)}`
  }

  // Breaks Won/Lost TD : 1 décimale, sans signe
  if (DECIMAL_1_NO_SIGN_KEYS.has(metricKey)) {
    return Math.abs(value).toFixed(1)
  }

  // Fatigue 72H : entier, suffixe ' min'
  if (metricKey === 'fatigue_72h_p1' || metricKey === 'fatigue_72h_p2') {
    return `${Math.round(value)} min`
  }

  // Jours de repos : entier, suffixe ' jour' / ' jours'
  if (metricKey === 'jours_repos_p1' || metricKey === 'jours_repos_p2') {
    const rounded = Math.round(value)
    return `${rounded} jour${rounded === 1 ? '' : 's'}`
  }

  // Forme : valeur brute (le formatage coloré est géré par formatForme dans MatchRow)
  if (metricKey === 'form_p1' || metricKey === 'form_p2') {
    return String(value)
  }

  // Glicko RD : entier (fallback, utilisé séparément dans MatchRow)
  if (metricKey === 'glicko_rd_p1' || metricKey === 'glicko_rd_p2') {
    return Math.round(value).toString()
  }

  // Fallback : nombre arrondi sans décimale
  return Math.round(value).toString()
}
