'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Motivational Messages for Streak Increases
 * Short, positive, encouraging sentences
 */
const MOTIVATIONAL_MESSAGES = [
  "🔥 Great job! Your streak is growing!",
  "Nice! One more day stronger!",
  "🎉 You're on fire! Keep it up!",
  "Amazing! Another day conquered!",
  "💪 Streak power activated!",
  "Awesome! You're building momentum!",
  "🌟 Way to go! Keep learning!",
  "Brilliant! Your dedication shows!",
  "🚀 Streak level up! Fantastic!",
  "Yes! Another day of progress!",
];

interface StreakFeedbackProps {
  /** Current streak count */
  streakDays: number;
  /** Whether to show the feedback */
  show: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
}

/**
 * Streak Feedback Toast Component
 * 
 * Displays a short motivational message when streak increases
 * Auto-dismisses after 3 seconds
 */
export function StreakFeedback({ streakDays, show, onComplete }: StreakFeedbackProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (show) {
      // Pick a random motivational message
      const randomMessage = MOTIVATIONAL_MESSAGES[
        Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)
      ];
      setMessage(randomMessage);

      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24,
          }}
          className="fixed top-24 right-6 z-50 pointer-events-none w-72"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-white/30">
            <div className="flex items-center gap-3">
              {/* Animated flame icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="text-3xl"
              >
                🔥
              </motion.div>

              {/* Message */}
              <div className="space-y-1">
                <p className="font-bold text-lg leading-tight">{message}</p>
                <p className="text-sm text-white/90">
                  {streakDays} day{streakDays !== 1 ? 's' : ''} streak!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook for detecting streak increases
 * Returns whether the streak just increased
 */
export function useStreakIncrease(currentStreak: number): boolean {
  const [previousStreak, setPreviousStreak] = useState(currentStreak);
  const [justIncreased, setJustIncreased] = useState(false);

  useEffect(() => {
    // Check if streak increased by exactly 1
    if (currentStreak > previousStreak && currentStreak === previousStreak + 1) {
      setJustIncreased(true);
      
      // Reset the flag after a short delay
      const timer = setTimeout(() => {
        setJustIncreased(false);
      }, 100);

      setPreviousStreak(currentStreak);
      
      return () => clearTimeout(timer);
    } else if (currentStreak !== previousStreak) {
      // Update previous streak without triggering feedback
      setPreviousStreak(currentStreak);
    }
  }, [currentStreak, previousStreak]);

  return justIncreased;
}
