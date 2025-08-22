import { clsx } from 'clsx';
import { PropsWithChildren } from 'react';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

type Props = {
  title?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  showBottomNav?: boolean;
};

const Layout = ({
  children,
  title,
  showHeader = true,
  showBackButton = true,
  showBottomNav = false,
}: PropsWithChildren<Props>) => {
  return (
    <div className='relative mx-auto min-h-screen max-w-[768px]'>
      {showHeader && <Header title={title} showBackButton={showBackButton} />}
      <main
        className={clsx({
          'pt-[6rem]': showHeader,
          'pb-[11.5rem]': showBottomNav,
          'pb-[4rem]': !showBottomNav,
          'px-[2rem]': true,
        })}
      >
        {children}
      </main>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};

export default Layout;
