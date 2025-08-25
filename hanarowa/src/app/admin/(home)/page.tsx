import {
  IcAdminUsers,
  IcBell,
  IcBook,
  IcBookByeoldol,
  IcCalendar,
  IcSofa,
} from '@/assets/svg';
import { Layout } from '@/components/atoms';
import { MenuSection, LessonSection } from '@/components/home';

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
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <IcBookByeoldol />
        <h1 className='font-bold-24 text-center text-black'>
          관리자 빠른 메뉴
        </h1>
      </div>
      <MenuSection items={firstMenu} />
      <MenuSection items={secondMenu} className='mt-[-1rem]' />
    </div>
  );
};

export default Page;
