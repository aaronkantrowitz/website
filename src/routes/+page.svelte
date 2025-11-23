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
        '  Orchestrator of Human and AI Systems\n',
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
    <title>Aaron Kantrowitz | Orchestrator of Human and AI Systems</title>
    <meta name="description" content="Aaron Kantrowitz is an Orchestrator of Human and AI Systems who turns ideas into experiences. Expert in engineering, strategy, and leading teams to create meaningful work for top brands and startups." />
    <meta name="keywords" content="Aaron Kantrowitz, CTO, digital strategist, product leader, engineering, technology consultant, digital experiences, Spacebox Digital, Stealth Startup, US-based developer" />
    <meta name="author" content="Aaron Kantrowitz" />
    
    <meta property="og:title" content="Aaron Kantrowitz | Orchestrator of Human and AI Systems" />
    <meta property="og:description" content="Orchestrator of Human and AI Systems. Leading teams to create work that matters." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://aaronkantrowitz.com/" />
    <meta property="og:site_name" content="Aaron Kantrowitz" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Aaron Kantrowitz | Orchestrator of Human and AI Systems" />
    <meta name="twitter:description" content="Aaron Kantrowitz is an Orchestrator of Human and AI Systems who turns ideas into experiences. Expert in engineering, strategy, and leading teams to create meaningful work for top brands and startups." />
</svelte:head>

<Navigation />
<div class="fixed inset-0 overflow-hidden">
  <div class="relative w-full h-full">
    <Hero />
    <Work />
    <Footer />
  </div>
</div>
