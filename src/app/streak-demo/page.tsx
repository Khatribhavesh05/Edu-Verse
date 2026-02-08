'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StreakSystem } from '@/components/streak-system';

/**
 * Streak System Demo Page
 * 
 * This page demonstrates the Streak & Motivation System component
 * with different streak values to show all features:
 * - Streak count display
 * - Fire intensity levels (1-5)
 * - Badge unlock milestones (3, 7, 15 days)
 * - Motivational messages
 * - Progress to next badge
 */
export default function StreakSystemDemoPage() {
  const [selectedStreak, setSelectedStreak] = useState(7);

  const streakExamples = [
    { days: 0, label: 'No Streak', description: 'Starting fresh' },
    { days: 1, label: '1 Day', description: 'First steps' },
    { days: 3, label: '3 Days 🥉', description: 'Bronze Badge earned!' },
    { days: 5, label: '5 Days', description: 'Building momentum' },
    { days: 7, label: '7 Days 🥈', description: 'Silver Badge earned!' },
    { days: 10, label: '10 Days ⭐', description: 'Halfway to Gold' },
    { days: 15, label: '15 Days 👑', description: 'Golden Crown earned!' },
    { days: 21, label: '21 Days 🔥', description: 'Extreme streak!' },
    { days: 30, label: '30 Days 🌟', description: 'Legend mode unlocked!' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black">Streak System Demo</h1>
          <p className="text-lg text-gray-600">
            Explore the Learning Streak feature with different streak values. Select a streak count to see how the system responds.
          </p>
        </div>

        {/* Controls */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Select a Streak Value</CardTitle>
            <CardDescription>Click any button to see the corresponding streak visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
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
                  <div className="text-sm">{example.label}</div>
                  <div className="text-xs opacity-75">{example.description}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Demo */}
        <div>
          <div className="mb-4 text-sm font-semibold text-gray-700">
            Current Demo: <span className="text-orange-600">{selectedStreak} days</span>
          </div>
          <StreakSystem streakDays={selectedStreak} showRewards={true} />
        </div>

        {/* Feature Documentation */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Feature Overview</CardTitle>
            <CardDescription>How the Streak System works</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Fire Intensity */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">🔥 Fire Intensity Levels</h3>
              <div className="grid gap-3">
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="font-semibold text-yellow-900">Level 1: Minimal (0-3 days)</div>
                  <p className="text-sm text-yellow-800">Small flame, light yellow color</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100 border border-yellow-300">
                  <div className="font-semibold text-yellow-900">Level 2: Low (3-7 days)</div>
                  <p className="text-sm text-yellow-800">Medium flame, golden color</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-100 border border-orange-300">
                  <div className="font-semibold text-orange-900">Level 3: Medium (7-15 days)</div>
                  <p className="text-sm text-orange-800">Strong flame, orange color</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-200 border border-orange-400">
                  <div className="font-semibold text-orange-900">Level 4: High (15-30 days)</div>
                  <p className="text-sm text-orange-800">Intense flame, dark orange color</p>
                </div>
                <div className="p-3 rounded-lg bg-red-200 border border-red-400">
                  <div className="font-semibold text-red-900">Level 5: Maximum (30+ days)</div>
                  <p className="text-sm text-red-800">Maximum flame, red color with fastest animation</p>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">🏆 Reward Badges</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-amber-50 border-2 border-amber-200 text-center">
                  <div className="text-4xl mb-2">🥉</div>
                  <div className="font-bold text-amber-900">Bronze Badge</div>
                  <div className="text-sm text-amber-700">3 consecutive days</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border-2 border-slate-300 text-center">
                  <div className="text-4xl mb-2">🥈</div>
                  <div className="font-bold text-slate-900">Silver Badge</div>
                  <div className="text-sm text-slate-700">7 consecutive days</div>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border-2 border-yellow-400 text-center">
                  <div className="text-4xl mb-2">👑</div>
                  <div className="font-bold text-yellow-900">Golden Crown</div>
                  <div className="text-sm text-yellow-700">15 consecutive days</div>
                </div>
              </div>
            </div>

            {/* Motivational Messages */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">💪 Motivational Messages</h3>
              <p className="text-gray-700">
                The system displays contextual motivational messages based on the current streak:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>0 days:</strong> Encourages starting the first streak</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>1-3 days:</strong> Shows progress to first badge</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>3-7 days:</strong> Celebrates first badge, encourages toward silver</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>7-15 days:</strong> Highlights achievement, pushes toward golden crown</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>15+ days:</strong> Celebrates legend status</span>
                </li>
              </ul>
            </div>

            {/* Code Usage */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">🔧 How to Use</h3>
              <div className="p-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-sm overflow-x-auto">
                <pre>{`import { StreakSystem } from '@/components/streak-system';

// Basic usage with prop
<StreakSystem streakDays={7} showRewards={true} />

// Without rewards display
<StreakSystem streakDays={15} showRewards={false} />

// In state management
const [streak, setStreak] = useState(0);
<StreakSystem streakDays={streak} />`}</pre>
              </div>
            </div>

            {/* Props */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">⚙️ Component Props</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="font-mono text-sm font-bold text-blue-900">streakDays?: number</div>
                  <p className="text-sm text-blue-800">Current streak count. Default: 0</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="font-mono text-sm font-bold text-blue-900">showRewards?: boolean</div>
                  <p className="text-sm text-blue-800">Display the rewards/badges section. Default: true</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Notes */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">✨ Implementation Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-green-900">
            <p>✅ <strong>Client-side only:</strong> No backend or database required</p>
            <p>✅ <strong>Animated:</strong> Smooth transitions and flame animations</p>
            <p>✅ <strong>Responsive:</strong> Works beautifully on mobile and desktop</p>
            <p>✅ <strong>Accessible:</strong> Uses semantic HTML and color-blind friendly colors</p>
            <p>✅ <strong>Customizable:</strong> Easy to adjust props and styling</p>
            <p>✅ <strong>Gamified:</strong> Progressive rewards keep users motivated</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
