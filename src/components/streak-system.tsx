'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { FireModeAnimation } from '@/components/fire-mode-animation';
import { BadgeUnlockAnimation, BadgeUnlockModal } from '@/components/badge-unlock-animation';
import { StreakFeedback } from '@/components/streak-feedback';
import { ScratchCardModal } from '@/components/scratch-card-modal';
import { playStreakChime } from '@/lib/streak-sound';
import { playFlameWhooshSound } from '@/lib/interaction-sound';

interface StreakSystemProps {
  streakDays?: number;
  showRewards?: boolean;
}

interface Reward {
  days: number;
  emoji: string;
  name: string;
  unlocked: boolean;
}

export const StreakSystem: React.FC<StreakSystemProps> = ({
  streakDays = 0,
  showRewards = true,
}) => {
  // State for badge unlock celebration
  const [unlockedBadge, setUnlockedBadge] = useState<{
    emoji: string;
    name: string;
    days: number;
  } | null>(null);
  const [previousStreakDays, setPreviousStreakDays] = useState(streakDays);
  
  // State for streak increase feedback
  const [showStreakFeedback, setShowStreakFeedback] = useState(false);
  
  // State for interaction sound (play only once)
  const [hasPlayedInteractionSound, setHasPlayedInteractionSound] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [newlyUnlockedMilestone, setNewlyUnlockedMilestone] = useState(0);

  // Calculate progress-based glow intensity
  const progressGlow = useMemo(() => {
    if (streakDays <= 0) return null;
    
    // Streak 1-3 days: Very soft glow, low opacity
    if (streakDays <= 3) {
      return '0 0 15px 3px rgba(251, 146, 60, 0.15)';
    }
    // Streak 4-6 days: Slightly stronger glow
    if (streakDays <= 6) {
      return '0 0 20px 5px rgba(251, 146, 60, 0.25)';
    }
    // Streak 7+ days: Confident glow, clear momentum
    return '0 0 25px 8px rgba(251, 146, 60, 0.35)';
  }, [streakDays]);

  // Get rewards list
  const rewards: Reward[] = useMemo(
    () => [
      { days: 3, emoji: '🥉', name: 'Bronze Badge', unlocked: streakDays >= 3 },
      { days: 7, emoji: '🥈', name: 'Silver Badge', unlocked: streakDays >= 7 },
      { days: 15, emoji: '👑', name: 'Golden Crown', unlocked: streakDays >= 15 },
    ],
    [streakDays]
  );

  // Check for newly unlocked badges
  useEffect(() => {
    if (streakDays > previousStreakDays) {
      // Check if streak increased by exactly 1 day
      if (streakDays === previousStreakDays + 1) {
        // Show streak feedback and play sound
        setShowStreakFeedback(true);
        playStreakChime();
      }
      
      // Find the badge that was just unlocked
      const newlyUnlockedReward = rewards.find(
        (r) => streakDays >= r.days && previousStreakDays < r.days
      );
      
      if (newlyUnlockedReward) {
        setUnlockedBadge({
          emoji: newlyUnlockedReward.emoji,
          name: newlyUnlockedReward.name,
          days: newlyUnlockedReward.days,
        });
        // Show scratch card for milestone reward
        setShowScratchCard(true);
        setNewlyUnlockedMilestone(newlyUnlockedReward.days);
      }
    }
    setPreviousStreakDays(streakDays);
  }, [streakDays, previousStreakDays, rewards]);

  // Handle first interaction (hover or click)
  const handleInteraction = () => {
    if (!hasPlayedInteractionSound) {
      playFlameWhooshSound();
      setHasPlayedInteractionSound(true);
      setIsGlowing(true);
      
      // Reset glow after animation
      setTimeout(() => setIsGlowing(false), 800);
    }
  };

  const handleHoverStart = () => {
    setIsHovering(true);
    handleInteraction();
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
  };

  // Get next milestone
  const nextMilestone = useMemo(() => {
    const unlockedRewards = rewards.filter((r) => r.unlocked);
    if (unlockedRewards.length === 0) return rewards[0];
    return rewards.find((r) => !r.unlocked) || rewards[rewards.length - 1];
  }, [rewards]);

  const pulseVariants = {
    animate: {
      boxShadow: [
        '0 0 0 0 rgba(34, 197, 94, 0.7)',
        '0 0 0 10px rgba(34, 197, 94, 0)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Streak Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                  Learning Streak
                </CardTitle>
                <CardDescription>Keep the momentum going! 🚀</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Empty State: No Streak Yet */}
            {streakDays === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 p-8 text-center space-y-4"
              >
                <div className="text-7xl">🔥</div>
                <h3 className="text-2xl font-bold text-foreground">You're one step away from keeping your streak alive!</h3>
                <p className="text-lg text-foreground/70 max-w-xl mx-auto">
                  Complete today's learning activity to start your streak and unlock amazing badges.
                </p>
              </motion.div>
            )}

            {/* Fire Mode Animation Section */}
            {streakDays > 0 && (
            <motion.div
              className="flex flex-col items-center justify-center py-8 rounded-xl bg-white/50 backdrop-blur-sm border border-orange-100 cursor-pointer"
              variants={pulseVariants}
              animate="animate"
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              onClick={handleInteraction}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                boxShadow: isGlowing 
                  ? '0 0 30px 10px rgba(249, 115, 22, 0.4), 0 0 60px 20px rgba(251, 146, 60, 0.2)'
                  : isHovering
                  ? '0 0 20px 6px rgba(251, 146, 60, 0.3)'
                  : progressGlow || undefined,
                transition: 'box-shadow 0.3s ease-in-out'
              }}
            >
              <motion.div
                animate={{
                  scale: isGlowing ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut'
                }}
              >
                <FireModeAnimation streakDays={streakDays} size="medium" showLabel={false} />
              </motion.div>

              <motion.div 
                className="mt-4 text-center"
                animate={{
                  opacity: isGlowing ? [1, 1, 1] : 1,
                }}
              >
                <div className="text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {streakDays}
                </div>
                <div className="text-sm font-semibold text-gray-600 mt-1">
                  {streakDays === 1 ? 'Day' : 'Days'} Streaking
                </div>
              </motion.div>

              {/* Fire Level Description */}
              <motion.div 
                className="text-center mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                  {streakDays < 1 && '🔥 No Fire Yet'}
                  {streakDays >= 1 && streakDays <= 2 && '🔥 Level 1: Small Flicker'}
                  {streakDays >= 3 && streakDays <= 6 && '🔥 Level 2: Medium Flame'}
                  {streakDays >= 7 && streakDays <= 14 && '🔥 Level 3: Strong Flame'}
                  {streakDays >= 15 && '🔥 Level 4: Inferno + Crown'}
                </div>
              </motion.div>
            </motion.div>
            )}

            {/* Streak Information */}
            {streakDays > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="p-4 rounded-lg bg-green-50 border border-green-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                  Current Streak
                </div>
                <div className="text-2xl font-black text-green-700 mt-1">{streakDays}</div>
              </motion.div>

              <motion.div
                className="p-4 rounded-lg bg-blue-50 border border-blue-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Days Until Next Badge
                </div>
                <div className="text-2xl font-black text-blue-700 mt-1">
                  {Math.max(0, nextMilestone.days - streakDays)}
                </div>
              </motion.div>
            </div>
            )}

            {/* Next Milestone Preview */}
            {streakDays > 0 && nextMilestone.days > streakDays && (
              <motion.div
                className="p-4 rounded-lg bg-purple-50 border-2 border-purple-200 border-dashed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">
                  Next Milestone
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{nextMilestone.emoji}</div>
                  <div className="flex-1">
                    <div className="font-bold text-purple-900">{nextMilestone.name}</div>
                    <div className="text-sm text-purple-700">
                      Unlock after {nextMilestone.days} consecutive days
                    </div>
                  </div>
                </div>

                {/* Progress to Next Badge */}
                <div className="mt-3 w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((streakDays / nextMilestone.days) * 100)}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-xs text-purple-700 mt-1 text-right">
                  {streakDays}/{nextMilestone.days}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Rewards Section */}
      {showRewards && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(251, 191, 36, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.5)',
                '0 0 30px rgba(251, 191, 36, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.6)',
                '0 0 20px rgba(251, 191, 36, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.5)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl"
            style={{
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.5)'
            }}
          >
            <Card className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-xl">
            <CardHeader className="pb-4">
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                  🏆 Reward Collection
                </CardTitle>
                <CardDescription className="text-base font-semibold text-gray-600">
                  Unlock special badges by maintaining your learning streak!
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-6">
              {/* Badge Cards - 3 Column Grid */}
              <div className="grid grid-cols-3 gap-4">
                {rewards.map((reward, index) => {
                  const isNextTarget = !reward.unlocked && rewards.slice(0, index).every(r => r.unlocked);
                  return (
                    <BadgeUnlockAnimation
                      key={reward.days}
                      days={reward.days}
                      emoji={reward.emoji}
                      name={reward.name}
                      unlocked={reward.unlocked}
                      dayThreshold={reward.days}
                      isNextTarget={isNextTarget}
                      currentStreak={streakDays}
                    />
                  );
                })}
              </div>
              
              {/* Progress Message */}
              <motion.div 
                className="text-center"
                whileHover={{ 
                  textShadow: '0 0 8px rgba(234, 179, 8, 0.4)'
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-bold text-gray-700">
                  {streakDays < 3 && (
                    <span>🎯 {3 - streakDays} more day{3 - streakDays !== 1 ? 's' : ''} to unlock Bronze Badge!</span>
                  )}
                  {streakDays >= 3 && streakDays < 7 && (
                    <span>🎯 {7 - streakDays} more day{7 - streakDays !== 1 ? 's' : ''} to unlock Silver Badge!</span>
                  )}
                  {streakDays >= 7 && streakDays < 15 && (
                    <span>🎯 {15 - streakDays} more day{15 - streakDays !== 1 ? 's' : ''} to unlock Golden Crown!</span>
                  )}
                  {streakDays >= 15 && (
                    <span>✨ All badges collected! Keep going! ✨</span>
                  )}
                </p>
              </motion.div>
            </CardContent>
          </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Motivational Message */}
      <motion.div
        className="rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 p-4"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-center text-sm font-semibold text-green-800">
          {streakDays === 0 && (
            <span>💪 Start learning today to build your first streak!</span>
          )}
          {streakDays > 0 && streakDays < 3 && (
            <span>🌟 Keep it up! {3 - streakDays} more day{3 - streakDays !== 1 ? 's' : ''} to your first badge!</span>
          )}
          {streakDays >= 3 && streakDays < 7 && (
            <span>🔥 Awesome! You're on fire! {7 - streakDays} more day{7 - streakDays !== 1 ? 's' : ''} to the Silver Badge!</span>
          )}
          {streakDays >= 7 && streakDays < 15 && (
            <span>⭐ Incredible! {15 - streakDays} more day{15 - streakDays !== 1 ? 's' : ''} to unlock the Golden Crown!</span>
          )}
          {streakDays >= 15 && (
            <span>👑 You're a learning legend! Keep your streak alive!</span>
          )}
        </div>
      </motion.div>

      {/* Badge Unlock Celebration Modal */}
      {unlockedBadge && (
        <BadgeUnlockModal
          isOpen={!!unlockedBadge}
          emoji={unlockedBadge.emoji}
          name={unlockedBadge.name}
          daysReached={streakDays}
          onClose={() => setUnlockedBadge(null)}
        />
      )}
      
      {/* Streak Increase Feedback */}
      <StreakFeedback
        streakDays={streakDays}
        show={showStreakFeedback}
        onComplete={() => setShowStreakFeedback(false)}
      />

      {/* Scratch Card Reward Modal */}
      <ScratchCardModal
        isOpen={showScratchCard}
        onClose={() => setShowScratchCard(false)}
        title={`🎉 You reached ${newlyUnlockedMilestone} days!`}
        subtitle="Scratch the card to reveal your reward"
      />
    </div>
  );
};

/* Demo/Standalone Component - with simulated streak */
export const StreakSystemDemo: React.FC = () => {
  const [demoStreak, setDemoStreak] = React.useState(0);

  return (
    <div className="space-y-6">
      <StreakSystem streakDays={demoStreak} showRewards={true} />

      {/* Demo Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[0, 1, 3, 5, 7, 15, 21, 30].map((days) => (
          <button
            key={days}
            onClick={() => setDemoStreak(days)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              demoStreak === days
                ? 'bg-orange-600 text-white shadow-lg scale-105'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            }`}
          >
            {days}d
          </button>
        ))}
      </div>
    </div>
  );
};
