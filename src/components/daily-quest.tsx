'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { getDailyQuest } from '@/lib/quests';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Award, Coins, Sparkles } from 'lucide-react';
import RewardAnnouncement from './reward-announcement';

export default function DailyQuestCard() {
  const quest = getDailyQuest();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [showRewards, setShowRewards] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );

    // Show rewards and announcement when all tasks are completed
    if (completedTasks.length === quest.tasks.length - 1) {
      setTimeout(() => {
        setShowRewards(true);
        setShowAnnouncement(true);
      }, 500);
    }
  };

  const completionPercentage = (completedTasks.length / quest.tasks.length) * 100;
  const isQuestComplete = completedTasks.length === quest.tasks.length;

  useEffect(() => {
    if (!isQuestComplete) {
      return;
    }

    try {
      localStorage.setItem('eduverse_task_completed', 'true');
      localStorage.setItem('eduverse_task_completed_source', 'daily-quest');
      localStorage.setItem('eduverse_task_completed_at', new Date().toISOString());
    } catch {
      // Ignore storage errors in demo mode
    }
  }, [isQuestComplete]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
    >
      <Card className="shadow-xl bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 overflow-hidden">
        {/* Header with Quest Title */}
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <span className="text-5xl">{quest.emoji}</span>
              <div>
                <CardTitle className="text-3xl text-white">Daily Learning Quest</CardTitle>
                <CardDescription className="text-purple-100 text-lg mt-1">
                  {quest.title}
                </CardDescription>
                <p className="text-purple-100 text-sm mt-2">{quest.estimatedTime}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white text-purple-600 font-bold text-sm">
              {completedTasks.length}/{quest.tasks.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-700">Quest Progress</span>
              <span className="text-sm font-semibold text-purple-600">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3 bg-purple-200" />
            <p className="text-sm text-gray-600 mt-2">
              {completedTasks.length === 0
                ? "Start your quest! Complete all 3 tasks to win amazing rewards!"
                : completedTasks.length === quest.tasks.length
                ? "🎉 Quest Complete! Check your rewards below!"
                : `${quest.tasks.length - completedTasks.length} task${
                    quest.tasks.length - completedTasks.length !== 1 ? 's' : ''
                  } remaining`}
            </p>
          </div>

          {/* Tasks List */}
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Your Tasks:</h3>
            {quest.tasks.map((task, index) => (
              <motion.button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  completedTasks.includes(task.id)
                    ? 'bg-green-100 border-green-400 shadow-md'
                    : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  {completedTasks.includes(task.id) ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`font-bold text-lg ${
                        completedTasks.includes(task.id)
                          ? 'text-green-700 line-through'
                          : 'text-gray-800'
                      }`}
                    >
                      {index + 1}. {task.title}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                    <p className="text-purple-600 text-xs font-semibold mt-2">{task.content}</p>
                    <Badge
                      variant="outline"
                      className="mt-2 text-xs capitalize bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {task.type === 'math'
                        ? '🧮 Math'
                        : task.type === 'chat'
                        ? '💬 Chat'
                        : task.type === 'quiz'
                        ? '❓ Quiz'
                        : task.type === 'read'
                        ? '📖 Read'
                        : '🔍 Explore'}
                    </Badge>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Rewards Section */}
          {isQuestComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-2xl p-6 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-8 h-8 text-yellow-600" />
              </motion.div>

              <h3 className="text-2xl font-black text-yellow-800 mb-4">Quest Complete! 🎉</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 bg-white rounded-xl p-4">
                  <Coins className="w-6 h-6 text-yellow-600" />
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Coins Earned</p>
                    <p className="text-2xl font-black text-yellow-700">+{quest.rewards.coins}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 bg-white rounded-xl p-4">
                  <Award className="w-6 h-6 text-purple-600" />
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Sticker Earned</p>
                    <p className="text-lg font-bold text-purple-700">{quest.rewards.sticker}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-yellow-700 font-semibold mt-4">
                ✨ Collect 5 stickers to unlock special badges!
              </p>
            </motion.div>
          )}

          {/* Call to Action Button */}
          {!isQuestComplete && (
            <div className="mt-6">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all text-lg"
              >
                Start Next Task
              </Button>
            </div>
          )}

          {isQuestComplete && (
            <div className="mt-6">
              <Button
                onClick={() => {
                  setCompletedTasks([]);
                  setShowRewards(false);
                }}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all text-lg"
              >
                Start Tomorrow's Quest
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>

    {/* Reward Announcement */}
    {showAnnouncement && (
      <RewardAnnouncement
        questTitle={quest.title}
        coinsEarned={quest.rewards.coins}
        stickerEarned={quest.rewards.sticker}
        onDismiss={() => setShowAnnouncement(false)}
      />
    )}
    </>
  );
}
