'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const EMOJIS = ['⭐', '🎉', '🚀', '🌈', '💡', '🎨', '🪁', '🦄', '🦁'];

export function FloatingEmojis() {
    const [items, setItems] = useState<{ id: number; x: number; emoji: string }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Add a new random emoji
            if (typeof document !== 'undefined' && document.hidden) return; // Pause if tab hidden

            const newItem = {
                id: Date.now(),
                x: Math.random() * 100, // Random Horizontal %
                emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            };

            setItems((prev) => [...prev.slice(-15), newItem]); // Keep last 15 items
        }, 1500); // New emoji every 1.5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <AnimatePresence>
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: '100%', rotate: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: '-20%',
                            rotate: Math.random() > 0.5 ? 20 : -20
                        }}
                        transition={{ duration: 15, ease: 'linear' }}
                        className="absolute bottom-0 text-4xl filter drop-shadow-md opacity-60"
                        style={{ left: `${item.x}%` }}
                    >
                        {item.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
