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
    // We need to wait for DOM to update
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
  $: availableHeight = $windowHeight - 128;
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
    on:mouseenter={(e) => e.currentTarget.style.backgroundColor = 'var(--ivory-med)'}
    on:mouseleave={(e) => e.currentTarget.style.backgroundColor = $mobileNavOpen ? 'var(--ivory-med)' : 'transparent'}
    class="fixed top-6 left-6 z-50 p-2 transition-all duration-300 rounded xl:hidden"
    style="background-color: {$mobileNavOpen ? 'var(--ivory-med)' : 'transparent'}; color: var(--text-color);"
    aria-label="Toggle navigation"
  >
    {#if $mobileNavOpen}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto my-auto">
        <line x1="7" y1="7" x2="21" y2="21" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
        <line x1="21" y1="7" x2="7" y2="21" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
      </svg>
    {:else}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto my-auto">
        <line x1="6" y1="9" x2="22" y2="9" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
        <line x1="6" y1="14" x2="22" y2="14" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
        <line x1="6" y1="19" x2="22" y2="19" stroke="var(--dark-gray)" stroke-width="1.2" stroke-linecap="round" />
      </svg>
    {/if}
  </button>

  <!-- Desktop Navigation -->
  <nav
    class="fixed left-0 z-50 h-screen w-12 hidden xl:flex flex-col items-stretch backdrop-blur-md pointer-events-auto"
    style="background-color: var(--nav-bg);"
  >
    <div class="flex flex-col justify-evenly h-full py-4 w-full items-center bg-transparent flex-1">
      {#each visibleNumbers as visibleIdx}
        {@const isHeroSlide = visibleIdx === -1}
        {@const sectionNumber = isHeroSlide ? '00' : String(visibleIdx).padStart(2, '0')}
        {@const isActive = isHeroSlide ? ($activeSection === -1) : ($activeSection === visibleIdx)}
        {@const targetSection = isHeroSlide ? -1 : visibleIdx}
        
        <button
          on:click={() => scrollToSection(targetSection, false)}
          on:mouseenter={(e) => e.currentTarget.style.color = 'var(--slate)'}
          on:mouseleave={(e) => e.currentTarget.style.color = isActive ? 'var(--slate)' : 'var(--gray)'}
          class="text-xs tracking-widest transition-all duration-300 text-left py-1"
          style="color: {isActive ? 'var(--slate)' : 'var(--gray)'}; font-weight: {isActive ? 'bold' : '300'}; transform: {isActive ? 'scale(1.1)' : 'scale(1)'};"
          aria-label="Go to section {sectionNumber}"
        >
          {sectionNumber}
        </button>
      {/each}
    </div>
    
    <!-- Shuffle button -->
    <div class="flex justify-center w-full pb-2">
      <button
        on:click={handleShuffle}
        on:mouseenter={(e) => {
          e.currentTarget.style.color = 'var(--slate)';
          e.currentTarget.style.backgroundColor = 'var(--nav-hover-bg)';
        }}
        on:mouseleave={(e) => {
          e.currentTarget.style.color = 'var(--gray)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        aria-label="Shuffle to random slide"
        class="w-8 h-8 flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2"
        style="color: var(--gray);"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="0" aria-hidden="true">
          <path d="M8.94 6.871l1.081-1.34-0.004-0.003c0.855-0.971 2.087-1.528 3.378-1.528h1.898l-1.646-1.646 0.707-0.707 2.853 2.853-2.854 2.854-0.707-0.707 1.647-1.647h-1.898c-0.989 0-1.931 0.425-2.595 1.159l-1.080 1.339-0.78-0.627zM5.851 10.696l-0.011-0.008c-0.667 0.833-1.663 1.312-2.733 1.312h-3.107v1h3.107c1.369 0 2.645-0.611 3.503-1.676l0.011 0.009 0.941-1.166-0.777-0.629-0.934 1.158zM13.646 10.354l1.647 1.646h-1.898c-1.052 0-2.031-0.469-2.7-1.281l-4.269-5.265-0.010 0.008c-0.85-0.926-2.048-1.462-3.309-1.462h-3.107v1h3.107c0.998 0 1.948 0.428 2.611 1.17l4.161 5.132-0.005 0.004c0.86 1.076 2.143 1.694 3.52 1.694h1.898l-1.646 1.646 0.707 0.707 2.854-2.854-2.854-2.854-0.707 0.709z" fill="currentColor" />
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Navigation Overlay -->
  {#if $mobileNavOpen}
    <div class="fixed inset-0 z-40 xl:hidden flex flex-col">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 backdrop-blur-[1px]"
        style="background-color: rgba(0, 0, 0, 0.05);"
        on:click={() => mobileNavOpen.set(false)}
        role="button"
        tabindex="0"
        on:keydown={() => {}}
      ></div>

      <!-- Navigation Panel -->
      <div
        class="relative h-full w-24 shadow-2xl flex flex-col"
        style="background-color: var(--background-color); border-right: 1px solid var(--ivory-dark);"
      >
        <div class="flex flex-col h-full pt-20 pb-4 px-2">
          <div class="flex-1 overflow-y-auto flex items-center" bind:this={mobileNavListRef}>
            <div class="flex flex-col justify-evenly h-full w-full">
              <!-- Hero slide (00) -->
              <button
                bind:this={activeBtnRef}
                on:click={() => scrollToSection(-1, true)}
                on:mouseenter={(e) => e.currentTarget.style.color = 'var(--slate)'}
                on:mouseleave={(e) => e.currentTarget.style.color = $activeSection === -1 ? 'var(--slate)' : 'var(--gray)'}
                class="text-sm tracking-widest transition-all duration-300 text-center py-2 rounded"
                style="color: {$activeSection === -1 ? 'var(--slate)' : 'var(--gray)'}; font-weight: {$activeSection === -1 ? 'bold' : '300'}; background-color: {$activeSection === -1 ? 'var(--ivory-med)' : 'transparent'};"
              >
                00
              </button>
              
              <!-- Work slides -->
              {#each {length: slides.length} as _, index}
                {@const isActive = $activeSection === index}
                <!-- Only bind ref if it's the active one. Svelte logic is a bit tricky here in a loop. 
                     We can just conditionally bind if we used a component, but on native element it's harder.
                     We'll skip binding inside loop for now and trust that if activeSection changed, we find it?
                     Actually, we can use `use:action` or just rely on logic. 
                     The React code used a ref to scroll into view. 
                     We can just querySelector the active one in the effect.
                -->
                <button
                  on:click={() => scrollToSection(index, true)}
                  on:mouseenter={(e) => e.currentTarget.style.color = 'var(--slate)'}
                  on:mouseleave={(e) => e.currentTarget.style.color = isActive ? 'var(--slate)' : 'var(--gray)'}
                  class="text-sm tracking-widest transition-all duration-300 text-center py-2 rounded"
                  style="color: {isActive ? 'var(--slate)' : 'var(--gray)'}; font-weight: {isActive ? 'bold' : '300'}; background-color: {isActive ? 'var(--ivory-med)' : 'transparent'};"
                  data-active={isActive}
                >
                  {String(index).padStart(2, '0')}
                </button>
              {/each}
            </div>
          </div>
          
          <!-- Shuffle button for mobile -->
          <div class="flex justify-center w-full pb-2">
            <button
              on:click={handleShuffle}
              on:mouseenter={(e) => {
                e.currentTarget.style.color = 'var(--slate)';
                e.currentTarget.style.backgroundColor = 'var(--nav-hover-bg)';
              }}
              on:mouseleave={(e) => {
                e.currentTarget.style.color = 'var(--gray)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Shuffle to random slide"
              class="w-8 h-8 mt-4 mr-2 flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2"
              style="color: var(--gray);"
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
