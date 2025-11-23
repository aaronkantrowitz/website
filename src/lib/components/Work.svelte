<script lang="ts">
  import { getSortedSlides } from '$lib/data';

  const sortedSlides = getSortedSlides();
</script>

{#each sortedSlides as slide, index (slide.id)}
  {#if slide.type === 'intro'}
    <section
      id={slide.id}
      class="slide-section intro-slide"
    >
      <div class="slide-content">
        <div class="header-group intro-header">
          <h2 class="slide-title intro-title">
            {slide.title}
          </h2>
          <div class="divider"></div>
        </div>
        <p class="slide-description intro-description">
          {slide.description}
        </p>
      </div>
    </section>
  {:else if slide.type === 'project'}
    {@const sectionNumber = String(index).padStart(2, '0')}
    <section
      id={slide.id}
      class="slide-section"
    >
      <div class="slide-content">
        <div class="header-group">
          <div class="section-label">
            {sectionNumber} Project
          </div>
          <h3 class="slide-title">
            {slide.company}
          </h3>
          {#if slide.role}
            <div class="slide-role">
              {slide.role}
            </div>
          {/if}
          <div class="divider sm-divider"></div>
        </div>
        {#if slide.description}
          <div class="slide-description">
            {slide.description}
          </div>
        {/if}
      </div>
    </section>
  {:else if slide.type === 'organization'}
    {@const sectionNumber = String(index).padStart(2, '0')}
    <section
      id={slide.id}
      class="slide-section"
    >
      <div class="slide-content">
        <div class="header-group">
          <div class="section-label">
            {sectionNumber} Organization
          </div>
          <h3 class="slide-title">
            {slide.company}
          </h3>
          {#if slide.role}
            <div class="slide-role">
              {slide.role}
            </div>
          {/if}
          <div class="divider sm-divider"></div>
        </div>
        {#if slide.description}
          <div class="slide-description">
            {slide.description}
          </div>
        {/if}
      </div>
    </section>
  {:else if slide.type === 'article'}
    {@const sectionNumber = String(index).padStart(2, '0')}
    <section
      id={slide.id}
      class="slide-section"
    >
      <div class="slide-content">
        <div class="header-group">
          <div class="section-label">
            {sectionNumber} Article
          </div>
          <a
            href={slide.link}
            target="_blank"
            rel="noopener noreferrer"
            class="slide-title article-link"
          >
            {slide.title}
          </a>
          <div class="divider sm-divider"></div>
        </div>
      </div>
    </section>
  {/if}
{/each}

<style>
  .slide-section {
    height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    padding: 4rem 1.5rem 5rem;
    background-color: transparent;
  }

  .intro-slide {
    background-color: var(--tone);
  }

  @media (min-width: 640px) {
    .slide-section {
      max-height: 100vh;
      padding: 2rem 1rem;
    }
  }

  @media (min-width: 768px) {
    .slide-section {
      padding: 3rem 2rem;
    }
  }

  @media (min-width: 1024px) {
    .slide-section {
      padding-left: 6rem;
      padding-right: 6rem;
    }
  }

  .slide-content {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .slide-content {
      max-width: 768px;
      gap: 2rem;
    }
  }

  @media (min-width: 768px) {
    .slide-content {
      gap: 3rem;
    }
  }

  .header-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .intro-header {
    gap: 3rem; /* space-y-12 */
  }

  @media (min-width: 640px) {
    .header-group {
      gap: 2rem;
    }
  }

  .section-label {
    font-size: 0.75rem;
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gray);
  }

  .slide-title {
    font-weight: 300;
    letter-spacing: -0.05em;
    color: var(--text-color);
    line-height: 1.1;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }

  .intro-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
  }

  .article-link {
      display: block;
      color: var(--riso);
      letter-spacing: -0.025em;
      font-size: clamp(1rem, 2.8vw, 1.3rem);
  }
  
  .article-link:hover {
      text-decoration: underline;
  }

  @media (min-width: 640px) {
    .slide-title {
      font-size: clamp(2rem, 5vw, 5rem);
    }
    .intro-title {
        font-size: clamp(2.5rem, 5vw, 6rem);
    }
    .article-link {
        font-size: clamp(1.1rem, 2.5vw, 2rem);
    }
  }

  @media (min-width: 768px) {
    .slide-title {
      font-size: clamp(2.2rem, 4vw, 4rem);
    }
    .intro-title {
        font-size: clamp(3rem, 4vw, 5rem);
    }
  }

  @media (min-width: 1024px) {
    .slide-title {
      font-size: clamp(2.5rem, 3vw, 3.5rem);
    }
    .intro-title {
        font-size: clamp(3.5rem, 3vw, 4.5rem);
    }
  }

  .slide-role {
    font-weight: 500;
    color: var(--gray);
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  }

  @media (min-width: 640px) {
    .slide-role {
      font-size: clamp(1rem, 2vw, 1.3rem);
    }
  }

  .divider {
    width: 8rem;
    height: 1px;
    margin: 0 auto;
    background-color: var(--slate);
  }

  .sm-divider {
      width: 6rem; /* w-24 */
  }

  .slide-description {
    font-weight: 400;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    color: var(--dark-gray);
    font-size: clamp(1rem, 2.8vw, 1.3rem);
  }

  .intro-description {
      line-height: 1.625;
      max-width: 56rem; /* sm:max-w-4xl */
  }

  @media (min-width: 640px) {
    .slide-description {
      max-width: 48rem; /* sm:max-w-3xl */
      font-size: clamp(1.1rem, 2.5vw, 2rem);
    }
  }
</style>