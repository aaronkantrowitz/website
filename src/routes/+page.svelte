<script>
  import { onMount } from 'svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Work from '$lib/components/Work.svelte';
  import Footer from '$lib/components/Footer.svelte';

  onMount(() => {
    console.log(
      '%c' +
        '     ╔═╗ ╦╔═\n' +
        '     ╠═╣ ╠╩╗\n' +
        '     ╩ ╩ ╩ ╩\n' +
        '\n' +
        '  Aaron Kantrowitz\n' +
        '  Founder and CEO, AI Consultant\n',
      'color: #6b7280; font-family: monospace; font-size: 14px; line-height: 1.2;'
    );

    console.log(
      '%cBuilding bridges between imagination and reality',
      'color: #9ca3af; font-style: italic; font-size: 12px;'
    );

    console.log(
      '%c' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '  A      K      A      K     \n' +
        '  A A    K K    A A    K  K  \n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'color: #4b5563; font-family: monospace; font-size: 10px;'
    );
  });
</script>

<svelte:head>
    <title>Aaron Kantrowitz | Founder and CEO, AI Consultant</title>
    <meta name="description" content="Aaron Kantrowitz is an Founder and CEO, AI Consultant who turns ideas into experiences. Expert in engineering, strategy, and leading teams to create meaningful work for top brands and startups." />
    <meta name="keywords" content="Aaron Kantrowitz, CTO, digital strategist, product leader, engineering, technology consultant, digital experiences, Spacebox Digital, Stealth Startup, US-based developer" />
    <meta name="author" content="Aaron Kantrowitz" />

    <meta property="og:title" content="Aaron Kantrowitz | Founder and CEO, AI Consultant" />
    <meta property="og:description" content="Founder and CEO, AI Consultant. Leading teams to create work that matters." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://aaronkantrowitz.com/" />
    <meta property="og:site_name" content="Aaron Kantrowitz" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Aaron Kantrowitz | Founder and CEO, AI Consultant" />
    <meta name="twitter:description" content="Aaron Kantrowitz is an Founder and CEO, AI Consultant who turns ideas into experiences. Expert in engineering, strategy, and leading teams to create meaningful work for top brands and startups." />
</svelte:head>

<Navigation />

<!-- Consulting link - top right corner -->
<a href="/consulting" class="consulting-link">
  <img src="/IMG_1306.JPG" alt="" class="consulting-avatar" />
  Consulting
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M7 17L17 7M17 7H7M17 7v10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</a>

<div class="main-container">
  <div class="content-wrapper">
    <Hero />
    <Work />
    <Footer />
  </div>
</div>

<style>
  .main-container {
    position: fixed;
    inset: 0; /* top: 0; right: 0; bottom: 0; left: 0; */
    overflow: hidden;
  }

  .content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .consulting-link {
    position: fixed;
    top: 1.5rem;
    right: 1rem;
    z-index: 60;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem 0.375rem 0.375rem;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: var(--gray);
    background-color: transparent;
    border: 1px solid var(--ivory-dark);
    border-radius: 2rem;
    transition: color 200ms, background-color 200ms, border-color 200ms;
  }

  .consulting-link:hover {
    color: var(--slate);
    background-color: var(--ivory-med);
    border-color: var(--gray);
  }

  .consulting-avatar {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    object-fit: cover;
  }

  @media (min-width: 640px) {
    .consulting-link {
      right: 1.5rem;
    }
  }
</style>
