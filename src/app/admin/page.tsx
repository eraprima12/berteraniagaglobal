
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PackagePlus, Edit3, ListChecks } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Admin Panel</CardTitle>
          <CardDescription>Manage your website content from here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is your central hub for content management. Use the navigation on the left to get started.</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PackagePlus size={20} /> Add New Product</CardTitle>
            <CardDescription>Create a new coffee product listing.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/products/add">Go to Add Product</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ListChecks size={20} /> Manage Products</CardTitle>
            <CardDescription>View, edit, or delete existing products.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled>View Products (Coming Soon)</Button>
          </CardContent>
        </Card>

        <Card className="opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Edit3 size={20} /> Manage Blog</CardTitle>
            <CardDescription>Create, edit, or delete blog posts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled>Manage Blog (Coming Soon)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
