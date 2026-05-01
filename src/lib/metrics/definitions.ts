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
    shortDescription: 'Pourcentage de points gagnés sur son propre jeu de service.',
    expertDescription:
      "Le P-Serve représente la proportion de points que le joueur gagne lorsqu'il sert. Un P-Serve de 0.65 signifie que le joueur gagne 65 % de ses points sur son service. Les serveurs d'élite dépassent régulièrement 0.68 sur dur. Cette métrique est spécifique à la surface — un joueur peut avoir un P-Serve excellent sur dur (0.68) mais moyen sur terre battue (0.61). Elle est calculée sur une fenêtre de 52 semaines glissantes, pondérée par l'importance du tournoi.",
  },
  {
    id: 'p-return',
    name: 'P-Return',
    plan: 'Pro',
    shortDescription: 'Pourcentage de points gagnés en retour de service.',
    expertDescription:
      "Le P-Return mesure la proportion de points gagnés par le joueur lorsqu'il est en position de retour. Un P-Return de 0.35 signifie que le joueur gagne 35 % des points lorsqu'il retourne. Les meilleurs returners ATP (Nadal, Djokovic) dépassent 0.38 sur terre battue. La somme P-Serve + P-Return approche 1 sur les surfaces lentes (terre battue) et descend sous 0.90 sur gazon. Cette métrique est calculée sur la même fenêtre de 52 semaines que P-Serve.",
  },
  {
    id: 'tsd',
    name: 'TSD',
    plan: 'Pro',
    shortDescription: 'Différentiel de qualité du service entre le 1er et le 2e service.',
    expertDescription:
      "Le TSD (Toss-Stability Differential) évalue la dégradation du jeu de service entre le premier et le deuxième service. Un TSD proche de 0 signifie que le joueur maintient un niveau de service constant. Un TSD négatif (ex : -0.05) indique que le deuxième service est significativement plus faible — ce qui crée une situation favorable pour l'adversaire. Un TSD positif rare signifie que le joueur joue mieux sous pression. Typiquement, les joueurs Top 10 ont un TSD entre -0.03 et +0.02.",
  },
  {
    id: 'bppi',
    name: 'BPPI',
    plan: 'Pro',
    shortDescription: 'Balance Points Per Intake — indicateur de domination globale sur le service.',
    expertDescription:
      "Le BPPI combine P-Serve et P-Return en un différentiel unique. Il est calculé comme (P-Serve − P-Return) pour chaque set, puis moyenné. Un BPPI positif signifie que le joueur domine les échanges de service (il gagne plus de points sur son service qu'il n'en concède au retour). Les serveurs purs (Isner, Opelka) ont des BPPI très positifs (>0.15). Les returners exceptionnels ont des BPPI proches de 0 ou légèrement négatifs. Une valeur proche de 0 sur terre battue est souvent signe d'un joueur complet.",
  },
  {
    id: 'map',
    name: 'MAP',
    plan: 'Free',
    shortDescription: 'Probabilité victoire modélisée — probabilité estimée de victoire du joueur.',
    expertDescription:
      "Le MAP (Model Assigned Probability) est la probabilité de victoire du joueur telle que calculée par le modèle Haurus, intégrant Glicko-2, historique surface, fatigue, repos et dynamique de forme. Elle est exprimée en pourcentage (ex : 67 %). Un MAP supérieur à la probabilité implicite du bookmaker indique un edge potentiel. Le MAP est recalculé à chaque nouveau match_stats load et ne représente pas une moyenne glissante — c'est une snapshot conditionnelle au match regardé.",
  },
]

// ── Section 2: Rating & Niveau ─────────────────────────────────────────────────

