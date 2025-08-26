'use client';

import { Header, Layout } from '@/components';

const Page = () => {
  return (
    <Layout header={<Header title='시설 예약 목록' />}>
      <div className='flex w-full flex-col gap-7 p-4'>시설 예약 목록</div>
    </Layout>
  );
};

export default Page;
