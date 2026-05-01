-- Migration 4 : Fonction utilitaire pour recalculer locked_until
-- Utilisée par les Server Actions quand un joueur devient déverrouillé (première disponibilité).
-- SECURITY INVOKER = s'exécute avec les droits du caller (service_role bypass RLS).

CREATE OR REPLACE FUNCTION public.get_next_month_first_day()
RETURNS date
LANGUAGE sql
STABLE
AS $$
  -- Calcule le premier jour du mois suivant
  SELECT date_trunc('month', CURRENT_DATE + interval '1 month')::date;
$$;

COMMENT ON FUNCTION public.get_next_month_first_day() IS
'Retourne le premier jour du mois prochain. Utilisé pour calculer locked_until sur tracked_players.';
