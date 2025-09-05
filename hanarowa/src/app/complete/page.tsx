import { IcCheck } from '@/assets/svg';
import { Button, Layout } from '@/components';
import Link from 'next/link';
import { use } from 'react';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = ({ searchParams }: Props) => {
  const { state } = use(searchParams);

  return (
    <Layout
      footer={
        <div className='w-full justify-end px-[2rem] pb-[2rem]'>
          <Link href='/' className='w-full'>
            <Button sizeType='lg' variant='green'>
              홈으로 가기
            </Button>
          </Link>
        </div>
      }
    >
      <div className='flex w-full flex-col items-center pl-[2.2rem]'>
        <div className='flex flex-col pt-[23.8rem]'>
          <h1 className='font-bold-26 text-black'>{state} 완료되었습니다!</h1>
        </div>
      </div>
      <div className='flex items-center justify-center pt-[6.7rem]'>
        <IcCheck />
      </div>
    </Layout>
  );
};

export default Page;
