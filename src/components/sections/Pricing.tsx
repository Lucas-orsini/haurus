/* TODO: réactiver le pricing par plans
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const plans = [
  {
    name: 'Starter',
    price: '20',
    period: 'month',
    desc: 'Essential metrics for casual analysis and learning the data layer.',
    highlight: false,
    cta: 'Get started',
    features: [
      'Glicko-2 (all surfaces)',
      'p_serve & p_return',
      'Last 30 days history',
      '1 player tracked',
    ],
  },
  {
    name: 'Analyst',
    price: '50',
    period: 'month',
    desc: 'Advanced metrics, full history, and alerts for systematic bettors.',
    highlight: true,
    cta: 'Get started',
    features: [
      'All Starter metrics',
      'BPPI & TSD',
      '12-month history',
      '10 players tracked',
      'Match alerts',
    ],
  },
  {
    name: 'Pro',
    price: '79',
    period: 'month',
    desc: 'Complete access, exports, and API for power users and professionals.',
    highlight: false,
    cta: 'Go Pro',
    features: [
      'All Analyst metrics',
      'Momentum TD & Fatigue 72h',
      'Δ Rank 6m',
      'Unlimited players',
      'CSV & JSON exports',
      'API access',
    ],
  },
]
*/

'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'

const betaFeatures = [
  'Toutes les métriques ATP sharp',
  'Profils joueurs avec historique',
  'Tableau comparatif des matchs',
  'Analyse de match par IA',
  'Accès à toutes les surfaces',
  'Mises à jour 2x par jour',
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-md)] bg-[var(--surface-2)] mb-6">
          <span className="text-[11px] font-medium text-[var(--text-2)] uppercase tracking-widest">Accès Beta</span>
        </span>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-1)] mb-4">
          Rejoignez la communauté Haurus
        </h2>
        <p className="text-[var(--text-2)] max-w-md mx-auto text-sm leading-relaxed">
          Accédez en avant-première à l'outil d'analyse tennis le plus avancé.
        </p>
      </motion.div>

      {/* Beta Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-[420px] mx-auto"
      >
        <div
          className="relative rounded-2xl flex flex-col gap-6 p-8 overflow-hidden"
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--accent)',
            boxShadow: '0 0 40px rgba(242,203,56,0.08), 0 0 80px rgba(242,203,56,0.04)',
          }}
        >
          {/* Radial accent glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(242,203,56,0.10) 0%, transparent 70%)',
            }}
          />

          {/* Badge: Accès limité + dot pulsant */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-md)] bg-[var(--surface-2)]">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'var(--accent)',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
              <span className="text-[11px] font-medium text-[var(--text-2)] uppercase tracking-widest">
                Accès limité
              </span>
            </div>
          </div>

          {/* Titre */}
          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-1)]">
              Accès Beta
            </h3>
            <p className="mt-2 text-sm text-[var(--text-2)] leading-relaxed">
              Toutes les fonctionnalités. Gratuit pendant la beta.
            </p>
          </div>

          {/* Séparateur */}
          <div className="relative z-10 border-t border-[var(--border-md)]" />

          {/* Liste des fonctionnalités */}
          <ul className="relative z-10 flex flex-col gap-3">
            {betaFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-[var(--text-2)]">
                <Check
                  size={14}
                  strokeWidth={2}
                  className="shrink-0 mt-0.5"
                  style={{ color: 'var(--accent)' }}
                />
                {feature}
              </li>
            ))}
          </ul>

          {/* Séparateur */}
          <div className="relative z-10 border-t border-[var(--border-md)]" />

          {/* Prix */}
          <div className="relative z-10 text-center">
            <div className="flex items-end justify-center gap-1">
              <span className="text-5xl font-bold text-[var(--text-1)] tracking-tight">Gratuit</span>
            </div>
            <p className="mt-1 text-xs text-[var(--text-3)]">
              pendant la période beta
            </p>
          </div>

          {/* CTA */}
          <div className="relative z-10 flex justify-center">
            <Button href="/signup" variant="primary" size="lg" className="w-auto">
              Rejoindre la beta
            </Button>
          </div>

          {/* Note légale */}
          <p className="relative z-10 text-center text-[10px] text-[var(--text-3)] leading-relaxed">
            En rejoignant la beta, vous acceptez que certaines fonctionnalités soient encore en développement.
          </p>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
