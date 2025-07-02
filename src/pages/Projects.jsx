import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
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

          <h2 className="text-base sm:text-base md:text-xl xl:text-xl font-gambetta italic pt-1 pb-4">
            I like building things
          </h2>

            <Card
              title="DoomSpray"
              description="An Arduino hardware solution combined with a personalised blocking algorithm that prevents doom scrolling."
              tech={['React', 'Node.js', 'MongoDB', 'Gemini', 'Tailwind']}
              github="https://github.com/jam-hacks-doomsprayer"
              site=""
              youtube="https://www.youtube.com/watch?v=w-p5MwtdOAA&feature=youtu.be" 
            />

            <Card
              title="FlareRed"
              description="Women's travel safety app, disguised as a health application, that provides real-time location sharing to emergency contacts"
              tech={['Figma', 'Tailwind', 'HTML', 'JavaScript', 'Lottie']}
              github="https://github.com/aadya-khanna/FlareRed"
              site="https://flarered.vercel.app"
              youtube="" 
            />

            <Card
              title="PetIt"
              description="Interactive pet chatbots that are fun to talk to (and create)!"
              tech={['Cohere', 'Tailwind', 'HTML', 'Node.js', 'Express']}
              github="https://github.com/aadya-khanna/underground"
              site=""
              youtube="" 
            />

            <Card
              title="Hazard"
              description="Web based chrome extension that reads Amazon's products for personal allergens and displays whats consumable for the user."
              tech={['Figma', 'Lottie', 'HTML/CSS']}
              github="https://github.com/RussianDraco/hazard"
              site=""
              youtube="" 
            />

        </div>
        <Footer />
      </main>
    </div>
  );
}