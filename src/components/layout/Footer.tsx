'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_EMAILS } from '@/lib/constants';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'AI Intelligence', href: '#ai' },
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Download', href: '#download' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-[#B7F46B]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8">
                <img
                  src="/logo.png"
                  alt="Enerium"
                  className="w-full h-full object-contain invert mix-blend-screen"
                />
              </div>
              <span className="text-lg font-satoshi font-bold text-white">Enerium</span>
            </div>
            <p className="text-sm text-white/40 font-inter leading-relaxed max-w-xs mb-6">
              The AI-powered health ecosystem that unifies nutrition, fitness,
              and wellness into one intelligent platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="rounded-full border border-white/[0.08] px-4 py-2 text-sm text-white/70 transition-colors hover:border-[#B7F46B]/30 hover:text-white"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#B7F46B]/20 bg-[#B7F46B]/8 px-4 py-2 text-sm text-[#B7F46B] transition-colors hover:bg-[#B7F46B]/14"
              >
                Contact
              </Link>
            </div>
            <a
              href={`mailto:${CONTACT_EMAILS.general}`}
              className="mt-5 inline-flex text-sm text-white/45 transition-colors hover:text-white"
            >
              {CONTACT_EMAILS.general}
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-2">
              <h4 className="text-xs font-inter font-semibold uppercase tracking-wider text-white/50 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-white transition-colors duration-300 font-inter"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-inter font-semibold uppercase tracking-wider text-white/50 mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-white/35 font-inter mb-4">
              Get the latest updates on new features and health tips.
            </p>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 rounded-xl border border-[#B7F46B]/20 bg-[#B7F46B]/5 px-4 py-3"
                >
                  <svg className="w-4 h-4 text-[#B7F46B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-[#B7F46B] font-medium">Subscribed!</span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleNewsletterSubmit}
                  className="flex"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="flex-1 px-3 py-2 rounded-l-xl border border-white/[0.06] bg-white/[0.02] text-sm font-inter text-white placeholder:text-white/25 outline-none focus:border-[#B7F46B]/30 transition-colors min-w-0"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-r-xl bg-[#B7F46B] text-[#050505] font-inter font-semibold text-sm hover:bg-[#caf598] transition-colors"
                  >
                    →
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 font-inter">
            © {new Date().getFullYear()} Enerium. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/25 font-inter">
            <span>Crafted with</span>
            <span className="text-[#B7F46B]">♥</span>
            <span>for your health</span>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#B7F46B]/20 to-transparent" />
    </footer>
  );
}
