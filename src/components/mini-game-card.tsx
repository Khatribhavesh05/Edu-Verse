'use client';

import { Card } from '@/components/ui/card';
import { playClickSound } from '@/lib/sound-effects';

interface MiniGameCardProps {
  name: string;
  description: string;
  icon: string;
  gradientColor: string;
  gameId: string;
  onPlay: (gameId: string) => void;
}

export function MiniGameCard({ name, description, icon, gradientColor, gameId, onPlay }: MiniGameCardProps) {
  const handleGameClick = () => {
    playClickSound();
    onPlay(gameId);
  };

  return (
    <Card
      onClick={handleGameClick}
      className={`p-8 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-3 border-transparent bg-gradient-to-br ${gradientColor}`}
    >
      <div className="space-y-4">
        {/* Game Icon */}
        <div className="text-7xl">{icon}</div>

        {/* Game Name */}
        <h3 className="text-2xl font-black text-white drop-shadow-lg">{name}</h3>

        {/* Game Description */}
        <p className="text-base text-white/90 drop-shadow font-semibold">{description}</p>

        {/* Ready Badge */}
        <div className="pt-4">
          <span className="inline-block px-4 py-2 bg-white/30 backdrop-blur text-white text-sm font-bold rounded-full border-2 border-white/50">
            Tap to Play! 🎮
          </span>
        </div>
      </div>
    </Card>
  );
}