const RATING_NIVEAU_METRICS: MetricDefinition[] = [
  {
    id: 'classement-atp',
    name: 'Classement ATP',
    plan: 'Free',
    shortDescription: 'Position du joueur au classement officiel ATP au moment du match.',
    expertDescription:
      "Le classement ATP officiel au jour du match, issu de la snapshot match_stats. Il reflète le niveau de forme récent du joueur — un classement en hausse signale une dynamique positive, une chute de plusieurs ranks sur 6 mois peut indiquer une fatigue accumulée ou un problème de confiance. Le classement ATP n'intègre pas la surface ni les conditions de jeu — un joueur rank 50 peut être favori contre un rank 20 sur une surface où il domine historiquement.",
  },
  {
    id: 'glicko-2',
    name: 'Glicko-2',
    plan: 'Free',
    shortDescription: 'Système de rating dynamique intégrant le niveau et la fiabilité du joueur.',
    expertDescription:
      "Le Glicko-2 est un système de rating développé par Mark Glickman, utilisé par Haurus pour évaluer le niveau global du joueur avec une incertitude (RD — Rating Deviation). Plus le RD est faible, plus le rating est fiable. Un RD élevé (ex : >200) signifie que le joueur n'a pas joué récemment et son rating peut varier fortement au prochain match. Le Glicko-2 est spécifique à la surface — un joueur peut avoir 1750 sur dur et 1680 sur terre battue. La formule d'impact combine le différentiel de rating avec la fiabilité respective des deux joueurs.",
  },
  {
    id: 'delta-rank-6m',
    name: 'Δ Rank 6 mois',
    plan: 'Enterprise',
    shortDescription: 'Variation du classement ATP sur les 6 derniers mois — dynamique longue durée.',
    expertDescription:
      "La différence entre le classement ATP actuel et le classement ATP d'il y a 6 mois. Une valeur négative (ex : -12) signifie que le joueur a progressé de 12 places. Une valeur positive signifie une régression. Cette métrique est disponible uniquement sur le plan Enterprise car elle permet d'identifier des joueurs en reconstitution (hausse progressive du rank après une longue absence) ou en déclin progressif — signaux forts pour les paris à plus-value. Elle est calculée via la table player_stats.delta_rank_6m.",
  },
]

// ── Section 3: Forme & Dynamique ──────────────────────────────────────────────

const FORME_DYNAMIQUE_METRICS: MetricDefinition[] = [
  {
    id: 'forme',
    name: 'Forme',
    plan: 'Free',
    shortDescription: 'Historique des 5 derniers résultats — Victoires (V) et Défaites (D).',
    expertDescription:
      "Représente les 5 derniers matchs du joueur avec le résultat de chacun. L'ordre est chronologique (le plus ancien à gauche, le plus récent à droite). L'encodage est V = victoire, D = défaite, N = non-joué (wildcard, bye). Une série de 4 à 5 V consécutives signale un joueur en confiance — souvent corrélé avec un momentum positif. Une série de 3+ D consécutives peut signaler un problème physique ou mental. Attention : cette métrique ne tient pas compte de la qualité de l'adversaire battu.",
  },
  {
    id: 'win-rate-td',
    name: 'Win Rate TD',
    plan: 'Pro',
    shortDescription: 'Pourcentage de matchs gagnés sur les 30 derniers jours — dynamique récente.',
    expertDescription:
      "Le Win Rate TD (Trailing Dynamic) calcule le pourcentage de victoires sur les 30 derniers jours, toutes surfaces confondues. Un WR de 0.80 signifie 80 % de victoires sur la fenêtre récente. Cette métrique lisse les résultats courts (1-2 matchs) et donne une tendance fiable. Elle est pondérée par l'importance du match (un titre WTA 1000 compte plus qu'un ITF). Comparer le Win Rate TD au Win Rate Surface TD permet d'identifier les joueurs en forme générale mais irréguliers sur une surface donnée.",
  },
  {
    id: 'win-rate-surface-td',
    name: 'Win Rate Surface TD',
    plan: 'Pro',
    shortDescription: 'Pourcentage de victoires sur surface identique aux 30 derniers jours.',
    expertDescription:
      "Le Win Rate Surface TD calcule le pourcentage de victoires sur les 30 derniers jours UNIQUEMENT sur la surface du match regardé. Un joueur avec un Win Rate TD de 0.60 mais un Win Rate Surface TD de 0.80 sur dur indique une spécialisation surface très forte — signal pertinent pour les paris sur dur (le modèle doit capturer cet edge). Cette métrique est particulièrement discriminante entre joueurs de niveau similaire : la différence entre 0.72 et 0.85 sur dur est souvent décisive.",
  },
  {
    id: 'momentum-td',
    name: 'Momentum TD',
    plan: 'Pro',
    shortDescription: 'Indicateur de dynamique — évolution de la forme entre les 2 dernières fenêtres.',
    expertDescription:
      "Le Momentum TD compare le Win Rate de la fenêtre la plus récente (7 derniers jours) à la fenêtre précédente (7-14 jours). Un Momentum de +0.12 signifie que le joueur a gagné 12 points de win rate de plus dans la fenêtre récente. Un Momentum positif est un signal favorable même sur un joueur à win rate global moyen. Le Momentum est particulièrement utile pour les paris sur des joueurs outsiders : un Momentum +0.15 sur un joueur rank 30 contre un rank 10 à Momentum -0.05 est un edge exploitable.",
  },
  {
    id: 'breaks-won-td',
    name: 'Breaks Won TD',
    plan: 'Pro',
    shortDescription: 'Nombre moyen de breaks réalisés par match sur les 30 derniers jours.',
    expertDescription:
      "Le Breaks Won TD mesure la capacité offensive du joueur au retour — le nombre moyen de games de service adverses breakés par match. Un Breaks Won de 3.2 signifie que le joueur break en moyenne 3.2 fois par match. Les joueurs agressifs au retour (Djokovic, Zverev) dépassent 3.5 sur dur. Cette métrique est lissée sur 30 jours et normalisée par surface. Elle complète le Win Rate Surface TD : un joueur avec un win rate élevé mais peu de breaks-won pourrait gagner ses matchs en dominant ses propres jeux de service plutôt qu'en breakant.",
  },
  {
    id: 'breaks-lost-td',
    name: 'Breaks Lost TD',
    plan: 'Pro',
    shortDescription: 'Nombre moyen de breaks concédés par match sur les 30 derniers jours.',
    expertDescription:
      "Le Breaks Lost TD mesure la fragilité du jeu de service — le nombre moyen de breaks concédés par match. Un Breaks Lost de 1.8 signifie que le joueur concède en moyenne 1.8 breaks par match. Une valeur basse (proche de 1.0) indique un service solide, une valeur haute (>2.5) signale des problèmes de holding. Cette métrique est particulièrement utile pour identifier les matchs à potentiel de over/under — si les deux joueurs ont un Breaks Lost élevé, la probabilité de breaks multiples est forte. Utiliser en complément du BPPI pour une vision complète du ratio service/retour.",
  },
]

