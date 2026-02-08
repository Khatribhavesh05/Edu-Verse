# Streak & Motivation System - EduVerse

## Overview

The **Streak & Motivation System** is a gamification feature that encourages consistent learning by tracking consecutive active days and displaying progressive rewards. It visual represents motivation through an animated fire indicator and badge unlocks.

## Features

### 📊 Streak Count Display
- Shows the number of consecutive active days
- Large, prominent numerical display
- Real-time updates based on streak prop

### 🔥 Fire Intensity Visualization
- **5 Progressive Levels** of visual intensity
- Color escalates from yellow → orange → red
- Size grows with intensity
- Animation speed increases at higher levels
- Gives visual feedback on streak achievement

### 🏆 Badge Reward System
- **Bronze Badge 🥉** - 3 consecutive days
- **Silver Badge 🥈** - 7 consecutive days  
- **Golden Crown 👑** - 15 consecutive days
- Badges unlock and remain visible once earned
- Cards animate when unlocked

### 💪 Motivational Messages
Dynamic context-aware messages based on streak:
- Encouragement to start (0 days)
- Progress tracking (1-3 days)
- Celebration of first badge (3+ days)
- Milestone awareness (7+ days)
- Legend status (15+ days)

### 📈 Progress Indicators
- Progress bar to next badge
- Days remaining display
- Streak intensity level (1-5) visual indicator
- Days until next milestone counter

## Component Structure

```
StreakSystem
├── Main Card (Orange gradient background)
│   ├── Fire Intensity Section
│   │   ├── Animated flame icon 🔥
│   │   ├── Streak count display
│   │   ├── Fire intensity level indicator (1-5)
│   │   └── Pulsing background animation
│   ├── Current Streak & Days to Next Badge (Grid)
│   ├── Next Milestone Preview (if not all badges earned)
│   └── Motivational Message Box
├── Rewards Section
│   ├── Bronze Badge (3 days)
│   ├── Silver Badge (7 days)
│   └── Golden Crown (15 days)
└── Motivational Banner
```

## Usage

### Basic Import
```tsx
import { StreakSystem } from '@/components/streak-system';
```

### Simple Implementation
```tsx
<StreakSystem streakDays={7} showRewards={true} />
```

### With State Management
```tsx
const [streakDays, setStreakDays] = useState(0);

// When user completes a learning activity:
const handleActivityComplete = () => {
  setStreakDays(prev => prev + 1);
};

return (
  <StreakSystem streakDays={streakDays} showRewards={true} />
);
```

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `streakDays` | `number` | `0` | Current streak count |
| `showRewards` | `boolean` | `true` | Display rewards/badges section |

## Fire Intensity Levels

| Level | Days | Color | Size | Animation | Description |
|-------|------|-------|------|-----------|-------------|
| 1 | 0-3 | Yellow (yellow-200) | 48px | Slow (2s) | Getting started |
| 2 | 3-7 | Light Yellow (yellow-400) | 56px | Normal (2s) | Building momentum |
| 3 | 7-15 | Orange (orange-400) | 64px | Normal (2s) | Strong progress |
| 4 | 15-30 | Dark Orange (orange-600) | 72px | Fast (1.2s) | Intense streak |
| 5 | 30+ | Red (red-600) | 80px | Very Fast (1.2s) | Legend status |

## Badge Milestones

### Bronze Badge 🥉 (3 Days)
- **Unlock condition:** 3 consecutive days
- **Message:** "Keep it up! 2 more days to your first badge!"
- **Significance:** User demonstrates commitment and consistency

### Silver Badge 🥈 (7 Days)
- **Unlock condition:** 7 consecutive days
- **Message:** "Awesome! You're on fire! Continue to unlock the Golden Crown!"
- **Significance:** User maintains discipline for a full week

### Golden Crown 👑 (15 Days)
- **Unlock condition:** 15 consecutive days
- **Message:** "You're a learning legend! Keep your streak alive!"
- **Significance:** Major achievement, sustained long-term engagement

## Integration Examples

### In My Learning Pet Page
```tsx
// src/app/my-learning-pet/page.tsx
import { StreakSystem } from '@/components/streak-system';

export default function MyLearningPetPage() {
  const [streakDays, setStreakDays] = useState(7);

  return (
    <div className="flex flex-col gap-8">
      <h1>My Learning Pet 🐣</h1>
      <StreakSystem streakDays={streakDays} showRewards={true} />
      {/* Rest of the page */}
    </div>
  );
}
```

### In Dashboard
```tsx
// Display user's current streak prominently
<StreakSystem streakDays={userData.streakDays} showRewards={true} />
```

### In AI Tutor
```tsx
// Show streak after completing a lesson
{lessonComplete && <StreakSystem streakDays={userStreak} />}
```

## Animation Details

