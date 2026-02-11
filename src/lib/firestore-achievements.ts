import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';

export interface Achievement {
  name: string;
  unlockedAt: string;
  details?: string;
}

export async function unlockAchievement(userId: string, achievement: Achievement) {
  const ref = collection(db, 'users', userId, 'achievements') as CollectionReference<DocumentData>;
  await addDoc(ref, {
    ...achievement,
    unlockedAt: achievement.unlockedAt || new Date().toISOString(),
    createdAt: Timestamp.now(),
  });
}

export async function getAchievements(userId: string): Promise<Achievement[]> {
  const ref = collection(db, 'users', userId, 'achievements') as CollectionReference<DocumentData>;
  const snap = await getDocs(ref);
  return snap.docs.map(doc => doc.data() as Achievement);
}
