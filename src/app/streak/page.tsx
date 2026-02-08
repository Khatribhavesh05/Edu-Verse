'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { StreakSystem } from '@/components/streak-system';
import { playStreakSound } from '@/lib/sound-effects';

export default function StreakPage() {
  // In a real app, this would come from user data/state
  const currentStreak = 7;

  // Play streak sound when page loads
  useEffect(() => {
    playStreakSound();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3"
      >
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500">
          🔥 Your Learning Streak!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
          Keep your fire burning by learning every day and unlock amazing badges!
        </p>
      </motion.div>

      {/* Streak System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <StreakSystem streakDays={currentStreak} showRewards={true} />
      </motion.div>

      {/* Motivational Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Why Streaks Matter 💪
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">🧠</div>
            <h3 className="font-bold text-lg text-gray-800">Build Habits</h3>
            <p className="text-sm text-gray-600">
              Daily learning becomes automatic when you maintain your streak!
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl">🏆</div>
            <h3 className="font-bold text-lg text-gray-800">Earn Rewards</h3>
            <p className="text-sm text-gray-600">
              Unlock exclusive badges as you reach new milestone days!
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl">📈</div>
            <h3 className="font-bold text-lg text-gray-800">Track Progress</h3>
            <p className="text-sm text-gray-600">
              Watch your fire grow stronger with every consecutive day!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 border-2 border-orange-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🌟 Tips to Keep Your Streak Going!
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-xl">✅</span>
            <p className="text-gray-700">
              <strong>Set a daily reminder</strong> - Pick the same time each day to learn
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">✅</span>
            <p className="text-gray-700">
              <strong>Start small</strong> - Even 5 minutes counts toward your streak!
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">✅</span>
            <p className="text-gray-700">
              <strong>Play games</strong> - Complete any subject game to keep your streak alive
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">✅</span>
            <p className="text-gray-700">
              <strong>Challenge yourself</strong> - Try to beat your longest streak record!
            </p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
