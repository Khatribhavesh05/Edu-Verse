
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Binary, Brain } from 'lucide-react';
import { shuffle } from 'lodash';
import { playActionStartSound } from '@/lib/sound-effects';

const LEVELS = 10;
const TIME_LIMIT = 15; // seconds per question

const BinaryBlitzGame = () => {
    const [level, setLevel] = useState(0);
    const [decimal, setDecimal] = useState(0);
    const [binary, setBinary] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    
    const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
    const [isHintLoading, setIsHintLoading] = useState(false);

    const timerRef = React.useRef<NodeJS.Timeout>();
    const { toast } = useToast();
    
    const setupLevel = useCallback(() => {
        setTimeLeft(TIME_LIMIT);
        const newDecimal = Math.floor(Math.random() * 100) + 1; // 1 to 100
        setDecimal(newDecimal);
        setBinary("");
    }, []);
    
    useEffect(() => {
        if (gameStarted && !gameOver) {
            setupLevel();
        }
    }, [level, gameStarted, gameOver, setupLevel]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            if (timeLeft <= 0) {
                handleIncorrect();
            } else {
                timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            }
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeLeft, gameStarted, gameOver]);

    const handleIncorrect = () => {
        toast({ variant: "destructive", title: "Incorrect or Time's Up!", description: `The correct binary for ${decimal} is ${decimal.toString(2)}.` });
        goToNextLevel();
    };
    
    const goToNextLevel = useCallback(() => {
         if (level < LEVELS - 1) {
            setLevel(l => l + 1);
        } else {
            setGameOver(true);
        }
    }, [level]);

    const checkAnswer = () => {
        if(timerRef.current) clearTimeout(timerRef.current);
        if (parseInt(binary, 2) === decimal) {
            toast({ title: "Correct!", description: `+10 points! ${decimal} is ${binary} in binary.` });
            setScore(s => s + 10);
        } else {
           handleIncorrect();
           return;
        }
        goToNextLevel();
    };
    
    const handleAskAI = async () => {
        setIsHintLoading(true);
        const question = `Give me a hint on how to convert the decimal number ${decimal} to binary. Don't give the full answer, but explain the first step, like dividing by 2 and checking the remainder.`;
        try {
            const res = await generateHint({ question });
            setHint({ title: `Hint for ${decimal}`, description: res.hint });
        } catch (e) {
            setHint({ title: "Error", description: 'Could not get a hint.' });
        } finally {
            setIsHintLoading(false);
        }
    };

    const startGame = () => {
        playActionStartSound();
        setLevel(0);
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
    };

    if (!gameStarted) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <Binary className="w-20 h-20 text-primary mb-4" />
                <h1 className="text-4xl font-bold text-primary mb-4">Binary Blitz</h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-md">Convert the decimal number to binary before time runs out! Test your speed and knowledge of the binary system.</p>
                <Button onClick={startGame} size="lg">Start Blitz</Button>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <Confetti recycle={false} />
                <h1 className="text-5xl font-bold text-green-500 mb-4">Blitz Complete!</h1>
                <p className="text-3xl mb-8">Final Score: {score}</p>
                <Button onClick={startGame} size="lg">Play Again</Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary">Binary Blitz</h1>
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
                <p className="text-xl text-muted-foreground mb-2">Convert to binary:</p>
                <h2 className="text-5xl font-bold text-accent">{decimal}</h2>
            </div>

            <div className="h-20 text-center text-4xl font-mono tracking-widest p-4 mb-4 bg-muted rounded-lg border-2 border-dashed border-border">
                {binary || <span className="text-muted-foreground">_</span>}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
                <Button onClick={() => setBinary(b => b + '1')} className="h-16 text-4xl" variant="outline">1</Button>
                <Button onClick={() => setBinary(b => b + '0')} className="h-16 text-4xl" variant="outline">0</Button>
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
                <Button onClick={checkAnswer} size="lg">Submit</Button>
                <Button onClick={() => setBinary("")} variant="secondary" size="lg">Clear</Button>
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

export default BinaryBlitzGame;
