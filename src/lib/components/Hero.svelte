<script>
  import AsciiMorphIndicator from './AsciiMorphIndicator.svelte';
</script>

<section id="section-00" class="hero-section">
  <div class="hero-content">
    <div class="header-group">
      <div class="section-number">00</div>

      <h1 class="hero-title">Aaron Kantrowitz</h1>

      <div class="divider"></div>
    </div>

    <div class="bio-group">
      <p class="hero-bio">
        I turn ideas into experiences. Building bridges between thought and
        reality, leading teams to create work that matters.
      </p>
    </div>

    <div class="footer-group">
      <span>Founder and CEO, AI Consultant</span>
      <span class="separator">•</span>
      <span>Based in San Diego, California</span>
    </div>
  </div>

  <!-- AI-inspired, minimal ASCII morph indicator - responsive positioning -->
  <div class="indicator-wrapper" aria-hidden="true">
    <AsciiMorphIndicator />
  </div>
</section>

<style>
  .hero-section {
    height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    padding: 4rem 1.5rem 5rem; /* pt-16 pb-20 px-6 */
  }

  @media (min-width: 640px) {
    .hero-section {
      max-height: 100vh;
      padding: 2rem 1rem; /* sm:py-8 sm:px-4 */
    }
  }

  @media (min-width: 768px) {
    .hero-section {
      padding: 3rem 2rem; /* md:py-12 md:px-8 */
    }
  }

  @media (min-width: 1024px) {
    .hero-section {
      padding-left: 6rem;
      padding-right: 6rem; /* lg:px-24 */
    }
  }

  .hero-content {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 1rem; /* space-y-4 */
  }

  @media (min-width: 640px) {
    .hero-content {
      max-width: 768px; /* sm:max-w-screen-md */
      gap: 2rem; /* sm:space-y-8 */
    }
  }

  @media (min-width: 768px) {
    .hero-content {
      gap: 3rem; /* md:space-y-12 */
    }
  }

  .header-group {
    display: flex;
    flex-direction: column;
    gap: 1rem; /* space-y-4 */
  }

  @media (min-width: 640px) {
    .header-group {
      gap: 2rem; /* sm:space-y-8 */
    }
  }

  .section-number {
    font-size: 0.75rem; /* text-xs */
    font-weight: 300; /* font-light */
    letter-spacing: 0.1em; /* tracking-widest */
    text-transform: uppercase;
    color: var(--gray);
  }

  .hero-title {
    font-weight: 300; /* font-light */
    letter-spacing: -0.05em; /* tracking-tighter */
    color: var(--text-color);
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.1;
  }

  @media (min-width: 640px) {
    .hero-title {
      font-size: clamp(2.5rem, 5vw, 6rem);
    }
  }

  @media (min-width: 768px) {
    .hero-title {
      font-size: clamp(3rem, 4vw, 5rem);
    }
  }

  @media (min-width: 1024px) {
    .hero-title {
      font-size: clamp(3.5rem, 3vw, 4.5rem);
    }
  }

  .divider {
    width: 8rem; /* w-32 */
    height: 1px; /* h-px */
    margin: 0 auto;
    background-color: var(--slate);
  }

  .bio-group {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    /* space-y-3 replaced by gap in parent if needed, but it's a single p wrapper */
  }

  @media (min-width: 640px) {
    .bio-group {
      max-width: 64rem; /* sm:max-w-5xl */
    }
  }

  .hero-bio {
    font-weight: 400; /* font-normal */
    line-height: 1.625; /* leading-relaxed */
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    color: var(--dark-gray);
    font-size: clamp(1rem, 2.8vw, 1.3rem);
  }

  @media (min-width: 640px) {
    .hero-bio {
      max-width: 56rem; /* sm:max-w-4xl */
      font-size: clamp(1.1rem, 2.5vw, 2rem);
    }
  }

  .footer-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 300; /* font-light */
    color: var(--gray);
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
    gap: 0.375rem;
  }

  @media (min-width: 640px) {
    .footer-group {
      flex-direction: row;
      font-size: clamp(0.85rem, 1.6vw, 1rem);
      gap: 0.75rem;
    }
  }

  .separator {
    display: none;
  }

  @media (min-width: 640px) {
    .separator {
      display: block;
    }
  }

  .indicator-wrapper {
    position: absolute;
    bottom: 4rem; /* bottom-16 */
    left: 50%;
    transform: translateX(-50%) scale(0.75);
    user-select: none;
  }

  @media (min-width: 640px) {
    .indicator-wrapper {
      bottom: 2rem; /* sm:bottom-8 */
      transform: translateX(-50%) scale(0.85);
    }
  }

  @media (min-width: 768px) {
    .indicator-wrapper {
      bottom: 3rem; /* md:bottom-12 */
      transform: translateX(-50%) scale(0.9);
    }
  }

  @media (min-width: 1024px) {
    .indicator-wrapper {
      bottom: 4rem; /* lg:bottom-16 */
      transform: translateX(-50%) scale(1);
    }
  }
</style>
