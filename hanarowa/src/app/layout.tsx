import { BranchProvider } from '@contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: '하나로와',
  description: '하나로와',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang='ko'>
      <body className='antialiased' suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <BranchProvider>{children}</BranchProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
