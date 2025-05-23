
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, UserCircle, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { logoutAction } from './actions';

export default async function AdminDashboardPage() {
  const session = cookies().get('session')?.value;
  const userEmail = cookies().get('userEmail')?.value;

  if (!session) {
    // This should ideally be caught by middleware, but as a fallback:
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
             {userEmail && (
              <div className="flex items-center gap-2 text-sm">
                <UserCircle className="h-5 w-5" />
                <span>{decodeURIComponent(userEmail)}</span>
              </div>
            )}
            <form action={logoutAction}>
              <Button variant="ghost" size="sm" className="hover:bg-primary/80 hover:text-primary-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Welcome to the Admin Panel!</CardTitle>
            <CardDescription className="text-muted-foreground">
              This is your central hub for managing Bertera Niaga Global's website content and operations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">
              This is a placeholder for your admin dashboard content.
              Future features will be added here, such as product management, order tracking,
              and content updates.
            </p>
            <div className="mt-6">
              <Link href="/" passHref>
                <Button variant="outline">
                  Go to Main Website
                </Button>
              </Link>
            </div>
             <div className="mt-8 p-4 border border-destructive/50 bg-destructive/10 rounded-md text-destructive">
                <h4 className="font-bold">Security Notice:</h4>
                <p className="text-sm">
                  The current authentication mechanism is for demonstration purposes only and is NOT secure for production environments.
                  Please implement a robust authentication solution before deploying.
                </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
