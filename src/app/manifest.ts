import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Enerium',
    short_name: 'Enerium',
    description:
      'AI-powered health app for nutrition tracking, meal planning, hydration reminders, fitness syncing, and wellness analytics in one platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
    categories: ['health', 'fitness', 'lifestyle'],
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}