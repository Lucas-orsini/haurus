'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { MatchStats } from '@/lib/dashboard/getMatchStats'

interface MatchRowProps {
  match: MatchStats
  isOpen: boolean
  onToggle: () => void
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatMatch(player1: string, player2: string): string {
  return `${player1} vs ${player2}`
}

export default function MatchRow({ match, isOpen, onToggle }: MatchRowProps) {
  return (
    <div className="border-b border-[var(--border-md)] last:border-b-0">
      {/* Clickable row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center h-11 px-4 text-sm hover:bg-white/[0.02] transition-colors duration-150 text-left"
        aria-expanded={isOpen}
      >
        {/* Date */}
        <span className="w-28 shrink-0 text-[var(--text-2)] font-mono text-xs">
          {formatDate(match.date)}
        </span>

        {/* Tournament */}
        <span className="w-44 shrink-0 truncate text-[var(--text-1)]">
          {match.tournament}
        </span>

        {/* Match */}
        <span className="flex-1 min-w-0 text-[var(--text-1)] truncate pr-4">
          {formatMatch(match.player1_name, match.player2_name)}
        </span>

        {/* Surface */}
        <span className="w-20 shrink-0 text-[var(--text-2)] text-xs">
          {match.surface}
        </span>

        {/* Chevron */}
        <span className="w-5 shrink-0 flex items-center justify-center">
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className={`text-[var(--text-3)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {/* Accordion panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 bg-[var(--surface-1)] border-t border-[var(--border-md)]">
              {/* Metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2">
                {Object.entries(match.metrics).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-0.5">
                    <span className="text-xs text-[var(--text-3)] capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm font-medium text-[var(--text-1)] font-mono">
                      {typeof value === 'number' ? value.toFixed(2) : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
