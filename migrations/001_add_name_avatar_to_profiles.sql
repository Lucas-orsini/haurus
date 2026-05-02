-- Migration: Ajout des colonnes name et avatar_url à la table profiles
-- Risque: Faible — colonnes nullable/non-null avec default, n'impactent pas les lignes existantes
-- RLS: Les colonnes sont modifiables par le propriétaire via profiles_update_own (policy existante)

-- Ajout de la colonne name (nom d'affichage utilisateur)
-- NOT NULL avec DEFAULT '' : protège contre les nulls, les profils existants получит '' par défaut
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT '';

-- Ajout de la colonne avatar_url (photo de profil)
-- Nullable : aucun default, les profils existants garderont NULL (avatar externe via Gravatar ou initiales)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url text;
