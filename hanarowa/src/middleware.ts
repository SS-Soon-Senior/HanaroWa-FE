// /middleware.ts
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';
import isValidToken from './utils/is-valid-token';

export async function middleware(request: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const loginUrl = new URL('/auth/login/social', request.url);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken?.value) {
    return NextResponse.redirect(loginUrl);
  }

  const { isAccessTokenValid, userRole } = isValidToken({
    accessToken: accessToken?.value,
  });

  if (isAccessTokenValid) {
    // 관리자 페이지 접근 권한 체크
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (userRole !== 'ADMIN' && userRole !== 'ROLE_ADMIN') {
        console.log('관리자 권한 없음, 홈으로 리디렉션');
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
    return NextResponse.next();
  }

  try {
    console.log('액세스 토큰 만료, 재발급 시도');
    const response = await fetch(`${API_URL}/auth/reissue`, {
      method: 'POST',
      headers: {
        Cookie: `refreshToken=${refreshToken.value}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.log('토큰 재발급 실패, 로그인으로 리디렉션');
      const logoutResponse = NextResponse.redirect(loginUrl);
      logoutResponse.cookies.delete('accessToken');
      logoutResponse.cookies.delete('refreshToken');
      return logoutResponse;
    }

    const responseHeaders = new ResponseCookies(response.headers);
    const newAccessToken = responseHeaders.get('accessToken');
    const newRefreshToken = responseHeaders.get('refreshToken');
    const redirectResponse = NextResponse.redirect(request.url);

    if (newAccessToken) {
      redirectResponse.cookies.set(newAccessToken.name, newAccessToken.value, {
        path: newAccessToken.path,
        httpOnly: newAccessToken.httpOnly,
        secure: newAccessToken.secure,
        maxAge: newAccessToken.maxAge,
        sameSite: 'lax',
      });
    }
    if (newRefreshToken) {
      redirectResponse.cookies.set(
        newRefreshToken.name,
        newRefreshToken.value,
        {
          path: newRefreshToken.path,
          httpOnly: newRefreshToken.httpOnly,
          secure: newRefreshToken.secure,
          maxAge: newRefreshToken.maxAge,
          sameSite: 'strict',
        }
      );
    }

    return redirectResponse;
  } catch (error) {
    console.error('토큰 재발급 중 네트워크 오류 발생:', error);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!api/|_next/static|_next/image|fonts/|.well-known|favicon.(?:ico|svg)|auth/login(?:/.*)?|auth/signup(?:/.*)?).*)',
  ],
};
