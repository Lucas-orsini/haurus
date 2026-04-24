```tsx:src/components/layout/LanguageSwitcher.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-sm font-medium border border-white/20"
      aria-label={t('switchLanguage')}
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase font-bold">{locale}</span>
    </button>
  );
}
```

```tsx:src/components/layout/Navbar.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Tennis } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Tennis className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Haurus
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#features"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            {t('features')}
          </a>
          <a
            href="#pricing"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            {t('pricing')}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
```

```tsx:src/components/sections/MetricsShowcase.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Zap, Activity, TrendingUp, Target, Timer, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const metrics = [
  {
    icon: Zap,
    key: 'glicko2',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Layers,
    key: 'surface',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Target,
    key: 'serve',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Activity,
    key: 'return',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Timer,
    key: 'momentum',
    color: 'from-red-400 to-rose-500',
  },
  {
    icon: TrendingUp,
    key: 'rank',
    color: 'from-indigo-400 to-violet-500',
  },
];

export default function MetricsShowcase() {
  const t = useTranslations('metrics');

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div
                className={cn(
                  'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br',
                  metric.color,
                  'blur-xl -z-10'
                )}
              />
              <div
                className={cn(
                  'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4',
                  metric.color
                )}
              >
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t(`${metric.key}.title`)}
              </h3>
              <p className="text-white/60">
                {t(`${metric.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

```tsx:src/components/sections/Pricing.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    key: 'starter',
    color: 'from-gray-500 to-gray-600',
    highlight: false,
  },
  {
    key: 'analyst',
    color: 'from-blue-500 to-purple-600',
    highlight: true,
  },
  {
    key: 'pro',
    color: 'from-amber-500 to-orange-600',
    highlight: false,
  },
];

export default function Pricing() {
  const t = useTranslations('pricing');

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'relative p-8 rounded-2xl border transition-all duration-300',
                plan.highlight
                  ? 'bg-gradient-to-b from-blue-500/20 to-purple-500/20 border-blue-500/50 scale-105'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white">
                  {t('popular')}
                </div>
              )}

              <div
                className={cn(
                  'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4',
                  plan.color
                )}
              >
                <span className="text-xl font-bold text-white">
                  {t(`${plan.key}.icon`)}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {t(`${plan.key}.name`)}
              </h3>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {t(`${plan.key}.price`)}
                </span>
                <span className="text-white/60 ml-1">
                  {t('perMonth')}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{t(`${plan.key}.feature${i}`)}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  'w-full py-3 rounded-xl font-bold transition-all duration-200',
                  plan.highlight
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                )}
              >
                {t('getStarted')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

```tsx:src/components/sections/SocialProof.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    key: 'testimonial1',
  },
  {
    key: 'testimonial2',
  },
  {
    key: 'testimonial3',
  },
];

