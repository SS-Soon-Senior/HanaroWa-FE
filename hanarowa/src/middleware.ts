// /middleware.ts
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import isValidToken from './utils/is-valid-token';

export async function middleware(request: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const loginUrl = new URL('/auth/login/social', request.url);
  console.log('middleware 실행됨', request.url);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  console.log('request.headers', request.headers);
  console.log(cookieStore);

  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);

  if (!refreshToken?.value) {
    console.log(first);
    return NextResponse.redirect(loginUrl);
  }

  const { isAccessTokenValid } = isValidToken({
    accessToken: accessToken?.value,
  });

  if (isAccessTokenValid) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(`${API_URL}/auth/reissue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: refreshToken.value }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const logoutResponse = NextResponse.redirect(loginUrl);
      logoutResponse.cookies.delete('accessToken');
      logoutResponse.cookies.delete('refreshToken');
      return logoutResponse;
    }

    // 재발급 성공 시
    const tokens = await response.json();
    const newAccessToken = tokens.data?.accessToken;
    const newRefreshToken = tokens.data?.refreshToken;

    const nextResponse = NextResponse.next();

    if (newAccessToken) {
      nextResponse.cookies.set('accessToken', newAccessToken, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }
    if (newRefreshToken) {
      nextResponse.cookies.set('refreshToken', newRefreshToken, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    return nextResponse;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!api/|_next/static|_next/image|fonts/|.well-known|favicon.(?:ico|svg)|auth/login(?:/.*)?|auth/signup(?:/.*)?).*)',
  ],
};
