<script lang="ts">
  import { getSortedSlides } from '$lib/data';
  
  const sortedSlides = getSortedSlides();
</script>

{#each sortedSlides as slide, index (slide.id)}
  {#if slide.type === 'intro'}
    <section
      id={slide.id}
      class="h-[100dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-4 md:px-8 lg:px-24 pt-16 pb-20 sm:py-8 md:py-12 overflow-auto"
      style="background-color: var(--tone)"
    >
      <div class="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
        <div class="space-y-12">
          <h2
            class="font-light tracking-tighter text-[clamp(2rem,5vw,3.5rem)] sm:text-[clamp(2.5rem,5vw,6rem)] md:text-[clamp(3rem,4vw,5rem)] lg:text-[clamp(3.5rem,3vw,4.5rem)]"
            style="color: var(--text-color)"
          >
            {slide.title}
          </h2>
          <div
            class="w-32 h-px mx-auto"
            style="background-color: var(--slate)"
          ></div>
        </div>
        <p
          class="font-normal leading-relaxed max-w-full sm:max-w-4xl mx-auto text-[clamp(1rem,2.8vw,1.3rem)] sm:text-[clamp(1.1rem,2.5vw,2rem)]"
          style="color: var(--dark-gray)"
        >
          {slide.description}
        </p>
      </div>
    </section>
  {:else if slide.type === 'project'}
    {@const sectionNumber = String(index).padStart(2, '0')}
    <section
      id={slide.id}
      class="h-[100dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-4 md:px-8 lg:px-24 pt-16 pb-20 sm:py-8 md:py-12 overflow-auto bg-transparent"
    >
      <div class="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
        <div class="space-y-4 sm:space-y-8">
          <div
            class="text-xs font-light tracking-widest uppercase"
            style="color: var(--gray)"
          >
            {sectionNumber} Project
          </div>
          <h3
            class="font-light tracking-tighter text-[clamp(1.5rem,4vw,2.5rem)] sm:text-[clamp(2rem,5vw,5rem)] md:text-[clamp(2.2rem,4vw,4rem)] lg:text-[clamp(2.5rem,3vw,3.5rem)]"
            style="color: var(--text-color)"
          >
            {slide.company}
          </h3>
          {#if slide.role}
            <div
              class="font-medium text-[clamp(0.95rem,1.8vw,1.1rem)] sm:text-[clamp(1rem,2vw,1.3rem)]"
              style="color: var(--gray)"
            >
              {slide.role}
            </div>
          {/if}
          <div
            class="w-24 h-px mx-auto"
            style="background-color: var(--slate)"
          ></div>
        </div>
        {#if slide.description}
          <div
            class="font-normal max-w-full sm:max-w-3xl mx-auto text-[clamp(1rem,2.8vw,1.3rem)] sm:text-[clamp(1.1rem,2.5vw,2rem)]"
            style="color: var(--dark-gray)"
          >
            {slide.description}
          </div>
        {/if}
      </div>
    </section>
  {:else if slide.type === 'organization'}
    {@const sectionNumber = String(index).padStart(2, '0')}
    <section
      id={slide.id}
      class="h-[100dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-4 md:px-8 lg:px-24 pt-16 pb-20 sm:py-8 md:py-12 overflow-auto bg-transparent"
    >
      <div class="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
        <div class="space-y-4 sm:space-y-8">
          <div
            class="text-xs font-light tracking-widest uppercase"
            style="color: var(--gray)"
          >
            {sectionNumber} Organization
          </div>
          <h3
            class="font-light tracking-tighter text-[clamp(1.5rem,4vw,2.5rem)] sm:text-[clamp(2rem,5vw,5rem)] md:text-[clamp(2.2rem,4vw,4rem)] lg:text-[clamp(2.5rem,3vw,3.5rem)]"
            style="color: var(--text-color)"
          >
            {slide.company}
          </h3>
          {#if slide.role}
            <div
              class="font-medium text-[clamp(0.95rem,1.8vw,1.1rem)] sm:text-[clamp(1rem,2vw,1.3rem)]"
              style="color: var(--gray)"
            >
              {slide.role}
            </div>
          {/if}
          <div
            class="w-24 h-px mx-auto"
            style="background-color: var(--slate)"
          ></div>
        </div>
        {#if slide.description}
          <div
            class="font-normal max-w-full sm:max-w-3xl mx-auto text-[clamp(1rem,2.8vw,1.3rem)] sm:text-[clamp(1.1rem,2.5vw,2rem)]"
            style="color: var(--dark-gray)"
          >
            {slide.description}
          </div>
        {/if}
      </div>
    </section>
  {:else if slide.type === 'article'}
    {@const sectionNumber = String(index).padStart(2, '0')}
    <section
      id={slide.id}
      class="h-[100dvh] sm:max-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-4 md:px-8 lg:px-24 pt-16 pb-20 sm:py-8 md:py-12 overflow-auto bg-transparent"
    >
      <div class="max-w-full sm:max-w-screen-md w-full mx-auto text-center flex flex-col justify-center flex-1 space-y-4 sm:space-y-8 md:space-y-12">
        <div class="space-y-4 sm:space-y-8">
          <div
            class="text-xs font-light tracking-widest uppercase"
            style="color: var(--gray)"
          >
            {sectionNumber} Article
          </div>
          <a
            href={slide.link}
            target="_blank"
            rel="noopener noreferrer"
            class="block font-light tracking-tight hover:underline text-[clamp(1rem,2.8vw,1.3rem)] sm:text-[clamp(1.1rem,2.5vw,2rem)]"
            style="color: var(--riso)"
          >
            {slide.title}
          </a>
          <div
            class="w-24 h-px mx-auto"
            style="background-color: var(--slate)"
          ></div>
        </div>
      </div>
    </section>
  {/if}
{/each}
