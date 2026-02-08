'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface TodaysHighlightProps {
  hasActivity?: boolean;
  activityType?: 'math' | 'science' | 'english' | 'general' | 'streak' | 'exploration';
}

export function TodaysHighlight({ 
  hasActivity = false, 
  activityType = 'general' 
}: TodaysHighlightProps) {
  
  // Generate personalized highlight message based on activity
  const highlightMessage = useMemo(() => {
    if (!hasActivity) {
      return "Ready to make today amazing? Let's start!";
    }

    // Positive messages based on activity type
    const messages = {
      math: "Today you did great in Math — keep going!",
      science: "You explored Science today — awesome!",
      english: "Nice work on your English skills today!",
      streak: "Nice consistency! You showed up today 🔥",
      exploration: "You explored a new topic today — awesome!",
      general: "You're doing great today — keep it up!"
    };

    return messages[activityType] || messages.general;
  }, [hasActivity, activityType]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-5 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Star Icon */}
          <div className="flex-shrink-0">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut'
              }}
              className="text-4xl"
            >
              🌟
            </motion.div>
          </div>

          {/* Message Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide">
                Today's Highlight
              </h3>
            </div>
            <p className="text-base font-semibold text-amber-800">
              {highlightMessage}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
