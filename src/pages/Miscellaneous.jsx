import Header from '../components/Header';
import Footer from '../components/Footer';
import React from "react";
import AlbumCard from "../components/AlbumCard";
import DesignImageCard from "../components/DesignImageCard";

export default function Misc() {
  const albums = [
    {
      name: "Angelo",
      artist: "Brijean",
      image: "/albums/angelo.jpg",
    },
    {
      name: "Around the Fur",
      artist: "Deftones",
      image: "/albums/aroundthefur.jpeg",
    },
    {
      name: "In Rainbows",
      artist: "Radiohead",
      image: "/albums/inrainbows.jpg",
    },
    {
      name: "Turn on the Bright Lights",
      artist: "Interpol",
      image: "/albums/turnonthebrightlight.jpg",
    },
    {
      name: "The Dark Side of The Moon",
      artist: "Pink Floyd",
      image: "/albums/darksideofthemoon.webp",
    },
    {
      name: "Blood",
      artist: "Lianne La Havas",
      image: "/albums/blood.jpg",
    },
    {
      name: "Parachutes",
      artist: "Coldplay",
      image: "/albums/parachutes.jpg",
    },
    {
      name: "Getz/Gilberto",
      artist: "Stan Getz",
      image: "/albums/getzgilberto.jpg",
    },
    {
      name: "Timeless",
      artist: "Sérgio Mendes",
      image: "/albums/timeless.jpg",
    },
    {
      name: "Boss Guitar",
      artist: "Wes Montgomery",
      image: "/albums/bossguitar.jpeg",
    },
    {
      name: "Turbulence (International)",
      artist: "MONORAL",
      image: "/albums/turbulence.jpg",
    },
    {
      name: "Twilight",
      artist: "bôa",
      image: "/albums/twilight.jpg",
    },
    {
      name: "Hatful of Hollow",
      artist: "The Smiths",
      image: "/albums/hatfulofhollow.webp",
    },
    {
      name: "Zindagi Na Milegi Dobara",
      artist: "Joi Barua",
      image: "/albums/znmd.jpg",
    },
    {
      name: "Queen",
      artist: "Shefali Alvares",
      image: "/albums/queen.jpeg",
    },
    {
      name: "Koi No Yokan",
      artist: "Deftones",
      image: "/albums/koi-no-yokan.jpg",
    },
  ];

  const designImages = [
    {
      src: "/design/aadyacollage.png",
      alt: "Make it Move collage",
      description: "\"Take a break, maybe a trip to the moon will help.\""
    },
    {
      src: "/design/aadyaposter1.png",
      alt: "Poster 1",
      description: "\"Hire me, I'm an amazing personal photographer!\""
    },
    {
      src: "/design/aadyaposter2.png",
      alt: "Poster 2",
      description: "Looking for an expert photographer and editor? You know where to find me..."
    },
    {
      src: "/design/predlogos.png",
      alt: "Predator Logos",
      description: "Who doesn't like a good geometric logo once in a while?"
    },
    {
      src: "/design/predators.png",
      alt: "Predators Brand",
      description: "Props to grade 8 me for this one."
    },
    {
      src: "/design/dum.png",
      alt: "AMONGUS?",
      description: "AMONGUS!?"
    }
  ];

  return (
    <div className="min-h-screen sm:overflow-hidden bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark">
      <Header />
      <main className="flex flex-col min-h-[calc(100vh-header-height)] ">
        <div className="items-center md:items-start text-center justify-center">
          <p className="text-lg sm:text-lg md:text-xl 2xl:text-2xl font-plein">
            <a href="about" className="hover:text-accent"> about </a> |
            <a href="projects" className="hover:text-accent"> projects </a> |
            <a href="experience" className='hover:text-accent'> experience </a> |
            <a href="misc" className='text-accent'> misc. </a>
          </p>

        </div>

        <div className="flex flex-col items-center justify-center pt-6">
            <h1 className="font-gambetta font-semibold text-2xl sm:text-2xl md:text-3xl lg:text-3xl">
                miscellaneous
            </h1>

            <h2 className="text-base sm:text-base md:text-xl xl:text-xl font-gambetta italic pt-1 pb-4">
                !(coding || studying)
            </h2>

            <div className="sm:w-full px-3 sm:px-1 md:w-1/2 pt-10 md:px-1 pb-10">
              <div className="flex justify-between items-start gap-4 px-4">
                  <h2 className="text-2xl font-gambetta font-semibold"> Creative Pursuits </h2>
              </div>

              <div className="flex justify-between items-start gap-4 px-4">
                  <h2 className="text-lg font-plein"> ensuring my creative juices don't run out :) </h2>
              </div>

            {/* Music */}
              <div className="flex justify-between items-start gap-4 pt-10 px-4">
                <h2 className="text-2xl font-gambetta font-medium"> Music </h2>
              </div>

              <div className="flex justify-between items-start gap-4 pt-2 px-4">
                <p className="text-base font-plein"> My musical journey began 10 years ago, but it only became a constant during the pandemic. I've played lead guitar in two different bands (shoutout Mother Goose and Karma) for 5 years. 
                  Musically, I love improvising (jazz, blues and rock are my forte). I have an instagram account @_jazzzba_ where I post covers and explorations. 
                  If you're a fellow music nerd or should I say audiophile, don't hesitate to reach out or even recommend me some new music!
                </p>
              </div>

              <div className="flex justify-between items-start gap-4 px-4 pt-3">
                <p className="text-base font-plein"> <a href ="https://www.instagram.com/_jazzzba_/" target="_blank" className="hover:text-accent"> instagram </a> •  <a href="https://open.spotify.com/user/7j0lfxxldwy3p66ulyp3f44eo?trackId=6LX6modQsxnBouh7yZT6qx" target='_blank' className='hover:text-accent'> spotify  </a>  </p>
              </div>

              <div className="flex justify-between items-start pt-10 gap-4 px-4">
                <p className="text-lg font-plein"> aadya's favourites</p>
              </div>
              <div>
                  <div className="grid px-3 sm:px-0 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-3">
                    
                    {albums.map((album, index) => (
                      <AlbumCard
                        key={index}
                        name={album.name}
                        artist={album.artist}
                        image={album.image}
                      />
                    ))}
                  </div>
              </div>
            

            {/* Reading */}
              <div className="flex justify-between items-start gap-4 pt-10 px-4">
                  <h2 className="text-2xl font-gambetta font-medium"> Read </h2>
              </div>

              <div className="flex justify-between items-start pt-2 pb-3 gap-4 px-4">
                  <p className="text-lg font-plein"> aadya's favourites </p>
              </div>

            
              <div className="md:overflow-x-auto md:scroll-smooth">
                <div className="grid grid-cols-2 gap-4 pb-2 px-4 md:flex md:whitespace-nowrap md:gap-4 md:pb-2 md:px-0">
                  <img
                    src="/books/moshimoshi.jpg"
                    alt="Moshi Moshi"
                    className="h-48 w-32 object-cover rounded-md shadow-md shrink-0 mx-auto"
                  />
              
                  <img
                    src="/books/thestranger.jpg"
                    alt="The Stranger"
                    className="h-48 w-32 object-cover rounded-md shadow-md shrink-0 mx-auto"
                  />

                  <img
                    src="/books/thealchemist.jpg"
                    alt="The Alchemist"
                    className="h-48 w-32 object-cover rounded-md shadow-md shrink-0 mx-auto"
                  />

                  <img
                    src="/books/flowersforalg.jpg"
                    alt="Flowers for Algernon"
                    className="h-48 w-32 object-cover rounded-md shadow-md shrink-0 mx-auto"
                  />

                  <img
                    src="/books/slapstick.jpeg"
                    alt="Slapstick"
                    className="h-48 w-32 object-cover rounded-md shadow-md shrink-0 mx-auto"
                  />

                  <img
                    src="/books/tintin.jpg"
                    alt="Adv. of tintin"
                    className="h-48 w-32 object-cover rounded-md shadow-md shrink-0 mx-auto"
                  />
                </div>
              </div>

            {/* Design */}
              <div className="flex justify-between items-start gap-4 pt-10 px-4">
                <h2 className="text-2xl font-gambetta font-medium"> Design </h2>
              </div>

              <div className="sm:w-full w-3/4 pt-12 pb-10 px-4 sm:px-8 mx-auto">
                <div className="flex flex-col items-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <DesignImageCard
                      src={designImages[0].src}
                      alt={designImages[0].alt}
                      description={designImages[0].description}
                      className="rounded-lg shadow-md w-full object-cover aspect-[3/4]"
                    />
                    <DesignImageCard
                      src={designImages[1].src}
                      alt={designImages[1].alt}
                      description={designImages[1].description}
                      className="rounded-lg shadow-md w-full object-cover aspect-[3/4]"
                    />
                    <DesignImageCard
                      src={designImages[2].src}
                      alt={designImages[2].alt}
                      description={designImages[2].description}
                      className="rounded-lg shadow-md w-full object-cover aspect-[3/4]"
                    />
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-6 items-center">
                    <DesignImageCard
                      src={designImages[3].src}
                      alt={designImages[3].alt}
                      description={designImages[3].description}
                      className="h-32 object-contain"
                    />
                    <DesignImageCard
                      src={designImages[4].src}
                      alt={designImages[4].alt}
                      description={designImages[4].description}
                      className="h-20 object-contain"
                    />
                    <DesignImageCard
                      src={designImages[5].src}
                      alt={designImages[5].alt}
                      description={designImages[5].description}
                      className="h-32 object-contain"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="text-center py-6 px-4 mx-auto max-w-2xl">
              <p className="text-lg font-gambetta font-medium mb-3">
                Check out my gallery and/or feel free to leave me a message via a sticky note!
              </p>
              <p className="text-lg font-gambetta font-medium">
                I hope you enjoyed your visit!
              </p>
            </div>

            <div className="sm:w-full md:w-1/3 pt-5 px-4 md:px-0 pb-10">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-3">
                  <h2 className="text-2xl font-gambetta font-medium italic"> <a href="gallery" className='hover:text-accent'>gallery! </a></h2>
                </div>

                <div className="flex items-start gap-3">
                  <h2 className="text-2xl font-gambetta font-medium italic"> <a href="stickies" className='hover:text-accent'> stickies! </a> </h2>
                </div>
              </div>
            </div>

          
        </div>

        <Footer />
      </main>
    </div>
  );
}