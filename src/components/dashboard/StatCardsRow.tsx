'use client'

import { useState, useEffect, useRef } from 'react'
import { cn, getPaceColor, getPaceCategory } from '@/lib/utils'
import type { TodaysStats, WeatherCardData } from '@/lib/types/dashboard'
import { CalendarDays, TrendingUp, Cloud } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTournament } from '@/contexts/TournamentContext'
import { useTournamentWeather } from '@/hooks/useTournamentWeather'
import { createClient } from '@/lib/supabase/client'

interface StatCardsRowProps {
  todaysStats?: TodaysStats
  onOpenModal?: (tourneyName: string) => void
}

export default function StatCardsRow({ todaysStats, onOpenModal }: StatCardsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Card 1 — Matchs du jour */}
      <Card1 card1={todaysStats?.card1} />

      {/* Card 2 — Météo (autonome — fetch via hook) */}
      <Card2 onOpenModal={onOpenModal} />

      {/* Card 3 — Vitesse de surface (autonome — fetch via useEffect) */}
      <Card3 />
    </div>
  )
}

function Card1({ card1 }: { card1?: TodaysStats['card1'] }) {
  if (!card1 || card1.count === 0) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            Matchs du jour
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">Aucun match prévu</p>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          Matchs du jour
        </p>
      </div>
      <p className="text-2xl font-medium text-[var(--text-1)] font-mono tabular-nums tracking-tight mb-1">
        {card1.count}
      </p>
      <div className="flex flex-col gap-0.5 mt-1">
        {card1.tournaments.map((t, i) => (
          <p key={i} className="text-[11px] text-[var(--text-3)]">
            {t.name}
            {t.surface ? (
              <span className="ml-1 text-[var(--text-3)]">· {t.surface}</span>
            ) : null}
          </p>
        ))}
      </div>
    </div>
  )
}

/** Card 2 — Météo
 *
 * Autonome : lit selectedTournament depuis TournamentContext, fetch
 * via useTournamentWeather, et ouvre la modal de prévisions horaires.
 */
