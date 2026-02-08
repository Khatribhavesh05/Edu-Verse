
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, PenLine } from 'lucide-react';
import { shuffle } from 'lodash';

const ItemTypes = {
  WORD: 'word',
};

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "She sells seashells by the seashore.",
  "How much wood would a woodchuck chuck?",
  "Peter Piper picked a peck of pickled peppers.",
  "I have a dream that one day this nation will rise up.",
  "To be or not to be, that is the question.",
  "The only thing we have to fear is fear itself.",
  "Ask not what your country can do for you.",
];

interface WordProps {
  word: string;
  index: number;
  moveWord: (dragIndex: number, hoverIndex: number) => void;
}

const Word = ({ word, index, moveWord }: WordProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.WORD,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

      moveWord(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.WORD,
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="p-2 px-4 bg-primary/20 text-foreground rounded-lg cursor-move border border-primary/50 text-lg font-semibold"
    >
      {word}
    </div>
  );
};

const WordWeaverGame = () => {
  const [level, setLevel] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  
  const { toast } = useToast();
  const originalSentence = useMemo(() => SENTENCES[level], [level]);

  useEffect(() => {
    if (gameStarted) {
      setWords(shuffle(originalSentence.replace(/[.?]/g, '').split(' ')));
    }
  }, [level, gameStarted, originalSentence]);

  const moveWord = useCallback((dragIndex: number, hoverIndex: number) => {
    setWords((prevWords) => {
      const newWords = [...prevWords];
      const [draggedWord] = newWords.splice(dragIndex, 1);
      newWords.splice(hoverIndex, 0, draggedWord);
      return newWords;
    });
  }, []);

  const checkSentence = () => {
    const constructedSentence = words.join(' ');
    const targetSentence = originalSentence.replace(/[.?]/g, '');

    if (constructedSentence === targetSentence) {
      toast({ title: 'Correct!', description: 'Great job forming the sentence!' });
      setScore(s => s + 10);
      if (level < SENTENCES.length - 1) {
        setLevel(l => l + 1);
      } else {
        setWin(true);
      }
    } else {
      toast({ variant: 'destructive', title: 'Not quite!', description: 'The sentence is not correct. Try again!' });
    }
  };
  
  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `Give me a hint for unscrambling a sentence. The original sentence is a famous quote or phrase. The words I have are: ${words.join(', ')}. Don't give me the first word, but maybe a clue about the subject.`;
    try {
      const res = await generateHint({ question });
      setHint({ title: 'Grammar Hint', description: res.hint });
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
  };
  
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <PenLine className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-4">Word Weaver</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">Unscramble the words to form a correct sentence. Test your grammar and sentence structure skills!</p>
        <Button onClick={startGame} size="lg">Start Weaving</Button>
      </div>
    );
  }

  if (win) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Confetti recycle={false} />
        <h1 className="text-5xl font-bold text-green-500 mb-4">Congratulations!</h1>
        <p className="text-2xl text-foreground mb-8">You've mastered the art of sentences! Final Score: {score}</p>
        <Button onClick={startGame} size="lg">Play Again</Button>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-4xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Word Weaver</h1>
            <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
        </div>

        <div className="text-center p-4 mb-6 bg-background rounded-lg">
            <h2 className="text-2xl text-foreground">Unscramble the sentence:</h2>
        </div>

        <div className="min-h-[80px] bg-muted rounded-lg p-4 flex flex-wrap gap-4 items-center justify-center mb-6">
          {words.map((word, i) => (
            <Word key={i} index={i} word={word} moveWord={moveWord} />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={checkSentence} size="lg">Check Sentence</Button>
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

export default WordWeaverGame;
