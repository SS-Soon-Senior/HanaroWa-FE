'use client';

import { BranchProvider } from '@contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type * as React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BranchProvider>{children}</BranchProvider>
    </QueryClientProvider>
  );
};

export default Providers;
