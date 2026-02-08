
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare } from 'lucide-react';
import { Input } from './ui/input';
import { ChatbotForm } from './chatbot-form';

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-96 h-[32rem] mb-4 origin-bottom-right"
            >
              <Card className="w-full h-full flex flex-col shadow-2xl border-2 border-blue-300">
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-white/80">
                  <CardTitle className="text-xl font-bold text-blue-700">Orbi 🪐</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chatbot" className="rounded-full">
                    <X className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 p-4 flex flex-col">
                  <ChatbotForm />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 text-primary-foreground shadow-lg"
            aria-label="Open Orbi Chatbot"
          >
            {isOpen ? <X className="w-10 h-10" /> : <span className="text-4xl animate-bounce">🪐</span>}
          </Button>
        </motion.div>
      </div>
    </>
  );
}
