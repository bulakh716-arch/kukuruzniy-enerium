import type { Metadata } from 'next';
import BackToHomeLink from '@/components/ui/BackToHomeLink';
import { CONTACT_EMAILS } from '@/lib/constants';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Terms of Service | Enerium',
  description:
    'Review the legal terms for using Enerium, including subscriptions, acceptable use, health disclaimers, and account responsibilities.',
  path: '/terms',
  keywords: ['Enerium terms of service', 'health app terms', 'fitness app legal terms', 'subscription terms'],
});

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <BackToHomeLink />
        <h1 className="font-satoshi text-4xl font-black text-white md:text-5xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-white/30">Last updated: April 2026</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-white/60">
          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>By accessing or using the Enerium application and website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">2. Description of Service</h2>
            <p>Enerium is an AI-powered health ecosystem that provides nutrition tracking, fitness monitoring, hydration management, smart kitchen tools, and analytics. The service is available through our mobile application and website.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information when creating an account. You are responsible for all activity that occurs under your account.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">4. Health Disclaimer</h2>
            <p>Enerium provides health-related information for educational purposes only. Our AI recommendations are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before making changes to your diet or exercise routine.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">5. Subscriptions & Payments</h2>
            <p>Premium features require a paid subscription. Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current billing period. Prices are subject to change with reasonable notice.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">6. Intellectual Property</h2>
            <p>All content, features, and functionality of Enerium — including text, graphics, logos, icons, images, and software — are the exclusive property of Enerium and are protected by intellectual property laws.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">7. Limitation of Liability</h2>
            <p>Enerium shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">8. Contact</h2>
            <p>For questions about these Terms, please contact us at <span className="text-[#B7F46B]">{CONTACT_EMAILS.legal}</span></p>
          </section>
        </div>
      </div>
    </main>
  );
}
