import { BaseInputProps } from '@/types/input';
import clsx from 'clsx';
import * as React from 'react';
import { useId, forwardRef } from 'react';

export const InputUnderline = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      id,
      disabled,
      className,
      containerClassName,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? `inp-${autoId}`;

    return (
      <div
        className={clsx(
          'border-gray4a9 flex border-b-[0.2rem] bg-transparent py-[1rem]',
          fullWidth && 'w-full',
          containerClassName
        )}
      >
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={clsx(
            'font-medium-18 placeholder:text-gray4a9 w-full bg-transparent text-black outline-none',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
InputUnderline.displayName = 'InputUnderline';
