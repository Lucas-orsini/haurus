'use client'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

const bettors = [
  { name: 'ATP_EDGE', desc: 'Matched betting community' },
  { name: 'CourtSide', desc: 'Sports analytics forum' },
  { name: 'ValueBet Club', desc: 'Professional bettors network' },
  { name: 'SharpGrid', desc: 'Quantitative betting tools' },
  { name: 'LayerOne', desc: 'Statistical modelling group' },
]

export default function SocialProof() {
  return (
    <section className="py-12 px-6 border-y border-[var(--border-md)] bg-[var(--surface-1)]">
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-5xl mx-auto"
      >
        <p className="text-center text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)] mb-8 font-medium">
          Trusted by serious bettors
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
          {bettors.map((b) => (
            <div key={b.name} className="flex flex-col items-center gap-0.5 group">
              <span className="text-base font-bold text-[var(--text-1)] tracking-tighter">{b.name}</span>
              <span className="text-[10px] text-[var(--text-3)]">{b.desc}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-[var(--accent)]">800+</span>
            <span className="text-xs text-[var(--text-3)]">bettors</span>
          </div>
          <div className="w-px bg-[var(--border-md)]" />
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-[var(--accent)]">12</span>
            <span className="text-xs text-[var(--text-3)]">ATP metrics</span>
          </div>
          <div className="w-px bg-[var(--border-md)]" />
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-[var(--accent)]">Updated</span>
            <span className="text-xs text-[var(--text-3)]">after each match</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
