'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

type MatchResultRow = Database['public']['Tables']['match_results']['Row']
type PlayerStatsRow = Database['public']['Tables']['player_stats']['Row']
type MatchStatsRow = Database['public']['Tables']['match_stats']['Row']

interface MatchWithStats {
  match_result: MatchResultRow
  opponent_name: string
  match_stats: MatchStatsRow | null
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}

function getOpponentName(match: MatchResultRow, playerName: string): string {
  if (match.player1.toLowerCase() === playerName.toLowerCase()) {
    return match.player2
  }
  return match.player1
}

function getResult(match: MatchResultRow, playerName: string): 'W' | 'L' | null {
  if (!match.winner) return null
  const playerLower = playerName.toLowerCase()
  const winnerLower = match.winner.toLowerCase()
  if (winnerLower === playerLower) return 'W'
  if (winnerLower !== playerLower) return 'L'
  return null
}

function formatMetricsList(stats: MatchStatsRow | null): string[] {
  if (!stats) return []
  const metrics: string[] = []
  if (stats.glicko_rating_p1 && stats.glicko_rating_p2) {
    const isP1 = true
    const rating = isP1 ? stats.glicko_rating_p1 : stats.glicko_rating_p2
    metrics.push(`Glicko: ${rating.toFixed(0)}`)
  }
  if (stats.win_rate_td_p1 !== null || stats.win_rate_td_p2 !== null) {
    const wr = stats.win_rate_td_p1 ?? stats.win_rate_td_p2
    metrics.push(`Win Rate: ${((wr ?? 0) * 100).toFixed(1)}%`)
  }
  if (stats.form_p1 || stats.form_p2) {
    const form = stats.form_p1 ?? stats.form_p2
    metrics.push(`Form: ${form}`)
  }
  if (stats.momentum_td_p1 !== null || stats.momentum_td_p2 !== null) {
    const mom = stats.momentum_td_p1 ?? stats.momentum_td_p2
    metrics.push(`Momentum: ${((mom ?? 0) * 100).toFixed(1)}%`)
  }
  return metrics
}

interface MatchStatsModalProps {
  stats: MatchStatsRow | null
  isOpen: boolean
  onClose: () => void
}

function MatchStatsModal({ stats, isOpen, onClose }: MatchStatsModalProps) {
  if (!isOpen || !stats) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-gray-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            Statistiques du match
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Classement</h4>
            <p className="text-2xl font-bold text-white">
              #{stats.rank_p1 ?? '?'} vs #{stats.rank_p2 ?? '?'}
            </p>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Surface</h4>
            <p className="text-2xl font-bold text-white">{stats.surface ?? 'N/A'}</p>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Tournoi</h4>
            <p className="text-lg text-white">{stats.tournoi ?? 'N/A'}</p>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Glicko Rating</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.glicko_rating_p1?.toFixed(0) ?? 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.glicko_rating_p2?.toFixed(0) ?? 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Win Rate (30j)</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.win_rate_td_p1 ? `${(stats.win_rate_td_p1 * 100).toFixed(1)}%` : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.win_rate_td_p2 ? `${(stats.win_rate_td_p2 * 100).toFixed(1)}%` : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Win Rate Surface</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.win_rate_surf_td_p1 ? `${(stats.win_rate_surf_td_p1 * 100).toFixed(1)}%` : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.win_rate_surf_td_p2 ? `${(stats.win_rate_surf_td_p2 * 100).toFixed(1)}%` : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">P.Serve</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.p_serve_p1 ? `${(stats.p_serve_p1 * 100).toFixed(1)}%` : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.p_serve_p2 ? `${(stats.p_serve_p2 * 100).toFixed(1)}%` : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">P.Return</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.p_return_p1 ? `${(stats.p_return_p1 * 100).toFixed(1)}%` : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.p_return_p2 ? `${(stats.p_return_p2 * 100).toFixed(1)}%` : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Momentum</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.momentum_td_p1 !== null ? `${(stats.momentum_td_p1 * 100).toFixed(1)}%` : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.momentum_td_p2 !== null ? `${(stats.momentum_td_p2 * 100).toFixed(1)}%` : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">TSD</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.tsd_p1 !== null ? stats.tsd_p1.toFixed(3) : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.tsd_p2 !== null ? stats.tsd_p2.toFixed(3) : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">BPPI</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.bppi_p1 !== null ? stats.bppi_p1.toFixed(3) : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.bppi_p2 !== null ? stats.bppi_p2.toFixed(3) : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">MAP</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.map_p1 ? `${(stats.map_p1 * 100).toFixed(1)}%` : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.map_p2 ? `${(stats.map_p2 * 100).toFixed(1)}%` : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Forme</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.form_p1 ?? 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.form_p2 ?? 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Repos (jours)</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.jours_repos_p1 ?? 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.jours_repos_p2 ?? 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Fatigue 72h</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.fatigue_72h_p1 ?? 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.fatigue_72h_p2 ?? 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Delta Rank 6m</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.delta_rank_6m_p1 !== null ? (stats.delta_rank_6m_p1 > 0 ? `+${stats.delta_rank_6m_p1}` : stats.delta_rank_6m_p1) : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.delta_rank_6m_p2 !== null ? (stats.delta_rank_6m_p2 > 0 ? `+${stats.delta_rank_6m_p2}` : stats.delta_rank_6m_p2) : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Breaks Won TD</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.breaks_won_td_p1 !== null ? stats.breaks_won_td_p1.toFixed(2) : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.breaks_won_td_p2 !== null ? stats.breaks_won_td_p2.toFixed(2) : 'N/A'}</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Breaks Lost TD</h4>
            <div className="flex justify-between text-lg">
              <span className="text-white">{stats.breaks_lost_td_p1 !== null ? stats.breaks_lost_td_p1.toFixed(2) : 'N/A'}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-white">{stats.breaks_lost_td_p2 !== null ? stats.breaks_lost_td_p2.toFixed(2) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PlayerMatchHistoryProps {
  playerName: string
}

