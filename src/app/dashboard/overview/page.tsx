import { redirect } from 'next/navigation'
import { getMatchStats, type MatchStats } from '@/lib/dashboard/getMatchStats'
import { createClient } from '@/lib/supabase/server'
import MatchesTable from '@/components/dashboard/MatchesTable'

export const metadata = {
  title: 'Overview — Haurus',
  description: 'Tableau de bord des statistiques de matchs ATP.',
}

export default async function OverviewPage() {
  // Validate session server-side — middleware already protected the route,
  // but we double-check here to safely call Supabase without a broken session.
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  let matches: MatchStats[] = []
  try {
    matches = await getMatchStats()
  } catch {
    // Data fetch failed — still render with empty data; table shows error state.
    matches = []
  }

  return (
    <div className="px-6 py-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-1)] tracking-tight">
          Overview
        </h1>
        <p className="mt-1 text-sm text-[var(--text-2)]">
          {matches.length > 0
            ? `${matches.length} match${matches.length > 1 ? 's' : ''} trouvé${matches.length > 1 ? 's' : ''}`
            : 'Aucune donnée disponible'}
        </p>
      </div>

      {/* Client component handles search, filters, and accordion state */}
      <MatchesTable matches={matches} />
    </div>
  )
}
