import React, { useEffect, useState } from 'react';

export function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show footer when not on Hero slide
    const checkActiveSlide = () => {
      const heroSection = document.getElementById('section-00');
      if (!heroSection) {
        setShow(true);
        return;
      }
      
      // Check if Hero has the highest z-index (indicating it's the active slide)
      const heroZIndex = parseInt(getComputedStyle(heroSection).zIndex) || 0;
      const heroOpacity = parseFloat(getComputedStyle(heroSection).opacity) || 0;
      
      // Hero is active if it has z-index 10 OR opacity > 0.5
      const isOnHero = heroZIndex >= 10 || heroOpacity > 0.5;
      setShow(!isOnHero);
    };

    // Check immediately
    checkActiveSlide();
    
    // Use setTimeout to periodically check (more reliable than MutationObserver for this)
    const interval = setInterval(checkActiveSlide, 100);
    
    // Also set up MutationObserver as backup
    const observer = new MutationObserver(checkActiveSlide);
    const heroSection = document.getElementById('section-00');
    
    if (heroSection) {
      observer.observe(heroSection, {
        attributes: true,
        attributeFilter: ['style']
      });
    }

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate back to Hero slide using the same function as navigation
    const navigationElement = document.querySelector('nav button[aria-label*="section 00"]') as HTMLButtonElement;
    if (navigationElement) {
      navigationElement.click();
    } else {
      // Fallback: directly trigger Hero slide
      const heroSection = document.getElementById('section-00');
      if (heroSection) {
        // Find current active slide and fade it out
        const currentActive = document.querySelector('section[style*="opacity: 1"]') as HTMLElement;
        if (currentActive && currentActive !== heroSection) {
          currentActive.style.transition = 'opacity 0.3s ease-out';
          currentActive.style.opacity = '0';
          currentActive.style.zIndex = '1';
          
          setTimeout(() => {
            heroSection.style.transition = 'opacity 0.4s ease-in';
            heroSection.style.opacity = '1';
            heroSection.style.zIndex = '10';
          }, 300);
        }
      }
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
        aria-label="Go back to Hero slide"
      >
        Aaron Kantrowitz
      </a>
    </footer>
  );
}
