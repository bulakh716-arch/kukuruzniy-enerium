'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Derive scrolled state from the same MotionValue — no second scroll listener
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrolled(v > 0.005);
  });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #B7F46B, #6DAE2C)',
        }}
      />
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 border-b md:backdrop-blur-xl will-change-transform transition-[background-color,border-color,padding] duration-500 ${
          scrolled
            ? 'py-3 bg-void/95 md:bg-void/70 border-white/[0.04]'
            : 'py-5 bg-transparent border-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <img
                src="/logo.png"
                alt="Enerium"
                className="w-full h-full object-contain invert mix-blend-screen transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(183,244,107,0.5)]"
              />
            </div>
            <span className="text-xl font-satoshi font-bold tracking-tight">
              Enerium
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-void-800 hover:text-white transition-colors duration-300 font-inter"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#download"
              className="button-primary hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold font-inter"
            >
              Get Started
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-px bg-white transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`w-5 h-px bg-white transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-satoshi font-bold text-white hover:text-enerium-300 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#download"
                className="button-primary mt-4 px-8 py-3 text-lg font-bold"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
