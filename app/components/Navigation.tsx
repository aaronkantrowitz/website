import { useState, useEffect, useRef } from 'react';
import { slides as allSlides, getSortedSlides } from './Work';

function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function Navigation() {
  // All hooks must be called unconditionally at the top
  const [hasMounted, setHasMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const slides = getSortedSlides();
  const [windowHeight, setWindowHeight] = useState(1080);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavListRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id^="section-"]');
      const scrollPosition = window.scrollY;
      if (scrollPosition < windowHeight / 3) {
        setActiveSection(0);
        return;
      }
      let currentSection = 0;
      sections.forEach((section) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (
          scrollPosition + windowHeight / 2 >= offsetTop &&
          scrollPosition + windowHeight / 2 < offsetTop + offsetHeight
        ) {
          const idx = slides.findIndex((s) => s.id === element.id);
          if (idx !== -1) {
            currentSection = idx;
          }
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowHeight, slides]);
  useEffect(() => {
    if (mobileNavOpen && activeBtnRef.current && mobileNavListRef.current) {
      activeBtnRef.current.scrollIntoView({
        block: 'center',
        behavior: 'auto',
      });
    }
  }, [mobileNavOpen, activeSection]);

  // Only render after mount (no hooks below this line)
  if (!hasMounted) return null;

  // Navigation numbers
  const totalSections = slides.length;
  const getVisibleNumbers = () => {
    const availableHeight = windowHeight - 128;
    const numberHeight = 32;
    const maxVisible = Math.floor(availableHeight / numberHeight);
    const halfRange = Math.floor(maxVisible / 2);
    let start = Math.max(0, activeSection - halfRange);
    let end = Math.min(totalSections - 1, start + maxVisible - 1);
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

  // Shuffle handler: scroll to a random slide (not the intro)
  const handleShuffle = () => {
    if (slides.length <= 1) return;
    const randomIdx = Math.floor(Math.random() * (slides.length - 1)) + 1;
    scrollToSection(randomIdx);
  };

  // Scroll logic
  const scrollToSection = (sectionIndex: number) => {
    const sectionId = slides[sectionIndex]?.id;
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileNavOpen(false);
      }
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="fixed top-6 left-6 z-50 p-2 transition-all duration-300 rounded xl:hidden"
        style={{
          backgroundColor: mobileNavOpen ? 'var(--ivory-med)' : 'transparent',
          color: 'var(--text-color)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--ivory-med)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = mobileNavOpen
            ? 'var(--ivory-med)'
            : 'transparent';
        }}
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
              stroke="var(--dark-gray)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="21"
              y1="7"
              x2="7"
              y2="21"
              stroke="var(--dark-gray)"
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
              stroke="var(--dark-gray)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="14"
              x2="22"
              y2="14"
              stroke="var(--dark-gray)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="19"
              x2="22"
              y2="19"
              stroke="var(--dark-gray)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Desktop Navigation */}
      <nav
        className="fixed left-0 z-50 h-screen w-12 hidden xl:flex flex-col items-stretch backdrop-blur-md pointer-events-auto"
        style={{
          backgroundColor: 'rgba(240, 238, 230, 0.6)', // --ivory-med with transparency
        }}
      >
        <div className="flex flex-col justify-evenly h-full py-4 w-full items-center bg-transparent flex-1">
          {visibleNumbers.map((visibleIdx) => {
            const slide = slides[visibleIdx];
            const sectionNumber = String(visibleIdx).padStart(2, '0');
            const isActive = activeSection === visibleIdx;
            return (
              <button
                key={slide?.id || visibleIdx}
                onClick={() => scrollToSection(visibleIdx)}
                className="text-xs tracking-widest transition-all duration-300 text-left py-1"
                style={{
                  color: isActive ? 'var(--slate)' : 'var(--gray)',
                  fontWeight: isActive ? 'bold' : '300',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--slate)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive
                    ? 'var(--slate)'
                    : 'var(--gray)';
                }}
                tabIndex={0}
                aria-label={`Go to section ${sectionNumber}`}
                ref={isActive ? activeBtnRef : undefined}
              >
                {sectionNumber}
              </button>
            );
          })}
        </div>
        {/* Shuffle button */}
        <div className="flex justify-center w-full pb-2">
          <button
            onClick={handleShuffle}
            aria-label="Shuffle to random slide"
            className="w-8 h-8 flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2"
            style={{
              color: 'var(--gray)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--slate)';
              e.currentTarget.style.backgroundColor = 'var(--ivory-dark)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--gray)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 xl:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-[1px]"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}
            onClick={() => setMobileNavOpen(false)}
          ></div>

          {/* Navigation Panel */}
          <div
            className="relative h-full w-24 shadow-2xl flex flex-col"
            style={{
              backgroundColor: 'var(--background-color)',
              borderRight: '1px solid var(--ivory-dark)',
            }}
          >
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
                        className="text-xs tracking-widest transition-all duration-300 text-center py-2 rounded"
                        style={{
                          color: isActive ? 'var(--slate)' : 'var(--gray)',
                          fontWeight: isActive ? 'bold' : '300',
                          backgroundColor: isActive
                            ? 'var(--ivory-med)'
                            : 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--slate)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = isActive
                            ? 'var(--slate)'
                            : 'var(--gray)';
                        }}
                      >
                        {String(index).padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Shuffle button for mobile */}
              <div className="flex justify-center w-full pb-2">
                <button
                  onClick={handleShuffle}
                  aria-label="Shuffle to random slide"
                  className="w-8 h-8 mt-4 mr-2 flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2"
                  style={{
                    color: 'var(--gray)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--slate)';
                    e.currentTarget.style.backgroundColor = 'var(--ivory-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--gray)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="16 3 21 3 21 8" />
                    <line x1="4" y1="20" x2="21" y2="3" />
                    <polyline points="21 16 21 21 16 21" />
                    <line x1="15" y1="15" x2="21" y2="21" />
                    <line x1="4" y1="4" x2="9" y2="9" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
