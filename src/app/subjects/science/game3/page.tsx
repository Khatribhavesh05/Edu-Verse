
'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, RotateCcw } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  ATOM: 'atom',
};

const ATOMS = {
  H: { name: 'Hydrogen', color: 'bg-slate-300', textColor: 'text-black' },
  O: { name: 'Oxygen', color: 'bg-red-500', textColor: 'text-white' },
  C: { name: 'Carbon', color: 'bg-gray-700', textColor: 'text-white' },
  N: { name: 'Nitrogen', color: 'bg-blue-500', textColor: 'text-white' },
};

const LEVELS = [
  { name: 'Water', formula: 'H₂O', components: { H: 2, O: 1 }, atoms: ['H', 'O', 'C'] },
  { name: 'Carbon Dioxide', formula: 'CO₂', components: { C: 1, O: 2 }, atoms: ['H', 'O', 'C'] },
  { name: 'Methane', formula: 'CH₄', components: { C: 1, H: 4 }, atoms: ['H', 'O', 'C', 'N'] },
  { name: 'Ammonia', formula: 'NH₃', components: { N: 1, H: 3 }, atoms: ['H', 'O', 'C', 'N'] },
  { name: 'Oxygen Gas', formula: 'O₂', components: { O: 2 }, atoms: ['H', 'O', 'C'] },
];

const Atom = ({ name }: { name: keyof typeof ATOMS }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ATOM,
    item: { id: name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold cursor-pointer select-none shadow-md transform hover:scale-110 transition-transform ${ATOMS[name].color} ${ATOMS[name].textColor}`}
    >
      {name}
    </div>
  );
};

const ReactionZone = ({ onDrop, droppedAtoms }: { onDrop: (item: { id: keyof typeof ATOMS }) => void; droppedAtoms: (keyof typeof ATOMS)[] }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ATOM,
    drop: (item: { id: keyof typeof ATOMS }) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative w-full h-64 bg-background rounded-2xl border-4 border-dashed transition-colors ${isOver ? 'border-primary' : 'border-border'}`}
    >
      <div className="absolute inset-0 flex items-center justify-center gap-4 flex-wrap p-4">
        {droppedAtoms.map((atom, i) => (
            <motion.div 
                key={i} 
                initial={{scale: 0.5, opacity: 0}} 
                animate={{scale: 1, opacity: 1}}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${ATOMS[atom].color} ${ATOMS[atom].textColor}`}
            >
                {atom}
            </motion.div>
        ))}
      </div>
      {droppedAtoms.length === 0 && <p className="absolute inset-0 flex items-center justify-center text-muted-foreground text-2xl">Drag atoms here</p>}
    </div>
  );
};


const ChemistryLabGame = () => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [droppedAtoms, setDroppedAtoms] = useState<(keyof typeof ATOMS)[]>([]);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  const { toast } = useToast();

  const currentLevel = useMemo(() => LEVELS[levelIndex], [levelIndex]);

  const handleDrop = (item: { id: keyof typeof ATOMS }) => {
    setDroppedAtoms(prev => [...prev, item.id]);
  };

  const checkCombination = () => {
    const counts: { [key: string]: number } = {};
    for (const atom of droppedAtoms) {
      counts[atom] = (counts[atom] || 0) + 1;
    }

    const correct = 
      Object.keys(currentLevel.components).length === Object.keys(counts).length &&
      Object.entries(currentLevel.components).every(([key, value]) => counts[key] === value);

    if (correct) {
      setScore(s => s + 10);
      toast({ title: 'Correct!', description: `You made ${currentLevel.name}!` });
      if (levelIndex < LEVELS.length - 1) {
        setLevelIndex(i => i + 1);
      } else {
        setWin(true);
      }
      setDroppedAtoms([]);
    } else {
      toast({ variant: 'destructive', title: 'Incorrect Combination', description: "That's not the right recipe. Try again!" });
      setDroppedAtoms([]);
    }
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `What atoms are needed to create ${currentLevel.name} (${currentLevel.formula})? Give me a hint about one of the atoms.`;
    try {
      const res = await generateHint({ question });
      setHint({ title: `Hint for ${currentLevel.name}`, description: res.hint });
    } catch (error) {
      setHint({ title: "Error", description: "Could not get a hint." });
    } finally {
      setIsHintLoading(false);
    }
  };

  const startGame = () => {
    setScore(0);
    setLevelIndex(0);
    setDroppedAtoms([]);
    setWin(false);
    setGameStarted(true);
  };
  
  if (!gameStarted) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
             <h1 className="text-4xl font-bold text-primary mb-4">🧪 Chemistry Lab</h1>
             <p className="text-lg text-muted-foreground mb-6 max-w-md">Combine atoms to build molecules. Can you become a Master Chemist?</p>
             <Button onClick={startGame} size="lg">Start Game</Button>
        </div>
    )
  }
  
  if (win) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
            <Confetti recycle={false} />
            <h1 className="text-5xl font-bold text-green-500 mb-4">Congratulations!</h1>
            <p className="text-2xl text-foreground mb-8">You've completed all the challenges! Final Score: {score}</p>
            <Button onClick={startGame} size="lg">Play Again</Button>
        </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-4xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Chemistry Lab</h1>
            <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
        </div>

        <div className="text-center p-4 mb-6 bg-background rounded-lg">
            <h2 className="text-2xl text-muted-foreground">Your mission: Create</h2>
            <p className="text-4xl font-extrabold text-accent tracking-wider">{currentLevel.name} ({currentLevel.formula})</p>
        </div>

        <ReactionZone onDrop={handleDrop} droppedAtoms={droppedAtoms} />
        
        <div className="flex justify-center gap-4 my-6">
            <Button onClick={checkCombination} size="lg" disabled={droppedAtoms.length === 0}>Combine!</Button>
            <Button onClick={() => setDroppedAtoms([])} variant="outline" size="lg">Clear</Button>
        </div>

        <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-xl text-center mb-4 font-semibold">Available Atoms</h3>
            <div className="flex justify-center items-center gap-4">
                {currentLevel.atoms.map(atom => <Atom key={atom} name={atom as keyof typeof ATOMS} />)}
            </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="absolute top-6 right-6" onClick={handleAskAI}>
              <Info className="mr-2 h-4 w-4" /> Ask AI
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card border-primary">
            <DialogHeader><DialogTitle className="text-primary">{hint.title}</DialogTitle></DialogHeader>
            {isHintLoading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div> : <p>{hint.description}</p>}
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
};

export default ChemistryLabGame;
