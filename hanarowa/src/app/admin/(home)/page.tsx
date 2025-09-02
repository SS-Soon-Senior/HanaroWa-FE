'use client';

import {
  IcSofa,
  IcAdminUsers,
  IcCalendar,
  IcBook,
  IcBell,
  IcBookByeoldol,
} from '@/assets/svg';
import { Layout, BranchSelectHeader, MenuSection } from '@components';
import { useBranch } from '@hooks';

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
  const { myBranch } = useBranch();
  return (
    <Layout
      header={
        <BranchSelectHeader
          location={myBranch.locationName ?? ''}
          title={myBranch.branchName ?? ''}
          admin={true}
        />
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
