'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { HourlyForecastEntry } from '@/lib/types/dashboard'

export interface UseTournamentWeatherOptions {
  tourneyName: string | null
}

export interface UseTournamentWeatherResult {
  hourlyData: HourlyForecastEntry[]
  isLoading: boolean
  error: string | null
}

/** Fetches hourly weather forecast for the given tournament name.
 * Returns empty data and clears error when tourneyName is null/undefined. */
export function useTournamentWeather({
  tourneyName,
}: UseTournamentWeatherOptions): UseTournamentWeatherResult {
  const [hourlyData, setHourlyData] = useState<HourlyForecastEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!tourneyName) {
      setHourlyData([])
      setError(null)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)

    async function fetchWeather() {
      try {
        const supabase = createClient()
        if (!supabase) throw new Error('Client Supabase non disponible')

        const formatter = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Europe/Paris',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          hour12: false,
        })
        const parts = formatter.formatToParts(new Date())
        const get = (k: string) => parts.find((p) => p.type === k)?.value ?? '01'
        const today = `${get('year')}-${get('month')}-${get('day')}`

        const tomorrowDate = new Date()
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        const tomorrow = tomorrowDate.toISOString().slice(0, 10)

        const { data, error: dbError } = await supabase
          .from('tournament_weather')
          .select(
            'hour, rain_mm_h, temperature, pop, conditions_icon, conditions, date, wind_speed, humidity, pressure, feels_like'
          )
          .eq('tourney_name', tourneyName)
          .in('date', [today, tomorrow])
          .order('date', { ascending: true })
          .order('hour', { ascending: true })

        if (dbError) throw dbError

        const entries: HourlyForecastEntry[] = (data ?? []).map((row) => ({
          hour: row.hour as number,
          rain_mm_h: (row.rain_mm_h as number) ?? null,
          temperature: (row.temperature as number) ?? null,
          pop: (row.pop as number) ?? null,
          conditions_icon: (row.conditions_icon as string) ?? null,
          conditions: (row.conditions as string) ?? null,
          dayOffset: (row.date as string) === today ? (0 as const) : (1 as const),
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

        if (!cancelled) setHourlyData(windowEntries.slice(0, 24))
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Échec du chargement des prévisions météo.'
          )
          setHourlyData([])
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchWeather()

    return () => {
      cancelled = true
    }
  }, [tourneyName])

  return { hourlyData, isLoading, error }
}
