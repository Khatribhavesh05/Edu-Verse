'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAchievements } from '@/context/achievement-context';

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

export function MissionBoard() {
    const { addBonusPoints } = useAchievements();
    const [isOpen, setIsOpen] = useState(false);
    const [missions, setMissions] = useState<Mission[]>([]);
    const [bonusGiven, setBonusGiven] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Load / Generate Missions
    useEffect(() => {
        const today = new Date().toDateString();
        const savedDate = localStorage.getItem('daily_mission_date');
        const savedMissions = localStorage.getItem('daily_missions_data');
        const savedBonus = localStorage.getItem('daily_mission_bonus');

        if (savedDate !== today || !savedMissions) {
            const shuffled = [...MISSION_POOL].sort(() => 0.5 - Math.random());
            const newMissions = shuffled.slice(0, 3).map((title, i) => ({
                id: i,
                title,
                completed: false
            }));

            setMissions(newMissions);
            setBonusGiven(false);

            localStorage.setItem('daily_mission_date', today);
            localStorage.setItem('daily_missions_data', JSON.stringify(newMissions));
            localStorage.setItem('daily_mission_bonus', 'false');
        } else {
            setMissions(JSON.parse(savedMissions));
            setBonusGiven(savedBonus === 'true');
        }
    }, []);

    const toggleMission = (id: number) => {
        if (bonusGiven) return;

        const updatedMissions = missions.map(m =>
            m.id === id ? { ...m, completed: !m.completed } : m
        );

        setMissions(updatedMissions);
        localStorage.setItem('daily_missions_data', JSON.stringify(updatedMissions));

        const allCompleted = updatedMissions.every(m => m.completed);
        if (allCompleted && !bonusGiven) {
            handleAllCompleted();
        }
    };

    const handleAllCompleted = () => {
        setBonusGiven(true);
        localStorage.setItem('daily_mission_bonus', 'true');

        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 1000, // Ensure confetti is on top of modal
                colors: ['#FFE55C', '#FFD700', '#FFA500']
            });
            addBonusPoints(20);
        }, 300);
    };

    const completedCount = missions.filter(m => m.completed).length;
    const allDone = completedCount === missions.length && missions.length > 0;

    return (
        <>
            {/* Hanging Board (Trigger) */}
            <div className="absolute top-0 right-4 z-30 pointer-events-none md:right-10">
                {/* Ropes */}
                <div className="flex justify-between w-24 mx-auto relative -top-2">
                    <div className="w-1 h-16 bg-amber-800/80"></div>
                    <div className="w-1 h-16 bg-amber-800/80"></div>
                </div>

                {/* Board */}
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{
                        rotate: [2, -2, 2],
                        y: isHovered ? -5 : 0
                    }}
                    transition={{
                        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 0.3 }
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsOpen(true)}
                    className="relative pointer-events-auto cursor-pointer perspective-1000"
                    style={{ transformOrigin: "top center" }}
                >
                    {/* Glow if all done */}
                    {allDone && (
                        <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 animate-pulse"></div>
                    )}

                    {/* Wooden Sign SVG Shape */}
                    <div
                        className="w-32 h-20 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg border-4 border-amber-950 flex items-center justify-center relative transform overflow-hidden"
                        style={{
                            boxShadow: '0 12px 20px rgba(0,0,0,0.15), 0 25px 40px rgba(124,92,255,0.15)',
                            filter: 'drop-shadow(0 10px 20px rgba(124,92,255,0.3))'
                        }}
                    >
                        {/* Wood Shine & Grain */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10 pointer-events-none"></div>

                        {/* Nails */}
                        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-stone-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-stone-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>

                        <div className="text-center z-10 flex flex-col items-center justify-center h-full pt-1">
                            <div className="text-amber-100/80 text-[10px] font-bold uppercase tracking-widest leading-none mb-0.5">DAILY</div>
                            <div className="text-white font-black text-xl drop-shadow-md leading-none">Missions</div>
                        </div>

                        {/* Notification Bubble */}
                        {!allDone && completedCount > 0 && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm font-bold text-white text-xs animate-bounce">
                                {completedCount}
                            </div>
                        )}
                        {allDone && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm text-white animate-pulse">
                                ✓
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Expanded Mission Panel (Modal) */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: -50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                            className="relative w-full max-w-sm bg-[#fdf6e3] rounded-xl shadow-2xl border-[6px] border-amber-800 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-amber-800 p-4 flex items-center justify-between text-amber-50 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                                <h2 className="text-xl font-black uppercase tracking-wide relative z-10 flex items-center gap-2">
                                    🎯 Daily Missions
                                </h2>
                                <button onClick={() => setIsOpen(false)} className="relative z-10 p-1 hover:bg-white/20 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div className="text-center mb-2">
                                    <p className="text-amber-900/60 font-medium text-sm">Complete all for +20 Bonus Points!</p>
                                </div>

                                <div className="space-y-3">
                                    {missions.map((mission) => (
                                        <motion.div
                                            key={mission.id}
                                            layout
                                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${mission.completed
                                                ? 'bg-green-100 border-green-400'
                                                : 'bg-white border-amber-200 hover:border-amber-400'
                                                }`}
                                            onClick={() => toggleMission(mission.id)}
                                        >
                                            <div className={`flex-shrink-0 ${mission.completed ? 'text-green-600' : 'text-amber-300'}`}>
                                                {mission.completed
                                                    ? <CheckCircle2 className="w-6 h-6" />
                                                    : <Circle className="w-6 h-6" />
                                                }
                                            </div>
                                            <span className={`font-bold ${mission.completed ? 'text-green-800 line-through' : 'text-amber-900'}`}>
                                                {mission.title}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                {bonusGiven && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg text-center"
                                    >
                                        <p className="font-bold text-yellow-700">🌟 All Missions Complete! 🌟</p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Footer decoration */}
                            <div className="h-2 bg-amber-800/50"></div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
