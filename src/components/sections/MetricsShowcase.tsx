'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useAnimationFrame, type Variants } from 'framer-motion'
import { BarChart3, Activity, Target, TrendingUp, Clock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Framer Motion Variants (type-safe, no string ease) ──────────────────────

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

// ── Animated Bar Chart (Glicko-2 per surface) ────────────────────────────────

function GlickoChart() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])

  const surfaces = [
    { label: 'Clay', value: 1682, max: 1800, color: '#f97316' },
    { label: 'Hard', value: 1721, max: 1800, color: '#3b82f6' },
    { label: 'Grass', value: 1548, max: 1800, color: '#22c55e' },
  ]

  return (
    <div className="flex items-end justify-between gap-3 h-28 mt-2 px-1">
      {surfaces.map((s, i) => (
        <div key={s.label} className="flex flex-col items-center gap-1.5 flex-1">
          <span className="text-[11px] font-mono text-[var(--text-3)]">{s.value}</span>
          <div className="w-full rounded-sm bg-white/[0.06] overflow-hidden" style={{ height: 72 }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: animated ? `${(s.value / s.max) * 100}%` : '0%' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="w-full rounded-sm flex flex-col justify-end"
              style={{ backgroundColor: s.color + '99' }}
            >
              <div className="w-full rounded-sm" style={{ backgroundColor: s.color }} />
            </motion.div>
          </div>
          <span className="text-[10px] text-[var(--text-3)]">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

// ── Circular Progress Rings (p_serve & p_return) ─────────────────────────────

function CircularProgress({ value, label, color }: { value: number; label: string; color: string }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])

  const circumference = 2 * Math.PI * 28
  const dashOffset = animated
    ? circumference * (1 - value / 100)
    : circumference

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <motion.circle
            cx="32" cy="32" r="28" fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-mono font-semibold text-[var(--text-1)]">{animated ? value : 0}%</span>
        </div>
      </div>
      <span className="text-[10px] text-[var(--text-3)] text-center leading-tight">{label}</span>
    </div>
  )
}

// ── Sparkline (TSD — Tiebreak Stress Data) ───────────────────────────────────

function Sparkline() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const [displayed, setDisplayed] = useState(0)

  useAnimationFrame((t) => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const w = canvasRef.current.width
    const h = canvasRef.current.height

    ctx.clearRect(0, 0, w, h)

    const points = [22, 18, 25, 15, 28, 20, 32, 24, 18, 26, 14, 22, 30, 26, 19, 23, 17, 28, 22, 20]
    const max = Math.max(...points)
    const min = Math.min(...points)
    const range = max - min

    const ease = Math.min(1, (t % 4000) / 1200)
    const eased = 1 - Math.pow(1 - ease, 3)
    const pts = Math.floor(points.length * eased)

    if (pts === 0) return

    // Grid line
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 1
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.stroke()

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, 'rgba(242,203,56,0.25)')
    grad.addColorStop(1, 'rgba(242,203,56,0)')

    ctx.beginPath()
    ctx.moveTo(0, h)
    points.slice(0, pts).forEach((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / range) * (h - 8) - 4
      if (i === 0) { ctx.lineTo(x, y) } else { ctx.lineTo(x, y) }
    })
    const lastX = ((pts - 1) / (points.length - 1)) * w
    ctx.lineTo(lastX, h)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Line
    ctx.beginPath()
    points.slice(0, pts).forEach((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / range) * (h - 8) - 4
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = '#F2CB38'
    ctx.lineWidth = 1.5
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Dot
    if (pts > 0) {
      const lastP = points[pts - 1]
      const lx = ((pts - 1) / (points.length - 1)) * w
      const ly = h - ((lastP - min) / range) * (h - 8) - 4
      ctx.beginPath()
      ctx.arc(lx, ly, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#F2CB38'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(lx, ly, 5, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(242,203,56,0.3)'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    setDisplayed(pts)
  })

  const lastVal = (() => {
    const points = [22, 18, 25, 15, 28, 20, 32, 24, 18, 26, 14, 22, 30, 26, 19, 23, 17, 28, 22, 20]
    const idx = Math.min(displayed - 1, points.length - 1)
    return points[Math.max(0, idx)]
  })()

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="text-[10px] text-[var(--text-3)]">Last 20 tiebreaks</span>
        <span className="text-xs font-mono font-semibold text-[var(--accent)]">{lastVal}</span>
      </div>
      <canvas ref={canvasRef} width={240} height={64} className="w-full" />
    </div>
  )
}

