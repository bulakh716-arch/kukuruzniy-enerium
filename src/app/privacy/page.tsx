import type { Metadata } from 'next';
import BackToHomeLink from '@/components/ui/BackToHomeLink';
import { CONTACT_EMAILS } from '@/lib/constants';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy | Enerium',
  description:
    'Read how Enerium collects, protects, stores, and processes health, nutrition, fitness, and analytics data across the app and website.',
  path: '/privacy',
  keywords: ['Enerium privacy policy', 'health app privacy', 'nutrition app privacy', 'fitness data policy'],
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <BackToHomeLink />
        <h1 className="font-satoshi text-4xl font-black text-white md:text-5xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/30">Last updated: April 2026</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-white/60">
          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">1. Information We Collect</h2>
            <p>We collect information you provide directly: account details (email, name), health data (nutrition logs, fitness activity, body metrics), and usage data. We also collect device information and analytics to improve the service.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">2. How We Use Your Data</h2>
            <p>Your data is used to provide personalized health recommendations, power AI features (Vision AI, meal planning, adaptive intelligence), sync with health platforms (Apple Health, Google Fit), and improve our service quality.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">3. Data Storage & Security</h2>
            <p>All health data is encrypted end-to-end using industry-standard AES-256 encryption. Data is stored on secure servers with strict access controls. We conduct regular security audits and penetration testing.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">4. Data Sharing</h2>
            <p>We do not sell, rent, or trade your personal health data to third parties. Data may be shared only with your explicit consent, or when required by law. Third-party integrations (Apple Health, Google Fit) operate under their respective privacy policies.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">5. AI & Machine Learning</h2>
            <p>Our AI models process your data on-device when possible. When cloud processing is needed, data is anonymized and encrypted in transit. AI models are not trained on individual user data without explicit opt-in consent.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">6. Your Rights</h2>
            <p>You have the right to: access your data, correct inaccurate data, delete your account and all associated data, export your data in standard formats, and opt out of non-essential data processing. Contact us to exercise any of these rights.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">7. Cookies & Tracking</h2>
            <p>Our website uses essential cookies for functionality. We use privacy-respecting analytics to understand usage patterns. You can control cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="mb-3 font-satoshi text-lg font-bold text-white">8. Contact</h2>
            <p>For privacy-related questions or data requests, contact our Data Protection team at <span className="text-[#B7F46B]">{CONTACT_EMAILS.privacy}</span></p>
          </section>
        </div>
      </div>
    </main>
  );
}
