'use client';

import { LeaderboardUser, calculateRankScore } from '@/lib/leaderboard-logic';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, ChevronUp, Sparkles } from 'lucide-react';

interface LeaderboardCardProps {
    user: LeaderboardUser;
    index: number;
}

export function LeaderboardCard({ user, index }: LeaderboardCardProps) {
    const isTop3 = index < 3;
    const rank = index + 1;

    // Dynamic styles based on rank
    const getCardStyle = () => {
        if (rank === 1) return 'bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 border-yellow-400 shadow-yellow-200';
        if (rank === 2) return 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border-slate-400 shadow-slate-200';
        if (rank === 3) return 'bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 border-orange-400 shadow-orange-200';
        if (user.isCurrentUser) return 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-400 shadow-blue-200 ring-2 ring-blue-400 ring-offset-2';
        return 'bg-white border-slate-100 shadow-sm';
    };

    const score = calculateRankScore(user);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`relative rounded-3xl p-4 border-2 shadow-lg mb-3 flex items-center justify-between transition-all ${getCardStyle()} ${isTop3 ? 'scale-105 z-10 my-4' : 'hover:scale-[1.01]'}`}
        >
            {/* Visual Rank Indicator */}
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center font-black text-2xl rounded-full ${isTop3 ? 'bg-white/80 shadow-md' : 'bg-slate-100 text-slate-500'}`}>
                    {rank === 1 ? '👑' : rank}
                </div>

                {/* Avatar & Name */}
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-3xl filter drop-shadow-sm">{user.avatar}</span>
                        <div>
                            <h3 className={`font-black text-lg ${user.isCurrentUser ? 'text-blue-700' : 'text-slate-800'}`}>
                                {user.name}
                                {user.isCurrentUser && <span className="ml-2 inline-block px-2 py-0.5 bg-blue-600 text-white text-[10px] uppercase rounded-full tracking-wider">You</span>}
                            </h3>
                            <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                                {user.title}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="flex items-center gap-4 md:gap-8 text-right">
                {/* Badges */}
                <div className="hidden md:block text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase">Badges</div>
                    <div className="font-black text-slate-700 flex items-center justify-center gap-1">
                        <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <Star className="w-3 h-3 fill-current" />
                        </div>
                        {user.badgesUnlocked}
                    </div>
                </div>

                {/* Streak */}
                <div className="hidden md:block text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase">Streak</div>
                    <div className="font-black text-orange-600 flex items-center justify-center gap-1">
                        <Zap className="w-4 h-4 fill-current" />
                        {user.streakDays}
                    </div>
                </div>

                {/* Total Score */}
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rank Score</p>
                    <p className="text-2xl font-black text-slate-800 flex items-center justify-end gap-1">
                        {score.toLocaleString()}
                        {/* Simple movement indicator */}
                        {(rank <= 3) && <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />}
                    </p>
                </div>
            </div>

            {/* Confetti Anchor for Top 1 */}
            {rank === 1 && (
                <div className="absolute -top-2 -right-2 transform rotate-12">
                    <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-yellow-200">
                        Current Leader!
                    </div>
                </div>
            )}
        </motion.div>
    );
}
