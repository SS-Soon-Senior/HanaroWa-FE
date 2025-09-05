// /middleware.ts
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';
import isValidToken from './utils/is-valid-token';

export async function middleware(request: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const loginUrl = new URL('/auth/login/social', request.url);

  // 1. 동기적으로 쿠키를 가져옵니다 (await 제거)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  // 리프레시 토큰조차 없으면 무조건 로그인 페이지로 보냅니다.
  if (!refreshToken?.value) {
    return NextResponse.redirect(loginUrl);
  }

  // 액세스 토큰의 유효성을 확인합니다.
  const { isAccessTokenValid } = isValidToken({
    accessToken: accessToken?.value,
  });

  // 액세스 토큰이 유효하면 아무것도 하지 않고 통과시킵니다.
  if (isAccessTokenValid) {
    return NextResponse.next();
  }

  // 액세스 토큰이 만료되었거나 없을 경우, 재발급을 시도합니다.
  try {
    console.log('액세스 토큰 만료, 재발급 시도');
    const response = await fetch(`${API_URL}/auth/reissue`, {
      method: 'POST',
      headers: {
        // 2. 서버 간 통신이므로, refreshToken을 'Cookie' 헤더에 직접 담아 보냅니다.
        Cookie: `refreshToken=${refreshToken.value}`,
      },
      cache: 'no-store',
    });

    // 재발급 실패 시 (예: 리프레시 토큰 만료)
    if (!response.ok) {
      console.log('토큰 재발급 실패, 로그인으로 리디렉션');
      const logoutResponse = NextResponse.redirect(loginUrl);
      logoutResponse.cookies.delete('accessToken');
      logoutResponse.cookies.delete('refreshToken');
      return logoutResponse;
    }

    // 3. 재발급 성공 시, JSON 본문이 아닌 응답 헤더(Set-Cookie)에서 새 토큰을 파싱합니다.
    const responseHeaders = new ResponseCookies(response.headers);
    const newAccessToken = responseHeaders.get('accessToken');
    const newRefreshToken = responseHeaders.get('refreshToken');

    // 4. 레이스 컨디션 방지를 위해 현재 URL로 리디렉션 응답을 생성합니다.
    const redirectResponse = NextResponse.redirect(request.url);

    // 리디렉션 응답에 파싱한 새 쿠키들을 설정합니다.
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
