import Header from '../components/Header';
import Footer from '../components/Footer';
import 'remixicon/fonts/remixicon.css';

export default function Projects() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark">
      <Header />
      <main className="flex flex-col min-h-[calc(100vh-header-height)]"> 
        <div className="items-center md:items-start text-center justify-center">
          <p className="text-lg sm:text-lg md:text-xl 2xl:text-2xl font-plein">
            <a href="about" className="hover:text-accent"> about </a> | 
            <a href="projects" className="text-accent"> projects </a> | 
            <a href="experience" className='hover:text-accent'> experience </a> |
            <a href="misc" className='hover:text-accent'> misc. </a>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center pt-6">
          <h1 className="font-gambetta font-semibold text-2xl sm:text-2xl md:text-3xl lg:text-3xl">
            projects
          </h1>

          <h2 className="text-base sm:text-base md:text-xl xl:text-xl font-gambetta italic pt-1 pb-10">
            I like creating things
          </h2>

          <div className="sm:w-full md:w-5/12 pt-4 px-4 md:px-0 pb-10">
            {/* What I'm Building Currently Section */}
            <h2 className="text-xl font-gambetta font-medium text-left pb-8">
             currently
            </h2>

            <div className="pb-10">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-plein font-medium">📊 PRISM</h3>
                  <div className="flex items-center gap-2 text-xl">
                    <a href="https://github.com/aadya-khanna/PRISM" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      <i className="ri-github-line" />
                    </a>
                  </div>
                </div>
                <h3 className="text-lg font-plein">2025</h3>
              </div>
              <p className="text-base font-plein pt-2">portfolio research & insight simulation model</p>
            </div>

            <p className="text-base font-plein italic pb-10">+ 1 more in ideation</p>

            <div className="border-t border-foreground/30 dark:border-foreground-dark/30 pt-10">
              <h2 className="text-xl font-gambetta font-medium text-left pb-8">
                previously
              </h2>

              {/* Financial Literacy App */}
              <div className="pb-10">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-plein font-medium">💰 Financial Literacy App</h3>
                  <h3 className="text-lg font-plein">2025</h3>
                </div>
                <p className="text-base font-plein pt-2">building a financial literacy app for middle-schoolers using ELM</p>
                <p className="text-base font-plein pt-1 text-foreground/70 dark:text-foreground-dark/70">@ McMaster Start Coding</p>
              </div>

              {/* Ady's Winter Adventure */}
              <div className="pb-10">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-plein font-medium">🛷 Ady's Winter Adventure</h3>
                    <div className="flex items-center gap-2 text-xl">
                      <a href="https://stablfoundation.org/NewYearsMystery.html" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        <i className="ri-global-line" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-lg font-plein">2024</h3>
                </div>
                <p className="text-base font-plein pt-2">story-based game about a Ady's suspicious plans on Christmas</p>
                <p className="text-base font-plein pt-1 text-foreground/70 dark:text-foreground-dark/70">@ STaBL Foundation</p>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-auto">
        <Footer />
        </div>
      </main>
    </div>
  );
}