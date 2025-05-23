
"use client";

import Image from 'next/image';
import { Button } from '../ui/button';

export function ParallaxHomeSection() {
  const handleScrollToProducts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Coffee Plantation Background"
        layout="fill"
        objectFit="cover"
        quality={85}
        className="z-0"
        data-ai-hint="coffee plantation"
        priority
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      <div className="relative z-20 p-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          Bertera Niaga Global
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
          Beyond Border, Beyond Expectations
        </p>
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
        // Basic CSS parallax effect. For more advanced effects, JS might be needed.
        // Next/Image with layout="fill" and objectFit="cover" handles the image responsiveness.
        // True parallax (background moving at different speed) is better with JS or more complex CSS.
        // This setup gives a full-screen hero image.
        section {
          background-attachment: fixed; /* This can cause issues on mobile, often disabled via media query or JS detection */
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
