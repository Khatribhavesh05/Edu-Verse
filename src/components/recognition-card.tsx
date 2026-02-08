'use client';

import { Card } from '@/components/ui/card';

interface RecognitionCardProps {
  emoji: string;
  category: string;
  description: string;
  demoName: string;
}

export function RecognitionCard({ emoji, category, description, demoName }: RecognitionCardProps) {
  return (
    <Card className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 border-3 border-pink-200 hover:border-pink-300 transition-all duration-300 hover:shadow-xl animate-pulse-gentle">
      <div className="space-y-6 text-center">
        {/* Large Emoji Icon */}
        <div className="text-8xl drop-shadow-lg">{emoji}</div>

        {/* Category Title */}
        <h3 className="text-3xl font-black text-foreground">{category}</h3>

        {/* Positive Description */}
        <p className="text-lg text-foreground/70 font-semibold leading-relaxed">
          {description}
        </p>

        {/* Demo User Avatar and Name */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center">
            <span className="text-xl">✨</span>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{demoName}</p>
            <p className="text-xs text-foreground/60">Amazing Explorer</p>
          </div>
        </div>

        {/* Appreciation Message */}
        <div className="pt-2 inline-block px-4 py-2 bg-white rounded-full border-2 border-pink-200">
          <span className="text-sm font-bold text-pink-600">You&apos;re awesome! 🌈</span>
        </div>
      </div>
    </Card>
  );
}