### Flame Animation
- **Idle:** 0.8 opacity
- **Low Intensity:** Scale [1, 1.05, 1] with 2s duration
- **High Intensity:** Scale [1, 1.1, 1] with 1.2s duration
- **Repeats:** Infinitely for continuous motion

### Pulse Background
- **Effect:** Growing rings that fade
- **Color:** Green (rgba(34, 197, 94))
- **Duration:** 2 seconds
- **Pattern:** 0px → 10px expansion

### Card Entrance
- **Initial:** opacity: 0, y: 20px
- **Animate:** opacity: 1, y: 0

### Reward Cards
- **Unlocked:** Subtle rotate animation [-5°, 5°, 0°]
- **Locked:** Static, semi-transparent
- **Hover:** Scale 1.05 with 5° rotation (unlocked only)

## Styling & Colors

### Background Gradients
- **Main Card:** from-orange-50 to-amber-50
- **Stats Cards:** Green (from-green-100) / Blue (from-blue-100)
- **Reward Cards:** from-amber-50 to-yellow-50

### Border Colors
- **Main Card:** border-orange-200
- **Active Elements:** border-yellow-400
- **Rewards:** border-yellow-300

### Text Colors
- **Streak Count:** Gradient (from-orange-500 to-red-500)
- **Fire Intensity:** Yellow-200 to red-600 (based on level)
- **Descriptions:** text-gray-600

## States

### No Streak (0 days)
- Fire Level: 1 (minimal)
- Message: "💪 Start learning today to build your first streak!"
- Display: Only next milestone (Bronze Badge)

### Building Streak (1-2 days)
- Fire Level: 1-2
- Message: "🌟 Keep it up! X more days to your first badge!"
- Display: Progress bar to Bronze Badge

### First Badge Earned (3-6 days)
- Fire Level: 2-3
- Message: "🔥 Awesome! You're on fire! Continue..."
- Display: Bronze Badge unlocked, progress to Silver

### Second Badge Earned (7-14 days)
- Fire Level: 3-4
- Message: "⭐ Incredible! X more days to unlock the Golden Crown!"
- Display: Bronze + Silver unlocked, progress to Golden Crown

### Legend Status (15+ days)
- Fire Level: 4-5
- Message: "👑 You're a learning legend! Keep your streak alive!"
- Display: All badges unlocked, no more milestones

## No Backend Required

This component is **completely client-side**:
- Uses React hooks for state management
- No API calls needed
- No database queries
- Streak value can be:
  - Passed as a prop
  - Stored in localStorage
  - Managed with context/Redux
  - Calculated from local user data

## Responsive Design

- **Mobile (< 640px):** Single column layout, adapted sizes
- **Tablet (640px - 1024px):** Two-column grid for stats
- **Desktop (> 1024px):** Full featured three-column badge display

## Accessibility

- Semantic HTML structure
- Color-contrast compliant
- Alternative text via emojis
- Focus states for interactive elements
- Keyboard navigable (if buttons added)

## Customization

### Change Badge Milestones
Edit in `streak-system.tsx`:
```tsx
const rewards: Reward[] = useMemo(
  () => [
    { days: 5, emoji: '🥉', name: 'Bronze Badge', unlocked: streakDays >= 5 },
    { days: 10, emoji: '🥈', name: 'Silver Badge', unlocked: streakDays >= 10 },
    { days: 20, emoji: '👑', name: 'Golden Crown', unlocked: streakDays >= 20 },
  ],
  [streakDays]
);
```

### Adjust Fire Colors
Edit the `getFireColor()` function:
```tsx
const getFireColor = (intensity: number) => {
  const colors = [
    'text-yellow-300',  // Custom colors
    'text-yellow-500',
    'text-orange-500',
    'text-orange-600',
    'text-red-700',
  ];
  return colors[intensity - 1];
};
```

### Change Animation Speeds
Edit animation variants:
```tsx
const fireVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,  // Change from 2 to 3
      repeat: Infinity,
    },
  },
};
```

## Demo Page

Visit `/streak-demo` to see the component in action with interactive controls for all streak levels.

## Files

- **Component:** `/src/components/streak-system.tsx`
- **Integration:** `/src/app/my-learning-pet/page.tsx`
- **Demo Page:** `/src/app/streak-demo/page.tsx`
- **Documentation:** `/docs/STREAK_SYSTEM.md` (this file)

## Future Enhancements

- [ ] Persistent streak tracking (localStorage/database)
- [ ] Streak reset notifications
- [ ] Historical streak data visualization
- [ ] Social streak competitions
- [ ] Sound effects for badge unlocks
- [ ] Custom badge designs
- [ ] Streak recovery mechanics
- [ ] Integration with AI tutor for automatic updates

## Support

For questions or improvements, refer to the component implementation or the demo page for working examples.
