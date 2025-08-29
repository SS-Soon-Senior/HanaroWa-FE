import { paths } from '@/types/api';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

export const client = createFetchClient<paths>({
  baseUrl: process.env.NEXTAUTH_URL,
});

export const TanstackQueryClient = createClient(client);
