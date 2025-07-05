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

export function Work() {
  return (
    <>
      {/* Work Section Header */}
      <section
        id="section-01"
        className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50 dark:bg-gray-900 xl:ml-12"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-16">
            <div className="space-y-12">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-gray-900 dark:text-gray-100">
                Selected Work
              </h2>
              <div className="w-32 h-px bg-gray-900 dark:bg-gray-100 mx-auto"></div>
            </div>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-5xl mx-auto">
              I've had the privilege of working with leading brands and
              organizations across various industries, helping them build
              exceptional digital experiences and drive meaningful results.
            </p>
          </div>
        </div>
      </section>

      {/* Individual Company Sections */}
      {companies.map((company, index) => (
        <section
          key={company}
          id={`section-${String(index + 2).padStart(2, '0')}`}
          className="min-h-screen flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-950 xl:ml-12"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="space-y-12">
              <div className="text-xs font-light text-gray-400 dark:text-gray-600 tracking-widest uppercase">
                {String(index + 2).padStart(2, '0')}
              </div>

              <h3 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-gray-900 dark:text-gray-100">
                {company}
              </h3>

              <div className="w-24 h-px bg-gray-900 dark:bg-gray-100 mx-auto"></div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
