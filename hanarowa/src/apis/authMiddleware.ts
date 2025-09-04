'use client';

import { getAccessToken } from '@/utils/common/auth';
import { Middleware } from 'openapi-fetch';

const simpleAuthMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = getAccessToken(); // 클라이언트에서 사용하기 위해 쿠키를 읽는 함수

    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return request;
  },
};

export default simpleAuthMiddleware;
