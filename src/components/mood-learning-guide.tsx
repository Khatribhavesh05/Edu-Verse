'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { moodOptions, getMoodGuide, MoodType } from '@/lib/mood-guide';
import { Clock, Target, Zap } from 'lucide-react';

export default function MoodBasedLearningGuide() {
  const [selectedMood, setSelectedMood] = useState<MoodType>('happy');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [tappedMood, setTappedMood] = useState<MoodType | null>(null);
  const moodGuide = getMoodGuide(selectedMood);

  const difficultyColors: Record<string, string> = {
    easy: 'bg-green-100 text-green-700 border-green-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    hard: 'bg-red-100 text-red-700 border-red-300',
  };

  const moodCardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 8 },
    visible: {
      opacity: 1,
      scale: [0.85, 1.03, 1],
      y: 0,
      boxShadow: [
        '0 0 0 rgba(124, 58, 237, 0)',
        '0 0 24px rgba(99, 102, 241, 0.35)',
        '0 0 0 rgba(124, 58, 237, 0)',
      ],
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        scale: { duration: 0.5, ease: 'easeOut', times: [0, 0.7, 1] },
        boxShadow: { duration: 1, ease: 'easeOut' },
      },
    },
    exit: { opacity: 0, scale: 0.95, y: -6, transition: { duration: 0.2 } },
  };

  const activitiesContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const activitiesWrapper = {
    hidden: { opacity: 0, scale: 0.96, y: 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 200, damping: 18 },
    },
    exit: { opacity: 0, scale: 0.98, y: 6, transition: { duration: 0.2 } },
  };

  const activityCard = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <div className="space-y-8">
      {/* Mood Selector */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg bg-white border border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl">How are you feeling today?</CardTitle>
            <CardDescription className="text-md">
              Tell us your mood and get personalized learning activities! 🎯
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moodOptions.map((option) => (
                <motion.button
                  key={option.mood}
                  onClick={() => {
                    setSelectedMood(option.mood);
                    setShowSuggestions(true);
                    setTappedMood(option.mood);
                    setTimeout(() => setTappedMood(null), 400);
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.1 }}
                  className={`relative p-6 rounded-2xl border-3 transition-all flex flex-col items-center gap-2 ${
                    selectedMood === option.mood
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <motion.span
                    className="text-5xl relative z-10"
                    animate={
                      tappedMood === option.mood
                        ? { rotate: [0, -8, 8, -4, 0], scale: [1, 1.08, 1] }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  >
                    {option.emoji}
                  </motion.span>
                  <span className="font-bold text-gray-700 relative z-10">{option.label}</span>
                  <AnimatePresence>
                    {tappedMood === option.mood && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.7, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 1.4 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-purple-300 z-0"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mood Greeting & Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMood}
          variants={moodCardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className="shadow-lg border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {(selectedMood === 'happy' || selectedMood === 'excited') && (
                <motion.div
                  key={`sparkles-${selectedMood}`}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.6, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: -6 }}
                      exit={{ opacity: 0, scale: 0.4, y: -10 }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.06 }}
                      className="absolute text-yellow-300 drop-shadow-sm"
                      style={{
                        left: `${12 + i * 12}%`,
                        top: `${20 + (i % 3) * 16}%`,
                        fontSize: i % 2 === 0 ? '14px' : '10px',
                      }}
                    >
                      ✨
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl">
                    <motion.span
                      key={`${selectedMood}-emoji`}
                      initial={{ scale: 0.9, opacity: 0.6 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, type: 'spring', stiffness: 260, damping: 18 }}
                      className="text-5xl mr-3 inline-block"
                    >
                      {moodGuide.emoji}
                    </motion.span>
                    {moodGuide.moodName} Mood
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    {moodGuide.greeting}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-base px-4 py-2 h-fit">
                  <Zap className="w-4 h-4 mr-1" />
                  {moodGuide.energy}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Activity Suggestions */}
      <AnimatePresence mode="wait">
        {showSuggestions && (
          <motion.div
            key={`activities-${selectedMood}`}
            variants={activitiesWrapper}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 rgba(99, 102, 241, 0)',
                  '0 10px 30px rgba(99, 102, 241, 0.2)',
                  '0 0 0 rgba(99, 102, 241, 0)',
                ],
              }}
              transition={{ duration: 1.6, repeat: 2, ease: 'easeInOut' }}
              className="rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-800">Suggested Activities:</h3>
            </motion.div>

            <motion.div
              variants={activitiesContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {moodGuide.activities.map((activity) => (
                <motion.div
                  key={activity.title}
                  variants={activityCard}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="shadow-md hover:shadow-xl transition-shadow bg-white border border-gray-200">
                    <CardContent className="pt-6">
                <div className="flex gap-6">
                  {/* Activity Icon */}
                  <div className="flex-shrink-0">
                    <div className="text-5xl">{activity.emoji}</div>
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-800">
                        {activity.title}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`capitalize font-semibold border-2 ${
                          difficultyColors[activity.difficulty]
                        }`}
                      >
                        {activity.difficulty}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-4">{activity.description}</p>

                    {/* Activity Meta */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                        <Clock className="w-4 h-4" />
                        {activity.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                        <Target className="w-4 h-4" />
                        {activity.type === 'mini-game'
                          ? '🎮 Mini-Game'
                          : activity.type === 'animation'
                          ? '🎬 Animation'
                          : activity.type === 'chat'
                          ? '💬 Chat with Orbi'
                          : activity.type === 'practice'
                          ? '✏️ Practice'
                          : '🏆 Challenge'}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                    >
                      Start
                    </motion.button>
                  </div>
                </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-6 rounded-lg"
      >
        <p className="text-gray-800 font-semibold">
          💡 <span className="text-yellow-700">Pro Tip:</span> You can change your mood anytime!
          Your mood helps us suggest the perfect activities for you. 🌟
        </p>
      </motion.div>
    </div>
  );
}
