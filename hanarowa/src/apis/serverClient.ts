'use server';

import { paths } from '@/types/api';
import createFetchClient from 'openapi-fetch';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const createServerClient = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const client = createFetchClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  client.use({
    async onResponse({ response }) {
      if (response.status === 401) {
        redirect('/auth/refresh');
      }
      return response;
    },
  });

  return client;
};
