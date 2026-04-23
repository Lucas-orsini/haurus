'use client'
import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Settings2, Zap, Target, Check } from 'lucide-react'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

function Slider({
  label,
  value,
  min,
  max,
  unit,
  description,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  description: { min: string; max: string }
  onChange: (v: number) => void
}) {
  return (
    <div className="mb-10 last:mb-0">
      <div className="flex justify-between mb-4">
        <label className="text-sm font-medium text-[var(--text-1)]">{label}</label>
        <span className="text-sm font-mono text-[var(--accent)]">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between mt-2 text-[10px] text-[var(--text-3)] font-mono uppercase tracking-wider">
        <span>{description.min}</span>
        <span>{description.max}</span>
      </div>
    </div>
  )
}

export default function Configurator() {
  const [dailyEmails, setDailyEmails] = useState(50)
  const [warmupDays, setWarmupDays] = useState(14)
  const [spinSyntax, setSpinSyntax] = useState(true)
  const [linkTracking, setLinkTracking] = useState(false)

  return (
    <section className="py-24 bg-[var(--surface-2)] border-y border-[var(--border-md)]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-muted)] bg-[var(--accent-glow-sm)] mb-6">
            <Settings2 size={12} className="text-[var(--accent)]" strokeWidth={1.5} />
            <span className="text-xs font-medium text-[var(--accent-hi)] uppercase tracking-wide">
              Configuration
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-1)] mb-4">
            Tune your edge
          </h2>
          <p className="text-[var(--text-2)] max-w-lg mx-auto text-sm leading-relaxed">
            Adjust the parameters that drive your betting edge. Each slider is backed by real ATP data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <div className="mb-10">
            <Slider
              label="Minimum Glicko-2 differential"
              value={dailyEmails}
              min={0}
              max={200}
              unit=" pts"
              description={{ min: 'Conservative', max: 'Aggressive' }}
              onChange={setDailyEmails}
            />
          </div>

          <div className="mb-10">
            <Slider
              label="Form window (days)"
              value={warmupDays}
              min={7}
              max={90}
              unit="d"
              description={{ min: 'Short-term', max: 'Long-term' }}
              onChange={setWarmupDays}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border-md)] bg-[rgba(255,255,255,0.02)] cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-0.5">
                <input
                  type="checkbox"
                  checked={spinSyntax}
                  onChange={(e) => setSpinSyntax(e.target.checked)}
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[var(--accent-muted)] checked:right-0 checked:border-[var(--accent)]"
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[var(--surface-3)] cursor-pointer" />
              </div>
              <div>
                <span className="block text-sm font-medium text-[var(--text-1)]">Surface weighting</span>
                <span className="block text-xs text-[var(--text-3)] mt-1">
                  Weight metrics by court surface (Clay / Hard / Grass).
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border-md)] bg-[rgba(255,255,255,0.02)] cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-0.5">
                <input
                  type="checkbox"
                  checked={linkTracking}
                  onChange={(e) => setLinkTracking(e.target.checked)}
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[var(--accent-muted)] checked:right-0 checked:border-[var(--accent)]"
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[var(--surface-3)] cursor-pointer" />
              </div>
              <div>
                <span className="block text-sm font-medium text-[var(--text-1)]">Head-to-head edge</span>
                <span className="block text-xs text-[var(--text-3)] mt-1">
                  Factor in historical H2H matchups between players.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border-md)] bg-[rgba(255,255,255,0.02)] cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-0.5">
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => {}}
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[var(--accent-muted)] checked:right-0 checked:border-[var(--accent)]"
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[var(--surface-3)] cursor-pointer" />
              </div>
              <div>
                <span className="block text-sm font-medium text-[var(--text-1)]">Live momentum decay</span>
                <span className="block text-xs text-[var(--text-3)] mt-1">
                  Apply exponential decay to older match results.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border-md)] bg-[rgba(255,255,255,0.02)] cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-0.5">
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => {}}
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[var(--accent-muted)] checked:right-0 checked:border-[var(--accent)]"
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[var(--surface-3)] cursor-pointer" />
              </div>
              <div>
                <span className="block text-sm font-medium text-[var(--text-1)]">Weather conditions</span>
                <span className="block text-xs text-[var(--text-3)] mt-1">
                  Include temperature and humidity impact on play style.
                </span>
              </div>
            </label>
          </div>

          <div className="mt-10 flex items-center justify-between p-4 rounded-lg border border-[var(--accent-muted)] bg-[var(--accent-glow-sm)]">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[var(--accent)]" strokeWidth={2} />
              <span className="text-sm text-[var(--text-2)]">Configuration saved for current session</span>
            </div>
            <button className="h-8 px-4 rounded-full border border-[var(--accent-muted)] text-[var(--accent-hi)] text-xs font-medium hover:bg-[var(--accent-glow)] transition-colors flex items-center gap-2">
              <Zap size={12} strokeWidth={1.5} />
              Recalculate
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
