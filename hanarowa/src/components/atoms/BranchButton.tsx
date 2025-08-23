import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  location: string;
  title: string;
}

const BranchButton = ({
  disabled = false,
  className,
  location,
  title,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const baseStyles =
    'w-full rounded-16 aspect-square flex flex-col items-start justify-center gap-[0.7rem] shadow-button px-[1.7rem] py-[4rem]';

  return (
    <button
      className={clsx(baseStyles, className)}
      disabled={disabled}
      {...props}
    >
      <span className='font-bold-24 text-main text-left'>{location}</span>
      <span className='font-bold-22 text-left text-black'>{title}</span>
      {children}
    </button>
  );
};

export default BranchButton;
