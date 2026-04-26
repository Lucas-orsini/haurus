'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, X, ChevronDown, Trophy, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchStats } from '@/lib/match-stats'

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function getTodayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function getUniqueTournaments(matches: MatchStats[]): string[] {
  const seen = new Set<string>()
  matches.forEach(m => seen.add(m.tournoi))
  return Array.from(seen).sort()
}

function formatMetricValue(value: number | null, name: string): string {
  if (value === null) return '—'
  if (name === 'p_serve' || name === 'Glicko-2') return value.toFixed(1)
  if (name === 'BPPI') return value.toFixed(2)
  if (name === 'FSP' || name === 'Saved BP') return `${Math.round(value)}%`
  return String(value)
}

// ── Mock data ────────────────────────────────────────────────────────────────

const MOCK_MATCHES: MatchStats[] = (() => {
  const today = new Date()
  const d = (offset: number) => {
    const dt = new Date(today)
    dt.setDate(dt.getDate() - offset)
    return dt.toISOString().slice(0, 10)
  }

  return [
    {
      id: 'm1',
      date: d(0),
      tournoi: 'Roland Garros',
      joueur1: 'R. Nadal',
      joueur2: 'N. Djokovic',
      surface: 'Clay',
      metrics: [
        { name: 'p_serve',    joueur1_value: 65.4,  joueur2_value: 58.2 },
        { name: 'BPPI',       joueur1_value: 0.34,  joueur2_value: 0.41 },
        { name: 'Glicko-2',   joueur1_value: 1842,  joueur2_value: 1819 },
        { name: 'FSP',        joueur1_value: 61,    joueur2_value: 58 },
        { name: 'Saved BP',   joueur1_value: 72,    joueur2_value: 68 },
      ],
    },
    {
      id: 'm2',
      date: d(0),
      tournoi: 'Wimbledon',
      joueur1: 'J. Sinner',
      joueur2: 'C. Ruud',
      surface: 'Grass',
      metrics: [
        { name: 'p_serve',    joueur1_value: 71.2,  joueur2_value: 63.8 },
        { name: 'BPPI',       joueur1_value: 0.28,  joueur2_value: 0.39 },
        { name: 'Glicko-2',   joueur1_value: 1920,  joueur2_value: 1784 },
        { name: 'FSP',        joueur1_value: 67,    joueur2_value: 59 },
        { name: 'Saved BP',   joueur1_value: 78,    joueur2_value: 65 },
      ],
    },
    {
      id: 'm3',
      date: d(1),
      tournoi: 'US Open',
      joueur1: 'D. Medvedev',
      joueur2: 'A. Zverev',
      surface: 'Hard',
      metrics: [
        { name: 'p_serve',    joueur1_value: 58.6,  joueur2_value: 62.1 },
        { name: 'BPPI',       joueur1_value: 0.45,  joueur2_value: 0.38 },
        { name: 'Glicko-2',   joueur1_value: 1855,  joueur2_value: 1832 },
        { name: 'FSP',        joueur1_value: 55,    joueur2_value: 60 },
        { name: 'Saved BP',   joueur1_value: 61,    joueur2_value: 70 },
      ],
    },
    {
      id: 'm4',
      date: d(2),
      tournoi: 'Roland Garros',
      joueur1: 'S. Tsitsipas',
      joueur2: 'A. Rublev',
      surface: 'Clay',
      metrics: [
        { name: 'p_serve',    joueur1_value: 64.3,  joueur2_value: 59.7 },
        { name: 'BPPI',       joueur1_value: 0.36,  joueur2_value: 0.44 },
        { name: 'Glicko-2',   joueur1_value: 1798,  joueur2_value: 1771 },
        { name: 'FSP',        joueur1_value: 62,    joueur2_value: 57 },
        { name: 'Saved BP',   joueur1_value: 69,    joueur2_value: 63 },
      ],
    },
    {
      id: 'm5',
      date: d(3),
      tournoi: 'Wimbledon',
      joueur1: 'N. Djokovic',
      joueur2: 'A. de Minaur',
      surface: 'Grass',
      metrics: [
        { name: 'p_serve',    joueur1_value: 61.0,  joueur2_value: 55.4 },
        { name: 'BPPI',       joueur1_value: 0.32,  joueur2_value: 0.48 },
        { name: 'Glicko-2',   joueur1_value: 1819,  joueur2_value: 1742 },
        { name: 'FSP',        joueur1_value: 60,    joueur2_value: 54 },
        { name: 'Saved BP',   joueur1_value: 74,    joueur2_value: 59 },
      ],
    },
    {
      id: 'm6',
      date: d(4),
      tournoi: 'US Open',
      joueur1: 'T. Fritz',
      joueur2: 'F. Tiafoe',
      surface: 'Hard',
      metrics: [
        { name: 'p_serve',    joueur1_value: 68.9,  joueur2_value: 65.2 },
        { name: 'BPPI',       joueur1_value: 0.30,  joueur2_value: 0.35 },
        { name: 'Glicko-2',   joueur1_value: 1820,  joueur2_value: 1795 },
        { name: 'FSP',        joueur1_value: 64,    joueur2_value: 61 },
        { name: 'Saved BP',   joueur1_value: 71,    joueur2_value: 67 },
      ],
    },
    {
      id: 'm7',
      date: d(5),
      tournoi: 'Roland Garros',
      joueur1: 'H. Rune',
      joueur2: 'F. Cerundolo',
      surface: 'Clay',
      metrics: [
        { name: 'p_serve',    joueur1_value: 60.5,  joueur2_value: 57.1 },
        { name: 'BPPI',       joueur1_value: 0.42,  joueur2_value: 0.46 },
        { name: 'Glicko-2',   joueur1_value: 1756,  joueur2_value: 1723 },
        { name: 'FSP',        joueur1_value: 58,    joueur2_value: 55 },
        { name: 'Saved BP',   joueur1_value: 64,    joueur2_value: 60 },
      ],
    },
    {
      id: 'm8',
      date: d(6),
      tournoi: 'Wimbledon',
      joueur1: 'M. Bublik',
      joueur2: 'B. Shelton',
      surface: 'Grass',
      metrics: [
        { name: 'p_serve',    joueur1_value: 70.1,  joueur2_value: 73.4 },
        { name: 'BPPI',       joueur1_value: 0.38,  joueur2_value: 0.29 },
        { name: 'Glicko-2',   joueur1_value: 1768,  joueur2_value: 1801 },
        { name: 'FSP',        joueur1_value: 66,    joueur2_value: 70 },
        { name: 'Saved BP',   joueur1_value: 68,    joueur2_value: 75 },
      ],
    },
  ]
})()

