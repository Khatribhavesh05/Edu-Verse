import { useState, useEffect } from 'react';
import {
  getTodayActivities,
  getTotalTimeSpentToday,
  getGamesPlayedToday,
  getSkillsImprovedToday,
  getStrongestAreaToday,
  type GameActivity,
} from '@/lib/game-activity-tracker';

export interface GameStats {
  activities: GameActivity[];
  totalTimeSpent: number;
  gamesPlayed: string[];
  skillsImproved: string[];
  strongestArea: string | null;
}

// Hook to get real-time game statistics
export function useGameStats(): GameStats {
  const [stats, setStats] = useState<GameStats>(() => ({
    activities: getTodayActivities(),
    totalTimeSpent: getTotalTimeSpentToday(),
    gamesPlayed: getGamesPlayedToday(),
    skillsImproved: getSkillsImprovedToday(),
    strongestArea: getStrongestAreaToday(),
  }));

  useEffect(() => {
    // Update stats immediately
    const updateStats = () => {
      setStats({
        activities: getTodayActivities(),
        totalTimeSpent: getTotalTimeSpentToday(),
        gamesPlayed: getGamesPlayedToday(),
        skillsImproved: getSkillsImprovedToday(),
        strongestArea: getStrongestAreaToday(),
      });
    };

    // Listen for game activity updates
    window.addEventListener('game-activity-updated', updateStats);

    return () => {
      window.removeEventListener('game-activity-updated', updateStats);
    };
  }, []);

  return stats;
}
