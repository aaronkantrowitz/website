<script lang="ts">
  import { onMount } from 'svelte';
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
  $: availableHeight = $windowHeight - 160; // Increased reserved space from 128 to 160
  $: numberHeight = 32;
  $: maxVisible = Math.floor(availableHeight / numberHeight);
  $: halfRange = Math.floor(maxVisible / 2);
  $: start = Math.max(0, $activeSection - halfRange);
  $: end = Math.min(totalSections - 1, start + maxVisible - 1);
  // Correction if end is capped
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
  $: if ($mobileNavOpen && activeBtnRef && mobileNavListRef) {
      activeBtnRef.scrollIntoView({ block: 'center', behavior: 'auto' });
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

  <!-- Desktop Navigation -->
  <nav class="desktop-nav">
    <div class="nav-links">
      {#each visibleNumbers as visibleIdx}
        {@const isHeroSlide = visibleIdx === -1}
        {@const sectionNumber = isHeroSlide ? '00' : String(visibleIdx).padStart(2, '0')}
        {@const isActive = isHeroSlide ? ($activeSection === -1) : ($activeSection === visibleIdx)}
        {@const targetSection = isHeroSlide ? -1 : visibleIdx}
        
        <button
          on:click={() => scrollToSection(targetSection, false)}
          class="nav-link {isActive ? 'active' : ''}"
          aria-label="Go to section {sectionNumber}"
        >
          {sectionNumber}
        </button>
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

  <!-- Mobile Navigation Overlay -->
  {#if $mobileNavOpen}
    <div class="mobile-nav-overlay">
      <!-- Backdrop -->
      <div
        class="backdrop"
        on:click={() => mobileNavOpen.set(false)}
        role="button"
        tabindex="0"
        on:keydown={() => {}}
      ></div>

      <!-- Navigation Panel -->
      <div class="mobile-nav-panel">
        <div class="mobile-nav-content">
          <div class="mobile-links-container" bind:this={mobileNavListRef}>
            <div class="mobile-links-list">
              <!-- Hero slide (00) -->
              <button
                bind:this={activeBtnRef}
                on:click={() => scrollToSection(-1, true)}
                class="mobile-link {$activeSection === -1 ? 'active' : ''}"
              >
                00
              </button>
              
              <!-- Work slides -->
              {#each {length: slides.length} as _, index}
                {@const isActive = $activeSection === index}
                <button
                  on:click={() => scrollToSection(index, true)}
                  class="mobile-link {isActive ? 'active' : ''}"
                >
                  {String(index).padStart(2, '0')}
                </button>
              {/each}
            </div>
          </div>
          
          <!-- Shuffle button for mobile -->
          <div class="mobile-shuffle-container">
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
        </div>
      </div>
    </div>
  {/if}
{/if}

<style>
  /* Mobile Toggle */
  .mobile-toggle {
    position: fixed;
    top: 1.5rem; /* top-6 */
    left: 1.5rem; /* left-6 */
    z-index: 50;
    padding: 0.5rem;
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

  /* Desktop Navigation */
  .desktop-nav {
    display: none;
    position: fixed;
    left: 0;
    height: 100vh;
    width: 3rem; /* w-12 */
    z-index: 50;
    flex-direction: column;
    align-items: stretch;
    backdrop-filter: blur(12px);
    pointer-events: auto;
    background-color: var(--nav-bg);
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;
    flex: 1;
    padding: 1rem 0;
    min-height: 0;
    overflow: hidden;
  }

  .nav-link {
    font-size: 0.75rem; /* text-xs */
    letter-spacing: 0.1em; /* tracking-widest */
    transition: all 300ms;
    text-align: left;
    padding: 0.25rem 0;
    color: var(--gray);
    font-weight: 300;
  }

  .nav-link:hover {
    color: var(--slate);
  }

  .nav-link.active {
    color: var(--slate);
    font-weight: bold;
    transform: scale(1.1);
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

  /* Mobile Navigation Overlay */
  .mobile-nav-overlay {
    position: fixed;
    inset: 0;
    z-index: 40;
    display: flex;
    flex-direction: column;
  }

  .backdrop {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(1px);
  }

  .mobile-nav-panel {
    position: relative;
    height: 100%;
    width: 6rem; /* w-24 */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    border-right: 1px solid var(--ivory-dark);
  }

  .mobile-nav-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 5rem; /* pt-20 */
    padding-bottom: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .mobile-links-container {
    flex: 1;
    overflow-y: auto;
    display: flex;
    align-items: center;
  }

  .mobile-links-list {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;
  }

  .mobile-link {
    font-size: 0.875rem; /* text-sm */
    letter-spacing: 0.1em;
    transition: all 300ms;
    text-align: center;
    padding: 0.5rem 0;
    border-radius: 0.25rem;
    color: var(--gray);
    font-weight: 300;
  }

  .mobile-link:hover {
    color: var(--slate);
  }

  .mobile-link.active {
    color: var(--slate);
    font-weight: bold;
    background-color: var(--ivory-med);
  }

  .mobile-shuffle-container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-bottom: 0.5rem;
  }

  .mobile-shuffle-container .shuffle-btn {
    margin-top: 1rem;
    margin-right: 0.5rem;
  }

  /* Responsive Visibility */
  @media (min-width: 1280px) {
    .mobile-toggle {
      display: none;
    }
    
    .desktop-nav {
      display: flex;
    }

    .mobile-nav-overlay {
      display: none;
    }
  }
</style>
