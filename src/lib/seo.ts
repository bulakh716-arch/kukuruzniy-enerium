import type { Metadata } from 'next';
import { BRAND, CONTACT_EMAILS, ECOSYSTEM_PILLARS } from '@/lib/constants';

export const SITE_URL = 'https://enerium.app';
export const SITE_NAME = BRAND.name;
export const HOME_TITLE = 'Enerium | AI Health App for Nutrition, Fitness & Wellness';
export const DEFAULT_DESCRIPTION =
  'AI-powered health app for nutrition tracking, meal planning, hydration reminders, fitness syncing, and wellness analytics in one platform.';
export const DEFAULT_KEYWORDS = [
  'ai health app',
  'nutrition tracker app',
  'meal planning app',
  'calorie tracker',
  'hydration tracker',
  'fitness tracking app',
  'wellness app',
  'ai meal planner',
  'food recognition app',
  'health analytics app',
  'Enerium',
];
export const OG_IMAGE_URL = '/opengraph-image';
export const TWITTER_IMAGE_URL = '/twitter-image';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function absoluteUrl(path: string = '/') {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = DEFAULT_KEYWORDS,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteUrl(OG_IMAGE_URL),
          width: 1200,
          height: 630,
          alt: BRAND.tagline,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(TWITTER_IMAGE_URL)],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: DEFAULT_DESCRIPTION,
  manifest: '/manifest.webmanifest',
  keywords: DEFAULT_KEYWORDS,
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Health & Fitness',
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteUrl(OG_IMAGE_URL),
        width: 1200,
        height: 630,
        alt: BRAND.tagline,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(TWITTER_IMAGE_URL)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const siteStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/logo.png'),
    description: DEFAULT_DESCRIPTION,
    email: CONTACT_EMAILS.general,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: CONTACT_EMAILS.general,
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'privacy support',
        email: CONTACT_EMAILS.privacy,
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'legal support',
        email: CONTACT_EMAILS.legal,
        availableLanguage: ['en'],
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en-US',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, Android',
    description: DEFAULT_DESCRIPTION,
    featureList: ECOSYSTEM_PILLARS.map((pillar) => pillar.title),
  },
];

export const homepageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: HOME_TITLE,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  },
};