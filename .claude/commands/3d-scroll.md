# 3D Scroll Animation

Add scroll-driven 3D animation using Framer Motion's useScroll.

## Stack
- Framer Motion: `useScroll`, `useTransform`, `useSpring`, `motion`
- Lenis smooth scroll (already configured in project)
- Tailwind CSS
- TypeScript

## Task
$ARGUMENTS

## Pattern
```tsx
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function ScrollSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // 3D transforms driven by scroll
  const rotateX = useTransform(smoothProgress, [0, 1], ['20deg', '-20deg']);
  const rotateY = useTransform(smoothProgress, [0, 1], ['-15deg', '15deg']);
  const translateZ = useTransform(smoothProgress, [0, 0.5, 1], ['-100px', '50px', '-100px']);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
}
```

## Guidelines
- Use `perspective` CSS on parent: `style={{ perspective: '1000px' }}`
- Combine `rotateX` + `rotateY` + `translateZ` for full 3D parallax
- `useSpring` smooths scroll jank
- Pin sections with `position: sticky` + tall scroll container
- Layer multiple elements at different `translateZ` depths for parallax

## Output
- Section component with scroll-triggered 3D animation
- Works with existing Lenis smooth scroll
