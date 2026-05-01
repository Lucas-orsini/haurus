'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/database.types'

type PlayerStats = Database['public']['Tables']['player_stats']['Row']

interface PlayerSearchBarProps {
  onSelectPlayer: (player: PlayerStats) => void
  trackedPlayerNames?: Set<string>
}

type SearchState = 'idle' | 'searching' | 'success' | 'empty' | 'error'

const MAX_RESULTS = 8
const MIN_CHARS = 2
const DEBOUNCE_MS = 300

export default function PlayerSearchBar({
  onSelectPlayer,
  trackedPlayerNames = new Set(),
}: PlayerSearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PlayerStats[]>([])
  const [searchState, setSearchState] = useState<SearchState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
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
      setSearchState('idle')
      return
    }

    setSearchState('searching')
    clearTimeout(debounceRef.current)

    const controller = new AbortController()

    debounceRef.current = setTimeout(async () => {
      try {
        const url = '/api/player-search?q=' + encodeURIComponent(query.trim())
        const res = await fetch(url, { signal: controller.signal })

        if (!res.ok) {
          if (res.status === 401) {
            setSearchState('error')
            setErrorMessage('Session expirée. Veuillez vous reconnecter.')
          } else {
            setSearchState('error')
            setErrorMessage('Échec de la recherche. Veuillez réessayer.')
          }
          setResults([])
          setOpen(true)
          return
        }

        const body = await res.json()
        const rows: PlayerStats[] = (body.players ?? []) as PlayerStats[]
        setResults(rows)
        setOpen(true)
        setActiveIdx(-1)
        setSearchState(rows.length > 0 ? 'success' : 'empty')
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return

        setSearchState('error')
        setErrorMessage('Échec de la recherche. Veuillez réessayer.')
        setResults([])
        setOpen(true)
      }
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(debounceRef.current)
      controller.abort()
    }
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
    setSearchState('idle')
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
          {searchState === 'searching' ? (
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
        <div
          className="absolute top-full left-0 right-0 mt-1.5 z-50
                     bg-[var(--surface-2)] border border-[var(--border-md)]
                     rounded-lg shadow-xl overflow-hidden py-1 max-h-64 overflow-y-auto"
        >
          {/* Error state */}
          {searchState === 'error' && (
            <div className="flex items-center gap-2.5 px-3 py-3 border-b border-[var(--border-md)]">
              <AlertCircle size={13} className="text-[var(--red)] shrink-0" strokeWidth={1.5} />
              <p className="text-xs text-[var(--red)]">{errorMessage}</p>
            </div>
          )}

          {/* Results list */}
          {results.length > 0 ? (
            results.map((player, i) => {
              const isTracked = trackedPlayerNames.has(player.player_name)
              return (
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
                  <span className="flex items-center gap-2 shrink-0">
                    {isTracked && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20">
                        ✓ Suivi
                      </span>
                    )}
                    {player.rank && (
                      <span className="text-xs text-[var(--text-3)] font-mono tabular-nums">
                        #{player.rank}
                      </span>
                    )}
                  </span>
                </button>
              )
            })
          ) : searchState === 'empty' ? (
            <div className="px-3 py-4 text-center">
              <p className="text-sm text-[var(--text-3)]">Aucun joueur trouvé</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
