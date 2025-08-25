'use client';

import { IcCheck } from '@/assets/svg';
import { Button } from '@/components/atoms';
import Layout from '@/components/atoms/Layout';

const Page = () => {
  return (
    <Layout>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-col items-start justify-start pt-[14.1rem] pl-[2.2rem]'>
          <h1 className='font-bold-26 text-black'>회원가입을 완료했어요!</h1>
          <p className='font-medium-20 text-gray4a9 pt-[1.3rem]'>
            마이페이지에서
          </p>
          <p className='font-medium-20 text-gray4a9'>
            프로필을 변경할 수 있어요!
          </p>
        </div>
      </div>
      <div className='flex items-center justify-center pt-[7.9rem]'>
        <IcCheck />
      </div>
      <div className='w-full justify-end'>
        <Button className='w-full' sizeType='lg' variant='green'>
          강좌 신청하러 가기
        </Button>
      </div>
    </Layout>
  );
};

export default Page;
