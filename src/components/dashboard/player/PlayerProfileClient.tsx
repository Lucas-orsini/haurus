'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import PlayerSearchBar from './PlayerSearchBar'
import SurfaceSelector from './SurfaceSelector'
import PlayerMetricCards from './PlayerMetricCards'
import PlayerStatsChart from './PlayerStatsChart'
import MatchHistoryTable from './MatchHistoryTable'
import MatchMetricsModal from './MatchMetricsModal'
import FollowPlayerModal from './FollowPlayerModal'
import type { Database } from '@/lib/supabase/database.types'
import type { MatchStats } from '@/lib/types/match'
import { addTrackedPlayer, removeTrackedPlayer } from '@/app/dashboard/player/actions'
import { PLAN_LIMITS } from '@/config/planLimits'

type PlayerStats = Database['public']['Tables']['player_stats']['Row']
type AtpAverage = Database['public']['Tables']['atp_averages']['Row']

export type TrackedPlayer = { player_name: string; added_at: string; locked_until: string }

/** Shape of a history entry */
export type EnrichedMatchHistory = {
  id: string
  date_match: string
  player1: string
  player2: string
  winner: string | null
  score: string | null
  tournoi: string | null
  surface: string | null
  adversaire: string
  resultat: 'V' | 'D' | null
}

interface PlayerProfileClientProps {
  userId: string
  initialTrackedPlayers: TrackedPlayer[]
  userPlan: string
  planLimit: number | typeof Infinity
}

