export function Hero() {
  return (
    <section
      id="section-00"
      className="min-h-screen flex items-center justify-center px-6 py-12 relative xl:ml-12"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="space-y-16">
          <div className="space-y-12">
            <div className="text-xs font-light text-gray-400 dark:text-gray-600 tracking-widest uppercase">
              00
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tighter text-gray-900 dark:text-gray-100">
              Aaron Kantrowitz
            </h1>
            <div className="w-32 h-px bg-gray-900 dark:bg-gray-100 mx-auto"></div>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
              Developer, digital strategist, and technology consultant working
              with leading brands and organizations to build exceptional digital
              experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-base text-gray-500 dark:text-gray-500 font-light">
              <span>Currently available for new projects</span>
              <span className="hidden sm:block">•</span>
              <span>Based in the United States</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
