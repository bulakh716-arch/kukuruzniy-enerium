# Glassmorphism 3D Card

Create a glassmorphism card with 3D tilt, inner glow, and depth layers.

## Stack
- Framer Motion
- Tailwind CSS
- TypeScript

## Task
$ARGUMENTS

## Template
```tsx
'use client';
import { useRef, useState } from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';

// Glassmorphism + 3D tilt card
// - backdrop-blur for glass
// - radial-gradient glow chasing cursor  
// - rotateX/Y springs for tilt
// - inner highlight border
// - optional: floating badge, icon, sparkle particles
```

## Key CSS patterns
```
glass base:    bg-white/5 backdrop-blur-xl border border-white/10
inner glow:    shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
outer glow:    shadow-[0_0_40px_rgba(X,X,X,0.3)] (color-matched)
shimmer:       bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer
noise texture: bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay
depth layers:  translateZ(20px) for foreground, translateZ(-10px) for background
```

## Variants to implement
1. **Stat card** — number + label + sparkline
2. **Feature card** — icon + title + description + glow accent
3. **Image card** — image with 3D parallax on hover
4. **CTA card** — button + gradient background

## Output
- Reusable component in `src/components/ui/`
- Props: title, description, icon?, accentColor?, children?
- Storybook-ready (if configured)
