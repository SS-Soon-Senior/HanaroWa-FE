'use client';

import { getAccessToken, setAccessToken, logout } from '@/utils/common/auth';
import { Middleware } from 'openapi-fetch';
import postRefreshToken from './auth/postRefreshToken';

const UNPROTECTED_ROUTES = ['/auth/login', '/auth/reissue', '/auth/signup'];

const reissueToken = async (): Promise<string | null> => {
  try {
    const result = await postRefreshToken();

    if (!result.isSuccess || !result.data) {
      console.warn('Reissue failed, redirecting to login page.');
      logout();
      window.location.href = '/auth/login';
      return null;
    }

    return result.data.result.accessToken;
  } catch (error) {
    console.error('Token reissue error:', error);
    logout();
    window.location.href = '/auth/login';
    return null;
  }
};

const authMiddleware: Middleware = {
  async onRequest({ schemaPath, request }) {
    if (UNPROTECTED_ROUTES.some((route) => schemaPath.startsWith(route))) {
      return request;
    }

    const cookie = await cookieStore.get('accessToken');
    const accessToken = cookie?.value;

    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return request;
  },

  async onResponse({ request, response, schemaPath }) {
    // 권한 없을 때 (403 에러)
    if (response.status === 403) {
      if (typeof window !== 'undefined') {
        if (schemaPath.startsWith('/admin')) {
          //로그아웃시키면서 auth/login 페이지로 넘김
          window.location.replace('/auth/login');
          logout();
        }
      }
      return response;
    }

    if (
      response.status === 401 &&
      !UNPROTECTED_ROUTES.some((route) => schemaPath.startsWith(route))
    ) {
      const newAccessToken = await reissueToken();
      console.log('New Access Token after reissue:', newAccessToken);
      const clonedRequest = request.clone();
      clonedRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);

      return fetch(clonedRequest);
    }

    return response;
  },
};

export default authMiddleware;
