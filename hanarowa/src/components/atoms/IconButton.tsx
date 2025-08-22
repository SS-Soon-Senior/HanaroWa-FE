import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  disabled?: boolean;
}

const IconButton = ({
  disabled = false,
  className,
  icon,
  title,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const baseStyles =
    'size-[75px] rounded-16 flex flex-col items-center justify-center gap-2 shadow-button';

  return (
    <button
      className={clsx(baseStyles, className)}
      disabled={disabled}
      {...props}
    >
      {icon}
      <span className='font-medium-16 text-black'>{title}</span>
      {children}
    </button>
  );
};

export default IconButton;
