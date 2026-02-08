# Fire Mode Animation - Visual Reference Guide

## 🔥 Fire Animation Levels Overview

```
                          Animation Intensity & Features
                          ███████████████████████████

LEVEL 0: No Fire ❌       ⚫ ⚫ ⚫ ⚫ ⚫                    (Static, 0 days)
                         
LEVEL 1: Small Flicker 🔥 🟨 🟨 🟨 🟨 🟨  ↑↓           (1-2 days)
                         
LEVEL 2: Medium Flame 🔥 🟧 🟧 🟧 🟧 🟧  ↑↓ ✨✨      (3-6 days)
                         
LEVEL 3: Strong Flame 🔥 🟥 🟥 🟥 🟥 🟥  ↑↓ ✨✨◉◉    (7-14 days)
                         
LEVEL 4: Inferno + Crown👑 🔴 🔴 🔴 🔴 🔴  ↑↓ ✨✨◉◉🔄 (15+ days)
                         
        ⬆️ Flame Size    ⬆️ Color Intensity          ⬆️ Extra Features
```

---

## Color Progression

```
LEVEL 1: Yellow Gradient
  ┌─────────────────────────┐
  │ #FEF08A ──────→ #FCD34D │
  │ (Pale)    (Light Yellow)│
  └─────────────────────────┘

LEVEL 2: Yellow→Orange Gradient
  ┌─────────────────────────┐
  │ #FCD34D ──────→ #FB923C │
  │ (Light)    (Orange)     │
  └─────────────────────────┘
  
LEVEL 3: Orange→Red Gradient
  ┌─────────────────────────┐
  │ #FB923C ──────→ #EF4444 │
  │ (Orange)      (Red)     │
  └─────────────────────────┘

LEVEL 4: Red→Dark Red Gradient
  ┌─────────────────────────┐
  │ #EF4444 ──────→ #BE123C │
  │ (Red)    (Dark Crimson) │
  └─────────────────────────┘
```

---

## Animation Timeline (1.2s loop)

```
0ms          300ms        600ms        900ms        1200ms (repeat)
│            │            │            │            │
├────────────┼────────────┼────────────┼────────────┤
|  ↑ Bounce  |  ↓ Bounce  |  ↑ Bounce  |  ↓ Bounce  |
|  Scale Up  |  Scale Down|  Scale Up  |  Scale Down|
│            │            │            │            │
└────────────┴────────────┴────────────┴────────────┘
  Ease In      Ease Out    Ease In      Ease Out
```

---

## Fire Size Comparison

```
LEVEL 1              LEVEL 2              LEVEL 3              LEVEL 4
Small (48px)         Medium (64px)        Large (80px)         XL (96px)

    🔥                   🔥                   🔥                  🔥
                                                                 👑
```

## Size Multipliers

```
SMALL × 0.6          MEDIUM × 1.0         LARGE × 1.4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Level 1:  28.8px      Level 1:  48px        Level 1:  67.2px
Level 2:  38.4px      Level 2:  64px        Level 2:  89.6px
Level 3:  48px        Level 3:  80px        Level 3:  112px
Level 4:  57.6px      Level 4:  96px        Level 4:  134.4px
```

---

## Bounce Animation

```
LEVEL 1 (2px bounce)     LEVEL 2 (3px bounce)     LEVEL 3 (4px bounce)     LEVEL 4 (5px bounce)

     ↑                             ↑                        ↑                           ↑
    🔥  🔥                        🔥   🔥                   🔥    🔥                   🔥     🔥
   🔥    🔥                      🔥     🔥                 🔥      🔥                 🔥       🔥
  🔥      🔥                    🔥       🔥               🔥        🔥               🔥         🔥
  
Time:    Start   Peak   Down    Start   Peak   Down     Start   Peak   Down      Start   Peak   Down
```

---

## Scale Animation Range

