'use client'
import { motion, type Variants } from 'framer-motion'

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

const stats = [
  { value: '250k', label: 'matches analysed' },
  { value: '1,033', label: 'players tracked' },
  { value: 'Twice daily', label: 'updated' },
]

export default function SocialProof() {
  return (
    <section className="py-12 px-6 border-y border-[var(--border-md)] bg-[var(--surface-1)]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-5xl mx-auto"
      >
        <div className="flex flex-wrap justify-center items-center gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3 px-8 py-3">
              {i > 0 && (
                <div className="w-px h-8 bg-[var(--border-md)] mr-2 hidden sm:block" />
              )}
              <span className="text-base font-semibold text-[var(--accent)] font-mono">{stat.value}</span>
              <span className="text-sm text-[var(--text-3)]">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
