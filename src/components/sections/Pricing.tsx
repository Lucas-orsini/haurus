'use client'
import { motion, type Variants } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    highlight: false,
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
    highlight: true,
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
          <span className="text-[11px] font-medium text-[var(--text-2)] uppercase tracking-widest">Pricing</span>
        </span>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-1)] mb-4">
          Simple pricing for serious analysis
        </h2>
        <p className="text-[var(--text-2)] max-w-md mx-auto text-sm leading-relaxed">
          No tiers hidden behind paywalls. Every plan gives you real data.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={fadeInUp}
            className={cn(
              'relative rounded-2xl flex flex-col gap-5 p-6',
              plan.highlight
                ? 'border-2 border-[var(--accent)] bg-[var(--surface-1)] shadow-[0_0_40px_rgba(242,203,56,0.08)] scale-[1.02]'
                : 'border border-[var(--border-md)] bg-[var(--surface-1)] hover:border-[var(--border-hi)] transition-colors group'
            )}
          >
            {/* Most popular badge */}
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-black text-[11px] font-semibold">
                  Most popular
                </span>
              </div>
            )}

            {/* Radial glow for highlighted */}
            {plan.highlight && (
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 opacity-10"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(242,203,56,0.6) 0%, transparent 70%)' }} />
              </div>
            )}

            {/* Plan header */}
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-3)] mb-1">{plan.name}</p>
              <div className="flex items-end gap-1 mt-2">
                <span className="text-4xl font-bold text-[var(--text-1)] tracking-tight">€{plan.price}</span>
                <span className="text-sm text-[var(--text-3)] mb-1">/{plan.period}</span>
              </div>
              <p className="text-xs text-[var(--text-3)] mt-3 leading-relaxed">{plan.desc}</p>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2.5 flex-1 relative z-10">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-2)]">
                  <Check size={14} className="text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={cn(
                'h-10 px-5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2 relative z-10',
                plan.highlight
                  ? 'bg-[var(--accent)] text-black hover:bg-[var(--accent-hi)] shadow-[0_0_20px_rgba(242,203,56,0.25)]'
                  : 'border border-[var(--border-md)] bg-[var(--surface-2)] hover:border-[var(--accent)] text-[var(--text-2)] hover:text-[var(--accent)] transition-colors'
              )}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
