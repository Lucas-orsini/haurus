'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTournament } from '@/contexts/TournamentContext'

function TournamentSelectorInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { tournaments, selectedTournament, setSelectedTournament } = useTournament()

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync open state from outside (e.g., mobile menu toggle)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function handleSelect(tournament: string) {
    setSelectedTournament(tournament)
    setIsOpen(false)

    // Sync URL param for bookmarkability
    const params = new URLSearchParams(searchParams.toString())
    params.set('tournament', tournament)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  if (tournaments.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sélectionner un tournoi"
        className={cn(
          'h-7 pl-2.5 pr-2 flex items-center gap-1.5 rounded-md text-xs font-medium',
          'border transition-colors duration-150 whitespace-nowrap',
          isOpen
            ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-hi)]'
            : 'border-[var(--border-md)] bg-white/[0.03] text-[var(--text-2)] hover:bg-white/[0.06] hover:text-[var(--text-1)]'
        )}
      >
        <span className="truncate max-w-[120px]">
          {selectedTournament ?? 'Tous les tournois'}
        </span>
        <ChevronDown
          size={11}
          strokeWidth={1.5}
          className={cn('shrink-0 transition-transform duration-150', isOpen && 'rotate-180')}
        />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Liste des tournois"
          className={cn(
            'absolute top-full right-0 mt-1.5 z-50',
            'min-w-[200px] w-max max-w-[280px]',
            'bg-[var(--surface-2)] border border-[var(--border-md)]',
            'rounded-lg shadow-xl overflow-hidden py-1',
            'animate-in fade-in-0 zoom-in-95 duration-150'
          )}
        >
          {tournaments.map((tournament) => (
            <button
              key={tournament}
              role="option"
              aria-selected={tournament === selectedTournament}
              onClick={() => handleSelect(tournament)}
              className={cn(
                'w-full flex items-center justify-between gap-2 px-3 h-8 text-sm',
                'transition-colors duration-100 whitespace-nowrap',
                tournament === selectedTournament
                  ? 'bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                  : 'text-[var(--text-2)] hover:bg-white/[0.05] hover:text-[var(--text-1)]'
              )}
            >
              <span className="truncate flex-1 text-left">{tournament}</span>
              {tournament === selectedTournament && (
                <Check size={12} strokeWidth={2} className="shrink-0 text-[var(--accent-hi)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TournamentSelector() {
  return <TournamentSelectorInner />
}
