'use client'
import { motion, type Variants } from 'framer-motion'

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export default function SocialProof() {
  return (
    <section className="py-12 px-6 border-y border-[var(--border-md)] bg-white/[0.01]">
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-5xl mx-auto"
      >
        <p className="text-center text-sm text-[var(--text-3)] mb-8">
          Stats bar
        </p>
        <div className="flex flex-row flex-wrap justify-center gap-8">
          <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)] text-center min-w-[160px]">
            <p className="text-2xl text-[var(--text-1)] font-medium font-mono tracking-tight mb-1">
              250k
            </p>
            <p className="text-xs text-[var(--text-3)]">matches analysed</p>
          </div>
          <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)] text-center min-w-[160px]">
            <p className="text-2xl text-[var(--text-1)] font-medium font-mono tracking-tight mb-1">
              1,033
            </p>
            <p className="text-xs text-[var(--text-3)]">players tracked</p>
          </div>
          <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)] text-center min-w-[160px]">
            <p className="text-2xl text-[var(--text-1)] font-medium font-mono tracking-tight mb-1">
              2×
            </p>
            <p className="text-xs text-[var(--text-3)]">Updated twice daily</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
