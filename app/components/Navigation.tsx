import { useState, useEffect, useRef } from 'react';
import { slides, getSortedSlides } from './Work';

export function Navigation() {
  const [activeSection, setActiveSection] = useState(0);
  const sortedSlides = getSortedSlides();
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 1080
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavListRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = (sectionIndex: number) => {
    const sectionId = sortedSlides[sectionIndex]?.id;
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileNavOpen(false); // Close mobile nav after navigation
      }
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
      sections.forEach((section) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        // Check if the section is currently in view (center of viewport)
        if (
          scrollPosition + windowHeight / 2 >= offsetTop &&
          scrollPosition + windowHeight / 2 < offsetTop + offsetHeight
        ) {
          // Find the index in sortedSlides by id
          const idx = sortedSlides.findIndex((s) => s.id === element.id);
          if (idx !== -1) {
            currentSection = idx;
          }
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

  // Total sections: sortedSlides.length (including intro, work, blog, etc.)
  const totalSections = sortedSlides.length;

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
        {mobileNavOpen ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block mx-auto my-auto"
          >
            <line
              x1="7"
              y1="7"
              x2="21"
              y2="21"
              stroke="#4B5563"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="21"
              y1="7"
              x2="7"
              y2="21"
              stroke="#4B5563"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block mx-auto my-auto"
          >
            <line
              x1="6"
              y1="9"
              x2="22"
              y2="9"
              stroke="#4B5563"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="14"
              x2="22"
              y2="14"
              stroke="#4B5563"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="19"
              x2="22"
              y2="19"
              stroke="#4B5563"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Desktop Navigation */}
      <nav className="fixed left-0 z-50 h-screen w-12 hidden xl:flex items-stretch bg-white/40 dark:bg-gray-900/30 backdrop-blur-md pointer-events-auto">
        <div className="flex flex-col justify-evenly h-full py-8 w-full items-center bg-transparent">
          {visibleNumbers.map((visibleIdx) => {
            const slide = sortedSlides[visibleIdx];
            // Section number: always show 00 for intro
            const sectionNumber = String(visibleIdx).padStart(2, '0');
            const isActive = activeSection === visibleIdx;
            return (
              <button
                key={slide?.id || visibleIdx}
                onClick={() => scrollToSection(visibleIdx)}
                className={`text-xs tracking-widest transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 text-left py-1 ${
                  isActive
                    ? 'font-bold text-gray-700 dark:text-gray-300 scale-110'
                    : 'font-light text-gray-400 dark:text-gray-600'
                }`}
                tabIndex={0}
                aria-label={`Go to section ${sectionNumber}`}
              >
                {sectionNumber}
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
