-- ============================================
-- MIGRATION: Création des tables tracked_players
-- Table principale : joueurs suivis avec verrouillage mensuel
-- Table historique : log de toutes les actions add/remove
-- ============================================

CREATE TABLE IF NOT EXISTS public.tracked_players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    player_name TEXT NOT NULL,
    player_id TEXT NOT NULL,
    locked_until TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT tracked_players_user_player_unique UNIQUE (user_id, player_name)
);

COMMENT ON TABLE public.tracked_players IS 'Joueurs suivis par utilisateur avec verrouillage mensuel';
COMMENT ON COLUMN public.tracked_players.locked_until IS 'Date jusqu''à laquelle le joueur ne peut pas être supprimé (premier jour du mois suivant l''ajout)';

CREATE TABLE IF NOT EXISTS public.tracked_players_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    player_name TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('add', 'remove')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tracked_players_history IS 'Historique des actions add/remove sur les joueurs suivis';
