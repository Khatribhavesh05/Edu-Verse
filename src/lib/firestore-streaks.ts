import { db } from './firebase';
import {
  doc,
  setDoc,
  getDoc,
  Timestamp,
  runTransaction,
} from 'firebase/firestore';

export interface Streak {
  type: string;
  currentStreak: number;
  longestStreak: number;
  lastActive: string;
}

export async function updateStreak(userId: string, streakType: string, streak: Streak) {
  const ref = doc(db, 'users', userId, 'streaks', streakType);
  await setDoc(ref, {
    ...streak,
    lastActive: streak.lastActive || new Date().toISOString(),
    updatedAt: Timestamp.now(),
  });
}

export async function getStreak(userId: string, streakType: string): Promise<Streak | null> {
  const ref = doc(db, 'users', userId, 'streaks', streakType);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as Streak) : null;
}

export async function recordDailyStreak(userId: string, streakType = 'learning'): Promise<void> {
  const ref = doc(db, 'users', userId, 'streaks', streakType);
  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(ref);
    const today = new Date().toISOString().slice(0, 10);
    let currentStreak = 0;
    let longestStreak = 0;
    let lastActive: string | null = null;

    if (snap.exists()) {
      const data = snap.data() as Streak;
      currentStreak = data.currentStreak ?? 0;
      longestStreak = data.longestStreak ?? 0;
      lastActive = data.lastActive ?? null;
    }

    if (lastActive === today) {
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (lastActive === yesterdayStr) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    transaction.set(
      ref,
      {
        type: streakType,
        currentStreak,
        longestStreak,
        lastActive: today,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
  });
}
