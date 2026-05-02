import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function DELETE(): Promise<Response> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      telegram_chat_id: null,
      telegram_active: false,
      telegram_token: null,
    })
    .eq('id', user.id)

  if (error) {
    console.error('[telegram-disconnect] Failed to disconnect Telegram:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
