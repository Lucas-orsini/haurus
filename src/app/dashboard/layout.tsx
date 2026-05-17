import { cookies } from 'next/headers'
import { getTranslations } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/server'
import { TournamentProvider } from '@/contexts/TournamentContext'
import DashboardShell from '@/components/dashboard/DashboardShell'

/**
 * Dashboard layout — wraps all /dashboard/* pages.
 *
 * Server Component — reads the locale cookie and passes the
 * dashboard translation fragment to the shell.
 * Also fetches distinct tournament names from Supabase to seed the
 * TournamentProvider with serializable initial data (avoids hydration mismatch).
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('locale')?.value ?? 'fr') as 'fr' | 'en'
  const translations = getTranslations(locale)

  // ── Fetch distinct tournament names (server-side, single round-trip) ──
  // pick match_results as it contains the most descriptive rows in the sample.
  // both tables expose the 'tournoi' column — switching to match_stats requires
  // only changing the table name in the query below.
  let initialTournaments: string[] = []
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('match_results')
      .select('tournoi')

    if (!error && data) {
      const seen = new Set<string>()
      for (const row of data) {
        if (row.tournoi) seen.add(row.tournoi)
      }
      initialTournaments = Array.from(seen).sort()
    }
  } catch {
    // gracefully fall back to empty list — the selector handles empty gracefully
    initialTournaments = []
  }

  return (
    <TournamentProvider initialTournaments={initialTournaments}>
      <DashboardShell dict={translations.dashboard}>{children}</DashboardShell>
    </TournamentProvider>
  )
}
