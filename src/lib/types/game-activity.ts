export interface GameActivity {
  gameId: string;
  gameName: string;
  gameType: 'math' | 'language' | 'science' | 'computer-science' | 'general-knowledge' | 'social-studies';
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
