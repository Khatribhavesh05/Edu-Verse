'use client';

import { useEffect } from 'react';
import { LeaderboardList } from '@/components/leaderboard/leaderboard-list';
import { playPageTransitionSound } from '@/lib/sound-effects';

export default function LeaderboardPage() {

  useEffect(() => {
    playPageTransitionSound();
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="space-y-4 text-center mb-4">
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight drop-shadow-sm">
          Friendly Leaderboard 🧡
        </h1>
        <div className="inline-block bg-white px-6 py-2 rounded-full shadow-sm border border-slate-100">
          <p className="text-xl md:text-2xl text-slate-600 font-bold">
            Everyone shines in their own way ✨
          </p>
        </div>
      </div>

      {/* Inspirational Message */}
      <div className="relative p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl border-2 border-yellow-300 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/50"></div>
        <p className="text-lg md:text-xl text-amber-900 font-bold relative z-10">
          🌟 This board celebrates everyone&apos;s unique superpowers! <br className="hidden md:block" />
          There&apos;s no competition here — just appreciation and encouragement.
        </p>
      </div>

      {/* The Leaderboard Component */}
      <LeaderboardList />

      {/* Footer Message */}
      <div className="mt-8 p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-3 border-purple-200 text-center space-y-3 shadow-sm">
        <p className="text-2xl font-black text-purple-900">
          🎉 You are amazing too!
        </p>
        <p className="text-lg text-purple-800/80 font-bold">
          Keep exploring, learning, and growing at your own pace. <br />
          Every step forward is worth celebrating! 🌈
        </p>
      </div>
    </div>
  );
}
