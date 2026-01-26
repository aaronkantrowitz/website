// Define discriminated union type for slides
export type IntroSlide = {
  type: 'intro';
  id: string;
  title: string;
  description: string;
};
export type ProjectSlide = {
  type: 'project';
  id: string;
  company: string;
  role?: string;
  description?: string;
};
export type OrganizationSlide = {
  type: 'organization';
  id: string;
  company: string;
  role?: string;
  description?: string;
};
export type ArticleSlide = {
  type: 'article';
  id: string;
  title: string;
  link: string;
  coverImage?: string;
};
export type Slide =
  | IntroSlide
  | ProjectSlide
  | OrganizationSlide
  | ArticleSlide;

const companies = [
  'Southtree',
  'Barnett Outdoors',
  'Legacybox',
  'Salted Baked Goods',
  'Kodak Digitizing',
  'Shinery Wholesale',
  'Crewcab Society',
  'NOMAD Outdoor',
  'Huk Gear',
  'Spiritú',
  'HYGEAR',
  'AVID Sportswear',
  'Eberjey',
  'Static-X',
  'Roxrite Represents',
  'The Clear Cut',
  'Claralips',
  'Jessica Simpson',
  'Ghurka',
  'Bitchin Hearts',
  'Lost Symphony',
  'Kopari Beauty',
  'MVMT Watches',
  'P&G',
  'Rebecca Minkoff',
  'Kylie Cosmetics',
  'Daya by Zendaya',
  'Sio Beauty',
  'Lash Star Beauty',
  'UTZ Snacks',
  'Navitas Organics',
  'SkinTe',
  'The D Hotel Las Vegas',
  'Aria Resort & Casino',
  'National Pen',
  'SoClean',
  'Barona Resort & Casino',
  'Health Net',
  'Thermo Fisher Scientific',
  'AutoZone',
  'Home Depot',
  'Accumen',
  'Spacebox Digital',
  'CapCheck',
  'Akantro',
  'REQ',
  'BVA',
];

// Blog post slides (simple, hardcoded)
const articleSlides: ArticleSlide[] = [
  {
    type: 'article',
    id: 'section-blog-01',
    title: 'On the Path to Mastery',
    link: 'https://aaronkantrowitz.hashnode.dev/on-the-path-to-mastery',
  },
  {
    type: 'article',
    id: 'section-blog-04',
    title: 'Being the Best You That You Can Be',
    link: 'https://aaronkantrowitz.hashnode.dev/being-the-best-you-that-you-can-be',
  },
];

