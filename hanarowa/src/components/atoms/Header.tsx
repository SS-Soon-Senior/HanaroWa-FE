'use client';

import { IcHeaderArrow } from '@svg';
import { useRouter } from 'next/navigation';

type Props = {
  title?: string;
  showBackButton?: boolean;
};

const Header = ({ title, showBackButton = true }: Props) => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <header className='bg-background fixed inset-0 top-0 z-40 mx-auto flex h-[6rem] max-w-[768px] items-center px-[2rem] py-[1rem]'>
      {/* 왼쪽 화살표 */}
      <div className='flex w-1/6 items-center'>
        {showBackButton && (
          <IcHeaderArrow onClick={handleClickBack} className='cursor-pointer' />
        )}
      </div>
      {/* 가운데 타이틀 */}
      <div className='flex flex-1 justify-center'>
        <h1 className='font-bold-22 text-main text-center'>{title}</h1>
      </div>
      {/* 오른쪽 공간 맞추기 */}
      <div className='w-1/6' />
    </header>
  );
};

export default Header;
