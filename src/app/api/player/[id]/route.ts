import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data: playerStats, error: statsError } = await supabase
      .from('player_stats')
      .select('*')
      .eq('id', id)
      .single();

    if (statsError) {
      if (statsError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Joueur non trouvé' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des statistiques' },
        { status: 500 }
      );
    }

    const playerName = playerStats.player_name;

    // Fetch match history for this player
    const { data: matchHistory, error: matchError } = await supabase
      .from('match_stats')
      .select('*')
      .or(`player1.ilike.${playerName},player2.ilike.${playerName}`)
      .order('date_match', { ascending: false })
      .limit(50);

    if (matchError) {
      console.error('Match history error:', matchError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération de l\'historique' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      player: playerStats,
      matches: matchHistory || []
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
