
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Loader2, Volume2, PlayCircle, SkipForward } from 'lucide-react';

interface GameIntroductionProps {
  title: string;
  description: string;
  steps: string[];
  onStartGame: () => void;
}

export function GameIntroduction({ title, description, steps, onStartGame }: GameIntroductionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handlePlaySound = async (text: string) => {
    if (isAudioLoading) return;
    setIsAudioLoading(true);
    setAudioUrl(null);
    try {
      const result = await textToSpeech({ text });
      setAudioUrl(result.audio);
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsAudioLoading(false);
    }
  };

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onplay = () => setIsAudioPlaying(true);
      audio.onended = () => setIsAudioPlaying(false);
      audio.play();
    }
  }, [audioUrl]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
        // If it's the last step, the button should act as start game
        onStartGame();
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg shadow-lg max-w-2xl mx-auto"
    >
      <div className="mb-4 text-6xl">
        <motion.span
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
            🪐
        </motion.span>
      </div>
      <h1 className="text-4xl font-bold text-primary mb-2">{title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{description}</p>

      <div className="w-full h-48 bg-background rounded-lg p-6 flex flex-col justify-center items-center relative overflow-hidden border-2 border-primary/20">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex items-center gap-4"
            >
                <p className="text-xl text-foreground font-medium">
                    {steps[currentStep]}
                </p>
                <Button variant="ghost" size="icon" onClick={() => handlePlaySound(steps[currentStep])} disabled={isAudioLoading}>
                    {isAudioLoading ? <Loader2 className="animate-spin" /> : <Volume2 className={`w-6 h-6 ${isAudioPlaying ? 'text-accent' : ''}`} />}
                </Button>
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8 w-full">
         <Button onClick={onStartGame} variant="outline" className="w-full">
            <SkipForward className="mr-2" /> Skip
        </Button>
        <Button onClick={handleNextStep} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLastStep ? 'Let\'s Go!' : 'Next'}
            <PlayCircle className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
