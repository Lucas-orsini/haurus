'use client'

import { cn } from '@/lib/utils'
import type { TodaysStats } from '@/lib/types/dashboard'
import { CalendarDays, TrendingUp, Cloud } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocale } from '@/providers/LocaleProvider'
import { getTranslations } from '@/lib/i18n'

interface StatCardsRowProps {
  todaysStats?: TodaysStats
  onWeatherClick?: (tourneyName: string) => void
}

export default function StatCardsRow({ todaysStats, onWeatherClick }: StatCardsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Card 1 — Matchs du jour */}
      <Card1 card1={todaysStats?.card1} />

      {/* Card 2 — Météo */}
      <Card2 card2={todaysStats?.card2} onWeatherClick={onWeatherClick} />

      {/* Card 3 — Vitesse de surface */}
      <Card3 card3={todaysStats?.card3 ?? null} />
    </div>
  )
}

function Card1({ card1 }: { card1?: TodaysStats['card1'] }) {
  const { locale } = useLocale()
  const t = getTranslations(locale)

  if (!card1 || card1.count === 0) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            {t.dashboard.stats.matchesToday}
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">{t.dashboard.stats.noMatches}</p>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          {t.dashboard.stats.matchesTodayShort}
        </p>
      </div>
      <p className="text-2xl font-medium text-[var(--text-1)] font-mono tabular-nums tracking-tight mb-1">
        {card1.count}
      </p>
      <div className="flex flex-col gap-0.5 mt-1">
        {card1.tournaments.map((tourney, i) => (
          <p key={i} className="text-[11px] text-[var(--text-3)]">
            {tourney.name}
            {tourney.surface ? (
              <span className="ml-1 text-[var(--text-3)]">· {tourney.surface}</span>
            ) : null}
          </p>
        ))}
      </div>
    </div>
  )
}

type WeatherCardData = {
  temperature: number | null
  humidity: number | null
  wind_speed: number | null
  pop: number | null
  conditions: string | null
  conditions_icon: string | null
}

type Card2Entry = { name: string; weather: WeatherCardData }

function Card2({ card2, onWeatherClick }: { card2?: Card2Entry[] | null; onWeatherClick?: (name: string) => void }) {
  const { locale } = useLocale()
  const t = getTranslations(locale)

  // State: idle — data not yet loaded (card2 is undefined)
  if (card2 === undefined) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <Cloud size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            {t.dashboard.stats.weather}
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">{t.dashboard.stats.weatherUnavailable}</p>
      </div>
    )
  }

  // State: empty — no active tournament today (card2 is null or [])
  if (!card2 || card2.length === 0) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <Cloud size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            {t.dashboard.stats.weather}
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">—</p>
        <p className="text-[11px] text-[var(--text-3)] mt-0.5">{t.dashboard.stats.noTournaments}</p>
      </div>
    )
  }

  // State: success — render one weather block per tournament entry
  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 mb-3">
        <Cloud size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          {t.dashboard.stats.weather}
        </p>
        {/* Bouton texte — ouvre la modal météo, visible uniquement quand des données sont disponibles */}
        <button
          onClick={() => onWeatherClick?.(card2[0]?.name ?? '')}
          title={t.dashboard.weather.title}
          className="ml-auto h-7 px-3 flex items-center justify-center gap-1.5 rounded-md text-[11px] font-medium text-[var(--text-2)] border border-[var(--border-md)] bg-[var(--surface-2)] hover:text-[var(--accent-hi)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
        >
          {t.dashboard.weather.hourlyForecast}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {card2.map((entry, i) => {
          const { name, weather: w } = entry
          return (
            <div key={i} className="flex flex-col gap-2">
              {/* Tournament name — non cliquable */}
              <p className="text-[11px] text-[var(--text-2)] font-medium truncate">
                {name}
              </p>

              {/* Two-column layout: left = conditions + icon, right = 4 stacked metrics */}
              <div className="flex flex-col sm:flex-row gap-3 min-w-0">
                {/* Left zone — conditions label + OpenWeatherMap icon */}
                <div className="flex flex-col items-center justify-center gap-1.5 shrink-0 sm:w-24">
                  {w.conditions_icon ? (
                    <img
                      src={`https://openweathermap.org/img/wn/${w.conditions_icon}@2x.png`}
                      alt={w.conditions ?? 'Conditions météo'}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="text-sm text-[var(--text-3)] text-center leading-tight">
                      {w.conditions ?? '—'}
                    </span>
                  )}
                  <p className="text-[10px] text-[var(--text-3)] text-center leading-tight">
                    {w.conditions ?? '—'}
                  </p>
                </div>

                {/* Right zone — 4 stacked metrics */}
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <WeatherMetric
                    label={t.dashboard.weather.feelsLike}
                    value={w.temperature !== null && w.temperature !== undefined
                      ? `${w.temperature}°C`
                      : '—'}
                  />
                  <WeatherMetric
                    label={t.dashboard.weather.humidity}
                    value={w.humidity !== null && w.humidity !== undefined
                      ? `${w.humidity}%`
                      : '—'}
                  />
                  <WeatherMetric
                    label={t.dashboard.weather.wind}
                    value={w.wind_speed !== null && w.wind_speed !== undefined
                      ? `${w.wind_speed} km/h`
                      : '—'}
                  />
                  <WeatherMetric
                    label={t.dashboard.weather.precipitation}
                    value={w.pop !== null && w.pop !== undefined
                      ? `${w.pop}%`
                      : '—'}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
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

type Card3Entry = { name: string; surface: string; paceIndex: number | null }

function Card3({ card3 }: { card3?: Card3Entry[] | null }) {
  const { locale } = useLocale()
  const t = getTranslations(locale)

  if (card3 === undefined) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            {t.dashboard.stats.paceIndex}
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">{t.dashboard.stats.weatherUnavailable}</p>
      </div>
    )
  }

  if (card3 === null || card3.length === 0) {
    return (
      <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
          <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
            {t.dashboard.stats.paceIndex}
          </p>
        </div>
        <p className="text-sm text-[var(--text-3)]">—</p>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg border border-[var(--border-md)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={13} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          {t.dashboard.stats.paceIndex}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {card3.map((entry, i) => (
          <GaugeEntry key={i} entry={entry} index={i} locale={locale} />
        ))}
      </div>
    </div>
  )
}

/** Palette hex pour la jauge — indexée par PaceColor */
const PACE_COLOR_HEX: Record<string, string> = {
  blue:   '#3b82f6',
  yellow: '#facc15',
  red:    '#f87171',
}

function getPaceColor(paceIndex: number | null): 'blue' | 'yellow' | 'red' {
  if (paceIndex === null || paceIndex < 0.80) return 'blue'
  if (paceIndex <= 1.10) return 'yellow'
  return 'red'
}

function getPaceCategory(paceIndex: number | null, locale: string): string {
  if (paceIndex === null || paceIndex < 0.80) return locale === 'fr' ? 'Lent' : 'Slow'
  if (paceIndex <= 1.10) return locale === 'fr' ? 'Moyen' : 'Medium'
  return locale === 'fr' ? 'Rapide' : 'Fast'
}

function GaugeEntry({ entry, index, locale }: { entry: Card3Entry; index: number; locale: string }) {
  const paceIndex = entry.paceIndex
  const displayValue = paceIndex !== null ? paceIndex.toFixed(2) : '—'

  const paceColor = getPaceColor(paceIndex)
  const paceCategory = getPaceCategory(paceIndex, locale)
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
