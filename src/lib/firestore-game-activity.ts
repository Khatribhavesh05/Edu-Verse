import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';
import type { GameActivity } from './types/game-activity';

export async function logGameActivityFirestore(userId: string, activity: GameActivity) {
  const ref = collection(db, 'users', userId, 'gameHistory') as CollectionReference<DocumentData>;
  await addDoc(ref, {
    ...activity,
    completedAt: activity.completedAt || new Date().toISOString(),
    createdAt: Timestamp.now(),
  });
}

export async function getTodayActivitiesFirestore(userId: string): Promise<GameActivity[]> {
  const today = new Date().toISOString().slice(0, 10);
  const ref = collection(db, 'users', userId, 'gameHistory') as CollectionReference<DocumentData>;
  const q = query(ref, where('completedAt', '>=', today), orderBy('completedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as GameActivity);
}
