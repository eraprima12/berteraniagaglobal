
"use client";

import { Button } from '../ui/button';
// Removed Alex_Brush font import as it's no longer used for the main headline

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
      className={`relative h-screen flex items-center justify-center text-center text-white overflow-hidden`}
    >
      {/* Overlay for better text readability and frosted glass effect */}
      <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm z-10"></div>

      <div className="relative z-20 p-4 max-w-4xl">
        <h1
          className={`font-bold text-6xl sm:text-7xl md:text-8xl mb-6 leading-tight`} // Reverted font size, removed specific font class
          style={{
            textShadow: '1px 1px 3px rgba(0,0,0,0.4)'
          }}
        >
          Bertera Niaga Global
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-10 text-white/90"
           style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
        >
          Beyond Border, Beyond Expectations
        </p>
        <Button
          size="lg"
          variant="default"
          className="bg-accent text-accent-foreground px-10 py-4 text-xl rounded-lg shadow-xl
                     transition-all duration-300 ease-in-out
                     transform hover:scale-105 hover:shadow-2xl
                     filter hover:brightness-110" // Maintained button aesthetics
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