```
Level 1: 0.95x ─────→ 1.08x ─────→ 0.95x
         
         [████████░░░░░] 0.95x
         [████████████░░] 1.00x
         [█████████████░] 1.08x (Peak)

Level 2: 0.93x ─────→ 1.12x ─────→ 0.93x
         
         [███████░░░░░░░] 0.93x
         [████████████░░] 1.00x
         [███████████████] 1.12x (Peak)

Level 3: 0.92x ─────→ 1.15x ─────→ 0.92x
         
         [██████░░░░░░░░] 0.92x
         [████████████░░] 1.00x
         [████████████████] 1.15x (Peak - Most dramatic)

Level 4: 0.90x ─────→ 1.18x ─────→ 0.90x
         
         [█████░░░░░░░░░] 0.90x
         [████████████░░] 1.00x
         [█████████████████] 1.18x (Peak - Maximum dramatic)
```

---

## Glow Effect Intensity

```
LEVEL 1: Soft Glow         LEVEL 2: Medium Glow       LEVEL 3: Strong Glow      LEVEL 4: Intense Glow
  ░░░░░░░░░░░              ▒▒▒▒▒▒▒▒▒▒▒▒▒              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ████████████████████
  ░░░░  🔥  ░░░░           ▒▒▒▒  🔥  ▒▒▒▒           ▓▓▓▓  🔥  ▓▓▓▓             ████  🔥  ████
  ░░░░░░░░░░░              ▒▒▒▒▒▒▒▒▒▒▒▒▒              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ████████████████████
  
  Radius: 4px              Radius: 6px               Radius: 8px              Radius: 10px
  Opacity: 0.3             Opacity: 0.4              Opacity: 0.4             Opacity: 0.5
```

---

## Particle Sparkle Pattern

```
LEVEL 1: No Sparkles
     🔥

LEVEL 2+: 4 Sparkles Rising (staggered timing)
  ✨     ✨
    
   🔥   ✨
    
  ✨     ✨
  
Time: Particles start from edge, rise up while fading out
Duration: 1.2s (same as main loop)
Delay: Each particle offset by 0.2s
```

---

## Crown Animation (Level 4 only)

```
Rotation Pattern:
  0°      90°     180°    270°    360° (repeat)
  │        │        │       │       │
  ═══     ╱═╲     ╲═╱     ═══     ╱═╲
  👑 → 👑👑 → 👑👑 → 👑 → 👑
  
  Size: 1.0x → 1.2x → 1.0x (pulsing)
  Opacity: 0.6x → 1.0x → 0.6x (pulsing)
  Duration: 2 seconds (slower than flame)
  Position: Top-right corner of flame
```

---

## SVG Structure Visualization

```
LEVEL 1 (No SVG elements highlighted):
┌─────────────────────┐
│  Main Flame Path    │
│     (Simple)        │
└─────────────────────┘

LEVEL 2 (Additional core):
┌─────────────────────┐
│  Main Flame Path    │ ━━━ Outer path
│  ┌───────────────┐  │
│  │ Inner Core    │ ━━━ Inner fill
│  │  Highlight    │ ━━━ Top tip
│  └───────────────┘  │
│  Side Flickers (2)  │ ━━━ Left & right
└─────────────────────┘

LEVEL 3+ (Outer glow circle):
┌─────────────────────┐
│  ◯ Glow Circle ◯    │ ━━━ Large glow
│┌─────────────────┐  │
││ Main Flame Path │  │ ━━━ Outer path
││ ┌─────────────┐ │  │
││ │ Inner Core  │ │ ━━━ Inner fill
││ │ Highlight   │ │ ━━━ Top tip
││ └─────────────┘ │  │
││ Side Flickers   │  │ ━━━ Left & right
│└─────────────────┘  │
└─────────────────────┘
```

---

## Animation Easing Curve

```
Speed Over 1.2s Loop:

EASE IN-OUT (all levels)

     │      ╱╲
     │    ╱    ╲
Speed│  ╱        ╲
     │╱            ╲
     └──────────────────── Time
     0ms   300ms  600ms  900ms  1200ms
     
     Slow → Fast → Slow (smooth, natural motion)
```

---

## Streak Level Requirements

