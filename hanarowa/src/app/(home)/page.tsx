'use client';

import { IcSearch, IcBell, IcBook, IcSofa, IcCalendar } from '@/assets/svg';
import { useGetMemberBranch } from '@apis';
import {
  Layout,
  BottomNavigation,
  BranchSelectHeader,
  MenuSection,
  LessonSection,
} from '@components';

const lectureMenu = [
  {
    icon: <IcSearch />,
    title: '강좌 찾기',
    href: '/lesson',
  },
  {
    icon: <IcBell />,
    title: '강좌 개설',
    href: '/lesson/create',
  },
  {
    icon: <IcBook />,
    title: '내 강좌',
    href: '/reservation/lesson',
  },
];

const reservationMenu = [
  {
    icon: <IcSofa />,
    title: '시설',
    href: '/facility',
  },
  {
    icon: <IcCalendar />,
    title: '내 예약',
    href: '/reservation/facility',
  },
];

const Page = () => {
  const response = useGetMemberBranch();
  const myBranch = response.data?.result;

  return (
    <Layout footer={<BottomNavigation />}>
      <BranchSelectHeader
        location={myBranch?.locationName ?? ''}
        title={myBranch?.branchName ?? ''}
      />
      <MenuSection title='강좌' items={lectureMenu} />
      <MenuSection title='예약 하기' items={reservationMenu} />
      <LessonSection />
    </Layout>
  );
};

export default Page;
