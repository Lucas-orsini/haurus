'use client'

import { cn } from '@/lib/utils'
import type { TodaysStats } from '@/lib/types/dashboard'
import { CalendarDays, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatCardsRowProps {
  todaysStats?: TodaysStats
}

export default function StatCardsRow({ todaysStats }: StatCardsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Card 1 — Matchs du jour */}
      <Card1 card1={todaysStats?.card1} />

      {/* Card 2 — Spécialiste surface */}
      <Card2 card2={todaysStats?.card2} />

      {/* Card 3 — Vitesse de surface */}
      <Card3 card3={todaysStats?.card3} />
    </div>
  )
}

function Card1({ card1 }: { card1?: TodaysStats['card1'] }) {
  if (!card1 || card1.count === 0) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            Matchs du jour
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">Aucun match prévu</p>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          Matchs du jour
        </p>
      </div>
      <p className="text-2xl font-medium text-[var(--text-1)] font-mono tabular-nums tracking-tight mb-1">
        {card1.count}
      </p>
      <div className="flex flex-col gap-0.5 mt-1">
        {card1.tournaments.map((t, i) => (
          <p key={i} className="text-[11px] text-[var(--text-3)]">
            {t.name}
            {t.surface ? (
              <span className="ml-1 text-[var(--text-3)]">· {t.surface}</span>
            ) : null}
          </p>
        ))}
      </div>
    </div>
  )
}

function Card2({ card2 }: { card2?: TodaysStats['card2'] }) {
  if (!card2) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            Spécialiste surface
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">Données indisponibles</p>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          Spécialiste surface
        </p>
      </div>
      <p className="text-2xl font-medium text-[var(--text-1)] font-mono tabular-nums tracking-tight">
        {Math.round((card2.winRate ?? 0) * 100)}%
      </p>
      <p className="text-xs text-[var(--text-3)] mt-0.5">{card2.surface}</p>
      <p className="text-[11px] text-[var(--text-3)] mt-2">
        {card2.player1} vs {card2.player2}
      </p>
    </div>
  )
}

type Card3Entry = { name: string; surface: string; paceIndex: number | null }

function Card3({ card3 }: { card3?: TodaysStats['card3'] }) {
  if (card3 === undefined) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            Vitesse de surface
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">Données indisponibles</p>
      </div>
    )
  }

  if (card3 === null || card3.length === 0) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            Vitesse de surface
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">—</p>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          Vitesse de surface
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {card3.map((entry, i) => (
          <GaugeEntry key={i} entry={entry} index={i} />
        ))}
      </div>
    </div>
  )
}

function GaugeEntry({ entry, index }: { entry: Card3Entry; index: number }) {
  const paceIndex = entry.paceIndex
  const displayValue = paceIndex !== null ? paceIndex.toFixed(2) : '—'

  // Clamp the cursor position so the badge never overflows the container edges
  // min: 5px  (avoids clipping at left = 0%)
  // max: calc(100% - 5px)  (avoids clipping at right = 100%)
  const clampedPace = Math.min(Math.max(paceIndex ?? 0, 0), 1)
  const cursorLeft = `calc(${clampedPace * 100}% - 5px)`

  return (
    <div className="flex flex-col gap-1">
      {/* Label tournoi + surface */}
      <p className="text-[11px] text-[var(--text-3)]">
        {entry.name}
        <span className="mx-1 text-[var(--text-3)]">·</span>
        {entry.surface}
      </p>

      {/* Valeur numérique — AU-DESSUS de la barre */}
      <p className="text-sm font-semibold text-[var(--text-1)] tabular-nums tracking-tight">
        {displayValue}
      </p>

      {/* Zone curseur + barre — overflow-hidden empêche le badge de déborder */}
      <div className="relative h-[44px] flex flex-col justify-end gap-0 overflow-hidden">
        {/* Curseur triangulaire — AU-DESSUS de la barre */}
        <div className="relative h-7 flex items-end">
          {paceIndex !== null ? (
            <motion.div
              initial={{ left: '0%' }}
              animate={{ left: cursorLeft }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: 'easeOut' }}
              className="absolute top-0 w-[10px] h-7 flex flex-col items-center"
            >
              {/* Badge inline au-dessus de la flèche */}
              <span
                className="text-[9px] font-mono font-semibold text-white whitespace-nowrap px-1 py-px rounded"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {displayValue}
              </span>
              {/* Flèche triangulaire pointant vers le bas */}
              <div
                className="w-[10px] h-[14px] -mt-px"
                style={{
                  clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                  backgroundColor: 'var(--accent)',
                  boxShadow: '0 0 6px 1px var(--accent)',
                }}
              />
            </motion.div>
          ) : null}
        </div>

        {/* Barre 3 segments — seuils sur échelle 0–2 :
             Lent   0.00–0.80 → 40%  (0.80/2)
             Moyen  0.80–1.10 → 15%  (0.30/2)
             Rapide 1.10–2.00 → 45%  (0.90/2) */}
        <div className="relative h-[10px] rounded-full overflow-hidden flex">
          <div className="w-[40%] h-full bg-[var(--red)]" />
          <div className="w-[15%] h-full bg-[var(--yellow)]" />
          <div className="w-[45%] h-full bg-[var(--green)]" />
        </div>
      </div>
    </div>
  )
}
