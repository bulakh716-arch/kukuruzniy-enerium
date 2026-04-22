import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import FloatingEmojis from '@/components/ui/FloatingEmojis';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { FAQ_ITEMS, ECOSYSTEM_PILLARS } from '@/lib/constants';
import { homepageStructuredData } from '@/lib/seo';

const PlateBalanceSection = dynamic(() => import('@/components/sections/PlateBalanceSection'), { ssr: false });
const AISuperSection = dynamic(() => import('@/components/sections/AISuperSection'));
const EcosystemSection = dynamic(() => import('@/components/sections/EcosystemSection'));
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'));
const CTASection = dynamic(() => import('@/components/sections/CTASection'));

export default function Home() {
  const structuredData = [
    homepageStructuredData,
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Enerium App Features',
      description: 'Five health dimensions powered by AI in the Enerium app',
      itemListElement: ECOSYSTEM_PILLARS.map((pillar, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: pillar.title,
        description: pillar.description,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': structuredData,
          }),
        }}
      />
      <main className="relative min-h-[100svh] overflow-x-hidden text-white">
        <FloatingEmojis />
        <Navigation />
        <HeroSection />

        <SectionDivider variant="orb" color="#B7F46B" />
        <PlateBalanceSection />

        <SectionDivider variant="gradient" color="#B7F46B" />
        <AISuperSection />

        <SectionDivider variant="dots" color="#82AFFF" />
        <EcosystemSection />

        <SectionDivider variant="gradient" color="#B7F46B" />
        <CTASection />

        <SectionDivider variant="dots" color="#B7F46B" />
        <FAQSection />

        <Footer />
      </main>
    </>
  );
}
