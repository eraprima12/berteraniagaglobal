
"use client";

import Link from 'next/link';
import Image from 'next/image'; // Added import for Image component
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname

const navLinks = [
  { href: '/#home', label: 'Home', sectionId: 'home' },
  { href: '/#products', label: 'Products', sectionId: 'products' },
  { href: '/#our-story', label: 'Our Story', sectionId: 'our-story' },
  { href: '/#blog', label: 'Blog', sectionId: 'blog' },
  { href: '/#our-team', label: 'Our Team', sectionId: 'our-team' },
  { href: '/#contact-us', label: 'Contact Us', sectionId: 'contact-us' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname(); // Get current pathname

  useEffect(() => {
    const handleScroll = () => {
      // Only run scroll-based active section logic on the homepage
      if (pathname === '/') {
        let currentSection = 'home';
        for (const link of navLinks) {
          if (link.sectionId) {
            const sectionElement = document.getElementById(link.sectionId);
            if (sectionElement) {
              const rect = sectionElement.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = link.sectionId;
                break;
              }
            }
          }
        }
        setActiveSection(currentSection);
      } else {
        // For other pages, try to match based on href, or default to none
        const matchedLink = navLinks.find(link => pathname.startsWith(link.href.split('#')[0]) && link.href.split('#')[0] !== '/');
        setActiveSection(matchedLink ? matchedLink.sectionId || '' : '');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]); // Re-run effect if pathname changes

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetPath = href.split('#')[0];
    const sectionId = href.split('#')[1];

    if (pathname === targetPath || (targetPath === '/' && pathname.startsWith('/blog'))) { // if on same page or navigating to a homepage section from blog page
      e.preventDefault();
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (href === '/#home' && targetPath === '/') { // Special case for home
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (href === '/#home') {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // For cross-page navigation, Next.js Link will handle it.
    // If it's a hash link to the current page, the scroll will be smooth.
    // If it's a hash link to another page, it will navigate then attempt to jump.

    setIsMobileMenuOpen(false);
  };
  
  const getLinkHref = (linkHref: string) => {
    if (pathname.startsWith('/blog/') && linkHref.startsWith('/#')) {
      return `/${linkHref}`; // Prepend / to make it /#section for homepage navigation from blog post
    }
    return linkHref;
  }


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-xl shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/#home" className="flex items-center gap-2" onClick={(e) => handleLinkClick(e, '/#home')}>
          <Image
            src="/images/logo/bertera-logo.png"
            alt="Bertera Niaga Logo"
            width={1200} 
            height={200} 
            className="h-9 w-auto" 
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={getLinkHref(link.href)}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === link.sectionId ? 'text-primary underline underline-offset-4' : 'text-foreground/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]"> {/* Removed explicit bg-background to inherit from sheetVariants */}
              <nav className="flex flex-col gap-6 p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      activeSection === link.sectionId ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
