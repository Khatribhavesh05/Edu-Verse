'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { getTodayActivities } from '@/lib/game-activity-tracker';
import { getTodayActivitiesFirestore } from '@/lib/firestore-game-activity';
import type { GameActivity } from '@/lib/types/game-activity';

export interface GameStats {
  activities: GameActivity[];
  totalTimeSpent: number;
  gamesPlayed: string[];
  skillsImproved: string[];
  strongestArea: string | null;
}

const skillLabels: Record<string, string> = {
  math: 'Math',
  language: 'Language',
  science: 'Science',
};

function deriveStats(activities: GameActivity[]): GameStats {
  const totalTimeSpent = Math.round(
    activities.reduce((sum, activity) => sum + (activity.totalTime || 0), 0) / 60
  );

  const gamesPlayed = [...new Set(activities.map((activity) => activity.gameName || activity.gameId))];

  const skillsImproved = [...new Set(activities.map((activity) => skillLabels[activity.gameType]).filter(Boolean))];

  const skillStats: Record<string, { correct: number; total: number }> = {
    Math: { correct: 0, total: 0 },
    Language: { correct: 0, total: 0 },
    Science: { correct: 0, total: 0 },
  };

  activities.forEach((activity) => {
    const skillLabel = skillLabels[activity.gameType];
    if (skillLabel) {
      skillStats[skillLabel].correct += activity.correctAnswers;
      skillStats[skillLabel].total += activity.totalQuestions;
    }
  });

  let strongest: string | null = null;
  let highestRatio = 0;

  Object.entries(skillStats).forEach(([skill, stats]) => {
    if (stats.total === 0) return;
    const ratio = stats.correct / stats.total;
    if (ratio > highestRatio) {
      highestRatio = ratio;
      strongest = skill;
    }
  });

  return {
    activities,
    totalTimeSpent,
    gamesPlayed,
    skillsImproved,
    strongestArea: strongest,
  };
}

export function useGameStats(): GameStats {
  const [stats, setStats] = useState<GameStats>(() => deriveStats(getTodayActivities()));

  const refreshFromStorage = () => {
    setStats(deriveStats(getTodayActivities()));
  };

  useEffect(() => {
    let isMounted = true;

    const updateWithFirestore = async (userId: string) => {
      try {
        const firestoreActivities = await getTodayActivitiesFirestore(userId);
        if (!isMounted) return;
        if (firestoreActivities.length > 0) {
          setStats(deriveStats(firestoreActivities));
        }
      } catch (error) {
        console.error('Failed to load activities from Firestore', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        updateWithFirestore(user.uid);
      } else {
        refreshFromStorage();
      }
    });

    const handleStorageUpdate = () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      if (userId) {
        updateWithFirestore(userId);
      } else {
        refreshFromStorage();
      }
    };

    window.addEventListener('game-activity-updated', handleStorageUpdate);

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener('game-activity-updated', handleStorageUpdate);
    };
  }, []);

  return stats;
}
