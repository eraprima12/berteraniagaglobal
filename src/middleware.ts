
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  if (isAdminRoute) {
    if (isLoginPage) {
      // If user is logged in and tries to access login page, redirect to admin dashboard
      if (sessionToken === 'authenticated_admin_token_example') { // Check for specific admin token
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      // Allow access to login page if not logged in
      return NextResponse.next();
    }

    // For any other /admin route, if user is not logged in with admin token, redirect to login page
    if (sessionToken !== 'authenticated_admin_token_example') {
      const loginUrl = new URL('/admin/login', request.url);
      // You can add a 'redirectedFrom' query parameter if you want to redirect back after login
      // loginUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
