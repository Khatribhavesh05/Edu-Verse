'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playBadgeUnlockSound } from '@/lib/badge-sound';

interface BadgeUnlockAnimationProps {
  days: number;
  emoji: string;
  name: string;
  unlocked: boolean;
  dayThreshold: number;
  isNextTarget?: boolean;
  currentStreak?: number;
}

/**
 * Confetti particle component for celebration
 */
const ConfettiParticle: React.FC<{ delay: number; index: number }> = ({ delay, index }) => {
  const randomX = Math.random() * 200 - 100;
  const randomY = Math.random() * 300 - 150;
  const randomRotate = Math.random() * 360;
  const duration = 2 + Math.random() * 0.5;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        backgroundColor: ['#FFD700', '#FFA500', '#FF6347', '#FFB6C1', '#87CEEB'][index % 5],
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
        duration: duration,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
};

/**
 * Badge with unlock animation
 */
export const BadgeUnlockAnimation: React.FC<BadgeUnlockAnimationProps> = ({
  days,
  emoji,
  name,
  unlocked,
  dayThreshold,
  isNextTarget = false,
  currentStreak = 0,
}) => {
  const [wasUnlocked, setWasUnlocked] = useState(unlocked);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Golden badge (15+ days) gets gentle pulse
  const isGoldenBadge = dayThreshold >= 15;

  // Trigger animation when badge unlocks
  useEffect(() => {
    if (unlocked && !wasUnlocked) {
      setWasUnlocked(true);
      // Show confetti for 7+ days badges
      if (dayThreshold >= 7) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    }
  }, [unlocked, wasUnlocked, dayThreshold]);

  // Badge pop animation
  const popVariants = {
    locked: {
      scale: 1,
      opacity: 1,
    },
    unlocking: {
      scale: [1, 1.3, 1.15, 1],
      opacity: [0, 1, 1, 1],
    },
    unlocked: {
      scale: 1,
      opacity: 1,
    },
  };

  // Glow animation
  const glowVariants = {
    locked: { opacity: 0 },
    unlocking: {
      boxShadow: [
        '0 0 0 0px rgba(255, 215, 0, 0)',
        '0 0 20px 10px rgba(255, 215, 0, 0.6)',
        '0 0 10px 5px rgba(255, 215, 0, 0.3)',
        '0 0 0 0px rgba(255, 215, 0, 0)',
      ],
      transition: {
        duration: 0.8,
        times: [0, 0.3, 0.6, 1],
      },
    },
    unlocked: {
      boxShadow: '0 0 0 0px rgba(255, 215, 0, 0)',
    },
  };

  // Rotation celebration
  const celebrationVariants = {
    locked: { rotate: 0 },
    unlocking: {
      rotate: [-10, 10, -8, 8, 0],
    },
    unlocked: { rotate: 0 },
  };

  const state = !unlocked ? 'locked' : wasUnlocked && showConfetti ? 'unlocking' : 'unlocked';
  const daysRemaining = Math.max(0, dayThreshold - currentStreak);

  // Golden badge gentle pulse animation (every 10 seconds, single pulse)
  const goldenPulseAnimation = isGoldenBadge && unlocked && !isHovering ? {
    boxShadow: [
      '0 4px 12px rgba(251, 191, 36, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
      '0 4px 20px rgba(251, 191, 36, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 0 25px rgba(251, 191, 36, 0.4)',
      '0 4px 12px rgba(251, 191, 36, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
    ]
  } : {};

  const goldenPulseTransition = isGoldenBadge && unlocked && !isHovering ? {
    duration: 1.5,
    times: [0, 0.5, 1],
    repeat: Infinity,
    repeatDelay: 8.5, // 1.5s pulse + 8.5s delay = 10s total
    ease: 'easeInOut'
  } : {};

  return (
    <motion.div
      className="h-full relative"
      variants={popVariants}
      initial={!wasUnlocked && unlocked ? 'locked' : 'unlocked'}
      animate={state}
      transition={state === 'unlocking' ? { duration: 0.8, type: 'spring', stiffness: 200 } : {}}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      whileHover={unlocked ? { 
        scale: 1.02,
        y: -2,
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)'
      } : { scale: 1.01 }}
    >
      <motion.div
        className={`p-4 rounded-xl border-3 transition-all duration-300 h-full flex flex-col items-center justify-between relative overflow-hidden ${
          unlocked
            ? 'bg-gradient-to-br from-white to-yellow-50 border-yellow-400 shadow-lg'
            : isNextTarget
            ? 'bg-gradient-to-br from-white to-blue-50 border-blue-400 border-dashed shadow-md'
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 shadow-sm'
        }`}
        animate={goldenPulseAnimation}
        transition={goldenPulseTransition}
        style={{
          boxShadow: unlocked && !isGoldenBadge
            ? '0 4px 12px rgba(251, 191, 36, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
            : !unlocked && isNextTarget
            ? '0 4px 12px rgba(59, 130, 246, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
            : !unlocked
            ? '0 2px 8px rgba(0, 0, 0, 0.06)'
            : undefined
        }}
      >
      {/* Shimmer effect for unlocked badges */}
      {unlocked && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut'
          }}
        />
      )}
      
      {/* Subtle glow for locked next target */}
      {!unlocked && isNextTarget && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: [
              '0 0 10px rgba(59, 130, 246, 0.2)',
              '0 0 20px rgba(59, 130, 246, 0.3)',
              '0 0 10px rgba(59, 130, 246, 0.2)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        variants={glowVariants}
        initial="locked"
        animate={state}
        transition={{ duration: 0.8 }}
      />

      {/* Badge Content */}
      <motion.div
        className="text-center relative z-10 flex flex-col items-center space-y-2 w-full"
        variants={celebrationVariants}
        initial="locked"
        animate={state}
        transition={state === 'unlocking' ? { duration: 0.6, delay: 0.1 } : {}}
      >
        {/* Icon */}
        <motion.div
          className="text-5xl mb-1 inline-block relative"
          animate={unlocked ? { scale: [1, 1.2, 1] } : {}}
          transition={unlocked ? { duration: 0.6, delay: 0.1 } : {}}
        >
          {unlocked ? (
            <motion.span
              animate={{
                filter: [
                  'drop-shadow(0 0 2px rgba(251, 191, 36, 0.3))',
                  'drop-shadow(0 0 5px rgba(251, 191, 36, 0.5))',
                  'drop-shadow(0 0 2px rgba(251, 191, 36, 0.3))'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {emoji}
            </motion.span>
          ) : (
            <div className="relative">
              <motion.span 
                className="opacity-40"
                animate={isNextTarget ? {
                  filter: [
                    'drop-shadow(0 0 1px rgba(59, 130, 246, 0.2))',
                    'drop-shadow(0 0 3px rgba(59, 130, 246, 0.4))',
                    'drop-shadow(0 0 1px rgba(59, 130, 246, 0.2))'
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {emoji}
              </motion.span>
              <span className="absolute inset-0 flex items-center justify-center text-2xl">🔒</span>
            </div>
          )}
        </motion.div>

        {/* Badge Name */}
        <div className={`text-xs font-bold text-center ${
          unlocked ? 'text-gray-800' : 'text-gray-600'
        }`}>
          {name}
        </div>

        {/* Status or Days Remaining */}
        <div className="w-full px-2">
          {unlocked ? (
            <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              ✓ Unlocked
            </div>
          ) : (
            <div className="px-2 py-1 bg-gray-300 text-gray-700 text-xs font-bold rounded-full">
              {daysRemaining} days left
            </div>
          )}
        </div>
      </motion.div>

      {/* Confetti particles */}
      {showConfetti && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <ConfettiParticle key={i} index={i} delay={0} />
          ))}
        </>
      )}
      </motion.div>
    </motion.div>
  );
};

/**
 * Badge unlock celebration modal (appears when milestone reached)
 */
export const BadgeUnlockModal: React.FC<{
  isOpen: boolean;
  emoji: string;
  name: string;
  daysReached: number;
  onClose: () => void;
}> = ({ isOpen, emoji, name, daysReached, onClose }) => {
  const showConfetti = daysReached >= 7;

  useEffect(() => {
    if (isOpen) {
      // Play celebration sound based on milestone
      playBadgeUnlockSound(daysReached);
      
      // Auto close after 3 seconds
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, daysReached]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      {/* Confetti background for 7+ days */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <ConfettiParticle key={i} index={i} delay={i * 0.05} />
          ))}
        </div>
      )}

      {/* Modal */}
      <motion.div
        initial={{ scale: 0, y: -100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm mx-4 relative"
      >
        {/* Top glow ring */}
        <motion.div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-2 border-yellow-400"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Badge emoji */}
        <motion.div
          className="text-7xl text-center mb-4"
          animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1.1, 1.15, 1.1, 1] }}
          transition={{ duration: 1 }}
        >
          {emoji}
        </motion.div>

        {/* Content */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
            Badge Unlocked! 🎉
          </h2>
          <p className="text-2xl font-bold text-gray-900">{name}</p>
          <p className="text-lg text-gray-600">
            You've reached <span className="font-bold text-orange-600">{daysReached} days</span> of learning!
          </p>
        </div>

        {/* Celebration message */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-semibold text-green-600">
            {daysReached < 7 && "🔥 Keep your streak alive!"}
            {daysReached >= 7 && daysReached < 15 && "⭐ Keep going for the Golden Crown!"}
            {daysReached >= 15 && "👑 You're a learning legend!"}
          </p>
        </motion.div>

        {/* Decorative stars */}
        {showConfetti && (
          <>
            <motion.div
              className="absolute top-4 right-4 text-2xl"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4 text-2xl"
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

/**
 * Badge showcase with unlock animations (for demo)
 */
export const BadgeUnlockShowcase: React.FC<{ streakDays: number }> = ({ streakDays }) => {
  const badges = [
    { days: 3, emoji: '🥉', name: 'Bronze Badge', threshold: 3 },
    { days: 7, emoji: '🥈', name: 'Silver Badge', threshold: 7 },
    { days: 15, emoji: '👑', name: 'Golden Crown', threshold: 15 },
  ];

  return (
    <div className="flex justify-center items-stretch gap-6">
      {badges.map((badge, index) => {
        const isNextTarget = streakDays < badge.threshold && badges.slice(0, index).every(b => streakDays >= b.threshold);
        return (
          <BadgeUnlockAnimation
            key={badge.days}
            days={badge.days}
            emoji={badge.emoji}
            name={badge.name}
            unlocked={streakDays >= badge.threshold}
            dayThreshold={badge.threshold}
            isNextTarget={isNextTarget}
            currentStreak={streakDays}
          />
        );
      })}</div>
  );
};
