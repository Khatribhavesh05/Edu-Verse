
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Scale, Check, X } from 'lucide-react';
import { shuffle } from 'lodash';

const STATEMENTS = [
  { text: "A shrimp's heart is in its head.", isFact: true },
  { text: "The Great Wall of China is visible from space.", isFact: false },
  { text: "Humans share 50% of their DNA with bananas.", isFact: true },
  { text: "It rains diamonds on Saturn and Jupiter.", isFact: true },
  { text: "Goldfish have a three-second memory.", isFact: false },
  { text: "An octopus has three hearts.", isFact: true },
  { text: "There are more fake flamingos in the world than real ones.", isFact: true },
  { text: "Lightning never strikes the same place twice.", isFact: false },
  { text: "A day on Venus is longer than a year on Venus.", isFact: true },
  { text: "Twinkies have a shelf-life of several decades.", isFact: false },
];

const FactOrFictionFrenzy = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [shuffledStatements, setShuffledStatements] = useState(STATEMENTS);
  
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  
  const { toast } = useToast();
  const currentStatement = useMemo(() => shuffledStatements[level], [shuffledStatements, level]);

  const handleAnswer = (isFact: boolean) => {
    if (isFact === currentStatement.isFact) {
      toast({ title: 'Correct!', description: '+10 points!' });
      setScore(s => s + 10);
    } else {
      toast({ variant: 'destructive', title: 'Incorrect!', description: `The correct answer was: ${currentStatement.isFact ? 'Fact' : 'Fiction'}` });
    }

    if (level < shuffledStatements.length - 1) {
      setLevel(l => l + 1);
    } else {
      setWin(true);
    }
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `Give me a hint related to the statement: "${currentStatement.text}". Don't tell me if it's true or false.`;
    try {
      const res = await generateHint({ question });
      setHint({ title: 'Knowledge Nugget', description: res.hint });
    } catch (e) {
      setHint({ title: 'Error', description: 'Could not get a hint right now.' });
    } finally {
      setIsHintLoading(false);
    }
  };

  const startGame = () => {
    setLevel(0);
    setScore(0);
    setWin(false);
    setGameStarted(true);
    setShuffledStatements(shuffle(STATEMENTS));
  };
  
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Scale className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-4">Fact or Fiction Frenzy</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">Can you tell what's true from what's false? Test your general knowledge in this fast-paced trivia game!</p>
        <Button onClick={startGame} size="lg">Start the Frenzy</Button>
      </div>
    );
  }

  if (win) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Confetti recycle={false} />
        <h1 className="text-5xl font-bold text-green-500 mb-4">Trivia Titan!</h1>
        <p className="text-2xl text-foreground mb-8">You've mastered the facts! Final Score: {score}</p>
        <Button onClick={startGame} size="lg">Play Again</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Fact or Fiction?</h1>
        <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
      </div>
      
      <div className="text-center p-8 mb-8 bg-background rounded-lg min-h-[150px] flex items-center justify-center">
        <p className="text-3xl font-semibold text-foreground">{currentStatement.text}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button onClick={() => handleAnswer(true)} className="h-24 text-3xl bg-green-500 hover:bg-green-600 text-white">
            <Check className="mr-4 w-10 h-10"/> Fact
        </Button>
        <Button onClick={() => handleAnswer(false)} className="h-24 text-3xl bg-red-500 hover:bg-red-600 text-white">
            <X className="mr-4 w-10 h-10"/> Fiction
        </Button>
      </div>
      
      <div className="text-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={handleAskAI}>
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

export default FactOrFictionFrenzy;
