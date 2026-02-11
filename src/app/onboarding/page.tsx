'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { setUserGrade } from '@/lib/firestore-user-profile';
import { useToast } from '@/hooks/use-toast';

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [uid, setUid] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) {
        router.push('/login');
        return;
      }
      setUid(u.uid);
    });
    return () => unsubscribe();
  }, [router]);

  const handlePickGrade = async (grade: number) => {
    if (!uid || saving) return;
    setSaving(true);
    try {
      await setUserGrade(uid, grade);
      toast({
        title: 'All set!',
        description: `Grade ${grade} selected. Let’s start learning.`,
      });
      router.push('/');
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Could not save grade',
        description: e?.message ?? 'Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 p-8">
        <div className="text-center space-y-2">
          <div className="text-5xl">🪐</div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800">Welcome to EduVerse</h1>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            First, choose your grade.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {[1, 2, 3, 4].map((g) => (
            <Button
              key={g}
              onClick={() => handlePickGrade(g)}
              disabled={saving}
              className="w-full h-16 text-xl font-black rounded-2xl bg-white text-slate-800 border-2 border-slate-200 hover:bg-slate-50 hover:border-blue-300"
              variant="outline"
            >
              Grade {g}
            </Button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          You can change this later in your Profile.
        </p>
      </div>
    </main>
  );
}

