'use client';

import {
  IcAdminUsers,
  IcBell,
  IcBook,
  IcBookByeoldol,
  IcCalendar,
  IcSofa,
} from '@/assets/svg';
import { BranchSelectHeader, Layout } from '@/components/atoms';
import { MenuSection } from '@/components/home';
import { useBranch } from '@hooks';

const firstMenu = [
  {
    icon: <IcSofa />,
    title: '시설 예약',
    href: '/lesson',
  },
  {
    icon: <IcAdminUsers />,
    title: '회원',
    href: '/lesson/create',
  },
  {
    icon: <IcCalendar />,
    title: '강좌 관리',
    href: '/',
  },
];

const secondMenu = [
  {
    icon: <IcBook />,
    title: '강좌 목록',
    href: '/',
  },
  {
    icon: <IcBell />,
    title: '강좌 개설',
    href: '/',
  },
];

const Page = () => {
  const { location, branch } = useBranch();
  return (
    <Layout
      header={
        <BranchSelectHeader location={location} title={branch} admin={true} />
      }
    >
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
