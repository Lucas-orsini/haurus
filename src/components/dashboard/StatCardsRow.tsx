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

  return (
    <div className="flex flex-col gap-1">
      {/* Label tournoi + surface */}
      <p className="text-[11px] text-[var(--text-3)]">
        {entry.name}
        <span className="mx-1 text-[var(--text-3)]">·</span>
        {entry.surface}
      </p>

      {/* Zone curseur + barre */}
      <div className="relative h-[72px] flex flex-col justify-end gap-1">
        {/* Curseur triangulaire — au-dessus de la barre */}
        <div className="relative h-4 flex items-end">
          {paceIndex !== null ? (
            <motion.div
              initial={{ left: '0%' }}
              animate={{
                left: `calc(${Math.min(Math.max(paceIndex, 0), 1) * 100}% - 5px)`,
              }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: 'easeOut' }}
              className="absolute top-0 w-[10px] h-4"
              style={{
                clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 8px 2px var(--accent)',
              }}
            />
          ) : null}
        </div>

        {/* Barre 3 segments */}
        <div className="relative h-[10px] rounded-full overflow-hidden flex">
          <div className="w-[40%] h-full bg-[var(--red)]" />
          <div className="w-[20%] h-full bg-[var(--yellow)]" />
          <div className="w-[40%] h-full bg-[var(--green)]" />
        </div>

        {/* Valeur numérique */}
        <p className="text-[11px] font-mono text-[var(--text-2)]">
          {paceIndex !== null ? paceIndex.toFixed(3) : '—'}
        </p>
      </div>
    </div>
  )
}
