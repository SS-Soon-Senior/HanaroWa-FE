import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'disabled' | 'lightgray' | 'line';
  sizeType?: 'lg' | 'md' | 'sm' | 'xs' | 'reserve';
}

const Button = ({
  variant = 'green',
  sizeType = 'md',
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const baseStyles = 'w-full flex items-center justify-center';
  const variantStyles = {
    green: 'bg-main text-white',
    disabled: 'bg-disable text-white',
    lightgray: 'bg-gray4f6 text-gray280 border border-gray7eb',
    line: 'bg-opacity-0  text-black border border-grayaaa',
  };

  const sizeTypeStyles = {
    lg: 'font-bold-22 rounded-8 py-[1.7rem]',
    md: 'font-medium-22 rounded-16 py-[1.1rem]',
    sm: 'font-medium-20 rounded-12 py-[1.4rem]',
    xs: 'font-medium-16 rounded-8 py-[1.1rem]',
    reserve: 'font-medium-18 rounded-6 py-[1.4rem]',
  };

  return (
    <button
      type='button'
      className={`${baseStyles} ${variantStyles[variant]} ${sizeTypeStyles[sizeType]} ${className}`}
      disabled={variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
