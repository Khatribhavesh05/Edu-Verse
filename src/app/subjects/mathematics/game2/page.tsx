
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Plus, Minus, MoveHorizontal } from 'lucide-react';

const NumberLineGame = () => {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [currentPos, setCurrentPos] = useState(0);
    const [targetPos, setTargetPos] = useState(0);
    const [instructions, setInstructions] = useState<{op: string, val: number}[]>([]);
    const [win, setWin] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
    const [isHintLoading, setIsHintLoading] = useState(false);
    
    const { toast } = useToast();

    const generateLevel = useCallback(() => {
        const start = Math.floor(Math.random() * 11) - 5; // -5 to 5
        const numInstructions = 2 + Math.floor(level / 3);
        let tempPos = start;
        const newInstructions = [];
        for (let i = 0; i < numInstructions; i++) {
            const op = Math.random() > 0.5 ? '+' : '-';
            const val = Math.floor(Math.random() * 5) + 1;
            newInstructions.push({ op, val });
            if (op === '+') tempPos += val;
            else tempPos -= val;
        }
        setCurrentPos(start);
        setInstructions(newInstructions);
        setTargetPos(tempPos);
    }, [level]);

    useEffect(() => {
        if(gameStarted && !win){
            generateLevel();
        }
    }, [level, gameStarted, win, generateLevel]);

    const checkAnswer = (selectedNumber: number) => {
        if (selectedNumber === targetPos) {
            toast({ title: 'Correct!', description: 'You landed on the right number!' });
            setScore(s => s + 10);
            if (level < 10) {
                setLevel(l => l + 1);
            } else {
                setWin(true);
            }
        } else {
            toast({ variant: 'destructive', title: 'Incorrect!', description: `The correct position was ${targetPos}.` });
            setScore(s => Math.max(0, s-5));
            if (level < 10) {
                setLevel(l => l + 1);
            } else {
                setWin(true);
            }
        }
    };

    const handleAskAI = async () => {
        setIsHintLoading(true);
        const question = `Give me a hint for moving on a number line. My starting point is ${currentPos}. The instructions are ${instructions.map(i => `${i.op}${i.val}`).join(', ')}. Explain the first step.`;
        try {
            const res = await generateHint({ question });
            setHint({ title: 'Navigation Hint', description: res.hint });
        } catch (e) {
            setHint({ title: 'Error', description: 'Could not get a hint.' });
        } finally {
            setIsHintLoading(false);
        }
    };

    const startGame = () => {
        setLevel(0);
        setScore(0);
        setWin(false);
        setGameStarted(true);
    };

    const numberRange = Array.from({ length: 21 }, (_, i) => i - 10); // -10 to 10

    if (!gameStarted) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <MoveHorizontal className="w-20 h-20 text-primary mb-4" />
                <h1 className="text-4xl font-bold text-primary mb-4">Number Line Navigation</h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-md">Follow the instructions to find the final position on the number line. Master positive and negative integers!</p>
                <Button onClick={startGame} size="lg">Start Navigating</Button>
            </div>
        );
    }
    
    if (win) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <Confetti recycle={false} />
                <h1 className="text-5xl font-bold text-green-500 mb-4">Expert Navigator!</h1>
                <p className="text-2xl text-foreground mb-8">You've mastered the number line! Final Score: {score}</p>
                <Button onClick={startGame} size="lg">Play Again</Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-primary">Number Line Navigation</h1>
                <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
            </div>

            <div className="text-center p-4 mb-6 bg-background rounded-lg">
                <h2 className="text-2xl text-muted-foreground mb-2">Instructions:</h2>
                <div className="flex justify-center items-center gap-4 text-2xl font-bold text-accent">
                    <span>Start at: {currentPos}</span>
                    {instructions.map((inst, i) => (
                        <span key={i} className="flex items-center gap-1">
                            <span className="text-muted-foreground">then</span> 
                            {inst.op === '+' ? <Plus className="text-green-500" /> : <Minus className="text-red-500" />} {inst.val}
                        </span>
                    ))}
                </div>
            </div>

            <div className="relative h-20 w-full mb-6">
                 <div className="absolute w-full h-1 bg-border top-1/2 -translate-y-1/2"></div>
                 <div className="absolute w-full flex justify-between">
                    {numberRange.map(num => (
                        <div key={num} className="relative flex flex-col items-center">
                            <div className="w-1 h-4 bg-muted-foreground"></div>
                            <span className="text-xs mt-1">{num}</span>
                            <Button variant="ghost" size="icon" onClick={() => checkAnswer(num)} className="absolute -bottom-12 w-8 h-8 rounded-full">
                                {num}
                            </Button>
                        </div>
                    ))}
                 </div>
            </div>


            <div className="text-center mt-20">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary" onClick={handleAskAI}>
                            <Info className="mr-2 h-4 w-4" /> Ask AI
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

export default NumberLineGame;
