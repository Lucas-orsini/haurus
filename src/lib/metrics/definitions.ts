/**
 * MetricDefinitions — Centralised, static definitions for Haurus analytics metrics.
 *
 * Consumed by dashboard components that render the "Comprendre les métriques" page.
 * No Supabase calls, no dynamic logic — purely static data.
 *
 * Types exported so the frontend can consume them via import type.
 *
 * ── Migration to translation keys ─────────────────────────────────────────────
 * This file has been refactored to use translation key fields (nameKey,
 * shortDescriptionKey, expertDescriptionKey, titleKey) that point to keys in
 * src/lib/i18n/dictionaries/{en,fr}.ts. The original string fields are kept
 * as optional fallbacks for consumers that have not yet been migrated to the
 * translation system. Once all consumers are updated, the fallback fields can
 * be removed.
 *
 * ── Known consumers that still read metric.name / section.title directly ────────
 *   • src/components/dashboard/player/PlayerMetricCards.tsx
 *     → Displays "Glicko-2", "P-Serve", "Momentum TD" as hardcoded labels.
 *       Needs migration: use t('metrics.details.metrics.glicko2.name') etc.
 *   • src/components/dashboard/MatchRow.tsx
 *     → Defines its own METRIC_DEFS local array with French labels.
 *       Independent from this file — does not consume MetricDefinition.name.
 *   • src/components/dashboard/player/PlayerStatsChart.tsx
 *     → Has its own METRICS array with hardcoded labels.
 *       Independent from this file — does not consume MetricDefinition.name.
 *   • src/components/dashboard/player/MatchHistoryTable.tsx
 *     → Does not consume metric names directly.
 * ──────────────────────────────────────────────────────────────────────────────
 */

// ── Types ─────────────────────────────────────────────────────────────────────

/**
 * One metric entry shown on the education page.
 *
 * Translation key fields (nameKey, shortDescriptionKey, expertDescriptionKey)
 * point into the i18n dictionaries and are the primary source for UI text.
 * The fallback string fields (name, shortDescription, expertDescription) are
 * kept for backward compatibility with consumers not yet migrated — they contain
 * the same values as the French dictionary.
 */
export interface MetricDefinition {
  /** Stable unique identifier used for React key and toggle tracking. */
  id: string

  /**
   * Display name of the metric (e.g. "P-Serve", "Classement ATP").
   * @deprecated Use nameKey + t(nameKey) instead. Kept as fallback.
   */
  name: string

  /**
   * Translation key for the metric name.
   * Resolved in MetricsEducationClient via t('metrics.details.metrics.{camelCaseId}.name').
   */
  nameKey: string

  /**
   * Required plan badge.
   * - 'Free'       — visible to all authenticated users
   * - 'Pro'        — visible to Pro plan users
   * - 'Enterprise' — visible to Enterprise plan users
   */
  plan: 'Free' | 'Pro' | 'Enterprise'

  /**
   * Short explanation — always visible in card default state.
   * @deprecated Use shortDescriptionKey + t(shortDescriptionKey) instead. Kept as fallback.
   */
  shortDescription: string

  /**
   * Translation key for the short description.
   * Resolved in MetricsEducationClient via
   * t('metrics.details.metrics.{camelCaseId}.shortDescription').
   */
  shortDescriptionKey: string

  /**
   * Expert explanation — visible only when card is expanded or "Vue experte" is active.
   * @deprecated Use expertDescriptionKey + t(expertDescriptionKey) instead. Kept as fallback.
   */
  expertDescription: string

  /**
   * Translation key for the expert description.
   * Resolved in MetricsEducationClient via
   * t('metrics.details.metrics.{camelCaseId}.expertDescription').
   */
  expertDescriptionKey: string
}

/**
 * One thematic section containing an ordered list of metrics.
 *
 * titleKey replaces the literal title string with a translation key.
 * The title field is kept as fallback for consumers that read section.title directly.
 */
