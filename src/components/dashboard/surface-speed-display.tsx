'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { getPaceColor, getPaceCategory } from '@/lib/utils'

interface SurfaceSpeedDisplayProps {
  selectedTournament: string | null
  selectedSurface: string | null
}

interface TournamentPaceRow {
  pace_index: number
  surface: string
  level: string
  tourney_name: string
}

export default function SurfaceSpeedDisplay({
  selectedTournament,
  selectedSurface,
}: SurfaceSpeedDisplayProps) {
  const [paceData, setPaceData] = useState<TournamentPaceRow | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Skip fetch if either tournament or surface is missing
  useEffect(() => {
    if (!selectedTournament || !selectedSurface) {
      setPaceData(null)
      setError(null)
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)

    async function fetchPace() {
      try {
        const supabase = createClient()
        if (!supabase) throw new Error('Client Supabase non disponible')

        // Re-check to satisfy strict mode across closure boundary
        if (!selectedSurface) return

        // Normalise surface to match DB casing (DB stores 'Hard'/'Clay'/'Grass')
        const dbSurface =
          selectedSurface.charAt(0).toUpperCase() +
          selectedSurface.slice(1).toLowerCase()

        const { data, error: dbError } = await supabase
          .from('tournament_pace')
          .select('pace_index, surface, level, tourney_name')
          .eq('tourney_name', selectedTournament)
          .eq('surface', dbSurface)
          .limit(1)
          .maybeSingle()

        if (dbError) throw dbError

        if (!cancelled) {
          setPaceData(data ?? null)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Échec du chargement de la vitesse de surface.'
          )
          setPaceData(null)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchPace()

    return () => {
      cancelled = true
    }
  }, [selectedTournament, selectedSurface])

  // ── Idle state ───────────────────────────────────────────────────────────
  if (!selectedTournament || !selectedSurface) {
    return (
      <div className="flex flex-col gap-1 min-w-[120px]">
        <span className="text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
          Vitesse surface
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--text-3)]">—</span>
        </div>
      </div>
    )
  }

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col gap-1 min-w-[120px]">
        <span className="text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
          Vitesse surface
        </span>
        <div className="h-7 w-24 rounded-md bg-white/[0.04] animate-pulse" />
      </div>
    )
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col gap-1 min-w-[120px]">
        <span className="text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
          Vitesse surface
        </span>
        <span className="text-xs text-[var(--red)]">Données indisponibles</span>
      </div>
    )
  }

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!paceData) {
    return (
      <div className="flex flex-col gap-1 min-w-[120px]">
        <span className="text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
          Vitesse surface
        </span>
        <span className="text-sm text-[var(--text-3)]">—</span>
      </div>
    )
  }

  // ── Success state ──────────────────────────────────────────────────────────
  const paceColor = getPaceColor(paceData.pace_index)
  const paceLabel = getPaceCategory(paceData.pace_index)
  const colorClass =
    paceColor === 'blue'
      ? 'text-[var(--text-1)]'
      : paceColor === 'yellow'
      ? 'text-[var(--yellow)]'
      : 'text-[var(--red)]'

  return (
    <div className="flex flex-col gap-1 min-w-[120px]">
      <span className="text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
        Vitesse surface
      </span>
      <div className="flex items-center gap-2">
        <span className={cn('text-sm font-semibold tabular-nums', colorClass)}>
          {paceData.pace_index.toFixed(3)}
        </span>
        <span className={cn('text-xs font-medium', colorClass)}>
          {paceLabel}
        </span>
      </div>
    </div>
  )
}
