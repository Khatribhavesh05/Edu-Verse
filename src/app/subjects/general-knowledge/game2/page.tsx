
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Shapes } from 'lucide-react';
import { shuffle } from 'lodash';

const CATEGORIES = [
  { category: "Planets", items: ["Mars", "Venus", "Earth"], oddOneOut: "Moon" },
  { category: "Oceans", items: ["Atlantic", "Pacific", "Indian"], oddOneOut: "Nile" },
  { category: "Programming Languages", items: ["Python", "Java", "C++"], oddOneOut: "HTML" },
  { category: "Mammals", items: ["Whale", "Bat", "Elephant"], oddOneOut: "Penguin" },
  { category: "Units of Time", items: ["Second", "Minute", "Hour"], oddOneOut: "Meter" },
  { category: "Capital Cities", items: ["Paris", "Tokyo", "London"], oddOneOut: "New York" },
  { category: "Primary Colors", items: ["Red", "Blue", "Yellow"], oddOneOut: "Green" },
  { category: "Authors", items: ["Shakespeare", "Dickens", "Twain"], oddOneOut: "Einstein" },
];

const CategoryConundrumGame = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [shuffledCategories, setShuffledCategories] = useState(CATEGORIES);
  
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  
  const { toast } = useToast();
  const currentCategory = useMemo(() => shuffledCategories[level], [shuffledCategories, level]);

  const setupLevel = useCallback(() => {
    if (currentCategory) {
      setOptions(shuffle([...currentCategory.items, currentCategory.oddOneOut]));
    }
  }, [currentCategory]);
  
  useEffect(() => {
    if (gameStarted) {
      setupLevel();
    }
  }, [level, gameStarted, setupLevel]);

  const handleAnswer = (selected: string) => {
    if (selected === currentCategory.oddOneOut) {
      toast({ title: 'Correct!', description: `"${selected}" is not one of the ${currentCategory.category}!` });
      setScore(s => s + 10);
    } else {
      toast({ variant: 'destructive', title: 'Incorrect!', description: `"${selected}" fits in the category. The odd one out was "${currentCategory.oddOneOut}".` });
    }

    if (level < shuffledCategories.length - 1) {
      setLevel(l => l + 1);
    } else {
      setWin(true);
    }
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `I'm trying to find the odd one out from the category "${currentCategory.category}". The options are ${options.join(', ')}. Give me a hint about the category definition.`;
    try {
      const res = await generateHint({ question });
      setHint({ title: `Hint for ${currentCategory.category}`, description: res.hint });
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
    setShuffledCategories(shuffle(CATEGORIES));
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Shapes className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-4">Category Conundrum</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">Find the item that doesn't belong. Sharpen your categorical thinking and general knowledge!</p>
        <Button onClick={startGame} size="lg">Start Challenge</Button>
      </div>
    );
  }

  if (win) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Confetti recycle={false} />
        <h1 className="text-5xl font-bold text-green-500 mb-4">Category King!</h1>
        <p className="text-2xl text-foreground mb-8">You've solved all the conundrums! Final Score: {score}</p>
        <Button onClick={startGame} size="lg">Play Again</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Category Conundrum</h1>
        <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
      </div>
      
      <div className="text-center p-6 mb-8 bg-background rounded-lg">
        <p className="text-xl text-muted-foreground mb-1">Which of these is NOT in the category:</p>
        <h2 className="text-4xl font-bold text-accent">{currentCategory.category}?</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map(option => (
          <Button key={option} onClick={() => handleAnswer(option)} variant="outline" className="h-24 text-2xl whitespace-normal leading-tight">
            {option}
          </Button>
        ))}
      </div>
      
      <div className="text-center">
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

export default CategoryConundrumGame;
