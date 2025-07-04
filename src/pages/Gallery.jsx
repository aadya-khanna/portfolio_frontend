import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Polaroid from '../components/Polaroid';

const BREAKPOINTS = {
  sm: 640,
  md: 768, 
  lg: 1024,
};

function chunkImages(images, currentScreenWidth) {
  const chunks = [];
  let i = 0;

  if (currentScreenWidth >= BREAKPOINTS.lg) {
    let isFive = true;
    while (i < images.length) {
      const size = isFive ? 5 : 4;
      chunks.push(images.slice(i, i + size));
      i += size;
      isFive = !isFive;
    }
  } else if (currentScreenWidth >= BREAKPOINTS.md) {
    const chunkSize = 3;
    while (i < images.length) {
      chunks.push(images.slice(i, i + chunkSize));
      i += chunkSize;
    }
  } else {
    
    const chunkSize = 2;
    while (i < images.length) {
      chunks.push(images.slice(i, i + chunkSize));
      i += chunkSize;
    }
  }
  return chunks;
}

export default function Gallery() {
  const [screenWidth, setScreenWidth] = useState(0); 

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const images = [
    { src: "/gallery/budapest.JPG", alt: "Photo 1", caption: "Budapest, Hungary" },
    { src: "/gallery/croatia.jpg", alt: "Photo 2", caption: "Dubrovnik, Croatia" },
    { src: "/gallery/eureka.JPG", alt: "Photo 3", caption: "EurekaHACKS 2025" },
    { src: "/gallery/fifth.jpg", alt: "Photo 4", caption: "Graduation" },
    { src: "/gallery/first.jpg", alt: "Photo 5", caption: "Battle of the Bands" },
    { src: "/gallery/food.JPG", alt: "Photo 6", caption: "Gluttony @Kerr Street Cafe" },
    { src: "/gallery/fourth.jpg", alt: "Photo 7", caption: "Prom" },
    { src: "/gallery/karma.JPG", alt: "Photo 8", caption: "Karma @ISP" },
    { src: "/gallery/park.jpg", alt: "Photo 9", caption: "Bike Ride!" },
    { src: "/gallery/port.JPG", alt: "Photo 10", caption: "Lisbon, Portugal" },
    { src: "/gallery/port2.jpg", alt: "Photo 11", caption: "Sunset in Lisbon" },
    { src: "/gallery/prag.jpg", alt: "Photo 12", caption: "Malostranska, Praha" },
    { src: "/gallery/seniorsun.jpg", alt: "Photo 13", caption: "Senior Sunset" },
    { src: "/gallery/third.jpg", alt: "Photo 14", caption: "Pump Before Prom" },
  ];

  const rows = chunkImages(images, screenWidth); 

  const isLargeScreen = screenWidth >= BREAKPOINTS.lg;

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark">
      <Header />
      <main className="flex flex-col min-h-[calc(100vh-header-height)]">
        <div className="items-center md:items-start text-center justify-center px-4">
          <p className="text-lg sm:text-lg md:text-xl 2xl:text-2xl font-plein">
            <a href="about" className="hover:text-accent"> about </a> |
            <a href="projects" className="hover:text-accent"> projects </a> |
            <a href="experience" className='hover:text-accent'> experience </a> |
            <a href="misc" className='text-accent'> misc. </a>
          </p>

          <h1 className="font-gambetta font-semibold pt-3 text-2xl sm:text-2xl md:text-3xl lg:text-3xl pb-20">
            gallery!
          </h1>

          <div className="space-y-8 sm:px-10 md:px-20 pb-10">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid gap-4
                  grid-cols-2
                  md:grid-cols-3
                  ${isLargeScreen ? (rowIndex % 2 === 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-4') : ''}
                  ${isLargeScreen && rowIndex % 2 === 1 ? 'lg:px-24' : ''}
                `}
              >
                {row.map((img, imgIndex) => {
                  const uniqueKey = `${rowIndex}-${imgIndex}-${img.src}`;
                  const tilt = (rowIndex * row.length + imgIndex) % 2 === 0 ? 'right' : 'left';
                  return (
                    <Polaroid
                      key={uniqueKey}
                      src={img.src}
                      alt={img.alt}
                      caption={img.caption}
                      tilt={tilt}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}