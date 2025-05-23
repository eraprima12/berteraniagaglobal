
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { List, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Welcome, Admin!</h2>
      <p className="text-muted-foreground">
        This is your control panel for Bertera Niaga Global's website content.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <List className="h-5 w-5" /> View Products
            </CardTitle>
            <CardDescription>Browse and see current product listings.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/products" passHref>
              <Button variant="outline" className="w-full">Go to Products</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <PlusCircle className="h-5 w-5" /> Add New Product
            </CardTitle>
            <CardDescription>Add new coffee products to the catalog (simulated).</CardDescription>
          </CardHeader>
          <CardContent>
             <Link href="/admin/products/add" passHref>
              <Button variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Add Product</Button>
            </Link>
          </CardContent>
        </Card>
        {/* Add more cards here for future admin functionalities */}
      </div>
      <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
        <h3 className="font-bold">Developer Note:</h3>
        <p>Currently, "Add New Product" will log data to the server console and not update the live website data. Full CRUD functionality requires a database integration.</p>
      </div>
    </div>
  );
}
