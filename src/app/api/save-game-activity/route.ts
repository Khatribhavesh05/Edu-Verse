import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (only once)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export async function POST(req: NextRequest) {
  const { userId, activity } = await req.json();
  if (!userId || !activity) {
    return NextResponse.json({ error: 'Missing userId or activity' }, { status: 400 });
  }
  // Save activity to Firestore
  await db.collection('users').doc(userId).collection('gameHistory').add({
    ...activity,
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ success: true });
}
