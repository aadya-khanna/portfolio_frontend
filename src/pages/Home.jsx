import Header from '../components/Header';
import Footer from '../components/Footer';
import AadyaSvg from  '../components/AadyaSvg';
import TypedText from '../components/Typed';
import NowPlaying from '../components/NowPlaying';
import { InstagramIcon, LinkedInIcon, GitHubIcon, EmailIcon } from '../components/Icons';
import { useEffect } from 'react';


export default function Home() {
    useEffect(() => {
    // Grab the hash string from URL (without #)
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const state = params.get("state");

    if (accessToken) {
      // Store tokens however you like
      localStorage.setItem("spotify_access_token", accessToken);
      if (refreshToken) localStorage.setItem("spotify_refresh_token", refreshToken);

      // Clean up URL to remove tokens from the address bar
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark">
      <Header />
      <main className="flex flex-col min-h-[calc(100vh-header-height)]"> 
        <div className="flex flex-col md:flex-row items-center justify-center md:items-start px-6 md:px-40 py-12 gap-8 pb-0 flex-grow">
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-gambetta font-semibold">
              Aadya Khanna
            </h1>

            <h2 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl font-gambetta font-medium italic pt-1">
              <TypedText />
            </h2>

            <div className="flex space-x-7 pt-3">
              <a href="https://www.instagram.com/_jazzzba_/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="w-7 h-7 hover:text-accent" />
              </a>
              <a href="https://www.linkedin.com/in/aadya-khanna-050342293/" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="w-7 h-7 hover:text-accent" />
              </a>
              <a href="https://github.com/aadya-khanna" target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="w-7 h-7 hover:text-accent" />
              </a>
              <a href="mailto:a55khann@waterloo.ca">
                <EmailIcon className="w-7 h-7 hover:text-accent" />
              </a>
            </div>

            <p className="text-lg sm:text-lg md:text-xl 2xl:text-2xl pt-4 font-plein">
              <a href="about" className="text-accent"> about </a> | 
              <a href="projects" className='hover:text-accent'> projects </a> | 
              <a href="experience" className='hover:text-accent'> experience </a> |
              <a href="misc" className='hover:text-accent'> misc. </a>
            </p>

            <p className="sm:text-lg md:text-lg lg:text-xl font-plein pt-8 max-w-3xl">
              Hiii! I am Aadya, an incoming computer science and finance (CFM) student @the University of Waterloo. 
              I am a woman of many disciplines, with a passion for creativity and technology. 


            </p>
            
            <p className="sm:text-lg md:text-lg lg:text-xl font-plein pt-8 max-w-3xl">
              I am currently learning DSA, polishing my full-stack skills, and exploring the world of fintech. 
              Feel free to connect with me; I love a good chat!
      
            </p>

            <div className="mb-8 pt-20 w-full flex justify-center md:justify-start">
              <NowPlaying />
            </div>

          </div>

          <div className="hidden md:block md:w-1/3 justify-center items-start h-auto relative">
            <AadyaSvg className="block mx-auto w-80 z-0" />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
