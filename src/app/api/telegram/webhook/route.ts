import { createHmac, timingSafeEqual } from 'crypto'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const ELIGIBLE_ROLES = new Set(['user', 'analyste', 'pro', 'enterprise'])

interface TelegramMessage {
  message_id: number
  from?: {
    id: number
    first_name: string
    username?: string
  }
  chat: {
    id: number
    type: string
  }
  text?: string
  date: number
}

interface TelegramUpdate {
  update_id: number
  message?: TelegramMessage
}

/**
 * Validates the HMAC-SHA256 secret token.
 * Telegram sends this in the X-Telegram-Bot-Api-Secret-Token header
 * when the webhook is configured with a secret.
 */
function verifySignature(secretHeader: string | null, secret: string): boolean {
  if (!secretHeader || !secret) return false
  try {
    const expected = createHmac('sha256', secret)
      .update(secretHeader)
      .digest('hex')
    const receivedBuf = Buffer.from(secretHeader)
    const expectedBuf = Buffer.from(expected)
    if (receivedBuf.length !== expectedBuf.length) return false
    return timingSafeEqual(receivedBuf, expectedBuf)
  } catch {
    return false
  }
}

/**
 * Extracts the token from a "/connect <token>" command.
 */
function extractConnectToken(text: string | undefined): string | null {
  if (!text) return null
  const prefix = '/connect '
  if (!text.startsWith(prefix)) return null
  const token = text.slice(prefix.length).trim()
  if (!token) return null
  return token
}

/**
 * Sends a message to a Telegram chat via the Bot API.
 * Errors are caught and logged without blocking the webhook response.
 */
async function sendTelegramMessage(
  chatId: number,
  text: string
): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) {
    console.error('[telegram-webhook] TELEGRAM_BOT_TOKEN not configured')
    return
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      }
    )

    if (!response.ok) {
      const body = await response.text()
      console.error(
        `[telegram-webhook] sendMessage failed: ${response.status} ${body}`
      )
    }
  } catch (err) {
    // Never let sendMessage errors bubble — Telegram would retry indefinitely.
    console.error('[telegram-webhook] sendMessage network error:', err)
  }
}

export async function POST(request: Request): Promise<Response> {
  // ── Step 1: Signature validation ────────────────────────────────────────────
  //
  // TWO MODES OF OPERATION:
  //
  // • OPEN MODE (TELEGRAM_BOT_SECRET not set on Vercel):
  //   When TELEGRAM_BOT_SECRET is absent (botSecret = ''), verification is skipped.
  //   This is the default behaviour: Telegram does NOT send the X-Telegram-Bot-Api-Secret-Token
  //   header unless the webhook was set up with --secret, so without the secret configured
  //   we cannot enforce a check anyway. Any incoming request is accepted.
  //
  // • STRICT MODE (TELEGRAM_BOT_SECRET is set on Vercel):
  //   When TELEGRAM_BOT_SECRET is defined, the X-Telegram-Bot-Api-Secret-Token header
  //   must be present AND match the configured secret (HMAC-SHA256 comparison).
  //   A mismatch or missing header returns 400.
  //
  // To activate strict mode: set TELEGRAM_BOT_SECRET in Vercel env vars, then
  // reconfigure the Telegram webhook with: setWebhook --secret="YOUR_SECRET"
  //
  const secretHeader = request.headers.get('X-Telegram-Bot-Api-Secret-Token')
  const botSecret = process.env.TELEGRAM_BOT_SECRET ?? ''

  // Verification is conditional: skip entirely when botSecret is empty (open mode).
  // When botSecret is non-empty, the header must be present and valid (strict mode).
  if (botSecret && !verifySignature(secretHeader, botSecret)) {
    return Response.json({ error: 'invalid_signature' }, { status: 400 })
  }

  // ── Step 2: Parse body ───────────────────────────────────────────────────────
  let update: TelegramUpdate
  try {
    update = (await request.json()) as TelegramUpdate
  } catch {
    return Response.json({ error: 'invalid_payload' }, { status: 400 })
  }

  const message = update.message
  if (!message?.chat?.id) {
    // Acknowledge even invalid payloads — prevents Telegram retries.
    return Response.json({ ok: true }, { status: 200 })
  }

  const chatId = message.chat.id
  const text = message.text

  // ── Step 3: Extract /connect token ─────────────────────────────────────────
  const token = extractConnectToken(text)

  // Acknowledge non-connect messages without responding.
  if (!token) {
    return Response.json({ ok: true }, { status: 200 })
  }

  // ── Step 4: Lookup profile by token (service_role) ─────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('[telegram-webhook] Missing Supabase service role credentials')
    return Response.json({ ok: true }, { status: 200 })
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: profile, error: profileError } = await adminClient
    .from('profiles')
    .select('id, role, telegram_active')
    .eq('telegram_token', token)
    .maybeSingle()

  if (profileError) {
    console.error('[telegram-webhook] Profile lookup error:', profileError)
    // Still return 200 to Telegram to avoid retries.
    return Response.json({ ok: true }, { status: 200 })
  }

  if (!profile) {
    // Token not found — send error message asynchronously.
    sendTelegramMessage(chatId, '❌ Token invalide ou expiré.')
    return Response.json({ ok: true }, { status: 200 })
  }

  // ── Step 5: Determine response based on role eligibility ───────────────────
  if (!ELIGIBLE_ROLES.has(profile.role)) {
    // Role not eligible — notify user without changing DB state.
    sendTelegramMessage(
      chatId,
      '⚠️ Votre plan actuel ne donne pas accès aux notifications Telegram.'
    )
    return Response.json({ ok: true }, { status: 200 })
  }

  // ── Step 6: Connect — UPDATE profile ───────────────────────────────────────
  const { error: updateError } = await adminClient
    .from('profiles')
    .update({
      telegram_chat_id: chatId,
      telegram_active: true,
    })
    .eq('id', profile.id)

  if (updateError) {
    console.error('[telegram-webhook] Profile update error:', updateError)
    return Response.json({ ok: true }, { status: 200 })
  }

  // Send confirmation — this is non-blocking (catch swallows errors).
  sendTelegramMessage(chatId, '✅ Connecté ! Vous recevrez vos notifications Haurus ici.')

  // Always return 200 to Telegram.
  return Response.json({ ok: true }, { status: 200 })
}
