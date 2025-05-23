
"use client";

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { addProductAction, type AddProductFormState } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, PackagePlus, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const initialState: AddProductFormState = {
  message: null,
  errors: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PackagePlus className="mr-2 h-4 w-4" />}
      Add Product
    </Button>
  );
}

export default function AddProductPage() {
  const [state, formAction] = useActionState(addProductAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
          variant: "default",
          action: <CheckCircle className="h-5 w-5 text-green-500" />,
        });
        formRef.current?.reset(); 
      } else {
        toast({
          title: "Error Adding Product",
          description: state.message || "Please correct the errors in the form.",
          variant: "destructive",
          action: <AlertCircle className="h-5 w-5 text-red-500" />,
        });
      }
    }
  }, [state, toast]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin" className="inline-flex items-center text-sm text-primary hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Back to Admin Dashboard
        </Link>
      </div>
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center">
            <PackagePlus className="mr-3 h-7 w-7" /> Add New Coffee Product
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill in the details for the new coffee product. 
            <span className="font-semibold text-destructive"> Note: This is a prototype, data will be logged to console, not saved live.</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" placeholder="e.g., Gayo Mountain Supreme" required className="bg-background/70"/>
              {state?.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
            </div>

            <div>
              <Label htmlFor="coffeeTypeId">Coffee Type</Label>
              <Select name="coffeeTypeId" required>
                <SelectTrigger className="w-full bg-background/70">
                  <SelectValue placeholder="Select coffee type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arabica">Arabica</SelectItem>
                  <SelectItem value="robusta">Robusta</SelectItem>
                  <SelectItem value="liberica">Liberica</SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.coffeeTypeId && <p className="text-sm text-destructive mt-1">{state.errors.coffeeTypeId[0]}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Detailed description of the coffee..." rows={4} required className="bg-background/70"/>
              {state?.errors?.description && <p className="text-sm text-destructive mt-1">{state.errors.description[0]}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" step="0.01" placeholder="e.g., 15.50" required className="bg-background/70"/>
                {state?.errors?.price && <p className="text-sm text-destructive mt-1">{state.errors.price[0]}</p>}
              </div>
              <div>
                <Label htmlFor="priceUnit">Price Unit</Label>
                <Input id="priceUnit" name="priceUnit" placeholder="e.g., USD / kg" required className="bg-background/70"/>
                {state?.errors?.priceUnit && <p className="text-sm text-destructive mt-1">{state.errors.priceUnit[0]}</p>}
              </div>
            </div>
            
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/image.png" required className="bg-background/70"/>
              {state?.errors?.imageUrl && <p className="text-sm text-destructive mt-1">{state.errors.imageUrl[0]}</p>}
            </div>

            <div>
              <Label htmlFor="imageHint">Image AI Hint (1-2 keywords)</Label>
              <Input id="imageHint" name="imageHint" placeholder="e.g., coffee beans sumatra" required className="bg-background/70"/>
              {state?.errors?.imageHint && <p className="text-sm text-destructive mt-1">{state.errors.imageHint[0]}</p>}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="isBestSeller" name="isBestSeller" />
              <Label htmlFor="isBestSeller" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Mark as Best Seller
              </Label>
              {state?.errors?.isBestSeller && <p className="text-sm text-destructive ml-auto">{state.errors.isBestSeller[0]}</p>}
            </div>

            {state?.message && !state.success && state.errors === null && ( // General non-field error
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Submission Error</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
