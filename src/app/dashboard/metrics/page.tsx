export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MetricsEducationClient from '@/components/dashboard/metrics/MetricsEducationClient'

/**
 * Metrics education page.
 *
 * Server Component — verifies the user session and renders the
 * MetricsEducationClient (all metric definitions are imported statically
 * client-side from src/lib/metrics/definitions.ts).
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
