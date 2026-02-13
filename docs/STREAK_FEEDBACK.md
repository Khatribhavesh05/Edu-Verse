# Streak Feedback System 🔥

## Overview

The Streak Feedback System provides immediate, positive reinforcement when a user's learning streak increases by 1 day. This feature enhances user engagement through visual and audio feedback.

## Features

### 1. Motivational Toast Notification
- **Trigger**: When streak increases by exactly 1 day
- **Duration**: ~2.5 seconds (auto-dismisses)
- **Position**: Fixed near the right edge of the viewport, slightly below the top bar
- **Animation**: Spring-based fade/scale to keep the toast visually stable

### 2. Soft Progress Chime
- **Technology**: Web Audio API
- **Sound**: Two-tone harmonious chime (C5 + E5 notes)
- **Waveform**: Sine wave for soft, pleasant tone
- **Duration**: 0.4 seconds
- **Volume**: 15% (subtle, non-intrusive)
- **Envelope**: Smooth fade in/out for polish

### 3. Random Motivational Messages
Randomly selects from 10 encouraging messages:
- "🔥 Great job! Your streak is growing!"
- "Nice! One more day stronger!"
- "🎉 You're on fire! Keep it up!"
- "Amazing! Another day conquered!"
- "💪 Streak power activated!"
- "Awesome! You're building momentum!"
- "🌟 Way to go! Keep learning!"
- "Brilliant! Your dedication shows!"
- "🚀 Streak level up! Fantastic!"
- "Yes! Another day of progress!"

## Technical Implementation

### Components

#### `StreakFeedback` Component
**Location**: `src/components/streak-feedback.tsx`

```tsx
<StreakFeedback
  streakDays={currentStreak}
  show={shouldShow}
  onComplete={() => setShow(false)}
/>
```

**Props**:
- `streakDays`: Current streak count (number)
- `show`: Whether to display the toast (boolean)
- `onComplete`: Callback when toast auto-dismisses

#### `playStreakChime()` Function
**Location**: `src/lib/streak-sound.ts`

```tsx
import { playStreakChime } from '@/lib/streak-sound';

// Call when streak increases
playStreakChime();
```

**Features**:
- Lazy initialization of AudioContext
- Two oscillators for harmony
- Gain node for volume control
- Automatic cleanup after playback
- Graceful fallback if audio not supported

### Integration in StreakSystem

**File**: `src/components/streak-system.tsx`

```tsx
// State management
const [showStreakFeedback, setShowStreakFeedback] = useState(false);

// Detection logic in useEffect
useEffect(() => {
  if (streakDays > previousStreakDays) {
    if (streakDays === previousStreakDays + 1) {
      // Trigger feedback
      setShowStreakFeedback(true);
      playStreakChime();
    }
    // ... badge unlock logic
  }
}, [streakDays, previousStreakDays]);

// Render
<StreakFeedback
  streakDays={streakDays}
  show={showStreakFeedback}
  onComplete={() => setShowStreakFeedback(false)}
/>
```

## Animation Specifications

### Toast Animation
```tsx
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.9 }}
transition={{
  type: "spring",
  stiffness: 280,
  damping: 24
}}
```

### Flame Icon Animation
```tsx
animate={{
  scale: [1, 1.2, 1],
  rotate: [0, 10, -10, 0]
}}
transition={{
  duration: 0.6,
  repeat: Infinity,
  repeatDelay: 0.5
}}
```

## Sound Specifications

### Audio Parameters
- **Frequency 1**: 523.25 Hz (C5 note)
- **Frequency 2**: 659.25 Hz (E5 note)
- **Oscillator Type**: Sine wave
- **Volume Envelope**:
  - 0s → 0.05s: Fade in to 15%
  - 0.05s → 0.2s: Hold at 15%
  - 0.2s → 0.4s: Fade out to 0%

### Browser Compatibility
- Modern browsers: Full support via Web Audio API
- Older browsers: Graceful fallback (silent)
- Mobile: Works after user interaction

## Testing

### Manual Testing
1. Navigate to `/badge-unlock-demo`
2. Start with 0 days
3. Click **"🔥 +1 Day"** button
4. Observe:
   - Toast appears at top center
   - Motivational message displayed
   - Soft chime plays (ensure audio enabled)
   - Toast auto-dismisses after 3s

### Demo Page Features
- Interactive increment button
- Multiple preset streak values
- Visual feedback cards
- Technical specifications panel

## Design Decisions

### Why Toast Notification?
- Non-blocking: Doesn't interrupt user flow
- Prominent: Visible without being intrusive
- Temporary: Auto-dismisses to avoid clutter

### Why Soft Chime?
- Positive reinforcement: Pleasant sound association
- Subtle: Not annoying on repeated triggers
- Short duration: < 0.5 seconds per requirement
- Harmonious: Two-tone creates pleasant resonance

### Why Random Messages?
- Variety: Prevents message fatigue
- Engagement: Users anticipate different encouragement
- Personality: Adds character to the app

## Future Enhancements

### Potential Additions
- [ ] User preference to mute/unmute sound
- [ ] Different sound effects for milestones
- [ ] Haptic feedback on mobile devices
- [ ] Message customization based on subject
- [ ] Streak loss warning system
- [ ] Achievement sound effects library

### Accessibility Considerations
- Add ARIA live region for screen readers
- Provide visual-only mode option
- Volume control in user settings
- Reduced motion alternatives

## Performance Notes

### Optimization
- Lazy AudioContext initialization
- Reuses single AudioContext instance
- Minimal DOM manipulation
- Efficient Framer Motion animations
- No external audio file dependencies

### Memory Management
- AudioContext cleanup available via `cleanupAudioContext()`
- Automatic timer cleanup in useEffect
- No memory leaks from oscillator nodes

## Related Systems

This feedback system complements:
- **Badge Unlock Animations**: Milestone celebrations at 3, 7, 15 days
- **Fire Mode Animation**: Visual streak intensity display
- **Confetti System**: Special achievement celebrations

Together, these create a comprehensive motivation ecosystem.

## Quick Reference

### Key Files
| File | Purpose |
|------|---------|
| `src/components/streak-feedback.tsx` | Toast notification component |
| `src/lib/streak-sound.ts` | Audio generation utility |
| `src/components/streak-system.tsx` | Integrated streak tracker |
| `src/app/badge-unlock-demo/page.tsx` | Interactive demo page |

### Key Functions
| Function | Description |
|----------|-------------|
| `playStreakChime()` | Plays 0.4s progress chime |
| `getAudioContext()` | Lazy AudioContext initialization |
| `cleanupAudioContext()` | Optional memory cleanup |
| `useStreakIncrease()` | Hook for detecting +1 day |

### Constants
```tsx
// Message pool
MOTIVATIONAL_MESSAGES: string[] // 10 messages

// Sound frequencies
C5_FREQUENCY = 523.25 // Hz
E5_FREQUENCY = 659.25 // Hz

// Timings
SOUND_DURATION = 0.4 // seconds
TOAST_DURATION = 3.0 // seconds
VOLUME = 0.15 // 15%
```

---

**Last Updated**: Implementation complete with full integration
**Status**: ✅ Production Ready
**Demo**: `/badge-unlock-demo` with +1 Day button

