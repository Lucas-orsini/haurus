-- Migration: Ajouter une policy RLS UPDATE sur la table profiles
-- Objectif: permettre à l'utilisateur de mettre à jour son propre profil
-- (upsert { role: 'beta' } lors du signup)
-- Sécurité: la clause WITH CHECK garantit que le client ne peut pas
-- modifier son role vers une autre valeur (protection élévation de privilège)

-- S'assurer que RLS est activée sur profiles (bonne pratique défensive)
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

-- DROP POLICY existante si elle empêchait les updates (idempotent)
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

-- Policy UPDATE: l'utilisateur peut modifier SON propre profil
-- USING: filtre les lignes visibles/modifiables → auth.uid() = id
-- WITH CHECK: valide les lignes après modification
--   - auth.uid() = id → restriction au proprietaire
--   - role IS NULL OR role = 'beta' → seul 'beta' est modifiable/insérable depuis le client
--     (empêche un user de passer role='admin' après le signup)
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND (role IS NULL OR role = 'beta')
  );
