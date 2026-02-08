'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface AchievementReplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: {
    name: string;
    emoji: string;
    color: string;
    earnedDate: string;
    achievementReason: string;
  };
}

export function AchievementReplayModal({ isOpen, onClose, badge }: AchievementReplayModalProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after modal appears
      setTimeout(() => setShowAnimation(true), 100);
      
      // Reset animation state when closing
      return () => setShowAnimation(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`rounded-3xl border-3 shadow-2xl p-8 ${badge.color} relative overflow-hidden`}>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md z-10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Badge Icon with Animation */}
                  <motion.div
                    className="relative"
                    animate={showAnimation ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0"
                      animate={showAnimation ? {
                        boxShadow: [
                          '0 0 0 0 rgba(251, 191, 36, 0)',
                          '0 0 30px 15px rgba(251, 191, 36, 0.4)',
                          '0 0 0 0 rgba(251, 191, 36, 0)'
                        ]
                      } : {}}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                    
                    <div className="text-8xl drop-shadow-2xl">
                      {badge.emoji}
                    </div>
                  </motion.div>

                  {/* Badge Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-black text-foreground mb-2">
                      {badge.name}
                    </h2>
                  </motion.div>

                  {/* Unlock Date */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <p className="text-sm font-bold text-foreground/80">
                      Unlocked on: {badge.earnedDate}
                    </p>
                  </motion.div>

                  {/* Achievement Reason */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="px-6 py-4 bg-white/40 rounded-2xl backdrop-blur-sm"
                  >
                    <p className="text-lg font-semibold text-foreground/90">
                      {badge.achievementReason}
                    </p>
                  </motion.div>

                  {/* Confetti Particles */}
                  {showAnimation && (
                    <>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <ConfettiParticle key={i} index={i} />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Confetti particle component
const ConfettiParticle: React.FC<{ index: number }> = ({ index }) => {
  const randomX = Math.random() * 400 - 200;
  const randomY = Math.random() * 300 - 150;
  const randomRotate = Math.random() * 360;
  const colors = ['#FFD700', '#FFA500', '#FF6347', '#FFB6C1', '#87CEEB', '#98FB98'];
  const randomColor = colors[index % colors.length];

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        left: '50%',
        top: '30%',
        backgroundColor: randomColor,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: randomX,
        y: randomY,
        opacity: 0,
        scale: 0,
        rotate: randomRotate,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.02,
        ease: 'easeOut',
      }}
    />
  );
};
