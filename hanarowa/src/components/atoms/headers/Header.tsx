'use client';

import { IcHeaderArrow, IcHeaderSearch } from '@svg';
import { useRouter } from 'next/navigation';

type Props = {
  title?: string;
  showBackButton?: boolean;
  showSearchButton?: boolean;
};

const Header = ({
  title,
  showBackButton = true,
  showSearchButton = false,
}: Props) => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  const handleClickSearch = () => {
    router.push('/lesson/search');
  };

  return (
    <header className='bg-background fixed inset-0 top-0 z-40 mx-auto flex h-[9rem] max-w-[768px] items-center px-[2rem] py-[2rem]'>
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
      {/* 오른쪽 공간 */}
      <div className='flex w-1/6 items-center justify-end'>
        {showSearchButton && (
          <IcHeaderSearch
            onClick={handleClickSearch}
            className='cursor-pointer'
          />
        )}
      </div>
    </header>
  );
};

export default Header;
