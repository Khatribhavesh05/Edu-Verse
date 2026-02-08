'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import MoodBasedLearningGuide from './mood-learning-guide';
import { Sparkles } from 'lucide-react';

export default function MoodGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all text-lg flex items-center justify-center gap-2 group"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="group-hover:scale-110 transition-transform"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          Express Your Mood & Get Activities 🎯
        </Button>
      </motion.div>

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Find Your Perfect Learning Activity</DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            <MoodBasedLearningGuide />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
