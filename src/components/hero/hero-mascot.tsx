'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const MESSAGES = [
    "You're a Star! 🌟",
    "Keep Exploring! 🚀",
    "Amazing Job! 💖",
    "So Smart! 🧠",
    "Learning is Fun! 🎈",
    "Great Curiosity! 🤔",
    "Super Focus! ⚡",
    "High Five! 🙌"
];

const GREETINGS = [
    "Hi Explorer! 🚀",
    "Ready for adventure?",
    "Let's learn something cool!",
    "I'm Orbi, your friend! 🤖"
];

export function HeroMascot() {
    const [message, setMessage] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Greeting on Mount
    useEffect(() => {
        const timer = setTimeout(() => {
            const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
            setMessage(randomGreeting);
            setTimeout(() => setMessage(null), 4000);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Eye Tracking Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();

            // Calculate relative position of mouse (-1 to 1)
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const x = Math.min(Math.max((e.clientX - centerX) / 100, -1), 1);
            const y = Math.min(Math.max((e.clientY - centerY) / 100, -1), 1);

            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Blinking Logic
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 200); // Quick blink
        }, 4000 + Math.random() * 2000); // Every 4-6s

        return () => clearInterval(blinkInterval);
    }, []);

    const handleClick = () => {
        // Confetti
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            confetti({
                particleCount: 30,
                spread: 50,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight
                },
                colors: ['#60A5FA', '#A78BFA', '#F472B6']
            });
        }

        // Message
        const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setMessage(randomMsg);
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div ref={containerRef} className="relative inline-block z-50">
            {/* Message Bubble */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: -20 }}
                        exit={{ opacity: 0, scale: 0, y: 0 }}
                        className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white px-5 py-3 rounded-2xl shadow-xl border-4 border-blue-200 whitespace-nowrap z-50"
                    >
                        <p className="text-lg font-black text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            {message}
                        </p>
                        <div className="absolute bottom-0 left-1/2 -mb-2 w-4 h-4 bg-white border-r-4 border-b-4 border-blue-200 transform rotate-45 -translate-x-1/2 ml-0"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="cursor-pointer relative w-32 h-32 md:w-40 md:h-40 filter drop-shadow-2xl transition-all"
            >
                {/* Custom SVG Robot for Animation Control */}
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                    {/* Glow Effect on Hover */}
                    {isHovered && (
                        <motion.circle cx="100" cy="100" r="90" fill="url(#glow)" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} />
                    )}

                    <defs>
                        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Antenna */}
                    <motion.g
                        animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
                        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                    >
                        <line x1="100" y1="50" x2="100" y2="30" stroke="#94A3B8" strokeWidth="4" />
                        <circle cx="100" cy="25" r="8" fill="#F472B6" />
                    </motion.g>

                    {/* Head */}
                    <rect x="50" y="50" width="100" height="90" rx="20" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="4" />

                    {/* Screen/Face */}
                    <rect x="60" y="65" width="80" height="50" rx="10" fill="#1E293B" />

                    {/* Eyes Container */}
                    <g clipPath="url(#screenClip)">
                        <defs>
                            <rect id="screenClip" x="60" y="65" width="80" height="50" rx="10" />
                        </defs>

                        {/* Left Eye */}
                        <motion.ellipse
                            cx={80 + mousePos.x * 10}
                            cy={90 + mousePos.y * 5}
                            rx="8"
                            ry={isBlinking ? 1 : 8}
                            fill="#60A5FA"
                            animate={{ ry: isBlinking ? 0.5 : 8 }}
                            transition={{ duration: 0.1 }}
                        />

                        {/* Right Eye */}
                        <motion.ellipse
                            cx={120 + mousePos.x * 10}
                            cy={90 + mousePos.y * 5}
                            rx="8"
                            ry={isBlinking ? 1 : 8}
                            fill="#60A5FA"
                            animate={{ ry: isBlinking ? 0.5 : 8 }}
                            transition={{ duration: 0.1 }}
                        />

                        {/* Mouth (Smile) */}
                        {!isBlinking && (
                            <path d="M 85 105 Q 100 110 115 105" stroke="#60A5FA" strokeWidth="3" fill="none" strokeLinecap="round" />
                        )}
                    </g>

                    {/* Body (Simple Representation) */}
                    <rect x="70" y="140" width="60" height="40" rx="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="4" />

                    {/* Arms */}
                    <motion.path
                        d="M 50 150 Q 30 160 40 180"
                        stroke="#94A3B8"
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                        animate={{ d: isHovered ? "M 50 150 Q 20 130 30 110" : "M 50 150 Q 30 160 40 180" }} // Wave on hover
                        transition={{ type: "spring", stiffness: 100 }}
                    />
                    <path d="M 150 150 Q 170 160 160 180" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" fill="none" />

                </svg>
            </motion.div>
        </div>
    );
}
