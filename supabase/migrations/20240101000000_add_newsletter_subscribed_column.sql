-- Migration 001 : ajoute la colonne subscribed + contrainte UNIQUE sur email
-- Idempotente : rejouable sans effet sur une DB déjà migrée

BEGIN;

-- 1. Ajouter la colonne subscribed avec DEFAULT true
--    Les lignes existantes recoivent subscribed = true automatiquement
ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS subscribed boolean NOT NULL DEFAULT true;

-- 2. Ajouter la contrainte UNIQUE sur email pour garantir l'idempotence de l'upsert
--    L'index B-tree existant (idx_newsletter_subscribers_email) est d'abord supprime
--    pour eviter le conflit de double index sur la meme colonne
DROP INDEX IF EXISTS public.idx_newsletter_subscribers_email;

ALTER TABLE public.newsletter_subscribers
  ADD CONSTRAINT newsletter_subscribers_email_unique UNIQUE (email);

-- 3. Index dedie pour les envois newsletter : retrouve rapidement les abonnes actifs
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed
  ON public.newsletter_subscribers (subscribed)
  WHERE subscribed = true;

COMMIT;
