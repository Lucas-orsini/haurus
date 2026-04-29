import { createClient } from '@/lib/supabase/server';
import { MatchHistoryTable } from '@/components/MatchHistoryTable';

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerDashboardPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: playerStats, error: statsError } = await supabase
    .from('player_stats')
    .select('*')
    .eq('id', id)
    .single();

  if (statsError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Erreur lors du chargement des statistiques du joueur.
        </div>
      </div>
    );
  }

  // Fetch match history - using player_name for matching
  const playerName = playerStats?.player_name;

  const { data: matchHistory, error: matchError } = await supabase
    .from('match_stats')
    .select('*')
    .or(`player1.ilike.${playerName},player2.ilike.${playerName}`)
    .order('date_match', { ascending: false })
    .limit(50);

  if (matchError) {
    console.error('Error fetching match history:', matchError);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {playerStats?.player_name || 'Joueur'}
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <span className="text-sm text-gray-500">Rang</span>
            <p className="text-lg font-semibold">{playerStats?.rank || 'N/A'}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Win Rate (TD)</span>
            <p className="text-lg font-semibold">
              {playerStats?.win_rate_td != null 
                ? `${(playerStats.win_rate_td * 100).toFixed(1)}%` 
                : 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Jours de repos</span>
            <p className="text-lg font-semibold">{playerStats?.jours_repos ?? 'N/A'}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Forme</span>
            <p className="text-lg font-semibold">{playerStats?.form || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Historique des matchs</h2>
        <MatchHistoryTable matches={matchHistory || []} />
      </div>
    </div>
  );
}
