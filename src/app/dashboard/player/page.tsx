export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PlayerProfileClient from '@/components/dashboard/player/PlayerProfileClient'

/**
 * Player Profile page.
 *
 * Server Component — verifies session and renders the interactive player profile UI.
 * No initial player data is fetched here; the client component handles all player
 * search and profile loading interactively via the Supabase browser client.
 *
 * If no active Supabase session, redirects to /login.
 */
export default async function PlayerPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <PlayerProfileClient />
}
