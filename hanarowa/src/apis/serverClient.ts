'use server';

import { paths } from '@/types/api';
import createFetchClient from 'openapi-fetch';
import { cookies } from 'next/headers';

/**
 * 오직 서버 컴포넌트에서만 사용해야 하는 클라이언트 생성 함수입니다.
 */
export const ServerComponentClient = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return createFetchClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      'Content-Type': 'application/json',
    },
  });
};
