
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css'; // Main site globals for base Tailwind styles
import Link from 'next/link';
// Removed Button and Power icon imports as the form is removed for now
// import { Button } from '@/components/ui/button';
// import { Power } from 'lucide-react';
// import { logoutAction } from './actions';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Bertera Admin Panel',
  description: 'Admin panel for Bertera Niaga Global',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-muted/40 font-sans antialiased flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
          <Link href="/admin">
            <h1 className="text-xl font-semibold text-primary">Bertera Admin Panel</h1>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {/* Logout form removed for simplification */}
            {/* <form action={logoutAction}>
              <Button variant="outline" size="sm" type="submit">
                <Power className="h-4 w-4 mr-2" /> Logout
              </Button>
            </form> */}
            <span className="text-sm text-muted-foreground">(Logout temporarily hidden)</span>
          </div>
        </header>
        <main className="p-4 sm:px-6 sm:py-0 flex-grow">
          {children}
        </main>
        <footer className="text-center p-4 text-xs text-muted-foreground mt-auto">
          © {new Date().getFullYear()} Bertera Admin Panel
        </footer>
      </body>
    </html>
  );
}
