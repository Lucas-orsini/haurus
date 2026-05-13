'use client'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLocale } from '@/providers/LocaleProvider'
import { getTranslations } from '@/lib/i18n'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export default function CTABanner() {
  const { locale } = useLocale()
  const t = getTranslations(locale)

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Amber radial glow background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(242,203,56,0.1) 0%, transparent 70%)',
      }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[var(--text-1)] leading-tight">
            {t.ctaBanner.title}
          </h2>
          <p className="text-[var(--text-2)] max-w-md text-sm leading-relaxed">
            {t.ctaBanner.subtitle}
          </p>
          <button className="h-12 px-8 rounded-full bg-[var(--accent)] text-black text-sm font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(242,203,56,0.3)] group">
            {t.ctaBanner.cta}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
          </button>
          <p className="text-xs text-[var(--text-3)] italic">
            {t.ctaBanner.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
