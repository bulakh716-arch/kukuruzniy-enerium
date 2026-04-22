'use client';

import { useEffect, useRef } from 'react';

// Brand colour palette — [R, G, B]
const PALETTE: [number, number, number][] = [
  [183, 244, 107], // #B7F46B  green        (dominant)
  [183, 244, 107], // green again — extra weight
  [155, 218,  80], // slightly darker green
  [130, 175, 255], // #82AFFF  blue-white
  [220, 255, 180], // very pale green
  [255, 255, 255], // pure white
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** core radius */
  r: number;
  /** peak opacity for this particle */
  maxAlpha: number;
  /** current twinkle phase (radians) */
  phase: number;
  phaseSpeed: number;
  color: [number, number, number];
}

function mkParticle(W: number, H: number, spawnAtBottom?: boolean): Particle {
  const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  return {
    x: Math.random() * W,
    y: spawnAtBottom ? H + 4 : Math.random() * H,
    vx: (Math.random() - 0.5) * 0.22,
    vy: -(0.06 + Math.random() * 0.20),
    r: 0.5 + Math.random() * 1.8,
    maxAlpha: 0.07 + Math.random() * 0.38,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.35 + Math.random() * 0.75,
    color,
  };
}

export default function SiteParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const COUNT = isMobile ? 30 : 220;
    // 60fps everywhere — no artificial cap
    const FRAME_MS = 1000 / 60;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Seed all particles scattered across viewport on first load
    const particles: Particle[] = Array.from({ length: COUNT }, () => mkParticle(W, H));

    let raf = 0;
    let lastT = 0;

    function frame(t: number) {
      raf = requestAnimationFrame(frame);

      if (t - lastT < FRAME_MS) return;
      // Use fixed timestep so speed is framerate-independent
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;

      ctx!.clearRect(0, 0, W, H);

      for (const p of particles) {
        // Advance position
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.phase += p.phaseSpeed * dt;

        // Recycle when off-screen
        if (p.y < -8 || p.x < -8 || p.x > W + 8) {
          Object.assign(p, mkParticle(W, H, true));
          continue;
        }

        // Twinkle: smooth sine oscillation between 40 % and 100 % of maxAlpha
        const tw = Math.sin(p.phase) * 0.5 + 0.5; // 0 → 1

        // Hero zone boost: top 60% of viewport — particles brighter + bigger
        const heroBoost = !isMobile && p.y < H * 0.6 ? 1.0 + (1 - p.y / (H * 0.6)) * 1.2 : 1.0;
        const alpha = p.maxAlpha * (0.4 + tw * 0.6) * heroBoost;
        const drawR = p.r * (heroBoost > 1 ? 0.9 + heroBoost * 0.15 : 1);

        const [r, g, b] = p.color;

        // Soft glow halo — skip on mobile to save draw calls
        if (!isMobile) {
          const glowR = drawR * 5;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha * 0.15, 0.18)})`;
          ctx!.fill();
        }

        // Bright core dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, drawR, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha, 0.9)})`;
        ctx!.fill();
      }
    }

    raf = requestAnimationFrame(frame);

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen"
    />
  );
}
