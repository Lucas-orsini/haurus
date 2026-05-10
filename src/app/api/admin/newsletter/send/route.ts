import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'
import { getResend, FROM_EMAIL } from '@/lib/resend'
import { buildNewsletterHtml } from '@/lib/email/newsletter'

export const dynamic = 'force-dynamic'

const BATCH_SIZE = 100      // Limite hard Resend Batch API
const INTER_BATCH_DELAY_MS = 1000 // 1s entre batches si > 500 destinataires

interface NewsletterBody {
  subject: string
  body: string
  ctaLabel?: string
  ctaHref?: string
}

interface SendResult {
  sent: number
  failed: number
}

/**
 * Génère une idempotency key stable basée sur le contenu de la newsletter.
 * Stable = même clé pour le même contenu + même jour.
 * Évite les doublons en cas de retry réseau.
 *
 * Pattern : sha256(adminId + subject + dateYYYYMMDD + bodyHash)
 * bodyHash = 12 premiers caractères du SHA-256 du body pour éviter
 * d'avoir à hasher tout le HTML (peut être très long).
 */
function buildIdempotencyKey(
  adminId: string,
  subject: string,
  body: string,
  batchIndex: number
): string {
  const today = new Date().toISOString().slice(0, 10) // "2026-05-08"
  const bodyHash = createHash('sha256')
    .update(body)
    .digest('hex')
    .slice(0, 12)
  return `newsletter-${adminId}-${today}-${subject.slice(0, 30)}-${bodyHash}-${batchIndex}`
}

/**
 * Envoie la newsletter par batches de 100 via Resend Batch API.
 * Retourne le nombre d'emails envoyés et échoués.
 */
async function sendNewsletterBatch(
  recipients: string[],
  subject: string,
  html: string,
  adminId: string,
  baseUrl: string
): Promise<SendResult> {
  if (recipients.length === 0) {
    return { sent: 0, failed: 0 }
  }

  const resend = getResend()
  let sent = 0
  let failed = 0
  const totalBatches = Math.ceil(recipients.length / BATCH_SIZE)
  const needsDelay = recipients.length > 500

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const chunk = recipients.slice(i, i + BATCH_SIZE)
    const batchIndex = Math.floor(i / BATCH_SIZE)

    // Préparer les payloads — from est DANS chaque email du tableau
    const payloads = chunk.map((email) => ({
      from: FROM_EMAIL,
      to: [email],
      subject,
      html: html,
    }))

    // Idempotency key stable par chunk
    const idempotencyKey = buildIdempotencyKey(adminId, subject, recipients.join(','), batchIndex)

    const { data, error } = await resend.batch.send(payloads, {
      idempotencyKey,
    })

    if (error) {
      // Erreur API — tout le chunk est marqué failed
      console.error(`[resend] batch ${batchIndex} failed:`, error)
      failed += chunk.length
    } else if (data) {
      // data.data est l'array des emails créés (SDK v6.x)
      const successIds: string[] = (data.data ?? []).map(
        (e: { id: string }) => e.id
      )
      sent += successIds.length
      failed += chunk.length - successIds.length

      if (failed > 0) {
        console.warn(
          `[resend] batch ${batchIndex}: ${failed} email(s) failed, ${successIds.length} sent`
        )
      }
    }

    // Délai entre batches si > 500 destinataires et pas dernier batch
    if (needsDelay && batchIndex < totalBatches - 1) {
      await new Promise((resolve) => setTimeout(resolve, INTER_BATCH_DELAY_MS))
    }
  }

  return { sent, failed }
}

export async function POST(request: Request): Promise<Response> {
  // ── 1. Parse body ─────────────────────────────────────────────────────────
  let body: NewsletterBody
  try {
    body = (await request.json()) as NewsletterBody
  } catch {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 })
  }

  const { subject, body: emailBody, ctaLabel, ctaHref } = body

  if (!subject?.trim() || !emailBody?.trim()) {
    return NextResponse.json(
      { error: 'subject and body are required' },
      { status: 400 }
    )
  }

  // ── 2. Authz — récupérer l'user ──────────────────────────────────────────
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // ── 3. Admin check via profiles.role ──────────────────────────────────────
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (profile?.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden — admin role required' },
      { status: 403 }
    )
  }

  // ── 4. Récupérer les abonnés via service_role (bypass RLS) ───────────────
  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const { data: subscribers, error: subscribersError } = await admin
    .from('newsletter_subscribers')
    .select('email')

  if (subscribersError) {
    console.error('[newsletter] failed to fetch subscribers:', subscribersError)
    return NextResponse.json(
      { error: 'failed_to_fetch_subscribers' },
      { status: 500 }
    )
  }

  const emails = (subscribers ?? [])
    .map((s) => s.email)
    .filter((email): email is string => !!email && email.includes('@'))

  if (emails.length === 0) {
    return NextResponse.json({ sent: 0, failed: 0 })
  }

  // ── 5. Construire le HTML et envoyer via batch ───────────────────────────
  // Normalise : supprime tout slash terminal pour éviter //unsubscribe si
  // NEXT_PUBLIC_APP_URL est défini avec un trailing slash (ex: https://haurus.io/)
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://haurus.io').replace(/\/$/, '')
  const html = buildNewsletterHtml(subject, emailBody, baseUrl, ctaLabel, ctaHref)

  let result: SendResult
  try {
    result = await sendNewsletterBatch(emails, subject, html, user.id, baseUrl)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown_error'
    console.error('[newsletter] send failed:', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }

  return NextResponse.json(result)
}
