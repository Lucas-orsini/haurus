import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getRoleLimits } from '@/lib/config/role-limits'
import type { Database } from '@/lib/supabase/database.types'

type TrackedPlayer = Database['public']['Tables']['tracked_players']['Row']

/** Returns the first day of the next month from a given date, as ISO string. */
function getFirstOfNextMonth(from: Date = new Date()): string {
  const year = from.getFullYear()
  const month = from.getMonth()
  // month is 0-indexed; month + 1 = next month; if month === 11, it rolls to year + 1
  const nextMonth = month + 1
  const targetYear = nextMonth > 11 ? year + 1 : year
  const targetMonth = nextMonth > 11 ? 0 : nextMonth
  return new Date(Date.UTC(targetYear, targetMonth, 1, 0, 0, 0, 0)).toISOString()
}

// ─── GET /api/tracked-players ────────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  // Fetch user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role ?? null
  const limits = getRoleLimits(role)

  // Fetch tracked players
  const { data: trackedPlayers, error } = await supabase
    .from('tracked_players')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[GET /api/tracked-players] DB error:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des joueurs suivis' }, { status: 500 })
  }

  const count = (trackedPlayers ?? []).length
  // Convert Infinity to null for JSON serialization (client expects null === Infinity)
  const limitValue = limits.trackedPlayers === Infinity ? null : limits.trackedPlayers

  return NextResponse.json(
    {
      trackedPlayers: trackedPlayers ?? [],
      count,
      limit: limitValue,
      role: role ?? 'unknown',
    },
    { status: 200 }
  )
}

// ─── POST /api/tracked-players ───────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  let body: { player_name?: unknown; player_id?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON invalide' }, { status: 400 })
  }

  const playerName = typeof body.player_name === 'string' ? body.player_name.trim() : ''
  const playerId = typeof body.player_id === 'string' ? body.player_id.trim() : ''

  if (!playerName || !playerId) {
    return NextResponse.json({ error: 'player_name et player_id sont requis' }, { status: 400 })
  }

  // Fetch user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role ?? null
  const limits = getRoleLimits(role)

  // Check if already tracked
  const { data: existing } = await supabase
    .from('tracked_players')
    .select('id')
    .eq('user_id', user.id)
    .eq('player_name', playerName)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'Joueur déjà suivi' }, { status: 409 })
  }

  // Check limit
  const { count: currentCount } = await supabase
    .from('tracked_players')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const count = currentCount ?? 0

  if (limits.trackedPlayers !== Infinity && count >= limits.trackedPlayers) {
    return NextResponse.json({ error: 'Limite de joueurs suivis atteinte' }, { status: 422 })
  }

  const lockedUntil = getFirstOfNextMonth()

  const { data: inserted, error: insertError } = await supabase
    .from('tracked_players')
    .insert({
      user_id: user.id,
      player_name: playerName,
      player_id: playerId,
      locked_until: lockedUntil,
    })
    .select()
    .single()

  if (insertError) {
    // PostgreSQL UNIQUE constraint violation
    if (insertError.code === '23505') {
      return NextResponse.json({ error: 'Joueur déjà suivi' }, { status: 409 })
    }
    console.error('[POST /api/tracked-players] DB insert error:', insertError)
    return NextResponse.json({ error: "Erreur lors de l'ajout du joueur" }, { status: 500 })
  }

  // Log add event in history
  await supabase.from('tracked_players_history').insert({
    user_id: user.id,
    player_name: playerName,
    action: 'add',
  })

  // Fetch player stats for response
  const { data: playerStats } = await supabase
    .from('player_stats')
    .select('*')
    .eq('player_name', playerName)
    .single()

  return NextResponse.json(
    {
      trackedPlayer: inserted as TrackedPlayer,
      player: playerStats ?? null,
    },
    { status: 201 }
  )
}

// ─── DELETE /api/tracked-players ─────────────────────────────────────────────

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  let body: { player_name?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON invalide' }, { status: 400 })
  }

  const playerName = typeof body.player_name === 'string' ? body.player_name.trim() : ''

  if (!playerName) {
    return NextResponse.json({ error: 'player_name est requis' }, { status: 400 })
  }

  // Fetch user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role ?? null
  const limits = getRoleLimits(role)

  // Fetch the tracked player row
  const { data: trackedPlayer, error: fetchError } = await supabase
    .from('tracked_players')
    .select('id, locked_until')
    .eq('user_id', user.id)
    .eq('player_name', playerName)
    .maybeSingle()

  if (fetchError) {
    console.error('[DELETE /api/tracked-players] DB fetch error:', fetchError)
    return NextResponse.json({ error: 'Erreur lors de la vérification du joueur' }, { status: 500 })
  }

  if (!trackedPlayer) {
    // Nothing to delete — treat as success
    return NextResponse.json({ success: true }, { status: 200 })
  }

  // Check lock: only roles with lockDays=true are affected
  if (limits.lockDays) {
    const lockExpiry = new Date(trackedPlayer.locked_until)
    if (lockExpiry > new Date()) {
      const formattedDate = lockExpiry.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
      return NextResponse.json(
        { error: `Joueur verrouillé jusqu'au ${formattedDate}` },
        { status: 400 }
      )
    }
  }

  // Proceed with deletion
  const { error: deleteError } = await supabase
    .from('tracked_players')
    .delete()
    .eq('user_id', user.id)
    .eq('player_name', playerName)

  if (deleteError) {
    console.error('[DELETE /api/tracked-players] DB delete error:', deleteError)
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
  }

  // Log remove event in history
  await supabase.from('tracked_players_history').insert({
    user_id: user.id,
    player_name: playerName,
    action: 'remove',
  })

  return NextResponse.json({ success: true }, { status: 200 })
}
