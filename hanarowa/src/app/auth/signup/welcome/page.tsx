import { IcCheck } from '@/assets/svg';
import { Button } from '@/components/atoms';
import Layout from '@/components/atoms/Layout';
import Link from 'next/link';

const Page = () => {
  return (
    <Layout>
      <div className='flex w-full flex-1 flex-col items-center justify-between'>
        <div className='flex w-full flex-col pl-[2rem]'>
          <div className='flex flex-col pt-[10rem]'>
            <h1 className='font-bold-26 text-black'>회원가입을 완료했어요!</h1>
            <p className='font-medium-20 text-gray4a9 pt-[1.3rem]'>
              마이페이지에서
            </p>
            <p className='font-medium-20 text-gray4a9'>
              프로필을 변경할 수 있어요!
            </p>
          </div>
        </div>
        <IcCheck className='mb-[4rem]' />
        <Link href='/branch' className='w-full'>
          <Button className='w-full' sizeType='lg' variant='green'>
            내 지점 선택하러 가기
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Page;
