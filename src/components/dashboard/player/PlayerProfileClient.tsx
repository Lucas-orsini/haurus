'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import PlayerSearchBar from './PlayerSearchBar'
import SurfaceSelector from './SurfaceSelector'
import PlayerMetricCards from './PlayerMetricCards'
import PlayerStatsChart from './PlayerStatsChart'
import MatchHistoryTable from './MatchHistoryTable'
import type { EnrichedMatchHistory } from './MatchHistoryTable'
import MatchMetricsModal from './MatchMetricsModal'
import type { Database } from '@/lib/supabase/database.types'
import type { MatchStats } from '@/lib/types/match'

type PlayerStats = Database['public']['Tables']['player_stats']['Row']
type AtpAverage = Database['public']['Tables']['atp_averages']['Row']

export default function PlayerProfileClient() {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null)
  const [selectedSurface, setSelectedSurface] = useState<'Hard' | 'Clay' | 'Grass'>('Hard')
  const [matchHistory, setMatchHistory] = useState<EnrichedMatchHistory[]>([])
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
      const [statsRes, resultsRes, statsForResultsRes, atpRes] = await Promise.all([
        // Stats surface du joueur
        supabase
          .from('player_stats')
          .select('*')
          .eq('player_name', player.player_name)
          .single(),
        // match_results — source de vérité pour l'historique (winner + score toujours résolus)
        // Filtre sur winner IS NOT NULL → matchs terminés uniquement
        supabase
          .from('match_results')
          .select('date_match, player1, player2, winner, loser, score, surface, tournoi, best_of, rank_winner, rank_loser, round, minutes')
          .or(`player1.ilike.${player.player_name},player2.ilike.${player.player_name}`)
          .not('winner', 'is', null)
          .order('date_match', { ascending: false })
          .limit(5),
        // match_stats — enrichissement optionnel (jointure sur date + joueurs)
        // On filtre sur les dates des matchs résultats pour éviter de charger toute la table
        supabase
          .from('match_stats')
          .select('*')
          .or(`player1.ilike.${player.player_name},player2.ilike.${player.player_name}`)
          .limit(100),
        // Moyennes ATP par surface
        supabase
          .from('atp_averages')
          .select('*'),
      ])

      // Met à jour les stats du joueur si nouveau fetch
      if (statsRes.data) {
        setSelectedPlayer(statsRes.data as PlayerStats)
      }

      const rawResults = (resultsRes.data ?? []) as Array<{
        date_match: string; player1: string; player2: string; winner: string | null
        loser: string | null; score: string | null; surface: string | null; tournoi: string | null
        best_of: number | null; rank_winner: number | null; rank_loser: number | null
        round: string | null; minutes: number | null
      }>

      // Si des matchs résultats existent, join avec match_stats pour enrichir
      if (rawResults.length > 0) {
        const resultDates = rawResults.map(m => m.date_match)

        // Construire une Map des stats additionnelles sur la clé composite
        const statsMap = new Map<string, Partial<MatchStats>>()
        for (const s of (statsForResultsRes.data ?? []) as MatchStats[]) {
          if (resultDates.includes(s.date_match)) {
            const key = `${s.date_match}||${s.player1}||${s.player2}`
            statsMap.set(key, s)
          }
        }

        const enrichedHistory: EnrichedMatchHistory[] = rawResults.map(r => {
          const key = `${r.date_match}||${r.player1}||${r.player2}`
          const stats = statsMap.get(key)
          return {
            id: `${r.date_match}-${r.player1}-${r.player2}`,
            created_at: null,
            date_match: r.date_match,
            player1: r.player1,
            player2: r.player2,
            surface: r.surface,
            tournoi: r.tournoi,
            best_of: r.best_of,
            winner: r.winner,
            score: r.score,
            rank_p1: stats?.rank_p1 ?? r.rank_winner ?? null,
            rank_p2: stats?.rank_p2 ?? r.rank_loser ?? null,
            delta_rank_6m_p1: stats?.delta_rank_6m_p1 ?? null,
            delta_rank_6m_p2: stats?.delta_rank_6m_p2 ?? null,
            p_serve_p1: stats?.p_serve_p1 ?? null,
            p_serve_p2: stats?.p_serve_p2 ?? null,
            p_return_p1: stats?.p_return_p1 ?? null,
            p_return_p2: stats?.p_return_p2 ?? null,
            glicko_rating_p1: stats?.glicko_rating_p1 ?? null,
            glicko_rating_p2: stats?.glicko_rating_p2 ?? null,
            glicko_rd_p1: stats?.glicko_rd_p1 ?? null,
            glicko_rd_p2: stats?.glicko_rd_p2 ?? null,
            tsd_p1: stats?.tsd_p1 ?? null,
            tsd_p2: stats?.tsd_p2 ?? null,
            bppi_p1: stats?.bppi_p1 ?? null,
            bppi_p2: stats?.bppi_p2 ?? null,
            map_p1: stats?.map_p1 ?? null,
            map_p2: stats?.map_p2 ?? null,
            form_p1: stats?.form_p1 ?? null,
            form_p2: stats?.form_p2 ?? null,
            win_rate_td_p1: stats?.win_rate_td_p1 ?? null,
            win_rate_td_p2: stats?.win_rate_td_p2 ?? null,
            win_rate_surf_td_p1: stats?.win_rate_surf_td_p1 ?? null,
            win_rate_surf_td_p2: stats?.win_rate_surf_td_p2 ?? null,
            win_rate_5m_p1: stats?.win_rate_5m_p1 ?? null,
            win_rate_5m_p2: stats?.win_rate_5m_p2 ?? null,
            momentum_td_p1: stats?.momentum_td_p1 ?? null,
            momentum_td_p2: stats?.momentum_td_p2 ?? null,
            fatigue_72h_p1: stats?.fatigue_72h_p1 ?? null,
            fatigue_72h_p2: stats?.fatigue_72h_p2 ?? null,
            breaks_won_td_p1: stats?.breaks_won_td_p1 ?? null,
            breaks_won_td_p2: stats?.breaks_won_td_p2 ?? null,
            breaks_lost_td_p1: stats?.breaks_lost_td_p1 ?? null,
            breaks_lost_td_p2: stats?.breaks_lost_td_p2 ?? null,
            jours_repos_p1: stats?.jours_repos_p1 ?? null,
            jours_repos_p2: stats?.jours_repos_p2 ?? null,
          }
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
