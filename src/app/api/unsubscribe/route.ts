import { NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const UnsubscribeBody = z.object({
  email: z.string().email('Adresse email invalide'),
})

/**
 * POST /api/unsubscribe
 *
 * Route PUBLIQUE — aucun token ni session requis.
 * Accessible depuis le lien "Se désabonner" dans chaque email newsletter.
 *
 * 200 : désabonnement confirmé
 * 400 : validation échouée (email manquant ou invalide)
 * 404 : abonné non trouvé
 * 500 : erreur serveur
 */
export async function POST(request: Request): Promise<Response> {
  // ── 1. Parse et valider le body ─────────────────────────────────────────
  let body: z.infer<typeof UnsubscribeBody>
  try {
    const raw = await request.json()
    body = UnsubscribeBody.parse(raw)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? 'Email invalide' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'invalid_payload' },
      { status: 400 }
    )
  }

  const { email } = body

  // ── 2. Instancier le client service_role ───────────────────────────────
  // On bypass les RLS pour pouvoir lire et modifier la table sans restriction.
  // Ne pas réutiliser createClient() de server.ts (utilise les cookies + RLS).
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  // ── 3. Vérifier que l'abonné existe ────────────────────────────────────
  const { data: subscriber, error: findError } = await supabase
    .from('newsletter_subscribers')
    .select('id, subscribed')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle()

  if (findError) {
    console.error('[unsubscribe] failed to find subscriber:', findError)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }

  if (!subscriber) {
    return NextResponse.json(
      { error: 'Abonné non trouvé' },
      { status: 404 }
    )
  }

  // ── 4. Mettre à jour le statut subscribed ──────────────────────────────
  const { error: updateError } = await supabase
    .from('newsletter_subscribers')
    .update({ subscribed: false })
    .eq('id', subscriber.id)

  if (updateError) {
    console.error('[unsubscribe] failed to update subscriber:', updateError)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, email })
}
