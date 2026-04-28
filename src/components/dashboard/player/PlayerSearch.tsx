'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type SearchState = 'idle' | 'loading' | 'results' | 'empty'

interface SearchResult {
  player_name: string
}

interface PlayerSearchProps {
  defaultValue?: string
}

export default function PlayerSearch({ defaultValue = '' }: PlayerSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState(defaultValue)
  const [results, setResults] = useState<SearchResult[]>([])
  const [state, setState] = useState<SearchState>('idle')
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Debounce 300ms
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setOpen(false)
      setState('idle')
      return
    }

    clearTimeout(debounceRef.current)
    setState('loading')

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/player-search?q=${encodeURIComponent(query)}&limit=5`)
        if (!res.ok) throw new Error('Search failed')
        const json = await res.json()
        const items = json.results ?? []
        setResults(items)
        setState(items.length > 0 ? 'results' : 'empty')
        setOpen(true)
        setActiveIdx(-1)
      } catch {
        setResults([])
        setState('idle')
      }
    }, 300)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      navigateTo(results[activeIdx].player_name)
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  const navigateTo = (playerName: string) => {
    setQuery('')
    setOpen(false)
    setResults([])
    const slug = playerName.replace(/\s+/g, '-')
    router.push(`/dashboard/player/${slug}`)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Input */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Rechercher un joueur..."
          className={cn(
            'w-full h-8 pl-9 pr-9 rounded-md text-sm',
            'bg-[var(--surface-1)] border border-[var(--border-md)]',
            'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
            'focus:outline-none focus:border-[var(--accent)]/60',
            'focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150'
          )}
        />
        {/* Right icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {state === 'loading' ? (
            <Loader2 size={13} className="animate-spin text-[var(--text-3)]" />
          ) : query ? (
            <button
              onClick={() => { setQuery(''); setResults([]); setOpen(false); inputRef.current?.focus() }}
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
          className={cn(
            'absolute top-full left-0 right-0 mt-1.5 z-50',
            'bg-[var(--surface-2)] border border-[var(--border-md)]',
            'rounded-lg shadow-xl overflow-hidden py-1',
            'max-h-60 overflow-y-auto'
          )}
        >
          {state === 'results' ? (
            results.map((result, i) => (
              <button
                key={result.player_name}
                onMouseDown={(e) => { e.preventDefault(); navigateTo(result.player_name) }}
                className={cn(
                  'w-full flex items-center justify-between gap-2 px-3 h-9 text-sm text-left',
                  'transition-colors duration-100 whitespace-nowrap',
                  i === activeIdx
                    ? 'bg-[var(--accent)]/10 text-[var(--text-1)]'
                    : 'text-[var(--text-2)] hover:bg-white/[0.04] hover:text-[var(--text-1)]'
                )}
              >
                <span className="truncate">{result.player_name}</span>
              </button>
            ))
          ) : state === 'empty' ? (
            <div className="px-3 py-4 text-center">
              <p className="text-sm text-[var(--text-3)]">
                Aucun résultat pour « {query} »
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
