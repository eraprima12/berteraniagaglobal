
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { loginAction, type LoginFormState } from '../actions';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const initialState: LoginFormState = {
  message: null,
  errors: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Login
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <Image src="/images/logo/bertera-logo.png" alt="Bertera Niaga Global Logo" width={200} height={45} className="mx-auto mb-4 h-auto" style={{width: '150px'}}/>
          <CardTitle className="text-2xl text-primary">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
              {state?.errors?.email && <p className="text-xs text-destructive mt-1">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {state?.errors?.password && <p className="text-xs text-destructive mt-1">{state.errors.password[0]}</p>}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
        {state?.errors?.general && (
          <CardFooter className="flex justify-center">
            <p className="text-sm text-destructive">{state.errors.general[0]}</p>
          </CardFooter>
        )}
         {state?.success === false && state?.message && !state.errors?.general && (
          <CardFooter className="flex justify-center">
            <p className="text-sm text-destructive">{state.message}</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
