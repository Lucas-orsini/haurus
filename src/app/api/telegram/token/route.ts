import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * GET /api/telegram/token
 *
 * Returns the user's Telegram token (existing or newly generated) along with
 * connection status and role. Creates and persists the token if absent.
 *
 * Response 200: { token: string, role: string, telegramChatId: number | null, telegramActive: boolean }
 * Response 401: { error: 'Unauthorized' }
 * Response 500: { error: 'Internal server error' }
 */
export async function GET(): Promise<Response> {
  const supabase = await createClient()

  // ── Step 1: Require authenticated session ───────────────────────────────────
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Step 2: Fetch profile — retrieve existing token, role, and connection state
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('telegram_token, role, telegram_chat_id, telegram_active')
    .eq('id', user.id)
    .maybeSingle()

  if (profileError) {
    console.error('[telegram-token] Failed to fetch profile:', profileError)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  // ── Step 3: Return existing token if present ─────────────────────────────────
  if (profile?.telegram_token) {
    return NextResponse.json(
      {
        token: profile.telegram_token,
        role: profile.role ?? 'user',
        telegramChatId: profile.telegram_chat_id ?? null,
        telegramActive: profile.telegram_active ?? false,
      },
      { status: 200 }
    )
  }

  // ── Step 4: Generate new token and persist it ────────────────────────────────
  let newToken: string
  try {
    // crypto.randomUUID() is available natively in Node.js 14.17+ / all Next.js runtimes
    newToken = crypto.randomUUID()
  } catch {
    // Fallback: rarely needed but defensive
    newToken = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ telegram_token: newToken })
    .eq('id', user.id)

  if (updateError) {
    console.error('[telegram-token] Failed to persist token:', updateError)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  return NextResponse.json(
    {
      token: newToken,
      role: profile?.role ?? 'user',
      telegramChatId: profile?.telegram_chat_id ?? null,
      telegramActive: profile?.telegram_active ?? false,
    },
    { status: 200 }
  )
}
