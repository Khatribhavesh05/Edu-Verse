// STREAK SYSTEM - QUICK INTEGRATION GUIDE
// Copy and paste snippets to integrate into any component

// ============================================================================
// 1. BASIC SETUP - Copy this to your component
// ============================================================================

import { StreakSystem } from '@/components/streak-system';

// In your component:
const [streakDays, setStreakDays] = useState(7);

return (
  <div>
    <StreakSystem streakDays={streakDays} showRewards={true} />
  </div>
);

// ============================================================================
// 2. UPDATE STREAK ON EVENT
// ============================================================================

// When user completes a learning activity:
const handleActivityComplete = (activity: any) => {
  // Increase streak
  setStreakDays(prev => prev + 1);
  
  // Optional: Show celebration
  console.log(`🔥 Streak is now ${streakDays + 1} days!`);
};

// ============================================================================
// 3. RESET STREAK (e.g., when user misses a day)
// ============================================================================

const handleMissedDay = () => {
  setStreakDays(0);
  // Show notification to user
  console.warn('Streak lost! Start a new one today.');
};

// ============================================================================
// 4. RETRIEVE STREAK FROM API/DATABASE (Future)
// ============================================================================

useEffect(() => {
  const fetchStreak = async () => {
    try {
      const response = await fetch('/api/user/streak');
      const data = await response.json();
      setStreakDays(data.streakDays);
    } catch (error) {
      console.error('Failed to fetch streak:', error);
    }
  };
  
  fetchStreak();
}, []);

// ============================================================================
// 5. PERSIST STREAK TO LOCALSTORAGE
// ============================================================================

useEffect(() => {
  // Save to localStorage
  localStorage.setItem('eduverse_streak', JSON.stringify({
    days: streakDays,
    lastUpdated: new Date().toISOString(),
  }));
}, [streakDays]);

useEffect(() => {
  // Load from localStorage
  const saved = localStorage.getItem('eduverse_streak');
  if (saved) {
    const { days } = JSON.parse(saved);
    setStreakDays(days);
  }
}, []);

// ============================================================================
// 6. COMPACT VERSION (No rewards display)
// ============================================================================

<StreakSystem streakDays={streakDays} showRewards={false} />

// ============================================================================
// 7. MULTIPLE STREAKS (Different subjects)
// ============================================================================

const [mathStreak, setMathStreak] = useState(3);
const [scienceStreak, setScienceStreak] = useState(7);
const [englishStreak, setEnglishStreak] = useState(1);

return (
  <div className="grid gap-6">
    <div>
      <h3>Mathematics Streak</h3>
      <StreakSystem streakDays={mathStreak} />
    </div>
    <div>
      <h3>Science Streak</h3>
      <StreakSystem streakDays={scienceStreak} />
    </div>
    <div>
      <h3>English Streak</h3>
      <StreakSystem streakDays={englishStreak} />
    </div>
  </div>
);

// ============================================================================
// 8. AUTO-UPDATE STREAK (Check daily)
// ============================================================================

useEffect(() => {
  const checkAndUpdateStreak = () => {
    const lastUpdate = localStorage.getItem('streak_last_update');
    const today = new Date().toDateString();
    
    if (lastUpdate !== today && hasUserLearned()) {
      setStreakDays(prev => prev + 1);
      localStorage.setItem('streak_last_update', today);
    }
  };
  
  // Check on component mount and daily
  checkAndUpdateStreak();
  
  const interval = setInterval(() => {
    checkAndUpdateStreak();
  }, 24 * 60 * 60 * 1000); // Every 24 hours
  
  return () => clearInterval(interval);
}, []);

// ============================================================================
// 9. INTEGRATE WITH AI TUTOR
// ============================================================================

// In AI Tutor component:
const [userStreak, setUserStreak] = useState(0);

const handleChatResponse = async (message: string) => {
  // Process message with AI...
  
  // If it was a productive learning session:
  if (wasProductive) {
    setUserStreak(prev => prev + 1);
    
    // Show streak system
    return (
      <div>
        <StreakSystem streakDays={userStreak} />
        <p>Great learning session! Your streak grows! 🔥</p>
      </div>
    );
  }
};

// ============================================================================
// 10. INTEGRATE WITH GAMES/QUIZZES
// ============================================================================

// In game completion handler:
const handleGameComplete = (score: number) => {
  if (score >= 70) {
    // Update streak for high scores
    setStreakDays(prev => prev + 1);
    
    return (
      <div className="space-y-4">
        <h2>🎉 Great Job!</h2>
        <StreakSystem streakDays={streakDays} />
        <p>Keep going to unlock more badges!</p>
      </div>
    );
  }
};

