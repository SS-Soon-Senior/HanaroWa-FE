import { IcBookByeoldol } from '@/assets/svg';
import {
  Layout,
  BranchSelectHeader,
  BottomNavigation,
} from '@/components/atoms';
import { MenuSection, LessonSection } from '@/components/home';

const Page = () => {
  return (
    <Layout>
      <IcBookByeoldol />
      {/* <MenuSection title='강좌' items={lectureMenu} />
      <MenuSection title='예약 하기' items={reservationMenu} /> */}
    </Layout>
  );
};

export default Page;
