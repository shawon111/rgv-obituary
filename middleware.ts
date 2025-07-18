import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/token';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard'];
  const authRoutes = ['/auth/login', '/auth/register'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // If trying to access protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If token exists, verify it
  if (token) {
    const decoded = await verifyToken(token);

    console.log('TOKEN:', token);
    console.log('DECODED:', decoded);

    // Invalid token
    if (!decoded && isProtectedRoute) {
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('auth-token'); // Clear the bad cookie
      return response;
    }

    // Already logged in, redirect from login/register
    if (decoded && isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
