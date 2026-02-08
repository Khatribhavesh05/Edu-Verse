
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, CircuitBoard, Check, X } from 'lucide-react';
import { shuffle } from 'lodash';

const LEVELS = [
    { name: "AND Gate", inputs: [true, true], output: true, gates: ['AND', 'OR', 'NOT'] },
    { name: "OR Gate", inputs: [false, true], output: true, gates: ['AND', 'OR', 'NOT'] },
    { name: "NOT Gate", inputs: [true], output: false, gates: ['AND', 'OR', 'NOT'] },
    { name: "NAND Gate (NOT AND)", inputs: [true, true], output: false, gates: ['AND', 'OR', 'NOT'] },
    { name: "NOR Gate (NOT OR)", inputs: [false, false], output: true, gates: ['AND', 'OR', 'NOT'] },
];

const LogicGateLabyrinthGame = () => {
    const [levelIndex, setLevelIndex] = useState(0);
    const [selectedGate, setSelectedGate] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [win, setWin] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
    const [isHintLoading, setIsHintLoading] = useState(false);
    const { toast } = useToast();

    const currentLevel = useMemo(() => LEVELS[levelIndex], [levelIndex]);

    const checkCombination = () => {
        if (!selectedGate) {
            toast({ variant: 'destructive', title: 'No Gate Selected', description: "Please select a logic gate to test." });
            return;
        }

        let result;
        const [input1, input2] = currentLevel.inputs;

        switch (selectedGate) {
            case 'AND':
                result = input1 && input2;
                break;
            case 'OR':
                result = input1 || input2;
                break;
            case 'NOT':
                // For NOT, we only consider the first input.
                result = !input1;
                break;
            default:
                result = false;
        }
        
        // This is a simplified model, let's adjust for NAND/NOR
        if (currentLevel.name === "NAND Gate (NOT AND)") {
            if (selectedGate === 'AND') { // A bit of a fudge, player must know NAND is NOT-AND
                result = !(input1 && input2);
            }
        }
        if (currentLevel.name === "NOR Gate (NOT OR)") {
             if (selectedGate === 'OR') {
                result = !(input1 || input2);
            }
        }


        if (result === currentLevel.output) {
            setScore(s => s + 10);
            toast({ title: 'Correct!', description: `The ${selectedGate} gate produced the correct output!` });
            if (levelIndex < LEVELS.length - 1) {
                setLevelIndex(i => i + 1);
            } else {
                setWin(true);
            }
            setSelectedGate(null);
        } else {
            toast({ variant: 'destructive', title: 'Incorrect Logic', description: `The ${selectedGate} gate did not produce the expected output. Try again!` });
        }
    };

    const handleAskAI = async () => {
        setIsHintLoading(true);
        const question = `I'm stuck on a logic gate puzzle. The goal is to produce an output of '${currentLevel.output}' from inputs '${currentLevel.inputs.join(', ')}'. Can you explain what an AND gate does?`;
        try {
            const res = await generateHint({ question });
            setHint({ title: `Hint for ${currentLevel.name}`, description: res.hint });
        } catch (error) {
            setHint({ title: "Error", description: "Could not get a hint." });
        } finally {
            setIsHintLoading(false);
        }
    };

    const startGame = () => {
        setScore(0);
        setLevelIndex(0);
        setSelectedGate(null);
        setWin(false);
        setGameStarted(true);
    };

    if (!gameStarted) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <CircuitBoard className="w-20 h-20 text-primary mb-4" />
                <h1 className="text-4xl font-bold text-primary mb-4">Logic Gate Labyrinth</h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-md">Choose the correct logic gate to process the inputs and achieve the target output. Master the fundamentals of digital circuits!</p>
                <Button onClick={startGame} size="lg">Enter Labyrinth</Button>
            </div>
        );
    }
    
    if (win) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <Confetti recycle={false} />
                <h1 className="text-5xl font-bold text-green-500 mb-4">Master of Logic!</h1>
                <p className="text-2xl text-foreground mb-8">You've solved all the puzzles! Final Score: {score}</p>
                <Button onClick={startGame} size="lg">Play Again</Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Logic Gate Labyrinth</h1>
                <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
            </div>

            <div className="text-center p-4 mb-6 bg-background rounded-lg">
                <h2 className="text-2xl text-foreground">Mission: Replicate the <span className="font-bold text-accent">{currentLevel.name}</span></h2>
            </div>
            
            <div className="grid grid-cols-3 items-center justify-items-center gap-4 mb-8 text-center">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Inputs</h3>
                    <div className="flex gap-4 justify-center">
                        {currentLevel.inputs.map((input, i) => (
                            <div key={i} className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${input ? 'bg-green-500' : 'bg-red-500'}`}>{input ? '1' : '0'}</div>
                        ))}
                    </div>
                </div>
                <div className="text-5xl font-thin text-muted-foreground">➔</div>
                 <div>
                    <h3 className="text-xl font-semibold mb-2">Required Output</h3>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white ${currentLevel.output ? 'bg-green-500' : 'bg-red-500'}`}>{currentLevel.output ? '1' : '0'}</div>
                </div>
            </div>

            <div className="p-4 bg-background rounded-lg mb-6">
                <h3 className="text-xl text-center mb-4 font-semibold">Choose Your Gate</h3>
                <div className="flex justify-center items-center gap-4">
                    {currentLevel.gates.map(gate => (
                        <Button key={gate} onClick={() => setSelectedGate(gate)} variant={selectedGate === gate ? 'default' : 'outline'} className="w-24 h-24 flex-col text-lg">
                            <CircuitBoard className="w-8 h-8 mb-1" />
                            {gate}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Button onClick={checkCombination} size="lg" disabled={!selectedGate}>Test Circuit</Button>
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

export default LogicGateLabyrinthGame;
