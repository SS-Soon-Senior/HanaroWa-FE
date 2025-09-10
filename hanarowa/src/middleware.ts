import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

function getUserRoleFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || payload.authorities?.[0] || null;
  } catch (error) {
    console.warn('Token decoding failed:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');
  const accessToken = cookieStore.get('accessToken');

  if (!refreshToken?.value) {
    const loginUrl = new URL('/auth/login/social', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!accessToken?.value) {
      const loginUrl = new URL('/auth/login/social', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = getUserRoleFromToken(accessToken.value);

    // Check if user has admin role
    if (userRole !== 'ADMIN') {
      // Redirect to home page - unauthorized access
      const unauthorizedUrl = new URL('/', request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/|_next/static|_next/image|fonts/|.well-known|favicon.(?:ico|svg)|auth/login|auth/signup|auth/refresh).*)',
  ],
};
