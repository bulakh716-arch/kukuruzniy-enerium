# GSAP / Advanced Animation

Add GSAP-powered advanced animations and timeline sequences.

## Stack
- GSAP (install: `npm install gsap`)
- GSAP ScrollTrigger for scroll-driven animations
- Integrate with existing Lenis smooth scroll
- TypeScript

## Task
$ARGUMENTS

## Lenis + GSAP integration (required)
```tsx
// In layout.tsx or a client component:
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Connect Lenis to GSAP ticker
const lenis = new Lenis();
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Sync Lenis scroll with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
```

## Common animation patterns

### Pin + scrub 3D rotation
```tsx
gsap.to(element, {
  rotateY: 360,
  scrollTrigger: { trigger: element, scrub: 1, pin: true, start: 'top top', end: '+=1000' }
});
```

### Stagger entrance
```tsx
gsap.from('.card', { 
  y: 60, opacity: 0, rotateX: 20,
  stagger: 0.1, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.cards-container', start: 'top 80%' }
});
```

### Horizontal scroll section
```tsx
// Pin section, scroll horizontally through items
// Common for feature showcases
```

## Output
- Animation hook in `src/hooks/useGSAP.ts`
- Example section using it
- Cleanup `ScrollTrigger.kill()` in useEffect return
