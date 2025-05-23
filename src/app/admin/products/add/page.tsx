
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { addProductAction, type AddProductFormState } from '../../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState: AddProductFormState = {
  message: null,
  errors: null,
  success: false,
};

export default function AddProductPage() {
  const [state, formAction] = useActionState(addProductAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
          variant: 'default',
        });
        formRef.current?.reset(); // Reset form on success
      } else {
        toast({
          title: 'Error',
          description: state.message || 'Please correct the errors below.',
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);


  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Products</span>
          </Link>
        </Button>
        <h2 className="text-2xl font-semibold text-foreground">Add New Product (Simulated)</h2>
      </div>

      <form ref={formRef} action={formAction} className="space-y-6 p-6 border rounded-lg shadow-sm bg-card">
        {state.message && (
          <div className={`p-3 rounded-md flex items-center gap-2 text-sm ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {state.success ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <span>{state.message}</span>
          </div>
        )}

        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" placeholder="e.g., Arjuno Arabica Washed" />
          {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Detailed description of the coffee..." />
          {state.errors?.description && <p className="text-sm text-destructive mt-1">{state.errors.description[0]}</p>}
        </div>

        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://placehold.co/400x300.png" />
          {state.errors?.imageUrl && <p className="text-sm text-destructive mt-1">{state.errors.imageUrl[0]}</p>}
        </div>
        
        <div>
          <Label htmlFor="imageHint">Image AI Hint (max 2 words)</Label>
          <Input id="imageHint" name="imageHint" placeholder="e.g., java beans" />
          {state.errors?.imageHint && <p className="text-sm text-destructive mt-1">{state.errors.imageHint[0]}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" step="0.01" placeholder="15.99" />
            {state.errors?.price && <p className="text-sm text-destructive mt-1">{state.errors.price[0]}</p>}
          </div>
          <div>
            <Label htmlFor="priceUnit">Price Unit</Label>
            <Input id="priceUnit" name="priceUnit" placeholder="USD / kg" />
            {state.errors?.priceUnit && <p className="text-sm text-destructive mt-1">{state.errors.priceUnit[0]}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="coffeeTypeName">Coffee Type</Label>
          <Select name="coffeeTypeName">
            <SelectTrigger id="coffeeTypeName">
              <SelectValue placeholder="Select coffee type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arabica">Arabica</SelectItem>
              <SelectItem value="Robusta">Robusta</SelectItem>
              <SelectItem value="Liberica">Liberica</SelectItem>
            </SelectContent>
          </Select>
          {state.errors?.coffeeTypeName && <p className="text-sm text-destructive mt-1">{state.errors.coffeeTypeName[0]}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="isBestSeller" name="isBestSeller" />
          <Label htmlFor="isBestSeller" className="font-normal">Mark as Best Seller</Label>
           {state.errors?.isBestSeller && (
            <p className="text-sm text-destructive">{typeof state.errors.isBestSeller === 'string' ? state.errors.isBestSeller : state.errors.isBestSeller[0]}</p>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
          <h3 className="font-bold">Important Note:</h3>
          <p>This is a simulated form. Submitting will log the data to the server console but will <span className="font-semibold">not</span> update the live website or `src/data/content.ts`.</p>
        </div>

        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Save className="mr-2 h-4 w-4" /> Add Product (Simulate)
        </Button>
      </form>
    </div>
  );
}
