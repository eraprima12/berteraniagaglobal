
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'bertera-admin-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get(AUTH_COOKIE_NAME)?.value === 'true';

  // If trying to access admin login page but already authenticated, redirect to admin dashboard
  if (isAuthenticated && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If trying to access any other admin page without authentication, redirect to login
  if (!isAuthenticated && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};
