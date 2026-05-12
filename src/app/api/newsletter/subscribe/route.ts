import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * POST /api/newsletter/subscribe
 *
 * Subscribes an email to the newsletter by upserting into newsletter_subscribers
 * using the service_role client (bypasses RLS).
 *
 * Body:    { email: string }
 * Returns: 200 { ok: true }
 *          400 { error: string }  — email absent or invalid
 *          500 { error: string }  — Supabase error
 */
export async function POST(request: Request): Promise<Response> {
  // Parse body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  // Extract and validate email
  if (
    typeof body !== 'object' ||
    body === null ||
    !('email' in body) ||
    typeof (body as Record<string, unknown>).email !== 'string'
  ) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const email = ((body as Record<string, unknown>).email as string).trim().toLowerCase()

  if (!email) {
    return NextResponse.json({ error: 'Email cannot be empty.' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
  }

  // Upsert via service_role client (bypasses RLS)
  const supabase = await createClient()

  const { error } = await supabase.from('newsletter_subscribers').upsert(
    { email, subscribed: true },
    { onConflict: 'email' }
  )

  if (error) {
    console.error('[/api/newsletter/subscribe] Supabase upsert error:', error.message)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
