'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';

export default function CTASection() {
  return (
    <section id="download" className="relative flex min-h-[100svh] flex-col justify-center py-8">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-10 text-center md:p-16"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(183,244,107,0.12)_0%,transparent_65%)] blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg"
            >
              <Image src="/logo.png" alt="Enerium" width={40} height={40} className="rounded-xl" />
            </motion.div>

            <h2 className="font-satoshi text-3xl font-black tracking-tight text-white md:text-5xl">
              Ready to Transform<br />
              <span className="bg-gradient-to-br from-[#B7F46B] to-[#6DAE2C] bg-clip-text text-transparent">
                Your Health?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm text-white/40 md:text-base">
              {BRAND.description}
            </p>

            {/* Download buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?platform=ios"
                className="button-primary gap-2 px-8 py-4 text-sm font-bold"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.18 1.27-2.16 3.8.03 2.99 2.63 3.99 2.66 4.01z" />
                  <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Request iOS Access
              </Link>
              <Link
                href="/contact?platform=android"
                className="button-secondary gap-2 px-8 py-4 text-sm font-bold"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.583 1.496c.572.329.572 1.065 0 1.394l-2.583 1.496-2.54-2.54 2.54-2.846zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                Request Android Access
              </Link>
            </div>

            {/* Trial note */}
            <p className="mt-6 text-xs text-white/25">
              Free to download · Premium trial available · No credit card required
            </p>
          </div>
        </motion.div>


      </div>
    </section>
  );
}
