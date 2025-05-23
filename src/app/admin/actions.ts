
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { CoffeeType } from '@/data/content'; // Assuming CoffeeType might be useful

const AUTH_COOKIE_NAME = 'bertera-admin-auth';

// --- Login ---
const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type LoginFormState = {
  message: string | null;
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  } | null;
  success: boolean;
};

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid credentials.',
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  // IMPORTANT: Hardcoded credentials for prototype only
  if (email === 'admin@bertera.com' && password === 'password123') {
    cookies().set(AUTH_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    // Redirect after setting cookie, needs to be done outside of the action typically
    // But for server actions, we can call redirect()
  } else {
    return {
      message: 'Invalid email or password.',
      errors: { general: ['Invalid email or password.'] },
      success: false,
    };
  }
  redirect('/admin');
}

export async function logoutAction() {
  cookies().delete(AUTH_COOKIE_NAME);
  redirect('/admin/login');
}

// --- Add Product ---
const AddProductFormSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  imageHint: z.string().max(30, { message: 'Image hint too long (max 30 chars).' }).optional().or(z.literal('')),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  priceUnit: z.string().min(1, { message: 'Price unit is required (e.g., USD / kg).' }),
  coffeeTypeName: z.enum(['Arabica', 'Robusta', 'Liberica'], {
    errorMap: () => ({ message: 'Please select a valid coffee type.' }),
  }),
  isBestSeller: z.preprocess((val) => val === 'on' || val === true, z.boolean()).optional(),
});


export type AddProductFormState = {
  message: string | null;
  errors?: {
    name?: string[];
    description?: string[];
    imageUrl?: string[];
    imageHint?: string[];
    price?: string[];
    priceUnit?: string[];
    coffeeTypeName?: string[];
    isBestSeller?: string[];
  } | null;
  success: boolean;
};

export async function addProductAction(
  prevState: AddProductFormState,
  formData: FormData
): Promise<AddProductFormState> {
  const validatedFields = AddProductFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    imageHint: formData.get('imageHint'),
    price: formData.get('price'),
    priceUnit: formData.get('priceUnit'),
    coffeeTypeName: formData.get('coffeeTypeName'),
    isBestSeller: formData.get('isBestSeller'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the fields.',
      success: false,
    };
  }

  const productData = validatedFields.data;

  // SIMULATED ACTION: Log to console instead of saving to a database or file
  console.log('New Product Data Submitted (Simulated):', productData);

  return {
    message: `Product "${productData.name}" details received and logged (simulation). In a real app, this would be saved.`,
    errors: null,
    success: true,
  };
}
