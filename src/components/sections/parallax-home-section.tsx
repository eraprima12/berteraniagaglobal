
"use client";

import { Button } from '../ui/button';
import { Dancing_Script } from 'next/font/google'; // Import the Dancing Script font

// Configure the font
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'], // '700' is often a good weight for headlines in script fonts
  variable: '--font-dancing-script',
});

export function ParallaxHomeSection() {
  const handleScrollToProducts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const backgroundImageUrl = "/images/home/red_beans_coffee.jpeg"; // A.I. HINT: coffee plantation lush green

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Overlay for better text readability and frosted glass effect */}
      <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm z-10"></div>
      
      <div className="relative z-20 p-4 max-w-3xl">
        <h1 
          className={`${dancingScript.className} text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight`}
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }} // Slightly adjusted shadow for script font
        >
          A sip from nusantara soil, to your soul
        </h1>
        {/* <p className="text-xl md:text-2xl mb-8" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Your tagline here or a brief description.
        </p> */}
        <Button 
          size="lg" 
          variant="default" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={handleScrollToProducts}
          aria-label="Explore Our Coffees"
        >
          Explore Our Coffees
        </Button>
      </div>
      <style jsx>{`
        section {
          background-image: url(${backgroundImageUrl});
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        @media (max-width: 768px) {
          section {
            background-attachment: scroll; /* Disable fixed attachment on mobile if problematic */
          }
        }
      `}</style>
    </section>
  );
}