// Role and description mapping for companies
const companyRoles: Record<string, { role: string; description: string }> = {
  Southtree: {
    role: 'Lead Developer',
    description:
      'Transformed a traditional media company into a digital powerhouse, architected systems that processed millions of family memories.',
  },
  'Barnett Outdoors': {
    role: 'Lead Developer',
    description:
      'Built rugged e-commerce infrastructure matching the durability of their crossbows and outdoor gear.',
  },
  Legacybox: {
    role: 'Lead Developer',
    description:
      "Engineered scalable solutions handling 100K+ monthly orders for America's largest home movie digitization service.",
  },
  'Salted Baked Goods': {
    role: 'Lead Developer',
    description:
      'Crafted artisanal digital experiences as carefully as their cookies, focusing on mobile-first commerce.',
  },
  'Kodak Digitizing': {
    role: 'Lead Developer',
    description:
      "Modernized a 130-year-old brand's digital presence while preserving its iconic heritage and trust.",
  },
  'Shinery Wholesale': {
    role: 'Lead Developer',
    description:
      'Polished B2B wholesale platforms to sparkle as brilliantly as the jewelry they maintain.',
  },
  'Crewcab Society': {
    role: 'Lead Developer',
    description:
      'United truck enthusiasts through custom community platforms and member-exclusive commerce features.',
  },
  'NOMAD Outdoor': {
    role: 'Lead Developer',
    description:
      'Tracked down performance bottlenecks like a hunter, optimizing load times for field-tested gear.',
  },
  'Huk Gear': {
    role: 'Lead Developer',
    description:
      'Cast a wider net with omni-channel integration, hooking customers across web, mobile, and retail.',
  },
  Spiritú: {
    role: 'Lead Developer',
    description:
      'Bridged cultural connections through multilingual commerce supporting Latin American payment methods.',
  },
  HYGEAR: {
    role: 'Lead Developer',
    description:
      'Synchronized IoT fitness equipment with mobile apps, pushing real-time workout data to the cloud.',
  },
  'AVID Sportswear': {
    role: 'Lead Developer',
    description:
      "Accelerated page speeds by 300%, because athletes shouldn't wait for their gear.",
  },
  Eberjey: {
    role: 'Lead Developer',
    description:
      'Wove delicate user experiences matching the softness of their signature PJs and intimates.',
  },
  'Static-X': {
    role: 'Lead Developer',
    description:
      'Amplified fan engagement through interactive tour maps and exclusive content portals.',
  },
  'Roxrite Represents (Red Bull)': {
    role: 'Lead Developer',
    description:
      "Choreographed dynamic content delivery for a 3x world champion Red Bull break dancer's global workshops.",
  },
  'The Clear Cut': {
    role: 'Lead Developer',
    description:
      'Cut through traditional jewelry retail with transparent pricing algorithms and virtual try-on tech.',
  },
  Claralips: {
    role: 'Lead Developer',
    description:
      'Formulated subscription logic as precisely as their clean beauty ingredients.',
  },
  'Jessica Simpson': {
    role: 'Lead Developer',
    description:
      'Styled responsive layouts handling celebrity-level traffic spikes during product launches.',
  },
  Ghurka: {
    role: 'Lead Developer',
    description:
      'Hand-crafted digital experiences worthy of their $3,000 leather bags, with pixel-perfect attention.',
  },
  'Bitchin Hearts': {
    role: 'Lead Developer',
    description:
      'Rebelliously broke e-commerce conventions with experimental checkout flows that actually converted.',
  },
  'Lost Symphony': {
    role: 'Lead Developer',
    description:
      'Orchestrated streaming platforms blending classical compositions with metal intensity.',
  },
  'Kopari Beauty': {
    role: 'Technical Project Lead',
    description:
      'Coconut-powered everything, including the tropical-smooth checkout flow that increased conversions.',
  },
  'MVMT Watches': {
    role: 'Technical Project Lead',
    description:
      'Engineered influencer-driven commerce platforms that moved 1.5 million watches without a single retail store.',
  },
  'P&G': {
    role: 'Technical Project Lead',
    description:
      'Scaled solutions for sub-startup, supporting 65 billion-dollar brands simultaneously.',
  },
  'Rebecca Minkoff': {
    role: 'Technical Project Lead',
    description:
      'Migrated luxury fashion brand from Magento to Shopify Plus, with a best-in-class experience that still holds up to this day.',
  },
  'Kylie Cosmetics': {
    role: 'Technical Project Lead',
    description:
      'Handled viral product drops with infrastructure surviving 100K concurrent users in first minutes.',
  },
  'Daya by Zendaya': {
    role: 'Technical Project Lead',
    description:
      'Sized up inclusive fashion tech, building adaptive interfaces for all body types and abilities.',
  },
  'Sio Beauty': {
    role: 'Technical Project Lead',
    description:
      'Patched together medical-grade e-commerce requiring FDA compliance and HIPAA considerations.',
  },
  'Lash Star Beauty': {
    role: 'Technical Project Lead',
    description:
      'Extended platform capabilities with AR try-on features for lash and brow products.',
  },
  'UTZ Snacks': {
    role: 'Technical Project Lead',
    description:
      'Crunched big data to optimize supply chain from Pennsylvania factories to nationwide shelves.',
  },
  'Navitas Organics': {
    role: 'Technical Project Lead',
    description:
      'Cultivated organic growth through SEO-optimized content systems and recipe databases.',
  },
  SkinTe: {
    role: 'Technical Project Lead',
    description:
      'Infused wellness tech with subscription intelligence predicting customer reorder patterns.',
  },
  'The D Hotel Las Vegas': {
    role: 'Technical Project Lead',
    description:
      'Rolled out reservation systems handling high-stakes bookings and VIP player tracking.',
  },
  'Aria Resort & Casino': {
    role: 'Technical Project Lead',
    description:
      'Bet on microservices architecture supporting everything from room bookings to poker tournaments.',
  },
  'National Pen': {
    role: 'Technical Project Lead',
    description:
      'Personalized mass customization engines processing 50,000 daily promotional product orders.',
  },
  SoClean: {
    role: 'Technical Project Lead',
    description:
      'Breathed life into IoT-connected CPAP cleaners with remote diagnostics and usage analytics.',
  },
  'Barona Resort & Casino': {
    role: 'Technical Project Lead',
    description:
      'Dealt winning hands with real-time gaming analytics and responsible gambling features.',
  },
  'Health Net': {
    role: 'Technical Project Lead',
    description:
      'Prescribed HIPAA-compliant member portals serving 3 million California healthcare subscribers.',
  },
  'Thermo Fisher Scientific': {
    role: 'Business & Systems Analyst',
    description:
      "Catalyzed $40B scientific instrument giant's digital transformation with enterprise IAM and systems integration.",
  },
  AutoZone: {
    role: 'Technical Project Lead / Business Systems Analyst',
    description:
      'Turbocharged inventory systems connecting 6,000 stores with same-day parts availability.',
  },
  'Home Depot': {
    role: 'Senior IT Business Systems Analyst',
    description:
      'Hammered out SAP implementations while building bridges between 400,000 associates and HQ systems.',
  },
  Accumen: {
    role: 'UI/UX Engineer & Systems Analyst',
    description:
      'Diagnosed healthcare workflow inefficiencies, prescribing agile MVPs that reduced claim processing 60%.',
  },
  'Spacebox Digital': {
    role: 'Chief Technology Officer',
    description:
      'Pioneered AI-augmented development workflows and processes, shipping products 3x faster with smaller teams.',
  },
  CapCheck: {
    role: 'Founder',
    description:
      'Currently building the future of fact-checking with CapCheck, a platform that verifies content like Shazam identifies songs.',
  },
  Akantro: {
    role: 'Co-Founder',
    description:
      'Bootstrapped to profitable exit, scaling from solo consultant to 8-person team generating mid-six figures.',
  },
  REQ: {
    role: 'Head of Development',
    description:
      'Quarterbacked 6 engineers delivering enterprise solutions for brands doing $100M+ in annual revenue.',
  },
  BVA: {
    role: 'Head of Technical Project Management',
    description:
      'Orchestrated 50+ engineers across 8 teams, shipping $10M+ in contracted projects on time and under budget.',
  },
};