function Card2({ onOpenModal }: { onOpenModal?: (name: string) => void }) {
  const { selectedTournament } = useTournament()

  const { hourlyData, isLoading, error } = useTournamentWeather({
    tourneyName: selectedTournament,
  })

  // Afficher la condition la plus récente (heure la plus proche de maintenant)
  const latestEntry = hourlyData.length > 0 ? hourlyData[0] : null
  const hasData = !isLoading && !error && hourlyData.length > 0

  const handleOpenModal = () => {
    if (selectedTournament) {
      onOpenModal?.(selectedTournament)
    }
  }

  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 mb-3">
        <Cloud size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          Météo
        </p>
        <button
          onClick={handleOpenModal}
          disabled={!selectedTournament || (!hasData && !isLoading)}
          title="Voir les prévisions horaires"
          className="ml-auto h-7 px-3 flex items-center justify-center gap-1.5 rounded-md text-[11px] font-medium text-[var(--text-2)] border border-[var(--border-md)] bg-[var(--surface-2)] hover:text-[var(--accent-hi)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prévision
        </button>
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-[var(--border-md)] rounded animate-pulse w-24" />
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-[var(--border-md)] rounded animate-pulse" />
            <div className="flex-1 flex flex-col gap-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-3 bg-[var(--border-md)] rounded animate-pulse" style={{ width: `${60 + i * 10}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <p className="text-sm text-[var(--red)]">Erreur</p>
      )}

      {/* Empty state */}
      {!isLoading && !error && !hasData && (
        <>
          <p className="text-sm text-[var(--text-3)]">—</p>
          <p className="text-[11px] text-[var(--text-3)] mt-0.5">Aucun tournoi actif</p>
        </>
      )}

      {/* Success — current conditions */}
      {hasData && latestEntry && (
        <div className="flex flex-col gap-2">
          {selectedTournament && (
            <p className="text-[11px] text-[var(--text-2)] font-medium truncate">
              {selectedTournament}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 min-w-0">
            {/* Weather icon */}
            <div className="flex flex-col items-center justify-center gap-1.5 shrink-0 sm:w-24">
              {latestEntry.conditions_icon ? (
                <img
                  src={`https://openweathermap.org/img/wn/${latestEntry.conditions_icon}@2x.png`}
                  alt={latestEntry.conditions ?? 'Conditions météo'}
                  className="w-10 h-10 object-contain"
                  onError={(e) => { ;(e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              ) : (
                <span className="text-sm text-[var(--text-3)] text-center leading-tight">
                  {latestEntry.conditions ?? '—'}
                </span>
              )}
              <p className="text-[10px] text-[var(--text-3)] text-center leading-tight">
                {latestEntry.conditions ?? '—'}
              </p>
            </div>

            {/* Metrics */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <WeatherMetric
                label="Température"
                value={latestEntry.temperature !== null && latestEntry.temperature !== undefined
                  ? `${latestEntry.temperature}°C`
                  : '—'}
              />
              <WeatherMetric
                label="Humidité"
                value={latestEntry.humidity !== null && latestEntry.humidity !== undefined
                  ? `${latestEntry.humidity}%`
                  : '—'}
              />
              <WeatherMetric
                label="Vent"
                value={latestEntry.wind_speed !== null && latestEntry.wind_speed !== undefined
                  ? `${latestEntry.wind_speed} km/h`
                  : '—'}
              />
              <WeatherMetric
                label="POP"
                value={latestEntry.pop !== null && latestEntry.pop !== undefined
                  ? `${latestEntry.pop}%`
                  : '—'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function WeatherMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between min-w-0">
      <p className="text-[11px] text-[var(--text-3)] uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-medium text-[var(--text-1)] tabular-nums shrink-0 ml-3">
        {value}
      </p>
    </div>
  )
}

/** Card 3 — Vitesse de surface
 *
 * Autonome : lit selectedTournament depuis TournamentContext,
 * fetch direct via createClient sur tournament_pace filtré par tourney_name exact.
 */
function Card3() {
  const { selectedTournament } = useTournament()

  const [paceData, setPaceData] = useState<Array<{ name: string; surface: string; paceIndex: number | null }> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ref pour éviter les race conditions — ignore les réponses périmées
  const tourneyRef = useRef<string | null>(null)

  useEffect(() => {
    if (!selectedTournament) {
      setPaceData(null)
      setError(null)
      return
    }

    tourneyRef.current = selectedTournament
    setIsLoading(true)
    setError(null)

    async function fetchPace() {
      const supabase = createClient()
      if (!supabase) {
        setError('Client Supabase non disponible')
        setIsLoading(false)
        return
      }

      try {
        // Exact match sur tourney_name comme spécifié dans les contrats
        const { data, error: dbError } = await supabase
          .from('tournament_pace')
          .select('tourney_name, surface, pace_index')
          .eq('tourney_name', selectedTournament)

        if (dbError) throw dbError

        // Ignore la réponse si le tournoi a changé entre-temps (race condition cleanup)
        if (tourneyRef.current !== selectedTournament) return

        if (!data || data.length === 0) {
          setPaceData([])
          setIsLoading(false)
          return
        }

        // Une ligne par surface — grouper par tourney_name (une seule ligne en théorie)
        const entries = data.map(row => ({
          name: row.tourney_name as string,
          surface: row.surface as string,
          paceIndex: (row.pace_index as number) ?? null,
        }))

        setPaceData(entries)
      } catch (err) {
        if (tourneyRef.current !== selectedTournament) return
        setError(err instanceof Error ? err.message : 'Échec du chargement des données pace.')
        setPaceData(null)
      } finally {
        if (tourneyRef.current === selectedTournament) {
          setIsLoading(false)
        }
      }
    }

    fetchPace()
  }, [selectedTournament])

  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          Vitesse de surface
        </p>
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="flex flex-col gap-4">
          <div className="h-3 bg-[var(--border-md)] rounded animate-pulse w-24" />
          <div className="h-8 bg-[var(--border-md)] rounded animate-pulse w-20" />
          <div className="h-[10px] bg-[var(--surface-3)] rounded-full animate-pulse" />
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-[var(--text-3)]">Données indisponibles</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && (!paceData || paceData.length === 0) && (
        <>
          <p className="text-sm text-[var(--text-3)]">—</p>
          <p className="text-[11px] text-[var(--text-3)] mt-0.5">Aucun tournoi actif</p>
        </>
      )}

      {/* Success */}
      {!isLoading && !error && paceData && paceData.length > 0 && (
        <div className="flex flex-col gap-4">
          {paceData.map((entry, i) => (
            <GaugeEntry key={i} entry={entry} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

/** Palette hex pour la jauge — indexée par PaceColor */
const PACE_COLOR_HEX: Record<string, string> = {
  blue:   '#3b82f6',
  yellow: '#facc15',
  red:    '#f87171',
}

function GaugeEntry({ entry, index }: { entry: { name: string; surface: string; paceIndex: number | null }; index: number }) {
  const paceIndex = entry.paceIndex
  const displayValue = paceIndex !== null ? paceIndex.toFixed(2) : '—'
  const paceColor   = paceIndex !== null ? getPaceColor(paceIndex) : 'blue'
  const paceCategory = getPaceCategory(paceIndex)
  const colorHex = PACE_COLOR_HEX[paceColor]

  const normalizedPace = Math.min(Math.max(paceIndex ?? 0, 0), 2) / 2
  const cursorLeft = `calc(${normalizedPace * 100}% - 5px)`

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[11px] text-[var(--text-3)]">
        {entry.name}
        <span className="mx-1 text-[var(--text-3)]">·</span>
        {entry.surface}
      </p>

      <div className="flex items-baseline gap-2">
        <p className="text-sm font-semibold text-[var(--text-1)] tabular-nums tracking-tight">
          {displayValue}
        </p>
        {paceIndex !== null && (
          <span
            className="text-[10px] font-medium px-1.5 py-px rounded"
            style={{ color: colorHex, backgroundColor: `${colorHex}18` }}
          >
            {paceCategory}
          </span>
        )}
      </div>

      <div className="relative h-[44px] flex flex-col justify-end gap-0 overflow-hidden">
        <div className="relative h-7 flex items-end">
          {paceIndex !== null ? (
            <motion.div
              initial={{ left: '0%' }}
              animate={{ left: cursorLeft }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: 'easeOut' }}
              className="absolute top-0 w-[10px] h-7 flex flex-col items-center"
            >
              <span
                className="text-[9px] font-mono font-semibold whitespace-nowrap px-1 py-px rounded"
                style={{ color: colorHex, backgroundColor: `${colorHex}22` }}
              >
                {displayValue}
              </span>
              <div
                className="w-[10px] h-[14px] -mt-px"
                style={{
                  clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                  backgroundColor: colorHex,
                  boxShadow: `0 0 6px 1px ${colorHex}80`,
                }}
              />
            </motion.div>
          ) : null}
        </div>

        <div className="relative h-[10px] rounded-full overflow-hidden bg-[var(--surface-3)]">
          <div
            className="h-full rounded-full"
            style={{ backgroundColor: colorHex, opacity: 0.85 }}
          />
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-white opacity-25"
            style={{ left: '40%' }}
          />
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-white opacity-25"
            style={{ left: '55%' }}
          />
        </div>
      </div>
    </div>
  )
}
