
import { Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="https://www.linkedin.com/company/106691396/admin/dashboard/" target="_blank" rel="noopener noreferrer" aria-label="Bertera Niaga Global LinkedIn">
            <Linkedin className="h-6 w-6 text-secondary-foreground hover:text-primary transition-colors" />
          </Link>
          <Link href="https://www.instagram.com/berteraniaga/" target="_blank" rel="noopener noreferrer" aria-label="Bertera Niaga Global Instagram">
            <Instagram className="h-6 w-6 text-secondary-foreground hover:text-primary transition-colors" />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Bertera Niaga Global. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Beyond Border, Beyond Expectations.
        </p>
      </div>
    </footer>
  );
}
