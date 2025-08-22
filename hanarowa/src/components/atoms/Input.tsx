import { BaseInputProps } from '@/types/input';
import clsx from 'clsx';
import * as React from 'react';
import { useId, forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      id,
      disabled,
      className,
      containerClassName,
      fullWidth = false,
      rightContent,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? `inp-${autoId}`;

    return (
      <div
        className={clsx(
          'border-gray7eb flex rounded-[1.6rem] border-[0.2rem] bg-white px-[2rem] py-[1.7rem]',
          fullWidth && 'w-full',
          containerClassName
        )}
      >
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={clsx(
            'font-medium-18 placeholder:text-gray3af w-full bg-transparent text-black outline-none',
            className
          )}
          {...props}
        />
        {rightContent && <>{rightContent}</>}
      </div>
    );
  }
);
Input.displayName = 'Input';
