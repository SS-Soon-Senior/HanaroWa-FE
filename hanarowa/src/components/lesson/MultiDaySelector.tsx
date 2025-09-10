'use client';

import { individualDayOptions, dayOptions } from '@/constants';
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

    // 기존 value → 선택 요일 역산
    useEffect(() => {
      if (!value) {
        setSelectedDays([]);
        return;
      }

      // 특별한 한글 값들 처리
      if (value === '매일') {
        const allDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        setSelectedDays(allDays);
        return;
      }

      // 기존 시스템 값들을 먼저 확인 (mon-fri, tue-thu, weekend, daily)
      const currentOption = dayOptions.find((opt) => opt.value === value);
      if (currentOption) {
        // daily는 모든 요일
        if (value === 'daily') {
          const allDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
          setSelectedDays(allDays);
          return;
        }

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
        return;
      }

      // value가 콤마 또는 하이픈으로 구분된 요일들인 경우 (커스텀 조합)
      if (value.includes(',') || value.includes('-')) {
        const separator = value.includes(',') ? ',' : '-';
        const parts = value.split(separator).map((part) => part.trim());

        // 한글 요일을 영문 코드로 변환
        const dayMapping: Record<string, string> = {
          월: 'mon',
          화: 'tue',
          수: 'wed',
          목: 'thu',
          금: 'fri',
          토: 'sat',
          일: 'sun',
        };

        const days = parts
          .map((part) => dayMapping[part] || part) // 한글이면 영문으로, 아니면 그대로
          .filter((day) =>
            ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].includes(day)
          );
        setSelectedDays(days);
        return;
      }

      // 단일 요일인 경우 (예: "mon")
      if (['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].includes(value)) {
        setSelectedDays([value]);
        return;
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

      // 특정 조합들을 기존 시스템 값으로 매핑
      const mappingToSystemValues = (days: string[]): string => {
        const key = days.join(',');
        const mapping: Record<string, string> = {
          'mon,wed': 'mon-wed',
          'tue,thu': 'tue-thu',
          'mon,tue,wed,thu,fri': 'mon-fri',
          'sat,sun': 'weekend',
          'mon,tue,wed,thu,fri,sat,sun': 'daily',
        };

        return mapping[key] || days.join('-');
      };

      // 선택이 없으면 빈 문자열 전달, 있으면 매핑된 값 전달
      if (sorted.length === 0) {
        onChange('');
      } else {
        const mappedValue = mappingToSystemValues(sorted);
        onChange(mappedValue);
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
              hasSelection ? 'text-black' : 'text-gray3af',
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
