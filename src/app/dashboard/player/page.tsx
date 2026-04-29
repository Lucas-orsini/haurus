export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { fetchLastMatches } from '@/lib/dashboard/stats'
import PlayerProfileClient from '@/components/dashboard/player/PlayerProfileClient'
import type { LastMatch } from '@/lib/dashboard/stats'

/**
 * Player Profile page.
 *
 * Server Component — verifies session.
 *
 * If a ?player= query param is present, fetches the last matches for that player
 * server-side and passes them to the client for immediate display.
 * Otherwise the client fetches match history interactively via PlayerSearchBar.
 *
 * If no active Supabase session, redirects to /login.
 */
export default async function PlayerPage({
  searchParams,
}: {
  searchParams: Promise<{ player?: string }>
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { player } = await searchParams
  let lastMatches: LastMatch[] | undefined

  if (player) {
    // Server-side pre-fetch when player is in the URL (e.g., shared link)
    lastMatches = await fetchLastMatches(supabase, player)
  }

  return <PlayerProfileClient initialLastMatches={lastMatches} />
}
