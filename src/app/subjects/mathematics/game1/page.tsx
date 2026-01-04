
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Brain } from 'lucide-react';
import { shuffle } from 'lodash';
import { GameIntroduction } from '@/components/game-introduction';
import { GameFeedback } from '@/components/game-feedback';

const QUESTIONS = [
  { question: "x + 5 = 12", answer: "7", distractors: ["5", "17", "6"] },
  { question: "x - 3 = 10", answer: "13", distractors: ["7", "10", "30"] },
  { question: "2 * x = 18", answer: "9", distractors: ["8", "16", "36"] },
  { question: "x / 4 = 5", answer: "20", distractors: ["1", "9", "1.25"] },
  { question: "8 + x = 15", answer: "7", distractors: ["23", "8", "1.875"] },
  { question: "14 - x = 6", answer: "8", distractors: ["20", "9", "-8"] },
  { question: "x * 3 = 21", answer: "7", distractors: ["24", "18", "63"] },
  { question: "30 / x = 6", answer: "5", distractors: ["24", "36", "180"] },
  { question: "x + 9 = 9", answer: "0", distractors: ["18", "1", "81"] },
  { question: "5 * x = 25", answer: "5", distractors: ["20", "30", "125"] },
];

const intro = {
  title: 'Welcome to Equation Quest!',
  description: 'Orbi is here to guide you. Listen and learn how to play.',
  steps: [
    'I will show you an equation with a missing number, \'x\'.',
    'Your job is to find the value of \'x\'.',
    'Choose the correct number from the four options.',
    'Solve them all to become an Equation Master. Good luck! 🪐',
  ],
};

const EquationQuestGame = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(QUESTIONS);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  
  const currentQuestion = useMemo(() => shuffledQuestions[level], [shuffledQuestions, level]);

  const setupLevel = useCallback(() => {
    if (currentQuestion) {
        setOptions(shuffle([currentQuestion.answer, ...currentQuestion.distractors]));
    }
  }, [currentQuestion]);
  
  useEffect(() => {
    if (gameStarted) {
      setupLevel();
    }
  }, [level, gameStarted, setupLevel]);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(s => s + 10);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    setFeedback(null);
    if (level < shuffledQuestions.length - 1) {
      setLevel(l => l + 1);
    } else {
      setWin(true);
    }
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `Give me a hint for solving the equation "${currentQuestion.question}". Explain the concept of isolating the variable.`;
    try {
      const res = await generateHint({ question });
      setHint({ title: `Hint for ${currentQuestion.question}`, description: res.hint });
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
    setShuffledQuestions(shuffle(QUESTIONS));
  };
  
  if (!gameStarted) {
    return (
      <GameIntroduction
        title={intro.title}
        description={intro.description}
        steps={intro.steps}
        onStartGame={startGame}
      />
    );
  }

  if (win) {
     return (
      <GameFeedback
        status="win"
        score={score}
        onNext={startGame}
        winMessage="Equation Master!"
      />
    );
  }

  return (
    <>
    <div className="w-full max-w-3xl mx-auto p-6 bg-white/50 text-foreground rounded-2xl shadow-2xl shadow-primary/10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Equation Quest</h1>
        <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
      </div>
      
      <div className="text-center p-8 mb-8 bg-background rounded-lg min-h-[150px] flex items-center justify-center border-2 border-primary/20">
        <p className="text-5xl font-mono font-bold">{currentQuestion.question}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {options.map(option => (
            <Button key={option} onClick={() => handleAnswer(option)} className="h-24 text-4xl font-bold">
                {option}
            </Button>
        ))}
      </div>
      
      <div className="text-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={handleAskAI}>
              <Info className="mr-2 h-4 w-4" /> Ask Orbi for a hint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle className="text-primary">{hint.title}</DialogTitle></DialogHeader>
            {isHintLoading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div> : <p>{hint.description}</p>}
          </DialogContent>
        </Dialog>
      </div>
    </div>
    {feedback && (
        <GameFeedback 
            status={feedback}
            onNext={handleNext}
            correctAnswer={`x = ${currentQuestion.answer}`}
        />
    )}
    </>
  );
};

export default EquationQuestGame;
