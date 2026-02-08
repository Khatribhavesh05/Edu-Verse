'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';

interface RewardAnnouncementProps {
  questTitle: string;
  coinsEarned: number;
  stickerEarned: string;
  onDismiss?: () => void;
}

export default function RewardAnnouncement({
  questTitle,
  coinsEarned,
  stickerEarned,
  onDismiss,
}: RewardAnnouncementProps) {
  const announcements = [
    `🎉 Amazing! You crushed "${questTitle}"! Earned ${coinsEarned} coins + ${stickerEarned}!`,
    `⭐ Fantastic work! "${questTitle}" complete! You got ${coinsEarned} coins & a shiny new sticker!`,
    `🚀 WOW! You're on fire! "${questTitle}" done! +${coinsEarned} coins and ${stickerEarned}!`,
    `✨ Brilliant! "${questTitle}" mastered! ${coinsEarned} coins unlocked + new sticker acquired!`,
    `🌟 YES! You nailed it! "${questTitle}" finished! ${coinsEarned} coins + ${stickerEarned}! 🏆`,
  ];

  const randomAnnouncement =
    announcements[Math.floor(Math.random() * announcements.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl shadow-2xl p-6 text-white max-w-md">
        {/* Animated Confetti Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100],
                x: [Math.random() * 20 - 10, Math.random() * 40 - 20],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-start gap-4">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex-shrink-0"
          >
            <Gift className="w-8 h-8 text-yellow-300" />
          </motion.div>

          <div className="flex-1">
            <p className="text-lg font-black leading-snug">{randomAnnouncement}</p>
          </div>

          <motion.div
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-2xl"
          >
            ✨
          </motion.div>
        </div>

        {/* Dismiss Button */}
        {onDismiss && (
          <motion.button
            onClick={onDismiss}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full bg-white text-purple-600 font-bold py-2 rounded-lg text-sm hover:bg-purple-50 transition-colors"
          >
            Awesome! 🎊
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
