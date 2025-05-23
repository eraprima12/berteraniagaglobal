
"use client";

import Image from 'next/image';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen flex-col items-center justify-center bg-background transition-opacity duration-300 ease-in-out">
      <div className="relative animate-pulse">
        <Image
          src="/images/logo/bertera-logo.png"
          alt="Bertera Niaga Global Logo - Loading"
          width={400} 
          height={90} 
          className="h-auto" 
          style={{ width: '200px' }} 
          priority
        />
      </div>
      <p className="mt-4 text-lg text-primary">Loading, please wait...</p>
    </div>
  );
}
