'use client';

import { StreakSystem } from '@/components/streak-system';

export default function TestBadgesPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-4xl font-bold text-center">Badge Test Page</h1>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Streak = 7 days (Bronze + Silver unlocked, Golden LOCKED)</h2>
        <StreakSystem streakDays={7} showRewards={true} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Streak = 0 days (All LOCKED)</h2>
        <StreakSystem streakDays={0} showRewards={true} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Streak = 15 days (All UNLOCKED)</h2>
        <StreakSystem streakDays={15} showRewards={true} />
      </div>
    </div>
  );
}
