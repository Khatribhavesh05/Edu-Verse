'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginDemo: (email: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginDemo: () => { },
});

// Mock user for demo mode
const createDemoUser = (email: string): User => ({
  uid: 'demo-user-123',
  email: email,
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString(),
  },
  providerData: [],
  refreshToken: 'demo-token',
  tenantId: null,
  delete: async () => { },
  getIdToken: async () => 'demo-token',
  getIdTokenResult: async () => ({
    token: 'demo-token',
    signInProvider: 'password',
    claims: {},
    authTime: new Date().toISOString(),
    issuedAtTime: new Date().toISOString(),
    expirationTime: new Date(Date.now() + 3600 * 1000).toISOString(),
  }),
  reload: async () => { },
  toJSON: () => ({}),
  displayName: 'Demo User',
  phoneNumber: null,
  photoURL: null,
  providerId: 'firebase',
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [demoUser, setDemoUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If user explicitly navigates to /login, clear demo session
    if (pathname === '/login') {
      localStorage.removeItem('eduverse_demo_user');
      setDemoUser(null);
    } else {
      // Check for existing demo session
      const storedDemoUser = localStorage.getItem('eduverse_demo_user');
      if (storedDemoUser) {
        setDemoUser(JSON.parse(storedDemoUser));
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('🔐 Auth state changed:', firebaseUser ? `User: ${firebaseUser.email}` : 'No user');
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname]);

  useEffect(() => {
    if (loading) return;

    const currentUser = user || demoUser;

    // Redirect to login if not authenticated and not already on login page
    if (!currentUser && pathname !== '/login') {
      console.log('⚠️ No user authenticated, redirecting to login');
      router.push('/login');
    }
    // Redirect to dashboard if authenticated and on login page
    else if (currentUser && pathname === '/login') {
      console.log('✅ User authenticated, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [user, demoUser, loading, pathname, router]);

  const loginDemo = (email: string) => {
    const newUser = createDemoUser(email);
    setDemoUser(newUser);
    localStorage.setItem('eduverse_demo_user', JSON.stringify(newUser));
    router.push('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ user: user || demoUser, loading, loginDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
