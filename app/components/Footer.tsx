import React from 'react';

export function Footer() {
  return (
    <section
      id="section-footer"
      className="h-[100dvh] max-h-[90dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-2 sm:px-4 md:px-8 lg:px-24 py-4 sm:py-8 md:py-12 overflow-auto"
      style={{ backgroundColor: 'var(--tone)' }}
    >
      <div className="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
        <div className="space-y-12">
          <h2
            className="font-light tracking-tighter text-[clamp(2rem,5vw,3.5rem)] sm:text-[clamp(2.5rem,5vw,6rem)] md:text-[clamp(3rem,4vw,5rem)] lg:text-[clamp(3.5rem,3vw,4.5rem)]"
            style={{ color: 'var(--text-color)' }}
          >
            Aaron Kantrowitz
          </h2>
          <div
            className="w-32 h-px mx-auto"
            style={{ backgroundColor: 'var(--slate)' }}
          ></div>
        </div>
        <p
          className="font-normal leading-relaxed max-w-full sm:max-w-4xl mx-auto text-[clamp(1rem,2.8vw,1.3rem)] sm:text-[clamp(1.1rem,2.5vw,2rem)]"
          style={{ color: 'var(--dark-gray)' }}
        >
          Thanks for stopping by. Let's build something meaningful together.
        </p>
      </div>
    </section>
  );
}
