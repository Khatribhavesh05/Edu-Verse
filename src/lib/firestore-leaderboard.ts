import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  score: number;
  date: string;
  gameId: string;
}

export async function addLeaderboardEntry(gameId: string, entry: LeaderboardEntry) {
  const ref = collection(db, 'leaderboards', gameId, 'entries') as CollectionReference<DocumentData>;
  await addDoc(ref, entry);
}

export async function getTopLeaderboard(gameId: string, topN = 10): Promise<LeaderboardEntry[]> {
  const ref = collection(db, 'leaderboards', gameId, 'entries') as CollectionReference<DocumentData>;
  const q = query(ref, orderBy('score', 'desc'), limit(topN));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as LeaderboardEntry);
}
