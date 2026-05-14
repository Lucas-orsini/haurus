export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardShell from '@/components/dashboard/DashboardShell'
import MetricsEducationClient from '@/components/dashboard/metrics/MetricsEducationClient'

/**
 * Metrics education page.
 *
 * Server Component — verifies the user session and renders the
 * MetricsEducationClient wrapped in DashboardShell for consistent layout.
 * The shell provides sidebar, header, and page container consistent
 * with all other dashboard pages (dashboard/page.tsx, dashboard/player/page.tsx).
 */
export default async function MetricsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardShell>
      <MetricsEducationClient />
    </DashboardShell>
  )
}
