import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function DELETE(): Promise<Response> {
  // ── Env guard — both vars required before any DB operation ──────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    console.error('[telegram-disconnect] Missing env: NEXT_PUBLIC_SUPABASE_URL')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  if (!serviceRoleKey) {
    console.error('[telegram-disconnect] Missing env: SUPABASE_SERVICE_ROLE_KEY')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  // ── Auth validation — SSR client only, never used for writes ─────────────────
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  // ── Write — admin client bypasses RLS ───────────────────────────────────────
  const adminClient = createAdminClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { error } = await adminClient
    .from('profiles')
    .update({
      telegram_chat_id: null,
      telegram_active: false,
    })
    .eq('id', user.id)

  if (error) {
    console.error('[telegram-disconnect] Failed to disconnect Telegram:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
