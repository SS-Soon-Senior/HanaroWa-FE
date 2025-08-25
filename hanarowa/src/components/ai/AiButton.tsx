'use client';

import { IcRightChevron } from '@/assets/svg';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

type AiButtonProps = {
  onClick?: () => void;
  leftContent?: ReactNode;
  title?: string;
  content: string;
};

const AiButton = ({ onClick, leftContent, title, content }: AiButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='border-gray7eb rounded-12 flex w-full items-center justify-between gap-[1.2rem] border-[0.1rem] bg-white p-[1.6rem]'
    >
      {leftContent && <div>{leftContent}</div>}
      <div className='flex flex-1 flex-col items-start justify-start gap-[0.4rem]'>
        {title && <p className='font-bold-20 text-black'>{title}</p>}
        <p
          className={cn(
            'font-medium-18',
            title ? 'text-gray3af' : 'text-black'
          )}
        >
          {content}
        </p>
      </div>
      <IcRightChevron width={16} height={16} />
    </button>
  );
};
export default AiButton;
