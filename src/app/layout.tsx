import type { Metadata, Viewport } from 'next';
import AmbientBackground from '@/components/ui/AmbientBackground';
import SiteParticles from '@/components/ui/SiteParticles';
import { rootMetadata, siteStructuredData } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        {/* DNS preconnect for external font CDNs — eliminates connection setup latency */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Plausible Analytics — privacy-friendly, no cookies, GDPR compliant */}
        {/* Replace enerium.app with your actual domain when deploying */}
        <script defer data-domain="enerium.app" src="https://plausible.io/js/script.js" />
      </head>
      <body className="bg-void font-inter text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': siteStructuredData,
            }),
          }}
        />
        <AmbientBackground />
        <SiteParticles />
        {children}
      </body>
    </html>
  );
}
