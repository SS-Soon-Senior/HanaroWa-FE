import { paths } from '@/types/api';
import createFetchClient from 'openapi-fetch';

export const client = createFetchClient<paths>({
  baseUrl: process.env.NEXTAUTH_URL,
});
