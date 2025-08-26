import React, { useEffect, useRef, useState } from 'react';

export function Hero() {
  return (
    <section
      id="section-00"
      className="h-[100dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-4 md:px-8 lg:px-24 pt-16 pb-20 sm:py-8 md:py-12 overflow-auto"
    >
      <div className="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
        <div className="space-y-4 sm:space-y-8">
          <div
            className="text-xs font-light tracking-widest uppercase"
            style={{ color: 'var(--gray)' }}
          >
            00
          </div>

          <h1
            className="font-light tracking-tighter text-[clamp(2rem,5vw,3.5rem)] sm:text-[clamp(2.5rem,5vw,6rem)] md:text-[clamp(3rem,4vw,5rem)] lg:text-[clamp(3.5rem,3vw,4.5rem)]"
            style={{ color: 'var(--text-color)' }}
          >
            Aaron Kantrowitz
          </h1>

          <div
            className="w-32 h-px mx-auto"
            style={{ backgroundColor: 'var(--slate)' }}
          ></div>
        </div>

        <div className="space-y-3 max-w-full sm:max-w-5xl mx-auto">
          <p
            className="font-normal leading-relaxed text-[clamp(1rem,2.8vw,1.3rem)] sm:text-[clamp(1.1rem,2.5vw,2rem)] max-w-full sm:max-w-4xl mx-auto"
            style={{ color: 'var(--dark-gray)' }}
          >
            I turn ideas into experiences. Building bridges between thought and
            reality, leading teams to create work that matters.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-[clamp(0.95rem,1.8vw,1.1rem)] sm:text-[clamp(1rem,2vw,1.3rem)] font-light"
          style={{ color: 'var(--gray)' }}
        >
          <span>Engineering leader & builder</span>
          <span className="hidden sm:block">•</span>
          <span>Based in San Diego, California</span>
        </div>
      </div>

      {/* AI-inspired, minimal ASCII morph indicator - responsive positioning */}
      <div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 select-none
                   sm:bottom-8 md:bottom-12 lg:bottom-16
                   scale-75 sm:scale-85 md:scale-90 lg:scale-100"
        aria-hidden="true"
      >
        <AsciiMorphIndicator />
      </div>
    </section>
  );
}

// Minimal, elegant ASCII morphing indicator: morphs between a wave and 'A K' shape
function AsciiMorphIndicator() {
  const width = 32;
  const height = 2;
  // Minimal 'A K' ASCII shape (2 lines, 32 chars)
  const akPattern = [
    'A      K      A      K     ',
    'A A    K K    A A    K  K  ',
  ];
  // Wave pattern (2 lines, 32 chars)
  function getWavePattern(t: number) {
    const lines: string[] = [];
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const phase = t + x * 0.18 + y * 0.7;
        const v = Math.sin(phase) + Math.cos(phase * 0.7);
        if (v > 1.1) line += '~';
        else if (v > 0.3) line += '|';
        else if (v > -0.5) line += '/';
        else line += ' ';
      }
      lines.push(line);
    }
    return lines;
  }

  // Easing for morph
  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  const [morph, setMorph] = useState(0); // 0 = wave, 1 = AK
  const [display, setDisplay] = useState<string[][]>([[], []]);
  const [isReady, setIsReady] = useState(false);
  const tRef = useRef(0);
  const morphDir = useRef(1);

  // Wait for fonts and styles to load before starting animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100); // Small delay to ensure everything is rendered
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    let frame: number;
    function animate() {
      tRef.current += 0.012;
      // Morph back and forth every ~12s
      let m = morph + morphDir.current * 0.0025;
      if (m > 1) {
        m = 1;
        morphDir.current = -1;
      } else if (m < 0) {
        m = 0;
        morphDir.current = 1;
      }
      setMorph(m);
      // Get patterns
      const wave = getWavePattern(tRef.current);
      // Morph each char
      const lines: string[][] = [];
      for (let y = 0; y < height; y++) {
        const line: string[] = [];
        for (let x = 0; x < width; x++) {
          const c1 = wave[y][x];
          const c2 = akPattern[y][x] || ' ';
          // If morphing, fade between chars
          const progress = easeInOut(m);
          // If chars are the same, just show it
          if (c1 === c2) {
            line.push(`<span style='opacity:1'>${c1}</span>`);
          } else {
            // Fade out c1, fade in c2
            const fadeOut = 1 - progress;
            const fadeIn = progress;
            // Use c2 if mostly morphed, else c1
            if (progress > 0.7) {
              line.push(
                `<span style='opacity:${fadeIn.toFixed(2)}'>${c2}</span>`
              );
            } else if (progress < 0.3) {
              line.push(
                `<span style='opacity:${fadeOut.toFixed(2)}'>${c1}</span>`
              );
            } else {
              // Cross-fade both for a shimmer
              line.push(
                `<span style='opacity:${fadeOut.toFixed(
                  2
                )}'>${c1}</span><span style='opacity:${fadeIn.toFixed(
                  2
                )}'>${c2}</span>`
              );
            }
          }
        }
        lines.push(line);
      }
      setDisplay(lines);
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [morph, isReady]);

  if (!isReady) {
    // Show placeholder to prevent layout shift
    return (
      <div
        style={{
          fontFamily:
            'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.05em',
          color: 'var(--gray)',
          textAlign: 'center',
          userSelect: 'none',
          opacity: 0.75,
          lineHeight: 1.02,
          minHeight: '2em',
          whiteSpace: 'pre',
          fontVariantLigatures: 'none',
        }}
        aria-hidden="true"
      >
        <div style={{ height: '0.9em' }}>&nbsp;</div>
        <div style={{ height: '0.9em' }}>&nbsp;</div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily:
          'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: '0.7rem', // Reduced from 0.82rem for better mobile scaling
        letterSpacing: '0.05em', // Slightly reduced letter spacing
        color: 'var(--gray)',
        textAlign: 'center',
        userSelect: 'none',
        opacity: 0.75, // Slightly reduced opacity to be less intrusive
        lineHeight: 1.02,
        minHeight: '2em', // Reduced from 2.2em
        whiteSpace: 'pre',
        fontVariantLigatures: 'none',
      }}
      aria-hidden="true"
    >
      {display.map((line, y) => (
        <div
          key={y}
          style={{ height: '0.9em' }} // Reduced from 1em
          dangerouslySetInnerHTML={{ __html: line.join('') }}
        />
      ))}
    </div>
  );
}