const organizationCompanies = [
  'Spacebox Digital',
  'CapCheck',
  'Akantro',
  'REQ',
  'BVA',
  'Thermo Fisher Scientific',
  'The Home Depot',
  'Accumen',
];

// Slide data structure
export const slides: Slide[] = [
  {
    type: 'intro',
    id: 'section-01',
    title: 'My Work',
    description: `AI-powered applications from architecture to deployment.

Currently building CapCheck AI, a multi-agent fact verification system using LangGraph, Claude, and Perplexity.

15 years shipping production software. 100+ Fortune 500 implementations.`,
  },
  ...companies.map((company, index) => {
    const roleData = companyRoles[company] || { role: '', description: '' };
    if (organizationCompanies.includes(company)) {
      return {
        type: 'organization' as const,
        id: `section-${String(index + 2).padStart(2, '0')}`,
        company,
        role: roleData.role,
        description: roleData.description,
      } as OrganizationSlide;
    }
    return {
      type: 'project' as const,
      id: `section-${String(index + 2).padStart(2, '0')}`,
      company,
      role: roleData.role,
      description: roleData.description,
    } as ProjectSlide;
  }),
  ...articleSlides,
];

// Export a function to get the sorted slides (intro + sorted rest)
export function getSortedSlides(): Slide[] {
  const intro = slides.find((s) => s.type === 'intro') as IntroSlide;
  const rest = slides
    .filter((s) => s.type !== 'intro')
    .sort((a, b) => {
      let aKey = '';
      let bKey = '';
      if (a.type === 'project' || a.type === 'organization')
        aKey = (a as ProjectSlide | OrganizationSlide).company;
      else if (a.type === 'article') aKey = (a as ArticleSlide).title;
      if (b.type === 'project' || b.type === 'organization')
        bKey = (b as ProjectSlide | OrganizationSlide).company;
      else if (b.type === 'article') bKey = (b as ArticleSlide).title;
      return aKey.localeCompare(bKey);
    });
  return [intro, ...rest];
}
