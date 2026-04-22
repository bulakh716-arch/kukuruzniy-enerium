'use client';

import { useMemo, useState, useEffect } from 'react';

const LIGHTS = [
  { glow: 'rgba(183,244,107,0.18)', edge: 'rgba(183,244,107,0.03)' },
  { glow: 'rgba(130,175,255,0.15)', edge: 'rgba(130,175,255,0.03)' },
  { glow: 'rgba(246,112,112,0.12)', edge: 'rgba(246,112,112,0.02)' },
  { glow: 'rgba(255,150,0,0.12)', edge: 'rgba(255,150,0,0.02)' },
];

interface Particle {
  left: number;
  top: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotate: number;
  scale: number;
  blur: number;
  opacity: number;
  glow: string;
  edge: string;
  borderRadius: string;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FloatingEmojis() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const r = (n: number) => seededRandom(i * 100 + n);
      const palette = LIGHTS[Math.floor(r(1) * LIGHTS.length)];

      return {
        left: r(2) * 100,
        top: r(3) * 100,
        width: 90 + r(4) * 170,
        height: 56 + r(5) * 120,
        duration: 24 + r(6) * 18,
        delay: r(7) * -28,
        driftX: -40 + r(8) * 80,
        driftY: -28 + r(9) * 56,
        rotate: -22 + r(10) * 44,
        scale: 0.86 + r(11) * 0.34,
        blur: 24 + r(12) * 30,
        opacity: 0.08 + r(13) * 0.11,
        glow: palette.glow,
        edge: palette.edge,
        borderRadius: r(14) > 0.45 ? '999px' : '38%',
      };
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes ambientFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--rotation)) scale(var(--scale));
            opacity: 0;
          }
          12% {
            opacity: var(--max-opacity);
          }
          52% {
            transform: translate3d(calc(var(--drift-x) * 0.45), calc(var(--drift-y) * -0.3), 0)
              rotate(calc(var(--rotation) + 6deg)) scale(calc(var(--scale) * 1.04));
          }
          88% {
            opacity: var(--max-opacity);
          }
          100% {
            transform: translate3d(var(--drift-x), var(--drift-y), 0)
              rotate(calc(var(--rotation) - 8deg)) scale(calc(var(--scale) * 0.96));
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute will-change-transform mix-blend-screen"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            borderRadius: p.borderRadius,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), ${p.glow} 34%, ${p.edge} 72%, transparent 100%)`,
            animation: `ambientFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: `blur(${p.blur}px)`,
            ['--rotation' as string]: `${p.rotate}deg`,
            ['--drift-x' as string]: `${p.driftX}px`,
            ['--drift-y' as string]: `${p.driftY}px`,
            ['--scale' as string]: p.scale,
            ['--max-opacity' as string]: p.opacity,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
