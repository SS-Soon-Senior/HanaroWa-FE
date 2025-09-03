'use client';

import authMiddleware from '@/apis/authMiddleware';
import { client } from '@/apis/client';
import { BranchProvider } from '@contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type * as React from 'react';
import { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  client.use(authMiddleware);

  return (
    <QueryClientProvider client={queryClient}>
      <BranchProvider> {children}</BranchProvider>
    </QueryClientProvider>
  );
};
export default Providers;
