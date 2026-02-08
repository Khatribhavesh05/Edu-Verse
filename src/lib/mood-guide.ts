import { MessageSquare, Lightbulb, Zap, Brain, BookOpen } from 'lucide-react';

export type MoodType = 'happy' | 'bored' | 'confused' | 'excited';

export interface Activity {
  title: string;
  description: string;
  type: 'mini-game' | 'animation' | 'chat' | 'practice' | 'challenge';
  emoji: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MoodGuide {
  mood: MoodType;
  emoji: string;
  moodName: string;
  greeting: string;
  energy: string;
  activities: Activity[];
}

export const moodGuidesData: Record<MoodType, MoodGuide> = {
  happy: {
    mood: 'happy',
    emoji: '😊',
    moodName: 'Happy',
    greeting: "You're feeling awesome! Let's keep that energy going! 🌟",
    energy: 'High & Playful',
    activities: [
      {
        title: 'Fun Brain Puzzle',
        description:
          'Solve hilarious riddles and wordplay challenges that will make you giggle while learning!',
        type: 'mini-game',
        emoji: '🧩',
        duration: '5 minutes',
        difficulty: 'easy',
      },
      {
        title: 'Chat with Orbi - Fun Facts',
        description:
          "Ask Orbi the silliest questions! Learn cool facts in a funny and entertaining way.",
        type: 'chat',
        emoji: '💬',
        duration: '3 minutes',
        difficulty: 'easy',
      },
      {
        title: 'Creative Challenge Quest',
        description:
          'Create something unique! Build a story, design a concept, or solve a creative puzzle.',
        type: 'challenge',
        emoji: '🎨',
        duration: '10 minutes',
        difficulty: 'medium',
      },
    ],
  },
  bored: {
    mood: 'bored',
    emoji: '😴',
    moodName: 'Bored',
    greeting:
      "Let's shake things up! Try something quick and super fun to spark your interest! ⚡",
    energy: 'Low & Needs Spark',
    activities: [
      {
        title: 'Flash Animation Surprise',
        description:
          'Watch a 2-minute visual animation that explains a surprising concept in the coolest way!',
        type: 'animation',
        emoji: '🎬',
        duration: '2 minutes',
        difficulty: 'easy',
      },
      {
        title: 'Quick Mini-Game Power Up',
        description:
          'Play a fast-paced mini-game! Score points, unlock achievements, and have instant fun.',
        type: 'mini-game',
        emoji: '🎮',
        duration: '4 minutes',
        difficulty: 'easy',
      },
      {
        title: 'Orbi Storytelling Chat',
        description:
          'Let Orbi tell you an engaging story about a topic you choose. Interactive & exciting!',
        type: 'chat',
        emoji: '📖',
        duration: '5 minutes',
        difficulty: 'easy',
      },
    ],
  },
  confused: {
    mood: 'confused',
    emoji: '😤',
    moodName: 'Confused',
    greeting:
      "No worries! Let's break things down into simple, easy-to-understand steps. You got this! 💪",
    energy: 'Calm & Supportive',
    activities: [
      {
        title: 'Simple Concept Breakdown',
        description:
          'Watch a slow-paced, step-by-step animation that explains the concept super clearly.',
        type: 'animation',
        emoji: '🎯',
        duration: '5 minutes',
        difficulty: 'easy',
      },
      {
        title: 'Chat with Orbi for Help',
        description:
          'Ask Orbi your questions in simple words. Get clear, beginner-friendly explanations!',
        type: 'chat',
        emoji: '💭',
        duration: '5 minutes',
        difficulty: 'easy',
      },
      {
        title: 'Easy Practice Problems',
        description:
          'Solve a few simple practice problems with hints to help you understand step-by-step.',
        type: 'practice',
        emoji: '✏️',
        duration: '8 minutes',
        difficulty: 'easy',
      },
    ],
  },
  excited: {
    mood: 'excited',
    emoji: '🤩',
    moodName: 'Excited',
    greeting:
      "Amazing energy! Let's tackle something challenging and mind-blowing! 🚀",
    energy: 'Super High & Ready to Learn',
    activities: [
      {
        title: 'Advanced Challenge Master',
        description:
          'Jump into a tough challenge! Solve complex problems and prove your amazing skills!',
        type: 'challenge',
        emoji: '🏆',
        duration: '12 minutes',
        difficulty: 'hard',
      },
      {
        title: 'Deep Dive Learning',
        description:
          'Explore an advanced concept with animations. Learn cool secrets and advanced tricks!',
        type: 'animation',
        emoji: '🔬',
        duration: '8 minutes',
        difficulty: 'medium',
      },
      {
        title: 'Power Brain Game',
        description:
          'Play a high-difficulty mini-game that tests all your skills. Compete for top scores!',
        type: 'mini-game',
        emoji: '⚔️',
        duration: '10 minutes',
        difficulty: 'hard',
      },
    ],
  },
};

export function getMoodGuide(mood: MoodType): MoodGuide {
  return moodGuidesData[mood];
}

export const moodOptions = [
  { mood: 'happy' as MoodType, emoji: '😊', label: 'Happy' },
  { mood: 'bored' as MoodType, emoji: '😴', label: 'Bored' },
  { mood: 'confused' as MoodType, emoji: '😤', label: 'Confused' },
  { mood: 'excited' as MoodType, emoji: '🤩', label: 'Excited' },
];