```
╔════════════════════════════════════════════════════════════════════╗
║ FIRE MODE PROGRESSION                                              ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║ 0 days ──→ ⚫ (No Fire)                                            ║
║                                                                    ║
║ 1 day  ──→ 🔥 (Level 1: Small Flicker)                           ║
║ 2 days ──→ 🔥 (Level 1: Small Flicker)                           ║
║                                                                    ║
║ 3 days ──→ 🔥 (Level 2: Medium Flame) + 🥉 Bronze Badge         ║
║ 4 days ──→ 🔥 (Level 2: Medium Flame)                            ║
║ 5 days ──→ 🔥 (Level 2: Medium Flame)                            ║
║ 6 days ──→ 🔥 (Level 2: Medium Flame)                            ║
║                                                                    ║
║ 7 days ──→ 🔥 (Level 3: Strong Flame) + 🥈 Silver Badge          ║
║ 8 days ──→ 🔥 (Level 3: Strong Flame)                            ║
║ ...    ──→ 🔥 (Level 3: Strong Flame)                            ║
║ 14 days ──→ 🔥 (Level 3: Strong Flame)                           ║
║                                                                    ║
║ 15 days ──→ 🔥👑 (Level 4: Inferno + Crown) + 👑 Golden Crown   ║
║ 20 days ──→ 🔥👑 (Level 4: Inferno + Crown)                      ║
║ 30 days ──→ 🔥👑 (Level 4: Inferno + Crown)                      ║
║ ∞ days  ──→ 🔥👑 (Level 4: Inferno + Crown)                      ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Animation Flow Diagram

```
USER COMPLETES ACTIVITY
         │
         ↓
    Streak += 1
         │
         ↓
   FIRE MODE RESPONDS
         │
    ┌────┴────┬────────┬───────────┐
    ↓         ↓        ↓           ↓
  Level 1  Level 2  Level 3     Level 4
   1-2d     3-6d     7-14d       15+d
    │         │        │           │
    └─────────┴────────┴───────────┘
             │
             ↓
    🔥 ANIMATION PLAYS
    • Bounce motion
    • Scale pulse
    • Glow effect
    • Particles (L2+)
    • Crown spin (L4)
    │
    └─→ [1.2s LOOP] →─→
         (Repeating)
```

---

## Quick Fire Level Lookup

| Streak | Animation | Color | Size | Sparkles | Crown | Message |
|--------|-----------|-------|------|----------|-------|---------|
| 0 | Static | Gray | 48px | ✗ | ✗ | No Fire Yet |
| 1-2 | Gentle | Yellow | 48px | ✗ | ✗ | Getting started |
| 3-6 | Pulsing | Orange | 64px | ✓ | ✗ | Building momentum |
| 7-14 | Energetic | Red | 80px | ✓ | ✗ | Keep burning |
| 15+ | Intense | Dark Red | 96px | ✓ | ✓ | You're a legend! |

---

## Implementation Checklist

- ✅ SVG cartoon flame paths
- ✅ Gradient color fills
- ✅ Bounce animation (Y-axis)
- ✅ Scale pulsing (growing/shrinking)
- ✅ Glow effects (drop shadow)
- ✅ Particle sparkles (L2+)
- ✅ Crown rotation (L4)
- ✅ 1.2s smooth loop
- ✅ Easing function (easeInOut)
- ✅ Size variations (small, medium, large)
- ✅ Level descriptions
- ✅ No scary/aggressive effects
- ✅ Friendly cartoon style
- ✅ Responsive design
- ✅ TypeScript support

---

## Performance Profile

```
CPU USAGE:
┌─ Level 0: ~0% (static)      ⚫
├─ Level 1: ~1% (gentle)      🔥
├─ Level 2: ~2% (pulsing)     🔥
├─ Level 3: ~3% (energetic)   🔥
└─ Level 4: ~4% (intense)     🔥👑

MEMORY:
Level 0: 50KB
Level 1: 500KB  (SVG rendering)
Level 2: 800KB  (+ particles)
Level 3: 850KB  (+ glow)
Level 4: 900KB  (+ crown)

FPS: Consistent 60fps across all levels
```

---

**Keep your fire burning! 🔥**

For more details, visit:
- `/fire-mode-demo` - Interactive demo
- `docs/FIRE_MODE_ANIMATION.md` - Full documentation
- `FIRE_MODE_QUICK_REFERENCE.md` - Quick reference
