'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ECOSYSTEM_PILLARS } from '@/lib/constants';

type PillarLayout = {
  contentClass: string;
  mediaWrapClass: string;
  imageClass: string;
};

const PILLAR_SCREENS = {
  nutrition: '/screen-calories.PNG',
  fitness: '/screen-activity.PNG',
  hydration: '/screen-water.PNG',
  kitchen: '/screen-fridge.PNG',
  analytics: '/screen-analytics.PNG',
} as const;

const PILLAR_ICONS: Record<string, string> = {
  nutrition: '🥗',
  fitness: '🏃',
  hydration: '💧',
  kitchen: '🍳',
  analytics: '📊',
};

const GRID_CLASSES = ['col-span-2 md:col-span-2 md:row-span-2', '', '', 'md:col-span-2', ''] as const;

const PILLAR_LAYOUTS: Record<string, PillarLayout> = {
  nutrition: {
    contentClass: 'p-4 md:max-w-[54%] md:p-10',
    mediaWrapClass: 'md:absolute md:bottom-0 md:right-8 md:w-[230px]',
    imageClass: '',
  },
  fitness: {
    contentClass: 'p-3 md:max-w-[58%] md:p-6',
    mediaWrapClass: 'md:absolute md:bottom-0 md:right-4 md:w-[112px]',
    imageClass: '',
  },
  hydration: {
    contentClass: 'p-3 md:max-w-[58%] md:p-6',
    mediaWrapClass: 'md:absolute md:bottom-0 md:right-4 md:w-[110px]',
    imageClass: '',
  },
  kitchen: {
    contentClass: 'p-3 md:max-w-[48%] md:p-8',
    mediaWrapClass: 'md:absolute md:bottom-0 md:right-6 md:w-[82px]',
    imageClass: '',
  },
  analytics: {
    contentClass: 'p-3 md:max-w-[52%] md:p-5',
    mediaWrapClass: 'md:absolute md:bottom-0 md:right-2 md:w-[82px]',
    imageClass: '',
  },
};