// ── Section 4: Condition physique ─────────────────────────────────────────────

const CONDITION_PHYSIQUE_METRICS: MetricDefinition[] = [
  {
    id: 'fatigue-72h',
    name: 'Fatigue 72H',
    plan: 'Free',
    shortDescription: 'Minutes de tennis jouées dans les 72 heures précédant le match.',
    expertDescription:
      "La Fatigue 72H cumule le temps de jeu (minutes) du joueur sur les 72 heures précédant le match, incluant tous les matchs et entraînements compétitifs. Une Fatigue 72H de 180 min signifie que le joueur a joué 3 heures dans les 3 derniers jours. Au-delà de 200 min, la performance diminue statistiquement de 8-12 % sur les points importants. Cette métrique est particulièrement critique en fin de Grand Slam où les joueurs enchaînent plusieurs jours sans repos. Un joueur reposé (0-30 min) face à un joueur fatigué (>150 min) est un edge significatif dans les paris sous-estimé par les bookmakers.",
  },
  {
    id: 'jours-repos',
    name: 'Jours de repos',
    plan: 'Free',
    shortDescription: 'Nombre de jours depuis le dernier match compétitif joué.',
    expertDescription:
      "Le nombre de jours depuis le dernier match compétitif du joueur. 1 jour de repos signifie que le joueur a joué hier — fatigue potentielle mais aussi rythme de match. 7+ jours de repos signifie que le joueur n'a pas joué récemment — il peut être reposé mais aussi « rouillé » (perte de timing, manque de compétition). La recherche montre une relation en U : les joueurs avec 2 à 4 jours de repos ont statistiquement les meilleurs résultats. Au-delà de 14 jours sans compétition, le risque de match référence (sans rythme) augmente significativement.",
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

// Count verification: 5 + 3 + 6 + 2 = 16
const METRIC_COUNT = ALL_METRICS.length
if (METRIC_COUNT !== 16) {
  throw new Error(
    `[MetricDefinitions] Expected 16 metrics, got ${METRIC_COUNT}. Fix the section arrays.`
  )
}
