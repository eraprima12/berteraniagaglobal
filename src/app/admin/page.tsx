
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PackagePlus, ShieldCheck, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-primary">Welcome to the Admin Panel!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your Bertera Niaga Global website content and operations from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 mb-6">
            This is your central hub. Use the navigation above or the quick links below to manage different aspects of the site.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/add-product" passHref>
              <Card className="bg-background hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium text-primary">Add New Product</CardTitle>
                  <PackagePlus className="h-6 w-6 text-accent" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Create listings for new coffee varieties and origins.
                  </p>
                </CardContent>
              </Card>
            </Link>
            {/* Placeholder for future features */}
            <Card className="bg-background opacity-50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-primary">Manage Users (Future)</CardTitle>
                <Users className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  (Coming Soon) Administer user accounts and roles.
                </p>
              </CardContent>
            </Card>
             <Card className="bg-background opacity-50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-primary">View Analytics (Future)</CardTitle>
                <BarChart3 className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  (Coming Soon) Track website traffic and product performance.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 p-4 border border-destructive/50 bg-destructive/10 rounded-md text-destructive">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <h4 className="font-bold">Security Notice:</h4>
            </div>
            <p className="text-sm mt-1">
              The current authentication and data management systems are for demonstration purposes only and are NOT secure for production environments.
              Implement robust authentication and a proper database solution before deploying. Product additions are currently logged to the console and not saved live.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
