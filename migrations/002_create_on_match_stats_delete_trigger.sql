-- Trigger AFTER DELETE sur match_stats
-- Déclenche cleanup_match_favorites() à chaque suppression de match
CREATE TRIGGER on_match_stats_delete
AFTER DELETE ON public.match_stats
FOR EACH ROW
EXECUTE FUNCTION public.cleanup_match_favorites();

COMMENT ON TRIGGER on_match_stats_delete ON public.match_stats IS
  'Déclenche le cleanup des favoris après suppression d''un match';
