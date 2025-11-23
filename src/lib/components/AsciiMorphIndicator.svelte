<script lang="ts">
  import { onMount } from 'svelte';

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

  let morph = 0; // 0 = wave, 1 = AK
  let display: string[][] = [[], []];
  let isReady = false;
  let t = 0;
  let morphDir = 1;

  onMount(() => {
    // Wait for fonts and styles to load before starting animation
    const timer = setTimeout(() => {
      isReady = true;
    }, 100);

    let frame: number;

    function animate() {
      if (!isReady) {
          frame = requestAnimationFrame(animate);
          return;
      }
      
      t += 0.012;
      // Morph back and forth every ~12s
      let m = morph + morphDir * 0.0025;
      if (m > 1) {
        m = 1;
        morphDir = -1;
      } else if (m < 0) {
        m = 0;
        morphDir = 1;
      }
      morph = m;

      // Get patterns
      const wave = getWavePattern(t);
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
      display = lines;
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  });
</script>

{#if !isReady}
  <div class="ascii-container" aria-hidden="true">
    <div style="height: 0.9em">&nbsp;</div>
    <div style="height: 0.9em">&nbsp;</div>
  </div>
{:else}
  <div class="ascii-container" aria-hidden="true">
    {#each display as line, y}
      <div style="height: 0.9em">
        {@html line.join('')}
      </div>
    {/each}
  </div>
{/if}

<style>
  .ascii-container {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    color: var(--gray);
    text-align: center;
    user-select: none;
    opacity: 0.75;
    line-height: 1.02;
    min-height: 2em;
    white-space: pre;
    font-variant-ligatures: none;
  }
</style>