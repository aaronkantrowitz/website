import React, { useEffect, useRef, useState } from 'react';

export function Hero() {
  return (
    <section
      id="section-00"
      className="min-h-screen flex items-center justify-center px-6 py-12 relative"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="space-y-16 pb-16 sm:pb-20 md:pb-24 lg:pb-16">
          <div className="space-y-12">
            <div
              className="text-xs font-light tracking-widest uppercase"
              style={{ color: 'var(--gray)' }}
            >
              00
            </div>

            <h1
              className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tighter"
              style={{ color: 'var(--text-color)' }}
            >
              Aaron Kantrowitz
            </h1>
            <div
              className="w-32 h-px mx-auto"
              style={{ backgroundColor: 'var(--slate)' }}
            ></div>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <p
                className="text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed"
                style={{ color: 'var(--dark-gray)' }}
              >
                I turn ideas into digital experiences—part engineer, part
                storyteller.
              </p>
              <p
                className="text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed max-w-4xl mx-auto"
                style={{ color: 'var(--dark-gray)' }}
              >
                I build bridges between imagination and reality, leading teams
                to create work that matters.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center text-base font-light"
              style={{ color: 'var(--gray)' }}
            >
              <span>CTO @ Spacebox Digital, Co-Founder @ Stealth Startup</span>
              <span className="hidden sm:block">•</span>
              <span>Based in the United States</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI-inspired, minimal ASCII morph indicator - responsive positioning */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 select-none
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
  const tRef = useRef(0);
  const morphDir = useRef(1);

  useEffect(() => {
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
  }, [morph]);

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
