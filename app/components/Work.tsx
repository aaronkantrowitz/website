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
  'Nat Nast Luxury Originals',
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
  'Stealth',
  'Akantro',
  'REQ',
  'BVA',
];

// Define discriminated union type for slides
type IntroSlide = {
  type: 'intro';
  id: string;
  title: string;
  description: string;
};
type ProjectSlide = {
  type: 'project';
  id: string;
  company: string;
  role?: string;
  description?: string;
};
type OrganizationSlide = {
  type: 'organization';
  id: string;
  company: string;
  role?: string;
  description?: string;
};
type ArticleSlide = {
  type: 'article';
  id: string;
  title: string;
  link: string;
  coverImage?: string;
};
type Slide = IntroSlide | ProjectSlide | OrganizationSlide | ArticleSlide;

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
    id: 'section-blog-02',
    title: 'RIP: SEO Is Dead',
    link: 'https://aaronkantrowitz.hashnode.dev/rip-seo-is-dead',
  },
  {
    type: 'article',
    id: 'section-blog-03',
    title: '31 Goals for the Remainder of 2016 ~ 2025',
    link: 'https://aaronkantrowitz.hashnode.dev/31-goals-for-the-remainder-of-2016',
  },
  {
    type: 'article',
    id: 'section-blog-04',
    title: 'Being the Best You That You Can Be',
    link: 'https://aaronkantrowitz.hashnode.dev/being-the-best-you-that-you-can-be',
  },
  {
    type: 'article',
    id: 'section-blog-05',
    title: "I'm Disappointed in Apple Today",
    link: 'https://aaronkantrowitz.hashnode.dev/im-disappointed-in-apple-today',
  },
];

