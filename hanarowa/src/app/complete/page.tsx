'use client';

import { IcCheck } from '@/assets/svg';
import { Button } from '@/components/atoms';
import Layout from '@/components/atoms/Layout';
import Link from 'next/link';

const Page = () => {
  return (
    <Layout
      footer={
        <div className='w-full justify-end px-[2rem] pb-[2rem]'>
          <Button className='w-full' sizeType='lg' variant='green'>
            <Link href='/home'>홈으로 가기</Link>
          </Button>
        </div>
      }
    >
      <div className='flex w-full flex-col items-center pl-[2.2rem]'>
        <div className='flex flex-col pt-[23.8rem]'>
          <h1 className='font-bold-26 text-black'>예약을 완료되었습니다!</h1>
        </div>
      </div>
      <div className='flex items-center justify-center pt-[6.7rem]'>
        <IcCheck />
      </div>
    </Layout>
  );
};

export default Page;
