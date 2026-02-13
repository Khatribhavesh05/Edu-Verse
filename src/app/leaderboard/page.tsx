'use client';

import { useState, useEffect } from 'react';
import { RecognitionCard } from '@/components/recognition-card';
import { playPageTransitionSound } from '@/lib/sound-effects';
import { Card, CardContent } from '@/components/ui/card';
import { useLeaderboardEntries } from '@/hooks/use-leaderboard';

export default function LeaderboardPage() {
  // Demo explorer names
  const demoNames = [
    'Explorer Alex',
    'Curious Sam',
    'Bright Taylor',
    'Smart Jordan',
    'Clever Morgan',
    'Brave Casey',
    'Quick Riley',
    'Awesome Quinn',
    'Super Sage',
    'Wise Rory',
  ];

  // State for random names - initialize with first names to avoid hydration mismatch
  const [randomNames, setRandomNames] = useState({
    mostImproved: demoNames[0],
    mostCurious: demoNames[1],
    dailyStar: demoNames[2],
  });

  useEffect(() => {
    playPageTransitionSound();
    // Set random names only on client side
    const getRandomName = () => demoNames[Math.floor(Math.random() * demoNames.length)];
    setRandomNames({
      mostImproved: getRandomName(),
      mostCurious: getRandomName(),
      dailyStar: getRandomName(),
    });
  }, []);

  const { entries, loading } = useLeaderboardEntries('friendly', 5);

  const categories = [
    {
      emoji: '🌱',
      category: 'Most Improved',
      description: 'Made great progress this week!',
      demoName: randomNames.mostImproved,
    },
    {
      emoji: '🤔',
      category: 'Most Curious',
      description: 'Asked amazing questions and explored new topics!',
      demoName: randomNames.mostCurious,
    },
    {
      emoji: '⭐',
      category: 'Daily Star',
      description: 'Showed up and gave their best today!',
      demoName: randomNames.dailyStar,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="space-y-3 text-center">
        <h1 className="text-5xl font-black text-foreground tracking-tight">
          Friendly Leaderboard 🧡
        </h1>
        <p className="text-2xl text-foreground/70 font-semibold">
          Everyone shines in their own way ✨
        </p>
      </div>

      {/* Inspirational Message */}
      <div className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl border-2 border-yellow-300">
        <p className="text-lg text-center text-amber-900 font-bold">
          🌟 This board celebrates everyone&apos;s unique superpowers! <br />
          There&apos;s no competition here — just appreciation and encouragement.
        </p>
      </div>

      {/* Empty State: Today's Stars Loading */}
      <div className="rounded-3xl border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-pink-50 p-6 text-center space-y-3">
        <div className="text-5xl">🌟</div>
        <h3 className="text-xl font-bold text-foreground">Today's stars are loading — be the first!</h3>
        <p className="text-base text-foreground/70 max-w-md mx-auto">
          Complete a learning activity today to shine on the leaderboard.
        </p>
      </div>

      {/* Recognition Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <RecognitionCard
            key={index}
            emoji={category.emoji}
            category={category.category}
            description={category.description}
            demoName={category.demoName}
          />
        ))}
      </div>

      {/* Live Leaderboard */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">Today's Friendly Rankings</h2>
          <p className="text-sm text-foreground/60">
            {loading ? 'Refreshing...' : `${entries.length} player${entries.length === 1 ? '' : 's'}`}
          </p>
        </div>
        {loading ? (
          <div className="rounded-3xl border border-dashed border-orange-300 bg-orange-50 p-6 text-center text-foreground/70">
            Loading leaderboard…
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-orange-300 bg-orange-50 p-6 text-center text-foreground/70">
            Complete a learning activity today to appear on this friendly board!
          </div>
        ) : (
          <div className="grid gap-4">
            {entries.map((entry, index) => (
              <Card
                key={`${entry.userId}-${entry.date}-${index}`}
                className="border-2 border-orange-200 bg-white/80 shadow-sm"
              >
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-orange-600">
                      #{index + 1} {entry.userName || 'Explorer'}
                    </p>
                    <span className="text-xs text-foreground/60">{entry.gameId}</span>
                  </div>
                  <div className="text-5xl font-black text-orange-500">{entry.score}</div>
                  <p className="text-sm text-foreground/60">
                    {entry.date ? new Date(entry.date).toLocaleDateString() : 'Today'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer Message */}
      <div className="mt-8 p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-3 border-purple-200 text-center space-y-3">
        <p className="text-2xl font-black text-foreground">
          🎉 You are amazing too!
        </p>
        <p className="text-lg text-foreground/70 font-semibold">
          Keep exploring, learning, and growing at your own pace. <br />
          Every step forward is worth celebrating! 🌈
        </p>
      </div>

      {/* Positive Affirmations */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {['You\'re brave 💪', 'You\'re creative 🎨', 'You\'re smart 🧠', 'You\'re kind 💖', 'You\'re funny 😄', 'You\'re strong 🌟', 'You\'re special ✨', 'You\'re awesome 🚀'].map((affirmation, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-2xl border-2 border-blue-200 text-center font-bold text-foreground/70 hover:bg-blue-50 transition-colors"
          >
            {affirmation}
          </div>
        ))}
      </div>
    </div>
  );
}
