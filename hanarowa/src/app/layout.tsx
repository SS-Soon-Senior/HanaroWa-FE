import { ToastProvider } from '@components';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';
import Providers from './provider';

export const metadata: Metadata = {
  title: '하나로와',
  description: '하나로와',
  icons: { icon: '/favicon.svg' },
};

const myFont = localFont({
  src: './fonts/Hana2-Medium.otf', // 폰트 파일 경로
  variable: '--font-hana',
  display: 'swap', // 폰트 로딩 방식 설정
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning className={myFont.className}>
      <body className='antialiased'>
        <Providers>{children}</Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
