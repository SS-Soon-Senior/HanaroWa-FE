import { cn } from '@/utils/utils';
import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

const Layout = ({
  children,
  header,
  footer,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <div className='relative mx-auto flex min-h-dvh w-dvw max-w-[768px] flex-col overflow-x-hidden'>
      {header}
      <main
        className={cn(
          {
            'pt-[9rem]': !!header,
            'pb-[11.5rem]': !!footer,
            'pb-[4rem]': !footer,
            'px-[2rem]': true,
          },
          'flex flex-1 flex-col items-center justify-start',
          className
        )}
      >
        {children}
      </main>
      {footer}
    </div>
  );
};

export default Layout;
