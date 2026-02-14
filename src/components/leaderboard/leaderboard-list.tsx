'use client';

import { useState, useEffect } from 'react';
import { LeaderboardUser, calculateRankScore, generateMockLeaderboard, sortLeaderboard } from '@/lib/leaderboard-logic';
import { LeaderboardCard } from './leaderboard-card';
import { useAchievements } from '@/context/achievement-context';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/auth-provider';

export function LeaderboardList() {
    const { user } = useAuth();
    const { stats } = useAchievements();
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
    const [firstLoad, setFirstLoad] = useState(true);

    // Initialize Leaderboard
    useEffect(() => {
        // Generate mock users and add current user
        const mockUsers = generateMockLeaderboard();

        // Create current user object
        const currentUser: LeaderboardUser = {
            id: user?.uid || 'guest',
            name: user?.displayName || (user?.email?.split('@')?.[0] ?? 'Explorer'),
            avatar: '🧑‍🚀', // Custom avatar for user
            totalPoints: stats?.totalScore ?? 0,
            gamesPlayed: stats?.gamesPlayed ?? 0,
            streakDays: stats?.streakCount ?? 0,
            badgesUnlocked: stats?.unlockedBadges?.length ?? 0,
            isCurrentUser: true,
        };

        // Initial Sort
        const initialList = sortLeaderboard([...mockUsers, currentUser]);
        setLeaderboardData(initialList);
        setFirstLoad(false);

    }, [stats, user]);

    // Simulate "Live Updates" (Random point increments for bots)
    useEffect(() => {
        const interval = setInterval(() => {
            setLeaderboardData((prev) => {
                // Randomly pick a bot to gain points
                const updated = prev.map((u) => {
                    if (!u.isCurrentUser && Math.random() > 0.7) {
                        return { ...u, totalPoints: u.totalPoints + Math.floor(Math.random() * 50) };
                    }
                    // Also update current user stats in case they changed in context
                    if (u.isCurrentUser) {
                        return {
                            ...u,
                            totalPoints: stats?.totalScore ?? 0,
                            gamesPlayed: stats?.gamesPlayed ?? 0,
                            streakDays: stats?.streakCount ?? 0,
                            badgesUnlocked: stats?.unlockedBadges?.length ?? 0,
                        }
                    }
                    return u;
                });

                return sortLeaderboard(updated);
            });
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [stats]);


    return (
        <div className="max-w-3xl mx-auto space-y-4">
            {/* Header Stats for User */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <div className="text-sm font-bold text-slate-400 uppercase">Your Rank</div>
                    <div className="text-3xl font-black text-slate-800">
                        #{leaderboardData.find(u => u.isCurrentUser)?.rank || '-'}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <div className="text-sm font-bold text-slate-400 uppercase">Score</div>
                    <div className="text-3xl font-black text-blue-600">
                        {leaderboardData.find(u => u.isCurrentUser) ? calculateRankScore(leaderboardData.find(u => u.isCurrentUser)!).toLocaleString() : 0}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <div className="text-sm font-bold text-slate-400 uppercase">Title</div>
                    <div className="text-sm font-black text-purple-600 mt-2 truncate px-2">
                        {leaderboardData.find(u => u.isCurrentUser)?.title || 'Newbie'}
                    </div>
                </div>
            </div>

            <AnimatePresence mode='popLayout'>
                {leaderboardData.map((user, index) => (
                    <LeaderboardCard key={user.id} user={user} index={index} />
                ))}
            </AnimatePresence>
        </div>
    );
}
