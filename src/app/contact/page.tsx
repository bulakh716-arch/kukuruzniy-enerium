import type { Metadata } from 'next';
import BackToHomeLink from '@/components/ui/BackToHomeLink';
import { CONTACT_EMAILS } from '@/lib/constants';
import { SITE_NAME, SITE_URL, absoluteUrl, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Enerium | Support, Privacy and Legal',
  description:
    'Contact Enerium for support, partnership requests, privacy questions, and legal inquiries related to the AI health platform and website.',
  path: '/contact',
  keywords: ['contact Enerium', 'Enerium support', 'Enerium privacy contact', 'Enerium legal contact'],
});

const contactCards = [
  {
    title: 'General Support',
    email: CONTACT_EMAILS.general,
    description: 'Product questions, partnerships, waitlist requests, and general support.',
  },
  {
    title: 'Privacy Requests',
    email: CONTACT_EMAILS.privacy,
    description: 'Data access, deletion, export requests, and privacy-related questions.',
  },
  {
    title: 'Legal and Compliance',
    email: CONTACT_EMAILS.legal,
    description: 'Terms, legal notices, compliance, and policy-related communication.',
  },
] as const;

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Enerium',
    url: absoluteUrl('/contact'),
    description:
      'Contact Enerium for support, partnership requests, privacy questions, and legal inquiries related to the AI health platform and website.',
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAILS.general,
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
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B7F46B]">Contact</p>
          <h1 className="mt-4 font-satoshi text-4xl font-black tracking-tight text-white md:text-6xl">
            Talk to the Enerium team.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60">
            Use the right contact channel below for product support, privacy requests, or legal and compliance questions.
          </p>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {contactCards.map((card) => (
            <article key={card.email} className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
              <h2 className="font-satoshi text-2xl font-bold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{card.description}</p>
              <a
                href={`mailto:${card.email}`}
                className="mt-5 inline-flex items-center rounded-full border border-[#B7F46B]/20 bg-[#B7F46B]/8 px-4 py-2 text-sm text-[#B7F46B] transition-colors hover:bg-[#B7F46B]/14"
              >
                {card.email}
              </a>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8">
          <h2 className="font-satoshi text-3xl font-black text-white">Useful links</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/about" className="rounded-full border border-white/[0.08] px-5 py-3 text-sm text-white/70 transition-colors hover:border-[#B7F46B]/30 hover:text-white">
              About Enerium
            </a>
            <a href="/privacy" className="rounded-full border border-white/[0.08] px-5 py-3 text-sm text-white/70 transition-colors hover:border-[#B7F46B]/30 hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="rounded-full border border-white/[0.08] px-5 py-3 text-sm text-white/70 transition-colors hover:border-[#B7F46B]/30 hover:text-white">
              Terms of Service
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}