'use client';

import { IcCalendar } from '@/assets/svg';
import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '날짜를 선택하세요',
  className = '',
  minDate,
  maxDate,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(date);
    onChange(formattedDate);
    setIsOpen(false);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 달력 그리기
  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = selectedDate || today;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // 해당 월의 첫 번째 날과 마지막 날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // 주 시작을 일요일로

    const weeks = [];
    let currentWeek = [];
    let currentDate = new Date(startDate);

    // 6주치 달력 생성
    for (let i = 0; i < 42; i++) {
      const dateObj = new Date(currentDate);
      const isCurrentMonth = dateObj.getMonth() === month;
      const isToday = dateObj.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && dateObj.toDateString() === selectedDate.toDateString();

      // 최소/최대 날짜 체크
      const isDisabled =
        (minDate && dateObj < new Date(minDate)) ||
        (maxDate && dateObj > new Date(maxDate));

      currentWeek.push({
        date: dateObj,
        isCurrentMonth,
        isToday,
        isSelected,
        isDisabled,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
      <div className='border-gray7eb rounded-16 absolute top-full left-0 z-50 mt-1 w-full border-[0.2rem] bg-white p-4 shadow-lg'>
        {/* 헤더 */}
        <div className='mb-4 flex items-center justify-between'>
          <button
            type='button'
            onClick={() => {
              const prevMonth = new Date(year, month - 1, 1);
              setSelectedDate(prevMonth);
            }}
            className='rounded p-2 font-medium-20 hover:bg-gray-100'
          >
            ‹
          </button>
          <h3 className='font-medium-20 font-semibold'>
            {year}년 {month + 1}월
          </h3>
          <button
            type='button'
            onClick={() => {
              const nextMonth = new Date(year, month + 1, 1);
              setSelectedDate(nextMonth);
            }}
            className='rounded p-2 font-medium-20 hover:bg-gray-100'
          >
            ›
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className='mb-2 grid grid-cols-7 gap-1'>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div
              key={day}
              className='p-2 text-center font-medium-16 text-gray-500'
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className='grid grid-cols-7 gap-1'>
          {weeks.map((week, weekIndex) =>
            week.map((dayData, dayIndex) => (
              <button
                key={`${weekIndex}-${dayIndex}`}
                type='button'
                onClick={() =>
                  !dayData.isDisabled && handleDateSelect(dayData.date)
                }
                disabled={!!dayData.isDisabled}
                className={`rounded p-2 font-medium-16 transition-colors hover:bg-gray-100 ${!dayData.isCurrentMonth ? 'text-gray-300' : 'text-gray-900'} ${dayData.isToday ? 'bg-blue-100 text-blue-600' : ''} ${dayData.isSelected ? 'bg-green-500 text-white hover:bg-green-600' : ''} ${dayData.isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `}
              >
                {dayData.date.getDate()}
              </button>
            ))
          )}
        </div>
      </div>
    );
  };

  // 외부 클릭 시 달력 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className='relative' ref={containerRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={clsx(
          'border-gray7eb flex items-center justify-between rounded-[1.6rem] border-[0.2rem] bg-white px-[2rem] py-[1.7rem] transition-colors',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className
        )}
      >
        <span
          className={clsx(
            'font-medium-18',
            value ? 'text-black' : 'text-gray3af'
          )}
        >
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <IcCalendar width={20} height={20} />
      </div>

      {isOpen && renderCalendar()}
    </div>
  );
};

export default DatePicker;
