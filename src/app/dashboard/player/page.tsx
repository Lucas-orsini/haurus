export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PlayerProfileClient from '@/components/dashboard/player/PlayerProfileClient'
import type { MatchStats } from '@/lib/types/match'

/**
 * Player Profile page.
 *
 * Server Component — fetches enriched match history (with winner/score/loser
 * from match_results joined on date_match + player1 + player2) and passes it
 * to the client component as pre-enriched props. The metrics modal query
 * (match_stats alone) remains isolated in the client.
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
