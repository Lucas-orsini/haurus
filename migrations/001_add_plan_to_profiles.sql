-- Migration 1 : Ajout de la colonne `plan` sur profiles
-- Contexte : le plan contrôle les limites du système de joueurs suivis.
-- Cette colonne est SENSIBLE — l'utilisateur ne doit pas pouvoir la modifier directement.
-- La valeur par défaut 'free' protège les utilisateurs existants qui n'ont pas de plan défini.

-- 1. Ajout de la colonne avec valeur par défaut
-- NOT NULL grâce à la valeur DEFAULT qui s'applique à toutes les lignes existantes
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'free';

-- 2. Contrainte CHECK séparée pour valider les valeurs autorisées
-- Syntaxe correcte : ADD CONSTRAINT après ADD COLUMN
ALTER TABLE public.profiles
ADD CONSTRAINT chk_profiles_plan_values
CHECK (plan IN ('beta', 'free', 'pro', 'enterprise'));

-- 3. Commentaire de documentation
COMMENT ON COLUMN public.profiles.plan IS 'Plan de l''utilisateur — contrôle les limites de joueurs suivis. Modifications réservées au service_role (webhooks Stripe, endpoints serveur).';

-- 4. RLS est déjà active sur profiles (policy existante), pas besoin de ALTER.
-- Mais la policy UPDATE existante "profiles_update_own" autorise l'utilisateur à modifier
-- toutes ses colonnes — y compris `plan`. On doit corriger ça dans la migration 005.
