import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  location: string;
  branch: string;
}

const BranchButton = ({
  disabled = false,
  className,
  location,
  branch,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const baseStyles =
    'w-full rounded-16 aspect-square flex flex-col items-start justify-center gap-[0.7rem] shadow-button px-[1.7rem] py-[4rem] bg-white border border-gray-200 hover:bg-gray-50 transition-colors';

  return (
    <button
      className={clsx(baseStyles, className)}
      disabled={disabled}
      {...props}
    >
      <span className='font-bold-24 text-main text-left'>{location}</span>
      <span className='font-bold-22 text-left whitespace-pre text-black'>
        {branch}
      </span>
      {children}
    </button>
  );
};

export default BranchButton;
