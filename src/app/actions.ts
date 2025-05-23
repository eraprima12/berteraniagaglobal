
"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  } | null;
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      success: false,
    };
  }

  // In a real application, this is where you would send the email.
  // For example, using a service like SendGrid, Mailgun, or AWS SES.
  const recipientEmail = "admin@berteraniagaglobal.com";
  console.log("Contact form submitted. Data that would be sent:");
  console.log("To:", recipientEmail);
  console.log("From:", validatedFields.data.email);
  console.log("Name:", validatedFields.data.name);
  console.log("Subject:", validatedFields.data.subject);
  console.log("Message:", validatedFields.data.message);
  
  // Simulate a delay for network request/email sending
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you would handle potential errors from your email sending service here.
  // For now, we assume success.

  return {
    message: `Thank you, ${validatedFields.data.name}! Your message about "${validatedFields.data.subject}" has been received. We will get back to you soon. (Normally, this would be sent to ${recipientEmail})`,
    errors: null,
    success: true,
  };
}

