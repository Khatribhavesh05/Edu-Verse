import { LucideIcon, Award, Star, Zap, Flame, Target } from 'lucide-react';

export interface Badge {
    id: string;
    name: string;
    description: string;
    emoji: string;
    color: string;
    condition: (stats: { gamesPlayed: number; totalScore: number; streakCount: number }) => boolean;
    icon: any; // Lucide icon
}

export const BADGES: Badge[] = [
    {
        id: 'beginner-explorer',
        name: 'Beginner Explorer',
        description: 'Play your first 2 games to unlock this badge!',
        emoji: '🧭',
        color: 'bg-blue-100 text-blue-600 border-blue-200',
        icon: Award,
        condition: (stats) => stats.gamesPlayed >= 2,
    },
    {
        id: 'game-starter',
        name: 'Game Starter',
        description: 'Play 3 games to show you are ready for adventure!',
        emoji: '🎮',
        color: 'bg-green-100 text-green-600 border-green-200',
        icon: Target,
        condition: (stats) => stats.gamesPlayed >= 3,
    },
    {
        id: 'quiz-master',
        name: 'Quiz Master',
        description: 'Score 80% or higher in a game to prove your mastery!',
        // Note: This check usually happens right after a game finishes, 
        // where we check if the *just completed* game had >80% score. 
        // But for this persistent config, we'll assume 'totalScore' tracks high scores or similar. 
        // For simplicity in this demo, let's say "Total accumulated score > 500" or similar, 
        // OR we change the condition logic to accept a "current game score" param.
        // To stick to the user's request "Score >= 80%", we'll handle this logic in the context's update function 
        // by passing the latest game's score.
        emoji: '🧠',
        color: 'bg-purple-100 text-purple-600 border-purple-200',
        icon: Star,
        // We'll treat 'totalScore' as 'highest score achieved' for this specific badge in our simple logic,
        // OR we relies on the context to check this specific condition explicitly when a game ends.
        condition: () => false, // Special case triggered manually with score
    },
    {
        id: 'consistency-star',
        name: 'Consistency Star',
        description: 'Maintain a 3-day learning streak!',
        emoji: '🔥',
        color: 'bg-orange-100 text-orange-600 border-orange-200',
        icon: Flame,
        condition: (stats) => stats.streakCount >= 3,
    },
];
