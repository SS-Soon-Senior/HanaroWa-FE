import { IcExclamationMark } from '@/assets/svg';
import { cn } from '@/utils/utils';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  align?: 'text-left' | 'text-center' | 'text-right';
};

export default function ErrorMessage({
  className,
  children,

  align = 'text-left',
}: PropsWithChildren<Props>) {
  return (
    <div className='flex flex-row gap-[0.5rem] items-center'>
      <IcExclamationMark height={17} width={17} />
      <span
        className={cn(
          `bg-transparent font-medium-17 text-red ${align} 
        ${className}`
        )}
      >
        {children}
      </span>
    </div>
  );
}
