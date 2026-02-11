'use client';

import { useState, useEffect } from 'react';
import { getTopLeaderboard, type LeaderboardEntry } from '@/lib/firestore-leaderboard';

export function useLeaderboardEntries(gameId: string, topN = 5) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await getTopLeaderboard(gameId, topN);
        if (isMounted) {
          setEntries(data);
        }
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [gameId, topN]);

  return { entries, loading };
}
