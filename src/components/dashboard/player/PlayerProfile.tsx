'use client'

import { useState, useEffect } from 'react'
import type { PlayerProfileData, Surface } from '@/lib/types/player'
import PlayerSearch from './PlayerSearch'
import PlayerMetricCards from './PlayerMetricCards'
import PlayerEvolutionChart from './PlayerEvolutionChart'
import PlayerMatchHistory from './PlayerMatchHistory'

interface PlayerProfileProps {
  playerName: string
  initialData: PlayerProfileData
}

/**
 * Root Client Component for the player profile page.
 * Manages surface state and orchestrates data re-fetching on surface change.
 */
export default function PlayerProfile({
  playerName,
  initialData,
}: PlayerProfileProps) {
  // Surface state — default from nextMatch.surface or Hard
  const defaultSurface: Surface = (initialData.nextMatch?.surface as Surface) ?? 'Hard'
  const [surface, setSurface] = useState<Surface>(defaultSurface)
  const [data, setData] = useState<PlayerProfileData>(initialData)
  const [loading, setLoading] = useState(false)

  // Re-fetch when surface changes
  useEffect(() => {
    async function fetchBySurface() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/player-search?player=${encodeURIComponent(playerName)}&surface=${surface}`
        )
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch {
        // Keep existing data on error
      } finally {
        setLoading(false)
      }
    }

    // Only re-fetch if surface is different from initial
    if (surface !== defaultSurface) {
      fetchBySurface()
    }
  }, [surface, playerName, defaultSurface])

  return (
    <div className="space-y-6">

      {/* Page header with player name + search */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-semibold text-[var(--text-1)]">{playerName}</h1>
          <p className="text-xs text-[var(--text-3)] mt-0.5">
            Profil joueur ATP · {data.playerStats?.rank ? `#${data.playerStats.rank}` : 'sans classement'}
          </p>
        </div>
        <div className="w-64 shrink-0">
          <PlayerSearch />
        </div>
      </div>

      {/* Surface toggle selector */}
      <div className="flex items-center gap-1.5">
        {(['Hard', 'Clay', 'Grass'] as Surface[]).map((s) => (
          <button
            key={s}
            onClick={() => setSurface(s)}
            disabled={loading}
            className={`
              h-7 px-3 flex items-center justify-center rounded-md text-xs font-medium
              transition-colors duration-150 whitespace-nowrap
              disabled:opacity-40 disabled:cursor-not-allowed
              ${surface === s
                ? 'bg-[var(--accent)] text-white'
                : 'border border-[var(--border-md)] bg-white/[0.03] text-[var(--text-2)] hover:bg-white/[0.06]'
              }
            `}
          >
            {s}
          </button>
        ))}
        {loading && (
          <div className="h-4 w-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin ml-2" />
        )}
      </div>

      {/* Metric cards */}
      <PlayerMetricCards
        playerStats={data.playerStats}
        atpAverage={data.atpAverage}
        surface={surface}
      />

      {/* Evolution chart — only if stats history is not empty */}
      {data.statsHistory.length > 0 && (
        <PlayerEvolutionChart statsHistory={data.statsHistory} />
      )}

      {/* Recent match history */}
      <PlayerMatchHistory recentMatches={data.recentMatches} />
    </div>
  )
}
