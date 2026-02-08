// Game Activity Tracker - Shared state for mini-game activities
// Stores in localStorage and provides real-time access to game data

export interface GameActivity {
  gameId: string;
  gameName: string;
  gameType: 'math' | 'language' | 'science';
  startTime: number;
  endTime?: number;
  totalTime?: number; // in seconds
  correctAnswers: number;
  totalQuestions: number;
  completedAt?: string;
}

export interface DailyGameStats {
  date: string;
  activities: GameActivity[];
}

const STORAGE_KEY = 'eduverse-game-activities';

// Get today's date in YYYY-MM-DD format
function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

// Get all activities for today
export function getTodayActivities(): GameActivity[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const data: DailyGameStats = JSON.parse(stored);
    if (data.date === getTodayDate()) {
      return data.activities;
    }
    return [];
  } catch {
    return [];
  }
}

// Log a game activity
export function logGameActivity(activity: GameActivity): void {
  try {
    const today = getTodayDate();
    let stats: DailyGameStats = { date: today, activities: [] };

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        stats = data;
      }
    }

    // Add the new activity
    const completeActivity: GameActivity = {
      ...activity,
      completedAt: new Date().toISOString(),
      totalTime: activity.endTime ? Math.round((activity.endTime - activity.startTime) / 1000) : undefined,
    };

    stats.activities.push(completeActivity);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));

    // Trigger a storage event for real-time updates
    window.dispatchEvent(new Event('game-activity-updated'));
  } catch (error) {
    console.error('Failed to log game activity:', error);
  }
}

// Start tracking a game (returns startTime)
export function startGameTracking(gameId: string, gameName: string, gameType: 'math' | 'language' | 'science'): number {
  const startTime = Date.now();
  return startTime;
}

// End tracking and log the activity
export function endGameTracking(
  gameId: string,
  gameName: string,
  gameType: 'math' | 'language' | 'science',
  startTime: number,
  correctAnswers: number,
  totalQuestions: number
): void {
  const endTime = Date.now();

  logGameActivity({
    gameId,
    gameName,
    gameType,
    startTime,
    endTime,
    correctAnswers,
    totalQuestions,
  });
}

// Calculate total time spent today (in minutes)
export function getTotalTimeSpentToday(): number {
  const activities = getTodayActivities();
  const totalSeconds = activities.reduce((sum, activity) => sum + (activity.totalTime || 0), 0);
  return Math.round(totalSeconds / 60);
}

// Get unique games played today
export function getGamesPlayedToday(): string[] {
  const activities = getTodayActivities();
  return [...new Set(activities.map((a) => a.gameName))];
}

// Get skills improved today (based on game type)
export function getSkillsImprovedToday(): string[] {
  const activities = getTodayActivities();
  const skillMap: { [key: string]: string } = {
    math: 'Math',
    language: 'Language',
    science: 'Science',
  };

  const skills = [...new Set(activities.map((a) => skillMap[a.gameType]))];
  return skills;
}

// Get strongest area (most correct answers in one skill)
export function getStrongestAreaToday(): string | null {
  const activities = getTodayActivities();
  if (activities.length === 0) return null;

  const skillStats: { [key: string]: { correct: number; total: number } } = {
    Math: { correct: 0, total: 0 },
    Language: { correct: 0, total: 0 },
    Science: { correct: 0, total: 0 },
  };

  const skillMap: { [key: string]: string } = {
    math: 'Math',
    language: 'Language',
    science: 'Science',
  };

  activities.forEach((activity) => {
    const skill = skillMap[activity.gameType];
    if (skill) {
      skillStats[skill].correct += activity.correctAnswers;
      skillStats[skill].total += activity.totalQuestions;
    }
  });

  // Find skill with highest correct answer percentage
  let strongest: { skill: string; percentage: number } | null = null;

  Object.entries(skillStats).forEach(([skill, stats]) => {
    if (stats.total > 0) {
      const percentage = (stats.correct / stats.total) * 100;
      if (!strongest || percentage > strongest.percentage) {
        strongest = { skill, percentage };
      }
    }
  });

  return strongest?.skill || null;
}

// Clear today's activities (for testing or daily reset)
export function clearTodayActivities(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('game-activity-updated'));
  } catch (error) {
    console.error('Failed to clear activities:', error);
  }
}
