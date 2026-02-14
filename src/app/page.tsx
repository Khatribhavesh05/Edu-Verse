'use client';

import Link from 'next/link';
import { ArrowRight, MessageSquare, BrainCircuit } from 'lucide-react';
import { InteractiveBackground } from '@/components/ui/interactive-background';
import { AnimatedGradientBackground } from '@/components/hero/animated-gradient';
import { FloatingEmojis } from '@/components/hero/floating-emojis';
import { MouseSparkleTrail } from '@/components/hero/mouse-trail';
import { HeroMascot } from '@/components/hero/hero-mascot';
import { RocketEntry } from '@/components/hero/rocket-entry';
import { MissionBoard } from '@/components/mission-board';
import { DashboardButton } from '@/components/hero/dashboard-button';
import { SubjectCard } from '@/components/subject-card';
import { subjects } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { VoiceLearning } from '@/components/voice-learning';
import { TodaysHighlight } from '@/components/todays-highlight';
import { CharacterGuide } from '@/components/character-guide';

export default function Home() {
  return (
    <main className="-mt-4 -ml-4 -mr-4 md:-mt-6 md:-ml-6 md:-mr-6 lg:-mt-8 lg:-ml-8 lg:-mr-8 w-[calc(100%+2rem)] md:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)] overflow-x-hidden relative flex flex-col gap-16 pb-10">
      <AnimatedGradientBackground />
      <FloatingEmojis />
      <MouseSparkleTrail />
      <InteractiveBackground />

      {/* Welcome Section */}
      <section className="flex flex-col items-center text-center pt-10 pb-10 relative z-10">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto relative z-10">
            {/* Character Guide - Absolute Left */}
            <div className="absolute left-0 top-[82%] -translate-y-1/2 -translate-x-[83%] xl:-translate-x-[110%] hidden lg:block">
              <CharacterGuide />
            </div>

            <div className="flex flex-col items-center w-full">
              {/* Mascot Container */}
              <div className="mb-6">
                <HeroMascot />
              </div>

              <RocketEntry />

              <p className="max-w-3xl mt-4 text-base md:text-lg text-slate-700 font-bold bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/50 shadow-sm">
                ✨ Fun Adventures for Kids (Ages 6–12) ✨
              </p>
              <p className="max-w-2xl mt-4 text-xl text-slate-800/80 font-medium">
                Ready to learn? Pick a subject, play games, and become a super learner! 🚀
              </p>
              <div className="mt-10">
                <DashboardButton href="/dashboard" />
              </div>

              {/* Hanging Mission Board */}
              <MissionBoard />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Today's Highlight Card */}
      <section className="max-w-2xl mx-auto w-full">
        <TodaysHighlight
          hasActivity={false}
          activityType="general"
        />
      </section>





      <section className="relative px-4">
        <h2 className="text-4xl font-bold mb-8 text-center relative z-10">Pick a subject to start your adventure! 👇</h2>
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
        <div className="mt-10">
          <VoiceLearning />
        </div>
      </section>
    </main>
  );
}
