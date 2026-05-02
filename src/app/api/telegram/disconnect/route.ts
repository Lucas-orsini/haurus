import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * DELETE /api/telegram/disconnect
 *
 * Revokes the Telegram connection for the authenticated user by clearing
 * telegram_chat_id, telegram_token, and telegram_active in a single update.
 *
 * This ensures the token is revoked on voluntary disconnect and on plan downgrade —
 * a new token will be generated on the next modal open.
 *
 * Response 200: { success: true }
 * Response 401: { error: 'Unauthorized' }
 * Response 500: { error: 'Internal server error' }
 */
export async function DELETE(): Promise<Response> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      telegram_chat_id: null,
      telegram_token: null,
      telegram_active: false,
    })
    .eq('id', user.id)

  if (error) {
    console.error('[telegram-disconnect] Failed to disconnect Telegram:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
