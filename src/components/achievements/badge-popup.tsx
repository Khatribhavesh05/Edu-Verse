'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '@/context/achievement-context';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';

export function BadgePopup() {
    const { latestUnlockedBadge, clearLatestBadge } = useAchievements();

    useEffect(() => {
        if (latestUnlockedBadge) {
            // Tiger confetti effect
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }
    }, [latestUnlockedBadge]);

    if (!latestUnlockedBadge) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, y: 100 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-4 border-yellow-400 overflow-hidden"
                >
                    {/* Background glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-50 to-white -z-10"></div>

                    <button
                        onClick={clearLatestBadge}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-8xl mb-6 filter drop-shadow-lg"
                    >
                        {latestUnlockedBadge.emoji}
                    </motion.div>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-black text-slate-800 mb-2"
                    >
                        Badge Unlocked!
                    </motion.h2>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${latestUnlockedBadge.color}`}
                    >
                        {latestUnlockedBadge.name}
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-slate-600 font-medium mb-8 leading-relaxed"
                    >
                        {latestUnlockedBadge.description}
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearLatestBadge}
                        className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200"
                    >
                        Awesome!
                    </motion.button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
