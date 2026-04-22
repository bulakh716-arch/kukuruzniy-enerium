'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface SectionDividerProps {
  variant?: 'glow' | 'gradient' | 'orb' | 'dots';
  color?: string;
  flip?: boolean;
}

export function SectionDivider({ variant = 'glow', color = '#B7F46B', flip = false }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Mobile: lightweight static versions — no scroll-linked animations
  if (isMobile) {
    if (variant === 'gradient') {
      return (
        <div className="relative h-20 overflow-hidden flex items-center justify-center">
          <div
            className="h-px w-[60%] max-w-xl"
            style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
          />
        </div>
      );
    }
    if (variant === 'orb') {
      return (
        <div className="relative h-20 overflow-hidden flex items-center justify-center">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}80` }}
          />
        </div>
      );
    }
    if (variant === 'dots') {
      return (
        <div className="relative h-16 overflow-hidden flex items-center justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full opacity-50" style={{ backgroundColor: color }} />
          ))}
        </div>
      );
    }
    // glow → simple spacer
    return <div className="h-16" />;
  }

  if (variant === 'gradient') {
    return (
      <div ref={ref} className="relative h-32 md:h-48 overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-px w-[70%] max-w-2xl"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}30, ${color}15, ${color}30, transparent)`,
            }}
          />
        </motion.div>
        {/* Soft ambient glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[400px] rounded-full blur-3xl"
          style={{
            opacity,
            background: `radial-gradient(ellipse, ${color}08 0%, transparent 70%)`,
          }}
        />
      </div>
    );
  }

  if (variant === 'orb') {
    return (
      <div ref={ref} className="relative h-40 md:h-56 overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Central orb */}
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 30px ${color}60, 0 0 60px ${color}20` }}
          />
        </motion.div>
        {/* Radial lines */}
        <motion.div
          style={{ opacity }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
        >
          <div
            className="h-px w-[200px] md:w-[300px]"
            style={{ background: `linear-gradient(90deg, transparent, ${color}20)` }}
          />
          <div className="w-6" />
          <div
            className="h-px w-[200px] md:w-[300px]"
            style={{ background: `linear-gradient(270deg, transparent, ${color}20)` }}
          />
        </motion.div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div ref={ref} className="relative h-24 md:h-32 overflow-hidden">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex items-center justify-center gap-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: color }}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Default: glow
  return (
    <div ref={ref} className={`relative h-24 md:h-40 overflow-hidden ${flip ? 'rotate-180' : ''}`}>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] rounded-full blur-3xl"
        style={{
          opacity,
          background: `radial-gradient(ellipse, ${color}06 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}

/* Section fade-in wrapper */
export function SectionReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
