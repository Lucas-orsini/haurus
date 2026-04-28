import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/database.types'

type MatchResult = Database['public']['Tables']['match_results']['Row']

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const playerName = searchParams.get('player_name')

  if (!playerName || playerName.trim() === '') {
    return NextResponse.json(
      { error: 'player_name is required' },
      { status: 400 }
    )
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('match_results')
      .select('*')
      .or(`player1.eq.${playerName},player2.eq.${playerName}`)
      .order('date_match', { ascending: false })
      .limit(5)

    if (error) {
      console.error('[player-match-history] Supabase error:', error.message)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { matches: (data ?? []) as MatchResult[] },
      { status: 200 }
    )
  } catch (err) {
    console.error('[player-match-history] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
