<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';

  const currentYear = new Date().getFullYear();

  let isSubmitting = $state(false);
  let submitStatus: 'idle' | 'success' | 'error' = $state('idle');
  let errorMessage = $state('');

  // Intersection Observer for scroll animations
  onMount(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>Aaron Kantrowitz | Full-Stack & AI Engineering Consulting</title>
  <meta name="description" content="Aaron Kantrowitz - Full-stack engineer specializing in AI/LLM integration, multi-agent systems, and production software. React, Svelte, Python, TypeScript." />
  <meta name="keywords" content="AI consultant, full-stack engineer, LLM integration, multi-agent systems, LangGraph, React, Svelte, Python, TypeScript, San Diego developer" />
  <meta name="author" content="Aaron Kantrowitz" />

  <meta property="og:title" content="Aaron Kantrowitz | Full-Stack & AI Engineering Consulting" />
  <meta property="og:description" content="Full-stack engineer specializing in AI/LLM integration, multi-agent systems, and production software. React, Svelte, Python, TypeScript." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://aaronkantrowitz.com/consulting" />
  <meta property="og:site_name" content="Aaron Kantrowitz" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Aaron Kantrowitz | Full-Stack & AI Engineering Consulting" />
  <meta name="twitter:description" content="Full-stack engineer specializing in AI/LLM integration, multi-agent systems, and production software. React, Svelte, Python, TypeScript." />
</svelte:head>

<div class="page-wrapper">
  <!-- Back to home link -->
  <a href="/" class="back-link" aria-label="Back to home">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>

  <main class="consulting-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-photo-wrapper hero-animate" style="--delay: 0">
          <img src="/IMG_1306.JPG" alt="Aaron Kantrowitz" class="hero-photo" />
        </div>
        <p class="hero-label hero-animate" style="--delay: 1">Full-Stack & AI Engineering</p>
        <h1 class="hero-headline hero-animate" style="--delay: 2">For Companies Ready to Ship</h1>
        <p class="hero-subheadline hero-animate" style="--delay: 3">
          AI agents, LLM integration, full-stack development - built for production, not PowerPoint.
        </p>
        <a href="#contact" class="cta-button hero-animate" style="--delay: 4">
          Book a Call
          <svg class="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- What I Do Section -->
    <section class="services">
      <h2 class="section-title animate-on-scroll">What I Do</h2>
      <div class="services-grid services-grid-4">
        <div class="service-card animate-on-scroll" style="--stagger: 0">
          <h3 class="service-title">AI & LLM Integration</h3>
          <p class="service-description">
            Multi-agent orchestration with LangGraph. Claude, GPT, Perplexity - matched to the task. Production systems, not prototypes.
          </p>
        </div>
        <div class="service-card animate-on-scroll" style="--stagger: 1">
          <h3 class="service-title">Full-Stack Development</h3>
          <p class="service-description">
            React, Svelte, Swift on the frontend. Python, TypeScript, Node on the backend. I build the whole thing.
          </p>
        </div>
        <div class="service-card animate-on-scroll" style="--stagger: 2">
          <h3 class="service-title">Cloud & Infrastructure</h3>
          <p class="service-description">
            AWS, Cloudflare, Fly.io, Vercel. CI/CD, Docker, cost optimization. The boring stuff that keeps systems running.
          </p>
        </div>
        <div class="service-card animate-on-scroll" style="--stagger: 3">
          <h3 class="service-title">Workflow Automation</h3>
          <p class="service-description">
            Find the repetitive work killing your team's time. Automate it. Ship it. Move on.
          </p>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="tech-stack">
      <h2 class="section-title animate-on-scroll">Tech Stack</h2>
      <div class="stack-grid animate-on-scroll">
        <div class="stack-row">
          <span class="stack-label">Frontend</span>
          <span class="stack-items">React, Svelte, SvelteKit, Swift/SwiftUI, TypeScript</span>
        </div>
        <div class="stack-row">
          <span class="stack-label">Backend</span>
          <span class="stack-items">Python, Node.js, Fastify, GraphQL, PostgreSQL, Hasura</span>
        </div>
        <div class="stack-row">
          <span class="stack-label">AI/ML</span>
          <span class="stack-items">LangGraph, Claude API, Perplexity, OpenAI Whisper, Vision Transformers</span>
        </div>
        <div class="stack-row">
          <span class="stack-label">Infrastructure</span>
          <span class="stack-items">AWS, Cloudflare, Fly.io, Vercel, Docker</span>
        </div>
      </div>
    </section>

    <!-- Why Me Section -->
    <section class="about">
      <h2 class="section-title animate-on-scroll">Why Me</h2>
      <div class="about-content animate-on-scroll">
        <p>
          15+ years shipping production software. Former CTO. Founded and exited a profitable consultancy. Led technical programs for Home Depot, Thermo Fisher, P&G.
        </p>
        <p class="about-emphasis">
          Currently building CapCheck - multi-agent LLM pipelines processing real-time fact verification. I know what breaks because I'm breaking it right now.
        </p>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="process">
      <h2 class="section-title animate-on-scroll">How It Works</h2>
      <div class="process-steps">
        <div class="step animate-on-scroll" style="--stagger: 0">
          <span class="step-number">1</span>
          <div class="step-content">
            <h3 class="step-title">Discovery Call</h3>
            <p class="step-description">
              30 minutes. You tell me what's broken or what you want to build. I tell you if I can help.
            </p>
          </div>
        </div>
        <div class="step animate-on-scroll" style="--stagger: 1">
          <span class="step-number">2</span>
          <div class="step-content">
            <h3 class="step-title">Scoped Engagement</h3>
            <p class="step-description">
              Fixed scope. Fixed timeline. No open-ended retainers. Typical projects run 2-6 weeks.
            </p>
          </div>
        </div>
        <div class="step animate-on-scroll" style="--stagger: 2">
          <span class="step-number">3</span>
          <div class="step-content">
            <h3 class="step-title">Delivered & Documented</h3>
            <p class="step-description">
              You get working systems, not slide decks. Full documentation so your team can maintain it.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <h2 class="section-title animate-on-scroll">Let's Talk</h2>
      <p class="contact-intro animate-on-scroll">One project at a time. Limited availability.</p>

      {#if submitStatus === 'success'}
        <div class="success-message">
          <p>Thanks for reaching out. I'll get back to you soon.</p>
        </div>
      {:else}
        <form
          method="POST"
          class="contact-form"
          use:enhance={() => {
            isSubmitting = true;
            errorMessage = '';

            return async ({ result }) => {
              isSubmitting = false;

              if (result.type === 'success') {
                submitStatus = 'success';
              } else if (result.type === 'failure') {
                errorMessage = (result.data as { error?: string })?.error || 'Something went wrong. Please try again.';
                submitStatus = 'error';
              } else {
                errorMessage = 'Something went wrong. Please try again.';
                submitStatus = 'error';
              }
            };
          }}
        >
          {#if errorMessage}
            <div class="error-message">
              <p>{errorMessage}</p>
            </div>
          {/if}
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              autocomplete="name"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autocomplete="email"
            />
          </div>
          <div class="form-group">
            <label for="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              autocomplete="organization"
            />
          </div>
          <div class="form-group">
            <label for="message">What are you trying to solve?</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" class="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      {/if}

      <div class="contact-alt">
        <p>Or reach out directly:</p>
        <a href="https://linkedin.com/in/aaronkantrowitz" target="_blank" rel="noopener noreferrer" class="contact-link">
          LinkedIn
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>Aaron Kantrowitz</p>
      <p class="footer-location">San Diego, California</p>
      <p class="footer-copyright">&copy; {currentYear}</p>
    </footer>
  </main>
</div>

<style>
  /* Override global slide-based overflow for this page */
  :global(html),
  :global(body) {
    overflow: auto !important;
    height: auto !important;
  }

  .page-wrapper {
    min-height: 100vh;
    background-color: var(--background-color);
  }

  .back-link {
    position: fixed;
    top: 1.5rem;
    left: 1rem;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    color: var(--gray);
    transition: color 200ms, background-color 200ms;
    border-radius: 0.25rem;
  }

  .back-link:hover {
    color: var(--slate);
    background-color: var(--ivory-med);
  }

  .consulting-page {
    max-width: 48rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Hero */
  .hero {
    min-height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 0 4rem;
  }

  .hero-content {
    text-align: center;
  }

  .hero-photo-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 1.5rem;
    width: 5rem;
    height: 5rem;
  }

  .hero-photo-wrapper::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    border: 1px solid var(--riso);
    opacity: 0.4;
  }

  .hero-photo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--ivory-dark);
    position: relative;
    z-index: 1;
  }

  @media (min-width: 640px) {
    .hero-photo-wrapper {
      width: 6rem;
      height: 6rem;
    }
  }

  .hero-label {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray);
    margin-bottom: 1.5rem;
  }

  .hero-headline {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 300;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--text-color);
    margin-bottom: 1.5rem;
  }

  .hero-subheadline {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    line-height: 1.6;
    color: var(--dark-gray);
    max-width: 36rem;
    margin: 0 auto 2.5rem;
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    background-color: var(--slate);
    color: var(--background-color);
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    border-radius: 0.25rem;
    transition: background-color 0.25s ease;
  }

  .cta-button:hover {
    background-color: var(--dark-gray);
  }

  /* Sections */
  .section-title {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray);
    margin-bottom: 2rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .section-title::before,
  .section-title::after {
    content: '';
    width: 2rem;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--ivory-dark));
  }

  .section-title::after {
    background: linear-gradient(to left, transparent, var(--ivory-dark));
  }

  /* Services */
  .services {
    padding: 4rem 0;
    border-top: 1px solid var(--ivory-dark);
  }

  .services-grid {
    display: grid;
    gap: 2rem;
  }

  @media (min-width: 640px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }
  }

  @media (min-width: 900px) {
    .services-grid.services-grid-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .service-card {
    text-align: center;
    padding: 1.5rem 1rem;
    border-radius: 0.375rem;
  }

  .service-title {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  .service-description {
    font-size: 0.875rem;
    line-height: 1.65;
    color: var(--dark-gray);
  }

  @media (min-width: 900px) {
    .services-grid-4 .service-card {
      padding: 1rem 0.75rem;
    }
    .services-grid-4 .service-title {
      font-size: 0.9375rem;
    }
    .services-grid-4 .service-description {
      font-size: 0.8125rem;
    }
  }

  /* Tech Stack */
  .tech-stack {
    padding: 4rem 0;
    border-top: 1px solid var(--ivory-dark);
  }

  .stack-grid {
    max-width: 36rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
    font-size: 0.875rem;
  }

  .stack-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem 1rem;
    background-color: var(--ivory-med);
    border-radius: 0.25rem;
  }

  @media (min-width: 640px) {
    .stack-row {
      flex-direction: row;
      gap: 1.5rem;
      align-items: baseline;
    }
  }

  .stack-label {
    color: var(--gray);
    min-width: 6rem;
    flex-shrink: 0;
    font-weight: 500;
  }

  .stack-items {
    color: var(--text-color);
    line-height: 1.5;
  }

  /* About */
  .about {
    padding: 4rem 0;
    border-top: 1px solid var(--ivory-dark);
  }

  .about-content {
    max-width: 36rem;
    margin: 0 auto;
    text-align: center;
  }

  .about-content p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--dark-gray);
    margin-bottom: 1.5rem;
  }

  .about-emphasis {
    color: var(--text-color);
    font-weight: 400;
  }

  /* Process */
  .process {
    padding: 4rem 0;
    border-top: 1px solid var(--ivory-dark);
  }

  .process-steps {
    max-width: 32rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .step {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .step-number {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--riso);
    border: 1px solid var(--riso);
    border-radius: 50%;
    opacity: 0.8;
  }

  .step-content {
    flex: 1;
  }

  .step-title {
    font-size: 1rem;
    font-weight: 400;
    color: var(--text-color);
    margin-bottom: 0.375rem;
  }

  .step-description {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--dark-gray);
  }

  /* Contact */
  .contact {
    padding: 4rem 0;
    border-top: 1px solid var(--ivory-dark);
  }

  .contact-intro {
    text-align: center;
    color: var(--dark-gray);
    margin-bottom: 2.5rem;
  }

  .contact-form {
    max-width: 28rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .form-group label {
    font-size: 0.8125rem;
    color: var(--gray);
    letter-spacing: 0.02em;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-family: inherit;
    background-color: var(--ivory-med);
    border: 1px solid transparent;
    border-radius: 0.25rem;
    color: var(--text-color);
    transition: border-color 200ms, background-color 200ms;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--gray);
    background-color: var(--background-color);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 6rem;
  }

  .submit-button {
    padding: 0.875rem 1.5rem;
    background-color: var(--slate);
    color: var(--background-color);
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    border-radius: 0.25rem;
    transition: background-color 0.25s ease;
    cursor: pointer;
  }

  .submit-button:hover:not(:disabled) {
    background-color: var(--dark-gray);
  }

  .submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .success-message {
    max-width: 28rem;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    background-color: var(--ivory-med);
    border-radius: 0.25rem;
  }

  .success-message p {
    color: var(--text-color);
  }

  .error-message {
    padding: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    background-color: rgba(217, 119, 87, 0.1);
    border: 1px solid var(--clay);
    border-radius: 0.25rem;
  }

  .error-message p {
    color: var(--clay);
    font-size: 0.875rem;
  }

  .contact-alt {
    margin-top: 2.5rem;
    text-align: center;
  }

  .contact-alt p {
    font-size: 0.875rem;
    color: var(--gray);
    margin-bottom: 0.75rem;
  }

  .contact-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.9375rem;
    color: var(--text-color);
    transition: color 200ms;
  }

  .contact-link:hover {
    color: var(--riso);
  }

  /* Footer */
  .footer {
    padding: 3rem 0;
    text-align: center;
    border-top: 1px solid var(--ivory-dark);
  }

  .footer p {
    font-size: 0.875rem;
    color: var(--gray);
    margin-bottom: 0.25rem;
  }

  .footer-location {
    font-size: 0.8125rem;
  }

  .footer-copyright {
    font-size: 0.75rem;
    margin-top: 1rem;
  }

  /* ========== ANIMATIONS ========== */

  /* Keyframes */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Hero entrance animations - subtle fade up */
  .hero-animate {
    opacity: 0;
    animation: fadeInUp 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
    animation-delay: calc(var(--delay, 0) * 0.1s + 0.15s);
  }

  /* Scroll-triggered animations */
  :global(.animate-on-scroll) {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1),
                transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-delay: calc(var(--stagger, 0) * 0.08s);
  }

  :global(.animate-on-scroll.in-view) {
    opacity: 1;
    transform: translateY(0);
  }

  /* Section title lines animate in */
  .section-title::before,
  .section-title::after {
    transition: width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s;
  }

  :global(.section-title.animate-on-scroll)::before,
  :global(.section-title.animate-on-scroll)::after {
    width: 0;
  }

  :global(.section-title.animate-on-scroll.in-view)::before,
  :global(.section-title.animate-on-scroll.in-view)::after {
    width: 2rem;
  }

  /* Service card - subtle hover */
  .service-card {
    transition: background-color 0.25s ease;
  }

  /* Step - subtle highlight on hover */
  .step-number {
    transition: opacity 0.25s ease;
  }

  .step:hover .step-number {
    opacity: 1;
  }

  /* Form fields - clean focus state */
  .form-group input,
  .form-group textarea {
    transition: border-color 0.25s ease, background-color 0.25s ease;
  }

  /* CTA arrow - subtle shift on hover */
  .cta-arrow {
    transition: transform 0.25s ease;
  }

  .cta-button:hover .cta-arrow {
    transform: translateX(2px);
  }

  /* Contact link - subtle arrow movement */
  .contact-link svg {
    transition: transform 0.25s ease;
  }

  .contact-link:hover svg {
    transform: translate(1px, -1px);
  }

  /* Success/error messages - simple fade */
  .success-message {
    animation: fadeIn 0.4s ease;
  }

  .error-message {
    animation: fadeIn 0.3s ease;
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .hero-animate,
    .success-message,
    .error-message {
      animation: none;
      opacity: 1;
      transform: none;
    }

    :global(.animate-on-scroll) {
      opacity: 1;
      transform: none;
      transition: none;
    }

    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
    }
  }
</style>
