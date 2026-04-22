'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AI_FEATURES } from '@/lib/constants';

const SCREENSHOTS: Record<string, string[]> = {
  scan: ['/screen-vision.PNG'],
  plan: ['/screen-planner-setup.PNG', '/screen-planner-result.PNG'],
  adapt: ['/screen-analytics.PNG'],
};

const ACCENTS: Record<string, string> = {
  scan: '#B7F46B',
  plan: '#82AFFF',
  adapt: '#FF9600',
};

export default function AISuperSection() {
  const [activeTab, setActiveTab] = useState(0);

  const feature = AI_FEATURES[activeTab];
  const accent = ACCENTS[feature.visual] || '#B7F46B';
  const screens = SCREENSHOTS[feature.visual] || [];

  return (
    <section id="ai" className="relative flex min-h-[100svh] flex-col justify-center py-8">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-7 text-center md:mb-12"
        >
          <span className="mb-4 inline-block rounded-full border border-[#B7F46B]/20 bg-[#B7F46B]/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B7F46B]">
            AI Superpowers
          </span>
          <h2 className="mt-3 font-satoshi text-3xl font-black tracking-tight text-white md:mt-4 md:text-5xl">
            Intelligence That{' '}
            <span className="bg-gradient-to-br from-[#B7F46B] to-[#6DAE2C] bg-clip-text text-transparent">
              Works for You
            </span>
          </h2>
        </motion.div>

        {/* Tab bar */}
        <div className="mb-7 flex justify-center gap-2 md:mb-10 md:gap-3">
          {AI_FEATURES.map((f, i) => {
            const tabAccent = ACCENTS[f.visual] || '#B7F46B';
            const isActive = activeTab === i;
            return (
              <button
                key={f.title}
                onClick={() => setActiveTab(i)}
                className="rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 md:px-6 md:text-xs"
                style={{
                  borderColor: isActive ? `${tabAccent}50` : 'rgba(255,255,255,0.08)',
                  color: isActive ? tabAccent : 'rgba(255,255,255,0.4)',
                  background: isActive ? `${tabAccent}12` : 'transparent',
                }}
              >
                {f.title}
              </button>
            );
          })}
        </div>

        {/* Feature content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-8 md:flex-row md:gap-16"
          >
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ background: `${accent}10`, color: `${accent}cc`, border: `1px solid ${accent}20` }}
              >
                {feature.title}
              </div>
              <h3 className="font-satoshi text-2xl font-black text-white md:text-4xl">
                {feature.subtitle}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/45 md:mx-0 md:text-base">
                {feature.description}
              </p>
            </div>

            {/* Screenshots */}
            <div className="relative flex flex-1 items-center justify-center">
              {screens.length === 1 && (
                <div className="relative w-[170px] md:w-[260px]">
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    <Image
                      src={screens[0]}
                      alt={feature.title}
                      width={260}
                      height={563}
                      className="w-full"
                      priority
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl opacity-30"
                    style={{ background: `radial-gradient(circle, ${accent}40, transparent)` }}
                  />
                </div>
              )}

              {screens.length === 2 && (
                <div className="relative flex items-center" style={{ perspective: '1000px' }}>
                  <div className="relative -mr-6 w-[130px] md:-mr-10 md:w-[220px]" style={{ transform: 'rotateY(8deg)', zIndex: 1 }}>
                    <div className="overflow-hidden rounded-[1.8rem] border border-white/10 shadow-2xl">
                      <Image src={screens[0]} alt={`${feature.title} setup`} width={220} height={476} className="w-full" />
                    </div>
                  </div>
                  <div className="relative w-[146px] md:w-[240px]" style={{ transform: 'rotateY(-4deg)', zIndex: 2 }}>
                    <div className="overflow-hidden rounded-[2rem] border-2 border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                      <Image src={screens[1]} alt={`${feature.title} result`} width={240} height={520} className="w-full" />
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl opacity-25"
                    style={{ background: `radial-gradient(circle, ${accent}40, transparent)` }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
