
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { badges as allBadges, games } from '@/lib/constants';
import { motion } from 'framer-motion';
import MoodGuideModal from '@/components/mood-guide-modal';
import { playPageTransitionSound } from '@/lib/sound-effects';
import { useGameStats } from '@/hooks/use-game-stats';
import { useUserAchievements } from '@/hooks/use-achievements';

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    playPageTransitionSound();
    setIsClient(true);
  }, []);

  const { activities } = useGameStats();
  const { achievements: earnedAchievements } = useUserAchievements();

  const progressEntries = useMemo(() => {
    const map = new Map<
      string,
      { label: string; gameType: string; correct: number; total: number }
    >();

    activities.forEach((activity) => {
      const key = `${activity.gameId}-${activity.gameType}`;
      const existing = map.get(key) ?? {
        label: activity.gameName || activity.gameId,
        gameType: activity.gameType,
        correct: 0,
        total: 0,
      };

      existing.correct += activity.correctAnswers;
      existing.total += activity.totalQuestions;
      map.set(key, existing);
    });

    return Array.from(map.values()).map((entry) => ({
      label: entry.label,
      score: entry.total > 0 ? Math.round((entry.correct / entry.total) * 100) : 0,
      gameType: entry.gameType,
    }));
  }, [activities]);

  const totalPoints = useMemo(
    () => Math.round(activities.reduce((sum, activity) => sum + activity.correctAnswers * 10, 0)),
    [activities]
  );

  const playedGamesCount = progressEntries.length;
  const totalGamesCount = games.length;
  const overallProgress = totalGamesCount > 0 ? (playedGamesCount / totalGamesCount) * 100 : 0;

  const unlockedBadgeNames = earnedAchievements.map((achievement) => achievement.name);
  const displayedBadges = allBadges.filter((badge) => unlockedBadgeNames.includes(badge.name));

  if (!isClient) {
    return (
      <div className="flex flex-col gap-8">
        <section>
          <h1 className="text-5xl font-black tracking-tight">Welcome, Super Learner!</h1>
          <p className="text-xl text-brand-text-light mt-1">Here's your awesome progress. Keep it up! 🚀</p>
        </section>
        <div className="text-center text-foreground/50">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8"
    >
      <section>
        <h1 className="text-5xl font-black tracking-tight">Welcome, Super Learner!</h1>
        <p className="text-xl text-brand-text-light mt-1">Here's your awesome progress. Keep it up! 🚀</p>
      </section>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">My Learning Adventure</CardTitle>
            <CardDescription className="text-lg">You've played {playedGamesCount} out of {totalGamesCount} available games.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Overall Progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} aria-label="Overall learning progress" />
            </div>
            {progressEntries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {progressEntries.map((entry) => (
                  <motion.div
                    key={entry.label}
                    className="p-4 bg-blue-100 rounded-2xl border-2 border-blue-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h4 className="font-bold text-blue-700 text-xl">{entry.label}</h4>
                    <p className="text-sm uppercase tracking-wide text-blue-500/80">
                      {entry.gameType}
                    </p>
                    <p className="text-lg text-blue-600/80">Score: {entry.score}%</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 text-center text-foreground/70">
                Play any game to see your progress cards here!
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card className="shadow-2xl text-center bg-gradient-to-br from-yellow-300 to-orange-400 text-yellow-900">
                <CardHeader>
                    <CardTitle className="text-3xl">Total Points</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-6xl font-black">{totalPoints.toLocaleString()}</p>
                    <p className="text-md font-semibold opacity-80 mt-1">Wow! You're a star! ✨</p>
                </CardContent>
            </Card>

            <Card className="shadow-2xl bg-white">
                <CardHeader>
                    <CardTitle className="text-3xl">My Sticker Book</CardTitle>
                <CardDescription className="text-lg">{displayedBadges.length} out of {allBadges.length} earned.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    {displayedBadges.length > 0 ? displayedBadges.map((badge, i) => {
                        const Icon = badge.icon;
                        return (
                           <motion.div
                             key={badge.name}
                             initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                             animate={{ opacity: 1, scale: 1, rotate: Math.random() * 10 - 5 }}
                             transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                             whileHover={{ scale: 1.1, y: -5, rotate: 0 }}
                           >
                            <Badge variant="secondary" className="px-4 py-2 text-base rounded-full border-2 border-purple-300 bg-purple-100 text-purple-700 cursor-pointer">
                                <Icon className="w-5 h-5 mr-2 text-purple-500" />
                                {badge.name}
                            </Badge>
                           </motion.div>
                        )
                    }) : <p className="text-base text-brand-text-light">Play games to earn cool stickers!</p>}
                </CardContent>
            </Card>
        </div>
      </div>

      {/* Mood-Based Learning Guide */}
      <section>
        <hr className="my-8 border-gray-300" />
        <MoodGuideModal />
      </section>
    </motion.div>
  );
}
