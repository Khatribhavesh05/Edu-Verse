'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const REWARDS = [
  { emoji: '⭐', text: 'Bonus Star!' },
  { emoji: '🔥', text: 'Streak Booster' },
  { emoji: '🎮', text: 'Free Mini-Game Try' },
  { emoji: '🎁', text: 'Surprise Badge' },
  { emoji: '👏', text: 'Orbi says: Great job!' },
  { emoji: '✨', text: 'Magic Moment!' },
];

interface ScratchCardProps {
  onRevealed?: (reward: string) => void;
  allowClose?: boolean;
}

export function ScratchCard({ onRevealed, allowClose = true }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [reward] = useState(() => REWARDS[Math.floor(Math.random() * REWARDS.length)]);
  
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const brushSize = 40;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 280;
    canvas.height = 200;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Draw gray scratch-off surface
    context.fillStyle = '#d1d5db';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture lines to scratch surface
    context.strokeStyle = '#9ca3af';
    context.lineWidth = 1;
    for (let i = 0; i < canvas.height; i += 10) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i + 5);
      context.stroke();
    }

    // Add "Scratch to reveal" text
    context.fillStyle = '#4b5563';
    context.font = 'bold 18px sans-serif';
    context.textAlign = 'center';
    context.fillText('Scratch to reveal 🎁', canvas.width / 2, canvas.height / 2 - 20);
    context.font = '14px sans-serif';
    context.fillText('(or click anywhere)', canvas.width / 2, canvas.height / 2 + 20);

    contextRef.current = context;
  }, []);

  const revealMore = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    // Erase circular area on scratch surface
    context.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);

    // Calculate scratch percentage
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) transparentPixels++;
    }

    const progress = (transparentPixels / (data.length / 4)) * 100;
    setScratchProgress(progress);

    if (progress > 60 && !isRevealed) {
      setIsRevealed(true);
      if (onRevealed) {
        onRevealed(`${reward.emoji} ${reward.text}`);
      }
    }
  };

  const handleMouseDown = () => {
    setIsScratching(true);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching || isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    revealMore(x, y);
  };

  const handleTouchStart = () => {
    setIsScratching(true);
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching || isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    revealMore(x, y);
  };

  const handleClick = () => {
    if (!isRevealed) {
      // Click anywhere to scratch automatically
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (canvas && context) {
        // Clear 70% of the canvas for auto-reveal on click
        for (let x = 0; x < canvas.width; x += 20) {
          for (let y = 0; y < canvas.height; y += 20) {
            context.clearRect(x, y, 60, 60);
          }
        }
        setIsRevealed(true);
        if (onRevealed) {
          onRevealed(`${reward.emoji} ${reward.text}`);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Scratch Card Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
        {/* Hidden Reward Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="text-7xl mb-3"
              animate={isRevealed ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {reward.emoji}
            </motion.div>
            <motion.p
              className="text-xl font-bold text-amber-900"
              animate={isRevealed ? {
                opacity: [0, 1],
                y: [10, 0]
              } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {reward.text}
            </motion.p>
          </div>
        </div>

        {/* Scratch Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onClick={handleClick}
          className={`relative z-10 block cursor-pointer ${
            isRevealed ? 'cursor-default opacity-0 pointer-events-none' : ''
          } transition-opacity duration-300`}
        />
      </div>

      {/* Sparkle Effect when Revealed */}
      {isRevealed && (
        <>
          <motion.div
            className="text-4xl"
            animate={{
              scale: [1, 1.3, 0],
              opacity: [1, 1, 0]
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            ✨
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-2"
          >
            <div className="flex items-center gap-2 justify-center text-lg font-bold text-amber-900">
              <Sparkles className="w-5 h-5 text-amber-600" />
              You revealed: {reward.emoji} {reward.text}
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            {allowClose && (
              <p className="text-sm text-foreground/60">
                Click the close button to continue
              </p>
            )}
          </motion.div>
        </>
      )}

      {/* Progress Indicator */}
      {!isRevealed && scratchProgress > 0 && (
        <motion.div
          className="text-sm font-semibold text-amber-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Scratched: {Math.min(100, Math.round(scratchProgress))}%
        </motion.div>
      )}

      {/* Instructions */}
      {!isRevealed && scratchProgress === 0 && (
        <motion.p
          className="text-sm text-foreground/70 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Drag your mouse or finger across the card
        </motion.p>
      )}
    </div>
  );
}
