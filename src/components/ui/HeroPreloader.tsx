'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

const overlayEase = [0.22, 1, 0.36, 1] as const;
const FALLBACK_MS = 9000;
const EXIT_MS = 900;
// How many seconds before the video ends the exit fade should start.
const FADE_BEFORE_END_S = 0.9;
// Absolute time (in seconds, from the start of the video) when the iPhone frame begins to appear.
// Increase to make it appear later, decrease to make it appear earlier.
const FRAME_REVEAL_AT_S = 3;
// How long the frame reveal animation lasts (border + corners + shadow).
const FRAME_REVEAL_DURATION_S = 0.8;

export default function HeroPreloader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<'playing' | 'exiting' | 'done'>('playing');
  const [frameVisible, setFrameVisible] = useState(false);

  const startExit = useCallback(() => {
    setPhase((current) => {
      if (current !== 'playing') return current;

      document.body.classList.add('site-preload-ready');
      // Release scroll lock as soon as the intro starts fading out
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      exitTimerRef.current = window.setTimeout(() => {
        setPhase('done');
      }, EXIT_MS);

      return 'exiting';
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.remove('site-preload-ready');

    // Don't let the browser restore previous scroll position during intro
    const previousScrollRestoration = window.history.scrollRestoration;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Lock the page at the top while intro is playing
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if (prefersReducedMotion) {
      startExit();
    } else {
      fallbackTimerRef.current = window.setTimeout(() => {
        startExit();
      }, FALLBACK_MS);
    }

    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
      document.body.classList.add('site-preload-ready');
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, [startExit]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      if (video.currentTime >= FRAME_REVEAL_AT_S) {
        setFrameVisible(true);
      }
      if (video.duration - video.currentTime <= FADE_BEFORE_END_S) {
        startExit();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    void video.play().catch(() => {});

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [startExit]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="site-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
          transition={{ duration: EXIT_MS / 1000, ease: overlayEase }}
          aria-hidden="true"
        >
          <div className={`site-intro__video-shell${frameVisible ? ' is-framed' : ''}`}
            style={{ ['--frame-reveal-duration' as string]: `${FRAME_REVEAL_DURATION_S}s` }}
          >
            <video
              ref={videoRef}
              className="site-intro__video"
              src="/hero-preloader.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={startExit}
              onError={startExit}
            />
            <div className="site-intro__video-mask" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
