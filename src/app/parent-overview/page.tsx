'use client';

import { useEffect } from 'react';
import { ParentProgressSnapshot } from '@/components/parent-progress-snapshot';
import { playPageTransitionSound } from '@/lib/sound-effects';

export default function ParentOverviewPage() {
  useEffect(() => {
    playPageTransitionSound();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-5xl font-black tracking-tight text-foreground">Parent Overview 👨‍👩‍👧</h1>
        <p className="text-xl text-foreground/70 mt-2">A calm, parent-friendly summary of today's learning.</p>
      </section>

      <section>
        <ParentProgressSnapshot />
      </section>
    </div>
  );
}
