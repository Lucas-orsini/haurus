import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { PlayerSearchResult } from '@/lib/types/player'

export const dynamic = 'force-dynamic'

const MAX_RESULTS = 8

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') ?? ''

  if (query.trim().length < 2) {
    return NextResponse.json(
      { players: [], query },
      { status: 200 }
    )
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'unauthorized' },
      { status: 401 }
    )
  }

  const { data, error } = await supabase
    .from('player_stats')
    .select('id, player_name, rank')
    .ilike('player_name', '%' + query.trim() + '%')
    .order('rank', { ascending: true, nullsFirst: false })
    .limit(MAX_RESULTS)

  if (error) {
    console.error('[player-search] Supabase error:', error.message, {
      code: error.code,
      details: error.details,
      hint: error.hint,
    })
    return NextResponse.json(
      { error: 'database_error', detail: error.message },
      { status: 500 }
    )
  }

  const players: PlayerSearchResult[] = (data ?? []).map((row) => ({
    id: row.id,
    player_name: row.player_name,
    rank: row.rank,
  }))

  return NextResponse.json({ players, query }, { status: 200 })
}
