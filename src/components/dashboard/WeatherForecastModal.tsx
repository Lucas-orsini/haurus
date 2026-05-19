'use client'

import { useEffect, useState, useRef } from 'react'
import { X, AlertCircle, CloudOff, Droplets, Thermometer, Wind } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { HourlyForecastEntry } from '@/lib/types/dashboard'

interface WeatherForecastModalProps {
  isOpen: boolean
  onClose: () => void
  tourneyName: string | null
}

/** Format hour integer (0-23) to HH:00 string. */
function formatHour(hour: number): string {
  return `${String(hour).padStart(2, '0')}:00`
}

/** Format hour integer (0-23) to "15h" string for bar chart x-axis labels. */
function formatHourChart(hour: number): string {
  return `${hour}h`
}

/** OpenWeatherMap icon base URL. */
function iconUrl(iconCode: string | null): string {
  if (!iconCode) return ''
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

/** Inline cn utility — avoids import from utils.ts for standalone component */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function WeatherForecastModal({
  isOpen,
  onClose,
  tourneyName,
}: WeatherForecastModalProps) {
  const [hourlyData, setHourlyData] = useState<HourlyForecastEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /** Track the last fetched tournament to avoid duplicate fetches on re-open. */
  const lastTourneyRef = useRef<string>('')

  /** Keyboard close: Escape */
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  /** Fetch hourly forecast when the modal opens for a new tournament. */
  useEffect(() => {
    if (!isOpen || tourneyName === null) return

    // Skip re-fetch if the same tournament is already loaded.
    if (lastTourneyRef.current === tourneyName) return

    lastTourneyRef.current = tourneyName
    setHourlyData([])
    setError(null)
    setIsLoading(true)

    async function load() {
      try {
        const supabase = createClient()
        if (!supabase) throw new Error('Client Supabase non disponible')

        // Build today / tomorrow date strings in Europe/Paris timezone.
        const formatter = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Europe/Paris',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        const parts = formatter.formatToParts(new Date())
        const get = (k: string) => parts.find((p) => p.type === k)?.value ?? '01'
        const today = `${get('year')}-${get('month')}-${get('day')}`

        const tomorrowDate = new Date()
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        const tomorrow = tomorrowDate.toISOString().slice(0, 10)

        const { data, error: fetchError } = await supabase
          .from('tournament_weather')
          .select(
            'hour, rain_mm_h, temperature, pop, conditions_icon, conditions, date, wind_speed, humidity, pressure, feels_like'
          )
          .eq('tourney_name', tourneyName)
          .in('date', [today, tomorrow])
          .order('date', { ascending: true })
          .order('hour', { ascending: true })

        if (fetchError) throw fetchError

        // Map raw rows to HourlyForecastEntry with dayOffset computed.
        const entries: HourlyForecastEntry[] = (data ?? []).map((row) => ({
          hour: row.hour as number,
          rain_mm_h: (row.rain_mm_h as number) ?? null,
          temperature: (row.temperature as number) ?? null,
          pop: (row.pop as number) ?? null,
          conditions_icon: (row.conditions_icon as string) ?? null,
          conditions: (row.conditions as string) ?? null,
          dayOffset: (row.date as string) === today ? (0 as const) : (1 as const),
          date: (row.date as string) ?? null,
          wind_speed: (row.wind_speed as number) ?? null,
          humidity: (row.humidity as number) ?? null,
          pressure: (row.pressure as number) ?? null,
          feels_like: (row.feels_like as number) ?? null,
        }))

        // Filter to the next 24-hour window from now.
        const now = new Date()
        const cutoff = new Date(now.getTime() + 24 * 60 * 60 * 1000)
        const windowEntries = entries.filter((e) => {
          const entryDate = new Date(
            e.dayOffset === 0
              ? `${today}T${String(e.hour).padStart(2, '0')}:00:00`
              : `${tomorrow}T${String(e.hour).padStart(2, '0')}:00:00`
          )
          return entryDate >= now && entryDate < cutoff
        })

        setHourlyData(windowEntries.slice(0, 24))
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Échec du chargement des prévisions météo.'
        )
        setHourlyData([])
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [isOpen, tourneyName])

  // ── Derived values for bar chart ───────────────────────────────────────
  const rainValues = hourlyData.map((h) => h.rain_mm_h ?? 0)
  const maxRain = Math.max(...rainValues, 0.1)
  const hasRain = hourlyData.some((h) => (h.rain_mm_h ?? 0) > 0)
  const hourlyCount = hourlyData.length

  // No render if modal is not open.
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        key="weather-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`Prévisions météo pour ${tourneyName ?? ''}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal panel */}
        <motion.div
          key="weather-modal-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-xl border border-[var(--border-md)] bg-[var(--surface-1)] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between shrink-0 px-5 py-4 border-b border-[var(--border-md)]">
            <div className="flex flex-col min-w-0 mr-4">
              <h2 className="text-sm font-semibold text-[var(--text-1)] truncate">
                {tourneyName ?? ''}
              </h2>
              <p className="text-[11px] text-[var(--text-3)] mt-0.5">
                Prévisions horaires · aujourd&apos;hui et demain
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-white/[0.06] transition-colors duration-150 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
              aria-label="Fermer"
            >
              <X size={15} strokeWidth={1.5} />
            </button>
          </div>

          {/* ── Body ────────────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col gap-4 p-5">
                <div className="h-4 bg-[var(--border-md)] rounded animate-pulse w-32" />
                <div className="flex gap-2 items-end h-32">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[var(--border-md)] rounded animate-pulse"
                      style={{ height: `${30 + Math.sin(i) * 30 + 40}%` }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-8 gap-2 mt-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <div className="w-8 h-8 bg-[var(--border-md)] rounded-full animate-pulse" />
                      <div className="h-3 bg-[var(--border-md)] rounded animate-pulse w-8" />
                      <div className="h-2.5 bg-[var(--border-md)] rounded animate-pulse w-6" />
                      <div className="h-2.5 bg-[var(--border-md)] rounded animate-pulse w-6" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error state */}
            {!isLoading && error && (
              <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-[var(--red)]/10 border border-[var(--red)]/20 flex items-center justify-center">
                  <AlertCircle size={18} className="text-[var(--red)]" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-[var(--text-2)]">{error}</p>
                <button
                  onClick={() => {
                    // Re-trigger by toggling lastRef so the useEffect re-fires.
                    lastTourneyRef.current = ''
                    // Force a re-render to re-trigger the effect.
                    setHourlyData([])
                    setError(null)
                    setIsLoading(true)
                    // Directly re-call the fetch logic inline.
                    const supabase = createClient()
                    if (!supabase) return
                    const formatter = new Intl.DateTimeFormat('en-CA', {
                      timeZone: 'Europe/Paris',
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                    const parts = formatter.formatToParts(new Date())
                    const get = (k: string) => parts.find((p) => p.type === k)?.value ?? '01'
                    const today = `${get('year')}-${get('month')}-${get('day')}`
                    const tomorrowDate = new Date()
                    tomorrowDate.setDate(tomorrowDate.getDate() + 1)
                    const tomorrow = tomorrowDate.toISOString().slice(0, 10)
                    supabase
                      .from('tournament_weather')
                      .select(
                        'hour, rain_mm_h, temperature, pop, conditions_icon, conditions, date, wind_speed, humidity, pressure, feels_like'
                      )
                      .eq('tourney_name', tourneyName ?? '')
                      .in('date', [today, tomorrow])
                      .order('date', { ascending: true })
                      .order('hour', { ascending: true })
                      .then(({ data, error: fetchError }) => {
                        if (fetchError) {
                          setError(fetchError.message)
                          setIsLoading(false)
                          return
                        }
                        const entries: HourlyForecastEntry[] = (data ?? []).map((row) => ({
                          hour: row.hour as number,
                          rain_mm_h: (row.rain_mm_h as number) ?? null,
                          temperature: (row.temperature as number) ?? null,
                          pop: (row.pop as number) ?? null,
                          conditions_icon: (row.conditions_icon as string) ?? null,
                          conditions: (row.conditions as string) ?? null,
                          dayOffset: (row.date as string) === today ? (0 as const) : (1 as const),
                          date: (row.date as string) ?? null,
                          wind_speed: (row.wind_speed as number) ?? null,
                          humidity: (row.humidity as number) ?? null,
                          pressure: (row.pressure as number) ?? null,
                          feels_like: (row.feels_like as number) ?? null,
                        }))
                        const now = new Date()
                        const cutoff = new Date(now.getTime() + 24 * 60 * 60 * 1000)
                        const windowEntries = entries.filter((e) => {
                          const entryDate = new Date(
                            e.dayOffset === 0
                              ? `${today}T${String(e.hour).padStart(2, '0')}:00:00`
                              : `${tomorrow}T${String(e.hour).padStart(2, '0')}:00:00`
                          )
                          return entryDate >= now && entryDate < cutoff
                        })
                        setHourlyData(windowEntries.slice(0, 24))
                        setIsLoading(false)
                      })
                  }}
                  className="h-8 px-4 flex items-center justify-center gap-1.5 rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors duration-150"
                >
                  Réessayer
                </button>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && hourlyData.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center">
                  <CloudOff size={18} className="text-[var(--text-3)]" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-[var(--text-2)]">
                  Aucune donnée disponible
                </p>
                <p className="text-xs text-[var(--text-3)]">
                  Les prévisions horaires ne sont pas encore disponibles pour ce tournoi.
                </p>
              </div>
            )}

            {/* Success state */}
            {!isLoading && !error && hourlyData.length > 0 && (
              <div className="p-5 flex flex-col gap-6">
                {/* ── Rain bar chart ───────────────────────────────── */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets size={13} strokeWidth={1.5} className="text-[var(--accent-hi)] shrink-0" />
                    <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
                      Précipitations ({hourlyCount}h)
                    </p>
                    {hasRain && (
                      <span className="ml-auto text-[11px] text-[var(--text-3)] tabular-nums">
                        max {maxRain.toFixed(2)} mm/h
                      </span>
                    )}
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3 flex-1">
                      <div className="flex items-end gap-1 min-w-max">
                        {hourlyData.map((hour, idx) => {
                          const rain = hour.rain_mm_h ?? 0
                          const heightPct = Math.max((rain / maxRain) * 100, rain > 0 ? 4 : 0)
                          const isNextDay = hour.dayOffset === 1

                          return (
                            <div
                              key={idx}
                              className="flex flex-col items-center gap-0.5 w-12 shrink-0"
                              title={`${formatHour(hour.hour)}: ${rain.toFixed(2)} mm/h`}
                            >
                              <div className="relative w-full flex flex-col items-center justify-end h-[88px]">
                                {rain > 0 ? (
                                  <div
                                    className="w-7 rounded-t-sm transition-all duration-300"
                                    style={{
                                      height: `${heightPct}%`,
                                      background:
                                        rain > maxRain * 0.7
                                          ? 'var(--accent)'
                                          : rain > maxRain * 0.3
                                            ? 'var(--accent-muted)'
                                            : 'rgba(242,203,56,0.35)',
                                      minHeight: '4px',
                                    }}
                                  >
                                    {heightPct > 25 && (
                                      <span className="absolute inset-x-0 top-1 flex justify-center">
                                        <span className="text-[9px] font-medium text-[var(--accent-hi)] tabular-nums leading-none">
                                          {rain.toFixed(2)}
                                        </span>
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <div className="w-7 h-[4px] rounded-sm bg-[var(--border-md)]" />
                                )}
                              </div>

                              <div className="flex flex-col items-center justify-end h-[28px]">
                                <span className="text-[10px] text-[var(--text-3)] tabular-nums font-mono leading-none">
                                  {formatHourChart(hour.hour)}
                                </span>
                                {isNextDay && (
                                  <span className="mt-0.5 text-[8px] font-medium px-1 py-px rounded bg-[var(--yellow)]/10 text-[var(--yellow)] leading-none whitespace-nowrap">
                                    +1j
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── Hourly grid ──────────────────────────────────── */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Thermometer size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
                    <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
                      Prévision 24h
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
                    <div className="flex min-w-max">
                      {hourlyData.map((hour, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            'flex flex-col items-center gap-1.5 px-2 py-3 min-w-[72px] shrink-0',
                            idx < hourlyData.length - 1 && 'border-r border-[var(--border)]'
                          )}
                        >
                          {/* Hour */}
                          <span className="text-[11px] font-mono font-medium text-[var(--text-1)] tabular-nums">
                            {formatHour(hour.hour)}
                          </span>

                          {/* Weather icon */}
                          {hour.conditions_icon ? (
                            <img
                              src={iconUrl(hour.conditions_icon)}
                              alt={hour.conditions ?? ''}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10" />
                          )}

                          {/* Temperature */}
                          <div className="flex items-center gap-1">
                            <Thermometer
                              size={10}
                              strokeWidth={1.5}
                              className="text-[var(--text-3)] shrink-0"
                            />
                            <span className="text-[11px] text-[var(--text-1)] font-medium tabular-nums">
                              {hour.temperature !== null && hour.temperature !== undefined
                                ? `${Math.round(hour.temperature)}°`
                                : '—'}
                            </span>
                          </div>

                          {/* Wind speed */}
                          {hour.wind_speed !== undefined && hour.wind_speed !== null && (
                            <div className="flex items-center gap-1">
                              <Wind
                                size={10}
                                strokeWidth={1.5}
                                className="text-[var(--text-3)] shrink-0"
                              />
                              <span className="text-[11px] text-[var(--text-2)] tabular-nums">
                                {`${hour.wind_speed} km/h`}
                              </span>
                            </div>
                          )}

                          {/* Humidity */}
                          {hour.humidity !== undefined && hour.humidity !== null && (
                            <div className="flex items-center gap-1">
                              <Droplets
                                size={10}
                                strokeWidth={1.5}
                                className="text-[var(--accent-hi)] shrink-0"
                              />
                              <span className="text-[11px] text-[var(--text-2)] tabular-nums">
                                {`${hour.humidity}%`}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