// ============================================================================
// 11. CONTEXT API SETUP (App-wide state)
// ============================================================================

// Create StreakContext.tsx
import { createContext, useContext, useState } from 'react';

interface StreakContextType {
  streakDays: number;
  increaseStreak: () => void;
  resetStreak: () => void;
  setStreak: (days: number) => void;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [streakDays, setStreakDays] = useState(0);
  
  const increaseStreak = () => setStreakDays(prev => prev + 1);
  const resetStreak = () => setStreakDays(0);
  const setStreak = (days: number) => setStreakDays(days);
  
  return (
    <StreakContext.Provider value={{ streakDays, increaseStreak, resetStreak, setStreak }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error('useStreak must be used within StreakProvider');
  }
  return context;
};

// Use in any component:
// ============================================================================

const MyComponent = () => {
  const { streakDays, increaseStreak } = useStreak();
  
  return (
    <div>
      <StreakSystem streakDays={streakDays} />
      <button onClick={increaseStreak}>Complete Learning Activity</button>
    </div>
  );
};

// ============================================================================
// 12. FULL PAGE INTEGRATION (My Learning Pet)
// ============================================================================

'use client';

import { useState } from 'react';
import { StreakSystem } from '@/components/streak-system';

export default function MyLearningPetPage() {
  const [petName, setPetName] = useState('Spark');
  const [streakDays, setStreakDays] = useState(7);
  const [happiness, setHappiness] = useState(72);
  
  const feedPet = () => {
    setHappiness(prev => Math.min(100, prev + 8));
    // Feeding your pet counts as learning activity
    setStreakDays(prev => prev + 1);
  };
  
  return (
    <div className="space-y-8">
      <h1>My Learning Pet 🐣</h1>
      
      {/* Streak System */}
      <StreakSystem streakDays={streakDays} showRewards={true} />
      
      {/* Pet Info */}
      <div>
        <h2>Pet Status: {petName}</h2>
        <p>Happiness: {happiness}%</p>
      </div>
      
      <button onClick={feedPet}>Feed {petName}</button>
    </div>
  );
}

// ============================================================================
// TESTING WITH DIFFERENT STREAK VALUES
// ============================================================================

// Test all milestones:
const testStreakValues = [
  0,   // No streak
  1,   // Starting
  3,   // Bronze badge
  5,   // Progress
  7,   // Silver badge
  10,  // Halfway
  15,  // Golden crown
  21,  // Extended
  30,  // Legend
];

testStreakValues.forEach(days => {
  // Render with each value to test visual changes
  <StreakSystem key={days} streakDays={days} />
});

// ============================================================================
// STYLING MODIFICATIONS
// ============================================================================

// If you need custom styling, wrap the component:
<div className="custom-streak-container">
  <StreakSystem streakDays={streakDays} />
</div>

// Custom CSS:
// .custom-streak-container :deep(.bg-orange-50) {
//   background-color: your-color;
// }

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================

import { useMemo, useCallback } from 'react';

const MyComponent = ({ userStreak }: { userStreak: number }) => {
  // Memoize streak calculation
  const memoizedStreak = useMemo(() => userStreak, [userStreak]);
  
  // Memoize handlers
  const handleIncreaseStreak = useCallback(() => {
    // Update logic
  }, []);
  
  return (
    <StreakSystem streakDays={memoizedStreak} />
  );
};

// ============================================================================
// ERROR HANDLING
// ============================================================================

try {
  return <StreakSystem streakDays={streakDays} showRewards={true} />;
} catch (error) {
  console.error('Streak system error:', error);
  return <div>Failed to load streak system</div>;
}

// ============================================================================
// QUICK COPY-PASTE TEMPLATE
// ============================================================================

/*
'use client';

import { useState } from 'react';
import { StreakSystem } from '@/components/streak-system';

export default function MyComponent() {
  const [streakDays, setStreakDays] = useState(7);

  const handleActivityComplete = () => {
    setStreakDays(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <h1>Learning Activity</h1>
      
      <StreakSystem streakDays={streakDays} showRewards={true} />
      
      <button onClick={handleActivityComplete}>
        Complete Activity
      </button>
    </div>
  );
}
*/

// ============================================================================
// QUESTIONS? REFER TO:
// ============================================================================
// - Demo page: /streak-demo
// - Documentation: /docs/STREAK_SYSTEM.md
// - Component: /src/components/streak-system.tsx
// ============================================================================
