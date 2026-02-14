'use client';

import { useEffect } from 'react';
import { TopicDescriptionForm } from '@/components/topic-description-form';
import { BrainCircuit } from 'lucide-react';
import { playPageTransitionSound } from '@/lib/sound-effects';

import { AntigravityBackground } from '@/components/ui/antigravity-background';

export default function TopicDescriptionPage() {
  useEffect(() => {
    playPageTransitionSound();
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <AntigravityBackground />

      <div className="flex flex-col gap-8 max-w-2xl mx-auto pt-8 relative z-10">
        <section className="text-center">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4 backdrop-blur-sm border border-white/10">
            <BrainCircuit className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-[#1e1b4b] drop-shadow-md pb-1" style={{ textShadow: '0 4px 12px rgba(30, 27, 75, 0.15)' }}>Topic Description Generator</h1>
          <p className="text-[#172554] mt-2 font-extrabold text-lg">
            Enter a subject and let our AI generate a concise and informative description for you.
          </p>
        </section>

        <TopicDescriptionForm />
      </div>
    </div>
  );
}
