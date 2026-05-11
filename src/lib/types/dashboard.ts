/**
 * TodaysStats — Types for the daily stats cards displayed above the match table.
 *
 * Exported from src/lib/types/dashboard.ts so both the page (server) and
 * DashboardOverview (client) can reference the same contract.
 *
 * card2 changed from WeatherCardData | null to
 * Array<{ name: string; weather: WeatherCardData }> | null
 * to support multi-tournament weather display.
 */

/**
 * Weather data for a tournament card displayed on the dashboard.
 */
export type WeatherCardData = {
  /** Temperature in degrees Celsius. */
  temperature: number | null
  /** Relative humidity in percent. */
  humidity: number | null
  /** Wind speed in km/h. */
  wind_speed: number | null
  /** Probability of precipitation in percent. */
  pop: number | null
  /** Human-readable weather condition label (e.g. "Broken clouds"). */
  conditions: string | null
  /** OpenWeatherMap icon code (e.g. "04d"). Null if unavailable. */
  conditions_icon: string | null
}

export type TodaysStats = {
  card1: {
    count: number
    tournaments: Array<{ name: string; surface: string }>
  }
  /**
   * Weather data per active tournament.
   *
   * - null       → no active tournaments today, or query failed (show "—" gracefully)
   * - []         → query succeeded but no tournament matched (show "—")
   * - [...]      → one entry per tournament with name + weather fields
   */
  card2: Array<{ name: string; weather: WeatherCardData }> | null
  /**
   * Surface speed for each active tournament today.
   *
   * - null       → tournament_pace query failed (show "Données indisponibles")
   * - []         → query succeeded but no tournament matched (show "—")
   * - [...]      → one entry per tournament, paceIndex may be null if no match in tournament_pace
   */
  card3: Array<{ name: string; surface: string; paceIndex: number | null }> | null
}
