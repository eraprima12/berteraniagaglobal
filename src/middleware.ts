
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ADMIN_LOGIN_PATH = '/admin/login';
const ADMIN_DASHBOARD_PATH = '/admin';
const AUTH_COOKIE_NAME = 'admin-auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has(AUTH_COOKIE_NAME);

  // If trying to access admin login page while already authenticated, redirect to admin dashboard
  if (isAuthenticated && pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
  }

  // If trying to access any other admin page without authentication, redirect to admin login
  if (!isAuthenticated && pathname.startsWith('/admin') && pathname !== ADMIN_LOGIN_PATH) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
