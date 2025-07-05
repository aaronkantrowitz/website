import { useState, useEffect, useRef } from 'react';

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

export function Navigation() {
  const [activeSection, setActiveSection] = useState(0);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 1080
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavListRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = (sectionIndex: number) => {
    const sectionId = `section-${String(sectionIndex).padStart(2, '0')}`;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileNavOpen(false); // Close mobile nav after navigation
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id^="section-"]');
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // If we're at the very top, always show section 0
      if (scrollPosition < windowHeight / 3) {
        setActiveSection(0);
        return;
      }

      let currentSection = 0;
      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        // Check if the section is currently in view (center of viewport)
        if (
          scrollPosition + windowHeight / 2 >= offsetTop &&
          scrollPosition + windowHeight / 2 < offsetTop + offsetHeight
        ) {
          currentSection = index;
        }
      });

      setActiveSection(currentSection);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll active number into view when mobile nav opens
  useEffect(() => {
    if (mobileNavOpen && activeBtnRef.current && mobileNavListRef.current) {
      activeBtnRef.current.scrollIntoView({
        block: 'center',
        behavior: 'auto',
      });
    }
  }, [mobileNavOpen, activeSection]);

  // Total sections: Hero (00) + Work Intro (01) + Companies (02-45)
  const totalSections = 2 + companies.length;

  // Calculate how many numbers fit on screen
  const getVisibleNumbers = () => {
    // Estimate: each number takes ~32px (text + padding), plus 128px top/bottom padding
    const availableHeight = windowHeight - 128;
    const numberHeight = 32;
    const maxVisible = Math.floor(availableHeight / numberHeight);

    // Center around active section
    const halfRange = Math.floor(maxVisible / 2);
    let start = Math.max(0, activeSection - halfRange);
    let end = Math.min(totalSections - 1, start + maxVisible - 1);

    // Adjust if we're near the edges
    if (end === totalSections - 1) {
      start = Math.max(0, totalSections - maxVisible);
    }

    const visibleNumbers = [];
    for (let i = start; i <= end; i++) {
      visibleNumbers.push(i);
    }

    return visibleNumbers;
  };

  const visibleNumbers = getVisibleNumbers();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="fixed top-6 left-6 z-50 xl:hidden p-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        aria-label="Toggle navigation"
      >
        <div className="flex flex-col space-y-1">
          <span
            className={`block w-4 h-px bg-gray-600 dark:bg-gray-400 transition-transform duration-300 ${
              mobileNavOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></span>
          <span
            className={`block w-4 h-px bg-gray-600 dark:bg-gray-400 transition-opacity duration-300 ${
              mobileNavOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block w-4 h-px bg-gray-600 dark:bg-gray-400 transition-transform duration-300 ${
              mobileNavOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="fixed left-4 z-50 h-screen hidden xl:block">
        <div className="flex flex-col justify-evenly h-full py-8">
          {visibleNumbers.map((index) => {
            const isActive = activeSection === index;
            return (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`text-xs tracking-widest transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 text-left py-1 ${
                  isActive
                    ? 'font-bold text-gray-700 dark:text-gray-300 scale-110'
                    : 'font-light text-gray-400 dark:text-gray-600'
                }`}
              >
                {String(index).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          ></div>

          {/* Navigation Panel */}
          <div className="absolute left-0 top-0 h-full w-24 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col">
            <div className="flex flex-col h-full py-20 px-2">
              <div className="flex-1 overflow-y-auto" ref={mobileNavListRef}>
                <div className="flex flex-col space-y-2">
                  {Array.from({ length: totalSections }, (_, index) => {
                    const isActive = activeSection === index;
                    return (
                      <button
                        key={index}
                        ref={isActive ? activeBtnRef : undefined}
                        onClick={() => scrollToSection(index)}
                        className={`text-xs tracking-widest transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 text-center py-2 rounded ${
                          isActive
                            ? 'font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800'
                            : 'font-light text-gray-400 dark:text-gray-600'
                        }`}
                      >
                        {String(index).padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