export interface MetricSection {
  /**
   * Section display title.
   * @deprecated Use titleKey + t(titleKey) instead. Kept as fallback.
   */
  title: string

  /**
   * Translation key for the section title.
   * Resolved in MetricsEducationClient via
   * t('metrics.details.sections.{camelCaseSectionKey}').
   */
  titleKey: string

  metrics: MetricDefinition[]
}

// ── Helper: build translation key for a metric id ────────────────────────────

/**
 * Converts a metric id (kebab-case) to its camelCase dictionary key.
 * E.g. "p-serve" → "pServe", "classement-atp" → "classementAtp"
 */
function toCamelCase(id: string): string {
  return id.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
}

// ── Section 1: Service & Retour ───────────────────────────────────────────────

const SERVICE_RETOUR_METRICS: MetricDefinition[] = [
  {
    id: 'p-serve',
    name: 'P-Serve',
    nameKey: 'metrics.details.metrics.pServe.name',
    plan: 'Pro',
    shortDescription: 'Probabilité de remporter un point au service.',
    shortDescriptionKey: 'metrics.details.metrics.pServe.shortDescription',
    expertDescription:
      'Calculée sur les matchs récents du joueur, pondérée par surface. Plus la valeur est proche de 100%, plus le joueur est dominant au service.',
    expertDescriptionKey: 'metrics.details.metrics.pServe.expertDescription',
  },
  {
    id: 'p-return',
    name: 'P-Return',
    nameKey: 'metrics.details.metrics.pReturn.name',
    plan: 'Pro',
    shortDescription: 'Probabilité de remporter un point en retour de service.',
    shortDescriptionKey: 'metrics.details.metrics.pReturn.shortDescription',
    expertDescription:
      'Calculée sur les matchs récents. Elle reflète la capacité globale à gêner l\'adversaire sur son service. Plus la valeur est haute, plus le joueur est efficace en retour.',
    expertDescriptionKey: 'metrics.details.metrics.pReturn.expertDescription',
  },
  {
    id: 'tsd',
    name: 'TSD',
    nameKey: 'metrics.details.metrics.tsd.name',
    plan: 'Pro',
    shortDescription:
      'Score comparatif du service par rapport à la moyenne ATP sur cette surface.',
    shortDescriptionKey: 'metrics.details.metrics.tsd.shortDescription',
    expertDescription:
      "Un score positif indique que le joueur est au-dessus de la moyenne ATP sur cette surface, négatif qu'il est en dessous. Permet de comparer des joueurs de niveaux différents sur un pied d'égalité.",
    expertDescriptionKey: 'metrics.details.metrics.tsd.expertDescription',
  },
  {
    id: 'bppi',
    name: 'BPPI',
    nameKey: 'metrics.details.metrics.bppi.name',
    plan: 'Pro',
    shortDescription: 'Mesure la résistance du joueur sur les balles de break.',
    shortDescriptionKey: 'metrics.details.metrics.bppi.shortDescription',
    expertDescription:
      "Un score positif indique qu'il sauve plus de balles de break que ce que ses statistiques de service laissent attendre — signe de solidité mentale sur les moments clés.",
    expertDescriptionKey: 'metrics.details.metrics.bppi.expertDescription',
  },
]

// ── Section 2: Rating & Niveau ────────────────────────────────────────────────