// Role and description mapping for companies
const companyRoles: Record<string, { role: string; description: string }> = {
  Southtree: {
    role: 'Lead Developer',
    description:
      'Led end-to-end development, CRO, design, and digital transformation for a leading media digitization brand.',
  },
  'Barnett Outdoors': {
    role: 'Lead Developer',
    description:
      'Oversaw web development, CRO, and design for a top outdoor sporting goods company.',
  },
  Legacybox: {
    role: 'Lead Developer',
    description:
      'Directed technical strategy, CRO, and design for a major consumer digitization service.',
  },
  'Salted Baked Goods': {
    role: 'Lead Developer',
    description:
      'Built and optimized e-commerce and digital presence for a premium baked goods brand.',
  },
  'Kodak Digitizing': {
    role: 'Lead Developer',
    description:
      "Managed development and design for Kodak's digitization platform, focusing on user experience and conversion.",
  },
  'Shinery Wholesale': {
    role: 'Lead Developer',
    description:
      'Developed wholesale e-commerce solutions and digital strategy for a luxury jewelry care brand.',
  },
  'Crewcab Society': {
    role: 'Lead Developer',
    description:
      'Created and optimized digital experiences for a lifestyle and apparel community.',
  },
  'NOMAD Outdoor': {
    role: 'Lead Developer',
    description:
      'Led web development and design for a high-performance outdoor apparel brand.',
  },
  'Huk Gear': {
    role: 'Lead Developer',
    description:
      'Oversaw digital strategy, CRO, and design for a leading fishing apparel company.',
  },
  Spiritú: {
    role: 'Lead Developer',
    description:
      'Built and optimized e-commerce and content for a multicultural lifestyle brand.',
  },
  HYGEAR: {
    role: 'Lead Developer',
    description:
      'Directed web and app development for a connected fitness technology startup.',
  },
  'AVID Sportswear': {
    role: 'Lead Developer',
    description:
      'Managed e-commerce and digital marketing for a sportswear brand.',
  },
  Eberjey: {
    role: 'Lead Developer',
    description:
      'Oversaw digital design and development for a luxury lingerie and loungewear brand.',
  },
  'Static-X': {
    role: 'Lead Developer',
    description: 'Built and managed digital presence for a renowned rock band.',
  },
  'Roxrite Represents': {
    role: 'Lead Developer',
    description:
      'Developed digital branding and content for a world-class breakdancer.',
  },
  'The Clear Cut': {
    role: 'Lead Developer',
    description:
      'Led e-commerce and digital strategy for a direct-to-consumer diamond brand.',
  },
  Claralips: {
    role: 'Lead Developer',
    description: 'Built and optimized e-commerce for a beauty startup.',
  },
  'Jessica Simpson': {
    role: 'Lead Developer',
    description:
      'Managed digital projects for a celebrity fashion and lifestyle brand.',
  },
  Ghurka: {
    role: 'Lead Developer',
    description:
      'Oversaw web development and design for a luxury leather goods company.',
  },
  'Bitchin Hearts': {
    role: 'Lead Developer',
    description: 'Created digital experiences for a boutique fashion brand.',
  },
  'Nat Nast Luxury Originals': {
    role: 'Lead Developer',
    description:
      'Directed e-commerce and digital marketing for a heritage menswear brand.',
  },
  'Lost Symphony': {
    role: 'Lead Developer',
    description: 'Managed digital presence for a symphonic metal project.',
  },
  'Kopari Beauty': {
    role: 'Technical Project Lead',
    description:
      'Led technical projects, CRO, and design for a clean beauty brand.',
  },
  'MVMT Watches': {
    role: 'Technical Project Lead',
    description:
      'Oversaw technical development and digital marketing for a direct-to-consumer watch brand.',
  },
  'P&G': {
    role: 'Technical Project Lead',
    description:
      'Directed technical projects and digital strategy for a global CPG leader.',
  },
  'Rebecca Minkoff': {
    role: 'Technical Project Lead',
    description:
      'Managed technical projects and e-commerce for a leading fashion designer.',
  },
  'Kylie Cosmetics': {
    role: 'Technical Project Lead',
    description:
      'Oversaw technical development and digital marketing for a celebrity beauty brand.',
  },
  'Daya by Zendaya': {
    role: 'Technical Project Lead',
    description:
      'Led technical projects and e-commerce for a celebrity fashion line.',
  },
  'Sio Beauty': {
    role: 'Technical Project Lead',
    description:
      'Directed technical projects and digital strategy for a skincare startup.',
  },
  'Lash Star Beauty': {
    role: 'Technical Project Lead',
    description:
      'Managed technical projects and e-commerce for a beauty brand.',
  },
  'UTZ Snacks': {
    role: 'Technical Project Lead',
    description: 'Led design and development for a major snack food company.',
  },
  'Navitas Organics': {
    role: 'Technical Project Lead',
    description:
      'Oversaw design and development for a superfood and wellness brand.',
  },
  SkinTe: {
    role: 'Technical Project Lead',
    description:
      'Directed design and development for a wellness beverage startup.',
  },
  'The D Hotel Las Vegas': {
    role: 'Technical Project Lead',
    description:
      'Managed design and development for a Las Vegas hotel and casino.',
  },
  'Aria Resort & Casino': {
    role: 'Technical Project Lead',
    description:
      'Oversaw design and development for a luxury resort and casino.',
  },
  'National Pen': {
    role: 'Technical Project Lead',
    description:
      'Led design and development for a promotional products company.',
  },
  SoClean: {
    role: 'Technical Project Lead',
    description:
      'Directed design and development for a health technology company.',
  },
  'Barona Resort & Casino': {
    role: 'Technical Project Lead',
    description:
      'Managed design and development for a California casino and resort.',
  },
  'Health Net': {
    role: 'Technical Project Lead',
    description:
      'Oversaw design and development for a health insurance provider.',
  },
  'Thermo Fisher Scientific': {
    role: 'Business & Systems Analyst',
    description:
      'Led enterprise eBusiness solutions, managed IAM initiatives, and aligned business needs with technical solutions.',
  },
  AutoZone: {
    role: 'Technical Project Lead / Business Systems Analyst',
    description:
      'Directed e-commerce and systems integration for a leading auto parts retailer.',
  },
  'Home Depot': {
    role: 'Senior IT Business Systems Analyst',
    description:
      'Led SAP and e-commerce initiatives, optimized SDLC, and mentored junior analysts for a major retailer.',
  },
  Accumen: {
    role: 'UI/UX Engineer & Systems Analyst',
    description:
      'Led healthcare startup product development, designed MVPs, and implemented agile methodologies.',
  },
  'Spacebox Digital': {
    role: 'Chief Technology Officer',
    description:
      'CTO leading AI, technical strategy, and application development for a digital innovation agency.',
  },
  Stealth: {
    role: 'Founder',
    description:
      'Founder building AI and e-commerce applications for a new venture.',
  },
  Akantro: {
    role: 'Co-Founder',
    description:
      'Co-founded and led an e-commerce technology consultancy, scaling a team and pioneering Shopify Hydrogen projects.',
  },
  REQ: {
    role: 'Head of Development',
    description:
      'Led development team delivering enterprise e-commerce solutions for national brands and DTC companies.',
  },
  BVA: {
    role: 'Head of Technical Project Management',
    description:
      'Directed cross-functional teams for Shopify Plus implementations and led flagship projects for major brands.',
  },
};

