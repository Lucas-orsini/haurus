-- Migration 5 : Protection de la colonne `plan` sur profiles
-- Contexte : les policies existantes sur profiles permettent à l'utilisateur de modifier
-- toutes ses colonnes (y compris role). La colonne `plan` vient d'être ajoutée.
-- Sans protection, un utilisateur peut s'auto-upgrader vers 'enterprise' via un UPDATE direct.
--
-- Solution : recréer la policy UPDATE avec WITH CHECK qui fige la valeur de `plan`.
-- باقي colonnes modifiables (display_name, avatar_url, etc.) restent accessibles.

-- 1. Suppression de l'ancienne policy (elle sera recréée ci-dessous)
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

-- 2. Recreation de la policy UPDATE avec protection de `plan`
-- USING : filtre les lignes modifiables (doit être owner de la ligne)
-- WITH CHECK : valide APRÈS modification — on force plan à rester identique
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- Colonne `plan` non modifiable côté client
    AND plan = (SELECT plan FROM public.profiles WHERE id = auth.uid())
    -- Colonne `role` non modifiable côté client (élévation de privilège interdite)
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- 3. Vérification : cette policy est conforme à la règle 2.3 du document de sécurité
-- - USING = auth.uid() = id → filtre correctement les lignes own
-- - WITH CHECK = vérifie que plan et role restent inchangés
-- - Il reste au moins une colonne "libre" à modifier sur profiles
--   (updated_at est mise à jour automatiquement par trigger, autres champs si ajoutés)
