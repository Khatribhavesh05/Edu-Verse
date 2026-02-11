'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { getUserProfile, type UserProfile } from '@/lib/firestore-user-profile';

export function useUserProfile() {
  const [user, setUser] = useState<typeof auth.currentUser>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      setLoading(true);
      try {
        if (!u) {
          setProfile(null);
          setLoading(false);
          return;
        }
        const p = await getUserProfile(u.uid);
        setProfile(p);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, profile, loading };
}

