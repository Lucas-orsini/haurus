'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Types ──────────────────────────────────────────────────────────────────────

type MatchRow = {
  id: string
  date_match: string
  tournoi: string | null
  player1: string
  player2: string
  surface: string | null
  best_of: number | null
  rank_p1: number | null; rank_p2: number | null
  p_serve_p1: number | null; p_serve_p2: number | null
  p_return_p1: number | null; p_return_p2: number | null
  glicko_rating_p1: number | null; glicko_rating_p2: number | null
  tsd_p1: number | null; tsd_p2: number | null
  bppi_p1: number | null; bppi_p2: number | null
  map_p1: number | null; map_p2: number | null
  form_p1: string | null; form_p2: string | null
  win_rate_td_p1: number | null; win_rate_td_p2: number | null
  win_rate_surf_td_p1: number | null; win_rate_surf_td_p2: number | null
  momentum_td_p1: number | null; momentum_td_p2: number | null
  breaks_won_td_p1: number | null; breaks_won_td_p2: number | null
  breaks_lost_td_p1: number | null; breaks_lost_td_p2: number | null
  fatigue_72h_p1: number | null; fatigue_72h_p2: number | null
  jours_repos_p1: number | null; jours_repos_p2: number | null
  delta_rank_6m_p1: number | null; delta_rank_6m_p2: number | null
}

