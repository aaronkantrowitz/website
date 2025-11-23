<script lang="ts">
  import { activeSection } from '$lib/stores';
  
  // Show footer when NOT on Hero slide (which is -1)
  // We can use a derived value or just reactive statement
  $: show = $activeSection !== -1;

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    // We can just set the store!
    // But Navigation component listens to store changes? 
    // Navigation component sets store AND triggers animation.
    // If we set store here, Navigation component won't know to trigger animation unless it subscribes to store 
    // and triggers animation on change.
    // Currently Navigation component has `scrollToSection` which sets store AND animates.
    // We should probably export `scrollToSection` or just trigger a click on the nav button.
    // Or better, move `scrollToSection` logic to a store-based approach or a shared controller.
    // For now, let's emulate the React behavior: click the nav button.
    
    const navigationElement = document.querySelector('nav button[aria-label*="section 00"]') as HTMLButtonElement;
    if (navigationElement) {
      navigationElement.click();
    } else {
        // Fallback if nav is hidden (e.g. mobile)
        // We can try to find the mobile nav button?
        // Or just use the store and trust we fix the animation logic later.
        // Actually, let's use the same fallback logic as React but adapted.
        
        // Find hero
        const heroSection = document.getElementById('section-00');
        if (heroSection) {
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
            // Update store
            activeSection.set(-1);
        }
    }
  }
</script>

<footer
  class="fixed bottom-0 left-0 w-full z-40 py-3 flex justify-center items-center pointer-events-none transition-opacity duration-300 {show ? 'opacity-100' : 'opacity-0'}"
>
  <!-- Gradient fade overlay using brand colors -->
  <div
    class="absolute inset-0 w-full h-full pointer-events-none select-none"
    style="background: linear-gradient(to top,
      var(--background-color) 0%,
      var(--footer-gradient-1) 40%,
      var(--footer-gradient-2) 60%,
      transparent 100%)"
    aria-hidden="true"
  ></div>
  <a
    href="#section-00"
    on:click={handleClick}
    on:mouseenter={(e) => e.currentTarget.style.color = 'var(--slate)'}
    on:mouseleave={(e) => e.currentTarget.style.color = 'var(--gray)'}
    class="relative text-lg tracking-widest font-light transition-colors duration-200 pointer-events-auto"
    style="color: var(--gray)"
    aria-label="Go back to Hero slide"
  >
    Aaron Kantrowitz
  </a>
</footer>
