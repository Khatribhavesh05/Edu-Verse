'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ScratchCard } from '@/components/scratch-card';

interface ScratchCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export function ScratchCardModal({
  isOpen,
  onClose,
  title = '🎉 You unlocked a reward!',
  subtitle = 'Scratch the card to reveal your surprise'
}: ScratchCardModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-3 border-purple-200 shadow-2xl p-8">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md z-10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                {/* Header */}
                <div className="text-center mb-8 space-y-2">
                  <h2 className="text-3xl font-black text-foreground">
                    {title}
                  </h2>
                  <p className="text-base text-foreground/70 font-semibold">
                    {subtitle}
                  </p>
                </div>

                {/* Scratch Card */}
                <ScratchCard 
                  onRevealed={() => {
                    // Optional: could trigger a sound here
                  }}
                  allowClose={true}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
