# 3D Text / Typography Effect

Create impressive 3D text effects for headlines and hero sections.

## Stack
- Framer Motion for CSS 3D transforms on text
- Three.js `TextGeometry` + `@react-three/drei` `<Text3D>` for full 3D
- CSS `text-shadow` + `filter` for simulated depth
- TypeScript

## Task
$ARGUMENTS

## Effect catalog

### 1. Layered depth shadow (CSS only)
```css
/* Stacked text-shadow creating depth illusion */
text-shadow: 
  1px 1px 0 #1a1a2e,
  2px 2px 0 #16213e,
  3px 3px 0 #0f3460,
  4px 4px 8px rgba(0,0,0,0.5);
```

### 2. Framer Motion 3D flip reveal
```tsx
// rotateX 90->0, opacity 0->1 on mount or scroll
// perspective parent + backface-visibility: hidden
// Stagger each word/letter
```

### 3. Three.js Text3D
```tsx
import { Text3D, Center, Float } from '@react-three/drei';
// Bevel + extrusion for real 3D text
// Metallic/holographic material
// Float animation
```

### 4. Gradient + glow text
```css
background: linear-gradient(135deg, #fff 0%, #a78bfa 50%, #60a5fa 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
filter: drop-shadow(0 0 20px rgba(167,139,250,0.5));
```

### 5. Scramble / typewriter effect
```tsx
// Animate characters cycling through random chars before settling
// useEffect with interval, updating displayed string
```

## Output
- Reusable `<Heading3D>` component
- Props: text, effect ('depth'|'flip'|'gradient'|'scramble'), size?
- Place in `src/components/ui/`
