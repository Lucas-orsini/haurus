'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Activity, BarChart3, TrendingUp, Zap } from 'lucide-react'
import MetricCard from '@/components/ui/MetricCard'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

function AnimatedBarChart() {
  const heights = ['40%', '65%', '45%', '78%', '55%', '88%', '62%']
  return (
    <div className="w-full h-48 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)] relative overflow-hidden flex items-end px-4 pt-10 pb-0 gap-2">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-full rounded-t-sm transition-all duration-500"
          style={{
            height: h,
            backgroundColor: i === 5 ? 'rgba(242,203,56,0.45)' : 'rgba(242,203,56,0.15)',
          }}
        />
      ))}
      {/* Peak label — positioned over heights[5] (88%, the max of the heights array).
          With 7 bars in a flex container (gap-2, px-4), the centre of bar index 5 falls at ~74%
          of the container width — not at (5/6)*100 ≈ 83.3%, which places the label beyond the bar.
          If the number of bars changes, recalculate manually by visually centering the label. */}
      <div className="absolute top-8 left-[78.6%] -translate-x-1/2 px-2 py-1 bg-[var(--accent)] text-black text-[10px] font-semibold rounded">
        Pic
      </div>
      {/* Fade overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111113] to-transparent pointer-events-none" />
    </div>
  )
}

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-100, 100], [4, -4])
  const rotateY = useTransform(mouseX, [-100, 100], [-4, 4])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 120)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 120)
  }
  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14 pb-24">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Hero glow — amber */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] hero-glow pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Top-level staggered container for text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16"
        >
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeInUp}
            className="mt-12 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-muted)] bg-[var(--accent-glow-sm)] mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-xs font-medium text-[var(--accent-hi)] tracking-wide uppercase">
              BÊTA DISPONIBLE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-medium tracking-tighter text-[var(--text-1)] mb-6 leading-[1.1]"
          >
            Les métriques{' '}
            <span className="text-[var(--accent)]">des bookmakers</span>
            <br />
            <span className="text-[var(--text-2)]">Enfin accessibles.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="text-lg text-[var(--text-2)] max-w-xl font-light mb-10 leading-relaxed"
          >
            Accédez aux données qui structurent les cotes ATP.
            Aucune prédiction. Uniquement des métriques fiables et exploitables.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="#pricing"
              className="h-10 px-6 rounded-lg bg-[var(--accent)] text-black text-sm font-medium hover:bg-[var(--accent-hi)] hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(242,203,56,0.25)]"
            >
              Commencer
            </Link>
            <a
              href="#metrics"
              className="h-10 px-6 rounded-lg bg-transparent border border-[var(--border-md)] text-[var(--text-2)] text-sm font-medium hover:text-[var(--text-1)] hover:bg-white/[0.03] transition-colors duration-150 flex items-center justify-center gap-2"
            >
              Voir les métriques
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.p
            custom={4}
            variants={fadeInUp}
            className="text-sm text-[var(--text-3)] mt-8"
          >
            Analyse quantitative · Avantage informationnel · Données sans biais
          </motion.p>
        </motion.div>

        {/* Dashboard mockup — 3D tilt */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="perspective-container mt-10"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
              transformStyle: 'preserve-3d',
            }}
            className="tilted-card max-w-5xl mx-auto rounded-xl border border-[var(--border-md)] bg-[var(--surface-1)] overflow-hidden relative"
          >
            {/* Fake window controls */}
            <div className="h-10 border-b border-[var(--border-md)] bg-[var(--surface-1)] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              <div className="ml-auto flex items-center gap-3">
                <div className="h-1.5 w-16 rounded-full bg-white/10" />
                <div className="h-6 w-6 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-muted)] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* App interface */}
            <div className="flex h-[420px] md:h-[500px]">
              {/* Sidebar */}
              <div className="w-16 md:w-64 border-r border-[var(--border-md)] p-4 flex flex-col gap-6 bg-[var(--surface-1)]">
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-wider mb-2 px-2">
                    Stats ATP
                  </div>
                  {[
                    { icon: <Activity size={18} strokeWidth={1.5} />, label: 'Aperçu', active: true },
                    { icon: <BarChart3 size={18} strokeWidth={1.5} />, label: 'Analytique', active: false },
                    { icon: <TrendingUp size={18} strokeWidth={1.5} />, label: 'Joueurs', active: false },
                    { icon: <Zap size={18} strokeWidth={1.5} />, label: 'Métriques', active: false },
                  ].map(({ icon, label, active }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm ${
                        active
                          ? 'bg-white/[0.05] text-[var(--text-1)]'
                          : 'text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.03] transition-colors'
                      }`}
                    >
                      <span className="shrink-0">{icon}</span>
                      <span className="hidden md:inline">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="p-3 rounded-lg border border-[var(--accent-muted)] bg-[var(--accent-glow-sm)] hidden md:block">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[var(--accent-hi)]">État des données</span>
                      <span className="text-[10px] text-[var(--green)] bg-[var(--green)]/10 px-1.5 py-0.5 rounded">
                        En direct
                      </span>
                    </div>
                    <div className="w-full bg-[var(--accent)]/10 h-1 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent)] transition-all duration-500"
                        style={{ width: '96%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-6 md:p-8 overflow-hidden relative">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-xl font-medium text-[var(--text-1)] tracking-tight">
                      Aperçu
                    </h2>
                    <p className="text-sm text-[var(--text-3)] mt-1">
                      Métriques en temps réel des joueurs ATP.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1.5 rounded border border-[var(--border-md)] bg-[var(--surface-1)] text-xs text-[var(--text-2)] flex items-center gap-2">
                      30 derniers jours
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Stat cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <MetricCard
                    label="Différentiel Glicko-2"
                    value="+84"
                    change="+12 pts"
                    changePositive
                    icon={<TrendingUp size={20} strokeWidth={1.5} />}
                  />
                  <MetricCard
                    label="Taux de victoire (Terre battue)"
                    value="71%"
                    change="+3.2%"
                    changePositive
                    icon={<Activity size={20} strokeWidth={1.5} />}
                  />
                  <MetricCard
                    label="Points gagnés au service"
                    value="68%"
                    change="0%"
                    icon={<Zap size={20} strokeWidth={1.5} />}
                  />
                </div>

                {/* Chart */}
                <AnimatedBarChart />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
