-- Migration: Trigger de réinitialisation Telegram par rôle
-- Table cible: public.profiles
-- Déclencheur: BEFORE UPDATE sur colonne 'role'
-- Rôles éligibles: user, analyste, pro, enterprise
-- Non éligibles: starter et tout rôle non listé

-- ============================================================
-- ÉTAPE 1 : Création de la fonction trigger
-- ============================================================
-- SECURITY DEFINER requis car le trigger s'exécute sur UPDATE
-- SET search_path = public, pg_temp pour éviter les attaques
-- de manipulation du search_path (règle de sécurité obligatoire)
-- ============================================================

CREATE OR REPLACE FUNCTION public.reset_telegram_on_role_downgrade()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Vérifie que le rôle a réellement changé (évite les faux positifs sur other updates)
  IF OLD.role IS DISTINCT FROM NEW.role
     AND NEW.role NOT IN ('user', 'analyste', 'pro', 'enterprise')
  THEN
    -- Réinitialise l'état actif et le chat_id
    -- telegram_token EST CONSERVÉ : l'utilisateur peut se reconnecter plus tard
    NEW.telegram_active = false;
    NEW.telegram_chat_id = NULL;
  END IF;

  RETURN NEW;
END;
$$;

-- Restreindre l'exécution aux rôles appropriés (pas de PUBLIC)
REVOKE ALL ON FUNCTION public.reset_telegram_on_role_downgrade() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.reset_telegram_on_role_downgrade() TO postgres;
GRANT EXECUTE ON FUNCTION public.reset_telegram_on_role_downgrade() TO service_role;
