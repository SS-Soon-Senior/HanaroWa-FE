'use client';

import { IcSearch, IcBell, IcBook, IcSofa, IcCalendar } from '@/assets/svg';
import {
  Layout,
  BottomNavigation,
  BranchSelectHeader,
  MenuSection,
  LessonSection,
} from '@components';
import { useBranch } from '@hooks';

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
  const { location, branch } = useBranch();

  return (
    <Layout footer={<BottomNavigation />}>
      <BranchSelectHeader location={location} title={branch} />
      <MenuSection title='강좌' items={lectureMenu} />
      <MenuSection title='예약 하기' items={reservationMenu} />
      <LessonSection />
    </Layout>
  );
};

export default Page;
