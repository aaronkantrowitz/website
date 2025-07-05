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
  'ATP Data Services',
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
];

// Define discriminated union type for slides
type IntroSlide = {
  type: 'intro';
  id: string;
  title: string;
  description: string;
};
type WorkSlide = {
  type: 'work';
  id: string;
  company: string;
};
type BlogSlide = {
  type: 'blog';
  id: string;
  title: string;
  link: string;
  coverImage?: string;
};
type Slide = IntroSlide | WorkSlide | BlogSlide;

// Blog post slides (simple, hardcoded)
const blogSlides: BlogSlide[] = [
  {
    type: 'blog',
    id: 'section-blog-01',
    title: 'On the Path to Mastery',
    link: 'https://aaronkantrowitz.hashnode.dev/on-the-path-to-mastery',
  },
  {
    type: 'blog',
    id: 'section-blog-02',
    title: 'RIP: SEO Is Dead',
    link: 'https://aaronkantrowitz.hashnode.dev/rip-seo-is-dead',
  },
  {
    type: 'blog',
    id: 'section-blog-03',
    title: '31 Goals for the Remainder of 2016',
    link: 'https://aaronkantrowitz.hashnode.dev/31-goals-for-the-remainder-of-2016',
  },
  {
    type: 'blog',
    id: 'section-blog-04',
    title: 'Being the Best You That You Can Be',
    link: 'https://aaronkantrowitz.hashnode.dev/being-the-best-you-that-you-can-be',
  },
  {
    type: 'blog',
    id: 'section-blog-05',
    title: "I'm Disappointed in Apple Today",
    link: 'https://aaronkantrowitz.hashnode.dev/im-disappointed-in-apple-today',
  },
];

// Slide data structure
export const slides: Slide[] = [
  {
    type: 'intro',
    id: 'section-01',
    title: 'Selected Work',
    description: `I've had the privilege of working with leading brands and organizations across various industries, helping them build exceptional digital experiences and drive meaningful results.`,
  },
  ...(companies.map((company, index) => ({
    type: 'work' as const,
    id: `section-${String(index + 2).padStart(2, '0')}`,
    company,
  })) as WorkSlide[]),
  ...blogSlides,
];

export function Work() {
  // Use the exported slides array, sort all except the intro
  const intro = slides.find((s) => s.type === 'intro') as IntroSlide;
  const rest = slides
    .filter((s) => s.type !== 'intro')
    .sort((a, b) => {
      let aKey = '';
      let bKey = '';
      if (a.type === 'work') aKey = (a as WorkSlide).company;
      else if (a.type === 'blog') aKey = (a as BlogSlide).title;
      if (b.type === 'work') bKey = (b as WorkSlide).company;
      else if (b.type === 'blog') bKey = (b as BlogSlide).title;
      return aKey.localeCompare(bKey);
    });
  const sortedSlides: Slide[] = [intro, ...rest];

  return (
    <>
      {sortedSlides.map((slide, index) => {
        if (slide.type === 'intro') {
          const intro = slide as IntroSlide;
          return (
            <section
              key={intro.id}
              id={intro.id}
              className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50 dark:bg-gray-900"
            >
              <div className="max-w-6xl mx-auto text-center">
                <div className="space-y-16">
                  <div className="space-y-12">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-gray-900 dark:text-gray-100">
                      {intro.title}
                    </h2>
                    <div className="w-32 h-px bg-gray-900 dark:bg-gray-100 mx-auto"></div>
                  </div>
                  <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-5xl mx-auto">
                    {intro.description}
                  </p>
                </div>
              </div>
            </section>
          );
        } else if (slide.type === 'work') {
          const work = slide as WorkSlide;
          const sectionNumber = String(index).padStart(2, '0');
          return (
            <section
              key={work.id}
              id={work.id}
              className="min-h-screen flex items-center justify-center px-6 py-12 bg-transparent"
            >
              <div className="max-w-6xl mx-auto text-center">
                <div className="space-y-12">
                  <div className="text-xs font-light text-gray-400 dark:text-gray-600 tracking-widest uppercase">
                    {sectionNumber}
                  </div>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-gray-900 dark:text-gray-100">
                    {work.company}
                  </h3>
                  {/* role and description to be added here */}
                  <div className="w-24 h-px bg-gray-900 dark:bg-gray-100 mx-auto"></div>
                </div>
              </div>
            </section>
          );
        } else if (slide.type === 'blog') {
          const blog = slide as BlogSlide;
          const sectionNumber = String(index).padStart(2, '0');
          return (
            <section
              key={blog.id}
              id={blog.id}
              className="min-h-screen flex items-center justify-center px-6 py-12 bg-transparent"
            >
              <div className="max-w-2xl mx-auto text-center">
                <div className="space-y-8">
                  <div className="text-xs font-light text-gray-400 dark:text-gray-600 tracking-widest uppercase">
                    {sectionNumber}
                  </div>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-2xl md:text-4xl font-light tracking-tight text-blue-700 dark:text-blue-300 hover:underline mb-2"
                  >
                    {blog.title}
                  </a>
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
      if (a.type === 'work') aKey = (a as WorkSlide).company;
      else if (a.type === 'blog') aKey = (a as BlogSlide).title;
      if (b.type === 'work') bKey = (b as WorkSlide).company;
      else if (b.type === 'blog') bKey = (b as BlogSlide).title;
      return aKey.localeCompare(bKey);
    });
  return [intro, ...rest];
}
