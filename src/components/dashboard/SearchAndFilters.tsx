'use client'

import { Calendar } from 'lucide-react'

interface SearchAndFiltersProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  filterToday: boolean
  setFilterToday: (value: boolean | ((prev: boolean) => boolean)) => void
  filterTournament: string
  setFilterTournament: (value: string) => void
  tournaments: string[]
}

export default function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  filterToday,
  setFilterToday,
  filterTournament,
  setFilterTournament,
  tournaments,
}: SearchAndFiltersProps) {
  return (
    <div className="flex flex-row items-center gap-3 mb-4 flex-wrap">
      {/* Search input */}
      <div className="flex-1 min-w-0" style={{ maxWidth: '18rem' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un joueur…"
          className="
            h-9 w-full rounded-md px-3 text-sm text-[var(--text-1)]
            bg-[var(--surface-2)] border border-[var(--border-md)]
            placeholder:text-[var(--text-3)]
            outline-none transition-all duration-150
            hover:border-[var(--border-hi)]
            focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]
          "
        />
      </div>

      {/* Toggle "Aujourd'hui" */}
      <button
        onClick={() => setFilterToday((prev: boolean) => !prev)}
        className={`
          h-9 px-3 flex items-center justify-center gap-1.5 rounded-md text-sm font-medium
          border transition-all duration-150 whitespace-nowrap shrink-0
          ${filterToday
            ? 'bg-[var(--accent)]/10 border-[var(--accent)]/40 text-[var(--accent)]'
            : 'bg-[var(--surface-2)] border-[var(--border-md)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--border-hi)]'
          }
        `}
      >
        <Calendar size={13} strokeWidth={1.5} className="shrink-0" />
        Aujourd'hui
      </button>

      {/* Tournament select */}
      <div className="shrink-0">
        <select
          value={filterTournament}
          onChange={(e) => setFilterTournament(e.target.value)}
          className="
            h-9 w-48 rounded-md px-3 pr-8 text-sm text-[var(--text-1)]
            bg-[var(--surface-2)] border border-[var(--border-md)]
            outline-none transition-all duration-150 cursor-pointer
            hover:border-[var(--border-hi)]
            focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]
            appearance-none
            bg-[url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;12&quot; height=&quot;12&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;%2352525b&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;><polyline points=&quot;6 9 12 15 18 9&quot;/></svg>')]
            bg-no-repeat bg-[right_0.75rem_center]
          "
        >
          <option value="">Tous les tournois</option>
          {tournaments.map((t, index) => (
            <option key={`${t}-${index}`} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
