import { GoBackButton } from '@components';
import { IcHeaderSearch } from '@svg';
import Link from 'next/link';

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
  return (
    <header className='bg-background fixed inset-0 top-0 z-40 mx-auto flex h-[9rem] max-w-[768px] items-center px-[2rem] py-[2rem]'>
      {/* 왼쪽 화살표 */}
      <div className='flex w-1/6 items-center'>
        {showBackButton && <GoBackButton />}
      </div>
      {/* 가운데 타이틀 */}
      <div className='flex flex-1 justify-center'>
        <h1 className='font-bold-22 text-main text-center'>{title}</h1>
      </div>
      {/* 오른쪽 공간 */}
      <Link
        href='/lesson/search'
        className='flex w-1/6 items-center justify-end'
      >
        {showSearchButton && <IcHeaderSearch />}
      </Link>
    </header>
  );
};

export default Header;
