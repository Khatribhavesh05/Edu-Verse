'use client';

import { useEffect } from 'react';
import { AchievementBadge } from '@/components/achievement-badge';
import { playPageTransitionSound } from '@/lib/sound-effects';

export default function AchievementsPage() {
  useEffect(() => {
    playPageTransitionSound();
  }, []);

  const achievements = [
    {
      name: 'Fast Thinker',
      emoji: '⚡',
      color: 'bg-gradient-to-br from-yellow-200 to-yellow-300',
      earned: true,
      earnedDate: 'Feb 5, 2026',
      howEarned: 'Completed 10 quick math problems correctly without hints!',
      nextSteps: 'Solve even faster — try the Math Runner mini-game!',
    },
    {
      name: 'Math Hero',
      emoji: '🧮',
      color: 'bg-gradient-to-br from-blue-200 to-blue-300',
      earned: true,
      earnedDate: 'Feb 3, 2026',
      howEarned: 'Mastered all basic arithmetic operations with 90%+ accuracy.',
      nextSteps: 'Challenge yourself with geometry or algebra topics!',
    },
    {
      name: 'Grammar Guru',
      emoji: '📚',
      color: 'bg-gradient-to-br from-purple-200 to-purple-300',
      earned: true,
      earnedDate: 'Feb 1, 2026',
      howEarned: 'Corrected 15 grammar exercises in a row without mistakes!',
      nextSteps: 'Try advanced writing challenges or explore punctuation!',
    },
    {
      name: 'Science Explorer',
      emoji: '🔬',
      color: 'bg-gradient-to-br from-green-200 to-green-300',
      earned: false,
      howEarned: 'Complete 5 science topics with 85%+ accuracy.',
      nextSteps: 'Keep exploring science topics! You\'re almost there — 3 more to go!',
    },
    {
      name: 'Quiz Master',
      emoji: '🎯',
      color: 'bg-gradient-to-br from-orange-200 to-orange-300',
      earned: false,
      howEarned: 'Pass 20 quizzes across all subjects.',
      nextSteps: 'You\'ve completed 12 quizzes. Keep taking more to earn this badge!',
    },
    {
      name: 'Week Warrior',
      emoji: '🔥',
      color: 'bg-gradient-to-br from-red-200 to-red-300',
      earned: false,
      howEarned: 'Maintain a 7-day learning streak without missing a day.',
      nextSteps: 'Your current streak is 4 days. Keep it up for 3 more days!',
    },
  ];

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalCount = achievements.length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="space-y-3">
        <h1 className="text-5xl font-black text-foreground tracking-tight">
          My Achievements Wall 🏆
        </h1>
        <p className="text-xl text-foreground/70 font-semibold">
          Celebrate your accomplishments and unlock new badges!
        </p>
      </div>

      {/* Progress Summary */}
      <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl border-3 border-blue-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">🎉 Badges Earned</p>
            <p className="text-3xl font-black text-blue-600">
              {earnedCount} / {totalCount}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">Progress</p>
            <p className="text-sm text-foreground/70">
              {Math.round((earnedCount / totalCount) * 100)}% Complete
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-white rounded-full h-4 border-2 border-blue-300 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(earnedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Earned Badges Section */}
      {earnedCount > 0 ? (
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-foreground">✨ Unlocked Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements
              .filter(a => a.earned)
              .map((achievement, index) => (
                <AchievementBadge key={index} {...achievement} />
              ))}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 p-10 text-center space-y-4">
          <div className="text-7xl">⭐</div>
          <h3 className="text-2xl font-bold text-foreground">Keep learning — your next badge is almost here!</h3>
          <p className="text-lg text-foreground/70 max-w-xl mx-auto">
            Complete quizzes, explore topics, and try mini-games to unlock your first achievement.
          </p>
        </div>
      )}

      {/* Locked Badges Section */}
      {achievements.some(a => !a.earned) && (
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-foreground">🔒 Locked Badges</h2>
          <p className="text-lg text-foreground/70 font-semibold">
            Keep learning to unlock these amazing badges!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements
              .filter(a => !a.earned)
              .map((achievement, index) => (
                <AchievementBadge key={index} {...achievement} />
              ))}
          </div>
        </div>
      )}

      {/* Inspiration Message */}
      <div className="mt-8 p-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl border-3 border-yellow-400 text-center space-y-3">
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
