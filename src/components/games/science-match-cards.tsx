'use client';

import { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { playClickSound, playSuccessSound } from '@/lib/sound-effects';
import { endGameTracking } from '@/lib/game-activity-tracker';
import { motion, AnimatePresence } from 'framer-motion';

interface ScienceMatchCardsProps {
  onClose: () => void;
}

interface Card {
  id: string;
  type: 'concept' | 'image';
  content: string;
  pairId: string;
}

const CARD_DATA: Card[] = [
  { id: '1a', type: 'concept', content: 'Photosynthesis', pairId: '1' },
  { id: '1b', type: 'image', content: '☀️🌿', pairId: '1' },
  { id: '2a', type: 'concept', content: 'Magnetism', pairId: '2' },
  { id: '2b', type: 'image', content: '🧲⛓️', pairId: '2' },
  { id: '3a', type: 'concept', content: 'Water Cycle', pairId: '3' },
  { id: '3b', type: 'image', content: '🌊☁️🌧️', pairId: '3' },
];

export function ScienceMatchCards({ onClose }: ScienceMatchCardsProps) {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [firstSelection, setFirstSelection] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime] = useState<number>(Date.now());

  const shuffledCards = useMemo(
    () => [...CARD_DATA].sort(() => Math.random() - 0.5),
    []
  );

  // Log game activity when complete (3 pairs matched = 3 correct answers)
  useEffect(() => {
    if (gameComplete) {
      endGameTracking(
        'science-match',
        'Science Match Cards',
        'science',
        startTime,
        3, // 3 pairs = 3 correct answers
        3  // 3 pairs = 3 total questions
      );
    }
  }, [gameComplete, startTime]);

  const handleCardClick = (cardId: string) => {
    if (matched.has(cardId) || flipped.has(cardId) || isChecking) {
      return;
    }

    playClickSound();

    if (!firstSelection) {
      setFirstSelection(cardId);
      setFlipped(new Set([cardId]));
    } else {
      const newFlipped = new Set([firstSelection, cardId]);
      setFlipped(newFlipped);
      setIsChecking(true);

      const firstCard = shuffledCards.find((c) => c.id === firstSelection);
      const secondCard = shuffledCards.find((c) => c.id === cardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found!
        playSuccessSound();
        setTimeout(() => {
          setMatched(new Set([...matched, firstSelection, cardId]));
          setFlipped(new Set());
          setFirstSelection(null);
          setIsChecking(false);

          if (matched.size + 2 === shuffledCards.length) {
            setTimeout(() => setGameComplete(true), 500);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setFlipped(new Set());
          setFirstSelection(null);
          setIsChecking(false);
        }, 800);
      }
    }
  };

  if (gameComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-3xl p-8 max-w-md w-full border-3 border-green-200 text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-black">Congratulations!</h2>
          <p className="text-2xl font-bold text-green-600">All cards matched!</p>
          <p className="text-lg text-foreground/70">
            🧬 You've mastered the science concepts! Great job!
          </p>
          <Button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg"
          >
            Back to Mini-Games
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-green-100 via-emerald-100 to-green-100 z-50 flex flex-col"
    >
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black">Science Match Cards 🧪</h1>
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-full px-3 py-1 text-lg font-bold h-auto"
          >
            ✕
          </Button>
        </div>
      </div>

      {/* Progress Bar - Fixed */}
      <div className="flex-shrink-0 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white/50 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(matched.size / shuffledCards.length) * 100}%`,
              } as React.CSSProperties}
            />
          </div>
          <span className="text-xs font-bold text-green-700 whitespace-nowrap">
            {matched.size / 2} / {shuffledCards.length / 2}
          </span>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
          {/* Cards Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3">
            <AnimatePresence>
              {shuffledCards.map((card) => {
                const isFlipped = flipped.has(card.id);
                const isMatched = matched.has(card.id);

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="h-28"
                  >
                    <motion.button
                      onClick={() => handleCardClick(card.id)}
                      disabled={isMatched}
                      className={`w-full h-full rounded-2xl font-bold text-xl border-3 transition-all transform ${
                        isMatched
                          ? 'bg-green-300 border-green-500 opacity-50 cursor-default text-green-800'
                          : 'bg-white border-gray-400 hover:scale-105 hover:shadow-lg cursor-pointer text-slate-900'
                      }`}
                    >
                      {isFlipped || isMatched ? (
                        <span className="text-lg md:text-xl">{card.content}</span>
                      ) : (
                        <span className="text-2xl text-slate-900">?</span>
                      )}
                    </motion.button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Instructions */}
          <div className="mt-6 text-center text-xs font-bold text-green-700">
            Click cards to find matching pairs!
          </div>
        </div>
      </div>

      {/* Safe bottom padding */}
      <div className="flex-shrink-0 h-2" />
    </motion.div>
  );
}
