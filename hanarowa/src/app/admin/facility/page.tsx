import { AdminFacilitySection, Header, Layout } from '@/components';

const Page = async () => {
  return (
    <Layout header={<Header title='시설 예약 목록' />}>
      <AdminFacilitySection />
    </Layout>
  );
};

export default Page;
