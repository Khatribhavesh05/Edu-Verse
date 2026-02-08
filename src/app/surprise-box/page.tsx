'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Gift, Lock, Sparkles } from 'lucide-react';
import { playPageTransitionSound } from '@/lib/sound-effects';
import { ScratchCardModal } from '@/components/scratch-card-modal';

type Reward = {
  title: string;
  description: string;
  icon: string;
  accent: string;
};

const rewards: Reward[] = [
  {
    title: 'Sticker Pack',
    description: 'You earned a rainbow sticker pack for your notebook!',
    icon: '🌈',
    accent: 'from-pink-400 to-pink-500',
  },
  {
    title: 'Pet Accessory',
    description: 'A cozy scarf for your learning pet is now unlocked!',
    icon: '🧣',
    accent: 'from-purple-400 to-purple-500',
  },
  {
    title: 'Fun Fact',
    description: 'Did you know? Octopuses have three hearts!',
    icon: '🐙',
    accent: 'from-blue-400 to-blue-500',
  },
  {
    title: 'Bonus XP',
    description: 'You gained +50 XP to boost your learning streak!',
    icon: '⚡',
    accent: 'from-yellow-400 to-yellow-500',
  },
];

const confettiPieces = Array.from({ length: 16 });

export default function SurpriseBoxPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);

  useEffect(() => {
    playPageTransitionSound();
    try {
      const completed = localStorage.getItem('eduverse_task_completed') === 'true';
      setIsUnlocked(completed);
    } catch {
      setIsUnlocked(false);
    }
  }, []);

  const handleOpen = () => {
    if (!isUnlocked) {
      return;
    }

    const selectedReward = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(selectedReward);
    setIsOpened(true);
    setShowConfetti(true);

    window.setTimeout(() => {
      setShowConfetti(false);
      // Show scratch card after confetti
      setShowScratchCard(true);
    }, 1600);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-2">
        <h1 className="text-5xl font-black tracking-tight text-foreground">Surprise Box 🎁</h1>
        <p className="text-xl text-foreground/70">
          Complete a learning task to unlock a fun surprise!
        </p>
      </section>

      <Card className="relative overflow-hidden rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 p-10">
        <div className="flex flex-col items-center gap-6 text-center">
          {!isUnlocked && (
            <div className="w-full max-w-xl space-y-4">
              <div className="flex items-center justify-center gap-3 text-2xl font-bold text-foreground/80">
                <Lock className="h-6 w-6" />
                Surprise Box Locked
              </div>
              <div className="rounded-3xl border-2 border-dashed border-pink-400 bg-gradient-to-br from-pink-100 to-yellow-100 p-8 space-y-3">
                <div className="text-5xl">🎁</div>
                <h3 className="text-xl font-bold text-foreground">You're 1 step away from a surprise!</h3>
                <p className="text-base text-foreground/70">
                  Complete a Daily Quest or try a Mini-Game to unlock your reward.
                </p>
              </div>
            </div>
          )}

          {isUnlocked && !isOpened && (
            <div className="space-y-6">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-8xl"
              >
                🎁
              </motion.div>
              <p className="text-lg text-foreground/70 font-semibold">
                Tap the gift box to reveal your surprise!
              </p>
              <Button
                onClick={handleOpen}
                className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-10 py-6 text-lg font-bold text-white shadow-lg hover:shadow-xl"
              >
                Open Surprise Box
              </Button>
            </div>
          )}

          {isUnlocked && isOpened && reward && (
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 150 }}
                className="text-7xl"
              >
                {reward.icon}
              </motion.div>
              <h2 className="text-3xl font-black text-foreground">{reward.title}!</h2>
              <p className="text-lg text-foreground/70 max-w-xl">{reward.description}</p>

              <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${reward.accent} px-6 py-3 text-white font-bold shadow-md`}>
                <Sparkles className="h-5 w-5" />
                Reward Earned
              </div>

              <Button
                onClick={() => {
                  setIsOpened(false);
                  setReward(null);
                }}
                variant="outline"
                className="rounded-full border-2 border-pink-200 px-8 py-5 text-base font-bold"
              >
                Open Another Surprise
              </Button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showConfetti && (
            <div className="pointer-events-none absolute inset-0">
              {confettiPieces.map((_, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -20, x: 0 }}
                  animate={{ opacity: 1, y: 120, x: (index % 2 === 0 ? 1 : -1) * (20 + index * 3) }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, delay: index * 0.03 }}
                  className="absolute left-1/2 top-10 h-3 w-3 rounded-full bg-pink-400"
                  style={{ transform: `translateX(${(index - 8) * 14}px)` }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-3xl border-2 border-blue-200 bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-blue-100 p-3 text-3xl">✅</div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-foreground">Complete a Task</h3>
              <p className="text-sm text-foreground/70">
                Finish a Daily Quest, try a Mini-Game, or complete a quiz to unlock surprises.
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border-2 border-yellow-200 bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-yellow-100 p-3 text-3xl">🌟</div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-foreground">Celebrate Progress</h3>
              <p className="text-sm text-foreground/70">
                Rewards are fun, optional, and designed to encourage curiosity and effort.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Scratch Card Reward Modal */}
      <ScratchCardModal
        isOpen={showScratchCard}
        onClose={() => setShowScratchCard(false)}
        title="🎉 You unlocked a bonus reward!"
        subtitle="Scratch to see what you won"
      />
    </div>
  );
}
