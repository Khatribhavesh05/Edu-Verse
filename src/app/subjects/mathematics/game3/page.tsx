
'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateHint } from '@/ai/flows/generate-hint';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, Pen, Zap } from 'lucide-react';

const POLYGONS = [
    { name: 'Triangle', sides: 3 },
    { name: 'Square', sides: 4 },
    { name: 'Pentagon', sides: 5 },
    { name: 'Hexagon', sides: 6 },
    { name: 'Heptagon', sides: 7 },
];

const PolygonPlayground = () => {
    const [level, setLevel] = useState(0);
    const [vertices, setVertices] = useState<{ x: number, y: number }[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [score, setScore] = useState(0);
    const [win, setWin] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [hint, setHint] = useState<{ title: string; description: string | null }>({ title: '', description: null });
    const [isHintLoading, setIsHintLoading] = useState(false);

    const { toast } = useToast();
    const currentPolygon = useMemo(() => POLYGONS[level], [level]);

    const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isDrawing) return;
        const svg = e.currentTarget;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const { x, y } = pt.matrixTransform(svg.getScreenCTM()?.inverse());
        setVertices(prev => [...prev, { x, y }]);
    };

    const checkShape = () => {
        setIsDrawing(false);
        if (vertices.length === currentPolygon.sides) {
            toast({ title: 'Correct!', description: `You drew a ${currentPolygon.name}!` });
            setScore(s => s + 10);
            if (level < POLYGONS.length - 1) {
                setLevel(l => l + 1);
                 setVertices([]);
                 setIsDrawing(true);
            } else {
                setWin(true);
            }
        } else {
            toast({ variant: 'destructive', title: 'Incorrect!', description: `A ${currentPolygon.name} has ${currentPolygon.sides} vertices. You drew ${vertices.length}.` });
            setVertices([]);
            setIsDrawing(true);
        }
    };
    
    const handleAskAI = async () => {
        setIsHintLoading(true);
        const question = `What are the properties of a ${currentPolygon.name}? For example, how many sides and angles does it have?`;
        try {
            const res = await generateHint({ question });
            setHint({ title: `Hint for ${currentPolygon.name}`, description: res.hint });
        } catch (e) {
            setHint({ title: 'Error', description: 'Could not get a hint.' });
        } finally {
            setIsHintLoading(false);
        }
    };
    
    const startGame = () => {
        setLevel(0);
        setScore(0);
        setWin(false);
        setGameStarted(true);
        setVertices([]);
        setIsDrawing(true);
    };

    if (!gameStarted) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <Pen className="w-20 h-20 text-primary mb-4" />
                <h1 className="text-4xl font-bold text-primary mb-4">Polygon Playground</h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-md">Click to place vertices and draw the requested polygon. Learn the properties of geometric shapes!</p>
                <Button onClick={startGame} size="lg">Start Drawing</Button>
            </div>
        );
    }
    
    if (win) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl shadow-lg">
                <Confetti recycle={false} />
                <h1 className="text-5xl font-bold text-green-500 mb-4">Geometry Pro!</h1>
                <p className="text-2xl text-foreground mb-8">You've mastered all the polygons! Final Score: {score}</p>
                <Button onClick={startGame} size="lg">Play Again</Button>
            </div>
        );
    }

    const pathData = vertices.length > 0
        ? `M ${vertices[0].x} ${vertices[0].y} ` + vertices.slice(1).map(v => `L ${v.x} ${v.y}`).join(' ') + (isDrawing ? '' : ' Z')
        : "";

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-card text-foreground rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-primary">Polygon Playground</h1>
                <div className='text-2xl font-bold text-green-500'>Score: {score}</div>
            </div>

             <div className="text-center p-4 mb-4 bg-background rounded-lg">
                <h2 className="text-2xl">Draw a: <span className="font-bold text-accent">{currentPolygon.name}</span></h2>
            </div>
            
            <svg
                width="100%"
                height="400"
                className="bg-muted rounded-lg border-2 border-border cursor-crosshair mb-4"
                onClick={handleCanvasClick}
            >
                {vertices.map((v, i) => (
                    <motion.circle key={i} cx={v.x} cy={v.y} r="8" fill="hsl(var(--primary))" initial={{scale:0}} animate={{scale:1}} />
                ))}
                <path d={pathData} stroke="hsl(var(--accent))" strokeWidth="4" fill="hsla(var(--accent), 0.2)" />
            </svg>

            <div className="flex justify-center gap-4">
                <Button onClick={checkShape} disabled={vertices.length < 2} size="lg"><Zap className="mr-2"/>Check Shape</Button>
                <Button onClick={() => { setVertices([]); setIsDrawing(true); }} variant="outline" size="lg">Clear</Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary" onClick={handleAskAI}>
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
    );
};

export default PolygonPlayground;
