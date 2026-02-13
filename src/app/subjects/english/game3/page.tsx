
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, MessageCircle } from 'lucide-react';
import { shuffle } from 'lodash';
import { endGameTracking } from '@/lib/game-activity-tracker';

const WORD_PAIRS = [
    { word: "Happy", synonym: "Joyful", distractors: ["Sad", "Angry", "Tired"] },
    { word: "Fast", synonym: "Quick", distractors: ["Slow", "Large", "Heavy"] },
    { word: "Brave", synonym: "Courageous", distractors: ["Scared", "Timid", "Weak"] },
    { word: "Big", synonym: "Large", distractors: ["Small", "Tiny", "Short"] },
    { word: "Sad", synonym: "Unhappy", distractors: ["Happy", "Excited", "Glad"] },
    { word: "Smart", synonym: "Intelligent", distractors: ["Dumb", "Foolish", "Simple"] },
    { word: "Kind", synonym: "Considerate", distractors: ["Cruel", "Mean", "Rude"] },
    { word: "Strong", synonym: "Powerful", distractors: ["Weak", "Frail", "Delicate"] },
];

const TIME_LIMIT = 10; // seconds per question

const SynonymSprintGame = () => {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [options, setOptions] = useState<string[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    
    const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
    const [isHintLoading, setIsHintLoading] = useState(false);
    const [startTime] = useState<number>(Date.now());

    const timerRef = React.useRef<NodeJS.Timeout>();
    const { toast } = useToast();
    const currentPair = useMemo(() => WORD_PAIRS[level], [level]);

    const setupLevel = useCallback(() => {
        setTimeLeft(TIME_LIMIT);
        if (currentPair) {
            setOptions(shuffle([currentPair.synonym, ...currentPair.distractors]));
        }
    }, [currentPair]);
    
    useEffect(() => {
        if (gameStarted && !gameOver) {
            setupLevel();
        }
    }, [level, gameStarted, gameOver, setupLevel]);

    useEffect(() => {
        if (gameStarted && !gameOver && currentPair) {
            if (timeLeft <= 0) {
                handleAnswer(null); // Time's up
            } else {
                timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            }
        }
        return () => {
            if(timerRef.current) clearTimeout(timerRef.current)
        };
    }, [timeLeft, gameStarted, gameOver, currentPair]);

    const handleAnswer = (answer: string | null) => {
        if(timerRef.current) clearTimeout(timerRef.current);
        if (answer === currentPair.synonym) {
            toast({ title: "Correct!", description: "+10 points!" });
            setScore(s => s + 10);
        } else {
            toast({ variant: "destructive", title: "Incorrect!", description: `The correct synonym for ${currentPair.word} is ${currentPair.synonym}.` });
        }

        if (level < WORD_PAIRS.length - 1) {
            setLevel(l => l + 1);
        } else {
            endGameTracking('language-synonym-sprint', 'Synonym Sprint', 'language', startTime, score / 10, WORD_PAIRS.length);
            setGameOver(true);
        }
    };
    
    const handleAskAI = async () => {
        setIsHintLoading(true);
        const question = `Give me a hint for a synonym of the word "${currentPair.word}". Use it in a sentence to give me context.`;
        try {
            const res = await generateHint({ question });
            setHint({ title: `Hint for "${currentPair.word}"`, description: res.hint });
        } catch (e) {
            setHint({ title: "Error", description: 'Could not get a hint.' });
        } finally {
            setIsHintLoading(false);
        }
    };

    const startGame = () => {
        setLevel(0);
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
    };

    if (!gameStarted) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <MessageCircle className="w-20 h-20 text-primary mb-4" />
                <h1 className="text-4xl font-bold text-primary mb-4">Synonym Sprint</h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-md">Race against the clock to find the correct synonym for the given word. How high can you score?</p>
                <Button onClick={startGame} size="lg">Start Sprinting</Button>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <Confetti recycle={false} />
                <h1 className="text-5xl font-bold text-green-500 mb-4">Sprint Finished!</h1>
                <p className="text-3xl mb-8">Final Score: {score}</p>
                <Button onClick={startGame} size="lg">Play Again</Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary">Synonym Sprint</h1>
                <div className="text-2xl font-bold text-green-500">Score: {score}</div>
            </div>

            <div className="text-center mb-8">
                <div className="text-3xl font-bold mb-2">Time Left: <span className="text-red-500">{timeLeft}</span></div>
                <div className="w-full bg-secondary rounded-full h-4">
                    <motion.div
                        className="bg-red-500 h-4 rounded-full"
                        initial={{ width: '100%' }}
                        animate={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                    />
                </div>
            </div>
            
            <div className="text-center p-8 mb-8 bg-background rounded-lg">
                <p className="text-xl text-muted-foreground mb-2">Find the synonym for:</p>
                <h2 className="text-5xl font-bold text-accent">{currentPair.word}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
                {options.map(option => (
                    <Button key={option} onClick={() => handleAnswer(option)} className="h-20 text-2xl" variant="outline">
                        {option}
                    </Button>
                ))}
            </div>

            <div className="text-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary" onClick={handleAskAI}>
                            <Info className="mr-2 h-4 w-4" /> Ask AI for a Hint
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card border-primary">
                        <DialogHeader><DialogTitle className="text-primary">{hint.title}</DialogTitle></DialogHeader>
                        {isHintLoading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div> : <p>{hint.description}</p>}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default SynonymSprintGame;
