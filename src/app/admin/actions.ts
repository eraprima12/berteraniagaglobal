
"use server";

import { z } from "zod";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// --- Login/Logout ---
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type LoginState = {
  message: string | null;
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
  } | null;
};

const ADMIN_EMAIL = "admin@bertera.com";
const ADMIN_PASSWORD = "password123";

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check the fields.",
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    cookies().set('session', 'authenticated_admin_token_example', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    });
    cookies().set('userEmail', encodeURIComponent(email), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });
    redirect('/admin');
  } else {
    return {
      message: "Invalid email or password.",
      success: false,
    };
  }
}

export async function logoutAction() {
  cookies().delete('session');
  cookies().delete('userEmail');
  redirect('/admin/login');
}

// --- Add Product ---
const addProductFormSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  imageHint: z.string().min(2, { message: "Image hint must be at least 2 characters." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  priceUnit: z.string().min(3, { message: "Price unit is required (e.g., USD / kg)." }),
  coffeeTypeId: z.enum(['arabica', 'robusta', 'liberica'], { message: "Please select a valid coffee type." }),
  isBestSeller: z.preprocess((val) => val === 'on' || val === true, z.boolean().optional()),
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
    coffeeTypeId?: string[];
    isBestSeller?: string[];
  } | null;
  success: boolean;
};

export async function addProductAction(
  prevState: AddProductFormState,
  formData: FormData
): Promise<AddProductFormState> {
  const validatedFields = addProductFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    imageHint: formData.get("imageHint"),
    price: formData.get("price"),
    priceUnit: formData.get("priceUnit"),
    coffeeTypeId: formData.get("coffeeTypeId"),
    isBestSeller: formData.get("isBestSeller"),
  });

  if (!validatedFields.success) {
    console.log("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      success: false,
    };
  }

  // PROTOTYPE NOTE: In a real application, you would save this data to a database.
  // For now, we'll just log it to the console.
  console.log("New Product Submitted (Prototype - Not Saved):", validatedFields.data);
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For a real app, you'd check for errors from the database save operation.
  // Here, we assume success for the prototype.

  return {
    message: `Product "${validatedFields.data.name}" submitted successfully (logged to console, not saved live).`,
    errors: null,
    success: true,
  };
}
