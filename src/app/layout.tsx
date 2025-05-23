
"use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed to Inter
import './globals.css';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';
import { Toaster } from '../components/ui/toaster';
import { useState, useEffect } from 'react';
import { LoadingScreen } from '../components/common/LoadingScreen';

// Instantiate Inter font
const inter = Inter({ // Changed to Inter
  variable: '--font-inter', // Changed variable name
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Common weights for Inter
});

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
      if (!document.title || document.title === "") {
         document.title = 'Bertera Niaga Global - Beyond Border Beyond Expectations';
      }
    }
  }, [isLoading]);

  return (
    <html lang="en">
      <head>
        <meta name="description" content="Premium Indonesian coffee producer and wholesaler for export." />
      </head>
      {/* Apply the Inter font variable to the body */}
      <body className={`${inter.variable} antialiased font-sans`}> {/* Apply font-sans as a base */}
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
