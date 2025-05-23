
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  if (isAdminRoute) {
    if (isLoginPage) {
      // If user is logged in and tries to access login page, redirect to admin dashboard
      if (sessionToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      // Allow access to login page if not logged in
      return NextResponse.next();
    }

    // For any other /admin route, if user is not logged in, redirect to login page
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  // Match all /admin routes, including the root /admin and /admin/*
  matcher: ['/admin/:path*', '/admin'],
};
