'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { playClickSound, playSuccessSound } from '@/lib/sound-effects';
import { endGameTracking } from '@/lib/game-activity-tracker';
import { motion } from 'framer-motion';

interface MathRunnerProps {
  onClose: () => void;
}

interface Question {
  question: string;
  answer: number;
  options: number[];
}

export function MathRunner({ onClose }: MathRunnerProps) {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime] = useState<number>(Date.now());

  const questions: Question[] = [
    {
      question: '5 + 3 = ?',
      answer: 8,
      options: [6, 8, 9],
    },
    {
      question: '12 - 4 = ?',
      answer: 8,
      options: [8, 9, 7],
    },
    {
      question: '7 + 6 = ?',
      answer: 13,
      options: [12, 13, 14],
    },
    {
      question: '15 - 8 = ?',
      answer: 7,
      options: [5, 7, 6],
    },
    {
      question: '9 + 9 = ?',
      answer: 18,
      options: [17, 18, 19],
    },
    {
      question: '20 - 7 = ?',
      answer: 13,
      options: [12, 13, 11],
    },
  ];

  // Log game activity when complete
  useEffect(() => {
    if (gameComplete) {
      endGameTracking(
        'math-runner',
        'Math Runner',
        'math',
        startTime,
        score,
        questions.length
      );
    }
  }, [gameComplete, score, startTime, questions.length]);

  const currentQuestion = questions[questionIndex];

  const handleAnswerClick = (answer: number) => {
    playClickSound();
    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === currentQuestion.answer) {
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
      setSelectedAnswer(null);
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
        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 rounded-3xl p-8 max-w-md w-full border-3 border-purple-200 text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-black">Game Complete!</h2>
          <div className="text-5xl font-black text-purple-600">{score} / {questions.length}</div>
          <p className="text-lg text-foreground/70">
            {score === questions.length
              ? '🌟 Perfect score! You\'re a math master!'
              : score >= questions.length - 1
              ? '🎯 Almost perfect! Great job!'
              : score >= questions.length / 2
              ? '👍 Good effort! Keep practicing!'
              : '💪 Nice try! Play again to improve!'}
          </p>
          <Button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-lg"
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
      className="fixed inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100 z-50"
    >
      <div className="game-container min-h-screen w-full flex flex-col justify-center items-center overflow-y-auto px-4 py-6">
        <div className="w-full max-w-sm space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black">Math Runner 🧮</h1>
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
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((questionIndex + 1) / questions.length) * 100}%`,
                } as React.CSSProperties}
              />
            </div>
            <span className="text-xs font-bold text-purple-700 whitespace-nowrap">
              {questionIndex + 1} / {questions.length}
            </span>
          </div>

          {/* Score Badge */}
          <div className="bg-white rounded-full px-4 py-1 font-bold text-sm text-purple-600 shadow inline-block">
            Score: {score}
          </div>

          {/* Question Card */}
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white rounded-3xl p-6 border-3 border-purple-300 shadow-lg text-center space-y-2"
          >
            <p className="text-xs font-bold text-purple-600">Question {questionIndex + 1}</p>
            <h2 className="text-4xl font-black text-foreground">
              {currentQuestion.question}
            </h2>
          </motion.div>

          {/* Answer Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full grid grid-cols-1 gap-3"
          >
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.answer;
              let buttonStyle = 'bg-white border-2 border-gray-300 hover:bg-gray-50 text-slate-900';

              if (answered) {
                if (isCorrectOption) {
                  buttonStyle = 'bg-green-100 border-3 border-green-500 text-green-700';
                } else if (isSelected && !isCorrect) {
                  buttonStyle = 'bg-red-100 border-3 border-red-500 text-red-700';
                }
              }

              return (
                <Button
                  key={option}
                  onClick={() => !answered && handleAnswerClick(option)}
                  disabled={answered}
                  className={`h-16 text-2xl font-black rounded-2xl transition-all ${buttonStyle}`}
                >
                  {option}
                </Button>
              );
            })}
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
                <span>✨ Correct! Great job!</span>
              ) : (
                <span>💡 Try again next question!</span>
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
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-base rounded-2xl"
              >
                {questionIndex + 1 === questions.length ? 'See Results' : 'Next Question'} →
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
