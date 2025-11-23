<script>
  import AsciiMorphIndicator from './AsciiMorphIndicator.svelte';
</script>

<section
  id="section-00"
  class="h-[100dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-4 md:px-8 lg:px-24 pt-16 pb-20 sm:py-8 md:py-12 overflow-auto"
>
  <div class="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
    <div class="space-y-4 sm:space-y-8">
      <div
        class="text-xs font-light tracking-widest uppercase"
        style="color: var(--gray)"
      >
        00
      </div>

      <h1
        class="font-light tracking-tighter text-[clamp(2rem,5vw,3.5rem)] sm:text-[clamp(2.5rem,5vw,6rem)] md:text-[clamp(3rem,4vw,5rem)] lg:text-[clamp(3.5rem,3vw,4.5rem)]"
        style="color: var(--text-color)"
      >
        Aaron Kantrowitz
      </h1>

      <div
        class="w-32 h-px mx-auto"
        style="background-color: var(--slate)"
      ></div>
    </div>

    <div class="space-y-3 max-w-full sm:max-w-5xl mx-auto">
      <p
        class="font-normal leading-relaxed text-[clamp(1rem,2.8vw,1.3rem)] sm:text-[clamp(1.1rem,2.5vw,2rem)] max-w-full sm:max-w-4xl mx-auto"
        style="color: var(--dark-gray)"
      >
        I turn ideas into experiences. Building bridges between thought and
        reality, leading teams to create work that matters.
      </p>
    </div>

    <div
      class="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-[clamp(0.95rem,1.8vw,1.1rem)] sm:text-[clamp(1rem,2vw,1.3rem)] font-light"
      style="color: var(--gray)"
    >
      <span>Orchestrator of Human and AI Systems</span>
      <span class="hidden sm:block">•</span>
      <span>Based in San Diego, California</span>
    </div>
  </div>

  <!-- AI-inspired, minimal ASCII morph indicator - responsive positioning -->
  <div
    class="absolute bottom-16 left-1/2 transform -translate-x-1/2 select-none
           sm:bottom-8 md:bottom-12 lg:bottom-16
           scale-75 sm:scale-85 md:scale-90 lg:scale-100"
    aria-hidden="true"
  >
    <AsciiMorphIndicator />
  </div>
</section>
