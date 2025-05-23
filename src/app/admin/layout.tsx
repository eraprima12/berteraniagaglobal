
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css'; // Main global styles
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, PackagePlus, LogOut } from 'lucide-react'; // Removed Briefcase as it's not used
import { logoutAction } from './actions';
import Image from 'next/image';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // Added variable configuration
});

export const metadata: Metadata = {
  title: 'Admin Panel - Bertera Niaga Global',
  description: 'Admin panel for managing Bertera Niaga Global content.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="bg-muted/40 flex flex-col h-full font-sans">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4 shadow-sm">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/images/logo/bertera-logo.png" alt="Bertera Niaga Admin Logo" width={150} height={30} className="h-8 w-auto" />
            <span className="text-xl font-semibold text-primary">Admin Panel</span>
          </Link>
          <div className="ml-auto">
            <form action={logoutAction}>
              <Button variant="outline" size="sm" type="submit">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-60 bg-background border-r p-4 flex flex-col gap-2">
            <nav className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/admin">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/admin/products/add">
                  <PackagePlus className="mr-2 h-4 w-4" />
                  Add Product
                </Link>
              </Button>
              {/* Add more navigation links here, e.g., List Products, Manage Blog */}
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