// ── Animated Counter (BPPI) ────────────────────────────────────────────────────

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(target * eased))
      if (p < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration])

  return <>{count}</>
}

// ── Trend Line (Momentum TD) ──────────────────────────────────────────────────

function TrendLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useAnimationFrame((t) => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const w = canvasRef.current.width
    const h = canvasRef.current.height
    ctx.clearRect(0, 0, w, h)

    const ease = Math.min(1, (t % 4000) / 1500)
    const eased = 1 - Math.pow(1 - ease, 2)

    const points = [40, 45, 38, 52, 48, 55, 60, 58, 65, 70, 68, 75, 72, 78, 82, 79, 85]
    const max = Math.max(...points)
    const min = Math.min(...points)
    const range = max - min
    const pts = Math.max(2, Math.floor(points.length * eased))

    const grad = ctx.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, 'rgba(34,197,94,0.2)')
    grad.addColorStop(1, 'rgba(34,197,94,0)')

    ctx.beginPath()
    ctx.moveTo(0, h)
    points.slice(0, pts).forEach((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / range) * (h - 12) - 6
      ctx.lineTo(x, y)
    })
    const lx = ((pts - 1) / (points.length - 1)) * w
    ctx.lineTo(lx, h)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    ctx.beginPath()
    points.slice(0, pts).forEach((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / range) * (h - 12) - 6
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 2
    ctx.stroke()

    if (pts > 1) {
      const lp = points[pts - 1]
      const plx = ((pts - 1) / (points.length - 1)) * w
      const ply = h - ((lp - min) / range) * (h - 12) - 6
      ctx.beginPath()
      ctx.arc(plx, ply, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#22c55e'
      ctx.fill()
    }
  })

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="text-[10px] text-[var(--text-3)]">30-day momentum</span>
        <span className="flex items-center gap-0.5 text-xs font-semibold text-[var(--green)]">+38 <TrendingUp size={10} /></span>
      </div>
      <canvas ref={canvasRef} width={240} height={56} className="w-full" />
    </div>
  )
}

// ── Double Indicator (Fatigue + Rank Delta) ────────────────────────────────────

function DoubleIndicator() {
  const [fatigue, setFatigue] = useState(0)
  const [rankDelta, setRankDelta] = useState(0)

  useEffect(() => {
    const tf = setTimeout(() => setFatigue(67), 400)
    const tr = setTimeout(() => setRankDelta(-12), 600)
    return () => { clearTimeout(tf); clearTimeout(tr) }
  }, [])

  return (
    <div className="mt-2 flex gap-4 justify-center">
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative w-12 h-12">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <motion.circle
              cx="24" cy="24" r="20" fill="none"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 20}
              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - fatigue / 100) }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-mono font-semibold">{fatigue}</span>
          </div>
        </div>
        <span className="text-[10px] text-[var(--text-3)] text-center">Fatigue<br />72h</span>
      </div>

      <div className="w-px bg-[var(--border-md)] self-stretch" />

      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1">
          <TrendingUp size={14} className="text-[var(--green)]" />
          <span className="text-lg font-mono font-bold text-[var(--green)]">{rankDelta > 0 ? '+' : ''}{rankDelta}</span>
        </div>
        <span className="text-[10px] text-[var(--text-3)] text-center">Rank<br />6 months</span>
      </div>
    </div>
  )
}

// ── Bento Card with 3D tilt ────────────────────────────────────────────────────

