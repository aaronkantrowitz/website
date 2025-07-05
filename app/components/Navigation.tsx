import { useState, useEffect } from 'react';

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

  const scrollToSection = (sectionIndex: number) => {
    const sectionId = `section-${String(sectionIndex).padStart(2, '0')}`;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Total sections: Hero (00) + Work Intro (01) + Companies (02-45)
  const totalSections = 2 + companies.length;

  // Smart navigation: show numbers around current position
  const getVisibleNumbers = () => {
    const maxVisible = 15; // Show max 15 numbers at a time
    const halfRange = Math.floor(maxVisible / 2);

    let start = Math.max(0, activeSection - halfRange);
    let end = Math.min(totalSections - 1, start + maxVisible - 1);

    // Adjust start if we're near the end
    if (end - start < maxVisible - 1) {
      start = Math.max(0, end - maxVisible + 1);
    }

    const visibleNumbers = [];
    for (let i = start; i <= end; i++) {
      visibleNumbers.push(i);
    }

    return visibleNumbers;
  };

  const visibleNumbers = getVisibleNumbers();

  return (
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
  );
}
