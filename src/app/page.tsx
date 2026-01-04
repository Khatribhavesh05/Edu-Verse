
'use client';

import Link from 'next/link';
import { ArrowRight, MessageSquare, BrainCircuit } from 'lucide-react';
import { SubjectCard } from '@/components/subject-card';
import { subjects } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-16"
    >
      <section className="text-center">
        <motion.div 
          className="inline-block p-4 bg-yellow-300/50 rounded-full mb-4 shadow-lg"
          animate={{ rotate: [0, 15, -10, 15, 0], scale: [1, 1.1, 1, 1.1, 1]}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
            <span className="text-6xl">👋</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Welcome to EduVerse!
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-xl text-brand-text-light font-medium">
          Your fun-filled adventure in learning starts right here. Pick a subject and let the games begin!
        </p>
         <div className="mt-8">
            <Link href="/dashboard">
                <Button size="lg">
                    Go to my Dashboard <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
            </Link>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold mb-8 text-center">What do you want to learn today?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.slug}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
            >
              <SubjectCard subject={subject} />
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold mb-8 text-center">AI Learning Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/ai-tutor">
            <Card className="h-full hover:border-blue-400 transition-colors group hover:shadow-2xl hover:-translate-y-2 rounded-3xl bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-2xl"><MessageSquare className="w-10 h-10 text-blue-600" /></div>
                  <span className="text-3xl font-bold">AI Chatbot</span>
                </CardTitle>
                <CardDescription className="text-lg text-brand-text-light">
                  Have a question? Ask Orbi, your friendly robot assistant!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center font-bold text-lg text-blue-600 group-hover:text-blue-700">
                  Start Chatting <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/topic-description">
            <Card className="h-full hover:border-purple-400 transition-colors group hover:shadow-2xl hover:-translate-y-2 rounded-3xl bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-2xl"><BrainCircuit className="w-10 h-10 text-purple-600" /></div>
                   <span className="text-3xl font-bold">Topic Explorer</span>
                </CardTitle>
                <CardDescription className="text-lg text-brand-text-light">
                  Get simple and fun descriptions for any topic you can imagine!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center font-bold text-lg text-purple-600 group-hover:text-purple-700">
                  Explore Topic <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
