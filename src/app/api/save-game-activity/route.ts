import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let isInitialized = false;

// Initialize Firebase Admin SDK (only once)
if (!getApps().length) {
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    console.warn('⚠️ Firebase Admin SDK credentials not set - server features disabled');
  } else {
    try {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Firebase Admin SDK:', error);
    }
  }
} else {
  isInitialized = true;
}

export async function POST(req: NextRequest) {
  try {
    if (!isInitialized) {
      console.warn('Firebase Admin not initialized - game activity not saved to cloud');
      return NextResponse.json({ success: false, message: 'Firebase not available' }, { status: 503 });
    }
    
    const body = await req.json();
    const userId = body?.userId;
    const activity = body?.activity;
    
    if (!userId || !activity) {
      return NextResponse.json({ error: 'Missing userId or activity' }, { status: 400 });
    }
    
    // Save activity to Firestore
    try {
      const db = getFirestore();
      await db.collection('users').doc(userId).collection('gameHistory').add({
        ...activity,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to save to Firestore:', error);
      return NextResponse.json({ success: false, message: 'Database unavailable' }, { status: 503 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save game activity:', error);
    return NextResponse.json({ error: 'Failed to save activity' }, { status: 500 });
  }
}
