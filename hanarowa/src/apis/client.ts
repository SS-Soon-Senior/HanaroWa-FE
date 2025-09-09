import { paths } from '@/types/api';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

const baseClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

// 응답 인터셉터 추가
baseClient.use({
  async onResponse({ response }) {
    if (response.status === 401) {
      if (isRefreshing && refreshPromise) {
        const refreshSuccess = await refreshPromise;
        if (refreshSuccess) {
          return undefined;
        }
        return response;
      }

      isRefreshing = true;
      refreshPromise = refreshToken();

      const refreshSuccess = await refreshPromise;
      isRefreshing = false;
      refreshPromise = null;

      if (refreshSuccess) {
        return undefined;
      } else {
        window.location.href = '/auth/login/social';
        return response;
      }
    }
    return response;
  },
});

async function refreshToken(): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/reissue`,
      {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
      }
    );
    return response.ok;
  } catch (error) {
    return false;
  }
}

export const client = baseClient;
export const TanstackQueryClient = createClient(client);
