'use client';

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  logout,
} from '@/utils/common/auth';
import { Middleware } from 'openapi-fetch';
import postRefreshToken from './auth/postRefreshToken';

const UNPROTECTED_ROUTES = [
  '/auth/signin',
  '/auth/reissue',
  '/member/regist',
  '/member/info',
];

const reissueToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.warn('No refresh token available');
    logout();
    window.location.href = '/auth/login';
    return null;
  }

  try {
    const result = await postRefreshToken();

    if (!result.isSuccess || !result.data) {
      console.warn('Reissue failed, redirecting to login page.');
      logout();
      window.location.href = '/auth/login';
      return null;
    }

    const { accessToken, refreshToken: newRefreshToken } = result.data;

    if (accessToken) {
      setAccessToken(accessToken);
    }
    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
    }

    return accessToken || null;
  } catch (error) {
    console.error('Token reissue error:', error);
    logout();
    window.location.href = '/auth/login';
    return null;
  }
};

const authMiddleware: Middleware = {
  async onRequest({
    schemaPath,
    request,
  }: {
    schemaPath: string;
    request: Request;
  }) {
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
