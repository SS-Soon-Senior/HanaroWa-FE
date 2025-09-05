import { ToastProvider } from '@components';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import Providers from './provider';

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
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className='antialiased'>
        <Providers>{children}</Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
