import { cn } from '@/utils/utils';
import { clsx } from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
};

const Layout = ({ children, header, footer }: PropsWithChildren<Props>) => {
  return (
    <div className='relative mx-auto flex min-h-dvh max-w-[768px] flex-col'>
      {header}
      <main
        className={cn(
          {
            'pt-[9rem]': !!header,
            'pb-[11.5rem]': !!footer,
            'pb-[4rem]': !footer,
            'px-[2rem]': true,
          },
          'flex flex-1 flex-col items-center justify-start'
        )}
      >
        {children}
      </main>
      {footer}
    </div>
  );
};

export default Layout;
