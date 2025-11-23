<script lang="ts">
  import { activeSection } from '$lib/stores';
  
  $: show = $activeSection !== -1;

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    const navigationElement = document.querySelector('nav button[aria-label*="section 00"]') as HTMLButtonElement;
    if (navigationElement) {
      navigationElement.click();
    } else {
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
            activeSection.set(-1);
        }
    }
  }
</script>

<footer class="site-footer {show ? 'visible' : 'hidden'}">
  <div class="footer-gradient" aria-hidden="true"></div>
  <a
    href="#section-00"
    on:click={handleClick}
    class="footer-link"
    aria-label="Go back to Hero slide"
  >
    Aaron Kantrowitz
  </a>
</footer>

<style>
  .site-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 40;
    padding: 0.75rem 0; /* py-3 */
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    transition: opacity 300ms;
  }

  .visible {
    opacity: 1;
  }

  .hidden {
    opacity: 0;
  }

  .footer-gradient {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select: none;
    background: linear-gradient(to top,
      var(--background-color) 0%,
      var(--footer-gradient-1) 40%,
      var(--footer-gradient-2) 60%,
      transparent 100%);
  }

  .footer-link {
    position: relative;
    font-size: 1.125rem; /* text-lg */
    letter-spacing: 0.1em; /* tracking-widest */
    font-weight: 300; /* font-light */
    transition: color 200ms;
    pointer-events: auto;
    color: var(--gray);
  }

  .footer-link:hover {
    color: var(--slate);
  }
</style>