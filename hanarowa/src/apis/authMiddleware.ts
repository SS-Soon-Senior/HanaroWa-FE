'use client';

import { getAccessToken, setAccessToken, logout } from '@/utils/common/auth';
import { Middleware } from 'openapi-fetch';
import postRefreshToken from './auth/postRefreshToken';

const UNPROTECTED_ROUTES = ['/auth/signin', '/auth/reissue', '/member/regist'];

const reissueToken = async (): Promise<string | null> => {
  try {
    const result = await postRefreshToken();

    if (!result.isSuccess || !result.data) {
      console.warn('Reissue failed, redirecting to login page.');
      logout();
      window.location.href = '/auth/login';
      return null;
    }

    const { accessToken } = result.data;

    if (accessToken) {
      setAccessToken(accessToken);
      return accessToken;
    }

    return null;
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

    const accessToken = getAccessToken();

    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return request;
  },

  async onResponse({ request, response, schemaPath }) {
    if (
      response.status === 401 &&
      !UNPROTECTED_ROUTES.some((route) => schemaPath.startsWith(route))
    ) {
      const newAccessToken = await reissueToken();

      if (!newAccessToken) {
        return response;
      }

      const clonedRequest = request.clone();
      clonedRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);

      return fetch(clonedRequest);
    }

    return response;
  },
};

export default authMiddleware;
