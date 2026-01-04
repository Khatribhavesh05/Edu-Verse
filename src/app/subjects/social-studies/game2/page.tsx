
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Building2 } from 'lucide-react';
import { shuffle } from 'lodash';

const QUESTIONS = [
  { question: "What are the three branches of the U.S. government?", answer: "Legislative, Executive, Judicial", distractors: ["Federal, State, Local", "Monarchy, Oligarchy, Democracy"] },
  { question: "Who is the head of the executive branch?", answer: "The President", distractors: ["The Speaker of the House", "The Chief Justice"] },
  { question: "How many senators are there in the U.S. Senate?", answer: "100", distractors: ["435", "50", "200"] },
  { question: "What is the supreme law of the land in the United States?", answer: "The Constitution", distractors: ["The Declaration of Independence", "The Bill of Rights"] },
  { question: "What do the stripes on the American flag represent?", answer: "The original 13 colonies", distractors: ["The 50 states", "The number of presidents"] },
];

const BUILDING_ICONS = ["🏛️", "🏫", "🏥", "🏞️", "🏤", "🚓", "🚒", "🏢"];

const CivicsBuilderGame = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [buildings, setBuildings] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  
  const { toast } = useToast();
  const currentQuestion = useMemo(() => QUESTIONS[level], [level]);

  useEffect(() => {
    if (gameStarted && currentQuestion) {
        setOptions(shuffle([currentQuestion.answer, ...currentQuestion.distractors]));
    }
  }, [level, gameStarted, currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (answer === currentQuestion.answer) {
      toast({ title: 'Correct!', description: 'You just improved your city!' });
      setScore(s => s + 10);
      setBuildings(b => [...b, BUILDING_ICONS[Math.floor(Math.random() * BUILDING_ICONS.length)]]);
      if (level < QUESTIONS.length - 1) {
        setLevel(l => l + 1);
      } else {
        setWin(true);
      }
    } else {
      toast({ variant: 'destructive', title: 'Incorrect!', description: 'That\'s not the right answer. A good leader needs to know their civics!' });
    }
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `I'm playing a civics game. The question is: "${currentQuestion.question}". Can you give me a hint to help me figure out the answer?`;
    try {
      const res = await generateHint({ question });
      setHint({ title: 'Civics Hint', description: res.hint });
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
    setBuildings([]);
    shuffle(QUESTIONS);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Building2 className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-4">Civics Builder</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">Answer civics questions to build a thriving city. Show your knowledge and watch your community grow!</p>
        <Button onClick={startGame} size="lg">Start Building</Button>
      </div>
    );
  }

  if (win) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Confetti recycle={false} />
        <h1 className="text-5xl font-bold text-green-500 mb-4">Model City!</h1>
        <p className="text-2xl text-foreground mb-8">You're a true civic leader! Final Score: {score}</p>
        <div className="flex flex-wrap gap-4 text-5xl mb-8 justify-center">
            {buildings.map((b, i) => <span key={i}>{b}</span>)}
        </div>
        <Button onClick={startGame} size="lg">Build Again</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-primary">Civics Builder</h1>
        <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
      </div>
      
      <div className="w-full h-32 bg-background rounded-lg mb-6 flex items-center justify-center p-4 flex-wrap gap-4 text-4xl">
        <AnimatePresence>
            {buildings.map((b, i) => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}>{b}</motion.div>
            ))}
        </AnimatePresence>
         {buildings.length === 0 && <p className="text-muted-foreground text-lg">Your city is empty. Answer questions to build it!</p>}
      </div>

      <div className="text-center p-6 mb-6 bg-background rounded-lg">
        <p className="text-2xl font-semibold text-foreground">{currentQuestion.question}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {options.map(option => (
            <Button key={option} onClick={() => handleAnswer(option)} className="h-auto text-lg py-4 whitespace-normal">
                {option}
            </Button>
        ))}
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

export default CivicsBuilderGame;
