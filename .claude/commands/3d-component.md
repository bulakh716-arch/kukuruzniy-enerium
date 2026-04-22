# 3D Component Creator

Create an interactive 3D component for the Enerium project.

## Stack
- Next.js 14 (App Router, 'use client')
- Framer Motion (motion, useSpring, useTransform, useScroll, useMotionValue)
- Tailwind CSS
- TypeScript
- Three.js / @react-three/fiber if 3D scene needed

## Task
$ARGUMENTS

## Guidelines
1. Use `'use client'` directive for interactive components
2. Prefer Framer Motion for CSS 3D transforms (rotateX, rotateY, perspective, translateZ)
3. Use `transformPerspective` for realistic 3D depth
4. Add mouse-tracking with `useRef` + `getBoundingClientRect()` normalized to [-0.5, 0.5]
5. Use `useSpring` for smooth physics-based transitions
6. Layer glassmorphism: `backdrop-blur`, `bg-white/5`, `border border-white/10`
7. Add glow with `radial-gradient` following cursor position
8. Dark theme: background `#050505`, cards `#0A0A0A`
9. Export as named export, place in `src/components/ui/` or `src/components/sections/`

## Output
- Full TypeScript component
- Import ready for `src/app/page.tsx`
- Responsive + accessible
