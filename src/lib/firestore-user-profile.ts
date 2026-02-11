import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type UserProfile = {
  grade?: number;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return (snap.data() as UserProfile) ?? null;
}

export async function setUserGrade(uid: string, grade: number): Promise<void> {
  const ref = doc(db, 'users', uid);
  await setDoc(
    ref,
    {
      grade,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

