'use client';

import { IcHeaderArrow } from '@svg';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title?: string;
  back: boolean;
}

const Header = ({ title, back }: HeaderProps) => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <header className='fixed z-40 inset-0 top-0 mx-auto flex h-[6rem] max-w-[768px] items-center px-[2rem] py-[1rem]'>
      {/* 왼쪽 화살표 */}
      <div className='flex w-1/6 items-center'>
        {back && (
          <IcHeaderArrow onClick={handleClickBack} className='cursor-pointer' />
        )}
      </div>
      {/* 가운데 타이틀 */}
      <div className='flex-1 flex justify-center'>
        <h1 className='font-bold-22 text-main text-center'>{title}</h1>
      </div>
      {/* 오른쪽 공간 맞추기 */}
      <div className='w-1/6' />
    </header>
  );
};

export default Header;
