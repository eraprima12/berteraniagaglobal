
"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { composeWhatsappMessage, type ComposeWhatsappMessageInput } from '@/ai/flows/whatsapp-message-flow'; // Corrected import path
import { cn } from '@/lib/utils';

export function FloatingWhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [showAiDisclaimer, setShowAiDisclaimer] = useState(false);
  const phoneNumber = "6285156113241"; // Your WhatsApp number
  const panelRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset states when opening
      setUserMessage('');
      setAiSuggestion('');
      setShowAiDisclaimer(false);
    }
  };

  const handleSubmitQuery = async () => {
    if (!userMessage.trim()) return;
    setIsLoading(true);
    setShowAiDisclaimer(true);
    try {
      const input: ComposeWhatsappMessageInput = { userQuery: userMessage };
      const response = await composeWhatsappMessage(input);
      setAiSuggestion(response.composedMessage);
      // Automatically open WhatsApp with AI suggestion
      const encodedMessage = encodeURIComponent(response.composedMessage);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      setIsOpen(false); // Close panel after opening WhatsApp
    } catch (error) {
      console.error("Error generating WhatsApp message:", error);
      // Fallback: open WhatsApp with user's original message if AI fails
      const encodedUserMessage = encodeURIComponent(userMessage);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedUserMessage}`, '_blank');
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Close panel if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Check if the click target is the toggle button itself to avoid immediate re-close
        const toggleButton = document.getElementById('whatsapp-toggle-button');
        if (toggleButton && !toggleButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, panelRef]);


  return (
    <>
      <Button
        id="whatsapp-toggle-button"
        onClick={toggleOpen}
        variant="default"
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 transition-all duration-300 ease-in-out transform hover:scale-110",
          "bg-green-500 hover:bg-green-600 text-white",
           isOpen && "scale-0 opacity-0" // Hide button when panel is open
        )}
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle size={28} />
      </Button>

      {isOpen && (
        <Card 
            ref={panelRef} 
            className="fixed bottom-6 right-6 w-80 md:w-96 shadow-2xl z-50 rounded-xl bg-background/80 backdrop-blur-lg border-border/50 animate-in slide-in-from-bottom-5 fade-in-50"
        >
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <CardTitle className="text-lg font-semibold text-primary flex items-center">
              <MessageCircle size={20} className="mr-2 text-green-500" />
              Chat on WhatsApp
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleOpen} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
              <span className="sr-only">Close chat panel</span>
            </Button>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <Textarea
              placeholder="Hi! How can we help you today?"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              rows={3}
              className="bg-background/70 focus:ring-green-500"
              disabled={isLoading}
            />
            {showAiDisclaimer && !isLoading && aiSuggestion && (
              <div className="p-2.5 text-xs text-muted-foreground bg-muted rounded-md border">
                <div className="flex items-center mb-1">
                    <Bot size={14} className="mr-1.5 text-green-500" />
                    <span>AI Suggestion:</span>
                </div>
                <p className="italic">"{aiSuggestion}"</p>
                <p className="mt-1">This message will be pre-filled in WhatsApp.</p>
              </div>
            )}
             {showAiDisclaimer && isLoading && (
                <div className="p-2.5 text-xs text-muted-foreground bg-muted rounded-md border flex items-center">
                    <Loader2 size={14} className="mr-1.5 animate-spin text-green-500" />
                    <span>Our AI is crafting a message for you...</span>
                </div>
            )}
          </CardContent>
          <CardFooter className="p-4 border-t">
            <Button 
              onClick={handleSubmitQuery} 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              disabled={isLoading || !userMessage.trim()}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Send Query via WhatsApp
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
