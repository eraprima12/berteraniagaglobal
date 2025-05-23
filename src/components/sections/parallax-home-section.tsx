
"use client";

import { Button } from '../ui/button';
import { Alex_Brush as AlexBrushFont } from 'next/font/google'; // Changed to Alex_Brush

// Configure the Alex Brush font
const alexBrush = AlexBrushFont({
  subsets: ['latin'],
  weight: ['400'], // Alex Brush typically only has a 400 weight
  variable: '--font-alex-brush', 
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
          className={`${alexBrush.className} text-6xl sm:text-7xl md:text-8xl mb-8 leading-tight`} // Applied Alex Brush font and adjusted sizes
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }} // Adjusted shadow for Alex Brush
        >
          A sip from nusantara soil, to your soul
        </h1>
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
