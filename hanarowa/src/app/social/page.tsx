import { IcBookByeoldol, IcGoogle, IcKakao, IcNaver } from '@/assets/svg';
import Link from 'next/link';

const SocialLoginPage = () => {
  return (
    <div className='relative flex flex-col items-center px-[2.0rem]'>
      <div className='flex flex-col items-center pt-[17.9rem]'>
        <IcBookByeoldol />
        <p className='font-medium-26 relative pt-[-2rem] text-center font-black'>
          하나로와
        </p>
      </div>
      <div className='rounded-8 flex w-full flex-col items-center gap-[1rem] pt-[6.095rem]'>
        <button className='bg-gray4f6 font-bold-22 flex w-full items-center justify-start gap-[1.7rem] py-[1.7rem] pl-[6rem]'>
          <div className='flex items-center justify-center'>
            <IcGoogle width={21} height={20} />
          </div>
          <p>구글로 로그인하기</p>
        </button>
        <button className='bg-kakao font-bold-22 flex w-full items-center justify-start gap-[1rem] py-[1.7rem] pl-[5.3rem]'>
          <div className='flex items-center justify-center'>
            <IcKakao width={38} height={38} />
            <p>카카오로 로그인하기</p>
          </div>
        </button>
        <button className='bg-naver font-bold-22 flex w-full items-center justify-start gap-[1rem] py-[1.7rem] pl-[5.3rem] text-white'>
          <div className='flex items-center justify-center'>
            <IcNaver width={38} height={38} />
            <p>네이버로 로그인하기</p>
          </div>
        </button>
      </div>

      <Link
        href='/login'
        className='font-medium-18 text-gray4a9 pt-[1.6rem] underline'
      >
        로그인/회원가입하기
      </Link>
    </div>
  );
};

export default SocialLoginPage;
