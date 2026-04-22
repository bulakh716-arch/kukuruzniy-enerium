# New Section with 3D Design

Create a new full-width landing page section following Enerium's design system.

## Stack
- Next.js 14 (dynamic import, 'use client')
- Framer Motion
- Tailwind CSS dark theme
- TypeScript

## Task
$ARGUMENTS

## Section template structure
```tsx
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function NewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background gradient / glow */}
      {/* Grid or noise texture */}
      {/* Content with 3D scroll animations */}
      {/* Cards / features */}
    </section>
  );
}
```

## Enerium design system
- **Colors**: bg `#050505`, card `#0A0A0A`, text `#fff`, muted `rgba(255,255,255,0.5)`
- **Accent gradients**: purple `#8B5CF6` → blue `#3B82F6` → cyan `#06B6D4`
- **Border**: `border-white/5` default, `border-white/10` hover
- **Rounded**: `rounded-[2.5rem]` large cards, `rounded-2xl` small
- **Spacing**: section `py-32`, content max-w-7xl mx-auto px-6
- **Typography**: large headline `text-5xl md:text-7xl font-bold`
- **Animation**: entrance fade-up, scroll parallax, hover tilt

## Add to page
After creating, add dynamic import in `src/app/page.tsx`:
```tsx
const NewSection = dynamic(() => import('@/components/sections/NewSection'));
```

## Output
- Full section component in `src/components/sections/`
- Mobile responsive
- Scroll-triggered entrance animations
