
import type { FC } from 'react';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { games } from '@/lib/constants';

type Game = (typeof games)[0];

interface GameCardProps {
  game: Game;
  subjectSlug: string;
}

export const GameCard: FC<GameCardProps> = ({ game, subjectSlug }) => {
  const isPlayable = true; // All games are playable now

  return (
    <Card className="flex flex-col justify-between h-full transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-white">
        <Link href={`/subjects/${subjectSlug}/${game.slug}`} className="flex flex-col justify-between h-full p-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-blue-100`}>
                    <Gamepad2 className={`w-8 h-8 text-blue-500`} />
                  </div>
                  <span className="text-2xl font-black">{game.name}</span>
                </CardTitle>
                <CardDescription className="text-base">{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button disabled={!isPlayable} className="w-full text-lg">
                    {isPlayable ? 'Play Now' : 'Coming Soon'}
                </Button>
            </CardContent>
        </Link>
    </Card>
  );
};
