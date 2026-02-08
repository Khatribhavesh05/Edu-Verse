
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Award, Info, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';

type ItemType = 'recyclable' | 'non-recyclable';

interface FallingItem {
  id: number;
  type: ItemType;
  icon: React.ReactNode;
  name: string;
  x: number;
  y: number;
}

const ITEMS: { recyclable: { name: string; icon: React.ReactNode }[], nonRecyclable: { name: string; icon: React.ReactNode }[] } = {
  recyclable: [ { name: 'Plastic Bottle', icon: <span>🥤</span> }, { name: 'Paper', icon: <span>📄</span> }, { name: 'Can', icon: <span>🥫</span> }, ],
  nonRecyclable: [ { name: 'Banana', icon: <span>🍌</span> }, { name: 'Rock', icon: <span>🪨</span> }, { name: 'Toxic Waste', icon: <span>☣️</span> }, ],
};

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BASKET_WIDTH = 120;
const WINNING_SCORE = 50;

const SaveThePlanetGame = () => {
  const [basketX, setBasketX] = useState(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);

  const { toast } = useToast();
  const gameIntervalRef = useRef<NodeJS.Timeout>();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef(score);

  useEffect(() => {
    if (gameStarted) {
        if (score > scoreRef.current) {
            toast({ title: 'Good Job!', description: `+10 points for recycling!` });
        } else if (score < scoreRef.current) {
            toast({ variant: 'destructive', title: 'Oops!', description: `-5 points. That's not recyclable!` });
        }
        scoreRef.current = score;
    }
  }, [score, toast, gameStarted]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setBasketX(prev => Math.max(0, prev - 30));
    else if (e.key === 'ArrowRight') setBasketX(prev => Math.min(GAME_WIDTH - BASKET_WIDTH, prev + 30));
  }, []);

  useEffect(() => {
    if (gameStarted && !isGameOver) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [gameStarted, isGameOver, handleKeyDown]);

  const createItem = useCallback(() => {
    const type: ItemType = Math.random() > 0.5 ? 'recyclable' : 'non-recyclable';
    const itemPool = type === 'recyclable' ? ITEMS.recyclable : ITEMS.nonRecyclable;
    const randomItem = itemPool[Math.floor(Math.random() * itemPool.length)];

    setItems(prevItems => [...prevItems, { id: Date.now(), ...randomItem, type, x: Math.random() * (GAME_WIDTH - 40), y: -40 }]);
  }, []);

  const gameLoop = useCallback(() => {
    setItems(prevItems => prevItems
        .map(item => ({ ...item, y: item.y + 6 }))
        .filter(item => {
          const basketY = GAME_HEIGHT - 70;
          if (item.y > basketY && item.y < basketY + 50 && item.x > basketX && item.x < basketX + BASKET_WIDTH) {
            if (item.type === 'recyclable') {
              setScore(s => s + 10);
            } else {
              setScore(s => Math.max(0, s - 5));
            }
            return false;
          }
          return item.y < GAME_HEIGHT;
        })
    );
  }, [basketX]);

  useEffect(() => {
    if (gameStarted && !isGameOver) {
      gameIntervalRef.current = setInterval(gameLoop, 50);
      const itemCreationInterval = setInterval(createItem, 1400);
      return () => {
        if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
        clearInterval(itemCreationInterval);
      };
    }
  }, [gameStarted, isGameOver, gameLoop, createItem]);

  useEffect(() => {
    if (score >= WINNING_SCORE && !isGameOver) {
        setIsGameOver(true);
        if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    }
  }, [score, isGameOver]);

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const questions = ['Why should we recycle plastic?', 'What happens to non-recyclable waste?'];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    try {
      const res = await generateHint({ question: randomQuestion });
      setHint({ title: randomQuestion, description: res.hint });
    } catch (error) {
      setHint({ title: 'Error', description: 'Could not fetch a hint right now.' });
    } finally {
      setIsHintLoading(false);
    }
  };

  const startGame = () => {
    setScore(0);
    scoreRef.current = 0;
    setItems([]);
    setIsGameOver(false);
    setGameStarted(true);
    gameAreaRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center w-full bg-card text-foreground p-6 rounded-2xl shadow-lg">
      <header className="w-full text-center mb-4">
        <h1 className="text-4xl font-bold text-green-500">🌍 Save the Planet</h1>
      </header>

      <div
        ref={gameAreaRef}
        className="relative w-full max-w-[800px] h-[600px] bg-blue-100 dark:bg-slate-800 rounded-lg overflow-hidden border-2 border-border"
        tabIndex={-1}
      >
        {!gameStarted && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10 p-4 text-center">
            <h2 className="text-3xl font-bold mb-2 text-white">Welcome to Save the Planet!</h2>
            <p className="text-lg text-white/90 mb-6 max-w-md">Catch the recyclable items. Reach {WINNING_SCORE} points to win!</p>
            <Button onClick={startGame} size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold">Start Game</Button>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20 text-center">
            <Confetti width={GAME_WIDTH} height={GAME_HEIGHT} recycle={false} />
            <Award className="w-24 h-24 text-yellow-400 mb-4 animate-bounce" />
            <h2 className="text-5xl font-bold text-white mb-4">You saved the planet!</h2>
            <p className="text-3xl text-white mb-8">Final Score: {score}</p>
            <Button onClick={startGame} size="lg" className="bg-green-500 hover:bg-green-600">Play Again</Button>
          </div>
        )}

        <div className="absolute top-4 left-4 p-2 bg-background/80 rounded-lg text-2xl font-bold text-green-500">Score: {score}</div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="absolute top-4 right-4" onClick={handleAskAI}>
              <Info className="mr-2 h-4 w-4" /> Ask AI
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card border-primary">
            <DialogHeader><DialogTitle className="text-primary">{hint.title}</DialogTitle></DialogHeader>
            {isHintLoading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div> : <p>{hint.description}</p>}
          </DialogContent>
        </Dialog>
        
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ y: -40, x: item.x }}
            animate={{ y: item.y }}
            transition={{ duration: 0.05, ease: 'linear' }}
            className="absolute text-4xl"
          >
            {item.icon}
          </motion.div>
        ))}

        <motion.div
          className="absolute bottom-2 w-[120px] h-[70px] flex items-center justify-center text-6xl text-green-500"
          animate={{ x: basketX }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Recycle strokeWidth={1.5} />
        </motion.div>
      </div>
    </div>
  );
};

export default SaveThePlanetGame;
