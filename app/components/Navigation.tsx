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

// Utility to detect mobile device (screen width < 768)
function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

export function Navigation() {
  // Core state
  const [hasMounted, setHasMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1080);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const lastNavigationTime = useRef(0);

  // Refs
  const slides = getSortedSlides();
  const mobileNavListRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);
  const autoSnapTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Centralized scroll logic
  const scrollToSection = (sectionIndex: number, closeMobileMenu = false) => {
    // Special handling for slide 0 navigation
    if (sectionIndex === 0) {
      // Always scroll to Hero section for slide 0
      const heroElement = document.getElementById('section-00');
      if (heroElement) {
        document.documentElement.classList.add('smooth-scroll');
        heroElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
        if (closeMobileMenu) setMobileNavOpen(false);
        setTimeout(() => {
          document.documentElement.classList.remove('smooth-scroll');
        }, 800);
      }
      return;
    }

    const sectionId = slides[sectionIndex]?.id;
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        // Add class for optimized text rendering during scroll
        document.documentElement.classList.add('smooth-scroll');

        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
        if (closeMobileMenu) setMobileNavOpen(false);

        // Remove class after scroll animation completes
        setTimeout(() => {
          document.documentElement.classList.remove('smooth-scroll');
        }, 800);
      }
    }
  };

  // Calculate current position within active section
  const getCurrentPosition = () => {
    // Special handling for slide 0 (Hero + My Work intro)
    if (activeSection === 0) {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const heroSection = document.getElementById('section-00');
      const workIntroSection = document.getElementById('section-01');

      if (heroSection && workIntroSection) {
        const heroTop = heroSection.offsetTop;
        const workIntroBottom =
          workIntroSection.offsetTop + workIntroSection.offsetHeight;
        const combinedHeight = workIntroBottom - heroTop;

        // Calculate position within the combined Hero + My Work intro area
        const positionInCombined =
          (scrollTop - heroTop) / (combinedHeight - window.innerHeight);
        const isWellCentered =
          positionInCombined >= -0.1 && positionInCombined <= 1.1;

        return { positionInSection: positionInCombined, isWellCentered };
      }
    }

    // Normal logic for other sections
    const currentSection = document.getElementById(slides[activeSection]?.id);
    if (!currentSection)
      return { positionInSection: 0.5, isWellCentered: true };

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = currentSection.offsetTop;
    const sectionHeight = currentSection.offsetHeight;
    const windowHeight = window.innerHeight;

    const positionInSection =
      (scrollTop - sectionTop) / (sectionHeight - windowHeight);
    const isWellCentered = positionInSection >= 0.1 && positionInSection <= 0.9;

    return { positionInSection, isWellCentered };
  };

  // Track active section and handle auto-snap
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigating) return;

      // Update active section
      const sections = document.querySelectorAll('[id^="section-"]');
      const scrollPosition = window.scrollY;

      // Special handling for Hero section (section-00)
      const heroSection = document.getElementById('section-00');
      const workIntroSection = document.getElementById('section-01');

      if (heroSection && workIntroSection) {
        const workIntroBottom =
          workIntroSection.offsetTop + workIntroSection.offsetHeight;

        // If we're anywhere in Hero or My Work intro, consider it slide 0
        if (scrollPosition < workIntroBottom - windowHeight / 3) {
          setActiveSection(0);
        } else {
          // For other sections, use normal logic
          let currentSection = 1;
          sections.forEach((section) => {
            const element = section as HTMLElement;
            const sectionId = element.id;

            // Skip Hero and My Work intro since they're handled above
            if (sectionId === 'section-00' || sectionId === 'section-01')
              return;

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
        }
      } else {
        // Fallback to original logic if sections not found
        if (scrollPosition < windowHeight / 3) {
          setActiveSection(0);
        } else {
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
        }
      }

      // Auto-snap logic (DISABLED on mobile)
      if (isMobile()) return;
      if (autoSnapTimeoutRef.current) {
        clearTimeout(autoSnapTimeoutRef.current);
      }

      autoSnapTimeoutRef.current = setTimeout(() => {
        const currentTime = Date.now();
        const { isWellCentered } = getCurrentPosition();

        // Only snap if we're not navigating and haven't navigated recently
        if (
          !isWellCentered &&
          !isNavigating &&
          currentTime - lastNavigationTime.current > 500
        ) {
          setIsNavigating(true);
          scrollToSection(activeSection, false);
          setTimeout(() => setIsNavigating(false), 300);
        }
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (autoSnapTimeoutRef.current) {
        clearTimeout(autoSnapTimeoutRef.current);
      }
    };
  }, [windowHeight, slides, activeSection, isNavigating, lastNavigationTime]);

  // Navigation event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();

        const currentTime = Date.now();

        // Strong debouncing for keyboard as well
        if (isNavigating || currentTime - lastNavigationTime.current < 150) {
          return;
        }

        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const heroSection = document.getElementById('section-00');
        const workIntroSection = document.getElementById('section-01');

        // Special handling for Hero <-> My Work intro navigation
        if (heroSection && workIntroSection) {
          const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
          const workIntroTop = workIntroSection.offsetTop;
          const workIntroBottom = workIntroTop + workIntroSection.offsetHeight;

          // If we're in Hero section and pressing down
          if (e.key === 'ArrowDown' && scrollTop < heroBottom - 50) {
            lastNavigationTime.current = currentTime;
            setIsNavigating(true);

            if (autoSnapTimeoutRef.current) {
              clearTimeout(autoSnapTimeoutRef.current);
              autoSnapTimeoutRef.current = undefined;
            }

            // Go to My Work intro
            document.documentElement.classList.add('smooth-scroll');
            workIntroSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });

            setTimeout(() => {
              document.documentElement.classList.remove('smooth-scroll');
              setIsNavigating(false);
            }, 600);
            return;
          }

          // If we're in My Work intro and pressing up
          if (
            e.key === 'ArrowUp' &&
            scrollTop >= workIntroTop - 50 &&
            scrollTop < workIntroBottom + 50
          ) {
            lastNavigationTime.current = currentTime;
            setIsNavigating(true);

            if (autoSnapTimeoutRef.current) {
              clearTimeout(autoSnapTimeoutRef.current);
              autoSnapTimeoutRef.current = undefined;
            }

            // Go back to Hero
            scrollToSection(0);
            setTimeout(() => setIsNavigating(false), 600);
            return;
          }
        }

        // Normal navigation for other sections
        let targetSection = activeSection;
        if (e.key === 'ArrowDown' && activeSection < slides.length - 1) {
          targetSection = activeSection + 1;
        } else if (e.key === 'ArrowUp' && activeSection > 0) {
          targetSection = activeSection - 1;
        }

        if (targetSection !== activeSection) {
          lastNavigationTime.current = currentTime;
          setIsNavigating(true);

          if (autoSnapTimeoutRef.current) {
            clearTimeout(autoSnapTimeoutRef.current);
            autoSnapTimeoutRef.current = undefined;
          }

          scrollToSection(targetSection);
          setTimeout(() => setIsNavigating(false), 600);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const currentTime = Date.now();

      // Strong debouncing to prevent rapid navigation
      if (isNavigating || currentTime - lastNavigationTime.current < 150) {
        return;
      }

      const scrollStrength = Math.abs(e.deltaY);
      if (scrollStrength < 15) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const heroSection = document.getElementById('section-00');
      const workIntroSection = document.getElementById('section-01');

      // Special handling for Hero -> My Work intro flow
      if (heroSection && workIntroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const workIntroTop = workIntroSection.offsetTop;
        const workIntroBottom = workIntroTop + workIntroSection.offsetHeight;

        // If we're in the Hero section and scrolling down
        if (e.deltaY > 0 && scrollTop < heroBottom - 50) {
          e.preventDefault();
          lastNavigationTime.current = currentTime;
          setIsNavigating(true);

          if (autoSnapTimeoutRef.current) {
            clearTimeout(autoSnapTimeoutRef.current);
            autoSnapTimeoutRef.current = undefined;
          }

          // Scroll to My Work intro
          document.documentElement.classList.add('smooth-scroll');
          workIntroSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });

          setTimeout(() => {
            document.documentElement.classList.remove('smooth-scroll');
            setIsNavigating(false);
          }, 600);
          return;
        }

        // If we're in the My Work intro section and scrolling up
        if (
          e.deltaY < 0 &&
          scrollTop >= workIntroTop - 50 &&
          scrollTop < workIntroBottom + 50
        ) {
          e.preventDefault();
          lastNavigationTime.current = currentTime;
          setIsNavigating(true);

          if (autoSnapTimeoutRef.current) {
            clearTimeout(autoSnapTimeoutRef.current);
            autoSnapTimeoutRef.current = undefined;
          }

          // Scroll back to Hero
          scrollToSection(0);
          setTimeout(() => setIsNavigating(false), 600);
          return;
        }
      }

      // For all other sections, use normal navigation logic
      const { positionInSection } = getCurrentPosition();
      const isNearEdge = positionInSection < 0.15 || positionInSection > 0.85;
      const isBetweenSlides =
        positionInSection < -0.05 || positionInSection > 1.05;

      if (isNearEdge || isBetweenSlides) {
        let targetSection = activeSection;

        if (e.deltaY > 0 && activeSection < slides.length - 1) {
          targetSection = activeSection + 1;
        } else if (e.deltaY < 0 && activeSection > 0) {
          targetSection = activeSection - 1;
        }

        if (targetSection !== activeSection) {
          e.preventDefault();
          lastNavigationTime.current = currentTime;
          setIsNavigating(true);

          if (autoSnapTimeoutRef.current) {
            clearTimeout(autoSnapTimeoutRef.current);
            autoSnapTimeoutRef.current = undefined;
          }

          scrollToSection(targetSection);
          setTimeout(() => setIsNavigating(false), 600);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, slides.length, isNavigating]);

  // Mobile navigation scroll effect
  useEffect(() => {
    if (mobileNavOpen && activeBtnRef.current && mobileNavListRef.current) {
      activeBtnRef.current.scrollIntoView({
        block: 'center',
        behavior: 'auto',
      });
    }
  }, [mobileNavOpen, activeSection]);

  // Only render after mount
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

  // Shuffle handler
  const handleShuffle = () => {
    if (slides.length <= 1) return;
    const randomIdx = Math.floor(Math.random() * (slides.length - 1)) + 1;
    scrollToSection(randomIdx);
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
                onClick={() => scrollToSection(visibleIdx, false)}
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
              width="21"
              height="21"
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
                        onClick={() => scrollToSection(index, true)}
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
                    width="21"
                    height="21"
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
