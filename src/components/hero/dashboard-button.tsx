'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardButtonProps {
    href: string;
}

export function DashboardButton({ href }: DashboardButtonProps) {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // 1. Ripple Effect
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        // 2. Confetti Sparkle
        confetti({
            particleCount: 15, // Small burst
            spread: 30,
            startVelocity: 15,
            origin: {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight
            },
            colors: ['#FFD700', '#FFFFFF', '#60A5FA'],
            disableForReducedMotion: true
        });
    };

    return (
        <Link href={href} onClick={handleClick} className="relative inline-block group">
            {/* Breathing Glow Background */}
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse-slow"></div>

            {/* Main Button */}
            <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center px-8 py-6 text-lg font-bold text-white rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl overflow-hidden border-4 border-white/20 backdrop-blur-md"
            >
                <span className="relative z-10 flex items-center gap-2">
                    Go to my Dashboard <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </span>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                {/* Ripples */}
                <AnimatePresence>
                    {ripples.map((ripple) => (
                        <motion.span
                            key={ripple.id}
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 4, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute bg-white/30 rounded-full pointer-events-none"
                            style={{
                                left: ripple.x,
                                top: ripple.y,
                                width: 20,
                                height: 20,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </Link>
    );
}
