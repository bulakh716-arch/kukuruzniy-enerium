# Particle System

Create a GPU-friendly particle/floating element system for the Enerium background.

## Stack
- Option A: Pure CSS + Framer Motion (lightweight, no extra deps)
- Option B: Three.js `Points` + `BufferGeometry` (heavy, full 3D)
- Option C: Canvas 2D API (performant, custom)

## Task
$ARGUMENTS

## Option A — Framer Motion floating particles (recommended for web)
```tsx
// Random floating particles with useAnimationFrame or animate
// Stagger entry, infinite float loop, blur for depth
// Already used in FloatingEmojis.tsx — extend that pattern
```

## Option B — Three.js Points (if three-scene already set up)
```tsx
// BufferGeometry with Float32Array positions
// PointsMaterial with size attenuation
// useFrame to rotate/drift particle cloud
// instanced for 10k+ particles
```

## Option C — Canvas 2D
```tsx
// useRef<HTMLCanvasElement>
// useEffect with requestAnimationFrame loop
// Particle class: { x, y, vx, vy, alpha, radius }
// Connect nearby particles with lines (network effect)
```

## Enerium-specific style
- Colors: white `rgba(255,255,255,0.3-0.6)`, accent `rgba(139,92,246,0.4)` (purple), `rgba(59,130,246,0.4)` (blue)
- Sizes: 1-4px dots or 8-20px emoji/icons
- Motion: slow drift + mouse parallax repulsion
- Count: 20-60 for CSS, up to 5000 for Three.js

## Output
- Component in `src/components/ui/`
- Props: count, colors?, size?, speed?, interactive?
- Performance: `will-change: transform`, `pointer-events: none`, absolute positioned overlay
