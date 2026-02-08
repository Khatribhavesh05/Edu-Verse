'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FireModeAnimationProps {
  streakDays: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

interface FireLevel {
  level: number;
  minDays: number;
  maxDays: number;
  name: string;
  description: string;
  flameColor: string;
  glowColor: string;
  size: number;
  bounceAmount: number;
  scaleRange: [number, number];
  duration: number;
}

export const FireModeAnimation: React.FC<FireModeAnimationProps> = ({
  streakDays,
  size = 'medium',
  showLabel = true,
}) => {
  // Determine fire level
  const fireLevel = useMemo((): FireLevel => {
    if (streakDays < 1) {
      return {
        level: 0,
        minDays: 0,
        maxDays: 0,
        name: 'No Fire',
        description: 'Start learning',
        flameColor: 'from-gray-300 to-gray-400',
        glowColor: 'rgba(209, 213, 219, 0.3)',
        size: 32,
        bounceAmount: 0,
        scaleRange: [1, 1],
        duration: 0,
      };
    }
    if (streakDays <= 2) {
      return {
        level: 1,
        minDays: 1,
        maxDays: 2,
        name: 'Small Flicker',
        description: 'Getting started',
        flameColor: 'from-yellow-200 to-yellow-300',
        glowColor: 'rgba(253, 224, 71, 0.3)',
        size: 48,
        bounceAmount: 2,
        scaleRange: [0.95, 1.08],
        duration: 1.2,
      };
    }
    if (streakDays <= 6) {
      return {
        level: 2,
        minDays: 3,
        maxDays: 6,
        name: 'Medium Flame',
        description: 'Building momentum',
        flameColor: 'from-yellow-300 to-orange-400',
        glowColor: 'rgba(251, 146, 60, 0.4)',
        size: 64,
        bounceAmount: 3,
        scaleRange: [0.93, 1.12],
        duration: 1.2,
      };
    }
    if (streakDays <= 14) {
      return {
        level: 3,
        minDays: 7,
        maxDays: 14,
        name: 'Strong Flame + Glow',
        description: 'Keep the fire burning',
        flameColor: 'from-orange-400 to-red-500',
        glowColor: 'rgba(239, 68, 68, 0.4)',
        size: 80,
        bounceAmount: 4,
        scaleRange: [0.92, 1.15],
        duration: 1.2,
      };
    }
    return {
      level: 4,
      minDays: 15,
      maxDays: Infinity,
      name: 'Inferno + Crown Sparkle',
      description: 'You are a legend!',
      flameColor: 'from-red-500 to-rose-600',
      glowColor: 'rgba(244, 63, 94, 0.5)',
      size: 96,
      bounceAmount: 5,
      scaleRange: [0.90, 1.18],
      duration: 1.2,
    };
  }, [streakDays]);

  // Size multiplier based on prop
  const sizeMultiplier = useMemo(() => {
    switch (size) {
      case 'small':
        return 0.6;
      case 'large':
        return 1.4;
      default:
        return 1;
    }
  }, [size]);

  const finalSize = fireLevel.size * sizeMultiplier;

  // SVG Flame Component - Cartoon style
  const CartoonFlame = ({ isAnimating }: { isAnimating: boolean }) => (
    <motion.div
      animate={
        isAnimating && fireLevel.level > 0
          ? {
              y: [0, -fireLevel.bounceAmount, 0],
              scale: fireLevel.scaleRange,
            }
          : {}
      }
      transition={{
        duration: fireLevel.duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ width: finalSize, height: finalSize }}
    >
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Flame gradient definitions */}
        <defs>
          <linearGradient
            id={`flame-gradient-${fireLevel.level}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={fireLevel.flameColor.split(' ')[0] === 'from-yellow-200' ? '#FEF08A' : 
                        fireLevel.flameColor.split(' ')[0] === 'from-yellow-300' ? '#FCD34D' : 
                        fireLevel.flameColor.split(' ')[0] === 'from-orange-400' ? '#FB923C' : 
                        '#EF4444'}
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor={fireLevel.flameColor.split(' ')[1] === 'to-yellow-300' ? '#FCD34D' :
                        fireLevel.flameColor.split(' ')[1] === 'to-orange-400' ? '#FB923C' :
                        fireLevel.flameColor.split(' ')[1] === 'to-red-500' ? '#EF4444' :
                        '#BE123C'}
              stopOpacity="0.9"
            />
          </linearGradient>

          {/* Glow filter */}
          <filter id={`glow-${fireLevel.level}`}>
            <feGaussianBlur stdDeviation={fireLevel.level * 1.5} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer glow (for levels 3+) */}
        {fireLevel.level >= 3 && (
          <circle
            cx="50"
            cy="60"
            r="48"
            fill={fireLevel.glowColor.slice(0, -9) + '0.2)'}
            filter={`url(#glow-${fireLevel.level})`}
          />
        )}

        {/* Main flame - organic teardrop shape */}
        <path
          d="M50 20 C35 35 25 50 25 65 C25 85 35 100 50 100 C65 100 75 85 75 65 C75 50 65 35 50 20 Z"
          fill={`url(#flame-gradient-${fireLevel.level})`}
          opacity="0.95"
          filter={`url(#glow-${fireLevel.level})`}
        />

        {/* Inner bright core - for stronger flames */}
        {fireLevel.level >= 2 && (
          <path
            d="M50 35 C42 45 38 55 38 65 C38 75 42 85 50 88 C58 85 62 75 62 65 C62 55 58 45 50 35 Z"
            fill={
              fireLevel.level === 2 ? '#FFEAA7' :
              fireLevel.level === 3 ? '#FFA500' :
              '#FF6347'
            }
            opacity={fireLevel.level === 2 ? 0.7 : fireLevel.level === 3 ? 0.8 : 0.85}
          />
        )}

        {/* Tip highlight - for visual depth */}
        {fireLevel.level >= 2 && (
          <path
            d="M50 25 C45 32 42 40 45 52 C48 43 50 33 50 25 Z"
            fill="white"
            opacity={fireLevel.level === 2 ? 0.4 : fireLevel.level === 3 ? 0.5 : 0.6}
          />
        )}

        {/* Flickering effect - secondary flame shapes */}
        {fireLevel.level >= 1 && (
          <>
            <path
              d="M35 50 C32 58 30 68 35 78 C38 70 40 60 35 50 Z"
              fill={`url(#flame-gradient-${fireLevel.level})`}
              opacity={fireLevel.level === 1 ? 0.5 : fireLevel.level === 2 ? 0.6 : 0.7}
            />
            <path
              d="M65 50 C68 58 70 68 65 78 C62 70 60 60 65 50 Z"
              fill={`url(#flame-gradient-${fireLevel.level})`}
              opacity={fireLevel.level === 1 ? 0.5 : fireLevel.level === 2 ? 0.6 : 0.7}
            />
          </>
        )}
      </svg>
    </motion.div>
  );

  // Crown sparkle component (for level 4+)
  const CrownSparkle = () => (
    <motion.div
      className="absolute -top-2 -right-2"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 360, 0],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <span className="text-3xl drop-shadow-lg">👑</span>
    </motion.div>
  );

  // Particle sparkles
  const Sparkle = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
      animate={{
        y: [0, -20, -40],
        x: [0, Math.sin(delay) * 20, 0],
        opacity: [1, 0.5, 0],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        delay: delay * 0.2,
      }}
      style={{
        left: `${50 + Math.cos(delay) * 30}%`,
        top: `${50 + Math.sin(delay) * 30}%`,
      }}
    />
  );

  const hasAnimation = fireLevel.level > 0;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Fire Container */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={
          hasAnimation
            ? {
                filter: [
                  `drop-shadow(0 0 ${fireLevel.level * 5}px ${fireLevel.glowColor})`,
                  `drop-shadow(0 0 ${fireLevel.level * 8}px ${fireLevel.glowColor})`,
                  `drop-shadow(0 0 ${fireLevel.level * 5}px ${fireLevel.glowColor})`,
                ],
              }
            : {}
        }
        transition={{
          duration: fireLevel.duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Main Flame */}
        <CartoonFlame isAnimating={hasAnimation} />

        {/* Crown Sparkle (level 4+) */}
        {fireLevel.level >= 4 && <CrownSparkle />}

        {/* Particle Sparkles (level 2+) */}
        {fireLevel.level >= 2 && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <Sparkle key={i} delay={i} />
            ))}
          </>
        )}
      </motion.div>

      {/* Label */}
      {showLabel && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm font-bold text-gray-700">{fireLevel.name}</div>
          <div className="text-xs text-gray-500">{fireLevel.description}</div>
          {fireLevel.level > 0 && (
            <div className="text-xs font-semibold text-orange-600 mt-1">
              {fireLevel.minDays === fireLevel.maxDays
                ? `Day ${fireLevel.minDays}`
                : `Days ${fireLevel.minDays}-${fireLevel.maxDays === Infinity ? '+' : fireLevel.maxDays}`}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

/**
 * Fire Mode Showcase - Interactive demo to test all fire levels
 */
export const FireModeShowcase: React.FC = () => {
  const fireLevels = [0, 1, 2, 3, 5, 7, 10, 15, 20, 30];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">🔥 Fire Mode Animation</h2>
        <p className="text-gray-600">Smooth, cartoon-style flames that grow with your streak</p>
      </div>

      {/* Medium Size Demo */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Medium Size</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
          {fireLevels.map((days) => (
            <div key={days} className="flex flex-col items-center gap-2">
              <FireModeAnimation streakDays={days} size="medium" showLabel={true} />
            </div>
          ))}
        </div>
      </div>

      {/* Size Comparison */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Size Comparison (7 Days)</h3>
        <div className="grid grid-cols-3 gap-8 p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl items-center justify-items-center">
          <div className="flex flex-col items-center gap-2">
            <FireModeAnimation streakDays={7} size="small" showLabel={false} />
            <p className="text-sm font-bold text-gray-700">Small</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FireModeAnimation streakDays={7} size="medium" showLabel={false} />
            <p className="text-sm font-bold text-gray-700">Medium</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FireModeAnimation streakDays={7} size="large" showLabel={false} />
            <p className="text-sm font-bold text-gray-700">Large</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-3">✨ Features</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✓ Soft bounce animation</li>
            <li>✓ Progressive glow effect</li>
            <li>✓ Gradient flame colors</li>
            <li>✓ 1.2s smooth loop</li>
            <li>✓ Cartoon-style design</li>
            <li>✓ Crown sparkle at level 4</li>
            <li>✓ Particle effects</li>
          </ul>
        </div>

        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-bold text-green-900 mb-3">🎯 Fire Levels</h4>
          <ul className="space-y-2 text-sm text-green-800">
            <li><strong>Level 1:</strong> 1-2 days (Small flicker)</li>
            <li><strong>Level 2:</strong> 3-6 days (Medium flame)</li>
            <li><strong>Level 3:</strong> 7-14 days (Strong flame + glow)</li>
            <li><strong>Level 4:</strong> 15+ days (Inferno + crown sparkle)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
