-- =============================================================================
-- CORRECTION BLOCKERS - Policies RLS profiles
-- Blocage 1: supprimer profiles_insert_own (pas de USING/WITH CHECK → faille INSERT)
-- Blocage 2: ajouter WITH CHECK sur profiles_update_own (USING seul → risque reassignment id)
-- =============================================================================

-- === CORRECTION BLOCAKER 1 : Supprimer la policy INSERT client-side ===
-- L'INSERT légitime passe uniquement par le trigger SECURITY DEFINER (bypass RLS).
-- Sans cette suppression, un client authentifié pourrait insérer avec un id arbitraire
-- (y compris un autre user) ou forcer un role='admin'.
DROP POLICY IF EXISTS profiles_insert_own ON public.profiles;

-- === CORRECTION BLOCAKER 2 : Ajouter WITH CHECK sur la policy UPDATE ===
-- USING seul ne suffit pas : un user pourrait faire UPDATE ... SET id = 'autre-uuid'
-- pour voler un profil, ou modifier d'autres colonnes.
-- WITH CHECK identique au USING = lock total côté client, seul le trigger peut modifier.
DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
CREATE POLICY profiles_update_own ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =============================================================================
-- FIN CORRECTION BLOCKERS
-- =============================================================================

-- Trigger PostgreSQL pour créer automatiquement un profil avec role='beta'
-- lors de l'inscription d'un nouvel utilisateur dans auth.users.
-- Sécurité : SECURITY DEFINER avec search_path explicite, REVOKE après création.

-- 1. Supprimer le trigger existant s'il y en a un (idempotence)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Supprimer la fonction précédente si elle existe (idempotence via CREATE OR REPLACE)
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Créer la fonction trigger avec SECURITY DEFINER
-- SECURITY DEFINER : exécute avec les droits de postgres (bypass RLS)
-- SET search_path : protège contre les attaques par hijack de schema
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Insère un profil pour le nouvel utilisateur avec role='beta'
  INSERT INTO public.profiles (id, role, created_at, updated_at)
  VALUES (
    NEW.id,
    'beta',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- 4. Attacher le trigger sur auth.users après chaque INSERT
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Révoquer l'exécution de la fonction au public (principe du moindre privilège)
-- Seul le trigger (exécuté en tant que postgres) peut l'invoquer
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
