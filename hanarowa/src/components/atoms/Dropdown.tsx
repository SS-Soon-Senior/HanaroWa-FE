import { DropdownProps } from '@/types/dropdown';
import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';
import { useId, forwardRef } from 'react';
import Button from './Button';

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      id,
      options,
      value,
      placeholder = '선택해주세요',
      onChange,
      className,
      containerClassName,
      disabled = false,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const autoId = useId();
    const dropdownId = id ?? `dropdown-${autoId}`;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (optionValue: string) => {
      onChange(optionValue);
      setIsOpen(false);
    };

    return (
      <div
        id={dropdownId}
        ref={dropdownRef}
        className={clsx('relative', fullWidth && 'w-full', containerClassName)}
        {...props}
      >
        <div
          className={clsx(
            'border-gray7eb rounded-16 flex w-full cursor-pointer items-center justify-between border-[0.2rem] bg-white px-[2rem] py-[1.7rem]',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span
            className={clsx(
              'font-medium-18',
              selectedOption ? 'text-black' : 'text-gray3af'
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={clsx(
              'text-gray3af h-[2rem] w-[2rem] transition-transform duration-200',
              isOpen && 'rotate-180 transform'
            )}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>

        {isOpen && !disabled && (
          <div className='border-gray7eb rounded-16 absolute z-10 mt-[0.5rem] max-h-[24rem] w-full overflow-auto border-[0.2rem] bg-white shadow-lg'>
            {options.map((option, index) => (
              <Button
                key={option.value}
                variant={value === option.value ? 'lightgray' : 'line'}
                sizeType='xs'
                onClick={() => handleSelect(option.value)}
                className={clsx(
                  'hover:bg-gray4f6 focus:bg-gray4f6 justify-start border-none bg-transparent text-left',
                  value === option.value && 'text-main bg-gray4f6',
                  index === 0 && 'rounded-14',
                  index === options.length - 1 && 'rounded-14',
                  'rounded-none'
                )}
              >
                {option.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
