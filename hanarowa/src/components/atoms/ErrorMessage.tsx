import { IcExclamationMark } from '@/assets/svg';
import { cn } from '@/utils/utils';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  align?: 'text-left' | 'text-center' | 'text-right';
};

const ErrorMessage = ({
  className,
  children,

  align = 'text-left',
}: PropsWithChildren<Props>) => {
  return (
    <div className='flex flex-row items-center gap-[0.5rem]'>
      <IcExclamationMark height={17} width={17} />
      <span
        className={cn(
          `font-medium-17 text-red bg-transparent ${align} ${className}`
        )}
      >
        {children}
      </span>
    </div>
  );
};

export default ErrorMessage;