export function PlayerMatchHistory({ playerName }: PlayerMatchHistoryProps) {
  const [matches, setMatches] = useState<MatchWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMatchStats, setSelectedMatchStats] = useState<MatchStatsRow | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const supabase = createClient()

  const fetchMatchHistory = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: playerStats, error: playerError } = await supabase
        .from('player_stats')
        .select('player_name')
        .ilike('player_name', playerName)
        .limit(1)
        .single()

      if (playerError) {
        setError('Joueur non trouvé')
        setLoading(false)
        return
      }

      const { data: matchResults, error: matchesError } = await supabase
        .from('match_results')
        .select('*')
        .or(`player1.ilike.${playerName},player2.ilike.${playerName}`)
        .order('date_match', { ascending: false })
        .limit(5)

      if (matchesError) {
        setError('Erreur lors du chargement des matchs')
        setLoading(false)
        return
      }

      if (!matchResults || matchResults.length === 0) {
        setMatches([])
        setLoading(false)
        return
      }

      const matchesWithStats: MatchWithStats[] = await Promise.all(
        matchResults.map(async (match) => {
          const opponent = getOpponentName(match, playerStats.player_name)

          const { data: opponentStats } = await supabase
            .from('player_stats')
            .select('player_name')
            .ilike('player_name', opponent)
            .limit(1)
            .single()

          const { data: matchStatsData } = await supabase
            .from('match_stats')
            .select('*')
            .eq('player1', playerStats.player_name)
            .eq('player2', opponent)
            .eq('date_match', match.date_match)
            .limit(1)
            .single()

          return {
            match_result: match,
            opponent_name: opponentStats?.player_name || opponent,
            match_stats: matchStatsData || null
          }
        })
      )

      setMatches(matchesWithStats)
    } catch (err) {
      setError('Erreur inattendue')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [playerName, supabase])

  useEffect(() => {
    fetchMatchHistory()
  }, [fetchMatchHistory])

  const openStatsModal = (stats: MatchStatsRow | null) => {
    setSelectedMatchStats(stats)
    setIsModalOpen(true)
  }

  const closeStatsModal = () => {
    setIsModalOpen(false)
    setSelectedMatchStats(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-900/20 p-4 text-red-400">
        {error}
      </div>
    )
  }

  if (matches.length === 0) {
    return (
      <div className="rounded-lg bg-gray-800 p-8 text-center text-gray-400">
        Aucun match trouvé pour ce joueur
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Adversaire
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Résultat
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Métriques
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {matches.map((item, index) => {
              const result = getResult(item.match_result, playerName)
              const metricsList = formatMetricsList(item.match_stats)

              return (
                <tr key={item.match_result.id || index} className="hover:bg-gray-800/50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-white">
                    {formatDate(item.match_result.date_match)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-white">
                    {item.opponent_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-white">
                    {item.match_result.score || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        result === 'W'
                          ? 'bg-green-900/50 text-green-400'
                          : result === 'L'
                          ? 'bg-red-900/50 text-red-400'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {result || 'N/A'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {metricsList.slice(0, 3).map((metric, i) => (
                        <span
                          key={i}
                          className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300"
                        >
                          {metric}
                        </span>
                      ))}
                      {metricsList.length > 3 && (
                        <span className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-400">
                          +{metricsList.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <button
                      onClick={() => openStatsModal(item.match_stats)}
                      className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <MatchStatsModal
        stats={selectedMatchStats}
        isOpen={isModalOpen}
        onClose={closeStatsModal}
      />
    </div>
  )
}

export default PlayerMatchHistory
