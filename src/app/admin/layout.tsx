
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster'; // Keep toaster for admin notifications

export const metadata: Metadata = {
  title: 'Bertera Global - Admin Panel',
  description: 'Admin panel for Bertera Niaga Global',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
