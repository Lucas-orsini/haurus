'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTournament } from '@/contexts/TournamentContext'

export interface TournamentSelectorOption {
  tourney_name: string
}

/** Standalone tournament dropdown.
 *
 * Reads/writes the selected tournament via TournamentContext so that
 * StatCardsRow (which receives selectedTournament from the same context)
 * automatically re-filters when the user changes the selection.
 */
export default function TournamentSelector() {
  const { tournaments, selectedTournament, setSelectedTournament } = useTournament()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (tournaments.length === 0) return null

  const selected = tournaments.find((t) => t === selectedTournament) ?? selectedTournament ?? tournaments[0]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'h-7 pl-2.5 pr-2 flex items-center gap-1.5 rounded-md text-[11px] font-medium',
          'border transition-colors duration-150',
          'border-[var(--border-md)] bg-[var(--surface-1)]',
          'text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface-2)]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50'
        )}
      >
        <span className="max-w-[140px] truncate">{selected}</span>
        <ChevronDown
          size={11}
          strokeWidth={1.5}
          className={cn('shrink-0 transition-transform duration-150', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[180px] max-w-[240px] rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)] shadow-xl overflow-hidden">
          <div className="py-1 max-h-64 overflow-y-auto">
            {tournaments.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setSelectedTournament(t)
                  setOpen(false)
                }}
                className={cn(
                  'w-full px-3 py-2 flex items-center justify-between gap-2 text-left',
                  'text-xs transition-colors duration-100',
                  t === selected
                    ? 'bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                    : 'text-[var(--text-2)] hover:bg-white/[0.04] hover:text-[var(--text-1)]'
                )}
              >
                <span className="truncate flex-1 min-w-0">{t}</span>
                {t === selected && <Check size={11} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
