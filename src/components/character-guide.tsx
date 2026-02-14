'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export function CharacterGuide() {
    const [isHovered, setIsHovered] = useState(false);
    const [isWaving, setIsWaving] = useState(false);
    const [blink, setBlink] = useState(false);
    const [showSparkles, setShowSparkles] = useState(false);

    // Blinking logic
    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 200);
        }, 3000 + Math.random() * 2000);
        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        if (!isWaving) {
            setIsWaving(true);
            setShowSparkles(true);
            setTimeout(() => setIsWaving(false), 1000);
            setTimeout(() => setShowSparkles(false), 1000);
        }
    };

    return (
        <div className="relative z-10 w-[120px] pointer-events-none md:pointer-events-auto hidden lg:block">
            {/* Main Container - Slides In */}
            <motion.div
                initial={{ x: -120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative"
            >
                {/* Floating & Breathing Wrapper */}
                <motion.div
                    animate={{
                        y: [0, -8, 0],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative flex flex-col items-center"
                >

                    {/* Character Container with Glassmorphism Backing */}
                    <div
                        className="relative cursor-pointer group"
                        onClick={handleClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Glass Backing (Subtle) */}
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>

                        {/* Sparkles on Click */}
                        <AnimatePresence>
                            {showSparkles && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                        animate={{ opacity: 1, scale: 1, x: 20, y: -20 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className="absolute top-0 right-0 text-yellow-400"
                                    >
                                        <Sparkles className="w-6 h-6 animate-spin-slow" />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                        animate={{ opacity: 1, scale: 1, x: -20, y: -10 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="absolute top-10 left-0 text-pink-400"
                                    >
                                        <Sparkles className="w-4 h-4 animate-bounce" />
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>

                        {/* Character SVG - Small */}
                        <div className="w-28 h-40 relative drop-shadow-2xl filter hover:brightness-105 transition-all duration-300">
                            <svg viewBox="0 0 200 300" className="w-full h-full overflow-visible">
                                <defs>
                                    <linearGradient id="skin-gradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#fff0e0" />
                                        <stop offset="100%" stopColor="#f5cba7" />
                                    </linearGradient>
                                    <linearGradient id="hair-gradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#5d4037" />
                                        <stop offset="100%" stopColor="#3e2723" />
                                    </linearGradient>
                                    <linearGradient id="dress-gradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#d8b4fe" />
                                        <stop offset="100%" stopColor="#9333ea" />
                                    </linearGradient>
                                    <linearGradient id="hair-shine" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Hair Back (Fuller & Rounder) */}
                                <path d="M50 80 Q30 150, 45 220 Q100 240, 155 220 Q170 150, 150 80 Q140 30, 100 30 Q60 30, 50 80" fill="url(#hair-gradient)" />

                                {/* Body/Dress */}
                                <path d="M70 145 L130 145 L155 290 Q100 310, 45 290 Z" fill="url(#dress-gradient)" />
                                <path d="M70 145 Q100 160, 130 145" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

                                {/* Left Arm (static) */}
                                <path d="M70 155 Q55 200, 65 220" stroke="url(#skin-gradient)" strokeWidth="13" strokeLinecap="round" fill="none" />
                                {/* Right Arm - Points down */}
                                <motion.g
                                    animate={{ y: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <path d="M130 155 Q145 210, 150 250" stroke="url(#skin-gradient)" strokeWidth="13" strokeLinecap="round" fill="none" />
                                    <circle cx="150" cy="250" r="7" fill="url(#skin-gradient)" />
                                </motion.g>

                                {/* Neck */}
                                <rect x="90" y="130" width="20" height="20" fill="url(#skin-gradient)" />

                                {/* Head */}
                                <ellipse cx="100" cy="95" rx="42" ry="48" fill="url(#skin-gradient)" />

                                {/* Hair Front (Bangs with Volume & No Gap) */}
                                <path d="M58 80 C60 55, 90 45, 100 60 C110 45, 140 55, 142 80 C145 110, 135 100, 130 90 Q100 105, 70 90 Q65 100, 58 80" fill="url(#hair-gradient)" />

                                {/* Hair Filler (Closes the Triangular Gap) */}
                                <path d="M80 50 Q100 35, 120 50 L100 90 Z" fill="url(#hair-gradient)" />

                                {/* Hair Shine Highlight */}
                                <path d="M70 50 Q100 45, 130 50 Q120 60, 100 55 Q80 60, 70 50" fill="url(#hair-shine)" />

                                {/* Blush */}
                                <ellipse cx="78" cy="110" rx="6" ry="3" fill="#ffcdD2" />
                                <ellipse cx="122" cy="110" rx="6" ry="3" fill="#ffcdD2" />

                                {/* Eyes (Friendly & Cute) */}
                                <motion.g
                                    animate={{ scaleY: blink ? 0.1 : 1 }}
                                    transition={{ duration: 0.1 }}
                                    style={{ transformOrigin: "100px 95px" }}
                                >
                                    <ellipse cx="85" cy="100" rx="4.5" ry="6" fill="#3e2723" />
                                    <ellipse cx="115" cy="100" rx="4.5" ry="6" fill="#3e2723" />
                                    <circle cx="87" cy="98" r="2" fill="white" />
                                    <circle cx="117" cy="98" r="2" fill="white" />
                                </motion.g>

                                {/* Eyebrows */}
                                <path d="M80 90 Q85 88, 90 90" stroke="#5d4037" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                                <path d="M110 90 Q115 88, 120 90" stroke="#5d4037" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

                                {/* Smile */}
                                <path d="M92 118 Q100 125, 108 118" stroke="#8d6e63" strokeWidth="2.5" fill="none" strokeLinecap="round" />


                            </svg>
                        </div>
                    </div>

                    {/* Poster/Sign - separate so it keeps its own size */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, y: [0, 3, 0] }}
                        transition={{ delay: 1.2, y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
                        className="-mt-2 bg-purple-50 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border-2 border-purple-200 text-center"
                    >
                        <p className="font-bold text-xs leading-tight">
                            <span className="text-purple-600">Pick a subject</span>
                            <br />
                            <span className="text-pink-500">below to start! 👇</span>
                        </p>
                    </motion.div>

                </motion.div>
            </motion.div>
        </div>
    );
}
