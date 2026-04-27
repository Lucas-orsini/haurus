import { fetchMatchStats } from '@/lib/supabase/match-stats'
import { MatchTable } from '@/components/dashboard/MatchTable'
import type { MatchStats } from '@/types/match-stats'

export default async function DashboardPage() {
  let matches: MatchStats[] = []
  let error: string | null = null

  try {
    const result = await fetchMatchStats()
    matches = result.matches
    if (result.error) {
      error = result.error.message
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Impossible de charger les matchs'
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* En-tête de la page */}
      <header className="mb-6">
        <h1 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">
          Overview
        </h1>
        <p className="text-sm text-[var(--text-3)] mt-1">
          Suivi des matchs et statistiques
        </p>
      </header>

      {/* Tableau des matchs */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-[var(--red)]/10 border border-[var(--red)]/20 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--red)]"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[var(--text-2)] mb-1">
            Erreur de chargement
          </p>
          <p className="text-sm text-[var(--text-3)] max-w-xs">
            {error}
          </p>
        </div>
      ) : (
        <MatchTable matches={matches} />
      )}
    </div>
  )
}