const RATING_NIVEAU_METRICS: MetricDefinition[] = [
  {
    id: 'classement-atp',
    name: 'Classement ATP',
    nameKey: 'metrics.details.metrics.classementAtp.name',
    plan: 'Free',
    shortDescription: 'Rang officiel ATP du joueur.',
    shortDescriptionKey: 'metrics.details.metrics.classementAtp.shortDescription',
    expertDescription:
      "Donne une indication du niveau général mais ne reflète pas les spécificités par surface ni la forme récente.",
    expertDescriptionKey: 'metrics.details.metrics.classementAtp.expertDescription',
  },
  {
    id: 'glicko-2',
    name: 'Glicko-2',
    nameKey: 'metrics.details.metrics.glicko2.name',
    plan: 'Free',
    shortDescription:
      'Système de rating calculé séparément pour chaque surface.',
    shortDescriptionKey: 'metrics.details.metrics.glicko2.shortDescription',
    expertDescription:
      'Plus précis que le classement ATP car il se met à jour après chaque match et intègre l\'incertitude autour du niveau du joueur. Plus la valeur est haute, plus le joueur est fort sur cette surface.',
    expertDescriptionKey: 'metrics.details.metrics.glicko2.expertDescription',
  },
  {
    id: 'delta-rank-6m',
    name: 'Δ Rank 6 mois',
    nameKey: 'metrics.details.metrics.deltaRank6m.name',
    plan: 'Enterprise',
    shortDescription:
      'Évolution du classement ATP sur les 6 derniers mois.',
    shortDescriptionKey: 'metrics.details.metrics.deltaRank6m.shortDescription',
    expertDescription:
      "Une valeur négative signifie que le joueur a progressé au classement, positive qu'il a reculé. Permet de détecter les joueurs en montée ou en décrochage sur le moyen terme.",
    expertDescriptionKey: 'metrics.details.metrics.deltaRank6m.expertDescription',
  },
]

// ── Section 3: Forme & Dynamique ────────────────────────────────────────────────

const FORME_DYNAMIQUE_METRICS: MetricDefinition[] = [
  {
    id: 'forme',
    name: 'Forme',
    nameKey: 'metrics.details.metrics.forme.name',
    plan: 'Free',
    shortDescription: 'Résultats des 5 derniers matchs joués.',
    shortDescriptionKey: 'metrics.details.metrics.forme.shortDescription',
    expertDescription:
      'V = victoire, D = défaite. Les matchs sont affichés du plus ancien au plus récent. Donne une lecture immédiate de la séquence de résultats récents.',
    expertDescriptionKey: 'metrics.details.metrics.forme.expertDescription',
  },
  {
    id: 'win-rate-td',
    name: 'Win Rate TD',
    nameKey: 'metrics.details.metrics.winRateTd.name',
    plan: 'Pro',
    shortDescription:
      'Pourcentage de victoires récentes toutes surfaces confondues.',
    shortDescriptionKey: 'metrics.details.metrics.winRateTd.shortDescription',
    expertDescription:
      'Les matchs récents ont plus de poids que les anciens. Reflète la tendance générale du joueur en ce moment.',
    expertDescriptionKey: 'metrics.details.metrics.winRateTd.expertDescription',
  },
  {
    id: 'win-rate-surface-td',
    name: 'Win Rate Surface TD',
    nameKey: 'metrics.details.metrics.winRateSurfaceTd.name',
    plan: 'Pro',
    shortDescription:
      "Pourcentage de victoires récentes sur la surface de ce tournoi.",
    shortDescriptionKey: 'metrics.details.metrics.winRateSurfaceTd.shortDescription',
    expertDescription:
      "Deux joueurs de niveau global similaire peuvent avoir des écarts importants selon la surface. Cette métrique capture directement la performance sur la surface jouée.",
    expertDescriptionKey: 'metrics.details.metrics.winRateSurfaceTd.expertDescription',
  },
  {
    id: 'momentum-td',
    name: 'Momentum TD',
    nameKey: 'metrics.details.metrics.momentumTd.name',
    plan: 'Pro',
    shortDescription:
      "Compare la forme très récente à la forme habituelle sur cette surface.",
    shortDescriptionKey: 'metrics.details.metrics.momentumTd.shortDescription',
    expertDescription:
      "Une valeur positive signifie que le joueur surperforme par rapport à son niveau habituel en ce moment. Négative, il est en dessous. Détecte les joueurs en montée ou en descente de forme.",
    expertDescriptionKey: 'metrics.details.metrics.momentumTd.expertDescription',
  },
  {
    id: 'breaks-won-td',
    name: 'Breaks Won TD',
    nameKey: 'metrics.details.metrics.breaksWonTd.name',
    plan: 'Pro',
    shortDescription:
      'Nombre moyen de breaks réalisés par match sur cette surface.',
    shortDescriptionKey: 'metrics.details.metrics.breaksWonTd.shortDescription',
    expertDescription:
      'Mesure la capacité à concrétiser les opportunités sur le service adverse. Un joueur qui breake souvent exerce une pression constante.',
    expertDescriptionKey: 'metrics.details.metrics.breaksWonTd.expertDescription',
  },
  {
    id: 'breaks-lost-td',
    name: 'Breaks Lost TD',
    nameKey: 'metrics.details.metrics.breaksLostTd.name',
    plan: 'Pro',
    shortDescription:
      'Nombre moyen de breaks concédés par match sur cette surface.',
    shortDescriptionKey: 'metrics.details.metrics.breaksLostTd.shortDescription',
    expertDescription:
      "Plus la valeur est basse, mieux le joueur tient son service sous pression. Indicateur de solidité sur les moments décisifs.",
    expertDescriptionKey: 'metrics.details.metrics.breaksLostTd.expertDescription',
  },
]

