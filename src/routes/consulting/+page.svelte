<script lang="ts">
  const currentYear = new Date().getFullYear();

  let formData = $state({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  let isSubmitting = $state(false);
  let submitStatus: 'idle' | 'success' | 'error' = $state('idle');

  async function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitting = true;

    // For now, just show success - you can add your form handler later
    // (e.g., Formspree, Netlify Forms, or custom API)
    await new Promise(resolve => setTimeout(resolve, 500));
    submitStatus = 'success';
    isSubmitting = false;
  }
</script>

<svelte:head>
  <title>Aaron Kantrowitz | AI Engineering & Automation Consultant</title>
  <meta name="description" content="AI engineering and automation consulting for companies ready to ship. LLM integration, AI agents, workflow automation. Former CTO with Fortune 500 experience." />
  <meta name="keywords" content="AI consultant, AI automation consultant, AI engineer consultant, LLM integration, AI agent development, workflow automation, San Diego AI consultant" />
  <meta name="author" content="Aaron Kantrowitz" />

  <meta property="og:title" content="Aaron Kantrowitz | AI Engineering & Automation Consultant" />
  <meta property="og:description" content="AI engineering and automation consulting for companies ready to ship. LLM integration, AI agents, workflow automation." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://aaronkantrowitz.com/consulting" />
  <meta property="og:site_name" content="Aaron Kantrowitz" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Aaron Kantrowitz | AI Engineering & Automation Consultant" />
  <meta name="twitter:description" content="AI engineering and automation consulting for companies ready to ship. LLM integration, AI agents, workflow automation." />
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
        <div class="hero-photo-wrapper">
          <img src="/IMG_1306.JPG" alt="Aaron Kantrowitz" class="hero-photo" />
        </div>
        <p class="hero-label">AI Engineering & Automation</p>
        <h1 class="hero-headline">For Companies Ready to Ship</h1>
        <p class="hero-subheadline">
          I help businesses implement AI agents, automate workflows, and integrate LLMs into production systems—without the six-month consulting engagement.
        </p>
        <a href="#contact" class="cta-button">
          Book a Call
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- What I Do Section -->
    <section class="services">
      <h2 class="section-title">What I Do</h2>
      <div class="services-grid">
        <div class="service-card">
          <h3 class="service-title">AI Agent Development</h3>
          <p class="service-description">
            Custom agents that actually work in production. From customer service automation to internal workflow orchestration.
          </p>
        </div>
        <div class="service-card">
          <h3 class="service-title">LLM Integration</h3>
          <p class="service-description">
            Connect GPT, Claude, or open-source models to your existing systems. APIs, embeddings, RAG pipelines—built to scale.
          </p>
        </div>
        <div class="service-card">
          <h3 class="service-title">Workflow Automation</h3>
          <p class="service-description">
            Identify the repetitive work killing your team's time. Automate it. Ship it. Move on.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Me Section -->
    <section class="about">
      <h2 class="section-title">Why Me</h2>
      <div class="about-content">
        <p>
          15+ years building and leading engineering teams. Former CTO. Founded and exited a profitable tech consultancy. Managed $50M+ technical programs for Fortune 500 clients including Home Depot and Thermo Fisher Scientific.
        </p>
        <p class="about-emphasis">
          I've built AI into production systems. I know what breaks and how to fix it.
        </p>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="process">
      <h2 class="section-title">How It Works</h2>
      <div class="process-steps">
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <h3 class="step-title">Discovery Call</h3>
            <p class="step-description">
              30 minutes. You tell me what's broken or what you want to build. I tell you if I can help.
            </p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <h3 class="step-title">Scoped Engagement</h3>
            <p class="step-description">
              Fixed scope. Fixed timeline. No open-ended retainers. Typical projects run 2-6 weeks.
            </p>
          </div>
        </div>
        <div class="step">
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
      <h2 class="section-title">Let's Talk</h2>
      <p class="contact-intro">One project at a time. Limited availability.</p>

      {#if submitStatus === 'success'}
        <div class="success-message">
          <p>Thanks for reaching out. I'll get back to you soon.</p>
        </div>
      {:else}
        <form class="contact-form" onsubmit={handleSubmit}>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              autocomplete="name"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              autocomplete="email"
            />
          </div>
          <div class="form-group">
            <label for="company">Company</label>
            <input
              type="text"
              id="company"
              bind:value={formData.company}
              autocomplete="organization"
            />
          </div>
          <div class="form-group">
            <label for="message">What are you trying to solve?</label>
            <textarea
              id="message"
              bind:value={formData.message}
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
  }

  .hero-photo-wrapper::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid var(--riso);
    opacity: 0.4;
  }

  .hero-photo-wrapper::after {
    content: '';
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 1px dashed var(--ivory-dark);
    opacity: 0.6;
  }

  .hero-photo {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--ivory-dark);
    position: relative;
    z-index: 1;
  }

  @media (min-width: 640px) {
    .hero-photo {
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
    transition: all 200ms;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .cta-button:hover {
    background-color: var(--riso);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(94, 126, 223, 0.25);
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
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
    }
  }

  .service-card {
    text-align: center;
    padding: 1.5rem 1rem;
    border-radius: 0.5rem;
    transition: background-color 200ms;
  }

  .service-card:hover {
    background-color: var(--ivory-med);
  }

  .service-title {
    font-size: 1.125rem;
    font-weight: 400;
    color: var(--text-color);
    margin-bottom: 0.75rem;
  }

  .service-description {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--dark-gray);
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
    transition: all 200ms;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .submit-button:hover:not(:disabled) {
    background-color: var(--riso);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(94, 126, 223, 0.25);
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
</style>
