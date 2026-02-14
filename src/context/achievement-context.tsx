'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Badge, BADGES } from '@/lib/badge-config';
import { useToast } from '@/hooks/use-toast';

interface AchievementState {
    gamesPlayed: number;
    totalScore: number;
    streakCount: number;
    unlockedBadges: string[]; // List of badge IDs
}

interface AchievementContextType {
    stats: AchievementState;
    latestUnlockedBadge: Badge | null;
    clearLatestBadge: () => void;
    updateProgress: (updates: Partial<AchievementState>, currentGameScore?: number) => void;
    addBonusPoints: (amount: number) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
    const [stats, setStats] = useState<AchievementState>({
        gamesPlayed: 0,
        totalScore: 0,
        streakCount: 0,
        unlockedBadges: [],
    });

    const [latestUnlockedBadge, setLatestUnlockedBadge] = useState<Badge | null>(null);
    const { toast } = useToast();

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('eduverse_achievements');
        if (saved) {
        const [pendingBadge, setPendingBadge] = useState<Badge | null>(null);
            try {
                setStats(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse achievements', e);
            }
        }
    }, []);

    // Save to localStorage whenever stats change
    useEffect(() => {
        localStorage.setItem('eduverse_achievements', JSON.stringify(stats));
    }, [stats]);

    // Listen for game completion events
    useEffect(() => {
        const handleGameCompletion = (event: Event) => {
            const customEvent = event as CustomEvent;
            const activity = customEvent.detail;

            if (!activity) return;

            console.log('🏆 Achievement System: Processing game completion', activity);

            setStats((prev) => {
                // Calculate new stats
                const newGamesPlayed = prev.gamesPlayed + 1;
                // Note: GameActivity interface in types/game-activity.ts doesn't explicitly have 'score', 
                // it has 'correctAnswers' and 'totalQuestions'.
                // Let's calculate score as percentage or just count correct answers? 
                // User said "Score >= 80%".

                const score = activity.totalQuestions > 0
                    ? Math.round((activity.correctAnswers / activity.totalQuestions) * 100)
                    : 0;

                // Streak logic (Simplified)
                // If last played date was yesterday, increment streak. 
                // If today, keep same. 
                // If older, reset to 1.
                const today = new Date().toDateString();
                const lastPlayed = localStorage.getItem('eduverse_last_played_date');

                let newStreak = prev.streakCount;

                if (lastPlayed !== today) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);

                    if (lastPlayed === yesterday.toDateString()) {
                        newStreak += 1;
                    } else {
                        newStreak = 1; // Reset or start new
                    }
                    localStorage.setItem('eduverse_last_played_date', today);
                }

                const updates = {
                    gamesPlayed: newGamesPlayed,
                    totalScore: prev.totalScore + activity.correctAnswers, // Adding correct answers to totalScore
                    streakCount: newStreak
                };

                // We need to call a helper to check badges because we can't call updateProgress inside setStats easily 
                // without causing looping or staleness if we aren't careful.
                // But we CAN reuse the logic of updateProgress if we move it out or just duplicate the check here.
                // To be clean, we will do the check here.

                const nextStats = { ...prev, ...updates };
                const newlyUnlocked: string[] = [];

                BADGES.forEach((badge) => {
                    if (!prev.unlockedBadges.includes(badge.id)) {
                        let isUnlocked = false;

                        // Special case for 'Quiz Master' (Score >= 80%)
                        if (badge.id === 'quiz-master') {
                            if (score >= 80) isUnlocked = true;
                        }
                        // Default condition check
                        else if (badge.condition(nextStats)) {
                            isUnlocked = true;
                        }

                        if (isUnlocked) {
                            newlyUnlocked.push(badge.id);
                            setLatestUnlockedBadge(badge);
                            toast({
                                title: "🏆 Achievement Unlocked!",
                                description: badge.name,
                                duration: 5000,
                            });
                        }
                    }
                });

                if (newlyUnlocked.length > 0) {
                    return {
                        ...nextStats,
                        unlockedBadges: [...prev.unlockedBadges, ...newlyUnlocked],
                    };
                }

                return nextStats;
            });
        };

        window.addEventListener('eduverse:game-completed', handleGameCompletion);
        return () => window.removeEventListener('eduverse:game-completed', handleGameCompletion);
    }, [toast]);

    const updateProgress = (updates: Partial<AchievementState>, currentGameScore?: number) => {
        setStats((prev) => {
            const newStats = { ...prev, ...updates };

            // If we are updating gamesPlayed, increment it. 
            // Note: The caller might pass the *new* total, or we might want to just increment.
            // For this implementation, let's assume 'updates' contains the *additions* to the stats 
            // for numbers (like score adding up), OR acts as a patch.
            // Actually, to be safe, let's treat numeric updates as "set new value" or "increment"?
            // User requirement: "Increment gamesPlayed". 
            // Let's assume the caller handles the increment logic or we do it here.
            // Let's stick to: "updates" contains the NEW values for absolute counters (streak), 
            // but maybe we specifically handle gamesPlayed incrementing.

            // Simpler approach: Caller calls updateProgress({ gamesPlayed: stats.gamesPlayed + 1 })
            // So 'newStats' is already correct.

            // Check for new unlocks
            const newlyUnlocked: string[] = [];

            BADGES.forEach((badge) => {
                if (!prev.unlockedBadges.includes(badge.id)) {
        // Effect to show toast and set latest badge when a badge is pending
        useEffect(() => {
            if (pendingBadge) {
                setLatestUnlockedBadge(pendingBadge);
                toast({
                    title: "🏆 Achievement Unlocked!",
                    description: pendingBadge.name,
                    duration: 5000,
                });
                setPendingBadge(null);
            }
        }, [pendingBadge, toast]);
                    let isUnlocked = false;

                    // Special case for 'Quiz Master' (Score >= 80%)
                    if (badge.id === 'quiz-master' && currentGameScore !== undefined) {
                        if (currentGameScore >= 80) isUnlocked = true;
                    }
                    // Default condition check
                    else if (badge.condition(newStats)) {
                        isUnlocked = true;
                    }

                    if (isUnlocked) {
                        newlyUnlocked.push(badge.id);
                        setLatestUnlockedBadge(badge);
                        toast({
                            title: "🏆 Achievement Unlocked!",
                            description: badge.name,
                            duration: 5000,
                        });
                    }
                }
            });

            if (newlyUnlocked.length > 0) {
                return {
                    ...newStats,
                    unlockedBadges: [...prev.unlockedBadges, ...newlyUnlocked],
                };
            }

            return newStats;
        });
    };

    const addBonusPoints = (amount: number) => {
        setStats((prev) => {
            const newStats = {
                ...prev,
                totalScore: prev.totalScore + amount
            };

            // Check for badges that depend on total score (if any)
            // Re-using the check logic would be ideal, but for now we just update score.
            // Most badges are games/streak based. "Point Millionaire" isn't in config yet but could be.

            return newStats;
        });

        toast({
            title: "🌟 Bonus Points!",
            description: `You earned ${amount} points!`,
            className: "bg-yellow-100 border-yellow-400 text-yellow-800",
            duration: 3000,
        });
    };

    const clearLatestBadge = () => setLatestUnlockedBadge(null);

    return (
        <AchievementContext.Provider value={{ stats, latestUnlockedBadge, clearLatestBadge, updateProgress, addBonusPoints }}>
            {children}
        </AchievementContext.Provider>
    );
}

export function useAchievements() {
    const context = useContext(AchievementContext);
    if (context === undefined) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
}
