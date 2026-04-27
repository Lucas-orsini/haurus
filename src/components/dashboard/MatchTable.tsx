'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, RefreshCw, AlertCircle, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchRow } from '@/lib/dashboard/types'

// ── Metric definitions ─────────────────────────────────────────────────────────

interface MetricDef {
  key: string
  label: string
  format: 'rank' | 'pct' | 'glicko' | 'delta' | 'plain' | 'ratio'
  p1Key: keyof MatchRow
  p2Key: keyof MatchRow
}

const METRICS: MetricDef[] = [
  { key: 'rank',       label: 'Rank',          format: 'rank',    p1Key: 'rank_p1',              p2Key: 'rank_p2'              },
  { key: 'p_serve',    label: 'P. Serve',      format: 'pct',     p1Key: 'p_serve_p1',           p2Key: 'p_serve_p2'           },
  { key: 'p_return',   label: 'P. Return',     format: 'pct',     p1Key: 'p_return_p1',          p2Key: 'p_return_p2'          },
  { key: 'glicko',     label: 'Glicko Rating', format: 'glicko', p1Key: 'glicko_rating_p1',     p2Key: 'glicko_rating_p2'     },
  { key: 'glicko_rd',  label: 'Glicko RD',     format: 'plain',   p1Key: 'glicko_rd_p1',         p2Key: 'glicko_rd_p2'         },
  { key: 'tsd',        label: 'TSD',           format: 'delta',   p1Key: 'tsd_p1',               p2Key: 'tsd_p2'               },
  { key: 'bppi',       label: 'BPPI',          format: 'delta',   p1Key: 'bppi_p1',              p2Key: 'bppi_p2'              },
  { key: 'map',        label: 'MAP',           format: 'pct',     p1Key: 'map_p1',               p2Key: 'map_p2'               },
  { key: 'win_rate_td', label: 'Win Rate TD',  format: 'pct',     p1Key: 'win_rate_td_p1',        p2Key: 'win_rate_td_p2'        },
  { key: 'win_surf',   label: 'Win Surf TD',   format: 'pct',     p1Key: 'win_rate_surf_td_p1',  p2Key: 'win_rate_surf_td_p2'  },
  { key: 'momentum',   label: 'Momentum TD',    format: 'delta',   p1Key: 'momentum_td_p1',       p2Key: 'momentum_td_p2'       },
  { key: 'breaks_won', label: 'Breaks Won',    format: 'ratio',   p1Key: 'breaks_won_td_p1',     p2Key: 'breaks_won_td_p2'     },
  { key: 'breaks_lost',label: 'Breaks Lost',   format: 'ratio',   p1Key: 'breaks_lost_td_p1',    p2Key: 'breaks_lost_td_p2'    },
  { key: 'fatigue',    label: 'Fatigue 72h',   format: 'plain',   p1Key: 'fatigue_72h_p1',       p2Key: 'fatigue_72h_p2'       },
  { key: 'repos',      label: 'Jours Repos',   format: 'plain',   p1Key: 'jours_repos_p1',       p2Key: 'jours_repos_p2'       },
  { key: 'delta_rank', label: 'Delta Rank 6m', format: 'delta',   p1Key: 'delta_rank_6m_p1',     p2Key: 'delta_rank_6m_p2'     },
  { key: 'win_5m',     label: 'Win Rate 5m',   format: 'pct',     p1Key: 'win_rate_5m_p1',       p2Key: 'win_rate_5m_p2'       },
]

