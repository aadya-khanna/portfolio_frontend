import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Experience() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark">
      <Header />
      <main className="flex flex-col min-h-[calc(100vh-header-height)]"> 
        <div className="items-center md:items-start text-center justify-center">
          <p className="text-lg sm:text-lg md:text-xl 2xl:text-2xl font-plein">
            <a href="about" className="hover:text-accent"> about </a> | 
            <a href="projects" className="hover:text-accent"> projects </a> | 
            <a href="experience" className='text-accent'> experience </a> |
            <a href="misc" className='hover:text-accent'> misc. </a>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center pt-6">
          <h1 className="font-gambetta font-semibold text-2xl sm:text-2xl md:text-3xl lg:text-3xl">
            experience
          </h1>

          <div className="sm:w-full md:w-5/12 pt-10 px-4 md:px-0 pb-10">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-3">
                <img
                  src="/stabl.jpeg" 
                  alt="STaBL Foundation Logo"
                  className="h-6 w-6 mt-1 object-contain"
                />

                <h2 className="text-lg font-plein">
                  <span className="font-medium">Summer Intern</span> @ 
                  <span className="italic hover:text-accent">
                    <a href="https://stablfoundation.org/" target="_blank" rel="noopener noreferrer">
                      STaBL Foundation
                    </a>
                  </span>
                </h2>
              </div>
              <h2 className="text-lg font-plein"> 2025</h2> 
            </div>
            <h2 className="text-lg font-plein pt-2"> building a financial literacy app for middle-schoolers using ELM </h2>

            <div className="flex justify-between items-start gap-4 pt-10">
              <div className="flex items-start gap-3">
                <img
                  src="/eureka.png" 
                  alt="Eureka Hacks Logo"
                  className="h-6 w-6 mt-1 object-contain"
                />

                <h2 className="text-lg font-plein">
                  <span className="font-medium">Director of Logistics </span> @ 
                  <span className="italic hover:text-accent">
                    <a href="https://eurekahacks.ca" target="_blank" rel="noopener noreferrer">
                      EurekaHACKS
                    </a>
                  </span>
                </h2>
              </div>
              <h2 className="text-lg font-plein"> 2024-25</h2>
            </div>
            <h2 className="text-lg font-plein pt-2"> making EurekaHACKS the coolest highschool hackathon in Canada </h2>

            <div className="flex justify-between items-start gap-4 pt-10">
              <div className="flex items-start gap-3">
                <img
                  src="/wit.png" 
                  alt="APHS Women in Tech Logo"
                  className="h-6 w-6 mt-1 object-contain"
                />

                <h2 className="text-lg font-plein">
                  <span className="font-medium">Founder </span> @ 
                  <span className="italic">
          
                      APHS Women in Tech
                   
                  </span>
                </h2>
              </div>
              <h2 className="text-lg font-plein"> 2024-25</h2>
            </div>
            <h2 className="text-lg font-plein pt-2"> creating a safe and inclusive community for girlies interested technology </h2>
            
          </div>
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </main>
    </div>
  );
}