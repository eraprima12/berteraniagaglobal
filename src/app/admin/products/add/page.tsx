
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { addProductAction, type AddProductFormState } from '../../actions'; // Adjusted path
import { coffeeData, type CoffeeType } from '@/data/content'; // For populating coffee types
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState: AddProductFormState = {
  message: null,
  errors: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Add Product
    </Button>
  );
}

export default function AddProductPage() {
  const [state, formAction] = useActionState(addProductAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset(); // Reset form on success
      } else if (state.errors) {
        // Concatenate all error messages for a brief overview
        const errorSummary = Object.values(state.errors)
          .filter(fieldErrors => fieldErrors !== undefined) // Ensure fieldErrors is not undefined
          .flat()
          .join(' ');
        toast({
          title: 'Error Adding Product',
          description: state.message || errorSummary || 'Please correct the errors below.',
          variant: 'destructive',
        });
      } else if (!state.success && state.message) { // Handle general error messages not tied to specific fields
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Add New Coffee Product</CardTitle>
        <CardDescription>Fill in the details for the new coffee product. This is a simulated add and will log data to the console.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" placeholder="e.g., Mandheling (Sumatra)" />
            {state.errors?.name && <p className="text-xs text-destructive mt-1">{state.errors.name.join(', ')}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Detailed description of the coffee..." />
            {state.errors?.description && <p className="text-xs text-destructive mt-1">{state.errors.description.join(', ')}</p>}
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://placehold.co/400x300.png" />
            {state.errors?.imageUrl && <p className="text-xs text-destructive mt-1">{state.errors.imageUrl.join(', ')}</p>}
          </div>
          
          <div>
            <Label htmlFor="imageHint">Image AI Hint (1-2 keywords)</Label>
            <Input id="imageHint" name="imageHint" placeholder="e.g., sumatra beans" />
            {state.errors?.imageHint && <p className="text-xs text-destructive mt-1">{state.errors.imageHint.join(', ')}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" step="0.01" placeholder="e.g., 15.50" />
              {state.errors?.price && <p className="text-xs text-destructive mt-1">{state.errors.price.join(', ')}</p>}
            </div>
            <div>
              <Label htmlFor="priceUnit">Price Unit</Label>
              <Input id="priceUnit" name="priceUnit" placeholder="e.g., USD / kg" />
              {state.errors?.priceUnit && <p className="text-xs text-destructive mt-1">{state.errors.priceUnit.join(', ')}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="coffeeTypeId">Coffee Type</Label>
            <Select name="coffeeTypeId">
              <SelectTrigger id="coffeeTypeId">
                <SelectValue placeholder="Select coffee type" />
              </SelectTrigger>
              <SelectContent>
                {coffeeData.map((type: CoffeeType) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.coffeeTypeId && <p className="text-xs text-destructive mt-1">{state.errors.coffeeTypeId.join(', ')}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isBestSeller" name="isBestSeller" />
            <Label htmlFor="isBestSeller" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Mark as Best Seller
            </Label>
          </div>
          {state.errors?.isBestSeller && state.errors.isBestSeller.length > 0 && (
            <p className="text-xs text-destructive mt-1">{state.errors.isBestSeller[0]}</p>
          )}
          
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
