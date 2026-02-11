'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { getStreak, type Streak } from '@/lib/firestore-streaks';

export function useStreak(streakType = 'learning') {
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!isMounted) return;
      if (!user) {
        setStreak(null);
        return;
      }

      try {
        const data = await getStreak(user.uid, streakType);
        if (isMounted) {
          setStreak(data);
        }
      } catch (error) {
        console.error('Failed to load streak data:', error);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [streakType]);

  return streak;
}
