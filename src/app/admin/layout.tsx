
import type { Metadata } from 'next';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { LogOut, PackagePlus, UserCircle } from 'lucide-react';
import { logoutAction } from './actions';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css'; // Import global styles

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bertera Admin',
  description: 'Admin panel for Bertera Niaga Global',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userEmailCookie = cookies().get('userEmail');
  const userEmail = userEmailCookie ? decodeURIComponent(userEmailCookie.value) : null;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-muted/40`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-30">
            <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
              <Link href="/admin" className="flex items-center gap-2">
                <Image
                  src="/bertera-logo.png" 
                  alt="Bertera Niaga Global Admin Logo"
                  width={120}
                  height={27}
                  className="h-7 w-auto"
                  priority
                />
                <span className="text-lg font-semibold hidden sm:inline">Admin Panel</span>
              </Link>
              <div className="flex items-center gap-4">
                {userEmail && (
                  <div className="flex items-center gap-2 text-sm">
                    <UserCircle className="h-5 w-5" />
                    <span className="hidden md:inline">{userEmail}</span>
                  </div>
                )}
                <Link href="/admin/add-product" passHref>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/80 hover:text-primary-foreground">
                    <PackagePlus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </Link>
                <form action={logoutAction}>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/80 hover:text-primary-foreground">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </form>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
