<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { getSortedSlides } from '$lib/data';
  import { activeSection, mobileNavOpen, isNavigating, windowHeight } from '$lib/stores';

  const slides = getSortedSlides();
  let hasMounted = false;
  let lastNavigationTime = 0;
  
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
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
        <line x1="7" y1="7" x2="21" y2="21" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
        <line x1="21" y1="7" x2="7" y2="21" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
      </svg>
    {:else}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
        <line x1="6" y1="9" x2="22" y2="9" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
        <line x1="6" y1="14" x2="22" y2="14" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
        <line x1="6" y1="19" x2="22" y2="19" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
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
            on:click={() => scrollToSection(targetSection, true)}
            class="nav-link active"
            aria-label="Go to section {sectionNumber}"
            >
            {sectionNumber}
            </button>
        {:else}
            <button
            on:click={() => scrollToSection(targetSection, true)}
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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="0" aria-hidden="true">
          <path d="M8.94 6.871l1.081-1.34-0.004-0.003c0.855-0.971 2.087-1.528 3.378-1.528h1.898l-1.646-1.646 0.707-0.707 2.853 2.853-2.854 2.854-0.707-0.707 1.647-1.647h-1.898c-0.989 0-1.931 0.425-2.595 1.159l-1.080 1.339-0.78-0.627zM5.851 10.696l-0.011-0.008c-0.667 0.833-1.663 1.312-2.733 1.312h-3.107v1h3.107c1.369 0 2.645-0.611 3.503-1.676l0.011 0.009 0.941-1.166-0.777-0.629-0.934 1.158zM13.646 10.354l1.647 1.646h-1.898c-1.052 0-2.031-0.469-2.7-1.281l-4.269-5.265-0.010 0.008c-0.85-0.926-2.048-1.462-3.309-1.462h-3.107v1h3.107c0.998 0 1.948 0.428 2.611 1.17l4.161 5.132-0.005 0.004c0.86 1.076 2.143 1.694 3.52 1.694h1.898l-1.646 1.646 0.707 0.707 2.854-2.854-2.854-2.854-0.707 0.709z" fill="currentColor" />
        </svg>
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
    color: var(--text-color);
  }

  .mobile-toggle.open, .mobile-toggle:hover {
    background-color: var(--ivory-med);
  }
  
  .icon {
    display: block;
    margin: auto;
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
    color: var(--gray);
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