export default function PlayerProfileClient({
  userId,
  initialTrackedPlayers,
  userPlan,
  planLimit,
}: PlayerProfileClientProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null)
  const [selectedSurface, setSelectedSurface] = useState<'Hard' | 'Clay' | 'Grass'>('Hard')
  const [matchHistory, setMatchHistory] = useState<EnrichedMatchHistory[]>([])
  const [atpAverages, setAtpAverages] = useState<AtpAverage[]>([])
  const [modalMatchStats, setModalMatchStats] = useState<MatchStats | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingPlayer, setPendingPlayer] = useState<PlayerStats | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [trackedPlayers, setTrackedPlayers] = useState<TrackedPlayer[]>(initialTrackedPlayers)

  // ── Helpers ────────────────────────────────────────────────────────────────

  const isTracked = (playerName: string) =>
    trackedPlayers.some((p) => p.player_name === playerName)

  const isLocked = (player: TrackedPlayer): boolean => {
    const planConfig = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]
    if (!planConfig?.lockDays) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const lockedUntil = new Date(player.locked_until + 'T00:00:00')
    return lockedUntil > today
  }

  const computeLockedUntil = (): Date => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth() + 1, 1)
  }

  const formatDate = (date: Date) =>
    Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)

  const isLimitReached =
    !Number.isFinite(planLimit) ? false : trackedPlayers.length >= planLimit

  // ── Load player profile ────────────────────────────────────────────────────

  const loadPlayerProfile = useCallback(
    async (player: PlayerStats, surface: 'Hard' | 'Clay' | 'Grass') => {
      setLoadingProfile(true)
      const supabase = createClient()
      if (!supabase) { setLoadingProfile(false); return }

      try {
        const [statsRes, historyRes, atpRes] = await Promise.all([
          supabase
            .from('player_stats')
            .select('*')
            .eq('player_name', player.player_name)
            .single(),
          supabase
            .from('match_results')
            .select('id, date_match, player1, player2, winner, score, tournoi, surface')
            .or(
              `player1.ilike.%${player.player_name.toLowerCase()}%,player2.ilike.%${player.player_name.toLowerCase()}%`
            )
            .order('date_match', { ascending: false })
            .limit(5),
          supabase.from('atp_averages').select('*'),
        ])

        if (statsRes.data) {
          setSelectedPlayer(statsRes.data as PlayerStats)
        }

        if (historyRes.data && historyRes.data.length > 0) {
          const enrichedHistory: EnrichedMatchHistory[] = historyRes.data.map((row) => {
            const adversaire =
              row.player1 === player.player_name ? row.player2 : row.player1
            const resultat: 'V' | 'D' | null = row.winner
              ? row.winner === player.player_name
                ? 'V'
                : 'D'
              : null
            return {
              id: row.id,
              date_match: row.date_match,
              player1: row.player1,
              player2: row.player2,
              winner: row.winner,
              score: row.score,
              tournoi: row.tournoi,
              surface: row.surface,
              adversaire,
              resultat,
            }
          })
          setMatchHistory(enrichedHistory)
        } else {
          setMatchHistory([])
        }

        setAtpAverages(atpRes.data ? (atpRes.data as AtpAverage[]) : [])
      } catch {
        // Non-blocking
      } finally {
        setLoadingProfile(false)
      }
    },
    []
  )

  // Re-fetch when surface changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSurfaceChange = (surface: 'Hard' | 'Clay' | 'Grass') => {
    setSelectedSurface(surface)
    if (selectedPlayer) {
      loadPlayerProfile(selectedPlayer, surface)
    }
  }

  // ── Player selection ────────────────────────────────────────────────────────

  function handleSelectPlayer(player: PlayerStats) {
    setSelectedPlayer(player)
    loadPlayerProfile(player, selectedSurface)
  }

  // Intercepts search bar selection — already tracked → load directly, else open modal
  function handleSearchBarSelect(player: PlayerStats) {
    if (isTracked(player.player_name)) {
      handleSelectPlayer(player)
    } else {
      setPendingPlayer(player)
      setModalOpen(true)
    }
  }

  // ── Follow / Unfollow ───────────────────────────────────────────────────────

  async function handleConfirmFollow() {
    if (!pendingPlayer || isLimitReached) return

    // Capture playerName before await — avoids race condition if React re-renders
    // between the await and reads of pendingPlayer (React 18+)
    const playerName = pendingPlayer.player_name

    const result = await addTrackedPlayer(userId, playerName)

    if ('success' in result && result.success) {
      const lockedUntil = computeLockedUntil().toISOString().split('T')[0]
      setTrackedPlayers((prev) => [
        ...prev,
        {
          player_name: playerName,
          added_at: new Date().toISOString().split('T')[0],
          locked_until: lockedUntil,
        },
      ])
      // pendingPlayer is still in scope after the await — use it directly.
      // Capturing playerName above avoids stale-closure if a re-render fired
      // during the async gap.
      handleSelectPlayer(pendingPlayer)
    }

    // Post-await sequence: close modal, then clear pendingPlayer
    setModalOpen(false)
    setPendingPlayer(null)
  }

  function handleCancelFollow() {
    setModalOpen(false)
    setPendingPlayer(null)
  }

  async function handleRemovePlayer(playerName: string) {
    const result = await removeTrackedPlayer(userId, playerName)

    if ('success' in result && result.success) {
      setTrackedPlayers((prev) =>
        prev.filter((p) => p.player_name !== playerName)
      )
    }
  }

  // ── Match metrics modal ─────────────────────────────────────────────────────

  async function handleOpenMetrics(
    date_match: string,
    player1: string,
    player2: string
  ) {
    const supabase = createClient()
    if (!supabase) return

    try {
      const { data } = await supabase
        .from('match_stats')
        .select('*')
        .eq('date_match', date_match)
        .eq('player1', player1)
        .eq('player2', player2)
        .single()

      setModalMatchStats(data as MatchStats | null)
      setModalOpen(true)
    } catch {
      setModalMatchStats(null)
      setModalOpen(true)
    }
  }

  function handleCloseModal() {
    setModalOpen(false)
    setTimeout(() => setModalMatchStats(null), 200)
  }

  // ── Derived values ──────────────────────────────────────────────────────────

  const trackedCount = trackedPlayers.length
  const displayLimit = Number.isFinite(planLimit) ? planLimit : '∞'

  const trackedPlayerIsLocked = (playerName: string) => {
    const p = trackedPlayers.find((tp) => tp.player_name === playerName)
    if (!p) return false
    return isLocked(p)
  }

  const lockedUntilForPending = pendingPlayer ? computeLockedUntil() : new Date()

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex gap-6 min-w-0">

      {/* ── Left column — Tracked players list ───────────────────────────── */}
      <div className="w-64 shrink-0 flex flex-col">
        <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {/* Header */}
          <div className="px-4 py-3 border-b border-[var(--border)] shrink-0">
            <p className="text-xs font-medium text-[var(--text-3)]">
              Suivis{' '}
              <span className="text-[var(--text-2)] font-mono tabular-nums">
                {trackedCount} / {displayLimit}
              </span>
            </p>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {trackedPlayers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-[var(--border)] flex items-center justify-center mb-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p className="text-xs text-[var(--text-3)] leading-relaxed">
                  Vous ne suivez aucun joueur. Recherchez un joueur et cliquez sur Suivre pour l&apos;ajouter à votre liste.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {trackedPlayers.map((player) => {
                  const locked = isLocked(player)
                  const lockedUntil = new Date(player.locked_until + 'T00:00:00')
                  const lockedText = formatDate(lockedUntil)
                  // Guard: only apply lock UI if lockDays is configured for this plan
                  const planHasLock = !!PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.lockDays

                  return (
                    <div
                      key={player.player_name}
                      className="group px-4 py-2.5 hover:bg-white/[0.02] transition-colors duration-100"
                    >
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <button
                          onClick={() => {
                            // Load player profile by name
                            const supabase = createClient()
                            if (!supabase) return
                            supabase
                              .from('player_stats')
                              .select('*')
                              .eq('player_name', player.player_name)
                              .single()
                              .then(({ data }) => {
                                if (data) handleSelectPlayer(data as PlayerStats)
                              })
                          }}
                          className="flex-1 min-w-0 text-left"
                        >
                          <p className="text-sm text-[var(--text-1)] truncate">
                            {player.player_name}
                          </p>
                          {planHasLock && locked && (
                            <p className="text-[11px] text-[var(--text-3)] mt-0.5">
                              Verrouillé jusqu&apos;au {lockedText}
                            </p>
                          )}
                        </button>

                        {/* Remove button — disabled only when planHasLock AND locked */}
                        {locked && planHasLock ? (
                          <div className="relative shrink-0 group/tt">
                            <button
                              disabled
                              className="w-6 h-6 flex items-center justify-center rounded text-[var(--text-3)] opacity-30 cursor-not-allowed"
                              aria-label="Verrouillé"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                            </button>
                            <div className="absolute right-0 top-full mt-1.5 px-2.5 py-1.5 rounded-md z-50
                                            bg-[var(--surface-3)] border border-[var(--border-md)]
                                            text-xs text-[var(--text-1)] whitespace-nowrap
                                            opacity-0 group-hover/tt:opacity-100 transition-opacity duration-150
                                            pointer-events-none shadow-lg">
                              Verrouillé jusqu&apos;au {lockedText}
                              <div className="absolute top-full right-3 border-4 border-transparent border-t-[var(--surface-3)]" />
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRemovePlayer(player.player_name)}
                            className="w-6 h-6 flex items-center justify-center rounded text-[var(--text-3)] hover:text-[var(--red)] hover:bg-[var(--red)]/10 transition-colors duration-150 shrink-0"
                            aria-label={`Retirer ${player.player_name}`}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Right column — Search + Profile ─────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Search bar */}
        <PlayerSearchBar onSelectPlayer={handleSearchBarSelect} />

        {/* Profile content */}
        {selectedPlayer && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div>
                  <h2 className="text-base font-semibold text-[var(--text-1)] truncate">
                    {selectedPlayer.player_name}
                  </h2>
                  {selectedPlayer.rank && (
                    <p className="text-xs text-[var(--text-3)] mt-0.5">
                      ATP #{selectedPlayer.rank}
                    </p>
                  )}
                </div>
                {isTracked(selectedPlayer.player_name) && (
                  <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--border-md)] text-[11px] font-medium text-[var(--text-2)]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Suivi
                  </span>
                )}
              </div>
              <SurfaceSelector
                selectedSurface={selectedSurface}
                onSurfaceChange={handleSurfaceChange}
              />
            </div>

            {/* Metric cards */}
            {loadingProfile ? (
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg p-4 animate-pulse">
                    <div className="h-2.5 bg-white/[0.06] rounded w-20 mb-3" />
                    <div className="h-6 bg-white/[0.05] rounded w-16 mb-2" />
                    <div className="h-2 bg-white/[0.04] rounded w-28" />
                  </div>
                ))}
              </div>
            ) : (
              <PlayerMetricCards
                surface={selectedSurface}
                playerStats={selectedPlayer}
                atpAverages={atpAverages}
              />
            )}

            {/* Chart */}
            {!loadingProfile && (
              <PlayerStatsChart statsHistory={selectedPlayer.stats_history} />
            )}

            {/* Match history */}
            {!loadingProfile && (
              <MatchHistoryTable
                matchHistory={matchHistory}
                selectedPlayerName={selectedPlayer.player_name}
                onOpenMetrics={handleOpenMetrics}
              />
            )}
          </div>
        )}

        {/* Empty state — no player selected */}
        {!selectedPlayer && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--text-2)]">
              Recherchez un joueur ATP
            </p>
            <p className="text-xs text-[var(--text-3)] mt-1">
              Tapez au moins 2 caractères pour démarrer
            </p>
          </div>
        )}

        {/* Match metrics modal */}
        <MatchMetricsModal
          isOpen={modalOpen && !pendingPlayer}
          stats={modalMatchStats}
          playerName={selectedPlayer?.player_name ?? ''}
          player1={modalMatchStats?.player1 ?? ''}
          player2={modalMatchStats?.player2 ?? ''}
          onClose={handleCloseModal}
        />
      </div>

      {/* Follow modal */}
      <FollowPlayerModal
        isOpen={modalOpen && pendingPlayer !== null}
        playerName={pendingPlayer?.player_name ?? ''}
        lockedUntil={lockedUntilForPending}
        userPlan={userPlan}
        isLimitReached={isLimitReached}
        onConfirm={handleConfirmFollow}
        onCancel={handleCancelFollow}
      />
    </div>
  )
}
