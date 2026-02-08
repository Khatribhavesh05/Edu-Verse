
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Lightbulb } from 'lucide-react';
import { shuffle } from 'lodash';

const INVENTIONS = [
  { name: "The Printing Press", period: "15th Century" },
  { name: "The Telephone", period: "19th Century" },
  { name: "The Internet", period: "20th Century" },
  { name: "The Wheel", period: "Ancient History" },
  { name: "The Light Bulb", period: "19th Century" },
  { name: "The Airplane", period: "20th Century" },
  { name: "Gunpowder", period: "9th Century" },
  { name: "The Compass", period: "12th Century" },
];

const PERIOD_OPTIONS = ["Ancient History", "9th Century", "12th Century", "15th Century", "19th Century", "20th Century"];

const InventionTimelineGame = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [shuffledInventions, setShuffledInventions] = useState(INVENTIONS);
  
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  
  const { toast } = useToast();
  const currentInvention = useMemo(() => shuffledInventions[level], [shuffledInventions, level]);

  const handleAnswer = (selectedPeriod: string) => {
    if (selectedPeriod === currentInvention.period) {
      toast({ title: 'Correct!', description: `The ${currentInvention.name} was from the ${currentInvention.period}!` });
      setScore(s => s + 10);
    } else {
      toast({ variant: 'destructive', title: 'Incorrect!', description: `That's not the right time period. It was invented in the ${currentInvention.period}.` });
    }

    if (level < shuffledInventions.length - 1) {
      setLevel(l => l + 1);
    } else {
      setWin(true);
    }
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `Give me a hint about when "${currentInvention.name}" was invented. Don't mention the century, but maybe talk about what else was happening in the world at that time.`;
    try {
      const res = await generateHint({ question });
      setHint({ title: `Hint for ${currentInvention.name}`, description: res.hint });
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
    setShuffledInventions(shuffle(INVENTIONS));
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Lightbulb className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-4">Invention Timeline</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">Place famous inventions in their correct historical period. Test your knowledge of technological history!</p>
        <Button onClick={startGame} size="lg">Begin Inspection</Button>
      </div>
    );
  }

  if (win) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Confetti recycle={false} />
        <h1 className="text-5xl font-bold text-green-500 mb-4">Invention Inspector!</h1>
        <p className="text-2xl text-foreground mb-8">You're a master of history and technology! Final Score: {score}</p>
        <Button onClick={startGame} size="lg">Play Again</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Invention Timeline</h1>
        <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
      </div>
      
      <div className="text-center p-8 mb-8 bg-background rounded-lg">
        <p className="text-xl text-muted-foreground mb-2">When was this invented?</p>
        <h2 className="text-5xl font-bold text-accent">{currentInvention.name}</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {PERIOD_OPTIONS.map(period => (
          <Button key={period} onClick={() => handleAnswer(period)} variant="outline" className="h-20 text-xl">
            {period}
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

export default InventionTimelineGame;