// ── Types ────────────────────────────────────────────────────────────────────

interface Props {
  matches: MatchStats[] | null
  userName: string
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// ── Skeleton ─────────────────────────────────────────────────────────────────

function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border-md)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border-md)] bg-[var(--surface-1)]">
            {['Date', 'Tournoi', 'Match', 'Surface'].map(h => (
              <th key={h} className="px-4 py-3 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i} className="border-b border-[var(--border)] animate-pulse">
              <td className="px-4 py-4"><div className="h-3 bg-white/[0.06] rounded w-20" /></td>
              <td className="px-4 py-4"><div className="h-3 bg-white/[0.05] rounded w-28" /></td>
              <td className="px-4 py-4"><div className="h-3 bg-white/[0.05] rounded w-48" /></td>
              <td className="px-4 py-4"><div className="h-3 bg-white/[0.04] rounded w-16" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-lg border border-dashed border-[var(--border-md)]">
      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
        <Trophy size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium text-[var(--text-2)] mb-1">Aucun match ne correspond</p>
      <p className="text-sm text-[var(--text-3)] max-w-xs">
        Essayez de modifier vos filtres ou la recherche.
      </p>
    </div>
  )
}

// ── Accordion Row ─────────────────────────────────────────────────────────────

function AccordionRow({ match }: { match: MatchStats }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <tr
        className="group cursor-pointer even:bg-[var(--surface-2)] odd:bg-[var(--surface-1)] hover:bg-white/[0.03] transition-colors duration-100"
        onClick={() => setOpen(v => !v)}
      >
        {/* Date */}
        <td className="px-4 py-3.5 whitespace-nowrap">
          <span className="text-xs text-[var(--text-2)] font-mono">{formatDate(match.date)}</span>
        </td>
        {/* Tournoi */}
        <td className="px-4 py-3.5 whitespace-nowrap">
          <span className="text-xs text-[var(--text-2)]">{match.tournoi}</span>
        </td>
        {/* Match */}
        <td className="px-4 py-3.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-1)] font-medium truncate">{match.joueur1}</span>
            <span className="text-xs text-[var(--text-3)] shrink-0">vs</span>
            <span className="text-xs text-[var(--text-1)] font-medium truncate">{match.joueur2}</span>
          </div>
        </td>
        {/* Surface */}
        <td className="px-4 py-3.5 whitespace-nowrap">
          <span className="text-xs text-[var(--text-3)]">{match.surface}</span>
        </td>
        {/* Chevron */}
        <td className="px-4 py-3.5 pr-4">
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className={cn(
              'text-[var(--text-3)] shrink-0 transition-transform duration-200 ml-auto',
              open && 'rotate-180'
            )}
          />
        </td>
      </tr>

      {/* Accordion panel */}
      <tr>
        <td colSpan={5} className="px-4 pb-0 overflow-hidden">
          <div
            className={cn(
              'overflow-hidden transition-all duration-200',
              open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="py-4 mt-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)]">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-md)]">
                    <th className="px-4 py-2 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">Métrique</th>
                    <th className="px-4 py-2 text-right text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">{match.joueur1}</th>
                    <th className="px-4 py-2 text-right text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">{match.joueur2}</th>
                  </tr>
                </thead>
                <tbody>
                  {match.metrics.map((metric, i) => (
                    <tr
                      key={metric.name}
                      className={cn(
                        'border-b border-[var(--border)] last:border-0',
                        i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                      )}
                    >
                      <td className="px-4 py-2.5 text-[var(--text-2)] font-mono">{metric.name}</td>
                      <td className="px-4 py-2.5 text-right text-[var(--text-1)] font-medium tabular-nums">
                        {formatMetricValue(metric.joueur1_value, metric.name)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-[var(--text-1)] font-medium tabular-nums">
                        {formatMetricValue(metric.joueur2_value, metric.name)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

// ── Toggle pill ──────────────────────────────────────────────────────────────

function TogglePill({ label, active, onClick }: { label: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-7 px-3 flex items-center justify-center gap-1.5 rounded-md text-xs font-medium',
        'border transition-all duration-150 whitespace-nowrap',
        active
          ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-hi)]'
          : 'border-[var(--border-md)] bg-white/[0.03] text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.06]'
      )}
    >
      {label}
    </button>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

export default function DashboardClient({ matches: propMatches, userName }: Props) {
  // Use mock data if backend not ready
  const allMatches: MatchStats[] = propMatches ?? MOCK_MATCHES
  const todayISO = getTodayISO()
  const tournaments = useMemo(() => getUniqueTournaments(allMatches), [allMatches])

  const [loadingState, setLoadingState] = useState<LoadingState>('idle')
  const [searchQuery, setSearchQuery] = useState('')
  const [todayFilter, setTodayFilter] = useState(false)
  const [selectedTournaments, setSelectedTournaments] = useState<Set<string>>(new Set())

  // Simulate async loading on mount
  useEffect(() => {
    setLoadingState('loading')
    const timer = setTimeout(() => setLoadingState('success'), 600)
    return () => clearTimeout(timer)
  }, [])

  const toggleTournament = (t: string) => {
    setSelectedTournaments(prev => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  const displayedMatches = useMemo(() => {
    let result = allMatches

    // 1. Filtre recherche joueurs
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        m => m.joueur1.toLowerCase().includes(q) || m.joueur2.toLowerCase().includes(q)
      )
    }

    // 2. Filtre aujourd'hui
    if (todayFilter) {
      result = result.filter(m => m.date === todayISO)
    }

    // 3. Filtre tournois (ET)
    if (selectedTournaments.size > 0) {
      result = result.filter(m => selectedTournaments.has(m.tournoi))
    }

    return result
  }, [allMatches, searchQuery, todayFilter, todayISO, selectedTournaments])

  const hasActiveFilters = todayFilter || selectedTournaments.size > 0 || searchQuery.trim().length > 0

  return (
    <div>
      {/* ── Page header ─────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">Overview</h1>
        <p className="text-sm text-[var(--text-3)] mt-0.5">
          Bienvenue, {userName} — {allMatches.length} matchs disponibles.
        </p>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 mb-4">
        {/* Search + filter toggles — single line */}
        <div className="flex items-center gap-2 flex-wrap">

          {/* Search input */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher un joueur..."
              className="w-full h-8 pl-8 pr-8 rounded-md text-sm bg-[var(--surface-1)] border border-[var(--border-md)]
                         text-[var(--text-1)] placeholder:text-[var(--text-3)]
                         focus:outline-none focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15
                         transition-colors duration-150"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Toggle "Aujourd'hui" */}
          <TogglePill
            label={
              <span className="flex items-center gap-1.5">
                <Calendar size={11} strokeWidth={1.5} />
                Aujourd'hui
              </span>
            }
            active={todayFilter}
            onClick={() => setTodayFilter(v => !v)}
          />

          {/* Tournament toggles */}
          {tournaments.map(t => (
            <TogglePill
              key={t}
              label={t}
              active={selectedTournaments.has(t)}
              onClick={() => toggleTournament(t)}
            />
          ))}

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={() => { setSearchQuery(''); setTodayFilter(false); setSelectedTournaments(new Set()) }}
              className="h-7 px-2.5 flex items-center justify-center gap-1 rounded-md text-xs text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.04] transition-colors"
            >
              <X size={11} />
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* ── Table / states ─────────────────────────────────── */}
      {loadingState === 'loading' ? (
        <TableSkeleton />
      ) : loadingState === 'error' ? (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-lg border border-[var(--red)]/20 bg-[var(--red)]/[0.03]">
          <p className="text-sm font-medium text-[var(--red)] mb-1">Erreur de chargement</p>
          <p className="text-xs text-[var(--text-3)]">Impossible de récupérer les matchs. Veuillez réessayer.</p>
        </div>
      ) : displayedMatches.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--border-md)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-md)] bg-[var(--surface-1)]">
                {['Date', 'Tournoi', 'Match', 'Surface', ''].map(h => (
                  <th
                    key={h}
                    className={cn(
                      'px-4 py-3 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap',
                      h === '' && 'w-8'
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedMatches.map(match => (
                <AccordionRow key={match.id} match={match} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Count footer */}
      {!loadingState && (
        <p className="text-xs text-[var(--text-3)] mt-3 text-right">
          {displayedMatches.length}
          {' sur '}
          {allMatches.length}
          {' matchs'}
        </p>
      )}
    </div>
  )
}
