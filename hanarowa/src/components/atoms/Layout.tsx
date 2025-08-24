import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
};

const Layout = ({ children, header, footer }: PropsWithChildren<Props>) => {
  return (
    <div className='relative mx-auto min-h-screen max-w-[768px]'>
      {header}
      <main
        className={clsx({
          'pt-[6rem]': !!header,
          'pb-[11.5rem]': !!footer,
          'pb-[4rem]': !footer,
          'px-[2rem]': true,
        })}
      >
        {children}
      </main>
      {footer}
    </div>
  );
};

export default Layout;
