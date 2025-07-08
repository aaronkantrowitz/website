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
      {/* Gradient fade overlay using brand colors */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{
          background: `linear-gradient(to top,
            var(--background-color) 0%,
            var(--footer-gradient-1) 40%,
            var(--footer-gradient-2) 60%,
            transparent 100%)`,
        }}
        aria-hidden="true"
      />
      <a
        href="#section-00"
        onClick={handleClick}
        className="relative text-lg tracking-widest font-light transition-colors duration-200 pointer-events-auto"
        style={{
          color: 'var(--gray)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--slate)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--gray)';
        }}
        aria-label="Scroll to top"
      >
        Aaron Kantrowitz
      </a>
    </footer>
  );
}
