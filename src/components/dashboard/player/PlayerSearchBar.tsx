'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/database.types'

type PlayerStats = Database['public']['Tables']['player_stats']['Row']

interface PlayerSearchBarProps {
  onSelectPlayer: (player: PlayerStats) => void
}

const MAX_RESULTS = 8
const MIN_CHARS = 2
const DEBOUNCE_MS = 300

export default function PlayerSearchBar({ onSelectPlayer }: PlayerSearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PlayerStats[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Debounced search
  useEffect(() => {
    if (query.length < MIN_CHARS) {
      setResults([])
      setOpen(false)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const supabase = createClient()
      if (!supabase) { setIsSearching(false); return }

      const { data } = await supabase
        .from('player_stats')
        .select('player_name, rank')
        .ilike('player_name', `%${query}%`)
        .order('rank', { ascending: true })
        .limit(MAX_RESULTS)

      setResults((data ?? []) as PlayerStats[])
      setOpen(true)
      setActiveIdx(-1)
      setIsSearching(false)
    }, DEBOUNCE_MS)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      handleSelect(results[activeIdx])
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  function handleSelect(player: PlayerStats) {
    setQuery(player.player_name)
    setOpen(false)
    onSelectPlayer(player)
  }

  function handleClear() {
    setQuery('')
    setResults([])
    setOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      {/* Input */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Rechercher un joueur ATP..."
          className={cn(
            'w-full h-9 pl-9 pr-9 rounded-md text-sm',
            'bg-[var(--surface-1)] border border-[var(--border-md)]',
            'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
            'focus:outline-none focus:border-[var(--accent)]/60',
            'focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150'
          )}
        />
        {/* Right icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {isSearching ? (
            <Loader2 size={13} className="animate-spin text-[var(--text-3)]" />
          ) : query ? (
            <button
              onClick={handleClear}
              className="text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
            >
              <X size={13} />
            </button>
          ) : null}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50
                        bg-[var(--surface-2)] border border-[var(--border-md)]
                        rounded-lg shadow-xl overflow-hidden py-1 max-h-64 overflow-y-auto">
          {results.length > 0 ? (
            results.map((player, i) => (
              <button
                key={player.id}
                onMouseDown={(e) => { e.preventDefault(); handleSelect(player) }}
                className={cn(
                  'w-full flex items-center justify-between gap-2 px-3 h-9 text-sm text-left',
                  'transition-colors duration-100',
                  i === activeIdx
                    ? 'bg-[var(--accent)]/10 text-[var(--text-1)]'
                    : 'text-[var(--text-2)] hover:bg-white/[0.04] hover:text-[var(--text-1)]'
                )}
              >
                <span className="truncate">{player.player_name}</span>
                {player.rank && (
                  <span className="text-xs text-[var(--text-3)] shrink-0 font-mono tabular-nums">
                    #{player.rank}
                  </span>
                )}
              </button>
            ))
          ) : !isSearching && query.length >= MIN_CHARS ? (
            <div className="px-3 py-4 text-center">
              <p className="text-sm text-[var(--text-3)]">Aucun joueur trouvé</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
