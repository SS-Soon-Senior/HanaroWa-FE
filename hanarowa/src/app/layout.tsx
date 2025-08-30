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
    <html lang='ko'>
      <body className='antialiased' suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
