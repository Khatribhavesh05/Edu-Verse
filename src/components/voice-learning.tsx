'use client';

import { useEffect, useRef, useState } from 'react';
// Removed openai import, now using API route
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Sparkles, Volume2, XCircle } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { saveAIChatMessage } from '@/lib/firestore-ai-chat';

type VoicePhase = 'idle' | 'listening' | 'heard' | 'response';

type Prompt = {
  label: string;
};

const prompts: Prompt[] = [
  { label: 'Say: Photosynthesis' },
  { label: 'Ask: What is 5 × 6?' },
  { label: 'Repeat: The quick brown fox' },
];

const VOICE_CHAT_ID = 'voice';

export function VoiceLearning() {
  const [phase, setPhase] = useState<VoicePhase>('idle');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const recognitionRef = useRef<any>(null);
  const persistVoiceMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!content) return;
    const user = auth.currentUser;
    if (!user) return;
    try {
      await saveAIChatMessage(user.uid, VOICE_CHAT_ID, {
        role,
        content,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to log voice message:', error);
    }
  };
  useEffect(() => {
    setActivePromptIndex(Math.floor(Math.random() * prompts.length));
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    setPhase('listening');
    setMessage('Listening… speak now!');
    setResponse('');
    // Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessage('Speech recognition not supported in this browser.');
      setPhase('idle');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setPhase('heard');
      setMessage(`You said: "${transcript}"`);
      persistVoiceMessage('user', transcript);
      setPhase('response');
      setMessage('Thinking…');
      try {
        const res = await fetch('/api/orbi-voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript }),
        });
        const data = await res.json();
        setMessage('Orbi says:');
        setResponse(data.reply);
        const audio = new Audio(data.audio);
        audio.play();
        persistVoiceMessage('assistant', data.reply);
      } catch (err) {
        setMessage('Sorry, Orbi could not reply.');
        setResponse('');
      }
    };
    recognition.onerror = (event: any) => {
      setMessage('Speech recognition error.');
      setPhase('idle');
    };
    recognition.onend = () => {
      // Do nothing, handled in onresult
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setPhase('idle');
    setMessage('');
    setResponse('');
  };

  return (
    <Card className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black text-foreground">Voice Learning 🎤</h2>
          <p className="text-lg text-foreground/70 font-semibold">
            Talk to Orbi and practice learning out loud in a fun, safe way.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-3">
            <p className="text-sm font-bold text-foreground/70">Try a prompt:</p>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground/80 border-2 border-blue-100">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              {prompts[activePromptIndex].label}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {phase !== 'listening' ? (
              <Button
                onClick={startListening}
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-lg font-bold text-white shadow-xl hover:shadow-2xl"
              >
                <Mic className="mr-2 h-6 w-6" />
                🎤 Talk to Orbi
              </Button>
            ) : (
              <Button
                onClick={stopListening}
                variant="outline"
                className="rounded-full border-2 border-blue-300 px-6 py-5 text-base font-bold"
              >
                <XCircle className="mr-2 h-5 w-5" />
                Stop
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center space-y-3"
            >
              <div className="text-5xl">🎤</div>
              <h3 className="text-xl font-bold text-foreground">Try talking to Orbi — he's listening!</h3>
              <p className="text-base text-foreground/70 max-w-md mx-auto">
                Click the button above to start voice learning. Practice pronunciation or ask questions!
              </p>
            </motion.div>
          )}
          {phase !== 'idle' && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-md"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={phase === 'listening' ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ duration: 1.2, repeat: phase === 'listening' ? Infinity : 0 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
                >
                  <Mic className="h-6 w-6 text-blue-600" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-foreground">{message}</p>
                  {phase === 'listening' && (
                    <p className="text-sm text-foreground/60">
                      Orbi is listening. Speak clearly and take your time.
                    </p>
                  )}
                </div>
              </div>

              {phase === 'response' && response && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/70">
                    <Volume2 className="h-4 w-4" />
                    Orbi's Response
                  </div>
                  <p className="text-base text-foreground/80">{response}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-purple-200 bg-purple-50 p-4 text-sm text-foreground/70">
            <p className="font-bold text-foreground/80">Practice pronunciation</p>
            <p>Repeat-after-me to build confidence and clear speech.</p>
          </div>
          <div className="rounded-2xl border-2 border-yellow-200 bg-yellow-50 p-4 text-sm text-foreground/70">
            <p className="font-bold text-foreground/80">Ask by voice</p>
            <p>Speak your question and get a friendly explanation.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