const organizationCompanies = [
  'Spacebox Digital',
  'Stealth',
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
    description: `My work is about blending talent and technology to solve puzzles and bring ideas to life.\n\nEvery project is a new journey—making something greater than the sum of its parts.`,
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

export function Work() {
  // Use the exported slides array, sort all except the intro
  const intro = slides.find((s) => s.type === 'intro') as IntroSlide;
  const rest = slides.filter((s) => s.type !== 'intro');
  // Mix and sort all slides except intro alphabetically by company/title
  const sortedSlides: Slide[] = [
    intro,
    ...rest.sort((a, b) => {
      let aKey = '';
      let bKey = '';
      if (a.type === 'project' || a.type === 'organization')
        aKey = (a as ProjectSlide | OrganizationSlide).company;
      else if (a.type === 'article') aKey = (a as ArticleSlide).title;
      if (b.type === 'project' || b.type === 'organization')
        bKey = (b as ProjectSlide | OrganizationSlide).company;
      else if (b.type === 'article') bKey = (b as ArticleSlide).title;
      return aKey.localeCompare(bKey);
    }),
  ];

  return (
    <>
      {sortedSlides.map((slide, index) => {
        if (slide.type === 'intro') {
          const intro = slide as IntroSlide;
          return (
            <section
              key={intro.id}
              id={intro.id}
              className="h-[100dvh] max-h-[90dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-2 sm:px-4 md:px-8 lg:px-24 py-4 sm:py-8 md:py-12 overflow-auto"
              style={{ backgroundColor: 'var(--tone)' }}
            >
              <div className="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
                <div className="space-y-12">
                  <h2
                    className="font-light tracking-tighter text-[clamp(2rem,5vw,3.5rem)] sm:text-[clamp(2.5rem,5vw,6rem)] md:text-[clamp(3rem,4vw,5rem)] lg:text-[clamp(3.5rem,3vw,4.5rem)]"
                    style={{ color: 'var(--text-color)' }}
                  >
                    {intro.title}
                  </h2>
                  <div
                    className="w-32 h-px mx-auto"
                    style={{ backgroundColor: 'var(--slate)' }}
                  ></div>
                </div>
                <p
                  className="font-normal leading-relaxed max-w-full sm:max-w-4xl mx-auto text-[clamp(1rem,2.8vw,1.3rem)] sm:text-[clamp(1.1rem,2.5vw,2rem)]"
                  style={{ color: 'var(--dark-gray)' }}
                >
                  {intro.description}
                </p>
              </div>
            </section>
          );
        } else if (slide.type === 'project') {
          const project = slide as ProjectSlide;
          const sectionNumber = String(index).padStart(2, '0');
          return (
            <section
              key={project.id}
              id={project.id}
              className="h-[100dvh] max-h-[90dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-2 sm:px-4 md:px-8 lg:px-24 py-4 sm:py-8 md:py-12 overflow-auto bg-transparent"
            >
              <div className="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
                <div className="space-y-4 sm:space-y-8">
                  <div
                    className="text-xs font-light tracking-widest uppercase"
                    style={{ color: 'var(--gray)' }}
                  >
                    {sectionNumber} Project
                  </div>
                  <h3
                    className="font-light tracking-tighter text-[clamp(1.5rem,4vw,2.5rem)] sm:text-[clamp(2rem,5vw,5rem)] md:text-[clamp(2.2rem,4vw,4rem)] lg:text-[clamp(2.5rem,3vw,3.5rem)]"
                    style={{ color: 'var(--text-color)' }}
                  >
                    {project.company}
                  </h3>
                  {project.role && (
                    <div
                      className="font-medium text-[clamp(0.95rem,1.8vw,1.1rem)] sm:text-[clamp(1rem,2vw,1.3rem)]"
                      style={{ color: 'var(--gray)' }}
                    >
                      {project.role}
                    </div>
                  )}
                  <div
                    className="w-24 h-px mx-auto"
                    style={{ backgroundColor: 'var(--slate)' }}
                  ></div>
                </div>
                {project.description && (
                  <div
                    className="font-normal max-w-full sm:max-w-3xl mx-auto text-[clamp(0.95rem,1.8vw,1.1rem)] sm:text-[clamp(1rem,2vw,1.3rem)]"
                    style={{ color: 'var(--dark-gray)' }}
                  >
                    {project.description}
                  </div>
                )}
              </div>
            </section>
          );
        } else if (slide.type === 'organization') {
          const org = slide as OrganizationSlide;
          const sectionNumber = String(index).padStart(2, '0');
          return (
            <section
              key={org.id}
              id={org.id}
              className="h-[100dvh] max-h-[90dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-2 sm:px-4 md:px-8 lg:px-24 py-4 sm:py-8 md:py-12 overflow-auto bg-transparent"
            >
              <div className="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
                <div className="space-y-4 sm:space-y-8">
                  <div
                    className="text-xs font-light tracking-widest uppercase"
                    style={{ color: 'var(--gray)' }}
                  >
                    {sectionNumber} Organization
                  </div>
                  <h3
                    className="font-light tracking-tighter text-[clamp(1.5rem,4vw,2.5rem)] sm:text-[clamp(2rem,5vw,5rem)] md:text-[clamp(2.2rem,4vw,4rem)] lg:text-[clamp(2.5rem,3vw,3.5rem)]"
                    style={{ color: 'var(--text-color)' }}
                  >
                    {org.company}
                  </h3>
                  {org.role && (
                    <div
                      className="font-medium text-[clamp(0.95rem,1.8vw,1.1rem)] sm:text-[clamp(1rem,2vw,1.3rem)]"
                      style={{ color: 'var(--gray)' }}
                    >
                      {org.role}
                    </div>
                  )}
                  <div
                    className="w-24 h-px mx-auto"
                    style={{ backgroundColor: 'var(--slate)' }}
                  ></div>
                </div>
                {org.description && (
                  <div
                    className="font-normal max-w-full sm:max-w-3xl mx-auto text-[clamp(0.95rem,1.8vw,1.1rem)] sm:text-[clamp(1rem,2vw,1.3rem)]"
                    style={{ color: 'var(--dark-gray)' }}
                  >
                    {org.description}
                  </div>
                )}
              </div>
            </section>
          );
        } else if (slide.type === 'article') {
          const article = slide as ArticleSlide;
          const sectionNumber = String(index).padStart(2, '0');
          return (
            <section
              key={article.id}
              id={article.id}
              className="h-[100dvh] max-h-[90dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-2 sm:px-4 md:px-8 lg:px-24 py-4 sm:py-8 md:py-12 overflow-auto bg-transparent"
            >
              <div className="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
                <div className="space-y-4 sm:space-y-8">
                  <div
                    className="text-xs font-light tracking-widest uppercase"
                    style={{ color: 'var(--gray)' }}
                  >
                    {sectionNumber} Article
                  </div>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-light tracking-tight hover:underline text-[clamp(0.95rem,1.8vw,1.1rem)] sm:text-[clamp(1.1rem,3vw,2rem)]"
                    style={{ color: 'var(--riso)' }}
                  >
                    {article.title}
                  </a>
                  <div
                    className="w-24 h-px mx-auto"
                    style={{ backgroundColor: 'var(--slate)' }}
                  ></div>
                </div>
              </div>
            </section>
          );
        }
        return null;
      })}
    </>
  );
}

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
