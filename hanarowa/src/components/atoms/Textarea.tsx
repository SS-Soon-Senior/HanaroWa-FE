import clsx from 'clsx';
import * as React from 'react';
import { useId, forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
    const inputId = id ?? `tex-${autoId}`;

    return (
      <div
        className={clsx(
          'border-gray7eb rounded-16 flex border-[0.2rem] bg-white px-[2rem] py-[1.7rem]',
          fullWidth && 'w-full',
          containerClassName
        )}
      >
        <textarea
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={clsx(
            'font-medium-18 placeholder:text-gray3af w-full resize-none bg-transparent text-black outline-none',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';
export default TextArea;
