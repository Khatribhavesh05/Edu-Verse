'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { playClickSound, playSuccessSound } from '@/lib/sound-effects';
import { endGameTracking } from '@/lib/game-activity-tracker';
import { motion } from 'framer-motion';

interface NumberLineRaceProps {
  onClose: () => void;
}

interface Question {
  question: string;
  correctNumber: number;
  min: number;
  max: number;
  hint?: string;
}

export function NumberLineRace({ onClose }: NumberLineRaceProps) {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime] = useState<number>(Date.now());

  const questions: Question[] = [
    {
      question: 'Click on number 7',
      correctNumber: 7,
      min: 0,
      max: 10,
      hint: 'Count from the left!',
    },
    {
      question: 'Go to number 15',
      correctNumber: 15,
      min: 10,
      max: 20,
      hint: 'Halfway through!',
    },
    {
      question: 'Find number 5',
      correctNumber: 5,
      min: 0,
      max: 10,
      hint: 'Half of 10!',
    },
    {
      question: 'Click on number 12',
      correctNumber: 12,
      min: 10,
      max: 20,
      hint: 'After 11!',
    },
    {
      question: 'Go to number 3',
      correctNumber: 3,
      min: 0,
      max: 10,
      hint: 'One, two, three!',
    },
    {
      question: 'Find number 18',
      correctNumber: 18,
      min: 10,
      max: 20,
      hint: 'Almost at the end!',
    },
  ];

  // Log game activity when complete
  useEffect(() => {
    if (gameComplete) {
      endGameTracking(
        'number-line',
        'Number Line Race',
        'math',
        startTime,
        score,
        questions.length
      );
    }
  }, [gameComplete, score, startTime, questions.length]);

  const currentQuestion = questions[questionIndex];
  const numberRange = Array.from(
    { length: currentQuestion.max - currentQuestion.min + 1 },
    (_, i) => currentQuestion.min + i
  );

  const handleNumberClick = (number: number) => {
    playClickSound();
    setSelectedNumber(number);
    setAnswered(true);

    if (number === currentQuestion.correctNumber) {
      setIsCorrect(true);
      playSuccessSound();
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    playClickSound();
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
      setAnswered(false);
      setSelectedNumber(null);
      setIsCorrect(null);
    } else {
      setGameComplete(true);
    }
  };

  if (gameComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 rounded-3xl p-8 max-w-md w-full border-3 border-orange-200 text-center space-y-6">
          <div className="text-6xl">🏁</div>
          <h2 className="text-3xl font-black">Race Complete!</h2>
          <div className="text-5xl font-black text-orange-600">{score} / {questions.length}</div>
          <p className="text-lg text-foreground/70">
            {score === questions.length
              ? '🌟 Perfect race! You\'re a number master!'
              : score >= questions.length - 1
              ? '🎯 Almost perfect! Excellent work!'
              : score >= questions.length / 2
              ? '👍 Good effort! Keep practicing numbers!'
              : '💪 Nice try! Try another race!'}
          </p>
          <Button
            onClick={onClose}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 text-lg"
          >
            Back to Mini-Games
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-orange-100 via-amber-100 to-orange-100 z-50"
    >
      <div className="game-container min-h-screen w-full flex flex-col justify-center items-center overflow-y-auto px-4 py-6">
        <div className="w-full max-w-3xl space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black">Number Line Race 🏁</h1>
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-full px-3 py-1 text-lg font-bold h-auto"
            >
              ✕
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/50 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((questionIndex + 1) / questions.length) * 100}%`,
                } as React.CSSProperties}
              />
            </div>
            <span className="text-xs font-bold text-orange-700 whitespace-nowrap">
              {questionIndex + 1} / {questions.length}
            </span>
          </div>

          {/* Score Badge */}
          <div className="bg-white rounded-full px-4 py-1 font-bold text-sm text-orange-600 shadow inline-block">
            Score: {score}
          </div>

          {/* Question Card */}
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white rounded-3xl p-6 border-3 border-orange-300 shadow-lg text-center space-y-2"
          >
            <p className="text-xs font-bold text-orange-600">Question {questionIndex + 1}</p>
            <h2 className="text-3xl font-black text-foreground">{currentQuestion.question}</h2>
            {answered && isCorrect === false && (
              <p className="text-xs text-orange-600 font-bold">💡 Hint: {currentQuestion.hint}</p>
            )}
          </motion.div>

          {/* Number Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full space-y-6"
          >
            {/* Line */}
            <div className="flex items-center gap-1 md:gap-2">
              {numberRange.map((number, index) => {
                const isSelected = selectedNumber === number;
                const isCorrectOption = number === currentQuestion.correctNumber;
                let style =
                  'bg-white border-3 border-gray-400 hover:bg-gray-100 hover:scale-110 text-slate-900';

                if (answered) {
                  if (isCorrectOption) {
                    style = 'bg-green-300 border-3 border-green-600 scale-125';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-red-300 border-3 border-red-600';
                  }
                }

                return (
                  <div key={number} className="flex flex-col items-center flex-1 text-center">
                    <Button
                      onClick={() => !answered && handleNumberClick(number)}
                      disabled={answered}
                      className={`h-12 w-12 md:h-14 md:w-14 rounded-full font-bold text-sm md:text-base transition-all ${style}`}
                    >
                      {number}
                    </Button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Feedback */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-full rounded-2xl p-3 text-base font-bold text-center ${
                isCorrect
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {isCorrect ? (
                <span>🏃 Correct! You reached the goal!</span>
              ) : (
                <span>💡 Not quite... check the line again!</span>
              )}
            </motion.div>
          )}

          {/* Next Button */}
          {answered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full mt-4"
            >
              <Button
                onClick={handleNext}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 text-base rounded-2xl"
              >
                {questionIndex + 1 === questions.length ? 'Finish Race' : 'Next Number'} →
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
