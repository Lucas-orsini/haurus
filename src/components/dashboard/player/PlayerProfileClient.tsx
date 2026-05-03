'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Users, ChevronLeft } from 'lucide-react'
import PlayerSearchBar from './PlayerSearchBar'
import SurfaceSelector from './SurfaceSelector'
import PlayerMetricCards from './PlayerMetricCards'
import PlayerStatsChart from './PlayerStatsChart'
import MatchHistoryTable from './MatchHistoryTable'
import MatchMetricsModal from './MatchMetricsModal'
import TrackedPlayersList from './TrackedPlayersList'
import TrackPlayerModal from './TrackPlayerModal'
import type { Database } from '@/lib/supabase/database.types'
import type { MatchStats } from '@/lib/types/match'

type PlayerStats = Database['public']['Tables']['player_stats']['Row']
type AtpAverage = Database['public']['Tables']['atp_averages']['Row']

/** Shape of a history entry — player data from match_results with computed fields */
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

/** Type aligné avec la réponse GET /api/tracked-players */
interface TrackedPlayer {
  id: string
  player_name: string
  player_id: string
  locked_until: string
  created_at: string
}

interface TrackedPlayersResponse {
  trackedPlayers: TrackedPlayer[]
  count: number
  limit: number | null
  role: string
}

