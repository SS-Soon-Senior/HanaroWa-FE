import { IcBookByeoldol, IcGoogle, IcKakao, IcNaver } from '@/assets/svg';
import { Layout } from '@/components';
import Link from 'next/link';

const Page = () => {
  const socialButtonStyle =
    'rounded-8 font-bold-20 flex w-full items-center justify-center gap-[1rem] px-auto py-[1.7rem]';

  return (
    <Layout>
      <div className='flex h-full w-full flex-col items-center'>
        <div className='flex flex-col items-center pt-[17.9rem]'>
          <IcBookByeoldol />
          <h1 className='font-medium-26 pt-[-2rem] text-center text-black'>
            하나로와
          </h1>
        </div>
        <div className='flex w-full flex-col items-center gap-[1.2rem] pt-[6rem]'>
          <Link href='#' className={`${socialButtonStyle} bg-gray4f6`}>
            <IcGoogle />
            <h1 className='text-black'>구글로 로그인하기</h1>
          </Link>
          <Link href='#' className={`${socialButtonStyle} bg-kakao`}>
            <IcKakao />
            <h1 className='text-[#371F1C]'>카카오로 로그인하기</h1>
          </Link>
          <Link href='#' className={`${socialButtonStyle} bg-naver text-white`}>
            <IcNaver />
            <h1 className='text-white'>네이버로 로그인하기</h1>
          </Link>
        </div>
        <Link
          href='/auth/login'
          className='font-medium-18 text-gray4a9 justify-center pt-[1.6rem] underline'
        >
          로그인/회원가입하기
        </Link>
      </div>
    </Layout>
  );
};

export default Page;