/* ── Bottom-sheet / Modal widget ── */
function PillarWidget({
  pillar,
  onClose,
}: {
  pillar: typeof ECOSYSTEM_PILLARS[number];
  onClose: () => void;
}) {
  const screen = PILLAR_SCREENS[pillar.id as keyof typeof PILLAR_SCREENS];
  const isLarge = pillar.id === 'nutrition';
  const imgW = isLarge ? 255 : pillar.id === 'analytics' ? 136 : 158;
  const imgH = isLarge ? 552 : pillar.id === 'analytics' ? 294 : 342;

  // Refs for direct DOM manipulation — no MotionValue conflicts
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const dragY = useRef(0);
  const isDragging = useRef(false);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // CSS slide-in after mount (avoids any FM animation conflict)
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.transform = 'translateY(100%)';
    sheet.style.transition = 'none';
    // Force reflow before starting transition
    sheet.getBoundingClientRect();
    sheet.style.transition = 'transform 0.42s cubic-bezier(0.32,0.72,0,1)';
    sheet.style.transform = 'translateY(0)';
  }, []);

  const handleClose = useCallback(() => {
    const sheet = sheetRef.current;
    if (sheet) {
      sheet.style.transition = 'transform 0.28s cubic-bezier(0.4,0,1,1)';
      sheet.style.transform = 'translateY(100%)';
    }
    setTimeout(onClose, 280);
  }, [onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    dragY.current = 0;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const scrollable = scrollableRef.current;
    const delta = e.touches[0].clientY - touchStartY.current;
    const atTop = !scrollable || scrollable.scrollTop <= 0;

    if (delta > 0 && atTop) {
      isDragging.current = true;
      dragY.current = delta;
      const sheet = sheetRef.current;
      if (sheet) {
        sheet.style.transition = 'none';
        sheet.style.transform = `translateY(${delta}px)`;
      }
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (dragY.current > 110) {
      handleClose();
    } else {
      const sheet = sheetRef.current;
      if (sheet) {
        sheet.style.transition = 'transform 0.35s cubic-bezier(0.32,0.72,0,1)';
        sheet.style.transform = 'translateY(0)';
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Sheet — animated via CSS ref, not Framer Motion */}
      <div
        ref={sheetRef}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-2xl border border-white/[0.08] bg-[#0d0d0d] md:rounded-2xl md:mx-4"
        style={{ maxHeight: '90svh' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{PILLAR_ICONS[pillar.id]}</span>
            <div>
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: pillar.accent }}
              >
                {pillar.title.split(' ')[0]}
              </div>
              <h3 className="font-satoshi text-base font-bold text-white">{pillar.title}</h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div ref={scrollableRef} className="overflow-y-auto" style={{ maxHeight: 'calc(90svh - 80px)' }}>
          {/* Screen preview */}
          {screen && (
            <div className="flex justify-center px-6 pb-5">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_48px_rgba(0,0,0,0.5)]" style={{ width: 160 }}>
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/[0.06] to-transparent z-10" />
                <Image
                  src={screen}
                  alt={pillar.title}
                  width={imgW}
                  height={imgH}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="px-5 pb-4">
            <p className="text-sm leading-relaxed text-white/60">{pillar.description}</p>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap gap-2 px-5 pb-8">
            {pillar.metrics.map((metric) => (
              <span
                key={metric}
                className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                style={{
                  borderColor: `${pillar.accent}28`,
                  color: `${pillar.accent}cc`,
                  background: `${pillar.accent}0a`,
                }}
              >
                {metric}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EcosystemSection() {
  const [activePillar, setActivePillar] = useState<typeof ECOSYSTEM_PILLARS[number] | null>(null);
  const close = useCallback(() => setActivePillar(null), []);

  return (
    <section id="ecosystem" className="relative flex min-h-[100svh] flex-col justify-center py-6">
      {/* SEO: hidden but indexable content for all pillars */}
      <div aria-hidden="true" className="sr-only">
        {ECOSYSTEM_PILLARS.map((p) => (
          <div key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul>{p.metrics.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-5 text-center md:mb-10"
        >
          <span className="mb-4 inline-block rounded-full border border-[#B7F46B]/20 bg-[#B7F46B]/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B7F46B]">
            Ecosystem
          </span>
          <h2 className="mt-4 font-satoshi text-3xl font-black tracking-tight text-white md:text-5xl">
            One Platform.<br />
            <span className="bg-gradient-to-br from-[#B7F46B] to-[#6DAE2C] bg-clip-text text-transparent">
              Five Dimensions.
            </span>
          </h2>
          <p className="mx-auto mt-4 hidden max-w-lg text-sm text-white/40 md:block md:text-base">
            Everything you need for complete health management, unified in a single intelligent system.
          </p>
        </motion.div>

        {/* ── Mobile: 2×3 tap tiles ── */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {ECOSYSTEM_PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              style={{ touchAction: 'manipulation' }}
              className={pillar.id === 'nutrition' ? 'col-span-2' : ''}
            >
              <button
                onClick={() => setActivePillar(pillar)}
                style={{ touchAction: 'manipulation' }}
                className="group relative flex w-full flex-col items-start gap-2.5 overflow-hidden rounded-xl border border-white/[0.07] bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-4 text-left transition-transform duration-150 active:scale-[0.96] active:border-white/15"
              >
                {/* Top shine line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <span className="text-2xl">{PILLAR_ICONS[pillar.id]}</span>

                <div className="flex-1">
                  <div
                    className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.title.split(' ')[0]}
                  </div>
                  <div className="font-satoshi text-sm font-bold leading-tight text-white">
                    {pillar.title}
                  </div>
                </div>

                {/* Arrow hint */}
                <div
                  className="flex items-center gap-1 text-[10px] font-medium"
                  style={{ color: `${pillar.accent}80` }}
                >
                  Explore
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: original bento grid ── */}
        <div className="hidden md:grid md:grid-cols-3 md:grid-rows-[280px_280px_220px] md:gap-4">
          {ECOSYSTEM_PILLARS.map((pillar, index) => {
            const isLarge = pillar.id === 'nutrition';
            const screen = PILLAR_SCREENS[pillar.id as keyof typeof PILLAR_SCREENS];
            const layout = PILLAR_LAYOUTS[pillar.id] ?? PILLAR_LAYOUTS.nutrition;
            const imgW = isLarge ? 230 : pillar.id === 'analytics' ? 82 : 112;
            const imgH = isLarge ? 498 : pillar.id === 'analytics' ? 177 : 242;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className={`group relative isolate flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.018))] transition-all duration-500 hover:border-white/12 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.028))] ${GRID_CLASSES[index] || ''}`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                <div className={`relative z-20 ${layout.contentClass}`}>
                  <div
                    className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{
                      borderColor: `${pillar.accent}18`,
                      color: `${pillar.accent}cc`,
                      background: `${pillar.accent}08`,
                    }}
                  >
                    {pillar.title.split(' ')[0]}
                  </div>

                  <h3 className={`font-satoshi font-bold text-white ${isLarge ? 'text-base md:text-2xl' : 'text-xs md:text-base'}`}>
                    {pillar.title}
                  </h3>
                  <p className={`mt-1 leading-relaxed text-white/42 ${isLarge ? 'max-w-sm text-xs md:text-sm' : 'max-w-[18rem] text-[10px] md:text-xs'}`}>
                    {pillar.description}
                  </p>

                  <div className={`flex flex-wrap gap-1.5 ${isLarge ? 'mt-5' : 'mt-3'}`}>
                    {pillar.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-full border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                        style={{
                          borderColor: `${pillar.accent}20`,
                          color: `${pillar.accent}90`,
                          background: `${pillar.accent}08`,
                        }}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {screen && (
                  <div className={`pointer-events-none relative z-10 mt-auto flex justify-center px-0 ${layout.mediaWrapClass}`}>
                    <div className="relative overflow-hidden rounded-t-[0.75rem] border border-b-0 border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_20px_48px_rgba(0,0,0,0.42)]">
                      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/[0.08] to-transparent" />
                      <div className="relative w-full">
                        <Image
                          src={screen}
                          alt={pillar.title}
                          width={imgW}
                          height={imgH}
                          className={`w-full ${layout.imageClass}`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom sheet / modal */}
      <AnimatePresence>
        {activePillar && (
          <PillarWidget pillar={activePillar} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  );
}
