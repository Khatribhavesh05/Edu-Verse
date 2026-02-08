export interface Quest {
  id: string;
  title: string;
  description: string;
  emoji: string;
  tasks: Task[];
  rewards: {
    coins: number;
    sticker: string;
  };
  estimatedTime: string; // "5-10 minutes" format
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'math' | 'chat' | 'quiz' | 'read' | 'explore';
  content?: string;
}

// Daily quests array
export const dailyQuests: Quest[] = [
  {
    id: 'quest-1',
    title: 'Mystery of the Lost Numbers',
    description: 'Help solve a mathematical puzzle and learn cool facts!',
    emoji: '🔍',
    estimatedTime: '5-10 minutes',
    tasks: [
      {
        id: 'task-1-1',
        title: 'Quick Math Challenge',
        description: 'I have 12 apples. I give 5 to my friend. How many do I have left?',
        type: 'math',
        content: 'Pick the answer and earn your first star! ⭐',
      },
      {
        id: 'task-1-2',
        title: 'Chat with Orbi',
        description: 'Ask Orbi: "What\'s the coolest thing about space?"',
        type: 'chat',
        content: 'Learn one awesome space fact in under 2 minutes.',
      },
      {
        id: 'task-1-3',
        title: 'Brain Teaser Quiz',
        description: 'Which of these is NOT a fruit?',
        type: 'quiz',
        content: '(A) Apple (B) Carrot (C) Banana (D) Orange',
      },
    ],
    rewards: {
      coins: 50,
      sticker: 'Brain Buster Sticker',
    },
  },
  {
    id: 'quest-2',
    title: 'Science Explorer\'s Adventure',
    description: 'Discover amazing facts about the natural world!',
    emoji: '🧪',
    estimatedTime: '7-10 minutes',
    tasks: [
      {
        id: 'task-2-1',
        title: 'Fact Explorer',
        description: 'Read about photosynthesis: How plants turn sunlight into food',
        type: 'read',
        content: 'Take 2 minutes to discover this amazing process!',
      },
      {
        id: 'task-2-2',
        title: 'Chat with Orbi',
        description: 'Ask: "Can you explain why plants are green?"',
        type: 'chat',
        content: 'Get a fun explanation in simple words.',
      },
      {
        id: 'task-2-3',
        title: 'Quick Quiz',
        description: 'What do plants need from the sun to make food?',
        type: 'quiz',
        content: '(A) Heat (B) Light (C) Air (D) Water',
      },
    ],
    rewards: {
      coins: 60,
      sticker: 'Science Scholar Sticker',
    },
  },
  {
    id: 'quest-3',
    title: 'Grammar Master\'s Quest',
    description: 'Master the English language with fun challenges!',
    emoji: '📚',
    estimatedTime: '5-8 minutes',
    tasks: [
      {
        id: 'task-3-1',
        title: 'Sentence Builder',
        description: 'Fix this sentence: "She go to school every day"',
        type: 'quiz',
        content: 'Pick the correct version!',
      },
      {
        id: 'task-3-2',
        title: 'Learn with Orbi',
        description: 'Chat: "Can you teach me about past tense verbs?"',
        type: 'chat',
        content: 'Get examples and explanations.',
      },
      {
        id: 'task-3-3',
        title: 'Vocabulary Challenge',
        description: 'What does "magnificent" mean?',
        type: 'quiz',
        content: '(A) Angry (B) Splendid (C) Quiet (D) Fast',
      },
    ],
    rewards: {
      coins: 50,
      sticker: 'Grammar Expert Sticker',
    },
  },
  {
    id: 'quest-4',
    title: 'World Wonders Explorer',
    description: 'Travel around the world without leaving your seat!',
    emoji: '🌍',
    estimatedTime: '6-10 minutes',
    tasks: [
      {
        id: 'task-4-1',
        title: 'Explore a Country',
        description: 'Learn about Japan: Its capital, culture, and amazing things',
        type: 'explore',
        content: 'Spend 3 minutes discovering Japan!',
      },
      {
        id: 'task-4-2',
        title: 'Ask Orbi',
        description: 'Chat: "What are the most famous things about Japan?"',
        type: 'chat',
        content: 'Get fascinating facts!',
      },
      {
        id: 'task-4-3',
        title: 'Geography Quiz',
        description: 'What is the capital of Japan?',
        type: 'quiz',
        content: '(A) Tokyo (B) Osaka (C) Kyoto (D) Yokohama',
      },
    ],
    rewards: {
      coins: 70,
      sticker: 'World Explorer Sticker',
    },
  },
  {
    id: 'quest-5',
    title: 'Code Creator\'s Challenge',
    description: 'Step into the world of computers and logic!',
    emoji: '💻',
    estimatedTime: '5-10 minutes',
    tasks: [
      {
        id: 'task-5-1',
        title: 'Logic Puzzle',
        description: 'If A = 1, B = 2, then C = ?',
        type: 'math',
        content: 'Figure out the pattern!',
      },
      {
        id: 'task-5-2',
        title: 'Chat with Orbi',
        description: 'Ask: "What is programming?"',
        type: 'chat',
        content: 'Learn how computers work in simple terms.',
      },
      {
        id: 'task-5-3',
        title: 'Computer Concepts Quiz',
        description: 'What does "code" mean in programming?',
        type: 'quiz',
        content: '(A) A secret message (B) Instructions for computers (C) A password (D) A game',
      },
    ],
    rewards: {
      coins: 60,
      sticker: 'Code Wizard Sticker',
    },
  },
];

// Function to get daily quest based on the current day
export function getDailyQuest(dayOfWeek?: number): Quest {
  const day = dayOfWeek ?? new Date().getDay();
  return dailyQuests[day % dailyQuests.length];
}
