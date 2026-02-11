export interface GameActivity {
  gameId: string;
  gameName: string;
  gameType: 'math' | 'language' | 'science';
  startTime: number;
  endTime?: number;
  totalTime?: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt?: string;
}

export interface DailyGameStats {
  date: string;
  activities: GameActivity[];
}
