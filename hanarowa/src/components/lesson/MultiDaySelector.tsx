'use client';

import {
  individualDayOptions,
  daySelectionMapping,
  dayOptions,
} from '@/constants';
import { cn } from '@/utils/utils';
import { useState, useEffect, useRef, useId, forwardRef } from 'react';
import { Button } from '../atoms';

interface MultiDaySelectorProps {
  id?: string;
  value: string; // 예: 'mon-wed'
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
  labelClassName?: string;
  placeholderClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const MultiDaySelector = forwardRef<
  HTMLDivElement,
  MultiDaySelectorProps
>(
  (
    {
      id,
      value,
      placeholder,
      onChange,
      className,
      labelClassName,
      placeholderClassName,
      containerClassName,
      disabled = false,
      fullWidth = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const autoId = useId();
    const compId = id ?? `multiday-${autoId}`;

    // 외부 ref와 로컬 ref 결합
    const combinedRef = (node: HTMLDivElement | null) => {
      wrapperRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        ref.current = node;
      }
    };

    // 외부 클릭 시 닫기 (Dropdown과 동일한 방식)
    useEffect(() => {
      const onDocClick = (e: MouseEvent) => {
        if (!wrapperRef.current) return;
        if (!wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
      };
      document.addEventListener('mousedown', onDocClick);
      return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    // 기존 value → 선택 요일 역산 (자동 선택 제거)
    useEffect(() => {
      if (!value) {
        setSelectedDays([]);
        return;
      }
      // 편집 모드에서 기존 값이 있을 때만 역산해서 표시
      // 새로 생성할 때는 빈 상태로 시작
      const currentOption = dayOptions.find((opt) => opt.value === value);
      if (currentOption && selectedDays.length === 0) {
        const label = currentOption.label;
        const days: string[] = [];
        if (label.includes('월')) days.push('mon');
        if (label.includes('화')) days.push('tue');
        if (label.includes('수')) days.push('wed');
        if (label.includes('목')) days.push('thu');
        if (label.includes('금')) days.push('fri');
        if (label.includes('토')) days.push('sat');
        if (label.includes('일')) days.push('sun');
        setSelectedDays(days);
      }
    }, [value]);

    const toggleOpen = () => {
      if (!disabled) setIsOpen((p) => !p);
    };

    // 요일 토글 + 매핑
    const toggleDay = (dayValue: string) => {
      if (disabled) return;
      const next = selectedDays.includes(dayValue)
        ? selectedDays.filter((d) => d !== dayValue)
        : [...selectedDays, dayValue];

      const sorted = next.sort(
        (a, b) =>
          ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].indexOf(a) -
          ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].indexOf(b)
      );
      setSelectedDays(sorted);

      const selectionKey = sorted.join(',');
      // 선택이 없으면 빈 문자열 전달, 있으면 매핑된 값 전달
      if (sorted.length === 0) {
        onChange('');
      } else {
        const mapped = daySelectionMapping[selectionKey] || 'mon-wed';
        onChange(mapped);
      }
    };

    // 헤더 표시 텍스트 (선택 없음 → 빈 텍스트 또는 "요일 선택")
    const hasSelection = selectedDays.length > 0;
    const headerText = hasSelection
      ? selectedDays
          .map(
            (d) => individualDayOptions.find((o) => o.value === d)?.label ?? d
          )
          .join(', ')
      : '요일을 선택하세요';

    return (
      <div
        id={compId}
        ref={combinedRef}
        className={cn('relative', fullWidth && 'w-full', containerClassName)}
      >
        {/* ▼ 헤더(외형 CSS: Dropdown과 동일) */}
        <div
          className={cn(
            'border-gray7eb rounded-16 flex w-full cursor-pointer items-center justify-between border-[0.2rem] bg-white px-[2rem] py-[1.7rem]',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          onClick={toggleOpen}
        >
          <span
            className={cn(
              'font-medium-18',
              hasSelection ? 'text-black' : 'text-gray3af', // placeholder/label 색 처리
              labelClassName,
              !hasSelection && placeholderClassName
            )}
          >
            {headerText}
          </span>

          <svg
            className={cn(
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

        {/* ▼ 드롭다운 패널(외형 CSS: Dropdown과 동일) */}
        {isOpen && !disabled && (
          <div className='border-gray7eb rounded-16 absolute z-10 mt-[0.5rem] max-h-[24rem] w-full overflow-auto border-[0.2rem] bg-white shadow-lg'>
            <div className='p-[1.5rem]'>
              <div className='flex flex-col gap-[0.8rem]'>
                {individualDayOptions.map((day) => {
                  const selected = selectedDays.includes(day.value);
                  return (
                    <Button
                      key={day.value}
                      sizeType='sm'
                      variant={selected ? 'lightgray' : 'line'}
                      onClick={() => toggleDay(day.value)}
                      className={cn(
                        'h-[4rem] w-full justify-center px-[2rem]',
                        selected
                          ? 'bg-main border-main text-white'
                          : 'hover:bg-gray4f6',
                        'rounded-12'
                      )}
                    >
                      {day.fullName}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

MultiDaySelector.displayName = 'MultiDaySelector';
