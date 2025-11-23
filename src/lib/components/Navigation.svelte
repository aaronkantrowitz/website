<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { getSortedSlides } from '$lib/data';
  import { activeSection, mobileNavOpen, isNavigating, windowHeight } from '$lib/stores';

  const slides = getSortedSlides();
  let hasMounted = false;
  let lastNavigationTime = 0;
  let isShuffleActive = false;
  
  // Touch state
  let touchStartY: number | null = null;
  let touchEndY: number | null = null;

  let mobileNavListRef: HTMLDivElement;
  let activeBtnRef: HTMLButtonElement;

  onMount(() => {
    hasMounted = true;
    // Initialize slide positions
    requestAnimationFrame(() => {
        const sections = document.querySelectorAll('[id^="section-"]');
        sections.forEach((section) => {
            const element = section as HTMLElement;
            if (element.id === 'section-00') {
                element.style.opacity = '1';
                element.style.zIndex = '10';
                element.style.transition = 'opacity 0.4s ease-in';
            } else {
                element.style.opacity = '0';
                element.style.zIndex = '1';
                element.style.transition = 'opacity 0.3s ease-out';
            }
        });
        activeSection.set(-1);
    });

    // Resize listener
    const handleResize = () => windowHeight.set(window.innerHeight);
    window.addEventListener('resize', handleResize);
    windowHeight.set(window.innerHeight);

    // Touch listeners
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Keyboard and Wheel
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  });

  // Logic for scrolling
  function scrollToSection(sectionIndex: number, closeMobileMenu = false) {
    activeSection.set(sectionIndex);

    const sections = document.querySelectorAll('[id^="section-"]');
    const currentActive = document.querySelector('section[style*="opacity: 1"]') as HTMLElement;
    
    let targetSection: HTMLElement;
    if (sectionIndex === -1) {
      targetSection = document.getElementById('section-00') as HTMLElement;
    } else {
      const slide = slides[sectionIndex];
      if (slide) {
        targetSection = document.getElementById(slide.id) as HTMLElement;
      } else {
          return;
      }
    }
    
    if (!targetSection) return;

    if (currentActive && currentActive !== targetSection) {
      currentActive.style.transition = 'opacity 0.3s ease-out';
      currentActive.style.opacity = '0';
      currentActive.style.zIndex = '1';
      
      setTimeout(() => {
        targetSection.style.transition = 'opacity 0.4s ease-in';
        targetSection.style.opacity = '1';
        targetSection.style.zIndex = '10';
      }, 300);
    } else {
      targetSection.style.transition = 'opacity 0.4s ease-in';
      targetSection.style.opacity = '1';
      targetSection.style.zIndex = '10';
    }

    sections.forEach((section) => {
      const element = section as HTMLElement;
      if (element !== targetSection && element !== currentActive) {
        element.style.opacity = '0';
        element.style.zIndex = '1';
      }
    });

    if (closeMobileMenu) mobileNavOpen.set(false);
  }

  // Event Handlers
  const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
      if (touchStartY === null || touchEndY === null) return;

      const currentTime = Date.now();
      if ($isNavigating || currentTime - lastNavigationTime < 150) {
        touchStartY = null;
        touchEndY = null;
        return;
      }

      const deltaY = touchStartY - touchEndY;
      const minSwipeDistance = 50;

      if (Math.abs(deltaY) < minSwipeDistance) {
        touchStartY = null;
        touchEndY = null;
        return;
      }

      let target = $activeSection;
      if (deltaY > 0) { // Swiped up -> next
        if ($activeSection === -1) target = 0;
        else if ($activeSection < slides.length - 1) target = $activeSection + 1;
      } else { // Swiped down -> prev
        if ($activeSection === 0) target = -1;
        else if ($activeSection > 0) target = $activeSection - 1;
      }

      if (target !== $activeSection) {
        lastNavigationTime = currentTime;
        isNavigating.set(true);
        scrollToSection(target);
        setTimeout(() => isNavigating.set(false), 600);
      }
      touchStartY = null;
      touchEndY = null;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentTime = Date.now();
        if ($isNavigating || currentTime - lastNavigationTime < 150) return;

        let target = $activeSection;
        if (e.key === 'ArrowDown') {
          if ($activeSection === -1) target = 0;
          else if ($activeSection < slides.length - 1) target = $activeSection + 1;
        } else if (e.key === 'ArrowUp') {
            if ($activeSection === 0) target = -1;
            else if ($activeSection > 0) target = $activeSection - 1;
        }

        if (target !== $activeSection) {
            lastNavigationTime = currentTime;
            isNavigating.set(true);
            scrollToSection(target);
            setTimeout(() => isNavigating.set(false), 600);
        }
      }
  };

  const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const currentTime = Date.now();
      if ($isNavigating || currentTime - lastNavigationTime < 150) return;

      const scrollStrength = Math.abs(e.deltaY);
      if (scrollStrength < 15) return;

      let target = $activeSection;
      if (e.deltaY > 0) {
          if ($activeSection === -1) target = 0;
          else if ($activeSection < slides.length - 1) target = $activeSection + 1;
      } else if (e.deltaY < 0) {
          if ($activeSection === 0) target = -1;
          else if ($activeSection > 0) target = $activeSection - 1;
      }

      if (target !== $activeSection) {
          lastNavigationTime = currentTime;
          isNavigating.set(true);
          scrollToSection(target);
          setTimeout(() => isNavigating.set(false), 600);
      }
  };

  function handleShuffle() {
    if (slides.length <= 1) return;
    isShuffleActive = true;
    const randomIdx = Math.floor(Math.random() * (slides.length - 1)) + 1;
    scrollToSection(randomIdx);
  }

  // Visible numbers calculation
  $: totalSections = slides.length;
  $: availableHeight = $windowHeight - 160;
  $: numberHeight = 32;
  $: maxVisible = Math.floor(availableHeight / numberHeight);
  $: halfRange = Math.floor(maxVisible / 2);
  $: start = Math.max(0, $activeSection - halfRange);
  $: end = Math.min(totalSections - 1, start + maxVisible - 1);
  $: adjustedStart = (end === totalSections - 1) ? Math.max(0, totalSections - maxVisible) : start;
  
  $: visibleNumbers = (() => {
      const nums = [];
      if (adjustedStart === 0) nums.push(-1);
      for (let i = Math.max(1, adjustedStart); i <= end; i++) {
          nums.push(i);
      }
      return nums;
  })();

  // Scroll mobile nav into view
  $: if ($mobileNavOpen) {
      tick().then(() => {
          if (activeBtnRef && mobileNavListRef) {
              activeBtnRef.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
      });
  }
  
  $: if ($activeSection !== undefined && $mobileNavOpen) {
       tick().then(() => {
          if (activeBtnRef && mobileNavListRef) {
              activeBtnRef.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
       });
  }
</script>

{#if hasMounted}
  <!-- Mobile Toggle Button -->
  <button
    on:click={() => mobileNavOpen.set(!$mobileNavOpen)}
    class="mobile-toggle {$mobileNavOpen ? 'open' : ''}"
    aria-label="Toggle navigation"
  >
    {#if $mobileNavOpen}
      <svg width="28" height="28" viewBox="0 -960 960 960" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path d="M623.85-391.85v-176.21q0-11.02-10.08-15.25t-17.96 3.66l-77.27 77.27q-9.46 9.46-9.46 22.38 0 12.92 9.69 22.62l77.06 77.06q7.86 7.86 17.94 3.82 10.08-4.04 10.08-15.35ZM224.62-160q-26.66 0-45.64-18.98T160-224.62v-510.76q0-26.66 18.98-45.64T224.62-800h510.76q26.66 0 45.64 18.98T800-735.38v510.76q0 26.66-18.98 45.64T735.38-160H224.62ZM360-200h375.38q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H360v560Z"/>
      </svg>
    {:else}
      <svg width="28" height="28" viewBox="0 -960 960 960" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path d="M500-267.23q48.62-27.15 98.12-39.19 49.5-12.04 101.88-12.04 36 0 64.73 4.46 28.73 4.46 50.65 11.85 9.24 3.84 16.93-1.16 7.69-5 7.69-15.77v-360.61q0-6.93-3.85-12.31-3.84-5.38-13.07-9.23-33-11.69-60.04-16-27.04-4.31-63.04-4.31-52.38 0-104.54 15.46-52.15 15.46-95.46 46.39v392.46Zm-20 45.46q-9.38 0-17.27-2.35-7.88-2.34-15.04-6.03-43.61-23.77-90.84-36.04-47.23-12.27-96.85-12.27-31.23 0-61.35 5.23Q168.54-268 140-256.46q-21.77 8.69-40.88-5.23Q80-275.61 80-300.15v-386.62q0-14.85 7.81-27.54T109.69-732q35.46-15.31 73.43-22.42 37.96-7.12 76.88-7.12 58.77 0 114.65 16.92 55.89 16.93 105.35 49.24 49.46-32.31 105.35-49.24 55.88-16.92 114.65-16.92 38.92 0 76.88 7.12 37.97 7.11 73.43 22.42 14.07 5 21.88 17.69 7.81 12.69 7.81 27.54v386.62q0 24.54-20.65 37.69-20.66 13.15-43.97 4.46-27.76-10.77-56.73-15.62-28.96-4.84-58.65-4.84-49.62 0-96.85 12.27t-90.84 36.04q-7.16 3.69-15.04 6.03-7.89 2.35-17.27 2.35Zm75.38-380.31q0-4.38 3.04-8.88 3.04-4.5 7.2-6.73 30.53-13.85 64.53-21.16 34-7.3 69.85-7.3 19.23 0 36.42 2.11 17.2 2.12 35.43 6.12 5.15 1.23 8.96 5.38 3.81 4.16 3.81 10.31 0 10.08-6 14.61-6 4.54-16.08 2.08-14.77-3-30.27-4.11-15.5-1.12-32.27-1.12-32.15 0-62.92 6.15-30.77 6.16-58.39 17.24-10.31 3.92-16.81-.24-6.5-4.15-6.5-14.46Zm0 216.93q0-4.39 3.04-9.27 3.04-4.89 7.2-7.12 29-13.84 64.53-20.77 35.54-6.92 69.85-6.92 19.23 0 36.42 2.11 17.2 2.12 35.43 6.12 5.15 1.23 8.96 5.38 3.81 4.16 3.81 10.31 0 10.08-6 14.62-6 4.54-16.08 2.07-14.77-3-30.27-4.11-15.5-1.12-32.27-1.12-31.38 0-61.77 6.43-30.38 6.42-58 18.27-10.31 4.69-17.58-.12-7.27-4.81-7.27-15.88Zm0-107.7q0-4.38 3.04-8.88 3.04-4.5 7.2-6.73 30.53-13.85 64.53-21.16 34-7.3 69.85-7.3 19.23 0 36.42 2.11 17.2 2.12 35.43 6.12 5.15 1.23 8.96 5.38 3.81 4.16 3.81 10.31 0 10.08-6 14.62-6 4.53-16.08 2.07-14.77-3-30.27-4.11-15.5-1.12-32.27-1.12-32.15 0-62.92 6.16-30.77 6.15-58.39 17.23-10.31 3.92-16.81-.23-6.5-4.16-6.5-14.47Z"/>
      </svg>
    {/if}
  </button>

  <!-- Navigation (Desktop style, but toggleable on mobile) -->
  <nav class="main-nav {$mobileNavOpen ? 'open' : ''}">
    <div class="nav-links" bind:this={mobileNavListRef}>
      {#each visibleNumbers as visibleIdx}
        {@const isHeroSlide = visibleIdx === -1}
        {@const sectionNumber = isHeroSlide ? '00' : String(visibleIdx).padStart(2, '0')}
        {@const isActive = isHeroSlide ? ($activeSection === -1) : ($activeSection === visibleIdx)}
        {@const targetSection = isHeroSlide ? -1 : visibleIdx}
        
        {#if isActive}
            <button
            bind:this={activeBtnRef}
            on:click={() => { scrollToSection(targetSection, true); isShuffleActive = false; }}
            class="nav-link active"
            aria-label="Go to section {sectionNumber}"
            >
            {sectionNumber}
            </button>
        {:else}
            <button
            on:click={() => { scrollToSection(targetSection, true); isShuffleActive = false; }}
            class="nav-link"
            aria-label="Go to section {sectionNumber}"
            >
            {sectionNumber}
            </button>
        {/if}
      {/each}
    </div>
    
    <!-- Shuffle button -->
    <div class="shuffle-container">
      <button
        on:click={handleShuffle}
        class="shuffle-btn"
        aria-label="Shuffle to random slide"
      >
        {#if isShuffleActive}
          <svg width="28" height="28" viewBox="0 -960 960 960" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M120-80q-16.5 0-28.25-11.75T80-120v-720q0-16.5 11.75-28.25T120-880h720q16.5 0 28.25 11.75T880-840v720q0 16.5-11.75 28.25T840-80H120Zm469.23-120h138.46q13.73 0 23.02-9.29t9.29-23.02v-136.15q0-8.5-5.76-14.25t-14.27-5.75q-8.51 0-14.24 5.75T720-368.46v98.15L595.31-395q-6.62-6.62-14.27-6.62-7.66 0-14.27 6.62-6.62 6.62-6.35 14.54.27 7.92 6.12 13.77L693.23-240h-104q-8.5 0-14.25 5.76t-5.75 14.27q0 8.51 5.75 14.24t14.25 5.73Zm-383.38-5.85q6.38 6.39 14.53 6 8.16-.38 13.77-6L720-691.69v100.15q0 8.5 5.76 14.25t14.27 5.75q8.51 0 14.24-5.75t5.73-14.25v-136.15q0-13.73-9.29-23.02T727.69-760H589.23q-8.5 0-14.25 5.76t-5.75 14.27q0 8.51 5.75 14.24t14.25 5.73h102.46L205.85-234.15q-6.39 6.38-6.39 14.15 0 7.77 6.39 14.15Zm-.23-520.77 156.46 155.47q5.36 5.61 13.64 5.61 8.28 0 13.76-5.48 5.98-5.98 5.87-13.63-.12-7.66-5.73-13.27l-155.7-156.23q-5.84-5.62-13.88-5.62-8.04 0-13.66 5.62-5.61 5.61-6 13.77-.38 8.15 5.24 13.76Z"/>
          </svg>
        {:else}
          <svg width="28" height="28" viewBox="0 -960 960 960" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M589.23-200q-8.5 0-14.25-5.76t-5.75-14.27q0-8.51 5.75-14.24t14.25-5.73h104L566.54-366.69q-5.85-5.85-6.12-13.89-.27-8.04 6.35-14.65 6.61-6.62 14.27-6.62 7.65 0 14.27 6.62L720-270.31v-98.15q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75t5.73 14.25v136.15q0 13.73-9.29 23.02T727.69-200H589.23Zm-383.38-5.85q-6.39-6.38-6.39-14.15 0-7.77 6.39-14.15L691.69-720H589.23q-8.5 0-14.25-5.76t-5.75-14.27q0-8.51 5.75-14.24t14.25-5.73h138.46q13.73 0 23.02 9.29t9.29 23.02v136.15q0 8.5-5.76 14.25t-14.27 5.75q-8.51 0-14.24-5.75T720-591.54v-100.15L234.15-205.85q-5.61 5.62-13.77 6-8.15.39-14.53-6Zm-.23-520.77q-5.62-5.61-5.24-13.76.39-8.16 5.85-13.77 5.46-5.62 13.65-5.62 8.2 0 14.04 5.62l155.7 156.23q5.61 5.61 5.73 13.27.11 7.65-5.73 13.63-5.36 5.48-13.65 5.48-8.28 0-13.89-5.61L205.62-726.62Z"/>
          </svg>
        {/if}
      </button>
    </div>
  </nav>

  <!-- Backdrop for mobile removed as requested -->
{/if}

<style>
  /* Mobile Toggle */
  .mobile-toggle {
    position: fixed;
    top: 1.5rem; /* top-6 */
    left: 0.5rem; /* Adjusted left to center within 3rem width (0.5rem + 2rem width + 0.5rem padding = 3rem approx) */
    width: 2rem; /* Explicit width */
    height: 2rem; /* Explicit height */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 60; /* Higher than nav */
    padding: 0; /* Remove padding, rely on flex centering */
    border-radius: 0.25rem;
    transition: all 300ms;
    color: var(--slate);
  }

  .mobile-toggle.open, .mobile-toggle:hover {
    background-color: var(--ivory-med);
  }
  
  /* Main Navigation (Sidebar) */
  .main-nav {
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    height: 100dvh;
    width: 3rem; /* Consistent width */
    z-index: 50;
    flex-direction: column;
    align-items: stretch;
    pointer-events: auto;
    background-color: var(--nav-bg);
    transition: transform 300ms ease-in-out;
    transform: translateX(-100%); 
  }

  /* When open on mobile */
  .main-nav.open {
    transform: translateX(0);
    /* width remains 3rem */
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;
    flex: 1;
    padding: 1rem 0;
    padding-top: 4rem; /* Reduced space for toggle button inside nav */
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    /* Gradient masking for smooth fade in/out */
    mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
  }
  
  .nav-links::-webkit-scrollbar {
    display: none;
  }

  .nav-link {
    font-size: 0.75rem; /* text-xs */
    letter-spacing: 0.1em; /* tracking-widest */
    transition: all 300ms;
    text-align: center;
    padding: 0.25rem 0;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray);
    font-weight: 300;
    margin-left: 2px; /* Optical alignment correction */
  }

  /* Remove mobile specific overrides */
  /* .main-nav.open .nav-link { } removed */

  .nav-link:hover {
    color: var(--slate);
  }

  .nav-link.active {
    color: var(--slate);
    font-weight: bold;
    transform: scale(1.1);
  }
  
  /* Remove mobile background highlight */
  .main-nav.open .nav-link.active {
      background-color: transparent;
      width: 2rem;
  }

  .shuffle-container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-bottom: 0.5rem;
    padding-top: 1rem;
    flex-shrink: 0;
  }

  .shuffle-btn {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    transition: color 200ms, background-color 200ms;
    color: var(--slate);
  }

  .shuffle-btn:hover {
    color: var(--slate);
    background-color: var(--nav-hover-bg);
  }

  .shuffle-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--slate);
  }

  /* Desktop Styles (min-width: 1280px) */
  @media (min-width: 1280px) {
    .mobile-toggle {
      display: none;
    }
    
    .main-nav {
      transform: translateX(0); /* Always visible */
      width: 3rem; /* Back to thin width */
      border-right: none;
      box-shadow: none;
    }
    
    .main-nav .nav-links {
        padding-top: 1rem; /* Reset top padding */
        
        /* Adjust mask for desktop layout if needed, though same mask works well */
        mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
    }
    
    .main-nav .nav-link {
        font-size: 0.75rem;
        padding: 0.25rem 0;
        width: 2rem; /* Ensure consistent width on desktop */
        justify-content: center; /* Ensure centering */
    }
    
    .main-nav .nav-link.active {
        background-color: transparent; /* Remove mobile highlight bg */
    }
  }
</style>