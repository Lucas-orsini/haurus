'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import PlayerSearchBar from './PlayerSearchBar'
import SurfaceSelector from './SurfaceSelector'
import PlayerMetricCards from './PlayerMetricCards'
import PlayerStatsChart from './PlayerStatsChart'
import MatchHistoryTable from './MatchHistoryTable'
import MatchMetricsModal from './MatchMetricsModal'
import type { Database } from '@/lib/supabase/database.types'
import type { MatchStats } from '@/lib/types/match'

type PlayerStats = Database['public']['Tables']['player_stats']['Row']
type AtpAverage = Database['public']['Tables']['atp_averages']['Row']

interface EnrichedMatchHistoryEntry extends MatchStats {
  winner: string | null
  score: string | null
  loser: string | null
}

interface PlayerProfileClientProps {
  initialMatchHistory?: EnrichedMatchHistoryEntry[]
}

export default function PlayerProfileClient({
  initialMatchHistory = [],
}: PlayerProfileClientProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null)
  const [selectedSurface, setSelectedSurface] = useState<'Hard' | 'Clay' | 'Grass'>('Hard')
  const [matchHistory, setMatchHistory] = useState<EnrichedMatchHistoryEntry[]>(initialMatchHistory)
  const [atpAverages, setAtpAverages] = useState<AtpAverage[]>([])
  const [modalMatchStats, setModalMatchStats] = useState<MatchStats | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(false)

  /**
   * Fetches match_stats rows and enriches them with winner/score/loser from match_results.
   * Uses two sequential queries:
   *   1. match_stats  — all stats columns (isolated, feeds the metrics modal)
   *   2. match_results — winner / score / loser joined on (date_match, player1, player2)
   *
   * The two results are merged in-memory. Rows without a match_results counterpart
   * retain null values for winner/score/loser — this is expected behavior.
   */
  const loadPlayerProfile = useCallback(
    async (player: PlayerStats, surface: 'Hard' | 'Clay' | 'Grass') => {
      setLoadingProfile(true)
      const supabase = createClient()
      if (!supabase) {
        setLoadingProfile(false)
        return
      }

      try {
        const [statsRes, historyRes, atpRes] = await Promise.all([
          // Surface-specific player stats
          supabase
            .from('player_stats')
            .select('*')
            .eq('player_name', player.player_name)
            .single(),
          // Match history via match_stats (isolated query — does NOT include winner/score)
          supabase
            .from('match_stats')
            .select('*')
            .or(`player1.ilike.${player.player_name},player2.ilike.${player.player_name}`)
            .order('date_match', { ascending: false })
            .limit(5),
          // ATP averages by surface
          supabase.from('atp_averages').select('*'),
        ])

        // Update player stats if new fetch succeeded
        if (statsRes.data) {
          setSelectedPlayer(statsRes.data as PlayerStats)
        }

        // Build enriched match history — start with match_stats rows,
        // then attach winner/score/loser from match_results using (date_match, player1, player2)
        const rawHistory = (historyRes.data ?? []) as MatchStats[]
        const matchKeys = rawHistory.map(
          (m) => `${m.date_match}||${m.player1}||${m.player2}`
        )

        // Fetch match_results rows for the same (date_match, player1, player2) keys
        if (matchKeys.length > 0) {
          const { data: resultRows } = await supabase
            .from('match_results')
            .select('date_match, player1, player2, winner, score, loser')
            .in('date_match', [...new Set(rawHistory.map((m) => m.date_match))])

          const resultMap = new Map<string, { winner: string | null; score: string | null; loser: string | null }>()
          if (resultRows) {
            for (const row of resultRows) {
              resultMap.set(`${row.date_match}||${row.player1}||${row.player2}`, {
                winner: row.winner,
                score: row.score,
                loser: row.loser,
              })
            }
          }

          const enrichedHistory: EnrichedMatchHistoryEntry[] = rawHistory.map((m) => {
            const key = `${m.date_match}||${m.player1}||${m.player2}`
            const result = resultMap.get(key) ?? { winner: null, score: null, loser: null }
            return { ...m, ...result }
          })

          setMatchHistory(enrichedHistory)
        } else {
          setMatchHistory([])
        }

        if (atpRes.data) {
          setAtpAverages(atpRes.data as AtpAverage[])
        } else {
          setAtpAverages([])
        }
      } catch {
        // Non-blocking — partial data is still displayed
      } finally {
        setLoadingProfile(false)
      }
    },
    []
  )

  // Re-fetch when surface changes
  useEffect(() => {
    if (!selectedPlayer) return
    loadPlayerProfile(selectedPlayer, selectedSurface)
  }, [selectedSurface, loadPlayerProfile, selectedPlayer])

  function handleSelectPlayer(player: PlayerStats) {
    setSelectedPlayer(player)
    loadPlayerProfile(player, selectedSurface)
  }

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

      setModalMatchStats((data as MatchStats) ?? null)
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

  return (
    <div className="space-y-5">
      <PlayerSearchBar onSelectPlayer={handleSelectPlayer} />

      {selectedPlayer && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[var(--text-1)]">
                {selectedPlayer.player_name}
              </h2>
              {selectedPlayer.rank && (
                <p className="text-xs text-[var(--text-3)] mt-0.5">
                  ATP #{selectedPlayer.rank}
                </p>
              )}
            </div>
            <SurfaceSelector
              selectedSurface={selectedSurface}
              onSurfaceChange={(s) => setSelectedSurface(s)}
            />
          </div>

          {loadingProfile ? (
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg p-4 animate-pulse"
                >
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

          {!loadingProfile && (
            <PlayerStatsChart statsHistory={selectedPlayer.stats_history} />
          )}

          {!loadingProfile && (
            <MatchHistoryTable
              matchHistory={matchHistory}
              playerName={selectedPlayer.player_name}
              onOpenMetrics={handleOpenMetrics}
            />
          )}
        </div>
      )}

      {modalOpen && (
        <MatchMetricsModal
          matchStats={modalMatchStats}
          playerName={selectedPlayer?.player_name ?? ''}
          onClose={handleCloseModal}
        />
      )}

      {!selectedPlayer && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[var(--text-3)]"
            >
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
    </div>
  )
}
