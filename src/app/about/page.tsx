import type { Metadata } from 'next';
import { BRAND, ECOSYSTEM_PILLARS } from '@/lib/constants';
import BackToHomeLink from '@/components/ui/BackToHomeLink';
import { SITE_NAME, SITE_URL, absoluteUrl, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About Enerium | AI Health Platform',
  description:
    'Learn what Enerium is building: an AI-powered health platform that brings nutrition, fitness, hydration, smart kitchen tools, and analytics into one system.',
  path: '/about',
  keywords: ['about Enerium', 'AI health platform', 'nutrition and fitness app', 'health ecosystem'],
});

export default function AboutPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Enerium',
    url: absoluteUrl('/about'),
    description:
      'Learn what Enerium is building: an AI-powered health platform that brings nutrition, fitness, hydration, smart kitchen tools, and analytics into one system.',
    about: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      description: BRAND.description,
    },
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-24">
        <BackToHomeLink />

        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B7F46B]">About</p>
          <h1 className="mt-4 font-satoshi text-4xl font-black tracking-tight text-white md:text-6xl">
            Building one AI health system instead of five disconnected tools.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60">
            {BRAND.description} Enerium is designed for people who want a single place to track food, fitness, hydration, and long-term progress without jumping across fragmented apps.
          </p>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="font-satoshi text-2xl font-bold text-white">Why Enerium exists</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Most health apps solve one narrow problem. Enerium focuses on the whole operating system of daily health decisions.
            </p>
          </article>
          <article className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="font-satoshi text-2xl font-bold text-white">How AI helps</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              AI is used for food recognition, adaptive coaching, meal planning, and pattern detection across your health data.
            </p>
          </article>
          <article className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="font-satoshi text-2xl font-bold text-white">What users get</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              A single mobile experience for action, tracking, and insight instead of a stack of loosely connected services.
            </p>
          </article>
        </section>

        <section className="mt-16">
          <h2 className="font-satoshi text-3xl font-black text-white md:text-4xl">Core product pillars</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {ECOSYSTEM_PILLARS.map((pillar) => (
              <article key={pillar.id} className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: pillar.accent }}>
                  {pillar.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8">
          <h2 className="font-satoshi text-3xl font-black text-white">Trust and transparency</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">
            Because Enerium operates in the health space, privacy, legal clarity, and product transparency matter. Review our policies or contact the team directly if you need more information.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/privacy" className="rounded-full border border-white/[0.08] px-5 py-3 text-sm text-white/70 transition-colors hover:border-[#B7F46B]/30 hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="rounded-full border border-white/[0.08] px-5 py-3 text-sm text-white/70 transition-colors hover:border-[#B7F46B]/30 hover:text-white">
              Terms of Service
            </a>
            <a href="/contact" className="rounded-full border border-[#B7F46B]/20 bg-[#B7F46B]/8 px-5 py-3 text-sm text-[#B7F46B] transition-colors hover:bg-[#B7F46B]/14">
              Contact Enerium
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}