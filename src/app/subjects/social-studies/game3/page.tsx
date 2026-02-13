
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Landmark, Send, Globe2 } from 'lucide-react';
import { shuffle } from 'lodash';
import { endGameTracking } from '@/lib/game-activity-tracker';

const LANDMARKS = [
  { name: "Eiffel Tower", country: "France" },
  { name: "Great Wall", country: "China" },
  { name: "Statue of Liberty", country: "USA" },
  { name: "Taj Mahal", country: "India" },
  { name: "Pyramids of Giza", country: "Egypt" },
  { name: "Colosseum", country: "Italy" },
  { name: "Machu Picchu", country: "Peru" },
  { name: "Christ the Redeemer", country: "Brazil" },
  { name: "Sydney Opera House", country: "Australia" },
];

const LandmarkCountryGame = () => {
  const [level, setLevel] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [shuffledLandmarks, setShuffledLandmarks] = useState(LANDMARKS);
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [startTime] = useState<number>(Date.now());
  
  const { toast } = useToast();
  const currentLandmark = useMemo(() => shuffledLandmarks[level], [shuffledLandmarks, level]);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim().toLowerCase() === currentLandmark.country.toLowerCase()) {
      toast({ title: 'Correct!', description: `The ${currentLandmark.name} is in ${currentLandmark.country}!` });
      setScore(s => s + 10);
      if (level < LANDMARKS.length - 1) {
        setLevel(l => l + 1);
      } else {
        endGameTracking('social-studies-traveler', 'World Traveler', 'social-studies', startTime, score / 10 + 1, LANDMARKS.length);
        setWin(true);
      }
    } else {
      toast({ variant: 'destructive', title: 'Incorrect!', description: `That's not the right country. The correct answer was ${currentLandmark.country}.` });
        if (level < LANDMARKS.length - 1) {
            setLevel(l => l + 1);
        } else {
            endGameTracking('social-studies-traveler', 'World Traveler', 'social-studies', startTime, score / 10, LANDMARKS.length);
            setWin(true);
        }
    }
    setGuess("");
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `I need to guess the country for the landmark: "${currentLandmark.name}". Can you give me a geographical or cultural hint about the country, without naming it?`;
    try {
      const res = await generateHint({ question });
      setHint({ title: 'Traveler\'s Tip', description: res.hint });
    } catch (e) {
      setHint({ title: 'Error', description: 'Could not get a hint right now.' });
    } finally {
      setIsHintLoading(false);
    }
  };

  const startGame = () => {
    setLevel(0);
    setScore(0);
    setWin(false);
    setGameStarted(true);
    setShuffledLandmarks(shuffle(LANDMARKS));
  };
  
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Globe2 className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-4">World Traveler</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">Guess which country a famous landmark is in. Test your geography knowledge!</p>
        <Button onClick={startGame} size="lg">Start Traveling</Button>
      </div>
    );
  }

  if (win) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Confetti recycle={false} />
        <h1 className="text-5xl font-bold text-green-500 mb-4">Expert Traveler!</h1>
        <p className="text-2xl text-foreground mb-8">You've mastered world landmarks! Final Score: {score}</p>
        <Button onClick={startGame} size="lg">Play Again</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-primary">World Traveler</h1>
        <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
      </div>
      
      <div className="text-center p-8 mb-8 bg-background rounded-lg">
        <p className="text-xl text-muted-foreground mb-2">In which country would you find the...</p>
        <h2 className="text-5xl font-bold text-accent">{currentLandmark.name}?</h2>
      </div>

      <form onSubmit={handleGuess} className="flex gap-2 mb-4">
        <Input 
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter country name..."
          className="flex-grow text-lg"
          autoComplete="off"
        />
        <Button type="submit" size="icon"><Send /></Button>
      </form>

      <div className="text-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={handleAskAI}>
              <Info className="mr-2 h-4 w-4" /> Ask AI for a Hint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card border-primary">
            <DialogHeader><DialogTitle className="text-primary">{hint.title}</DialogTitle></DialogHeader>
            {isHintLoading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div> : <p>{hint.description}</p>}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LandmarkCountryGame;
