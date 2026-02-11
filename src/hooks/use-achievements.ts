'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { getAchievements, type Achievement } from '@/lib/firestore-achievements';

export function useUserAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!isMounted) return;
      if (!user) {
        setAchievements([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getAchievements(user.uid);
        if (isMounted) {
          setAchievements(data);
        }
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return { achievements, loading };
}