export default function PlayerProfileClient() {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null)
  const [selectedSurface, setSelectedSurface] = useState<'Hard' | 'Clay' | 'Grass'>('Hard')
  const [matchHistory, setMatchHistory] = useState<EnrichedMatchHistory[]>([])
  const [atpAverages, setAtpAverages] = useState<AtpAverage[]>([])
  const [modalMatchStats, setModalMatchStats] = useState<MatchStats | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(false)

  // --- Tracked players state ---
  const [trackedPlayers, setTrackedPlayers] = useState<TrackedPlayer[]>([])
  const [trackedRole, setTrackedRole] = useState<string>('user')
  const [trackedLimit, setTrackedLimit] = useState<number | null>(null)
  const [loadingTracked, setLoadingTracked] = useState(true)

  // --- Sliding panel state ---
  const [panelOpen, setPanelOpen] = useState(false)

  // --- Modal "suivre ce joueur" ---
  const [pendingPlayer, setPendingPlayer] = useState<PlayerStats | null>(null)
  const [confirmingPending, setConfirmingPending] = useState(false)

  // Charge les stats du joueur + historique + moyennes ATP quand un joueur est sélectionné
  const loadPlayerProfile = useCallback(async (player: PlayerStats, surface: 'Hard' | 'Clay' | 'Grass') => {
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
          .or(`player1.ilike.%${player.player_name.toLowerCase()}%,player2.ilike.%${player.player_name.toLowerCase()}%`)
          .order('date_match', { ascending: false })
          .limit(5),
        supabase
          .from('atp_averages')
          .select('*'),
      ])

      if (statsRes.data) {
        setSelectedPlayer(statsRes.data as PlayerStats)
      }

      if (historyRes.data && historyRes.data.length > 0) {
        const enrichedHistory: EnrichedMatchHistory[] = historyRes.data.map((row) => {
          const adversaire = row.player1 === player.player_name
            ? row.player2
            : row.player1

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

  // Charge la liste des joueurs suivis au montage
  useEffect(() => {
    async function loadTracked() {
      setLoadingTracked(true)
      try {
        const res = await fetch('/api/tracked-players')
        if (res.ok) {
          const data: TrackedPlayersResponse = await res.json()
          setTrackedPlayers(data.trackedPlayers)
          setTrackedRole(data.role)
          setTrackedLimit(data.limit)
        }
      } catch {
        // Silent — on reste avec un état vide
      } finally {
        setLoadingTracked(false)
      }
    }
    loadTracked()
  }, [])

  // Sélection depuis la recherche : si déjà suivi → charger direct ; sinon → ouvrir modal
  async function handleSelectFromSearch(player: PlayerStats) {
    const isTracked = trackedPlayers.some(
      (tp) => tp.player_name.toLowerCase() === player.player_name.toLowerCase()
    )
    if (isTracked) {
      setSelectedPlayer(player)
      await loadPlayerProfile(player, selectedSurface)
    } else {
      setPendingPlayer(player)
    }
  }

  // Sélection depuis TrackedPlayersList : charger direct sans modal
  function handleSelectTracked(playerName: string, playerId: string) {
    const supabase = createClient()
    if (!supabase) return
    supabase
      .from('player_stats')
      .select('*')
      .eq('id', playerId)
      .single()
      .then((res) => {
        if (res.data) {
          setSelectedPlayer(res.data as PlayerStats)
          loadPlayerProfile(res.data as PlayerStats, selectedSurface)
          setPanelOpen(false)
        }
      })
  }

  // Confirmer le suivi dans le modal
  async function handleConfirmTrack() {
    if (!pendingPlayer) return
    setConfirmingPending(true)
    try {
      const res = await fetch('/api/tracked-players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_name: pendingPlayer.player_name,
          player_id: pendingPlayer.id,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setTrackedPlayers((prev) => [data.trackedPlayer, ...prev])
        setSelectedPlayer(pendingPlayer)
        await loadPlayerProfile(pendingPlayer, selectedSurface)
      } else if (res.status === 409) {
        // Déjà suivi entre-temps — charger directement
        setSelectedPlayer(pendingPlayer)
        await loadPlayerProfile(pendingPlayer, selectedSurface)
      }
    } catch {
      // Silent
    } finally {
      setConfirmingPending(false)
      setPendingPlayer(null)
    }
  }

  // Supprimer un joueur suivi
  async function handleRemoveTracked(playerName: string) {
    const res = await fetch('/api/tracked-players', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player_name: playerName }),
    })
    if (res.ok) {
      setTrackedPlayers((prev) =>
        prev.filter((tp) => tp.player_name !== playerName)
      )
    }
  }

  async function handleOpenMetrics(date_match: string, player1: string, player2: string) {
    const supabase = createClient()
    if (!supabase) return

    try {
      // Recherche bidirectionnelle : trouve la ligne où les deux joueurs apparaissent
      // dans n'importe quel ordre (player1=A ET player2=B) OU (player1=B ET player2=A)
      const { data } = await supabase
        .from('match_stats')
        .select('*')
        .eq('date_match', date_match)
        .or(`and(player1.eq.${player1},player2.eq.${player2}),and(player1.eq.${player2},player2.eq.${player1})`)
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
    <>
      {/* Modal d'avertissement avant suivi */}
      <TrackPlayerModal
        isOpen={pendingPlayer !== null}
        playerName={pendingPlayer?.player_name ?? ''}
        role={trackedRole}
        onConfirm={handleConfirmTrack}
        onCancel={() => setPendingPlayer(null)}
      />

      {/* Layout flex avec volet coulissant conditionnel */}
      <div className="flex gap-5">

        {/* Volet "Mes joueurs" — animé, sort de la gauche */}
        {panelOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-[280px] shrink-0 overflow-hidden z-50"
          >
            {/* Bouton "Mes joueurs" visible uniquement volet fermé — affiché dans le volet animé */}
            {!panelOpen && (
              <button
                onClick={() => setPanelOpen(!panelOpen)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 px-3 flex items-center justify-center gap-2 rounded-md
                           border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06]
                           text-[var(--text-2)] text-xs font-medium transition-colors duration-150 shrink-0 z-50"
                aria-label="Ouvrir le panneau Mes joueurs"
              >
                <Users size={14} strokeWidth={1.5} className="shrink-0" />
                <span className="whitespace-nowrap">Mes joueurs</span>
              </button>
            )}

            <TrackedPlayersList
              trackedPlayers={trackedPlayers}
              role={trackedRole}
              limit={trackedLimit}
              onSelectPlayer={handleSelectTracked}
              onRemovePlayer={handleRemoveTracked}
            />

            {/* Flèche de fermeture — positionnée sur le bord droit du volet, centrée verticalement */}
            <button
              onClick={() => setPanelOpen(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-md
                         border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06]
                         text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-150 z-50"
              aria-label="Fermer le panneau Mes joueurs"
            >
              <ChevronLeft size={15} strokeWidth={1.5} className="shrink-0" />
            </button>
          </motion.div>
        )}

        {/* Colonne droite — recherche + profil (flexible) */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Bouton toggle "Mes joueurs" + barre de recherche sur la même ligne */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPanelOpen(!panelOpen)}
              className="h-9 px-3 flex items-center justify-center gap-2 rounded-md
                         border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06]
                         text-[var(--text-2)] text-xs font-medium transition-colors duration-150 shrink-0"
              aria-label="Ouvrir ou fermer le panneau Mes joueurs"
            >
              <Users size={14} strokeWidth={1.5} className="shrink-0" />
              <span className="whitespace-nowrap">Mes joueurs</span>
            </button>

            {/* Barre de recherche */}
            <div>
              <PlayerSearchBar onSelectPlayer={handleSelectFromSearch} />
            </div>
          </div>

          {/* Backdrop — ferme le volet au clic */}
          {panelOpen && (
            <div
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setPanelOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Contenu profil — apparaît après sélection */}
          {selectedPlayer && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Header nom joueur + SurfaceSelector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div>
                    <h2 className="text-base font-semibold text-[var(--text-1)]">{selectedPlayer.player_name}</h2>
                    {selectedPlayer.rank && (
                      <p className="text-xs text-[var(--text-3)] mt-0.5">
                        ATP #{selectedPlayer.rank}
                      </p>
                    )}
                  </div>
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

              {/* Chart d'évolution des métriques */}
              {!loadingProfile && (
                <PlayerStatsChart statsHistory={selectedPlayer.stats_history} />
              )}

              {/* Historique des matchs */}
              {!loadingProfile && (
                <MatchHistoryTable
                  matchHistory={matchHistory}
                  selectedPlayerName={selectedPlayer.player_name}
                  onOpenMetrics={handleOpenMetrics}
                />
              )}
            </div>
          )}

          {/* État initial — rien n'est sélectionné — centré quand volet fermé */}
          {!selectedPlayer && (
            <div
              className={`flex flex-col items-center justify-center py-20 text-center${!selectedPlayer && !panelOpen ? ' min-h-[60vh]' : ''}`}
            >
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
      </div>

      {/* Modal métriques pré-match */}
      <MatchMetricsModal
        isOpen={modalOpen}
        stats={modalMatchStats}
        playerName={selectedPlayer?.player_name ?? ''}
        player1={modalMatchStats?.player1 ?? ''}
        player2={modalMatchStats?.player2 ?? ''}
        onClose={handleCloseModal}
      />
    </>
  )
}
