'use client';

import { useEffect } from 'react';
import { ChatbotForm } from '@/components/chatbot-form';
import { VoiceLearning } from '@/components/voice-learning';
import { playPageTransitionSound, playOrbiHelloSound } from '@/lib/sound-effects';

export default function AITutorPage() {
  useEffect(() => {
    playPageTransitionSound();
  }, []);

  const handleOrbiClick = () => {
    playOrbiHelloSound();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full flex-1">
      <div className="flex flex-col gap-8 w-full max-w-3xl">
        <section className="text-center">
          <div 
            className="inline-block p-5 bg-blue-200 rounded-full mb-4 animate-pulse cursor-pointer hover:scale-110 transition-transform"
            onClick={handleOrbiClick}
            role="button"
            tabIndex={0}
          >
            <span className="text-6xl">🪐</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tighter">Orbi – Your AI Assistant</h1>
          <p className="text-xl text-foreground/80 mt-2">
            Ask me anything! I'm here to help you on your learning journey.
          </p>
        </section>

        <VoiceLearning />
        <ChatbotForm />
      </div>
    </div>
  );
}
