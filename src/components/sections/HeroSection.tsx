'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { STATS } from '@/lib/constants';

const ease = [0.16, 1, 0.3, 1] as const;

// When (in seconds, from the start of the intro video) the iPhone-like frame appears.
const FRAME_REVEAL_AT_S = 3;
// How long the frame reveal animation lasts.
const FRAME_REVEAL_DURATION_S = 0.8;

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const [introFramed, setIntroFramed] = useState(false);
  const [introShrunk, setIntroShrunk] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  // Reset scroll position on first mount so reload always lands on hero
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  // Inline intro video: frame appears at FRAME_REVEAL_AT_S, last frame stays on screen,
  // and when it finishes the rest of the hero content reveals.
  useEffect(() => {
    const video = introVideoRef.current;
    if (!video) return;

    document.body.classList.remove('site-preload-ready');

    const handleTimeUpdate = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      if (video.currentTime >= FRAME_REVEAL_AT_S) {
        setIntroFramed(true);
      }
    };

    const reveal = () => {
      setIntroFramed(true);
      setIntroShrunk(true);
      document.body.classList.add('site-preload-ready');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', reveal);
    video.addEventListener('error', reveal);
    void video.play().catch(() => {});

    // Safety fallback in case `ended` never fires (e.g. autoplay blocked).
    const fallbackTimer = window.setTimeout(reveal, 9000);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', reveal);
      video.removeEventListener('error', reveal);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section ref={ref} className={`relative min-h-[100svh] overflow-hidden pb-40 transition-colors duration-700 ${introShrunk ? 'bg-[linear-gradient(to_bottom,#050505_0%,#050505_75%,rgba(5,5,5,0.6)_92%,transparent_100%)]' : 'bg-black'}`}>

      {/* HERO TEXT */}
      <div className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 text-center md:pt-32">
        {/* Parallax + fade wrapper — desktop only, transform only, separate from canvas */}
        <motion.div
          style={{ y: isMobile ? 0 : textY }}
          className="flex w-full flex-col items-center"
        >
        {/* Badge */}
        <div className="hero-reveal flex w-full justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              {!isMobile && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B7F46B] opacity-75" />}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B7F46B]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              AI Health Platform
            </span>
          </motion.div>
        </div>

        {/* Inline intro video */}
        <div
          className={`site-intro__video-shell${introFramed ? ' is-framed' : ''}${introShrunk ? ' is-shrunk' : ''}`}
          style={{ ['--frame-reveal-duration' as string]: `${FRAME_REVEAL_DURATION_S}s` }}
        >
          <video
            ref={introVideoRef}
            className="site-intro__video"
            src="/hero-preloader.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>

        <div className="hero-reveal flex w-full flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="font-satoshi text-4xl font-black tracking-tight text-white md:text-6xl md:leading-[1.02]">
              AI Health App for{' '}
              <span className="bg-gradient-to-br from-[#B7F46B] to-[#6DAE2C] bg-clip-text text-transparent">
                Nutrition, Fitness & Wellness
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
              Track meals, calories, hydration, workouts, and progress analytics in one intelligent mobile platform.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a
              href="#download"
              className="button-primary gap-2 px-7 py-3.5 text-sm font-bold"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.18 1.27-2.16 3.8.03 2.99 2.63 3.99 2.66 4.01z" />
                <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a
              href="#download"
              className="button-secondary gap-2 px-7 py-3.5 text-sm font-bold"
            >
              Google Play
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease }}
            className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 md:flex md:items-center md:gap-10 md:divide-x md:divide-white/8"
          >
            {STATS.map((s, i) => (
              <div key={i} className={`${i > 0 ? 'md:pl-10' : ''} text-center`}>
                <div className="font-satoshi text-2xl font-black text-white md:text-3xl">{s.value}</div>
                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-white/35">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        </motion.div>
      </div>

      {/* Bottom fade into ambient background */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-64 bg-gradient-to-b from-transparent via-[#050505]/40 to-transparent" />
    </section>
  );
}
