'use client';

import {
  IcSofa,
  IcAdminUsers,
  IcCalendar,
  IcBook,
  IcBell,
  IcBookByeoldol,
} from '@/assets/svg';
import { getAccessToken, logout } from '@/utils/common/auth';
import { Layout, MenuSection } from '@components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type JWTPayload = { role?: string; exp?: number };

const decodeJwt = (token: string): JWTPayload | null => {
  try {
    const b64 = token.split('.')[1] ?? '';
    const b64url = b64.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64url.length % 4 ? '='.repeat(4 - (b64url.length % 4)) : '';
    const json = atob(b64url + pad);
    return JSON.parse(json) as JWTPayload;
  } catch {
    return null;
  }
};

const firstMenu = [
  {
    icon: <IcSofa />,
    title: '시설 예약',
    href: '/admin/facility',
  },
  {
    icon: <IcAdminUsers />,
    title: '회원',
    href: '/admin/member',
  },
  {
    icon: <IcCalendar />,
    title: '강좌 관리',
    href: '/admin/lesson/manage',
  },
];

const secondMenu = [
  {
    icon: <IcBook />,
    title: '강좌 목록',
    href: '/admin/lesson',
  },
  {
    icon: <IcBell />,
    title: '강좌 개설',
    href: '/admin/lesson/manage',
  },
];

const Page = () => {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace('/auth/login');
      return;
    }
    const payload = decodeJwt(token);
    const now = Math.floor(Date.now() / 1000);

    if (!payload || (payload.exp && payload.exp <= now)) {
      router.replace('/auth/login');
      return;
    }
    if (payload.role !== 'ADMIN') {
      logout();
      router.replace('/auth/login');
      return;
    }
    setOk(true);
  }, [router]);

  if (!ok) return null;
  return (
    <Layout>
      <div className='flex flex-col items-center justify-center pt-[15rem]'>
        <div className='flex flex-col items-center justify-center'>
          <IcBookByeoldol />
          <h1 className='font-bold-24 text-center text-black'>
            관리자 빠른 메뉴
          </h1>
        </div>
        <MenuSection items={firstMenu} />
        <MenuSection items={secondMenu} className='mt-[-1rem]' />
      </div>
    </Layout>
  );
};

export default Page;
