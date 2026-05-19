'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, CalendarX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTournament } from '@/contexts/TournamentContext'

export interface TournamentSelectorOption {
  tourney_name: string
}

export interface TournamentSelectorProps {
  /** Called when the user selects a tournament, with the tournament name as argument. */
  onSelect?: (id: string) => void
}

/** Standalone tournament dropdown.
 *
 * Reads/writes the selected tournament via TournamentContext so that
 * StatCardsRow (which receives selectedTournament from the same context)
 * automatically re-filters when the user changes the selection.
 *
 * When an external `onSelect` callback is provided, it is also invoked
 * with the selected tournament name — useful for parent components that
 * need to react to the selection event (e.g., logging, analytics).
 */
export default function TournamentSelector({ onSelect }: TournamentSelectorProps = {}) {
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

  if (tournaments.length === 0) {
    return (
      <div className="flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-[var(--border-md)] bg-[var(--surface-1)] text-[var(--text-3)] text-[11px]">
        <CalendarX size={11} strokeWidth={1.5} className="shrink-0" />
        <span>Aucun tournoi aujourd'hui</span>
      </div>
    )
  }

  // selectedTournament is null = "show all" sentinel.
  // Fallback to null so the button displays a neutral placeholder, not a
  // spurious first-item pre-selection. The selector shows "Tous les tournois"
  // until the user explicitly picks a tournament.
  const selected =
    selectedTournament && tournaments.includes(selectedTournament)
      ? selectedTournament
      : null

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
                  onSelect?.(t)
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
