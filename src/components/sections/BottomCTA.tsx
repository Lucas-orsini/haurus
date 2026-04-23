'use client'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
}

export default function BottomCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Amber glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(242,203,56,0.08),transparent)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-1)] mb-6 leading-[1.1]">
            Stop betting blind.
            <br />
            <span className="text-[var(--accent)]">Start pricing the edge.</span>
          </h2>
          <p className="text-lg text-[var(--text-2)] mb-10 font-light leading-relaxed max-w-xl mx-auto">
            1,033 players tracked. 250,000+ matches analysed. Updated after every ATP match. Your edge starts here.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#pricing"
              className="h-12 px-8 rounded-full bg-[var(--accent)] text-black text-sm font-medium hover:bg-[var(--accent-hi)] transition-colors shadow-[0_0_24px_rgba(242,203,56,0.25)] flex items-center justify-center gap-2"
            >
              Get started free
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link
              href="#metrics"
              className="h-12 px-8 rounded-full border border-[var(--border-md)] text-[var(--text-2)] text-sm font-medium hover:text-[var(--text-1)] hover:bg-white/[0.03] transition-colors duration-150 flex items-center justify-center"
            >
              View sample data
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
