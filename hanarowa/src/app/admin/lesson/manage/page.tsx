'use client';

import { Header, Layout } from '@/components';

const Page = () => {
  return (
    <Layout header={<Header title='강좌 신청 관리' />}>
      <div className='flex w-full flex-col gap-7 p-4'>강좌 신청 관리</div>
    </Layout>
  );
};

export default Page;
