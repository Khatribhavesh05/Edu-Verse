'use client';

import React from 'react';
import { useAchievements } from '@/context/achievement-context';
import { BADGES } from '@/lib/badge-config';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function AchievementSection() {
    const { stats } = useAchievements();

    const totalBadges = BADGES.length;
    const unlockedCount = stats.unlockedBadges.length;
    const progressPercentage = (unlockedCount / totalBadges) * 100;

    return (
        <div className="w-full space-y-8 p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-sm">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-800">Your Achievements</h2>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full text-sm">
                        {unlockedCount} / {totalBadges} Unlocked
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-3 bg-slate-100" />
                    <p className="text-xs text-right text-slate-500 font-semibold">
                        {Math.round(progressPercentage)}% Complete
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BADGES.map((badge) => {
                    const isUnlocked = stats.unlockedBadges.includes(badge.id);
                    const Icon = badge.icon;

                    return (
                        <motion.div
                            key={badge.id}
                            whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
                            className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${isUnlocked
                                    ? 'bg-white border-slate-100 shadow-sm'
                                    : 'bg-slate-50 border-slate-100 opacity-60 grayscale-[0.5]'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm ${isUnlocked ? badge.color : 'bg-slate-200 text-slate-400'
                                    }`}>
                                    {isUnlocked ? badge.emoji : <Lock className="w-6 h-6" />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-slate-800 truncate">{badge.name}</h3>
                                        {isUnlocked && (
                                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                                Unlocked
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 leading-snug line-clamp-2">
                                        {badge.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
