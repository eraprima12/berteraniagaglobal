
"use client";

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FloatingWhatsAppButton() {
  const phoneNumber = "6285156113241"; // Your WhatsApp number
  const prefilledMessage = "Hello Bertera Niaga Global, I'd like to learn more about your products and services. Please let us know!";

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(prefilledMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Button
      onClick={openWhatsApp}
      variant="default"
      className={cn(
        "fixed bottom-6 right-6 h-14 rounded-full shadow-xl z-50 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center px-4",
        "bg-green-500 hover:bg-green-600 text-white"
      )}
      aria-label="Learn More and Chat on WhatsApp"
    >
      <MessageCircle size={24} className="mr-2" />
      <span className="text-sm font-medium">Learn More & Chat</span>
    </Button>
  );
}
