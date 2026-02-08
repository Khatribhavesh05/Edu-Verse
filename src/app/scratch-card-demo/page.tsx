'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScratchCardModal } from '@/components/scratch-card-modal';

export default function ScratchCardDemoPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Scratch Card Demo 🎁</h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Try interacting with the scratch card! Drag your mouse or finger across the gray surface to reveal the surprise reward.
        </p>
      </section>

      {/* Demo Button */}
      <section className="flex justify-center">
        <Button
          onClick={() => setShowModal(true)}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-6 text-lg font-bold"
        >
          Open Scratch Card 🎉
        </Button>
      </section>

      {/* Features List */}
      <section className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold">Features:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">🖱️ Desktop: Drag & Scratch</h3>
            <p className="text-sm text-blue-800">
              Click and drag your mouse across the card to scratch away the gray surface.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <h3 className="font-bold text-green-900 mb-2">📱 Mobile: Swipe & Scratch</h3>
            <p className="text-sm text-green-800">
              Use your finger to swipe across the card on mobile devices.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <h3 className="font-bold text-purple-900 mb-2">✨ Automatic Reveal</h3>
            <p className="text-sm text-purple-800">
              Click anywhere on the card to auto-reveal if scratching is too slow.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
            <h3 className="font-bold text-orange-900 mb-2">🎁 Random Rewards</h3>
            <p className="text-sm text-orange-800">
              Each scratch card reveals a different surprise from our reward pool.
            </p>
          </div>
        </div>
      </section>

      {/* Reward Pool */}
      <section className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold">Possible Rewards:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            '⭐ Bonus Star!',
            '🔥 Streak Booster',
            '🎮 Free Mini-Game Try',
            '🎁 Surprise Badge',
            '👏 Orbi says: Great job!',
            '✨ Magic Moment!'
          ].map((reward, i) => (
            <div key={i} className="p-3 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg border-2 border-amber-300 text-center font-semibold">
              {reward}
            </div>
          ))}
        </div>
      </section>

      {/* How It Integrates */}
      <section className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold">Integration Points:</h2>
        <div className="space-y-3">
          <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
            <h3 className="font-bold text-indigo-900 mb-1">🔥 Streak Milestones</h3>
            <p className="text-sm text-indigo-800">
              Appears when user reaches 3, 7, or 15 day streaks
            </p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
            <h3 className="font-bold text-indigo-900 mb-1">🎁 Surprise Box</h3>
            <p className="text-sm text-indigo-800">
              Shows after opening a surprise box reward
            </p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
            <h3 className="font-bold text-indigo-900 mb-1">🏆 Special Achievements</h3>
            <p className="text-sm text-indigo-800">
              Can trigger on other major accomplishments
            </p>
          </div>
        </div>
      </section>

      {/* Scratch Card Modal */}
      <ScratchCardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="🎉 You unlocked a bonus reward!"
        subtitle="Scratch the card to reveal your surprise"
      />
    </div>
  );
}
