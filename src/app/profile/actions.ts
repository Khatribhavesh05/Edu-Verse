
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserProfileData {
    uid: string;
    username: string;
    displayName: string;
    email: string | null;
}

export async function createUserProfile(profileData: UserProfileData) {
    const userDocRef = doc(db, 'users', profileData.uid);
    
    // Check if username is already taken
    // Note: In a real app, this would require a more robust check,
    // possibly using a separate collection of usernames for querying.
    // For this example, we'll keep it simple.

    await setDoc(userDocRef, {
        uid: profileData.uid,
        username: profileData.username.toLowerCase(),
        displayName: profileData.displayName,
        email: profileData.email,
        createdAt: new Date().toISOString(),
    });
}

export async function checkUserProfile(uid: string): Promise<boolean> {
    const userDocRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userDocRef);
    return docSnap.exists();
}

    