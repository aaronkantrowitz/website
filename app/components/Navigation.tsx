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
    
    // Initialize slide positions - Hero (section-00) visible first, others hidden
    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach((section) => {
      const element = section as HTMLElement;
      
      if (element.id === 'section-00') {
        // Hero slide visible by default
        element.style.opacity = '1';
        element.style.zIndex = '10';
        element.style.transition = 'opacity 0.4s ease-in';
      } else {
        // All other slides hidden
        element.style.opacity = '0';  
        element.style.zIndex = '1';
        element.style.transition = 'opacity 0.3s ease-out';
      }
    });
    
    // Set initial active section to -1 to represent Hero
    setActiveSection(-1);
  }, []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Centralized slide transition logic with staggered fade
  const scrollToSection = (sectionIndex: number, closeMobileMenu = false) => {
    setActiveSection(sectionIndex);
    
    // Get all sections
    const sections = document.querySelectorAll('[id^="section-"]');
    const currentActive = document.querySelector('section[style*="opacity: 1"]') as HTMLElement;
    
    // Determine target section
    let targetSection: HTMLElement;
    if (sectionIndex === -1) {
      // Hero slide
      targetSection = document.getElementById('section-00') as HTMLElement;
    } else {
      // Work slides: index 0 = "My Work" intro, index 1 = first project, etc.
      targetSection = sections[sectionIndex + 1] as HTMLElement; // +1 because Hero is not in slides array
    }
    
    if (!targetSection) return;
    
    // First phase: Fade out current slide
    if (currentActive && currentActive !== targetSection) {
      currentActive.style.transition = 'opacity 0.3s ease-out';
      currentActive.style.opacity = '0';
      currentActive.style.zIndex = '1';
      
      // Second phase: Fade in target slide after current is fully faded
      setTimeout(() => {
        targetSection.style.transition = 'opacity 0.4s ease-in';
        targetSection.style.opacity = '1';
        targetSection.style.zIndex = '10';
      }, 300); // Wait for fade out to complete
    } else {
      // If no current active slide, just fade in the target
      targetSection.style.transition = 'opacity 0.4s ease-in';
      targetSection.style.opacity = '1';
      targetSection.style.zIndex = '10';
    }
    
    // Ensure all other slides are hidden
    sections.forEach((section) => {
      const element = section as HTMLElement;
      if (element !== targetSection && element !== currentActive) {
        element.style.opacity = '0';
        element.style.zIndex = '1';
      }
    });
    
    if (closeMobileMenu) setMobileNavOpen(false);
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

  // No need for scroll tracking in slide-based navigation
  // Active section is managed directly through state

  // Simplified navigation event handlers for slide-based navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();

        const currentTime = Date.now();

        // Debouncing
        if (isNavigating || currentTime - lastNavigationTime.current < 150) {
          return;
        }

        let targetSection = activeSection;
        
        if (e.key === 'ArrowDown') {
          // Going forward: Hero (-1) -> My Work (0) -> Project 1 (1) -> etc.
          if (activeSection === -1) {
            targetSection = 0; // Hero to My Work
          } else if (activeSection < slides.length - 1) {
            targetSection = activeSection + 1;
          }
        } else if (e.key === 'ArrowUp') {
          // Going backward: Project 1 (1) -> My Work (0) -> Hero (-1)
          if (activeSection === 0) {
            targetSection = -1; // My Work to Hero
          } else if (activeSection > 0) {
            targetSection = activeSection - 1;
          }
        }

        if (targetSection !== activeSection) {
          lastNavigationTime.current = currentTime;
          setIsNavigating(true);
          scrollToSection(targetSection);
          setTimeout(() => setIsNavigating(false), 600);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const currentTime = Date.now();

      // Debouncing to prevent rapid navigation
      if (isNavigating || currentTime - lastNavigationTime.current < 150) {
        return;
      }

      const scrollStrength = Math.abs(e.deltaY);
      if (scrollStrength < 15) return;

      let targetSection = activeSection;

      if (e.deltaY > 0) {
        // Scrolling down: Hero (-1) -> My Work (0) -> Project 1 (1) -> etc.
        if (activeSection === -1) {
          targetSection = 0; // Hero to My Work
        } else if (activeSection < slides.length - 1) {
          targetSection = activeSection + 1;
        }
      } else if (e.deltaY < 0) {
        // Scrolling up: Project 1 (1) -> My Work (0) -> Hero (-1)
        if (activeSection === 0) {
          targetSection = -1; // My Work to Hero
        } else if (activeSection > 0) {
          targetSection = activeSection - 1;
        }
      }

      if (targetSection !== activeSection) {
        lastNavigationTime.current = currentTime;
        setIsNavigating(true);
        scrollToSection(targetSection);
        setTimeout(() => setIsNavigating(false), 600);
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

  // Navigation numbers - Hero gets 00, skip "My Work" intro, first project gets 01
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
    // Add Hero slide as special case (index -1 represents Hero = 00)
    if (start === 0) {
      visibleNumbers.push(-1); // Hero slide
    }
    // Add work project slides (skip index 0 which is "My Work" intro)
    for (let i = Math.max(1, start); i <= end; i++) {
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
          backgroundColor: 'var(--nav-bg)',
        }}
      >
        <div className="flex flex-col justify-evenly h-full py-4 w-full items-center bg-transparent flex-1">
          {visibleNumbers.map((visibleIdx) => {
            const isHeroSlide = visibleIdx === -1;
            const slide = isHeroSlide ? null : slides[visibleIdx];
            
            // Hero = 00, first project = 01, etc. (skip "My Work" intro)
            const sectionNumber = isHeroSlide ? '00' : String(visibleIdx).padStart(2, '0');
            
            // Check if this navigation item is active
            const isActive = isHeroSlide 
              ? (activeSection === -1) // Hero slide is activeSection -1
              : (activeSection === visibleIdx);
            
            // Target section to navigate to  
            const targetSection = isHeroSlide ? -1 : visibleIdx;
            
            return (
              <button
                key={isHeroSlide ? 'hero' : (slide?.id || visibleIdx)}
                onClick={() => scrollToSection(targetSection, false)}
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
              e.currentTarget.style.backgroundColor = 'var(--nav-hover-bg)';
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
