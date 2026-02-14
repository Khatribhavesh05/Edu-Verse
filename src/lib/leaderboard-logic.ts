import { Badge } from '@/lib/badge-config';

export interface LeaderboardUser {
    id: string;
    name: string;
    avatar: string; // Emoji
    totalPoints: number;
    gamesPlayed: number;
    streakDays: number;
    badgesUnlocked: number;
    isCurrentUser: boolean;
    rank?: number;
    title?: string;
    previousRank?: number; // For tracking movement
}

// 🏆 Calculate Rank Score based on the secret formula
// Score = Points + (Badges * 50) + (Streak * 20)
export function calculateRankScore(user: LeaderboardUser): number {
    return user.totalPoints + (user.badgesUnlocked * 50) + (user.streakDays * 20);
}

// 🏷️ Assign fun titles based on rank
export function getRankTitle(rank: number): string {
    if (rank === 1) return '🥇 Super Star';
    if (rank === 2) return '🥈 Rising Rocket';
    if (rank === 3) return '🥉 Bright Explorer';
    if (rank <= 5) return '🌟 Daily Hero';
    if (rank <= 10) return '🚀 Learning Champ';
    return '✨ Curious Learner';
}

// 🐣 Generate fake friends for the leaderboard
export function generateMockLeaderboard(): LeaderboardUser[] {
    const names = [
        'Alex T.', 'Sarah M.', 'Jayden K.', 'Emma R.', 'Liam P.',
        'Mia W.', 'Noah B.', 'Olivia S.', 'William C.', 'Sophia L.'
    ];

    const avatars = ['🦁', '🐯', '🐼', '🐨', '🦊', '🐰', '🦄', '🦖', '🐉', '🐳'];

    return names.map((name, index) => {
        // Generate somewhat realistic stats
        const badges = Math.floor(Math.random() * 8) + 1;
        const streak = Math.floor(Math.random() * 7) + 1;
        const games = Math.floor(Math.random() * 20) + 5;
        const points = (games * 100) + Math.floor(Math.random() * 500);

        return {
            id: `bot-${index}`,
            name,
            avatar: avatars[index],
            totalPoints: points,
            gamesPlayed: games,
            streakDays: streak,
            badgesUnlocked: badges,
            isCurrentUser: false,
        };
    });
}

// 🔢 Sort users by the special formula
export function sortLeaderboard(users: LeaderboardUser[]): LeaderboardUser[] {
    const sorted = [...users].sort((a, b) => {
        const scoreA = calculateRankScore(a);
        const scoreB = calculateRankScore(b);
        return scoreB - scoreA; // Descending
    });

    // Assign ranks
    return sorted.map((user, index) => ({
        ...user,
        rank: index + 1,
        title: getRankTitle(index + 1),
    }));
}
