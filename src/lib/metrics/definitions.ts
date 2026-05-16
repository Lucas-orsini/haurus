/**
 * MetricDefinitions — Centralised, static definitions for Haurus analytics metrics.
 *
 * Consumed by dashboard components that render the "Comprendre les métriques" page.
 * No Supabase calls, no dynamic logic — purely static data.
 *
 * Types exported so the frontend can consume them via import type.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

/** One metric entry shown on the education page. */
export interface MetricDefinition {
  /** Stable unique identifier used for React key and toggle tracking. */
  id: string

  /** Display name of the metric (e.g. "P-Serve", "Classement ATP"). */
  name: string

  /**
   * Required plan badge.
   * - 'Free'       — visible to all authenticated users
   * - 'Pro'        — visible to Pro plan users
   * - 'Enterprise' — visible to Enterprise plan users
   */
  plan: 'Free' | 'Pro' | 'Enterprise'

  /** Short explanation — always visible in card default state. */
  shortDescription: string

  /** Expert explanation — visible only when card is expanded or "Vue experte" is active. */
  expertDescription: string
}

/** One thematic section containing an ordered list of metrics. */
export interface MetricSection {
  title: string
  metrics: MetricDefinition[]
}

// ── Section 1: Service & Retour ───────────────────────────────────────────────

const SERVICE_RETOUR_METRICS: MetricDefinition[] = [
  {
    id: 'p-serve',
    name: 'P-Serve',
    plan: 'Pro',
    shortDescription: 'Probabilité de remporter un point au service.',
    expertDescription:
      'Calculée sur les matchs récents du joueur, pondérée par surface. Plus la valeur est proche de 100%, plus le joueur est dominant au service.',
  },
  {
    id: 'p-return',
    name: 'P-Return',
    plan: 'Pro',
    shortDescription: 'Probabilité de remporter un point en retour de service.',
    expertDescription:
      'Calculée sur les matchs récents. Elle reflète la capacité globale à gêner l\'adversaire sur son service. Plus la valeur est haute, plus le joueur est efficace en retour.',
  },
  {
    id: 'tsd',
    name: 'TSD',
    plan: 'Pro',
    shortDescription: 'Score comparatif du service par rapport à la moyenne ATP sur cette surface.',
    expertDescription:
      "Un score positif indique que le joueur est au-dessus de la moyenne ATP sur cette surface, négatif qu'il est en dessous. Permet de comparer des joueurs de niveaux différents sur un pied d'égalité.",
  },
  {
    id: 'bppi',
    name: 'BPPI',
    plan: 'Pro',
    shortDescription: 'Mesure la résistance du joueur sur les balles de break.',
    expertDescription:
      "Un score positif indique qu'il sauve plus de balles de break que ce que ses statistiques de service laissent attendre — signe de solidité mentale sur les moments clés.",
  },
]

// ── Section 2: Rating & Niveau ─────────────────────────────────────────────────

const RATING_NIVEAU_METRICS: MetricDefinition[] = [
  {
    id: 'classement-atp',
    name: 'Classement ATP',
    plan: 'Free',
    shortDescription: 'Rang officiel ATP du joueur.',
    expertDescription:
      "Donne une indication du niveau général mais ne reflète pas les spécificités par surface ni la forme récente.",
  },
  {
    id: 'glicko-2',
    name: 'Glicko-2',
    plan: 'Free',
    shortDescription: 'Système de rating calculé séparément pour chaque surface.',
    expertDescription:
      'Plus précis que le classement ATP car il se met à jour après chaque match et intègre l\'incertitude autour du niveau du joueur. Plus la valeur est haute, plus le joueur est fort sur cette surface.',
  },
  {
    id: 'delta-rank-6m',
    name: 'Δ Rank 6 mois',
    plan: 'Enterprise',
    shortDescription: 'Évolution du classement ATP sur les 6 derniers mois.',
    expertDescription:
      "Une valeur négative signifie que le joueur a progressé au classement, positive qu'il a reculé. Permet de détecter les joueurs en train de monter ou de décrocher sur le moyen terme.",
  },
]

