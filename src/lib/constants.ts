export const BRAND = {
  name: 'Enerium',
  tagline: 'Your Health, Reimagined by AI',
  description:
    'One intelligent platform that unifies nutrition, fitness, and wellness — powered by artificial intelligence that truly understands you.',
  colors: {
    accent: '#B7F46B',
    accentDark: '#6DAE2C',
    bg: '#050505',
    surface: '#0A0A0A',
    card: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.06)',
  },
} as const;

export const CONTACT_EMAILS = {
  general: 'hello@enerium.app',
  privacy: 'privacy@enerium.app',
  legal: 'legal@enerium.app',
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'AI', href: '#ai' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Download', href: '#download' },
] as const;

export const STATS = [
  { value: '60+', label: 'Powerful Features' },
  { value: '5', label: 'Health Dimensions' },
  { value: 'AI', label: 'Powered Intelligence' },
  { value: '24/7', label: 'Smart Insights' },
] as const;

export const ECOSYSTEM_PILLARS = [
  {
    id: 'nutrition',
    icon: 'nutrition',
    title: 'Nutrition Intelligence',
    description:
      'Track every calorie and macro with precision. AI-powered food recognition analyzes your meals instantly from a single photo.',
    accent: '#B7F46B',
    metrics: ['Calories', 'Protein', 'Fats', 'Carbs'],
  },
  {
    id: 'fitness',
    icon: 'fitness',
    title: 'Fitness & Activity',
    description:
      'Steps, workouts, runs, training videos, and multi-week marathon programs. Synced with Apple Health and Google Fit.',
    accent: '#69F0AE',
    metrics: ['Steps', 'Workouts', 'Distance', 'Active Min'],
  },
  {
    id: 'hydration',
    icon: 'hydration',
    title: 'Smart Hydration',
    description:
      'Intelligent water tracking with adaptive reminders that escalate based on urgency. Never forget to hydrate.',
    accent: '#82AFFF',
    metrics: ['Daily Goal', 'Intake', 'Reminders', 'History'],
  },
  {
    id: 'kitchen',
    icon: 'kitchen',
    title: 'AI Kitchen',
    description:
      'Smart fridge inventory, AI recipe suggestions from your ingredients, automatic meal planning, and shopping lists.',
    accent: '#FF9600',
    metrics: ['Recipes', 'Ingredients', 'Meal Plans', 'Shopping'],
  },
  {
    id: 'analytics',
    icon: 'analytics',
    title: 'Deep Analytics',
    description:
      'Comprehensive progress tracking with custom date ranges, trend analysis, body metrics, and exportable insights.',
    accent: '#F67070',
    metrics: ['Weight', 'BMI', 'Trends', 'Reports'],
  },
] as const;

export const AI_FEATURES = [
  {
    title: 'Vision AI',
    subtitle: 'See. Recognize. Calculate.',
    description:
      'Point your camera at any food. Our computer vision instantly identifies ingredients, matches them against our nutrition database, and calculates precise macro breakdown — protein, fats, carbs, calories.',
    visual: 'scan',
  },
  {
    title: 'Smart Meal Planning',
    subtitle: 'A week of meals. One tap.',
    description:
      'AI generates a complete weekly meal plan tailored to your calorie goals, dietary preferences, and the ingredients you already have at home. Every plan comes with a ready shopping list.',
    visual: 'plan',
  },
  {
    title: 'Adaptive Intelligence',
    subtitle: 'It learns. It evolves.',
    description:
      'The more you use Enerium, the smarter it gets. Personalized recommendations, smarter reminders, and increasingly accurate suggestions that evolve with your lifestyle.',
    visual: 'adapt',
  },
] as const;

export const MORE_FEATURES = [
  {
    title: 'Smart Reminders',
    description: 'Context-aware notifications for water, meals, and workouts with escalating urgency levels.',
    icon: '🔔',
  },
  {
    title: 'iOS Widgets',
    description: 'Activity rings, water intake, calorie progress — all on your home and lock screen.',
    icon: '📱',
  },
  {
    title: 'Body Metrics',
    description: 'Track weight, height, BMI, and body fat percentage with historical charts.',
    icon: '📊',
  },
  {
    title: 'Training Videos',
    description: '100+ professional workout videos including cardio, strength, flexibility, and sports.',
    icon: '🎬',
  },
  {
    title: 'Marathon Programs',
    description: 'Multi-week structured programs with daily progression and guided workouts.',
    icon: '🏆',
  },
  {
    title: 'Health API Sync',
    description: 'Deep integration with Apple HealthKit and Google Fit for automatic data sync.',
    icon: '♥️',
  },
  {
    title: 'Challenges',
    description: 'Participate in active fitness challenges with community progress tracking and achievements.',
    icon: '⚡',
  },
  {
    title: 'Gamified Onboarding',
    description: 'Interactive Star Map tutorial with themed worlds that guide you through every feature.',
    icon: '🌟',
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: 'Is Enerium free to use?',
    a: 'Enerium offers a free tier with core features including calorie tracking, water reminders, and step counting. Premium unlocks AI meal planning, Vision AI food scanning, smart fridge management, and advanced analytics.',
  },
  {
    q: 'How does Vision AI food recognition work?',
    a: 'Simply point your camera at any meal or food item. Our computer vision model identifies ingredients in real-time, matches them against our nutrition database of 900,000+ foods, and calculates precise macros — protein, fats, carbs, and calories.',
  },
  {
    q: 'Does Enerium sync with Apple Health and Google Fit?',
    a: 'Yes. Enerium deeply integrates with Apple HealthKit and Google Fit. Steps, workouts, active minutes, and body metrics sync automatically in both directions.',
  },
  {
    q: 'Can I use Enerium for meal planning?',
    a: 'Absolutely. Our AI generates a complete weekly meal plan tailored to your calorie goals, dietary preferences, and the ingredients you already have at home. Each plan includes a ready-to-use shopping list.',
  },
  {
    q: 'What is the Smart Fridge feature?',
    a: 'Smart Fridge lets you manage a virtual inventory of your real fridge and pantry. The AI then suggests recipes based on what you have, helping you reduce food waste and eat better without extra shopping.',
  },
  {
    q: 'Is my health data private and secure?',
    a: 'Your privacy is our top priority. All health data is encrypted end-to-end and stored securely. We never sell your data to third parties. You can export or delete your data at any time.',
  },
] as const;

export const FRIDGE_STEPS = [
  {
    step: '01',
    title: 'Add Your Ingredients',
    description: 'Tell Enerium what\'s in your fridge and cabinets. Visual inventory management.',
  },
  {
    step: '02',
    title: 'Get Smart Recipes',
    description: 'AI suggests recipes based on exactly what you have. No wasted food.',
  },
  {
    step: '03',
    title: 'Plan Your Week',
    description: 'Auto-generate a complete meal plan with balanced nutrition across every day.',
  },
  {
    step: '04',
    title: 'Shopping List',
    description: 'Missing ingredients? Automatic shopping list generated for everything you need.',
  },
] as const;
