-- Migration 006 : active RLS et cree les policies restrictives sur newsletter_subscribers
-- Les policies deja existantes dans le plan ne sont pas actives tant que RLS ne l'est pas

BEGIN;

-- 1. Activer RLS sur la table
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 2. Policy INSERT publique
--    Tout le monde peut s'abonner (ou reformer son abonnement via upsert)
--    subscribed est force a true par le DEFAULT, donc pas de risque d'auto-desinscription
DROP POLICY IF EXISTS "newsletter_subscribers_insert_public" ON public.newsletter_subscribers;
CREATE POLICY "newsletter_subscribers_insert_public"
  ON public.newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 3. Policy SELECT admin only
--    Seuls les admins peuvent lire la liste des abonnes (pour l'envoi newsletter)
--    Supprime et recree la policy existante pour garantir la coherence RLS
DROP POLICY IF EXISTS "newsletter_subscribers_select_admin" ON public.newsletter_subscribers;
CREATE POLICY "newsletter_subscribers_select_admin"
  ON public.newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- 4. Policy DELETE admin only (desinscription via unsubscribe route)
--    Permet a un admin de supprimer un abonne par email
DROP POLICY IF EXISTS "newsletter_subscribers_delete_admin" ON public.newsletter_subscribers;
CREATE POLICY "newsletter_subscribers_delete_admin"
  ON public.newsletter_subscribers
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- 5. Supprimer les anciennes policies residuals (si elles existent encore)
DROP POLICY IF EXISTS "public_insert_newsletter_subscribers" ON public.newsletter_subscribers;

COMMIT;
