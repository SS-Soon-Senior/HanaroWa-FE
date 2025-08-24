import { IcGoogle, IcKakao, IcNaver } from '@/assets/svg';
import Image from 'next/image';
import Link from 'next/link';

export default function SocialLoginPage() {
  return (
    <div className='relative flex flex-col items-center px-[2.0rem]'>
      <div className='flex flex-col items-center pt-[17.9rem]'>
        <Image
          src='/imgs/logo.png'
          alt='logo'
          width={164}
          height={164}
          priority
        />
        <p className='font-medium-26 relative pt-[-2rem] text-center font-black'>
          하나로와
        </p>
      </div>
      <div className='rounded-8 flex w-full flex-col items-center gap-[1rem] pt-[6.095rem]'>
        <button className='bg-gray4f6 font-bold-22 flex w-full flex-row py-[1.7rem]'>
          <div className='flex flex-row gap-[1rem] pl-[5.15rem]'>
            <IcGoogle width={38} height={38} />
            <p>구글로 로그인하기</p>
          </div>
        </button>
        <button className='bg-kakao font-bold-22 rounded-8 flex w-full flex-row py-[1.7rem]'>
          <div className='flex flex-row gap-[1rem] pl-[5.15rem]'>
            <IcKakao width={38} height={38} />
            <p>카카오로 로그인하기</p>
          </div>
        </button>
        <button className='bg-naver font-bold-22 text-background rounded-8 flex w-full flex-row py-[1.7rem]'>
          <div className='flex flex-row gap-[1rem] pl-[5.15rem]'>
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
}
