# Streak System - Quick Reference Card

## 📌 Component Import
```tsx
import { StreakSystem } from '@/components/streak-system';
```

## ⚡ Basic Usage
```tsx
<StreakSystem streakDays={7} showRewards={true} />
```

## 📊 Props
| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `streakDays` | `number` | `0` | Current streak count |
| `showRewards` | `boolean` | `true` | Display badges section |

## 🔥 Fire Intensity by Days
- **Level 1:** 0-3 days (Yellow, 48px)
- **Level 2:** 3-7 days (Yellow, 56px)
- **Level 3:** 7-15 days (Orange, 64px)
- **Level 4:** 15-30 days (Dark Orange, 72px)
- **Level 5:** 30+ days (Red, 80px)

## 🏆 Badge Milestones
| Days | Badge | Emoji | Message |
|------|-------|-------|---------|
| 3 | Bronze | 🥉 | First badge milestone |
| 7 | Silver | 🥈 | Full week achievement |
| 15 | Golden Crown | 👑 | Legend status |

## 🎯 State Management Example
```tsx
const [streakDays, setStreakDays] = useState(0);

const completeActivity = () => {
  setStreakDays(prev => prev + 1);
};

return (
  <>
    <StreakSystem streakDays={streakDays} />
    <button onClick={completeActivity}>Complete Task</button>
  </>
);
```

## 💾 LocalStorage Integration
```tsx
// Save streak
localStorage.setItem('streak', JSON.stringify({
  days: streakDays,
  lastUpdated: new Date().toISOString(),
}));

// Load streak
const saved = localStorage.getItem('streak');
if (saved) {
  const { days } = JSON.parse(saved);
  setStreakDays(days);
}
```

## 🎨 Styling Classes Used
- Main: `bg-orange-50 border-orange-200`
- Fire: `text-yellow-200` → `text-red-600` (based on level)
- Badge cards: `bg-yellow-50 border-yellow-400`
- Progress: `bg-green-50` / `bg-blue-50`

## 🔧 Customization Points

### Change badge thresholds:
```tsx
const rewards: Reward[] = [
  { days: 5, emoji: '🥉', name: 'Bronze Badge', unlocked: streakDays >= 5 },
  { days: 10, emoji: '🥈', name: 'Silver Badge', unlocked: streakDays >= 10 },
  { days: 20, emoji: '👑', name: 'Golden Crown', unlocked: streakDays >= 20 },
];
```

### Change fire colors:
```tsx
const colors = [
  'text-yellow-300',  // Level 1
  'text-yellow-500',  // Level 2
  'text-orange-500',  // Level 3
  'text-orange-700',  // Level 4
  'text-red-700',     // Level 5
];
```

### Adjust animation speed:
```tsx
transition: {
  duration: 1.5,  // Change from 2 or 1.2
  repeat: Infinity,
}
```

## 📍 File Locations
- **Component:** `src/components/streak-system.tsx`
- **Integration:** `src/app/my-learning-pet/page.tsx`
- **Demo:** `src/app/streak-demo/page.tsx`
- **Docs:** `docs/STREAK_SYSTEM.md`
- **Integration Guide:** `src/components/STREAK_INTEGRATION_GUIDE.ts`

## 🧪 Testing
Test all streak levels at: **`/streak-demo`**

## ✨ Key Features
✅ Fully client-side  
✅ No backend required  
✅ Animated fire intensity  
✅ Progressive badges  
✅ Responsive design  
✅ TypeScript support  
✅ Context-aware messages  

## 🚀 One-Liner Integration
```tsx
<StreakSystem streakDays={userStreakDays} showRewards={true} />
```

## 📚 Learn More
- Full Docs: `docs/STREAK_SYSTEM.md`
- Code Snippets: `src/components/STREAK_INTEGRATION_GUIDE.ts`
- Implementation Summary: `STREAK_IMPLEMENTATION_SUMMARY.md`

---
**Ready to use! No setup required.**
