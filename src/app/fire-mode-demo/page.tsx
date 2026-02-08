'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FireModeAnimation, FireModeShowcase } from '@/components/fire-mode-animation';

/**
 * Fire Mode Animation Demo Page
 * 
 * Interactive showcase of the Fire Mode animation with different streak values.
 * Features include:
 * - Size variations (small, medium, large)
 * - All fire levels (0-4)
 * - Animation details and specifications
 * - Copy-paste code examples
 */
export default function FireModeAnimationDemoPage() {
  const [selectedStreak, setSelectedStreak] = useState(7);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');

  const streakExamples = [
    { days: 0, label: 'No Fire', description: 'No streak yet' },
    { days: 1, label: 'Flicker', description: 'Day 1-2' },
    { days: 3, label: 'Medium', description: 'Day 3-6' },
    { days: 7, label: 'Strong', description: 'Day 7-14' },
    { days: 15, label: 'Inferno', description: 'Day 15+' },
    { days: 20, label: 'Legend', description: 'Extended streak' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 py-8">
      <div className="container mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-black tracking-tight">🔥 Fire Mode Animation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A smooth, cartoon-style flame animation that grows stronger with your learning streak. 
            Designed to be friendly and motivating!
          </p>
        </div>

        {/* Interactive Demo */}
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle>Interactive Fire Animation</CardTitle>
            <CardDescription>Select a streak value and size to see the animation in action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Streak Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Select Streak Days</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {streakExamples.map((example) => (
                  <button
                    key={example.days}
                    onClick={() => setSelectedStreak(example.days)}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all text-sm ${
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
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Select Size</label>
              <div className="flex gap-3">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Animation Display */}
            <div className="flex justify-center py-12 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
              <FireModeAnimation streakDays={selectedStreak} size={selectedSize} showLabel={true} />
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Current Config:</strong> {selectedStreak} days streak, {selectedSize} size
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Full Showcase Component */}
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Complete Fire Level Showcase</CardTitle>
            <CardDescription>All fire levels with different sizes and animations</CardDescription>
          </CardHeader>
          <CardContent>
            <FireModeShowcase />
          </CardContent>
        </Card>

        {/* Technical Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Fire Levels */}
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg">🔥 Fire Levels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg border-l-4 border-yellow-300">
                <div className="font-bold text-yellow-900">Level 0: No Fire</div>
                <div className="text-sm text-yellow-800">0 days | Gray, static flame</div>
              </div>
              <div className="p-3 bg-white rounded-lg border-l-4 border-yellow-400">
                <div className="font-bold text-yellow-900">Level 1: Small Flicker</div>
                <div className="text-sm text-yellow-800">1-2 days | Soft yellow-to-yellow gradient</div>
              </div>
              <div className="p-3 bg-white rounded-lg border-l-4 border-orange-400">
                <div className="font-bold text-orange-900">Level 2: Medium Flame</div>
                <div className="text-sm text-orange-800">3-6 days | Yellow-to-orange gradient + glow</div>
              </div>
              <div className="p-3 bg-white rounded-lg border-l-4 border-orange-600">
                <div className="font-bold text-orange-900">Level 3: Strong Flame</div>
                <div className="text-sm text-orange-800">7-14 days | Orange-to-red gradient + intense glow</div>
              </div>
              <div className="p-3 bg-white rounded-lg border-l-4 border-red-600">
                <div className="font-bold text-red-900">Level 4: Inferno + Crown</div>
                <div className="text-sm text-red-800">15+ days | Red gradient + crown sparkle + particles</div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specs */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="text-lg">⚙️ Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong className="block text-blue-900">Animation Type:</strong>
                <span className="text-blue-800">Framer Motion with SVG</span>
              </div>
              <div>
                <strong className="block text-blue-900">Loop Duration:</strong>
                <span className="text-blue-800">1.2 seconds (smooth)</span>
              </div>
              <div>
                <strong className="block text-blue-900">Bounce (Y-axis):</strong>
                <span className="text-blue-800">2-5px based on level</span>
              </div>
              <div>
                <strong className="block text-blue-900">Scale Range:</strong>
                <span className="text-blue-800">0.90x - 1.18x progressive</span>
              </div>
              <div>
                <strong className="block text-blue-900">Glow Effects:</strong>
                <span className="text-blue-800">SVG filters + drop shadows</span>
              </div>
              <div>
                <strong className="block text-blue-900">Extra Effects:</strong>
                <span className="text-blue-800">Particle sparkles (L2+), crown rotation (L4)</span>
              </div>
              <div>
                <strong className="block text-blue-900">Performance:</strong>
                <span className="text-blue-800">GPU-accelerated transforms</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Code Examples */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>💻 Code Examples</CardTitle>
            <CardDescription>How to use the FireModeAnimation component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Basic Usage */}
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">Basic Usage</h4>
              <div className="p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
                <pre>{`import { FireModeAnimation } from '@/components/fire-mode-animation';

<FireModeAnimation 
  streakDays={7} 
  size="medium" 
  showLabel={true} 
/>`}</pre>
              </div>
            </div>

            {/* With State */}
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">With State Management</h4>
              <div className="p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
                <pre>{`const [streakDays, setStreakDays] = useState(0);

const handleActivityComplete = () => {
  setStreakDays(prev => prev + 1);
};

return (
  <>
    <FireModeAnimation 
      streakDays={streakDays} 
      size="medium" 
    />
    <button onClick={handleActivityComplete}>
      Complete Activity
    </button>
  </>
);`}</pre>
              </div>
            </div>

            {/* In Streak System */}
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">Used in Streak System</h4>
              <div className="p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
                <pre>{`import { StreakSystem } from '@/components/streak-system';

// The FireModeAnimation is already integrated!
<StreakSystem streakDays={7} showRewards={true} />`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Props Reference */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>📋 Props Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <div className="font-mono text-sm font-bold text-purple-900">streakDays</div>
                <div className="text-xs text-purple-800 mt-1">Type: <code className="font-mono">number</code></div>
                <div className="text-sm text-purple-800">Current streak count (0+). Determines fire level.</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <div className="font-mono text-sm font-bold text-purple-900">size</div>
                <div className="text-xs text-purple-800 mt-1">Type: <code className="font-mono">'small' | 'medium' | 'large'</code></div>
                <div className="text-sm text-purple-800">Default: <code className="font-mono">'medium'</code> | Adjusts flame size</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <div className="font-mono text-sm font-bold text-purple-900">showLabel</div>
                <div className="text-xs text-purple-800 mt-1">Type: <code className="font-mono">boolean</code></div>
                <div className="text-sm text-purple-800">Default: <code className="font-mono">true</code> | Show level name below flame</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features & Benefits */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-300">
          <CardHeader>
            <CardTitle className="text-green-900">✨ Features & Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-bold text-green-900">Animation Features</h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>✓ Soft bounce motion</li>
                  <li>✓ Smooth/ease animations</li>
                  <li>✓ 1.2s loop duration</li>
                  <li>✓ SVG-based rendering</li>
                  <li>✓ Gradient flames</li>
                  <li>✓ Glow effects</li>
                  <li>✓ Particle sparkles</li>
                  <li>✓ Crown rotation</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-green-900">User Experience</h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>✓ Friendly, non-aggressive</li>
                  <li>✓ Visually motivating</li>
                  <li>✓ Cartoon style</li>
                  <li>✓ Progressive intensity</li>
                  <li>✓ Clear level indicators</li>
                  <li>✓ No scary elements</li>
                  <li>✓ Smooth transitions</li>
                  <li>✓ Performance optimized</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Information */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>📁 Files & Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>Component:</strong> <code className="bg-white px-2 py-1 rounded font-mono">src/components/fire-mode-animation.tsx</code>
            </p>
            <p>
              <strong>Used In:</strong> <code className="bg-white px-2 py-1 rounded font-mono">src/components/streak-system.tsx</code>
            </p>
            <p>
              <strong>Demo Page:</strong> <code className="bg-white px-2 py-1 rounded font-mono">/fire-mode-demo</code>
            </p>
            <p>
              <strong>Exports:</strong> <code className="bg-white px-2 py-1 rounded font-mono">FireModeAnimation</code> + <code className="bg-white px-2 py-1 rounded font-mono">FireModeShowcase</code>
            </p>
          </CardContent>
        </Card>

        {/* Final Notes */}
        <div className="text-center p-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl border-2 border-orange-300">
          <h3 className="text-2xl font-bold text-orange-900 mb-2">🎉 Ready to Burn!</h3>
          <p className="text-orange-800">
            The Fire Mode Animation is integrated into the Streak System and ready for production use.
            <br />
            Keep learning and let your flame grow! 🔥
          </p>
        </div>
      </div>
    </div>
  );
}
