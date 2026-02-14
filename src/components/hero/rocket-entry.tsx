'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const WELCOME_TEXT = "Welcome to EduVerse!";

export function RocketEntry() {
    const [showRocket, setShowRocket] = useState(false);
    const [typingIndex, setTypingIndex] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        // Start Sequence
        setShowRocket(true);

        // Typing Logic
        let currentIdx = 0;
        const typeInterval = setInterval(() => {
            if (currentIdx <= WELCOME_TEXT.length) {
                setTypingIndex(currentIdx);
                currentIdx++;
            } else {
                clearInterval(typeInterval);
                setAnimationComplete(true);

                // Sparkles on finish
                confetti({
                    particleCount: 50,
                    spread: 70,
                    origin: { y: 0.4 },
                    colors: ['#60A5FA', '#A78BFA', '#F472B6']
                });
            }
        }, 100); // Speed of typing

        return () => clearInterval(typeInterval);
    }, []);

    return (
        <div className="relative w-full flex justify-center perspective-1000">
            {/* Rocket Animation */}
            <AnimatePresence>
                {showRocket && !animationComplete && (
                    <motion.div
                        initial={{ x: '-100vw', y: 50, rotate: 45, scale: 0.8 }}
                        animate={{
                            x: '100vw',
                            y: -50,
                            transition: { duration: 2.5, ease: "easeInOut" }
                        }}
                        onAnimationComplete={() => setShowRocket(false)}
                        className="absolute top-0 left-0 z-50 text-6xl md:text-8xl filter drop-shadow-lg pointer-events-none"
                        style={{ top: '20%' }}
                    >
                        🚀
                        {/* Trail */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.2 }}
                            className="absolute top-1/2 left-0 -translate-x-full w-20 h-4 bg-gradient-to-r from-orange-500 to-transparent blur-md rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Typing Text */}
            <div className="relative z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200%] -z-10"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(124, 92, 255, 0.15) 0%, transparent 60%)',
                        filter: 'blur(20px)'
                    }}
                ></div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 drop-shadow-sm h-[130%] py-2 min-h-[90px]"
                    style={{ textShadow: '0 4px 20px rgba(124,92,255,0.25)' }}>
                    {WELCOME_TEXT.slice(0, typingIndex)}
                    {!animationComplete && (
                        <span className="inline-block w-1 h-12 md:h-16 ml-1 bg-blue-500 animate-blink align-middle mb-2"></span>
                    )}
                </h1>
            </div>

            {/* Screen Flash (Subtle) */}
            <AnimatePresence>
                {showRocket && !animationComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.1, 0] }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="fixed inset-0 bg-white pointer-events-none z-40"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
