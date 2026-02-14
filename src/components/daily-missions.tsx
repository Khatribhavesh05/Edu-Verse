'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Target, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAchievements } from '@/context/achievement-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Mission {
    id: number;
    title: string;
    completed: boolean;
}

const MISSION_POOL = [
    "Play 1 Mini Game 🎮",
    "Complete 1 Quiz 🧠",
    "Score 50 Points today ⭐",
    "Check the Leaderboard 🏆",
    "Say hi to Orbi 👋",
    "Keep your streak alive 🔥",
    "Find a new Badge 🏅",
    "Explore a new Subject 📚"
];

export function DailyMissions() {
    const { addBonusPoints } = useAchievements();
    const [missions, setMissions] = useState<Mission[]>([]);
    const [bonusGiven, setBonusGiven] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const today = new Date().toDateString();
        const savedDate = localStorage.getItem('daily_mission_date');
        const savedMissions = localStorage.getItem('daily_missions_data');
        const savedBonus = localStorage.getItem('daily_mission_bonus');

        if (savedDate !== today || !savedMissions) {
            // Generate New Missions
            const shuffled = [...MISSION_POOL].sort(() => 0.5 - Math.random());
            const newMissions = shuffled.slice(0, 3).map((title, i) => ({
                id: i,
                title,
                completed: false
            }));

            setMissions(newMissions);
            setBonusGiven(false);

            // Save
            localStorage.setItem('daily_mission_date', today);
            localStorage.setItem('daily_missions_data', JSON.stringify(newMissions));
            localStorage.setItem('daily_mission_bonus', 'false');
        } else {
            // Load Existing
            setMissions(JSON.parse(savedMissions));
            setBonusGiven(savedBonus === 'true');
        }
        setLoading(false);
    }, []);

    const toggleMission = (id: number) => {
        if (bonusGiven) return; // Prevent toggling after completion to keep state clean (optional)

        const updatedMissions = missions.map(m =>
            m.id === id ? { ...m, completed: !m.completed } : m
        );

        setMissions(updatedMissions);
        localStorage.setItem('daily_missions_data', JSON.stringify(updatedMissions));

        // Check Completion
        const allCompleted = updatedMissions.every(m => m.completed);
        if (allCompleted && !bonusGiven) {
            handleAllCompleted();
        }
    };

    const handleAllCompleted = () => {
        setBonusGiven(true);
        localStorage.setItem('daily_mission_bonus', 'true');

        // Reward
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFE55C', '#FFD700', '#FFA500']
            });
            addBonusPoints(20);
        }, 500);
    };

    if (loading) return null;

    const completedCount = missions.filter(m => m.completed).length;
    const progress = (completedCount / missions.length) * 100;

    return (
        <Card className="w-full max-w-md mx-auto border-4 border-yellow-400/50 bg-gradient-to-b from-yellow-50 to-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-2xl font-black text-yellow-600">
                    <div className="flex items-center gap-2">
                        <Target className="w-8 h-8 text-yellow-500 animate-pulse-slow" />
                        Today's Missions
                    </div>
                    <span className="text-sm bg-yellow-200 px-3 py-1 rounded-full text-yellow-800 font-bold">
                        {completedCount}/{missions.length}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="relative h-4 w-full bg-yellow-200/50 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    {/* Missions List */}
                    <div className="space-y-3">
                        {missions.map((mission) => (
                            <motion.div
                                key={mission.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${mission.completed
                                        ? 'bg-yellow-100 border-yellow-400'
                                        : 'bg-white border-slate-200 hover:border-yellow-300'
                                    }`}
                                onClick={() => toggleMission(mission.id)}
                            >
                                <div className={`flex-shrink-0 ${mission.completed ? 'text-green-500' : 'text-slate-300'}`}>
                                    {mission.completed
                                        ? <CheckCircle2 className="w-6 h-6" />
                                        : <Circle className="w-6 h-6" />
                                    }
                                </div>
                                <span className={`font-bold text-lg ${mission.completed ? 'text-slate-500 line-through decoration-2' : 'text-slate-700'}`}>
                                    {mission.title}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bonus Message */}
                    <AnimatePresence>
                        {bonusGiven && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-4 p-4 bg-green-100 border-2 border-green-400 rounded-xl text-center"
                            >
                                <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <h4 className="text-xl font-black text-green-700">Mission Complete!</h4>
                                <p className="font-bold text-green-600">+20 Bonus Points Earned! 🌟</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
}
