'use client'
import { motion, type Variants } from 'framer-motion'
import { Shield, Layers, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const points = [
  {
    icon: Shield,
    iconColor: 'text-[var(--accent)]',
    iconBg: 'bg-[rgba(242,203,56,0.08)]',
    iconBorder: 'border-[rgba(242,203,56,0.15)]',
    title: 'The same layer as the books',
    desc: 'Bookmakers price odds using Glicko-2, serve/return efficiency, and pressure indices. Haurus gives you that exact analytical layer.',
  },
  {
    icon: Eye,
    iconColor: 'text-blue-400',
    iconBg: 'bg-[rgba(59,130,246,0.08)]',
    iconBorder: 'border-[rgba(59,130,246,0.15)]',
    title: 'No predictions. No tips.',
    desc: "We don't tell you who to bet on. We give you the raw metrics so you can form your own view — the way analysts do.",
  },
  {
    icon: Layers,
    iconColor: 'text-purple-400',
    iconBg: 'bg-[rgba(168,85,247,0.08)]',
    iconBorder: 'border-[rgba(168,85,247,0.15)]',
    title: 'Context over gut feel',
    desc: 'Surface-adjusted ratings, fatigue signals, and momentum decay models. Numbers over intuition. Always.',
  },
]

export default function WhyHaurus() {
  return (
    <section className="py-24 px-6 bg-[var(--surface-1)] border-y border-[var(--border-md)]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-md)] bg-[var(--surface-2)] mb-6">
            <span className="text-[11px] font-medium text-[var(--text-2)] uppercase tracking-widest">Not a tipster service</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-1)] mb-4">
            Built for analysis, not advice
          </h2>
          <p className="text-[var(--text-2)] max-w-xl mx-auto text-sm leading-relaxed">
            Haurus is a data platform. We surface the numbers. What you do with them is your edge.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {points.map((p) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                variants={fadeInUp}
                className="group relative rounded-2xl border border-[var(--border-md)] bg-[var(--surface-2)] overflow-hidden hover:border-[var(--border-hi)] transition-colors"
              >
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(242,203,56,0.03) 0%, transparent 60%)' }} />
                <div className="p-8 relative z-10">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-6 border', p.iconBg, p.iconBorder)}>
                    <Icon size={20} className={p.iconColor} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-1)] mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-sm text-[var(--text-2)] leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
