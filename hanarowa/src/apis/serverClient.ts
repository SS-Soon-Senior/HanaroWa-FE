'use server';

import { paths } from '@/types/api';
import createFetchClient from 'openapi-fetch';
import { cookies } from 'next/headers';

export const createServerClient = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return createFetchClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
};
