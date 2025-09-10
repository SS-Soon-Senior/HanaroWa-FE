'use client';

import { DatePicker, Dropdown } from '@/components';
import { MultiDaySelector } from '@/components/lesson/MultiDaySelector';
import { timeOptions } from '@/constants/lesson-options';
import type { LessonFormData } from '@/types/lesson';

interface ScheduleFieldsProps {
  formData: LessonFormData;
  disabledTimeSlots: string[];
  isCheckingAvailability: boolean;
  onInputChange: (
    field: keyof LessonFormData,
    value: string | boolean | File | null | string[]
  ) => void;
  getTodayFormatted: () => string;
}

export const ScheduleFields = ({
  formData,
  disabledTimeSlots,
  isCheckingAvailability,
  onInputChange,
  getTodayFormatted,
}: ScheduleFieldsProps) => {
  return (
    <>
      {/* 강의 시작일 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 시작일</h2>
        <DatePicker
          value={formData.startDate}
          onChange={(value) => onInputChange('startDate', value)}
          placeholder={getTodayFormatted()}
          className='!h-[5.6rem] !px-[2rem] !py-0'
          minDate={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* 강의 종료일 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 종료일</h2>
        <DatePicker
          value={formData.endDate}
          onChange={(value) => onInputChange('endDate', value)}
          placeholder={getTodayFormatted()}
          className='!h-[5.6rem] !px-[2rem] !py-0'
          minDate={formData.startDate || new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* 강의 요일 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 요일</h2>
        <MultiDaySelector
          value={formData.days}
          placeholder='월, 수'
          onChange={(value) => onInputChange('days', value)}
          className='!h-[5.6rem] !px-[2rem] !py-0'
        />
      </div>

      {/* 강의 시간 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 시간</h2>
        <Dropdown
          options={timeOptions.map((option) => ({
            ...option,
            disabled: disabledTimeSlots.includes(option.value),
          }))}
          value={formData.time}
          placeholder='11:00 ~ 13:00'
          onChange={(value) => onInputChange('time', value)}
          className='!h-[5.6rem] !px-[2rem] !py-0'
        />
        {isCheckingAvailability && (
          <p className='mt-2 text-sm text-gray-500'>시간대 확인 중...</p>
        )}
      </div>
    </>
  );
};