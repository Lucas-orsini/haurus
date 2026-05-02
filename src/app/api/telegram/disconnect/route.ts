import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function DELETE(request: NextRequest): Promise<Response> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const action = request.nextUrl.searchParams.get('action')
  const isSuspend = action === 'suspend'

  // Suspension (downgrade) : préserve telegram_chat_id, désactive juste les notifications
  if (isSuspend) {
    const { error } = await supabase
      .from('profiles')
      .update({ telegram_active: false })
      .eq('id', user.id)

    if (error) {
      console.error('[telegram-disconnect] Failed to suspend Telegram:', error)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
    }
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // Déconnexion complète : nullifie chat_id et telegram_active
  const { error } = await supabase
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
