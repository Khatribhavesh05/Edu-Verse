
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Blocks } from 'lucide-react';
import { shuffle } from 'lodash';
import { endGameTracking } from '@/lib/game-activity-tracker';

const ItemTypes = {
  PARAGRAPH: 'paragraph',
};

const STORIES = [
  {
    title: "The Boy Who Cried Wolf",
    paragraphs: [
      "A young shepherd boy, bored with his job, decided to play a trick on the nearby villagers.",
      "He shouted, 'Wolf! Wolf!' and the villagers came running, only to find no wolf. He laughed at their expense.",
      "He repeated the trick several times, and each time the villagers grew more annoyed.",
      "One day, a real wolf appeared. The boy cried 'Wolf! Wolf!' as loud as he could, but no one came to help, thinking it was another false alarm.",
      "The wolf scattered the flock, and the boy learned a valuable lesson: nobody believes a liar, even when they are telling the truth."
    ]
  },
  {
    title: "The Tortoise and the Hare",
    paragraphs: [
      "A hare once boasted of his speed before the other animals. 'I have never yet been beaten,' said he, 'when I put forth my full speed.'",
      "The tortoise said quietly, 'I will run with you.' The hare, thinking this a great joke, agreed.",
      "The hare shot ahead and, confident in his lead, decided to take a nap. The tortoise, plodding on, never stopped.",
      "When the hare awoke, he saw the tortoise was nearing the finish line. He ran as fast as he could, but it was too late.",
      "The tortoise had crossed the line, teaching everyone that slow and steady wins the race."
    ]
  }
];

const Paragraph = ({ text, index, moveParagraph }: { text: string; index: number; moveParagraph: (from: number, to: number) => void }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PARAGRAPH,
    item: { index },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.PARAGRAPH,
    hover({ index: dragIndex }: { index: number }) {
      if (dragIndex !== index) {
        moveParagraph(dragIndex, index);
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="p-4 bg-secondary text-secondary-foreground rounded-lg cursor-grab active:cursor-grabbing border border-border mb-4">
      {text}
    </div>
  );
};

const StoryScramblerGame = () => {
  const [level, setLevel] = useState(0);
  const [scrambledStory, setScrambledStory] = useState<string[]>([]);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [storiesCompleted, setStoriesCompleted] = useState(0);
  const [startTime] = useState<number>(Date.now());
  
  const { toast } = useToast();
  const currentStory = useMemo(() => STORIES[level], [level]);

  useEffect(() => {
    if (gameStarted) {
      setScrambledStory(shuffle(currentStory.paragraphs));
    }
  }, [level, gameStarted, currentStory]);

  const moveParagraph = useCallback((dragIndex: number, hoverIndex: number) => {
    setScrambledStory(prev => {
      const newOrder = [...prev];
      const [draggedItem] = newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, draggedItem);
      return newOrder;
    });
  }, []);

  const checkOrder = () => {
    if (JSON.stringify(scrambledStory) === JSON.stringify(currentStory.paragraphs)) {
      toast({ title: 'Correct!', description: 'You put the story together perfectly!' });
      setStoriesCompleted(s => s + 1);
      if (level < STORIES.length - 1) {
        setLevel(l => l + 1);
      } else {
        endGameTracking('language-story-scrambler', 'Story Scrambler', 'language', startTime, storiesCompleted + 1, STORIES.length);
        setWin(true);
      }
    } else {
      toast({ variant: 'destructive', title: 'Not Quite!', description: 'The story doesn’t flow correctly. Try rearranging the paragraphs.' });
    }
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `I'm trying to order the paragraphs of the story "${currentStory.title}". Can you give me a hint about what happens in the beginning, without giving away the first paragraph?`;
    try {
      const res = await generateHint({ question });
      setHint({ title: 'Narrative Hint', description: res.hint });
    } catch (e) {
      setHint({ title: 'Error', description: 'Could not get a hint.' });
    } finally {
      setIsHintLoading(false);
    }
  };

  const startGame = () => {
    setLevel(0);
    setStoriesCompleted(0);
    setWin(false);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Blocks className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-4">Story Scrambler</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">The paragraphs of a famous fable are all mixed up! Drag and drop them into the correct order to rebuild the story.</p>
        <Button onClick={startGame} size="lg">Start Building</Button>
      </div>
    );
  }

  if (win) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Confetti recycle={false} />
        <h1 className="text-5xl font-bold text-green-500 mb-4">Master Storyteller!</h1>
        <p className="text-2xl text-foreground mb-8">You've successfully pieced together all the stories!</p>
        <Button onClick={startGame} size="lg">Play Again</Button>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-4xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Story Scrambler</h1>
          <h2 className="text-xl font-semibold text-muted-foreground">{currentStory.title}</h2>
        </div>
        
        <div className="mb-6">
          {scrambledStory.map((p, i) => (
            <Paragraph key={i} index={i} text={p} moveParagraph={moveParagraph} />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={checkOrder} size="lg">Check Story Order</Button>
           <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handleAskAI}>
                <Info className="mr-2 h-4 w-4" /> Ask AI
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card border-primary">
              <DialogHeader><DialogTitle className="text-primary">{hint.title}</DialogTitle></DialogHeader>
              {isHintLoading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div> : <p>{hint.description}</p>}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DndProvider>
  );
};

export default StoryScramblerGame;
