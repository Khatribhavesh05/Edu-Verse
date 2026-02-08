'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, BatteryCharging, Trophy, Star, Sparkles, Shirt, Glasses, Crown } from 'lucide-react';
import { StreakSystem } from '@/components/streak-system';
import { playPageTransitionSound } from '@/lib/sound-effects';

const petOptions = [
  { id: 'dragon', label: 'Dragon', emoji: '🐉', color: 'from-emerald-200 to-teal-100' },
  { id: 'panda', label: 'Panda', emoji: '🐼', color: 'from-slate-100 to-zinc-50' },
  { id: 'robot', label: 'Robot', emoji: '🤖', color: 'from-sky-100 to-blue-50' },
  { id: 'alien', label: 'Alien', emoji: '👽', color: 'from-lime-100 to-emerald-50' },
];

const accessories = [
  { id: 'hat', label: 'Rainbow Hat', icon: Crown },
  { id: 'glasses', label: 'Star Glasses', icon: Glasses },
  { id: 'outfit', label: 'Comfy Outfit', icon: Shirt },
];

export default function MyLearningPetPage() {
  const [petName, setPetName] = useState('Spark');
  const [selectedPet, setSelectedPet] = useState(petOptions[0]);
  const [points, setPoints] = useState(120);
  const [happiness, setHappiness] = useState(72);
  const [energy, setEnergy] = useState(64);
  const [xp, setXp] = useState(180);
  const [streakDays, setStreakDays] = useState(7); // Simulated streak days

  useEffect(() => {
    playPageTransitionSound();
  }, []);

  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp]);
  const xpToNext = useMemo(() => 100 - (xp % 100), [xp]);
  const evolutionProgress = Math.min(100, Math.round((level / 5) * 100));

  const feedPet = () => {
    if (points < 20) return;
    setPoints((prev) => prev - 20);
    setHappiness((prev) => Math.min(100, prev + 8));
    setEnergy((prev) => Math.min(100, prev + 6));
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-2">
        <h1 className="text-5xl font-black tracking-tight">My Learning Pet 🐣</h1>
        <p className="text-xl text-brand-text-light">A friendly buddy that grows with your learning journey.</p>
      </section>

      {/* Streak & Motivation System */}
      <StreakSystem streakDays={streakDays} showRewards={true} />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Card className="shadow-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Meet Your Pet</CardTitle>
            <CardDescription className="text-lg">Pick a buddy and give them a name.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`rounded-3xl bg-gradient-to-br ${selectedPet.color} p-8 text-center`}
            >
              <motion.div
                key={selectedPet.id}
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: [0.9, 1.05, 1], opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-[110px]"
              >
                {selectedPet.emoji}
              </motion.div>
              <p className="text-2xl font-bold text-gray-800 mt-2">{selectedPet.label}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {petOptions.map((pet) => (
                <Button
                  key={pet.id}
                  variant={selectedPet.id === pet.id ? 'default' : 'outline'}
                  onClick={() => setSelectedPet(pet)}
                  className="rounded-2xl"
                >
                  <span className="text-xl mr-2">{pet.emoji}</span>
                  {pet.label}
                </Button>
              ))}
            </div>

            <div className="grid gap-3">
              <label className="text-sm font-semibold text-gray-700">Pet Name</label>
              <Input
                value={petName}
                onChange={(event) => setPetName(event.target.value)}
                placeholder="Give your pet a name"
                className="text-lg rounded-2xl"
              />
              <p className="text-sm text-gray-500">Say hi to <span className="font-semibold">{petName}</span>!</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-xl bg-gradient-to-br from-pink-50 to-orange-50 border-pink-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Pet Status</CardTitle>
              <CardDescription className="text-base">Keep your pet happy and energized.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-pink-500" /> Happiness</span>
                  <span>{happiness}%</span>
                </div>
                <Progress value={happiness} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="flex items-center gap-2"><BatteryCharging className="w-4 h-4 text-emerald-500" /> Energy</span>
                  <span>{energy}%</span>
                </div>
                <Progress value={energy} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500" /> XP / Level</span>
                  <span>Level {level}</span>
                </div>
                <Progress value={(xp % 100)} />
                <p className="text-xs text-gray-600">{xpToNext} XP to the next level</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Feed Your Pet</CardTitle>
              <CardDescription className="text-base">Use points to give your pet a yummy snack.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-base px-3 py-1">Points: {points}</Badge>
                <Badge variant="outline" className="text-base px-3 py-1">Snack Cost: 20</Badge>
              </div>
              <Button onClick={feedPet} className="w-full rounded-2xl text-lg" disabled={points < 20}>
                Feed {petName}
              </Button>
              {points < 20 && (
                <p className="text-xs text-red-500">Earn more points by completing learning tasks.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Learning = Growth</CardTitle>
            <CardDescription>Complete quizzes and games to grow your pet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>Every correct answer adds XP to your pet.</p>
            <p>Games and quests unlock extra XP bonuses.</p>
            <p className="font-semibold text-purple-600">Your pet grows when YOU learn 📚✨</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Dress Up</CardTitle>
            <CardDescription>Unlock and equip cute accessories.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {accessories.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-purple-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-gray-700">{item.label}</span>
                  </div>
                  <Badge variant="secondary">Unlocked</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Next Evolution</CardTitle>
            <CardDescription>Reach Level 5 to evolve!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={evolutionProgress} />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Level {level} / 5</span>
              <span>{evolutionProgress}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-600">
              <Sparkles className="w-4 h-4" />
              Keep learning to unlock the next stage!
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
        <CardContent className="py-6 text-center">
          <p className="text-xl font-bold text-yellow-800">Your pet grows when YOU learn 📚✨</p>
          <p className="text-sm text-yellow-700 mt-1">Complete quests, games, and quizzes to help {petName} level up.</p>
        </CardContent>
      </Card>
    </div>
  );
}
