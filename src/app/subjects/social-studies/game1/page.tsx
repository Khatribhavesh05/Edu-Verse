
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Landmark, GanttChartSquare } from 'lucide-react';
import { shuffle } from 'lodash';

const ItemTypes = {
  EVENT: 'event',
};

const TIMELINES = [
  {
    title: "American Revolution",
    events: [
      { id: 1, text: "Stamp Act (1765)", year: 1765 },
      { id: 2, text: "Boston Tea Party (1773)", year: 1773 },
      { id: 3, text: "Battles of Lexington and Concord (1775)", year: 1775 },
      { id: 4, text: "Declaration of Independence (1776)", year: 1776 },
      { id: 5, text: "Treaty of Paris (1783)", year: 1783 },
    ]
  },
  {
    title: "World War II",
    events: [
      { id: 1, text: "Invasion of Poland (1939)", year: 1939 },
      { id: 2, text: "Attack on Pearl Harbor (1941)", year: 1941 },
      { id: 3, text: "D-Day: Normandy Landings (1944)", year: 1944 },
      { id: 4, text: "V-E Day (Victory in Europe) (1945)", year: 1945 },
      { id: 5, text: "Atomic bombings of Hiroshima and Nagasaki (1945)", year: 1945.1 }, // Differentiate for sorting
    ]
  }
];

const EventCard = ({ event, index, moveEvent }: { event: { id: number, text: string }, index: number, moveEvent: (from: number, to: number) => void }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.EVENT,
    item: { index },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.EVENT,
    hover({ index: dragIndex }: { index: number }) {
      if (dragIndex !== index) {
        moveEvent(dragIndex, index);
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="p-4 bg-secondary text-secondary-foreground rounded-lg cursor-grab active:cursor-grabbing border border-border mb-4 text-center">
      <p className="font-semibold">{event.text}</p>
    </div>
  );
};

const HistoricalTimelineGame = () => {
  const [level, setLevel] = useState(0);
  const [shuffledEvents, setShuffledEvents] = useState<{ id: number; text: string; year: number }[]>([]);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [timelinesCompleted, setTimelinesCompleted] = useState(0);
  
  const { toast } = useToast();
  const currentTimeline = useMemo(() => TIMELINES[level], [level]);

  useEffect(() => {
    if (gameStarted) {
      setShuffledEvents(shuffle(currentTimeline.events));
    }
  }, [level, gameStarted, currentTimeline]);

  const moveEvent = useCallback((dragIndex: number, hoverIndex: number) => {
    setShuffledEvents(prev => {
      const newOrder = [...prev];
      const [draggedItem] = newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, draggedItem);
      return newOrder;
    });
  }, []);

  const checkOrder = () => {
    const correctOrder = currentTimeline.events.map(e => e.id);
    const playerOrder = shuffledEvents.map(e => e.id);
    if (JSON.stringify(playerOrder) === JSON.stringify(correctOrder)) {
      toast({ title: 'Correct!', description: 'You put the events in the right order!' });
      setTimelinesCompleted(t => t + 1);
      if (level < TIMELINES.length - 1) {
        setLevel(l => l + 1);
      } else {
        setWin(true);
      }
    } else {
      toast({ variant: 'destructive', title: 'Not Quite!', description: 'The order of events is incorrect. Try again!' });
    }
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    const question = `I'm trying to order events for the timeline "${currentTimeline.title}". Can you give me a hint about an event that happened early on, without giving away its exact position?`;
    try {
      const res = await generateHint({ question });
      setHint({ title: 'Historical Hint', description: res.hint });
    } catch (e) {
      setHint({ title: 'Error', description: 'Could not get a hint.' });
    } finally {
      setIsHintLoading(false);
    }
  };

  const startGame = () => {
    setLevel(0);
    setWin(false);
    setGameStarted(true);
    setTimelinesCompleted(0);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <GanttChartSquare className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-4">Historical Timeline Challenge</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">Drag and drop the historical events into the correct chronological order to build the timeline.</p>
        <Button onClick={startGame} size="lg">Start Challenge</Button>
      </div>
    );
  }

  if (win) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
        <Confetti recycle={false} />
        <h1 className="text-5xl font-bold text-green-500 mb-4">History Master!</h1>
        <p className="text-2xl text-foreground mb-8">You've successfully ordered all the historical timelines!</p>
        <Button onClick={startGame} size="lg">Play Again</Button>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-4xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Timeline Challenge</h1>
          <h2 className="text-xl font-semibold text-muted-foreground">Topic: {currentTimeline.title}</h2>
        </div>
        
        <div className="mb-6 bg-background p-4 rounded-lg flex items-center">
            <div className="w-1/6 text-center text-muted-foreground font-bold">Earlier</div>
            <div className="w-4/6">
                {shuffledEvents.map((event, i) => (
                    <EventCard key={event.id} index={i} event={event} moveEvent={moveEvent} />
                ))}
            </div>
            <div className="w-1/6 text-center text-muted-foreground font-bold">Later</div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={checkOrder} size="lg">Check Order</Button>
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

export default HistoricalTimelineGame;
