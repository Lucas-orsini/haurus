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
 * Uses DELETE (not UPDATE) to fully remove the subscriber row, aligning with
 * the pattern already proven in src/app/unsubscribe/actions.ts.
 * DELETE is idempotent: deleting a non-existent row is a no-op.
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

  // ── 3. Supprimer le subscriber par email ───────────────────────────────
  // DELETE est idempotent : si la ligne n'existe pas, c'est un no-op qui
  // retourne 0 rows affected — on ne retourne pas 404 dans ce cas (le
  // résultat est le même : l'email n'est plus abonné).
  const { error: deleteError } = await supabase
    .from('newsletter_subscribers')
    .delete()
    .eq('email', email.toLowerCase().trim())

  if (deleteError) {
    console.error('[unsubscribe] failed to delete subscriber:', deleteError)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, email })
}
