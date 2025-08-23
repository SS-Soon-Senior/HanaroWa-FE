import { BottomNavigation, Layout, SpotSelectHeader } from '@/components/atoms';

const Page = () => (
  <Layout
    header={<SpotSelectHeader location='춘천' title='하나50+ 컬처뱅크' />}
    footer={<BottomNavigation />}
  ></Layout>
);

export default Page;
