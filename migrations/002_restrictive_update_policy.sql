-- ============================================================
-- Migration 002 : Remplacer profiles_update_own par une policy
-- restrictive qui verrouillera role, plan, telegram_token et telegram_active
--
-- ATTENTION : profiles_update_own existante est trop permissive
-- (USING (auth.uid() = id) sans WITH CHECK = client peut modifier
-- n'importe quelle colonne). PostgREST combine les policies en OR,
-- donc une policy restrictive N'EST PAS suffisante seule —
-- il FAUT supprimer la policy permissive.
--
-- Idempotent : utilise DO $$ avec vérification d'existence AVANT
-- de recréer, pour supporter ré-exécution sans erreur.
-- ============================================================

DO $$
BEGIN
  -- Étape 1 : Supprimer l'ancienne policy permissive si elle existe
  -- (autorise UPDATE sur toutes les colonnes sans restriction)
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'profiles_update_own'
      AND tablename = 'profiles'
  ) THEN
    DROP POLICY profiles_update_own ON public.profiles;
  END IF;

  -- Étape 2 : Créer la nouvelle policy restrictive
  -- L'utilisateur peut modifier :
  --   - name, avatar_url : infos de profil habituelles
  --   - telegram_chat_id : valeur settée par le webhook Telegram
  -- L'utilisateur NE peut PAS modifier (colonnées sensibles ou pilotées par le trigger) :
  --   - role, plan : élévation de privilège / upgrade gratuit
  --   - telegram_token : jeton secret, ne doit jamais être modifié côté client
  --   - telegram_active : flag piloté par le trigger sync_telegram_active, pas par le client
  CREATE POLICY profiles_update_own
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- Colonnes sensibles figées : toute tentative de modification est rejetée
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
    AND plan = (SELECT plan FROM public.profiles WHERE id = auth.uid())
    AND telegram_token = (SELECT telegram_token FROM public.profiles WHERE id = auth.uid())
    -- telegram_active est piloté par le trigger, pas modifiable par le client
    AND telegram_active = (SELECT telegram_active FROM public.profiles WHERE id = auth.uid())
  );
END;
$$;
