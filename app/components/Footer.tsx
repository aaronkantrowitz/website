import React, { useEffect, useState } from 'react';

export function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('section-00');
      if (!section) {
        setShow(false);
        return;
      }
      const rect = section.getBoundingClientRect();
      // If the bottom of the first section is above the top of the viewport, show the footer
      setShow(rect.bottom < 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const topSection = document.getElementById('section-00');
    if (topSection) {
      topSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full z-40 py-3 flex justify-center items-center pointer-events-none transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Smoother, longer gradient fade overlay, no blur */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-gradient-to-t from-white/70 via-white/40 via-60% to-white/0 dark:from-gray-950/70 dark:via-gray-950/40 dark:via-60% dark:to-gray-950/0" />
      </div>
      <a
        href="#section-00"
        onClick={handleClick}
        className="relative text-xs tracking-widest font-light text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 pointer-events-auto"
        aria-label="Scroll to top"
      >
        Aaron Kantrowitz
      </a>
    </footer>
  );
}
