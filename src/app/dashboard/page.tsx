export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { MatchStats } from '@/lib/types/match'
import { computeTodaysStats } from '@/lib/dashboard/stats'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import { getTranslations } from '@/lib/i18n'

type Params = Promise<{ locale: string }>

/**
 * Dashboard overview page.
 *
 * Server Component — fetches upcoming match_stats (date_match >= today) on first load.
 * Also loads the user's favorite match IDs to pass to DashboardOverview.
 * If the user has no active Supabase session, redirects to /login.
 * The middleware already protects this route, but we double-check here
 * as a fail-safe (defense in depth).
 */
export default async function DashboardPage({ params }: { params: Params }) {
  const { locale } = await params
  const translations = getTranslations(locale as 'en' | 'fr')

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const today = new Date().toISOString().slice(0, 10)

  const { data: matches, error } = await supabase
    .from('match_stats')
    .select('*')
    .gte('date_match', today)
    .order('date_match', { ascending: true })

  // Fetch user's favorite match IDs
  let favoriteMatchIds: string[] = []
  try {
    const { data: favorites, error: favError } = await supabase
      .from('match_favorites')
      .select('match_id')
      .eq('user_id', user.id)

    if (!favError && favorites) {
      favoriteMatchIds = favorites.map((f) => f.match_id)
    }
  } catch {
    favoriteMatchIds = []
  }

  // Compute today's stats (card1/card2/card3)
  let todaysStats = undefined
  try {
    todaysStats = await computeTodaysStats(supabase)
  } catch {
    todaysStats = undefined
  }

  if (error) {
    return (
      <DashboardOverview
        matches={[]}
        fetchError={translations.dashboard.error}
        favoriteMatchIds={favoriteMatchIds}
        todaysStats={todaysStats}
        statCardsDict={translations.statCards}
        dashboardDict={translations.dashboard}
      />
    )
  }

  return (
    <DashboardOverview
      matches={(matches as MatchStats[]) ?? []}
      favoriteMatchIds={favoriteMatchIds}
      todaysStats={todaysStats}
      statCardsDict={translations.statCards}
      dashboardDict={translations.dashboard}
    />
  )
}
