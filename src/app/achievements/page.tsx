'use client';

import { AchievementSection } from '@/components/achievements/achievement-section';

export default function AchievementsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-8">
      {/* Header Section */}
      <div className="space-y-3 px-4">
        <h1 className="text-5xl font-black text-foreground tracking-tight">
          My Achievements Wall 🏆
        </h1>
        <p className="text-xl text-foreground/70 font-semibold">
          Celebrate your accomplishments and unlock new badges!
        </p>
      </div>

      <div className="px-4">
        <AchievementSection />
      </div>

      {/* Inspiration Message */}
      <div className="mx-4 mt-8 p-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl border-3 border-yellow-400 text-center space-y-3">
        <p className="text-2xl font-black text-foreground">
          🌟 You&apos;re Amazing!
        </p>
        <p className="text-lg text-foreground/70 font-semibold">
          Every badge represents your hard work and dedication. <br />
          Keep learning, keep exploring, and keep achieving! 🚀
        </p>
      </div>
    </div>
  );
}
