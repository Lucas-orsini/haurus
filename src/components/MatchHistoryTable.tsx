'use client';

import { useEffect, useState } from 'react';

interface MatchResult {
  id: string;
  date_match: string;
  tournoi: string | null;
  surface: string | null;
  player1: string;
  player2: string;
  score: string | null;
  winner: string | null;
  round: string | null;
  best_of: number | null;
  minutes: number | null;
}

interface MatchHistoryTableProps {
  playerName?: string;
  maxMatches?: number;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr || typeof dateStr !== 'string') {
    return '—';
  }

  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    return '—';
  }

  const [year, month, day] = parts;
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
    return '—';
  }

  return `${day}/${month}/${year}`;
}

export function MatchHistoryTable({ playerName, maxMatches = 20 }: MatchHistoryTableProps) {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (playerName) {
          params.append('player', playerName);
        }
        params.append('limit', maxMatches.toString());

        const res = await fetch(`/api/match-results?${params.toString()}`);

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        setMatches(data.matches || []);
      } catch (err) {
        console.error('Failed to fetch match history:', err);
        setError('Failed to load match history');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [playerName, maxMatches]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No match history available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tournament
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Surface
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Round
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Player 1
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Player 2
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Winner
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {matches.map((match) => (
            <tr key={match.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {formatDate(match.date_match)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {match.tournoi || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {match.surface || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {match.round || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {match.player1}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {match.player2}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {match.score || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {match.winner || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MatchHistoryTable;
