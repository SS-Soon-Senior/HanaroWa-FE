import { BottomNavigation, Layout, SpotSelectHeader } from '@/components/atoms';
import { LectureSection, MenuSection } from '@/components/home';
import { IcSearch, IcBell, IcBook, IcCalendar, IcSofa } from '@svg';

const lectureMenu = [
  {
    icon: <IcSearch />,
    title: '강좌 찾기',
    href: '/lectures',
  },
  {
    icon: <IcBell />,
    title: '강좌 개설',
    href: '/lectures/create',
  },
  {
    icon: <IcBook />,
    title: '내 강좌',
    href: '/my-lectures',
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
    href: '/reservation',
  },
];

const Page = () => (
  <Layout
    header={<SpotSelectHeader location='춘천' title='하나50+ 컬처뱅크' />}
    footer={<BottomNavigation />}
  >
    <MenuSection title='강좌' items={lectureMenu} />
    <MenuSection title='예약 하기' items={reservationMenu} />
    <LectureSection />
  </Layout>
);

export default Page;
