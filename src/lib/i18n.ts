export type Locale = 'fr' | 'en'

const fr = {
  nav: {
    metrics: 'Métriques',
    pricing: 'Tarifs',
    about: 'À propos',
    dashboard: 'Dashboard',
    myProfile: 'Mon profil',
    signOut: 'Se déconnecter',
    login: 'Connexion',
    start: 'Commencer',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  hero: {
    badge: 'BÊTA DISPONIBLE',
    headline1: 'Les métriques',
    headline2: 'des bookmakers',
    headline3: 'Enfin accessibles.',
    subtitle:
      "Accédez aux données qui structurent les cotes ATP. Aucune prédiction. Uniquement des métriques fiables et exploitables.",
    ctaPrimary: 'Commencer',
    ctaSecondary: 'Voir les métriques',
    socialProof: 'Analyse quantitative · Avantage informationnel · Données sans biais',
    mockup: {
      tabTitle: 'Stats ATP',
      nav: {
        overview: 'Aperçu',
        analytics: 'Analytique',
        players: 'Joueurs',
        metrics: 'Métriques',
      },
      dataStatus: 'État des données',
      live: 'En direct',
      period: '30 derniers jours',
      overview: 'Aperçu',
      overviewSubtitle: 'Métriques en temps réel des joueurs ATP.',
      metrics: {
        glickoDifferential: 'Différentiel Glicko-2',
        winRate: 'Taux de victoire (Terre battue)',
        servicePoints: 'Points gagnés au service',
      },
      peak: 'Pic',
    },
  },
  ctaBanner: {
    title: 'Prêt à analyser comme un PRO',
    subtitle:
      "Devenez de vrais analystes qui ajustent leur décision grâce à des données, pas sur les intuitions.",
    cta: 'Commencer maintenant',
    disclaimer: "Pas de prédiction. Pas d'intuition. Seulement des données.",
  },
  pricing: {
    sectionTag: 'Accès Beta',
    sectionTitle: 'Rejoignez la communauté Haurus',
    sectionSubtitle:
      "Accédez en avant-première à l'outil d'analyse tennis le plus avancé.",
    betaLimited: 'Accès limité',
    betaTitle: 'Accès Beta',
    betaDesc: 'Accès complet. Gratuit pendant la bêta.',
    betaFeatures: [
      'Toutes les métriques ATP',
      'Profils joueurs avec historique',
      'Tableau comparatif des matchs',
      'Tous les tournois ATP',
      'Accès à toutes les surfaces',
      'Accès nouvelles metriques à venir',
      'Accès notification Telegram',
    ],
    betaPrice: 'Gratuit',
    betaPriceSuffix: 'pendant la période beta',
    betaCta: 'Rejoindre la beta',
    betaDisclaimer:
      'En rejoignant la beta, vous acceptez que certaines fonctionnalités soient encore en développement.',
  },
  whyHaurus: {
    sectionTag: 'Plateforme de données',
    sectionTitle: "Pensé pour l'analyse",
    sectionSubtitle:
      "Haurus fournit les données pour faciliter votre analyse, en transformant chaque match en informations exploitables.",
    points: {
      data: {
        title: 'Les données derrière les décisions du marché',
        description:
          'Des modèles comme Glicko-2 aux métriques de performance point par point, Haurus rassemble les indicateurs essentiels en un seul endroit.',
      },
      noPredictions: {
        title: 'Pas de prédictions. Pas de conseils.',
        description:
          "Nous ne donnons pas d'avis. Nous exposons les métriques pour que vous construisiez votre propre analyse.",
      },
      context: {
        title: 'Le contexte plutôt que l intuition',
        description:
          "Surface, fatigue, dynamique. Haurus structure les facteurs clés pour lire un match avec des données, pas du ressenti.",
      },
    },
  },
  socialProof: {
    stat1Label: 'matchs analysés',
    stat2Label: 'joueurs suivis',
    stat3Label: 'mise à jour',
  },
  metricsShowcase: {
    sectionTag: 'Données avancées',
    sectionTitle: 'La structure analytique',
    sectionSubtitle:
      "Seize métriques. Chacune capture une dimension clé de la performance d'un joueur utilisée par les bookmakers. Toutes réunies au même endroit.",
    glicko2: {
      title: 'Glicko-2',
      subtitle: 'Classement par surface · Intervalle de confiance',
    },
    pServe: {
      title: 'p_serve / p_return',
      subtitle: 'Points gagnés au service et au retour',
      firstServe: '1er service gagné',
      returnPts: 'Pts de retour gagnés',
    },
    tsd: {
      title: 'TSD',
      subtitle: 'Indice de dominance au service',
      vsAvg: '+0.72 vs moyenne ATP',
    },
    bppi: {
      title: 'BPPI',
      subtitle: 'Indice de performance sur balles de break',
      label: 'indice de résistance sur balles de break au centième',
    },
    momentum: {
      title: 'Momentum TD',
      subtitle: 'Mesure la dynamique actuelle du joueur',
      label: 'Momentum sur 30 jours',
    },
  },
  footer: {
    product: 'Produit',
    legal: 'Mentions légales',
    company: 'Entreprise',
    productLinks: ['Métriques', 'Tarifs', 'Docs API', 'Changelog'],
    legalLinks: ['Confidentialité', 'CGU', 'Avertissement'],
    companyLinks: ['À propos', 'Contact', 'Blog'],
    tagline: 'Pas de prédiction. Des données.',
    description:
      'Des métriques ATP conçues pour analyser le jeu. Pas de prédictions. Pas de biais.',
    copyright: '© 2026 Haurus. Tous droits réservés.',
    disclaimer:
      'Haurus fournit uniquement des données statistiques. Pas de predictions ni de conseils de pari. Toutes les données sont à titre informatif uniquement.',
  },
  auth: {
    login: {
      title: 'Connexion',
      subtitle: 'Accédez à votre compte Haurus',
      emailLabel: 'Adresse email',
      emailPlaceholder: 'alex@example.com',
      passwordLabel: 'Mot de passe',
      passwordPlaceholder: '••••••••',
      submitButton: 'Se connecter',
      submitButtonLoading: 'Connexion...',
      submitButtonRedirecting: 'Redirection...',
      separator: 'ou',
      googleButton: 'Se connecter avec Google',
      googleButtonLoading: 'Redirection...',
      linkToSignup: 'Pas encore de compte ?',
      linkToSignupAction: 'Créer un compte',
      errorGeneric: 'Une erreur est survenue.',
    },
    signup: {
      title: 'Créer un compte',
      subtitle: 'Rejoignez Haurus et accédez à vos métriques',
      nameLabel: 'Nom',
      namePlaceholder: 'Alex Dupont',
      emailLabel: 'Adresse email',
      emailPlaceholder: 'alex@example.com',
      passwordLabel: 'Mot de passe',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmer le mot de passe',
      confirmPasswordPlaceholder: '••••••••',
      submitButton: 'Créer mon compte',
      submitButtonLoading: 'Création...',
      submitButtonRedirecting: 'Redirection...',
      separator: 'ou',
      googleButton: 'Créer un compte avec Google',
      googleButtonLoading: 'Redirection...',
      linkToLogin: 'Déjà un compte ?',
      linkToLoginAction: 'Se connecter',
      errorGeneric: 'Une erreur est survenue.',
    },
  },
}

const en = {
  nav: {
    metrics: 'Metrics',
    pricing: 'Pricing',
    about: 'About',
    dashboard: 'Dashboard',
    myProfile: 'My profile',
    signOut: 'Sign out',
    login: 'Login',
    start: 'Get started',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    badge: 'BETA AVAILABLE',
    headline1: 'The metrics',
    headline2: 'bookmakers use',
    headline3: 'Now yours.',
    subtitle:
      'Access the data that shapes ATP odds. No predictions. Only reliable, actionable metrics.',
    ctaPrimary: 'Get started',
    ctaSecondary: 'View metrics',
    socialProof: 'Quantitative analysis · Informational edge · Unbiased data',
    mockup: {
      tabTitle: 'ATP Stats',
      nav: {
        overview: 'Overview',
        analytics: 'Analytics',
        players: 'Players',
        metrics: 'Metrics',
      },
      dataStatus: 'Data status',
      live: 'Live',
      period: 'Last 30 days',
      overview: 'Overview',
      overviewSubtitle: 'Real-time ATP player metrics.',
      metrics: {
        glickoDifferential: 'Glicko-2 differential',
        winRate: 'Win rate (Clay)',
        servicePoints: 'Service points won',
      },
      peak: 'Peak',
    },
  },
  ctaBanner: {
    title: 'Ready to analyse like a PRO',
    subtitle:
      'Become analysts who base their decisions on data, not gut feelings.',
    cta: 'Start now',
    disclaimer: 'No prediction. No intuition. Just data.',
  },
  pricing: {
    sectionTag: 'Beta Access',
    sectionTitle: 'Join the Haurus community',
    sectionSubtitle:
      'Get early access to the most advanced tennis analytics tool.',
    betaLimited: 'Limited access',
    betaTitle: 'Beta Access',
    betaDesc: 'Full access. Free during beta.',
    betaFeatures: [
      'All ATP metrics',
      'Player profiles with history',
      'Match comparison table',
      'All ATP tournaments',
      'All surfaces',
      'Access to upcoming metrics',
      'Telegram notifications access',
    ],
    betaPrice: 'Free',
    betaPriceSuffix: 'during the beta period',
    betaCta: 'Join the beta',
    betaDisclaimer:
      'By joining the beta, you agree that some features are still under development.',
  },
  whyHaurus: {
    sectionTag: 'Data platform',
    sectionTitle: 'Built for analysis',
    sectionSubtitle:
      'Haurus provides data to support your analysis, turning every match into actionable insights.',
    points: {
      data: {
        title: 'The data behind market decisions',
        description:
          'From Glicko-2 models to point-by-point performance metrics, Haurus brings together the essential indicators in one place.',
      },
      noPredictions: {
        title: 'No predictions. No tips.',
        description:
          "We don't give opinions. We expose the metrics so you can build your own analysis.",
      },
      context: {
        title: 'Context over intuition',
        description:
          'Surface, fatigue, momentum. Haurus structures the key factors to read a match with data, not gut feeling.',
      },
    },
  },
  socialProof: {
    stat1Label: 'matches analysed',
    stat2Label: 'players tracked',
    stat3Label: 'updates per day',
  },
  metricsShowcase: {
    sectionTag: 'Advanced data',
    sectionTitle: 'The analytical structure',
    sectionSubtitle:
      'Sixteen metrics. Each captures a key dimension of player performance used by bookmakers. All in one place.',
    glicko2: {
      title: 'Glicko-2',
      subtitle: 'Surface ranking · Confidence interval',
    },
    pServe: {
      title: 'p_serve / p_return',
      subtitle: 'Points won on serve and return',
      firstServe: '1st serve won',
      returnPts: 'Return pts won',
    },
    tsd: {
      title: 'TSD',
      subtitle: 'Serve dominance index',
      vsAvg: '+0.72 vs ATP average',
    },
    bppi: {
      title: 'BPPI',
      subtitle: 'Break point performance index',
      label: 'break point resistance index to the hundredth',
    },
    momentum: {
      title: 'Momentum TD',
      subtitle: 'Measures current player momentum',
      label: 'Momentum over 30 days',
    },
  },
  footer: {
    product: 'Product',
    legal: 'Legal',
    company: 'Company',
    productLinks: ['Metrics', 'Pricing', 'API Docs', 'Changelog'],
    legalLinks: ['Privacy', 'Terms', 'Disclaimer'],
    companyLinks: ['About', 'Contact', 'Blog'],
    tagline: 'No prediction. Just data.',
    description:
      'ATP metrics designed to analyse the game. No predictions. No bias.',
    copyright: '© 2026 Haurus. All rights reserved.',
    disclaimer:
      'Haurus provides statistical data only. No predictions or betting tips. All data is for informational purposes only.',
  },
  auth: {
    login: {
      title: 'Sign in',
      subtitle: 'Access your Haurus account',
      emailLabel: 'Email address',
      emailPlaceholder: 'alex@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      submitButton: 'Sign in',
      submitButtonLoading: 'Signing in...',
      submitButtonRedirecting: 'Redirecting...',
      separator: 'or',
      googleButton: 'Sign in with Google',
      googleButtonLoading: 'Redirecting...',
      linkToSignup: "Don't have an account?",
      linkToSignupAction: 'Create one',
      errorGeneric: 'Something went wrong.',
    },
    signup: {
      title: 'Create an account',
      subtitle: 'Join Haurus and access your metrics',
      nameLabel: 'Full name',
      namePlaceholder: 'Alex Dupont',
      emailLabel: 'Email address',
      emailPlaceholder: 'alex@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm password',
      confirmPasswordPlaceholder: '••••••••',
      submitButton: 'Create my account',
      submitButtonLoading: 'Creating account...',
      submitButtonRedirecting: 'Redirecting...',
      separator: 'or',
      googleButton: 'Sign up with Google',
      googleButtonLoading: 'Redirecting...',
      linkToLogin: 'Already have an account?',
      linkToLoginAction: 'Sign in',
      errorGeneric: 'Something went wrong.',
    },
  },
}

const translations: Record<Locale, typeof fr> = { fr, en }

/**
 * Returns the full translation object for the given locale.
 */
export function getTranslations(locale: Locale) {
  return translations[locale]
}