function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [2, -2])
  const rotateY = useTransform(x, [-50, 50], [-2, 2])

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(((e.clientX - rect.left) / rect.width - 0.5) * 80)
        y.set(((e.clientY - rect.top) / rect.height - 0.5) * 80)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'relative h-full min-h-[240px] rounded-xl border border-[var(--border-md)] bg-[var(--surface-1)] p-5 flex flex-col gap-2 overflow-hidden group',
        className
      )}
    >
      {/* Gradient hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(242,203,56,0.04) 0%, transparent 60%)' }} />
      <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col gap-2 flex-1 relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

// ── Main Section ───────────────────────────────────────────────────────────────

export default function MetricsShowcase() {
  return (
    <section id="metrics" className="py-24 px-6 relative">
      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(242,203,56,0.25)] bg-[rgba(242,203,56,0.06)] mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="text-[11px] font-medium text-[var(--accent)] uppercase tracking-widest">Data layer</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-1)] mb-4">
            The analytical layer
          </h2>
          <p className="text-[var(--text-2)] max-w-xl mx-auto text-sm leading-relaxed">
            Eight metrics. Each one a dimension of player performance that the books price into the odds. You get them all.
          </p>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 [grid-auto-flow:dense]"
        >
          {/* Row 1: Glicko-2 (2 cols) + p_serve/return */}
          <BentoCard className="md:col-span-2 border-b-2 border-b-[rgba(242,203,56,0.4)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[rgba(242,203,56,0.08)] flex items-center justify-center border border-[rgba(242,203,56,0.15)]">
                <BarChart3 size={16} className="text-[var(--accent)]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--accent)] tracking-tight">Glicko-2</h3>
                <p className="text-[11px] text-[var(--text-3)]">Rating by surface · Confidence interval</p>
              </div>
            </div>
            <GlickoChart />
          </BentoCard>

          <BentoCard>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[rgba(59,130,246,0.08)] flex items-center justify-center border border-[rgba(59,130,246,0.15)]">
                <Activity size={16} className="text-blue-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-1)] tracking-tight">p_serve / p_return</h3>
                <p className="text-[11px] text-[var(--text-3)]">Points won on serve & return</p>
              </div>
            </div>
            <div className="mt-auto flex justify-around items-end pt-4">
              <CircularProgress value={68} label="1st serve won" color="#3b82f6" />
              <CircularProgress value={42} label="Return pts won" color="#a78bfa" />
            </div>
          </BentoCard>

          {/* Row 2: TSD + BPPI + Momentum */}
          <BentoCard>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[rgba(168,85,247,0.08)] flex items-center justify-center border border-[rgba(168,85,247,0.15)]">
                <Zap size={16} className="text-purple-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-1)] tracking-tight">TSD</h3>
                <p className="text-[11px] text-[var(--text-3)]">Tiebreak Stress Data · Last 20</p>
              </div>
            </div>
            <Sparkline />
          </BentoCard>

          <BentoCard>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[rgba(242,203,56,0.08)] flex items-center justify-center border border-[rgba(242,203,56,0.15)]">
                <Target size={16} className="text-[var(--accent)]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-1)] tracking-tight">BPPI</h3>
                <p className="text-[11px] text-[var(--text-3)]">Break Point Pressure Index</p>
              </div>
            </div>
            <div className="mt-auto flex flex-col items-center justify-center pt-3">
              <div className="text-4xl font-bold text-[var(--accent)] font-mono">
                <AnimatedCounter target={847} duration={1400} />
              </div>
              <p className="text-[10px] text-[var(--text-3)] mt-1">pressure score · avg over last 20 matches</p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[rgba(34,197,94,0.08)] flex items-center justify-center border border-[rgba(34,197,94,0.15)]">
                <TrendingUp size={16} className="text-green-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-1)] tracking-tight">Momentum TD</h3>
                <p className="text-[11px] text-[var(--text-3)]">Trend differential · Time-decayed</p>
              </div>
            </div>
            <TrendLine />
          </BentoCard>

          {/* Row 3: Fatigue + Rank Delta */}
          <BentoCard className="md:col-span-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[rgba(249,115,22,0.08)] flex items-center justify-center border border-[rgba(249,115,22,0.15)]">
                <Clock size={16} className="text-orange-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-1)] tracking-tight">Fatigue 72h + Δ Rank 6m</h3>
                <p className="text-[11px] text-[var(--text-3)]">Recovery index · Ranking differential · Combined context signal</p>
              </div>
            </div>
            <DoubleIndicator />
          </BentoCard>
        </motion.div>
      </div>
    </section>
  )
}
