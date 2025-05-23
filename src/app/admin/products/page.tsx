
import { getAllCoffeeOrigins, type ProductDetails } from '@/data/content';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Eye } from 'lucide-react';

// Helper for price formatting
function formatPrice(price: number, priceUnit: string) {
    const parts = priceUnit.split(' ');
    const currencyCode = parts[0];
    const unit = parts.slice(1).join(' ');
    try {
      return `${new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}${unit ? ` ${unit}` : ''}`;
    } catch (e) {
      return `${currencyCode} ${price.toFixed(2)}${unit ? ` ${unit}` : ''}`;
    }
}

export default function AdminProductsPage() {
  const products: ProductDetails[] = getAllCoffeeOrigins();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Manage Products</h2>
        <Link href="/admin/products/add" passHref>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="border rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Best Seller</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.coffeeTypeName}</TableCell>
                  <TableCell>{formatPrice(product.price, product.priceUnit)}</TableCell>
                  <TableCell>
                    {product.isBestSeller ? (
                      <Badge variant="default" className="bg-green-500 text-white">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Placeholder for future Edit/Delete actions */}
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/products/${product.id}`} target="_blank" title="View on site">
                        <Eye className="h-4 w-4" />
                         <span className="sr-only">View</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-muted-foreground">No products found in the static data file.</p>
      )}
       <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
        <h3 className="font-bold">Developer Note:</h3>
        <p>This page displays products read from your static `src/data/content.ts` file. Actions like 'Edit' or 'Delete' are not implemented here as they would require a database to persist changes effectively.</p>
      </div>
    </div>
  );
}
