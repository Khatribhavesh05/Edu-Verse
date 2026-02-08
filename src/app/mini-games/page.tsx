'use client';

import { useState, useEffect } from 'react';
import { MiniGameCard } from '@/components/mini-game-card';
import { playPageTransitionSound } from '@/lib/sound-effects';
import { MathRunner } from '@/components/games/math-runner';
import { GrammarPop } from '@/components/games/grammar-pop';
import { ScienceMatchCards } from '@/components/games/science-match-cards';
import { NumberLineRace } from '@/components/games/number-line-race';

export default function MiniGamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);

  useEffect(() => {
    playPageTransitionSound();
    try {
      const today = new Date().toISOString().slice(0, 10);
      const storedDate = localStorage.getItem('eduverse-mini-game-played-date');
      setHasPlayedToday(storedDate === today);
    } catch {
      setHasPlayedToday(false);
    }
  }, []);

  const games = [
    {
      id: 'math-runner',
      name: 'Math Runner 🧮',
      description: 'Run, jump, and solve quick math problems',
      icon: '🧮',
      gradientColor: 'from-purple-400 via-purple-500 to-purple-600',
    },
    {
      id: 'grammar-pop',
      name: 'Grammar Pop 🎈',
      description: 'Pop the correct word or sentence',
      icon: '🎈',
      gradientColor: 'from-pink-400 via-pink-500 to-pink-600',
    },
    {
      id: 'science-match',
      name: 'Science Match Cards 🧪',
      description: 'Match concepts, images, and facts',
      icon: '🧪',
      gradientColor: 'from-green-400 via-green-500 to-green-600',
    },
    {
      id: 'number-line',
      name: 'Number Line Race 🏁',
      description: 'Race along the number line to the right answer',
      icon: '🏁',
      gradientColor: 'from-orange-400 via-orange-500 to-orange-600',
    },
  ];

  const handlePlayGame = (gameId: string) => {
    setActiveGame(gameId);
    try {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem('eduverse-mini-game-played-date', today);
      setHasPlayedToday(true);
    } catch {
      setHasPlayedToday(true);
    }
  };

  const handleCloseGame = () => {
    setActiveGame(null);
  };

  // Render active game
  if (activeGame === 'math-runner') {
    return <MathRunner onClose={handleCloseGame} />;
  }
  if (activeGame === 'grammar-pop') {
    return <GrammarPop onClose={handleCloseGame} />;
  }
  if (activeGame === 'science-match') {
    return <ScienceMatchCards onClose={handleCloseGame} />;
  }
  if (activeGame === 'number-line') {
    return <NumberLineRace onClose={handleCloseGame} />;
  }

  // Hub view
  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-5xl font-black text-foreground tracking-tight">
          Mini-Games Hub 🎮
        </h1>
        <p className="text-2xl text-foreground/70 font-semibold">
          Learn while you play — no pressure, just fun!
        </p>
      </div>

      {/* Empty State: No Games Played Today */}
      <div className="rounded-3xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 text-center space-y-4">
        {hasPlayedToday ? (
          <>
            <div className="text-6xl">🎉</div>
            <h3 className="text-2xl font-bold text-foreground">Great job! You've played games today!</h3>
            <p className="text-lg text-foreground/70 max-w-xl mx-auto">
              Keep it up and challenge yourself with more games to earn more points!
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl">🎮</div>
            <h3 className="text-2xl font-bold text-foreground">No mini-games played today yet — want to try one?</h3>
            <p className="text-lg text-foreground/70 max-w-xl mx-auto">
              Pick a game below and start your learning adventure!
            </p>
          </>
        )}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {games.map((game) => (
          <MiniGameCard
            key={game.id}
            gameId={game.id}
            name={game.name}
            description={game.description}
            icon={game.icon}
            gradientColor={game.gradientColor}
            onPlay={handlePlayGame}
          />
        ))}
      </div>

      {/* Footer Message */}
      <div className="mt-8 p-6 bg-blue-50 rounded-3xl border-2 border-blue-200">
        <p className="text-lg text-blue-700 font-semibold text-center">
          ✨ More games coming soon! Keep learning and having fun!
        </p>
      </div>
    </div>
  );
}
