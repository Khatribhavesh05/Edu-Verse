
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from './ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface GameFeedbackProps {
  status: 'correct' | 'incorrect' | 'win';
  onNext: () => void;
  correctAnswer?: string;
  score?: number;
  winMessage?: string;
}

export function GameFeedback({ status, onNext, correctAnswer, score, winMessage }: GameFeedbackProps) {
  const isCorrect = status === 'correct';
  const isWin = status === 'win';

  const messages = {
    correct: ["Awesome!", "Great job!", "You got it!", "Brilliant!", "Fantastic!"],
    incorrect: ["Good try!", "Almost there!", "Keep going!", "Not quite!"]
  };

  const randomMessage = isCorrect 
    ? messages.correct[Math.floor(Math.random() * messages.correct.length)]
    : messages.incorrect[Math.floor(Math.random() * messages.incorrect.length)];

  if (isWin) {
    return (
       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Confetti recycle={false} numberOfPieces={200} />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md p-8 text-center bg-white rounded-3xl shadow-2xl"
        >
            <h2 className="text-4xl font-black text-yellow-500 mb-2">{winMessage || "You Win!"}</h2>
            <p className="text-2xl text-foreground/80 mb-6">Final Score: <span className="font-bold text-green-500">{score}</span></p>
            <Button onClick={onNext} className="w-full" size="lg">Play Again</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed bottom-0 left-0 right-0 p-6 z-50 text-white rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.1)] ${isCorrect ? 'bg-gradient-to-t from-green-500 to-green-400' : 'bg-gradient-to-t from-orange-500 to-orange-400'}`}
    >
        {isCorrect && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={100} recycle={false} gravity={0.3} />}
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{isCorrect ? '🥳' : '🤔'}</div>
          <div>
            <h2 className="text-2xl font-bold">{randomMessage}</h2>
            {!isCorrect && correctAnswer && (
              <p className="text-lg font-semibold opacity-90">The correct answer was: {correctAnswer}</p>
            )}
          </div>
        </div>
        <Button onClick={onNext} size="lg" className={isCorrect ? 'bg-white text-green-500 hover:bg-green-50' : 'bg-white text-orange-500 hover:bg-orange-50'}>
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
