export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardShell from '@/components/dashboard/DashboardShell'
import MetricsEducationClient from '@/components/dashboard/metrics/MetricsEducationClient'

/**
 * Metrics education page.
 *
 * Server Component — verifies the user session and renders the
 * MetricsEducationClient. The app shell (Sidebar, header) is provided
 * by the parent layout (src/app/dashboard/layout.tsx) via DashboardShell.
 */
export default async function MetricsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <MetricsEducationClient />
}
