'use client'

import { useState } from 'react'
import { cn, formatMetricValue, formatForme, getDeltaColor, getMetricColor } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { EnrichedMatchHistory, MatchStats } from '@/lib/types/match'

interface MatchHistoryTableProps {
  playerName: string
  matchHistory: EnrichedMatchHistory[]
}

// ─── Définitions des métriques comparatives ────────────────────────────────────
interface MetricDef {
  label: string
  p1Key: keyof MatchStats
  p2Key: keyof MatchStats
  mode: 'higher' | 'lower' | 'neutral' | 'delta'
}

const METRIC_DEFS: MetricDef[] = [
  { label: 'Classement ATP',         p1Key: 'rank_p1',              p2Key: 'rank_p2',              mode: 'lower'   },
  { label: 'Évolution rank 6 mois', p1Key: 'delta_rank_6m_p1',     p2Key: 'delta_rank_6m_p2',     mode: 'delta'   },
  { label: 'P-Serve',               p1Key: 'p_serve_p1',            p2Key: 'p_serve_p2',            mode: 'higher'  },
  { label: 'P-Return',              p1Key: 'p_return_p1',           p2Key: 'p_return_p2',           mode: 'higher'  },
  { label: 'Glicko Rating',         p1Key: 'glicko_rating_p1',      p2Key: 'glicko_rating_p2',      mode: 'higher'  },
  { label: 'TSD',                   p1Key: 'tsd_p1',                p2Key: 'tsd_p2',                mode: 'higher'  },
  { label: 'BPPI',                  p1Key: 'bppi_p1',               p2Key: 'bppi_p2',               mode: 'higher'  },
  { label: 'MAP',                   p1Key: 'map_p1',                p2Key: 'map_p2',                mode: 'higher'  },
  { label: 'Win Rate TD',           p1Key: 'win_rate_td_p1',        p2Key: 'win_rate_td_p2',        mode: 'higher'  },
  { label: 'Win Rate Surface TD',   p1Key: 'win_rate_surf_td_p1',   p2Key: 'win_rate_surf_td_p2',   mode: 'higher'  },
  { label: 'Momentum TD',           p1Key: 'momentum_td_p1',        p2Key: 'momentum_td_p2',        mode: 'higher'  },
  { label: 'Breaks Won TD',        p1Key: 'breaks_won_td_p1',      p2Key: 'breaks_won_td_p2',      mode: 'higher'  },
  { label: 'Breaks Lost TD',       p1Key: 'breaks_lost_td_p1',     p2Key: 'breaks_lost_td_p2',     mode: 'lower'   },
  { label: 'Fatigue 72H',          p1Key: 'fatigue_72h_p1',        p2Key: 'fatigue_72h_p2',        mode: 'lower'   },
  { label: 'Jours de repos',       p1Key: 'jours_repos_p1',        p2Key: 'jours_repos_p2',        mode: 'neutral' },
  { label: 'Forme',                 p1Key: 'form_p1',                p2Key: 'form_p2',                mode: 'neutral' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  const [year, month, day] = dateStr.split('-')
  if (!year || !month || !day) return dateStr
  return `${day}/${month}/${year}`
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

function FormeCell({ value }: { value: string | null }) {
  const segments = formatForme(value)
  if (!segments) return <span className="text-[var(--text-3)]">—</span>
  return (
    <span className="flex items-center gap-px">
      {segments.map((seg, i) => (
        <span
          key={i}
          className={cn(
            seg.color === 'green'   && 'text-[var(--green)]',
            seg.color === 'red'     && 'text-[var(--red)]',
            seg.color === 'neutral' && 'text-[var(--text-3)]'
          )}
        >
          {seg.char}
        </span>
      ))}
    </span>
  )
}

function MetricsGrid({
  stats,
  isSwapped,
}: {
  stats: MatchStats
  isSwapped: boolean
}) {
  return (
    <div className="space-y-0">
      {METRIC_DEFS.map(({ label, p1Key, p2Key, mode }, idx) => {
        // Valeurs dans l'ordre du row (p1Key = stats.player1, p2Key = stats.player2)
        const rawVal1 = stats[p1Key] as number | null
        const rawVal2 = stats[p2Key] as number | null

        // Si les colonnes sont swappées (playerName ≠ stats.player1),
        // la valeur du joueur current était dans p2Key et celle de l'adversaire dans p1Key.
        const currentVal = isSwapped ? rawVal2 : rawVal1
        const opponentVal = isSwapped ? rawVal1 : rawVal2

        const [classCurrent, classOpponent] = getMetricColor(currentVal, opponentVal, mode)

        const isGlickoCurrent = p1Key === 'glicko_rating_p1'
        const isGlickoOpponent = p2Key === 'glicko_rating_p2'

        return (
          <div
            key={label}
            className={cn(
              'grid grid-cols-[1fr_2fr_1fr] gap-3 py-2.5',
              idx < METRIC_DEFS.length - 1 && 'border-b border-[var(--border)]'
            )}
          >
            {/* Valeur joueur current — left */}
            <div className="flex items-center justify-center">
              <span className="text-xs font-mono tabular-nums">
                {currentVal === null || currentVal === undefined ? (
                  <span className="text-[var(--text-3)]">—</span>
                ) : p1Key === 'form_p1' ? (
                  <FormeCell value={isSwapped ? stats.form_p2 : stats.form_p1} />
                ) : p1Key === 'delta_rank_6m_p1' ? (
                  <span className={cn(getDeltaColor(isSwapped ? stats.delta_rank_6m_p2 : stats.delta_rank_6m_p1))}>
                    {formatMetricValue(currentVal, p1Key as keyof MatchStats)}
                  </span>
                ) : (
                  <span className={cn(isGlickoCurrent ? classCurrent : classCurrent)}>
                    {isGlickoCurrent ? Math.round(currentVal) : formatMetricValue(currentVal, p1Key as keyof MatchStats)}
                  </span>
                )}
              </span>
            </div>

            {/* Label — center */}
            <div className="flex items-center justify-center">
              <span className="text-[11px] text-[var(--text-3)] leading-none text-center">
                {label}
              </span>
            </div>

            {/* Valeur adversaire — right */}
            <div className="flex items-center justify-center">
              <span className="text-xs font-mono tabular-nums">
                {opponentVal === null || opponentVal === undefined ? (
                  <span className="text-[var(--text-3)]">—</span>
                ) : p2Key === 'form_p2' ? (
                  <FormeCell value={isSwapped ? stats.form_p1 : stats.form_p2} />
                ) : p2Key === 'delta_rank_6m_p2' ? (
                  <span className={cn(getDeltaColor(isSwapped ? stats.delta_rank_6m_p1 : stats.delta_rank_6m_p2))}>
                    {formatMetricValue(opponentVal, p2Key as keyof MatchStats)}
                  </span>
                ) : (
                  <span className={cn(isGlickoOpponent ? classOpponent : classOpponent)}>
                    {isGlickoOpponent ? Math.round(opponentVal) : formatMetricValue(opponentVal, p2Key as keyof MatchStats)}
                  </span>
                )}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Composant principal ───────────────────────────────────────────────────────

export default function MatchHistoryTable({
  playerName,
  matchHistory,
}: MatchHistoryTableProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalStats, setModalStats] = useState<MatchStats | null>(null)
  const [modalOpponent, setModalOpponent] = useState<string>('')
  const [loadingMetrics, setLoadingMetrics] = useState(false)

  async function handleOpenMetrics(date_match: string, opponent: string) {
    setModalOpponent(opponent)
    setModalStats(null)
    setModalOpen(true)
    setLoadingMetrics(true)

    const supabase = createClient()
    if (!supabase) {
      setLoadingMetrics(false)
      return
    }

    try {
      // Recherche bidirectionnelle : (player1=playerName, player2=opponent)
      // OU (player1=opponent, player2=playerName)
      const { data } = await supabase
        .from('match_stats')
        .select('*')
        .eq('date_match', date_match)
        .or(
          `player1.ilike.%${playerName}%,player2.ilike.%${playerName}%`
        )
        .single()

      setModalStats((data as MatchStats) ?? null)
    } catch {
      setModalStats(null)
    } finally {
      setLoadingMetrics(false)
    }
  }

  function handleCloseModal() {
    setModalOpen(false)
    setTimeout(() => {
      setModalStats(null)
      setModalOpponent('')
    }, 200)
  }

  // ── Empty state ──────────────────────────────────────────────────────────
  if (matchHistory.length === 0) {
    return (
      <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg px-4 py-6 text-center">
        <p className="text-sm text-[var(--text-3)]">
          Aucun match enregistré pour ce joueur
        </p>
      </div>
    )
  }

  const isSwapped =
    modalStats != null && modalStats.player1 !== playerName

  return (
    <>
      {/* ── Tableau ─────────────────────────────────────────────────────── */}
      <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Date', 'Adversaire', 'Tournoi', 'Surface', 'Score', 'Résultat', ''].map((h) => (
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
              {matchHistory.map((match) => (
                <tr
                  key={match.id}
                  className={cn(
                    'border-b border-[var(--border)] last:border-0',
                    'hover:bg-white/[0.02] transition-colors duration-150'
                  )}
                >
                  {/* Date */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-xs font-mono text-[var(--text-3)] tabular-nums">
                      {formatDate(match.date_match)}
                    </span>
                  </td>

                  {/* Adversaire */}
                  <td className="px-4 py-3.5 min-w-0">
                    <span className="text-sm text-[var(--text-1)] truncate block max-w-[140px]">
                      {match.adversaire}
                    </span>
                  </td>

                  {/* Tournoi */}
                  <td className="px-4 py-3.5 max-w-[160px]">
                    <span className="truncate block text-sm text-[var(--text-2)]">
                      {match.tournoi ?? '—'}
                    </span>
                  </td>

                  {/* Surface */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-xs text-[var(--text-3)]">
                      {match.surface ?? '—'}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-xs font-mono text-[var(--text-2)] tabular-nums">
                      {match.score ?? '—'}
                    </span>
                  </td>

                  {/* Résultat */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {match.resultat === 'V' ? (
                      <span className="text-xs font-semibold text-[var(--green)]">V</span>
                    ) : match.resultat === 'D' ? (
                      <span className="text-xs font-semibold text-[var(--red)]">D</span>
                    ) : (
                      <span className="text-xs text-[var(--text-3)]">—</span>
                    )}
                  </td>

                  {/* Bouton Métriques */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenMetrics(match.date_match, match.adversaire)}
                      className="h-7 px-2.5 flex items-center justify-center gap-1.5 rounded-md
                                 border border-[var(--border-md)] bg-white/[0.03]
                                 hover:bg-white/[0.07] hover:border-[var(--border-hi)]
                                 text-[var(--text-2)] text-[11px] font-medium
                                 transition-colors duration-150 whitespace-nowrap"
                    >
                      Métriques
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
        >
          <div className="w-full max-w-2xl bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                {/* Joueur current */}
                <div className="flex flex-col items-center min-w-0">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate max-w-[120px]">
                    {playerName}
                  </span>
                  <span className="text-[10px] text-[var(--text-3)]">vous</span>
                </div>

                {/* vs */}
                <span className="text-[var(--text-3)] text-xs shrink-0 mx-1">vs</span>

                {/* Adversaire */}
                <div className="flex flex-col items-center min-w-0">
                  <span className="text-xs font-medium text-[var(--text-1)] truncate max-w-[120px]">
                    {modalOpponent}
                  </span>
                  <span className="text-[10px] text-[var(--text-3)]">adversaire</span>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-7 h-7 flex items-center justify-center rounded-md
                           hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)]
                           transition-colors duration-150 shrink-0 ml-3"
                aria-label="Fermer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {loadingMetrics ? (
                /* Skeleton */
                <div className="space-y-0">
                  {METRIC_DEFS.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'grid grid-cols-[1fr_2fr_1fr] gap-3 py-2.5',
                        idx < METRIC_DEFS.length - 1 && 'border-b border-[var(--border)]'
                      )}
                    >
                      {[0, 1, 2].map((col) => (
                        <div key={col} className="flex items-center justify-center">
                          <div className="h-3 bg-white/[0.06] rounded animate-pulse w-12" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : modalStats ? (
                <MetricsGrid stats={modalStats} isSwapped={isSwapped} />
              ) : (
                /* Aucune stats disponible */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-[var(--text-2)] mb-1">
                    Métriques pré-match non disponibles
                  </p>
                  <p className="text-xs text-[var(--text-3)] max-w-xs">
                    Les données de métriques ne sont pas présentes pour ce match dans la base de données.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end px-5 py-3 border-t border-[var(--border)] shrink-0">
              <button
                onClick={handleCloseModal}
                className="h-8 px-4 flex items-center justify-center rounded-md
                           border border-[var(--border-md)] bg-white/[0.03]
                           hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium
                           transition-colors duration-150"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
