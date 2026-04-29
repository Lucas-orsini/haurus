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

/** Enriched match row: match_stats columns + winner/loser/score from match_results via LEFT JOIN */
type EnrichedMatchRow = MatchStats & {
  winner: string | null
  loser: string | null
  score: string | null
}

export default function PlayerProfileClient() {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null)
  const [selectedSurface, setSelectedSurface] = useState<'Hard' | 'Clay' | 'Grass'>('Hard')
  const [matchHistory, setMatchHistory] = useState<EnrichedMatchRow[]>([])
  const [atpAverages, setAtpAverages] = useState<AtpAverage[]>([])
  const [modalMatchStats, setModalMatchStats] = useState<MatchStats | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(false)

  // Charge les stats du joueur + historique + moyennes ATP quand un joueur est sélectionné
  const loadPlayerProfile = useCallback(async (player: PlayerStats, surface: 'Hard' | 'Clay' | 'Grass') => {
    setLoadingProfile(true)
    const supabase = createClient()
    if (!supabase) { setLoadingProfile(false); return }

    try {
      const [statsRes, historyRes, atpRes] = await Promise.all([
        // Stats surface du joueur
        supabase
          .from('player_stats')
          .select('*')
          .eq('player_name', player.player_name)
          .single(),
        // Historique via match_stats — LEFT JOIN match_results sur (player1, player2, date_match)
        // pour récupérer winner, loser, score. LEFT JOIN préserve les lignes sans correspondance.
        supabase
          .from('match_stats')
          .select(`
            *,
            match_results (
              winner,
              loser,
              score
            )
          `)
          .or(`player1.ilike.${player.player_name},player2.ilike.${player.player_name}`)
          .order('date_match', { ascending: false })
          .limit(5),
        // Moyennes ATP par surface
        supabase
          .from('atp_averages')
          .select('*'),
      ])

      // Met à jour les stats du joueur si nouveau fetch
      if (statsRes.data) {
        setSelectedPlayer(statsRes.data as PlayerStats)
      }

      // Transforme les lignes enrichies : déplie match_results.winner/loser/score en colonnes plates
      if (historyRes.data && Array.isArray(historyRes.data)) {
        const enriched: EnrichedMatchRow[] = historyRes.data.map((row) => {
          const matchResults = (row as unknown as { match_results: { winner: string; loser: string; score: string } | null }).match_results
          return {
            ...(row as unknown as MatchStats),
            winner: matchResults?.winner ?? null,
            loser: matchResults?.loser ?? null,
            score: matchResults?.score ?? null,
          }
        })
        setMatchHistory(enriched)
      } else {
        setMatchHistory([])
      }

      if (atpRes.data) {
        setAtpAverages(atpRes.data as AtpAverage[])
      } else {
        setAtpAverages([])
      }
    } catch {
      // Non-blocking — les données partielles sont affichées
    } finally {
      setLoadingProfile(false)
    }
  }, [])

  // Re-fetch les stats joueur au changement de surface
  useEffect(() => {
    if (!selectedPlayer) return
    loadPlayerProfile(selectedPlayer, selectedSurface)
  }, [selectedSurface]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelectPlayer(player: PlayerStats) {
    setSelectedPlayer(player)
    loadPlayerProfile(player, selectedSurface)
  }

  async function handleOpenMetrics(date_match: string, player1: string, player2: string) {
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

  return (
    <div className="space-y-5">

      {/* Barre de recherche — toujours visible */}
      <PlayerSearchBar onSelectPlayer={handleSelectPlayer} />

      {/* Contenu profil — apparaît après sélection */}
      {selectedPlayer && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Header nom joueur */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[var(--text-1)]">{selectedPlayer.player_name}</h2>
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

          {/* Loading state */}
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

          {/* Graphique d'historique */}
          {!loadingProfile && (
            <PlayerStatsChart statsHistory={selectedPlayer.stats_history} />
          )}

          {/* Tableau des 5 derniers matchs */}
          {!loadingProfile && (
            <MatchHistoryTable
              matchHistory={matchHistory}
              playerName={selectedPlayer.player_name}
              onOpenMetrics={handleOpenMetrics}
            />
          )}
        </div>
      )}

      {/* Modal des métriques pré-match */}
      {modalOpen && (
        <MatchMetricsModal
          matchStats={modalMatchStats}
          playerName={selectedPlayer?.player_name ?? ''}
          onClose={handleCloseModal}
        />
      )}

      {/* État initial — rien n'est sélectionné */}
      {!selectedPlayer && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[var(--text-2)]">Recherchez un joueur ATP</p>
          <p className="text-xs text-[var(--text-3)] mt-1">Tapez au moins 2 caractères pour démarrer</p>
        </div>
      )}

    </div>
  )
}