type Props = {
  matches: MatchRow[]
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmt(v: number | null, decimals = 1): string {
  if (v === null) return '—'
  return v.toFixed(decimals)
}

function fmtInt(v: number | null): string {
  if (v === null) return '—'
  return Math.round(v).toString()
}

// ── Ligne métrique de l'accordion ─────────────────────────────────────────────

function MetricRow({
  label,
  v1,
  v2,
  decimals = 1,
}: {
  label: string
  v1: number | null
  v2: number | null
  decimals?: number
}) {
  return (
    <tr className="border-b border-[var(--border)] last:border-0 hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-2 text-xs text-[var(--text-3)] whitespace-nowrap min-w-[160px]">
        {label}
      </td>
      <td className="px-4 py-2 text-xs text-[var(--text-1)] font-mono tabular-nums whitespace-nowrap">
        {fmt(v1, decimals)}
      </td>
      <td className="px-4 py-2 text-xs text-[var(--text-1)] font-mono tabular-nums whitespace-nowrap">
        {fmt(v2, decimals)}
      </td>
    </tr>
  )
}

// ── Accordion panel ────────────────────────────────────────────────────────────

function AccordionPanel({ match }: { match: MatchRow }) {
  return (
    <tr>
      <td colSpan={4} className="p-0 border-b border-[var(--border)]">
        <div className="overflow-x-auto">
          <div className="bg-[var(--surface-1)] border-y border-[var(--border)]">
            {/* Header joueurs */}
            <div className="flex items-center border-b border-[var(--border)] px-4 py-2.5">
              <span className="flex-1 text-xs font-semibold text-[var(--text-1)]">{match.player1}</span>
              <span className="flex-1 text-center text-[11px] text-[var(--text-3)] uppercase tracking-wider">Joueur</span>
              <span className="flex-1 text-right text-xs font-semibold text-[var(--text-1)]">{match.player2}</span>
            </div>
            <table className="w-full">
              <tbody>
                <MetricRow label="Classement" v1={match.rank_p1} v2={match.rank_p2} decimals={0} />
                <MetricRow label="Glicko" v1={match.glicko_rating_p1} v2={match.glicko_rating_p2} decimals={0} />
                <MetricRow label="Prob. service" v1={match.p_serve_p1} v2={match.p_serve_p2} />
                <MetricRow label="Prob. retour" v1={match.p_return_p1} v2={match.p_return_p2} />
                <MetricRow label="Taux service direct" v1={match.tsd_p1} v2={match.tsd_p2} />
                <MetricRow label="Points de break" v1={match.bppi_p1} v2={match.bppi_p2} />
                <MetricRow label="Moyenne a posteriori" v1={match.map_p1} v2={match.map_p2} />
                <MetricRow label="Forme récente" v1={null} v2={null} decimals={0} />
                <tr className="border-b border-[var(--border)] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-2 text-xs text-[var(--text-3)] whitespace-nowrap">Forme récente</td>
                  <td className="px-4 py-2 text-xs text-[var(--text-1)] font-mono tabular-nums">
                    {match.form_p1 ?? '—'}
                  </td>
                  <td className="px-4 py-2 text-xs text-[var(--text-1)] font-mono tabular-nums">
                    {match.form_p2 ?? '—'}
                  </td>
                </tr>
                <MetricRow label="Win rate total" v1={match.win_rate_td_p1} v2={match.win_rate_td_p2} />
                <MetricRow label="Win rate surface" v1={match.win_rate_surf_td_p1} v2={match.win_rate_surf_td_p2} />
                <MetricRow label="Momentum" v1={match.momentum_td_p1} v2={match.momentum_td_p2} />
                <MetricRow label="Breaks gagnés" v1={match.breaks_won_td_p1} v2={match.breaks_won_td_p2} />
                <MetricRow label="Breaks perdus" v1={match.breaks_lost_td_p1} v2={match.breaks_lost_td_p2} />
                <MetricRow label="Fatigue 72h" v1={match.fatigue_72h_p1} v2={match.fatigue_72h_p2} decimals={0} />
                <MetricRow label="Jours repos" v1={match.jours_repos_p1} v2={match.jours_repos_p2} decimals={0} />
                <MetricRow label="Delta rank 6m" v1={match.delta_rank_6m_p1} v2={match.delta_rank_6m_p2} decimals={0} />
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  )
}

// ── Composant principal ────────────────────────────────────────────────────────

export function OverviewClient({ matches }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterToday, setFilterToday] = useState(false)
  const [activeTournaments, setActiveTournaments] = useState<Set<string>>(new Set())
  const [openMatchId, setOpenMatchId] = useState<string | null>(null)

  // Extraire la liste des tournois uniques (sans null)
  const tournaments = useMemo(() => {
    const seen = new Set<string>()
    matches.forEach(m => { if (m.tournoi) seen.add(m.tournoi) })
    return Array.from(seen).sort()
  }, [matches])

  // Toggle un tournoi
  const toggleTournament = (t: string) => {
    setActiveTournaments(prev => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  // Filtres combinés
  const filtered = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return matches.filter(m => {
      if (filterToday && m.date_match !== today) return false
      if (activeTournaments.size > 0 && !activeTournaments.has(m.tournoi ?? '')) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (!m.player1.toLowerCase().includes(q) && !m.player2.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [matches, filterToday, activeTournaments, searchQuery])

  const hasFilters = filterToday || activeTournaments.size > 0 || searchQuery.length > 0

  return (
    <div className="space-y-4">

      {/* ── Barre de contrôles ── */}
      <div className="flex flex-col gap-3">

        {/* Ligne principale : search + bouton reset */}
        <div className="flex items-center gap-2">
          {/* Input recherche */}
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher un joueur…"
              className="w-full h-8 pl-8 pr-8 rounded-md text-sm
                         bg-[var(--surface-1)] border border-[var(--border-md)]
                         text-[var(--text-1)] placeholder:text-[var(--text-3)]
                         focus:outline-none focus:border-[var(--accent)]/60
                         focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
              >
                <X size={12} />
              </button>
            ) : null}
          </div>

          {/* Reset global */}
          {hasFilters && (
            <button
              onClick={() => { setSearchQuery(''); setFilterToday(false); setActiveTournaments(new Set()) }}
              className="h-8 px-3 flex items-center justify-center gap-1.5 rounded-md
                         border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06]
                         text-[var(--text-2)] text-xs font-medium transition-colors duration-150 whitespace-nowrap"
            >
              <X size={12} />
              Réinitialiser
            </button>
          )}

          {/* Compteur */}
          <p className="text-xs text-[var(--text-3)] shrink-0 ml-auto">
            <span className="text-[var(--text-2)] font-medium tabular-nums">{filtered.length}</span>
            {' '}résultat{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Ligne filtres */}
        <div className="flex items-center gap-2 flex-wrap">

          {/* Toggle Aujourd'hui */}
          <button
            onClick={() => setFilterToday(v => !v)}
            className={cn(
              'h-7 px-3 flex items-center justify-center gap-1.5 rounded-full text-xs font-medium border transition-colors duration-150 whitespace-nowrap',
              filterToday
                ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]'
                : 'border-[var(--border-md)] bg-transparent text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-[var(--border-hi)]'
            )}
          >
            Aujourd'hui
          </button>

          {/* Chips tournois */}
          {tournaments.map(t => (
            <button
              key={t}
              onClick={() => toggleTournament(t)}
              className={cn(
                'h-7 px-3 flex items-center justify-center gap-1.5 rounded-full text-xs font-medium border transition-colors duration-150 whitespace-nowrap',
                activeTournaments.has(t)
                  ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]'
                  : 'border-[var(--border-md)] bg-transparent text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-[var(--border-hi)]'
              )}
            >
              {activeTournaments.has(t) && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />}
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tableau ── */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg overflow-hidden">
        {filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
              <Search size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-[var(--text-2)] mb-1">Aucun match trouvé</p>
            <p className="text-sm text-[var(--text-3)] max-w-xs">
              {hasFilters
                ? 'Aucun match ne correspond aux filtres actifs. Essayez de modifier votre recherche.'
                : "Aucun match disponible pour le moment."}
            </p>
            {hasFilters && (
              <button
                onClick={() => { setSearchQuery(''); setFilterToday(false); setActiveTournaments(new Set()) }}
                className="mt-5 h-8 px-4 flex items-center justify-center gap-1.5 rounded-md
                           bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white text-xs font-medium transition-colors"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {['Date', 'Tournoi', 'Joueurs', 'Surface'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((match, i) => {
                  const isOpen = openMatchId === match.id
                  return (
                    <>
                      {/* Ligne principale — cliquable */}
                      <tr
                        key={match.id}
                        onClick={() => setOpenMatchId(isOpen ? null : match.id)}
                        className={cn(
                          'border-b border-[var(--border)] last:border-0 cursor-pointer transition-colors duration-100',
                          i % 2 === 1 ? 'bg-[var(--surface-2)]' : 'bg-[var(--surface-1)]',
                          'hover:bg-white/[0.03]'
                        )}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-[var(--text-2)]">{match.date_match}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-[var(--text-2)]">{match.tournoi ?? '—'}</span>
                        </td>
                        <td className="px-4 py-3 min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-medium text-[var(--text-1)] truncate">{match.player1}</span>
                            <span className="text-xs text-[var(--text-3)] shrink-0">vs</span>
                            <span className="text-xs font-medium text-[var(--text-1)] truncate">{match.player2}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-[var(--text-3)]">{match.surface ?? '—'}</span>
                        </td>
                        <td className="px-4 py-3 shrink-0">
                          <ChevronDown
                            size={14}
                            strokeWidth={1.5}
                            className={cn(
                              'text-[var(--text-3)] transition-transform duration-200',
                              isOpen && 'rotate-180'
                            )}
                          />
                        </td>
                      </tr>
                      {/* Accordion panel */}
                      {isOpen && <AccordionPanel match={match} />}
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
