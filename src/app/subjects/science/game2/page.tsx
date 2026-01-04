
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, PlusCircle, MinusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const EcosystemBalanceGame = () => {
  const [day, setDay] = useState(0);
  const [plants, setPlants] = useState(5);
  const [herbivores, setHerbivores] = useState(2);
  const [carnivores, setCarnivores] = useState(1);
  const [environmentalFactor, setEnvironmentalFactor] = useState<'normal' | 'drought' | 'rainy'>('normal');
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  const { toast } = useToast();

  const MAX_DAYS = 20;

  const ICONS = useMemo(() => ({
      plant: Array(plants).fill(0).map((_, i) => <motion.span key={`p${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl">🌱</motion.span>),
      herbivore: Array(herbivores).fill(0).map((_, i) => <motion.span key={`h${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl">🐇</motion.span>),
      carnivore: Array(carnivores).fill(0).map((_, i) => <motion.span key={`c${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl">🦊</motion.span>),
  }), [plants, herbivores, carnivores]);

  const handleNextDay = useCallback(() => {
    setDay(d => d + 1);

    // Environmental event
    const rand = Math.random();
    if (rand < 0.15) { setEnvironmentalFactor('drought'); toast({ title: "Drought!", description: "Plants will grow slower." }); }
    else if (rand < 0.3) { setEnvironmentalFactor('rainy'); toast({ title: "Heavy Rain!", description: "Plants will grow faster." }); }
    else { setEnvironmentalFactor('normal'); }

    // Ecosystem logic
    setPlants(p => {
      let growthRate = environmentalFactor === 'rainy' ? 2 : 1;
      if (environmentalFactor === 'drought') growthRate = 0.5;
      return Math.max(0, p + Math.ceil(p * 0.2 * growthRate) - herbivores);
    });

    setHerbivores(h => {
      const foodAvailable = plants > h;
      const growthRate = foodAvailable ? 1.2 : 0.7;
      return Math.max(0, Math.floor(h * growthRate) - carnivores);
    });

    setCarnivores(c => {
      const foodAvailable = herbivores > c;
      const growthRate = foodAvailable ? 1.1 : 0.6;
      return Math.max(0, Math.floor(c * growthRate));
    });

  }, [plants, herbivores, carnivores, environmentalFactor, toast]);

  useEffect(() => {
    if (!gameStarted) return;
    if ((plants <= 0 || herbivores <= 0 || carnivores <= 0) && !gameOver) {
      setGameOver(true);
      toast({ variant: 'destructive', title: "Ecosystem Collapse!", description: "A species was wiped out." });
    } else if (day >= MAX_DAYS && !gameOver) {
      setWin(true);
      setGameOver(true);
    }
  }, [plants, herbivores, carnivores, day, gameStarted, toast, gameOver]);

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = "What is a food chain and why is it important for an ecosystem?";
    try {
      const res = await generateHint({ question });
      setHint({ title: "Ecosystem Hint", description: res.hint });
    } catch (error) {
      setHint({ title: "Error", description: "Could not get a hint." });
    } finally {
      setIsHintLoading(false);
    }
  };

  const startGame = () => {
    setDay(0);
    setPlants(5);
    setHerbivores(2);
    setCarnivores(1);
    setGameOver(false);
    setWin(false);
    setGameStarted(true);
  };

  const modifyPopulation = (type: 'plant' | 'herbivore' | 'carnivore', amount: number) => {
    if (type === 'plant') setPlants(p => Math.max(0, p + amount));
    if (type === 'herbivore') setHerbivores(h => Math.max(0, h + amount));
    if (type === 'carnivore') setCarnivores(c => Math.max(0, c + amount));
  };
  
  return (
    <div className="flex flex-col items-center w-full bg-card text-foreground p-6 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-green-500 mb-4">🌿 Ecosystem Balance Challenge</h1>
      
      {!gameStarted ? (
        <div className="text-center">
            <p className="text-lg mb-6 max-w-2xl text-muted-foreground">Manage the populations of plants, herbivores, and carnivores. Survive for {MAX_DAYS} days to win. Be careful, if any species dies out, the ecosystem collapses!</p>
            <Button onClick={startGame} size="lg">Start Challenge</Button>
        </div>
      ) : gameOver ? (
         <div className="text-center">
             {win && <Confetti />}
             <h2 className="text-5xl font-bold mb-4">{win ? "You Win! 🎉" : "Game Over"}</h2>
             <p className="text-2xl mb-6">{win ? `You balanced the ecosystem for ${day} days!` : `The ecosystem collapsed on day ${day}.`}</p>
             <Button onClick={startGame} size="lg">Play Again</Button>
         </div>
      ) : (
        <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6 p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold">Day: {day}/{MAX_DAYS}</div>
                <div className="text-2xl font-bold">Weather: {environmentalFactor.charAt(0).toUpperCase() + environmentalFactor.slice(1)}</div>
                <Dialog>
                    <DialogTrigger asChild><Button variant="outline" className="bg-primary/20" onClick={handleAskAI}><Info className="mr-2"/>Ask AI</Button></DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card border-primary"><DialogHeader><DialogTitle className="text-primary">{hint.title}</DialogTitle></DialogHeader>{isHintLoading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div> : <p>{hint.description}</p>}</DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-green-500/10 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-500 mb-2">Plants: {plants}</h3>
                    <div className="flex gap-2 flex-wrap min-h-[40px]">{ICONS.plant}</div>
                    <div className="flex gap-2 mt-4"><Button size="icon" onClick={() => modifyPopulation('plant', 1)}><PlusCircle/></Button><Button size="icon" variant="destructive" onClick={() => modifyPopulation('plant', -1)}><MinusCircle/></Button></div>
                </div>
                 <div className="p-4 bg-yellow-500/10 rounded-lg">
                    <h3 className="text-2xl font-bold text-yellow-500 mb-2">Herbivores: {herbivores}</h3>
                    <div className="flex gap-2 flex-wrap min-h-[40px]">{ICONS.herbivore}</div>
                    <div className="flex gap-2 mt-4"><Button size="icon" onClick={() => modifyPopulation('herbivore', 1)}><PlusCircle/></Button><Button size="icon" variant="destructive" onClick={() => modifyPopulation('herbivore', -1)}><MinusCircle/></Button></div>
                </div>
                <div className="p-4 bg-red-500/10 rounded-lg">
                    <h3 className="text-2xl font-bold text-red-500 mb-2">Carnivores: {carnivores}</h3>
                    <div className="flex gap-2 flex-wrap min-h-[40px]">{ICONS.carnivore}</div>
                    <div className="flex gap-2 mt-4"><Button size="icon" onClick={() => modifyPopulation('carnivore', 1)}><PlusCircle/></Button><Button size="icon" variant="destructive" onClick={() => modifyPopulation('carnivore', -1)}><MinusCircle/></Button></div>
                </div>
            </div>
            
            <Button onClick={handleNextDay} className="w-full" size="lg">Next Day</Button>
        </div>
      )}
    </div>
  );
};

export default EcosystemBalanceGame;
