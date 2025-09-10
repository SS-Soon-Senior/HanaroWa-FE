import { ToastProvider } from '@components';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';
import Providers from './provider';

const hanaFont = localFont({
  src: [
    {
      path: '../../public/fonts/Hana2-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Hana2-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Hana2-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Hana2-Bold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Hana2-Heavy.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-hana',
});

export const metadata: Metadata = {
  title: '하나로와',
  description: '하나로와',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang='ko'
      suppressHydrationWarning
      className={`${hanaFont.variable} font-hana`}
    >
      <body className='antialiased'>
        <Providers>{children}</Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
