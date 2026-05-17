export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getTranslations } from '@/lib/i18n'
import { DashboardDictProvider } from '@/components/dashboard/DashboardDictContext'
import MetricsEducationClient from '@/components/dashboard/metrics/MetricsEducationClient'

/**
 * Metrics education page.
 *
 * Server Component — verifies the user session, loads locale-aware
 * translations, and wraps MetricsEducationClient inside DashboardDictProvider
 * so all child components can access translated strings via useDashboardDict().
 */
export default async function MetricsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile to determine locale preference
  const { data: profile } = await supabase
    .from('profiles')
    .select('locale')
    .eq('id', user.id)
    .single()

  const locale = (profile as { locale?: string } | null)?.locale === 'en' ? 'en' : 'fr'
  const dict = getTranslations(locale)

  return (
    <DashboardDictProvider dict={dict.dashboard}>
      <MetricsEducationClient />
    </DashboardDictProvider>
  )
}
