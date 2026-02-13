
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, ArrowRightLeft, Shuffle, BrainCircuit } from 'lucide-react';
import { shuffle as lodashShuffle } from 'lodash';
import { endGameTracking } from '@/lib/game-activity-tracker';

const LEVELS = [
  { 
    name: "Bubble Sort Challenge", 
    description: "Sort the list by repeatedly swapping adjacent elements if they are in the wrong order.",
    initialArray: [5, 3, 8, 4, 2] 
  },
  { 
    name: "Selection Sort Challenge", 
    description: "Find the smallest element in the unsorted part and swap it with the first element.",
    initialArray: [64, 25, 12, 22, 11]
  },
];

const SortingChallengeGame = () => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [array, setArray] = useState<number[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const { toast } = useToast();

  const currentLevel = useMemo(() => LEVELS[levelIndex], [levelIndex]);

  const handleSelect = (index: number) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else if (selectedIndices.length < 2) {
      setSelectedIndices([...selectedIndices, index]);
    }
  };
  
  const isSorted = (arr: number[]) => {
      for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] > arr[i+1]) return false;
      }
      return true;
  }

  const handleSwap = () => {
    if (selectedIndices.length !== 2) {
      toast({ variant: 'destructive', title: 'Select two bars to swap.' });
      return;
    }
    const newArray = [...array];
    const [index1, index2] = selectedIndices;
    [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
    setArray(newArray);
    setSelectedIndices([]);
    setScore(s => s - 1); // Penalize for swaps to encourage efficiency
    
    if (isSorted(newArray)) {
        setScore(s => s + 50); // Bonus for sorting
        toast({ title: 'Level Complete!', description: 'You sorted the array!' });
         if (levelIndex < LEVELS.length - 1) {
            setLevelIndex(i => i + 1);
            setArray(lodashShuffle(LEVELS[levelIndex + 1].initialArray));
        } else {
            endGameTracking('computer-science-sorting', 'Data Structure Drills', 'computer-science', startTime, LEVELS.length, LEVELS.length);
            setWin(true);
        }
    }
  };
  
  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `I am trying to solve the "${currentLevel.name}". My current array is [${array.join(', ')}]. What would be a good next swap to make?`;
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
    setScore(100);
    setLevelIndex(0);
    setArray(lodashShuffle(LEVELS[0].initialArray));
    setSelectedIndices([]);
    setWin(false);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <BrainCircuit className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-4">Data Structure Drills</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">Learn sorting algorithms by doing! Select two bars and swap them to sort the list. Aim for the fewest swaps.</p>
        <Button onClick={startGame} size="lg">Start Sorting</Button>
      </div>
    );
  }

  if (win) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Confetti recycle={false} />
        <h1 className="text-5xl font-bold text-green-500 mb-4">Algorithm Ace!</h1>
        <p className="text-2xl text-foreground mb-8">You've mastered the sorting challenges! Final Score: {score}</p>
        <Button onClick={startGame} size="lg">Play Again</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary">{currentLevel.name}</h1>
        <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
      </div>
      <p className="text-center text-muted-foreground mb-6">{currentLevel.description}</p>
      
      <div className="flex justify-center items-end h-80 gap-1 bg-background p-4 rounded-lg">
        {array.map((value, index) => (
          <motion.div
            key={index}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => handleSelect(index)}
            className={`flex-1 rounded-t-md cursor-pointer relative flex items-end justify-center ${selectedIndices.includes(index) ? 'bg-yellow-400' : 'bg-primary'}`}
            style={{ height: `${(value / Math.max(...array)) * 100}%` }}
          >
              <span className='absolute -top-6 font-bold text-lg text-primary'>{value}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-4 my-6">
        <Button onClick={handleSwap} disabled={selectedIndices.length !== 2} size="lg">
            <ArrowRightLeft className="mr-2" /> Swap
        </Button>
        <Button onClick={() => setArray(lodashShuffle(currentLevel.initialArray))} variant="outline" size="lg">
            <Shuffle className="mr-2" /> Reset Level
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="lg" onClick={handleAskAI}>
              <Info className="mr-2" /> Ask AI
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

export default SortingChallengeGame;