function formatValue(value: unknown, format: MetricDef['format']): string {
  if (value == null) return '—'

  const num = Number(value)

  switch (format) {
    case 'rank':
      return Math.round(num).toLocaleString()
    case 'pct':
      return `${(num * 100).toFixed(1)}%`
    case 'glicko':
      return num.toFixed(1)
    case 'delta': {
      const rounded = Math.round(num * 1000) / 1000
      return rounded >= 0 ? `+${rounded}` : `${rounded}`
    }
    case 'ratio':
      return num.toFixed(2)
    case 'plain':
    default:
      return num.toString()
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getUniqueTournois(matches: MatchRow[]): string[] {
  const seen = new Set<string>()
  for (const m of matches) {
    if (m.tournoi) seen.add(m.tournoi)
  }
  return Array.from(seen).sort()
}

function filterMatches(
  matches: MatchRow[],
  query: string,
  today: boolean,
  activeTournois: Set<string>,
): MatchRow[] {
  const todayStr = new Date().toISOString().split('T')[0]

  return matches.filter((m) => {
    // Search
    if (query) {
      const q = query.toLowerCase()
      if (
        !m.player1.toLowerCase().includes(q) &&
        !m.player2.toLowerCase().includes(q)
      ) {
        return false
      }
    }

    // Today filter
    if (today && m.date_match !== todayStr) return false

    // Tournoi filter
    if (activeTournois.size > 0) {
      if (!m.tournoi || !activeTournois.has(m.tournoi)) return false
    }

    return true
  })
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b border-[var(--border)] animate-pulse">
      <td className="px-4 py-3"><div className="h-3 bg-white/[0.06] rounded w-20" /></td>
      <td className="px-4 py-3"><div className="h-3 bg-white/[0.05] rounded w-36" /></td>
      <td className="px-4 py-3"><div className="h-3 bg-white/[0.05] rounded w-44" /></td>
      <td className="px-4 py-3"><div className="h-5 bg-white/[0.05] rounded-full w-12" /></td>
      <td className="px-4 py-3"><div className="h-3 bg-white/[0.04] rounded w-6 ml-auto" /></td>
    </tr>
  )
}

// ── Accordion panel ───────────────────────────────────────────────────────────

function AccordionPanel({ match }: { match: MatchRow }) {
  return (
    <motion.div
      initial={{ opacity: 0, maxHeight: 0 }}
      animate={{ opacity: 1, maxHeight: 1000 }}
      exit={{ opacity: 0, maxHeight: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <div className="px-4 pb-4 pt-2 border-t border-[var(--border)] bg-[var(--surface-1)]">
        {/* Header labels */}
        <div className="grid grid-cols-[140px_repeat(3,1fr)] gap-2 mb-3">
          <div />
          <p className="text-[11px] font-semibold text-[var(--accent-hi)] text-center truncate">
            {match.player1}
          </p>
          <p className="text-[11px] text-[var(--text-3)] text-center">Metric</p>
          <p className="text-[11px] font-semibold text-[var(--text-2)] text-center truncate">
            {match.player2}
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-[140px_repeat(3,1fr)] gap-2">
          {METRICS.map((m) => {
            const v1 = match[m.p1Key]
            const v2 = match[m.p2Key]
            const d1 = formatValue(v1, m.format)
            const d2 = formatValue(v2, m.format)

            // Highlight better value (higher is better for most tennis metrics)
            const n1 = Number(v1 ?? -Infinity)
            const n2 = Number(v2 ?? -Infinity)
            const higher = n1 > n2 ? 'p1' : n2 > n1 ? 'p2' : null

            return (
              <div key={m.key} className="contents">
                <p className="text-[11px] text-[var(--text-3)] py-1 flex items-center">
                  {m.label}
                </p>
                <p
                  className={cn(
                    'text-xs font-mono text-center py-1 tabular-nums',
                    higher === 'p1' ? 'text-[var(--accent-hi)] font-medium' : 'text-[var(--text-2)]',
                  )}
                >
                  {d1}
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-px h-4 bg-[var(--border)]" />
                </div>
                <p
                  className={cn(
                    'text-xs font-mono text-center py-1 tabular-nums',
                    higher === 'p2' ? 'text-[var(--accent-hi)] font-medium' : 'text-[var(--text-2)]',
                  )}
                >
                  {d2}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// ── Match row ─────────────────────────────────────────────────────────────────

function MatchRowComponent({
  match,
  isOpen,
  onToggle,
}: {
  match: MatchRow
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="border-b border-[var(--border)] cursor-pointer hover:bg-white/[0.02] transition-colors duration-150"
      >
        {/* Date */}
        <td className="px-4 py-3 whitespace-nowrap">
          <span className="text-xs text-[var(--text-3)] font-mono">
            {match.date_match}
          </span>
        </td>

        {/* Tournoi */}
        <td className="px-4 py-3 whitespace-nowrap">
          <span className="text-xs text-[var(--text-3)] max-w-[180px] truncate block">
            {match.tournoi ?? '—'}
          </span>
        </td>

        {/* Match */}
        <td className="px-4 py-3 min-w-0">
          <span className="text-sm font-medium text-[var(--text-1)]">
            <span className="font-semibold">{match.player1}</span>
            {' vs '}
            <span className="font-semibold">{match.player2}</span>
          </span>
        </td>

        {/* Surface */}
        <td className="px-4 py-3 whitespace-nowrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap bg-white/[0.05] text-[var(--text-3)] border border-[var(--border)]">
            {match.surface ?? '—'}
          </span>
        </td>

        {/* Chevron */}
        <td className="px-4 py-3 w-8">
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className={cn(
              'text-[var(--text-3)] shrink-0 ml-auto transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </td>
      </tr>

      {/* Accordion panel */}
      <tr className="p-0">
        <td colSpan={5} className="p-0">
          <AnimatePresence>
            {isOpen && <AccordionPanel match={match} />}
          </AnimatePresence>
        </td>
      </tr>
    </>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

interface MatchTableProps {
  matches: MatchRow[]
}

export default function MatchTable({ matches }: MatchTableProps) {
  const [fetchState] = useState<'loading' | 'success' | 'error'>('success')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterToday, setFilterToday] = useState(false)
  const [activeTournois, setActiveTournois] = useState<Set<string>>(new Set())
  const [openMatchId, setOpenMatchId] = useState<string | null>(null)

  const tournois = useMemo(() => getUniqueTournois(matches), [matches])

  const filtered = useMemo(
    () => filterMatches(matches, searchQuery, filterToday, activeTournois),
    [matches, searchQuery, filterToday, activeTournois],
  )

  function toggleTournoi(t: string) {
    setActiveTournois((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  function clearFilters() {
    setSearchQuery('')
    setFilterToday(false)
    setActiveTournois(new Set())
  }

  const hasFilters = searchQuery || filterToday || activeTournois.size > 0

  // ── Loading state ──────────────────────────────────────────────────────────
  if (fetchState === 'loading') {
    return (
      <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Date', 'Tournoi', 'Match', 'Surface', ''].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (fetchState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-lg border border-[var(--border)] bg-[var(--surface-1)]">
        <div className="w-10 h-10 rounded-xl bg-[var(--red)]/10 border border-[var(--red)]/20 flex items-center justify-center mb-4">
          <AlertCircle size={18} className="text-[var(--red)]" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-[var(--text-2)] mb-1">
          Échec du chargement des matchs
        </p>
        <p className="text-sm text-[var(--text-3)] max-w-xs mb-5">
          Une erreur est survenue lors de la récupération des données. Veuillez réessayer.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="h-8 px-4 flex items-center justify-center gap-1.5 rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors duration-150"
        >
          <RefreshCw size={12} className="shrink-0" />
          Réessayer
        </button>
      </div>
    )
  }

  // ── Success ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3">
        {/* Search + count */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un joueur..."
              className={cn(
                'w-full h-8 pl-8 pr-3 rounded-md text-sm',
                'bg-[var(--surface-1)] border border-[var(--border-md)]',
                'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
                'focus:outline-none focus:border-[var(--accent)]/60',
                'focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150',
              )}
            />
          </div>
          <p className="text-xs text-[var(--text-3)] shrink-0 ml-auto tabular-nums">
            <span className="text-[var(--text-2)] font-medium">{filtered.length}</span>
            {' '}match{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filter toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Today toggle */}
          <button
            onClick={() => setFilterToday((v) => !v)}
            className={cn(
              'h-7 px-3 flex items-center justify-center gap-1.5 rounded-md text-xs font-medium border transition-colors duration-150 whitespace-nowrap',
              filterToday
                ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                : 'border-[var(--border)] bg-transparent text-[var(--text-3)] hover:border-[var(--border-md)] hover:text-[var(--text-2)]',
            )}
          >
            Aujourd'hui
          </button>

          {/* Tournoi toggles */}
          {tournois.map((t) => (
            <button
              key={t}
              onClick={() => toggleTournoi(t)}
              className={cn(
                'h-7 px-2.5 flex items-center justify-center gap-1.5 rounded-md text-xs font-medium border transition-colors duration-150 whitespace-nowrap max-w-[200px]',
                activeTournois.has(t)
                  ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                  : 'border-[var(--border)] bg-transparent text-[var(--text-3)] hover:border-[var(--border-md)] hover:text-[var(--text-2)]',
              )}
            >
              <span className="truncate">{t}</span>
            </button>
          ))}

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="h-7 px-2.5 flex items-center justify-center gap-1 rounded-md text-xs text-[var(--text-3)] hover:text-[var(--red)] transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Date', 'Tournoi', 'Match', 'Surface', ''].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Empty state */}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
                      <SearchX size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-medium text-[var(--text-2)] mb-1">
                      Aucun match trouvé
                    </p>
                    <p className="text-sm text-[var(--text-3)] max-w-xs">
                      {hasFilters
                        ? 'Essayez de modifier ou réinitialiser vos filtres.'
                        : 'Aucun match n\'est disponible pour le moment.'}
                    </p>
                    {hasFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-5 h-8 px-4 flex items-center justify-center gap-1.5 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-black text-xs font-medium transition-colors duration-150"
                      >
                        Réinitialiser les filtres
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((match) => (
                <MatchRowComponent
                  key={match.id}
                  match={match}
                  isOpen={openMatchId === match.id}
                  onToggle={() =>
                    setOpenMatchId((prev) => (prev === match.id ? null : match.id))
                  }
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
