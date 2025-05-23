
import type { Metadata } from 'next';
import Link from 'next/link';
// Removed Inter font import as it's inherited from RootLayout
// Removed globals.css import as it's loaded in RootLayout

// Logout button and action are currently commented out as per previous diagnostic step
// import { Button } from '@/components/ui/button';
// import { Power } from 'lucide-react';
// import { logoutAction } from './actions';

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
    // Removed <html> and <body> tags to prevent nesting errors
    // The 'inter.variable' class is not needed here as font is inherited
    <div className="bg-muted/40 font-sans antialiased flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
        <Link href="/admin">
          <h1 className="text-xl font-semibold text-primary">Bertera Admin Panel</h1>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {/* Logout form removed for simplification as per previous step */}
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
    </div>
  );
}
