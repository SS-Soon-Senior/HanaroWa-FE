'use client';

import authMiddleware from '@/apis/authMiddleware';
import { client } from '@/apis/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type * as React from 'react';
import { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  client.use(authMiddleware);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default Providers;
