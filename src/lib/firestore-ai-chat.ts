import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export async function saveAIChatMessage(userId: string, chatId: string, message: AIChatMessage) {
  const ref = collection(db, 'users', userId, 'aiChats', chatId, 'messages') as CollectionReference<DocumentData>;
  await addDoc(ref, {
    ...message,
    timestamp: message.timestamp || new Date().toISOString(),
    createdAt: Timestamp.now(),
  });
}

export async function getAIChatMessages(userId: string, chatId: string): Promise<AIChatMessage[]> {
  const ref = collection(db, 'users', userId, 'aiChats', chatId, 'messages') as CollectionReference<DocumentData>;
  const q = query(ref, orderBy('timestamp', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as AIChatMessage);
}
