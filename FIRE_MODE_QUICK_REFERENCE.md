# Fire Mode Animation - Quick Reference

## 🚀 Quick Start

```tsx
import { FireModeAnimation } from '@/components/fire-mode-animation';

<FireModeAnimation streakDays={7} size="medium" showLabel={true} />
```

## 📊 Fire Levels at a Glance

| Days | Level | Emoji | Color | Animation | Extra |
|------|-------|-------|-------|-----------|-------|
| 0 | None | ⚫ | Gray | Static | Nothing |
| 1-2 | 1 | 🔥 | Yellow | Gentle bounce | - |
| 3-6 | 2 | 🔥 | Yellow→Orange | Pulsing | 4 Sparkles |
| 7-14 | 3 | 🔥 | Orange→Red | Energetic | Glow halo |
| 15+ | 4 | 🔥👑 | Red | Intense | Crown + Sparkles |

## 💻 Common Usage Patterns

### With State
```tsx
const [streak, setStreak] = useState(0);
<FireModeAnimation streakDays={streak} />
```

### Different Sizes
```tsx
<FireModeAnimation streakDays={7} size="small" />    {/* 60% */}
<FireModeAnimation streakDays={7} size="medium" />   {/* 100% */}
<FireModeAnimation streakDays={7} size="large" />    {/* 140% */}
```

### Without Label
```tsx
<FireModeAnimation streakDays={7} showLabel={false} />
```

### In Streak System (Auto-Integrated)
```tsx
import { StreakSystem } from '@/components/streak-system';
<StreakSystem streakDays={7} showRewards={true} />
```

## ⚙️ Props

```tsx
interface FireModeAnimationProps {
  streakDays: number;                    // Required: 0+
  size?: 'small' | 'medium' | 'large';   // Default: 'medium'
  showLabel?: boolean;                   // Default: true
}
```

## 🎨 Visual Specifications

### Animation Specs
- Duration: 1.2s per loop
- Easing: easeInOut (smooth)
- Repeat: Infinite

### Fire Colors
- Level 1: #FEF08A → #FCD34D (pale yellow)
- Level 2: #FCD34D → #FB923C (yellow to orange)
- Level 3: #FB923C → #EF4444 (orange to red)
- Level 4: #EF4444 → #BE123C (intense red)

### Size Multipliers
- Small: 0.6x
- Medium: 1.0x (default 48-96px)
- Large: 1.4x

### Bounce Distances
- Level 1: 2px
- Level 2: 3px
- Level 3: 4px
- Level 4: 5px

## 📁 Files

| File | Purpose |
|------|---------|
| `src/components/fire-mode-animation.tsx` | Main component |
| `src/components/streak-system.tsx` | Uses FireModeAnimation |
| `src/app/fire-mode-demo/page.tsx` | Interactive demo |
| `docs/FIRE_MODE_ANIMATION.md` | Full documentation |

## 🧪 Testing

Visit `/fire-mode-demo` to:
- See all fire levels (0-4)
- Try all sizes (small, medium, large)
- View live animations
- Copy code examples

## ✨ Features

✅ Smooth 1.2s loop  
✅ Cartoon-style friendly  
✅ Progressive intensity  
✅ Particle effects (L2+)  
✅ Crown sparkle (L4)  
✅ Glow effects  
✅ Soft bounce motion  
✅ GPU optimized  

## 🔧 Customization

### Change Level Thresholds
Edit fire-mode-animation.tsx `fireLevel` useMemo

### Adjust Speed
Change `duration: 1.2` to desired value (e.g., 0.9)

### Modify Colors
Edit gradient stop colors in SVG definitions

### Change Bounce
Adjust `bounceAmount: 2-5` values

## 💡 Pro Tips

1. **Use in widgets:** Set `showLabel={false}` for compact display
2. **Mobile:** Fire scales nicely with responsive sizes
3. **Performance:** Use `size="small"` for multiple instances
4. **Animations:** Firefox may render slightly different - test cross-browser

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| No animation | Check `streakDays` is a number |
| Stuttering | Reduce other CSS animations |
| No glow | Verify SVG filters supported |
| Missing label | Change `showLabel={true}` |

## 📖 Full Documentation

See `/docs/FIRE_MODE_ANIMATION.md` for:
- Detailed level specifications
- Animation timing details
- Browser compatibility
- Advanced customization
- Performance optimization

## 🎉 One-Liner Integration

```tsx
<FireModeAnimation streakDays={userStreak} size="medium" showLabel={true} />
```

That's it! Fire mode is ready to use. 🔥
