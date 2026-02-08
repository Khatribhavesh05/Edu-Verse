'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StreakSystem } from '@/components/streak-system';

/**
 * Badge Unlock Animation Demo Page
 * 
 * Demonstrates:
 * - Badge pop + glow animations
 * - Celebration modals
 * - Confetti effects for 7+ days
 * - One-time highlight effects
 * - Celebration sound effects for each milestone
 */
export default function BadgeUnlockDemoPage() {
  const [selectedStreak, setSelectedStreak] = useState(0);

  const streakExamples = [
    { days: 0, label: 'No Streak', description: 'Starting fresh' },
    { days: 1, label: '1 Day', description: 'First steps' },
    { days: 3, label: '3 Days 🥉', description: 'Bronze + Sparkle' },
    { days: 5, label: '5 Days', description: 'Building momentum' },
    { days: 7, label: '7 Days 🥈', description: 'Silver + Chime!' },
    { days: 10, label: '10 Days', description: 'Halfway to Gold' },
    { days: 15, label: '15 Days 👑', description: 'Crown + Fanfare!' },
    { days: 21, label: '21 Days', description: 'Extended streak' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 py-8">
      <div className="container mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-black tracking-tight">🎉 Badge Unlock Celebrations</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch badges celebrate with animations AND sounds when you reach milestones! Try different streak values to see and <strong>hear</strong> the unlock celebrations.
          </p>
          <p className="text-sm text-orange-600 font-semibold">
            🔊 Enable browser audio to hear celebration sounds!
          </p>
        </div>

        {/* Streak Selector */}
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle>Select Streak to Test</CardTitle>
            <CardDescription>Click any streak value to trigger badge unlock animations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {streakExamples.map((example) => (
                <button
                  key={example.days}
                  onClick={() => setSelectedStreak(example.days)}
                  className={`px-3 py-3 rounded-lg font-semibold transition-all ${
                    selectedStreak === example.days
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                      : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  <div>{example.label}</div>
                  <div className="text-xs opacity-75">{example.description}</div>
                </button>
              ))}
            </div>
            
            {/* Increment Button for Testing Streak Feedback */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Current Streak:</p>
                  <p className="text-3xl font-black text-orange-600">{selectedStreak} days</p>
                </div>
                <Button
                  onClick={() => setSelectedStreak(prev => prev + 1)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg px-6 py-3 h-auto"
                >
                  +1 Day 🎯
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">
                ✨ Click "+1 Day" to hear motivational message & chime sound
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Streak System Widget */}
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle>🔥 Live Reward System Preview</CardTitle>
            <CardDescription>All sounds and animations active below</CardDescription>
          </CardHeader>
          <CardContent>
            <StreakSystem streakDays={selectedStreak} showRewards={true} />
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature Card 1 */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl">🎵 Sound Effects</CardTitle>
              <CardDescription>Audio Celebration Timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-orange-600">🥉</span>
                  <div>
                    <strong>Bronze (3 days):</strong> Soft ascending sparkle - 0.2s
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-500">🥈</span>
                  <div>
                    <strong>Silver (7 days):</strong> Bright chime + sparkle - 0.7s
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-yellow-600">👑</span>
                  <div>
                    <strong>Golden (15 days):</strong> Fanfare + double sparkle - 1.1s
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-green-600">✨</span>
                  <div>
                    <strong>Streak +1:</strong> Two-tone chime (15% volume) - 0.4s
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Card 2 */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-xl">✨ Animation Effects</CardTitle>
              <CardDescription>Visual Celebration Timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-bold">🔥</span>
                  <div>
                    <strong>Fire Mode:</strong> Intensity increases with streak, whoosh sound on first interaction
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">📈</span>
                  <div>
                    <strong>Unlocking:</strong> Pop animation (0.5→1.3→1.15→1 scale)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">✨</span>
                  <div>
                    <strong>Glow Effect:</strong> Golden glow pulse on unlock
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">🎊</span>
                  <div>
                    <strong>Confetti:</strong> 12 particles for 7+day badges
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Card 3 */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">🎮 How to Test</CardTitle>
              <CardDescription>Interactive Features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <strong>1. Select a Streak Value:</strong> Click any button above to jump to that day count
              </div>
              <div>
                <strong>2. Use +1 Day Button:</strong> Click repeatedly to hear the streak feedback chime and see progress messages
              </div>
              <div>
                <strong>3. Watch Badge Animations:</strong> When reaching 3, 7, or 15 days, watch the badges unlock with pop + glow animations
              </div>
              <div>
                <strong>4. Listen for Milestone Sounds:</strong> Each badge plays a unique celebration sound when unlocked
              </div>
              <div>
                <strong>5. Hover Fire Icon:</strong> Tap/hover the fire to hear the flame whoosh sound and see glow effect
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status Card */}
        <div className="text-center p-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl border-2 border-orange-300">
          <h3 className="text-2xl font-bold text-orange-900 mb-2">✨ Complete Motivation System!</h3>
          <p className="text-orange-800 space-y-2">
            <span className="block">🔥 Interactive fire with flame whoosh sound on first tap/hover</span>
            <span className="block">🔊 Streak feedback with motivational messages & sound effects on every +1 day</span>
            <span className="block">🏅 Badge unlock animations with pop + glow effects at milestones</span>
            <span className="block">🎊 Confetti celebrations for special achievements (7+ days)</span>
            <span className="block font-semibold mt-2">Every interaction feels alive and rewarding!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
