-- ============================================================
-- Migration 001 : Ajouter les colonnes Telegram à profiles
-- + créer le trigger de synchronisation telegram_active
-- ============================================================

-- Étape 0 : Activer RLS AVANT toute alteration de colonne
-- profiles contient les colonnes sensibles role, plan, telegram_token.
-- Sans RLS activé, les policies sont inopérantes et tout utilisateur
-- authentifié peut accéder/modifier toutes les lignes via PostgREST.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Étape 1 : Ajouter telegram_token avec UNIQUE et DEFAULT auto-généré
-- gen_random_uuid()::text produit 32 bytes hex = collisions négligeables
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS telegram_token text
  UNIQUE
  DEFAULT gen_random_uuid()::text;

-- Étape 2 : Ajouter telegram_chat_id (nullable, valeur settée par le webhook)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS telegram_chat_id bigint;

-- Étape 3 : Ajouter telegram_active (flag piloté par le trigger, pas par le client)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS telegram_active boolean
  NOT NULL
  DEFAULT false;

-- Étape 4 : Créer la fonction trigger sync_telegram_active
-- Synchronise telegram_active = true quand le role est éligible (user/pro/enterprise)
-- Le trigger est BEFORE UPDATE pour que la valeur soit cohérente AVANT le commit
CREATE OR REPLACE FUNCTION public.sync_telegram_active()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.telegram_active := (NEW.role IN ('user', 'pro', 'enterprise'));
  RETURN NEW;
END;
$$;

-- Étape 5 : Créer le trigger sur BEFORE UPDATE de role
-- ONLY FOR EACH ROW car on monitore une ligne spécifique (pas besoin de STATEMENT)
DROP TRIGGER IF EXISTS trg_sync_telegram ON public.profiles;
CREATE TRIGGER trg_sync_telegram
BEFORE UPDATE OF role
ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_telegram_active();