export default function SocialProof() {
  const t = useTranslations('socialProof');

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <Quote className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-white/80 mb-6 italic">
                {t(`${testimonial.key}.quote`)}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {t(`${testimonial.key}.initials`)}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {t(`${testimonial.key}.name`)}
                  </p>
                  <p className="text-sm text-white/60">
                    {t(`${testimonial.key}.role`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

```tsx:src/components/sections/WhyHaurus.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Eye, BookOpen, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: BarChart3,
    key: 'dataLayer',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Eye,
    key: 'notTipster',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: BookOpen,
    key: 'methodology',
    color: 'from-green-400 to-emerald-500',
  },
];

export default function WhyHaurus() {
  const t = useTranslations('whyHaurus');

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-white/60 mb-8">
              {t('subtitle')}
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200',
                      feature.color
                    )}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {t(`${feature.key}.title`)}
                    </h3>
                    <p className="text-white/60">
                      {t(`${feature.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="space-y-4">
                {[
                  { label: 'Glicko-2', value: '1756 ± 45' },
                  { label: 'Surface', value: 'Clay' },
                  { label: 'P_serve', value: '0.64' },
                  { label: 'Momentum', value: '+12.3' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <span className="text-white/60">{row.label}</span>
                    <span className="font-mono font-bold text-white">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

Now I need to check if your `en.json` and `fr.json` have the correct structure for all these translation keys. Here's a corrected version of the translation files:

```json:src/messages/en.json
{
  "nav": {
    "features": "Features",
    "pricing": "Pricing"
  },
  "common": {
    "switchLanguage": "Switch language"
  },
  "hero": {
    "badge": "Advanced Tennis Analytics",
    "title": "The metrics bookmakers use. Now yours.",
    "subtitle": "Access professional-grade tennis analytics built on Glicko-2 ratings, surface-specific performance data, and advanced serve/return metrics.",
    "cta": "Start Free Trial",
    "learnMore": "Learn More"
  },
  "metrics": {
    "title": "Professional Analytics",
    "subtitle": "Everything you need to analyze tennis matches like a pro.",
    "glicko2": {
      "title": "Glicko-2 Ratings",
      "description": "The industry standard rating system for competitive tennis players."
    },
    "surface": {
      "title": "Surface-Specific",
      "description": "Ratings calibrated per playing surface: hard, clay, and grass."
    },
    "serve": {
      "title": "Serve Performance",
      "description": "Probability-weighted serve metrics for precise match modeling."
    },
    "return": {
      "title": "Return Performance",
      "description": "Advanced return metrics to evaluate defensive capabilities."
    },
    "momentum": {
      "title": "Momentum Tracking",
      "description": "Momentum TD and Fatigue 72h indicators for live analysis."
    },
    "rank": {
      "title": "Ranking Trends",
      "description": "6-month rank delta (Δ Rank 6m) for form assessment."
    }
  },
  "pricing": {
    "title": "Simple, Transparent Pricing",
    "subtitle": "Choose the plan that fits your analysis needs.",
    "popular": "Most Popular",
    "perMonth": "/month",
    "getStarted": "Get Started",
    "starter": {
      "name": "Starter",
      "price": "€20",
      "icon": "S",
      "feature1": "Access to all metrics",
      "feature2": "Daily updates",
      "feature3": "Basic support",
      "feature4": "Surface-specific ratings"
    },
    "analyst": {
      "name": "Analyst",
      "price": "€50",
      "icon": "A",
      "feature1": "Everything in Starter",
      "feature2": "Real-time alerts",
      "feature3": "Priority support",
      "feature4": "Historical data access"
    },
    "pro": {
      "name": "Pro",
      "price": "€79",
      "icon": "P",
      "feature1": "Everything in Analyst",
      "feature2": "API access",
      "feature3": "Custom reports",
      "feature4": "Dedicated account manager"
    }
  },
  "socialProof": {
    "title": "Trusted by Professionals",
    "subtitle": "Join analysts and tennis enthusiasts who rely on Haurus.",
    "testimonial1": {
      "quote": "Haurus has completely transformed how I analyze matches. The surface-specific ratings are incredibly valuable.",
      "name": "Marc D.",
      "role": "Tennis Analyst",
      "initials": "MD"
    },
    "testimonial2": {
      "quote": "Finally, a tool that goes beyond basic stats. The Glicko-2 integration is exactly what I needed.",
      "name": "Sophie L.",
      "role": "Sports Bettor",
      "initials": "SL"
    },
    "testimonial3": {
      "quote": "Professional-grade analytics at an accessible price. Highly recommended for serious analysts.",
      "name": "Thomas R.",
      "role": "Pro Tipster",
      "initials": "TR"
    }
  },
  "whyHaurus": {
    "title": "Why Haurus?",
    "subtitle": "Built by analysts, for analysts. We understand what you need.",
    "dataLayer": {
      "title": "Data Layer, Not Tips",
      "description": "We provide the data, you make the decisions. No predictions, no guesswork."
    },
    "notTipster": {
      "title": "Not a Tipster Service",
      "description": "We're a professional analytics platform. Make informed decisions based on data."
    },
    "methodology": {
      "title": "Transparent Methodology",
      "description": "Every metric explained. Know exactly how ratings are calculated."
    }
  }
}
```

```json:src/messages/fr.json
{
  "nav": {
    "features": "Fonctionnalités",
    "pricing": "Tarifs"
  },
  "common": {
    "switchLanguage": "Changer de langue"
  },
  "hero": {
    "badge": "Analytique Tennis Avancée",
    "title": "Les métriques des bookmakers. Maintenant les vôtres.",
    "subtitle": "Accédez à des analyses tennis professionnelles basées sur les classements Glicko-2, les données de performance par surface et les métriques serve/retour avancées.",
    "cta": "Essai Gratuit",
    "learnMore": "En Savoir Plus"
  },
  "metrics": {
    "title": "Analytique Professionnelle",
    "subtitle": "Tout ce dont vous avez besoin pour analyser les matchs de tennis comme un pro.",
    "glicko2": {
      "title": "Classements Glicko-2",
      "description": "Le système de classement standard de l'industrie pour les joueurs de tennis compétitifs."
    },
    "surface": {
      "title": "Par Surface",
      "description": "Classements calibrés par surface de jeu : dur, terre battue et gazon."
    },
    "serve": {
      "title": "Performance au Service",
      "description": "Métriques de service pondérées par probabilité pour une modélisation précise des matchs."
    },
    "return": {
      "title": "Performance au Retour",
      "description": "Métriques de retour avancées pour évaluer les capacités défensives."
    },
    "momentum": {
      "title": "Suivi du Momentum",
      "description": "Indicateurs de momentum TD et de fatigue 72h pour l'analyse en direct."
    },
    "rank": {
      "title": "Tendances de Classement",
      "description": "Delta de classement sur 6 mois (Δ Classement 6m) pour évaluer la forme."
    }
  },
  "pricing": {
    "title": "Tarification Simple et Transparente",
    "subtitle": "Choisissez le plan qui correspond à vos besoins d'analyse.",
    "popular": "Le Plus Populaire",
    "perMonth": "/mois",
    "getStarted": "Commencer",
    "starter": {
      "name": "Starter",
      "price": "20€",
      "icon": "S",
      "feature1": "Accès à toutes les métriques",
      "feature2": "Mises à jour quotidiennes",
      "feature3": "Support basique",
      "feature4": "Classements par surface"
    },
    "analyst": {
      "name": "Analyst",
      "price": "50€",
      "icon": "A",
      "feature1": "Tout du Starter",
      "feature2": "Alertes en temps réel",
      "feature3": "Support prioritaire",
      "feature4": "Accès aux données historiques"
    },
    "pro": {
      "name": "Pro",
      "price": "79€",
      "icon": "P",
      "feature1": "Tout d'Analyst",
      "feature2": "Accès API",
      "feature3": "Rapports personnalisés",
      "feature4": "Gestionnaire de compte dédié"
    }
  },
  "socialProof": {
    "title": "Approuvé par les Professionnels",
    "subtitle": "Rejoignez les analystes et passionnés de tennis qui font confiance à Haurus.",
    "testimonial1": {
      "quote": "Haurus a complètement transformé ma façon d'analyser les matchs. Les classements par surface sont incroyablement précieux.",
      "name": "Marc D.",
      "role": "Analyste Tennis",
      "initials": "MD"
    },
    "testimonial2": {
      "quote": "Enfin un outil qui va au-delà des statistiques basiques. L'intégration Glicko-2 est exactement ce dont j'avais besoin.",
      "name": "Sophie L.",
      "role": "Parieur Sportif",
      "initials": "SL"
    },
    "testimonial3": {
      "quote": "Analytique de qualité professionnelle à un prix accessible. Je recommande vivement aux analystes sérieux.",
      "name": "Thomas R.",
      "role": "Tipster Pro",
      "initials": "TR"
    }
  },
  "whyHaurus": {
    "title": "Pourquoi Haurus ?",
    "subtitle": "Conçu par des analystes, pour des analystes. Nous comprenons ce dont vous avez besoin.",
    "dataLayer": {
      "title": "Couche de Données, Pas de Conseils",
      "description": "Nous fournissons les données, vous prenez les décisions. Pas de prédictions, pas de devinettes."
    },
    "notTipster": {
      "title": "Pas un Service de Tipster",
      "description": "Nous sommes une plateforme d'analyse professionnelle. Prenez des décisions éclairées basées sur les données."
    },
    "methodology": {
      "title": "Méthodologie Transparente",
      "description": "Chaque métrique expliquée. Sachez exactement comment les classements sont calculés."
    }
  }
}
```

Make sure your `next.config.mjs` has the middleware configuration for i18n:

```js:middleware.js
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});
```

And your routing structure should have the locale in the URL path like `/en/...` or `/fr/...`. If you're using the App Router with next-intl, make sure your `[locale]` folder structure is set up correctly.