// ── Section 4: Condition physique ─────────────────────────────────────────────

const CONDITION_PHYSIQUE_METRICS: MetricDefinition[] = [
  {
    id: 'fatigue-72h',
    name: 'Fatigue 72H',
    nameKey: 'metrics.details.metrics.fatigue72h.name',
    plan: 'Free',
    shortDescription:
      'Charge physique accumulée dans les 72 heures avant le match.',
    shortDescriptionKey: 'metrics.details.metrics.fatigue72h.shortDescription',
    expertDescription:
      "Cumul des minutes jouées dans ce tournoi et dans les 72 heures précédant le match. Plus cette valeur est haute, plus le joueur aborde ce match fatigué.",
    expertDescriptionKey: 'metrics.details.metrics.fatigue72h.expertDescription',
  },
  {
    id: 'jours-repos',
    name: 'Jours de repos',
    nameKey: 'metrics.details.metrics.joursRepos.name',
    plan: 'Free',
    shortDescription: 'Nombre de jours depuis le dernier match joué.',
    shortDescriptionKey: 'metrics.details.metrics.joursRepos.shortDescription',
    expertDescription:
      "Reflète la fraîcheur physique du joueur. Ni trop peu ni trop de repos n'est objectivement meilleur — c'est un élément de contexte.",
    expertDescriptionKey: 'metrics.details.metrics.joursRepos.expertDescription',
  },
]

// ── Exported sections (fixed order) ─────────────────────────────────────────

export const METRIC_SECTIONS: MetricSection[] = [
  {
    title: 'Service & Retour',
    titleKey: 'metrics.details.sections.serviceRetour',
    metrics: SERVICE_RETOUR_METRICS,
  },
  {
    title: 'Rating & Niveau',
    titleKey: 'metrics.details.sections.ratingNiveau',
    metrics: RATING_NIVEAU_METRICS,
  },
  {
    title: 'Forme & Dynamique',
    titleKey: 'metrics.details.sections.formeDynamique',
    metrics: FORME_DYNAMIQUE_METRICS,
  },
  {
    title: 'Condition physique',
    titleKey: 'metrics.details.sections.conditionPhysique',
    metrics: CONDITION_PHYSIQUE_METRICS,
  },
]

/**
 * Flat list of all 15 metric definitions.
 * Useful for search/filter operations that don't need section context.
 */
export const ALL_METRICS: MetricDefinition[] = METRIC_SECTIONS.flatMap((s) => s.metrics)

// Count verification: 4 + 3 + 6 + 2 = 15
const METRIC_COUNT = ALL_METRICS.length
if (METRIC_COUNT !== 15) {
  throw new Error(
    `[MetricDefinitions] Expected 15 metrics, got ${METRIC_COUNT}. Fix the section arrays.`
  )
}
