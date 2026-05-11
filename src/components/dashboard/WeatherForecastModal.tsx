'use client'

import { useEffect } from 'react'
import { X, AlertCircle, CloudOff, Droplets, Thermometer, Wind } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HourlyForecastEntry } from '@/lib/types/dashboard'

interface WeatherForecastModalProps {
  tourneyName: string
  hourlyData: HourlyForecastEntry[]
  isLoading: boolean
  error: string | null
  onClose: () => void
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

export default function WeatherForecastModal({
  tourneyName,
  hourlyData,
  isLoading,
  error,
  onClose,
}: WeatherForecastModalProps) {
  // ── Keyboard close: Escape ──────────────────────────────────────────────
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // ── Derived values for bar chart ───────────────────────────────────────
  const rainValues = hourlyData.map((h) => h.rain_mm_h ?? 0)
  const maxRain = Math.max(...rainValues, 0.1) // ≥ 0.1 so chart never empties

  const hasRain = hourlyData.some((h) => (h.rain_mm_h ?? 0) > 0)
  const hourlyCount = hourlyData.length

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
        aria-label={`Prévisions météo pour ${tourneyName}`}
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
          className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-xl border border-[var(--border-md)] bg-[var(--surface-1)] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between shrink-0 px-5 py-4 border-b border-[var(--border-md)]">
            <div className="flex flex-col min-w-0 mr-4">
              <h2 className="text-sm font-semibold text-[var(--text-1)] truncate">
                {tourneyName}
              </h2>
              <p className="text-[11px] text-[var(--text-3)] mt-0.5">
                Prévisions horaires · aujourd&apos;hui
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
                <p className="text-xs text-[var(--text-3)]">
                  Réessayez en cliquant à nouveau sur le tournoi.
                </p>
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

            {/* Success state — content */}
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

                  <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3">
                    <div className="flex items-end gap-1 min-w-max pb-4">
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
                            {/* Rain bar with fixed-height wrapper so +1j badge never shifts bar height */}
                            <div className="relative w-full flex flex-col items-center justify-end h-[112px]">
                              {/* Y-axis labels */}
                              <span className="absolute -top-4 text-[9px] text-[var(--text-3)] tabular-nums">
                                {idx === 0 || idx === hourlyData.length - 1
                                  ? `${maxRain.toFixed(2)}`
                                  : ''}
                              </span>

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
                                  {/* Label inside bar if tall enough */}
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

                            {/* X-axis hour label + day offset badge */}
                            <div className="flex flex-col items-center gap-0.5">
                              {isNextDay && (
                                <span className="text-[8px] font-medium px-1 py-px rounded bg-[var(--yellow)]/10 text-[var(--yellow)] leading-none">
                                  +1j
                                </span>
                              )}
                              <span className="text-[10px] text-[var(--text-3)] tabular-nums font-mono leading-none">
                                {formatHourChart(hour.hour)}
                              </span>
                            </div>
                          </div>
                        )
                      })}
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

                          {/* Feels like */}
                          {hour.feels_like !== undefined && hour.feels_like !== null && (
                            <div className="flex items-center gap-1">
                              <Thermometer
                                size={10}
                                strokeWidth={1.5}
                                className="text-[var(--text-3)] shrink-0"
                              />
                              <span className="text-[10px] text-[var(--text-3)] tabular-nums">
                                {`${Math.round(hour.feels_like)}°`}
                              </span>
                            </div>
                          )}

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

                          {/* POP */}
                          <div className="flex items-center gap-1">
                            <Droplets
                              size={10}
                              strokeWidth={1.5}
                              className="text-[var(--accent-hi)] shrink-0"
                            />
                            <span className="text-[11px] text-[var(--text-2)] tabular-nums">
                              {hour.pop !== null && hour.pop !== undefined
                                ? `${hour.pop}%`
                                : '—'}
                            </span>
                          </div>

                          {/* Pressure */}
                          {hour.pressure !== undefined && hour.pressure !== null && (
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] text-[var(--text-3)] tabular-nums leading-none">
                                {`${hour.pressure}`}
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

/** cn utility — inline for this standalone component */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
