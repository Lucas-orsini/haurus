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

  // ── Step 3: Route based on message content ─────────────────────────────────
  const textRaw = text?.trim() ?? ''

  // Case 1 — message does not start with /connect: send welcome message.
  if (!textRaw.startsWith('/connect')) {
    sendTelegramMessage(
      chatId,
      '👋 Bienvenue sur le bot Haurus.ai !\n\n' +
        'Pour connecter votre compte, envoyez `/connect [VOTRE_CLÉ]`.\n' +
        'Votre clé est disponible dans les paramètres de votre dashboard Haurus.ai.'
    )
    return Response.json({ ok: true }, { status: 200 })
  }

  // Case 2 — /connect without a token after the prefix: send error message.
  const token = extractConnectToken(text)
  if (!token) {
    sendTelegramMessage(
      chatId,
      '❌ Clé invalide. Vérifiez votre clé dans les paramètres de votre compte Haurus.ai et réessayez.'
    )
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
    .select('id, role, telegram_active, telegram_chat_id')
    .eq('telegram_token', token)
    .maybeSingle()

  if (profileError) {
    console.error('[telegram-webhook] Profile lookup error:', profileError)
    // Still return 200 to Telegram to avoid retries.
    return Response.json({ ok: true }, { status: 200 })
  }

  // Case 3 — token not found in profiles: send error message.
  if (!profile) {
    sendTelegramMessage(
      chatId,
      '❌ Clé invalide. Vérifiez votre clé dans les paramètres de votre compte Haurus.ai et réessayez.'
    )
    return Response.json({ ok: true }, { status: 200 })
  }

  // Case 4 — role not eligible for Telegram notifications: send upgrade prompt.
  if (!ELIGIBLE_ROLES.has(profile.role)) {
    sendTelegramMessage(
      chatId,
      '🔒 Votre plan actuel ne donne pas accès aux notifications Telegram. ' +
        'Rendez-vous sur Haurus.ai pour mettre à jour votre abonnement.'
    )
    return Response.json({ ok: true }, { status: 200 })
  }

  // Case 5 — chat_id already associated with this account: notify without updating.
  if (profile.telegram_chat_id === chatId) {
    sendTelegramMessage(
      chatId,
      '⚠️ Ce compte Telegram est déjà connecté à votre profil Haurus.ai.'
    )
    return Response.json({ ok: true }, { status: 200 })
  }

  // ── Step 5: Connect — UPDATE profile ───────────────────────────────────────
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

  // Case 6 — success: send confirmation.
  sendTelegramMessage(
    chatId,
    '✅ Compte Haurus.ai connecté avec succès !\n\n' +
      'Vous recevrez désormais une notification à chaque nouveau match ajouté sur la plateforme.'
  )

  // Always return 200 to Telegram.
  return Response.json({ ok: true }, { status: 200 })
}
