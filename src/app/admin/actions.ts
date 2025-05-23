
"use server";

import { z } from "zod";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

// IMPORTANT: These are hardcoded credentials for prototype purposes ONLY.
// DO NOT use this in a production environment.
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
    // Create a session cookie (very basic for prototype)
    cookies().set('session', 'authenticated_user_token_example', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Should be true in production
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/', // Cookie available across the entire site
      sameSite: 'lax', // Mitigates CSRF
    });
    // Store email for display (optional, consider security implications for real apps)
     cookies().set('userEmail', encodeURIComponent(email), {
      httpOnly: true, // Make it httpOnly if not needed by client JS
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });


    // On successful login, redirect to the admin dashboard
    // Server Actions cannot use `redirect` directly in the action that's bound to a form.
    // Instead, the page consuming the form state should handle redirection based on `state.success`.
    // However, for simplicity in this prototype and since Next.js allows it now for many cases:
    redirect('/admin');
    
    // This part might not be reached if redirect works immediately
    // return { message: 'Login successful!', success: true };
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
