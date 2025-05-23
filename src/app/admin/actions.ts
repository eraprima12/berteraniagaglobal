
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { CoffeeType } from '@/data/content'; // For product type validation

const LOGIN_COOKIE_NAME = 'admin-auth';

// --- Login Action ---
const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type LoginFormState = {
  message?: string | null;
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  } | null;
  success: boolean;
};

export async function loginAction(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input.',
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  // IMPORTANT: Hardcoded credentials for prototype ONLY. Replace with secure auth in production.
  if (email === 'admin@bertera.com' && password === 'password123') {
    cookies().set(LOGIN_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    // Redirect must be called outside of try/catch
  } else {
    return {
      errors: { general: ['Invalid email or password.'] },
      message: 'Login failed.',
      success: false,
    };
  }
  redirect('/admin');
}

// --- Logout Action ---
export async function logoutAction() {
  cookies().delete(LOGIN_COOKIE_NAME);
  redirect('/admin/login');
}

// --- Add Product Action ---
// Assuming CoffeeType IDs are 'arabica', 'robusta', 'liberica' from your data/content.ts
const validCoffeeTypeIds = ['arabica', 'robusta', 'liberica'] as const;

const AddProductSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  imageHint: z.string().min(2, { message: 'Image hint must be at least 2 characters.' }).max(50, {message: 'Image hint too long'}),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  priceUnit: z.string().min(1, { message: 'Price unit is required (e.g., USD / kg).' }),
  coffeeTypeId: z.enum(validCoffeeTypeIds, { message: 'Invalid coffee type selected.'}),
  isBestSeller: z.preprocess((val) => val === 'on', z.boolean()).optional(),
});

export type AddProductFormState = {
  message?: string | null;
  errors?: z.ZodError<z.infer<typeof AddProductSchema>>['formErrors']['fieldErrors'] | null;
  success: boolean;
};

export async function addProductAction(prevState: AddProductFormState, formData: FormData): Promise<AddProductFormState> {
  const validatedFields = AddProductSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    imageHint: formData.get('imageHint'),
    price: formData.get('price'),
    priceUnit: formData.get('priceUnit'),
    coffeeTypeId: formData.get('coffeeTypeId'),
    isBestSeller: formData.get('isBestSeller'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the product details.',
      success: false,
    };
  }

  const newProductData = {
    id: validatedFields.data.name.toLowerCase().replace(/\s+/g, '-'), // simple slug generation
    ...validatedFields.data,
    isBestSeller: validatedFields.data.isBestSeller || false,
  };

  console.log('--- New Product Submitted (Simulated Add) ---');
  console.log('Coffee Type ID:', newProductData.coffeeTypeId);
  console.log('Product Details:', {
    id: newProductData.id,
    name: newProductData.name,
    description: newProductData.description,
    imageUrl: newProductData.imageUrl,
    imageHint: newProductData.imageHint,
    price: newProductData.price,
    priceUnit: newProductData.priceUnit,
    isBestSeller: newProductData.isBestSeller,
  });
  console.log('-----------------------------------------------');

  // In a real application, you would save this to a database and update `src/data/content.ts`
  // or fetch dynamically from the database on the main site.

  return {
    message: `Product "${newProductData.name}" details received and logged. (This is a simulated add).`,
    errors: null,
    success: true,
  };
}