// ── Section 3: Forme & Dynamique ──────────────────────────────────────────────

const FORME_DYNAMIQUE_METRICS: MetricDefinition[] = [
  {
    id: 'forme',
    name: 'Forme',
    plan: 'Free',
    shortDescription: 'Résultats des 5 derniers matchs joués.',
    expertDescription:
      'V = victoire, D = défaite. Les matchs sont affichés du plus ancien au plus récent. Donne une lecture immédiate de la séquence de résultats récents.',
  },
  {
    id: 'win-rate-td',
    name: 'Win Rate TD',
    plan: 'Pro',
    shortDescription: 'Pourcentage de victoires récentes toutes surfaces confondues.',
    expertDescription:
      'Les matchs récents ont plus de poids que les anciens. Reflète la tendance générale du joueur en ce moment.',
  },
  {
    id: 'win-rate-surface-td',
    name: 'Win Rate Surface TD',
    plan: 'Pro',
    shortDescription: "Pourcentage de victoires récentes sur la surface de ce tournoi.",
    expertDescription:
      "Deux joueurs de niveau global similaire peuvent avoir des écarts importants selon la surface. Cette métrique capture directement la performance sur la surface jouée.",
  },
  {
    id: 'momentum-td',
    name: 'Momentum TD',
    plan: 'Pro',
    shortDescription: "Compare la forme très récente à la forme habituelle sur cette surface.",
    expertDescription:
      "Une valeur positive signifie que le joueur surperforme par rapport à son niveau habituel en ce moment. Négative, il est en dessous. Détecte les joueurs en montée ou en descente de forme.",
  },
  {
    id: 'breaks-won-td',
    name: 'Breaks Won TD',
    plan: 'Pro',
    shortDescription: 'Nombre moyen de breaks réalisés par match sur cette surface.',
    expertDescription:
      'Mesure la capacité à concrétiser les opportunités sur le service adverse. Un joueur qui breake souvent exerce une pression constante.',
  },
  {
    id: 'breaks-lost-td',
    name: 'Breaks Lost TD',
    plan: 'Pro',
    shortDescription: 'Nombre moyen de breaks concédés par match sur cette surface.',
    expertDescription:
      "Plus la valeur est basse, mieux le joueur tient son service sous pression. Indicateur de solidité sur les moments décisifs.",
  },
]

// ── Section 4: Condition physique ─────────────────────────────────────────────

const CONDITION_PHYSIQUE_METRICS: MetricDefinition[] = [
  {
    id: 'fatigue-72h',
    name: 'Fatigue 72H',
    plan: 'Free',
    shortDescription: 'Charge physique accumulée dans les 72 heures avant le match.',
    expertDescription:
      "Cumul des minutes jouées dans ce tournoi et dans les 72 heures précédant le match. Plus cette valeur est haute, plus le joueur aborde ce match fatigué.",
  },
  {
    id: 'jours-repos',
    name: 'Jours de repos',
    plan: 'Free',
    shortDescription: 'Nombre de jours depuis le dernier match joué.',
    expertDescription:
      "Reflète la fraîcheur physique du joueur. Ni trop peu ni trop de repos n'est objectivement meilleur — c'est un élément de contexte.",
  },
]

// ── Exported sections (fixed order) ───────────────────────────────────────────

export const METRIC_SECTIONS: MetricSection[] = [
  { title: 'Service & Retour', metrics: SERVICE_RETOUR_METRICS },
  { title: 'Rating & Niveau', metrics: RATING_NIVEAU_METRICS },
  { title: 'Forme & Dynamique', metrics: FORME_DYNAMIQUE_METRICS },
  { title: 'Condition physique', metrics: CONDITION_PHYSIQUE_METRICS },
]

/**
 * Flat list of all 16 metric definitions.
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
