
"use client"; 

import type { Metadata } from 'next';
import { Gmarket_Sans } from 'next/font/google'; 
import './globals.css';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';
import { Toaster } from '../components/ui/toaster';
import { useState, useEffect } from 'react';
import { LoadingScreen } from '../components/common/LoadingScreen';

// Instantiate Gmarket Sans font with simplified options
const gmarketSans = Gmarket_Sans({
  variable: '--font-gmarket-sans', 
  subsets: ['latin'],    // Simplified to one subset
  weight: ['500'],   // Simplified to one weight
});

// Static metadata for a "use client" RootLayout needs careful handling.
// It's generally recommended to define metadata in Server Components or at the page level.
// For this RootLayout, we'll manually set some defaults if needed.
// The `metadata` export from `src/app/page.tsx` will handle specific page metadata.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      // Set a default title if not overridden by page-specific metadata
      if (!document.title || document.title === "") {
         document.title = 'Bertera Niaga Global - Beyond Border Beyond Expectations';
      }
    }
  }, [isLoading]);


  return (
    <html lang="en">
      <head>
        {/* Default description, can be overridden by page-specific metadata */}
        <meta name="description" content="Premium Indonesian coffee producer and wholesaler for export." />
         {/* Add other global head elements here if needed, like favicons if not handled by Next.js automatically */}
      </head>
      {/* Apply the Gmarket Sans font variable to the body */}
      <body className={`${gmarketSans.variable} antialiased`}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Navbar />
            <div className="pt-16"> {/* Add padding to offset fixed navbar */}
              {children}
            </div>
            <Footer />
            <Toaster />
          </>
        )}
      </body>
    </html>
  );
}
