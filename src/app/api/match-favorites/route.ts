import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/match-favorites
 * Returns the list of match_ids favorited by the authenticated user.
 * 200 { favoriteMatchIds: string[] }
 * 401 if not authenticated
 */
export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { data, error } = await supabase
    .from('match_favorites')
    .select('match_id')
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    favoriteMatchIds: (data ?? []).map((row: { match_id: string }) => row.match_id),
  })
}

/**
 * POST /api/match-favorites
 * Idempotent toggle: inserts the favorite if absent, deletes it if present.
 * Body: { matchId: string }
 * 200 { favorited: boolean, matchId: string }
 * 400 if body is invalid or matchId is missing
 * 401 if not authenticated
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    !('matchId' in body) ||
    typeof (body as Record<string, unknown>).matchId !== 'string' ||
    !(body as { matchId: string }).matchId.trim()
  ) {
    return NextResponse.json(
      { error: 'Invalid body: matchId must be a non-empty string' },
      { status: 400 }
    )
  }

  const matchId = (body as { matchId: string }).matchId.trim()

  // Step 1: check if favorite already exists for this user/match pair
  const { data: existing } = await supabase
    .from('match_favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('match_id', matchId)
    .maybeSingle()

  let favorited: boolean

  if (existing) {
    // Step 2a: already favorited → delete to toggle off
    const { error: deleteError } = await supabase
      .from('match_favorites')
      .delete()
      .eq('id', existing.id)

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to remove favorite' },
        { status: 500 }
      )
    }
    favorited = false
  } else {
    // Step 2b: not favorited → insert to toggle on
    const { error: insertError } = await supabase
      .from('match_favorites')
      .insert({ user_id: user.id, match_id: matchId })

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to add favorite' },
        { status: 500 }
      )
    }
    favorited = true
  }

  return NextResponse.json({ favorited, matchId })
}
