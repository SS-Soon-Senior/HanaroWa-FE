'use client';

import { Input, Textarea } from '@/components';
import type { components } from '@/types/api';
import type { LessonFormData } from '@/types/lesson';

interface BasicInfoFieldsProps {
  formData: LessonFormData;
  isAdmin: boolean;
  branches?: components['schemas']['BranchResponseDTO'][];
  onInputChange: (
    field: keyof LessonFormData,
    value: string | boolean | File | null | string[]
  ) => void;
}

export const BasicInfoFields = ({
  formData,
  isAdmin,
  onInputChange,
}: BasicInfoFieldsProps) => {
  return (
    <>
      {/* 강좌 제목 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강좌 제목</h2>
        <Input
          type='text'
          placeholder='예) 디지털 카메라 기초 완성'
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          fullWidth
          containerClassName='!h-[5.6rem] !px-[2rem] !py-0'
        />
      </div>

      {/* 강사 이름 (관리자만) */}
      {isAdmin && (
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강사 이름</h2>
          <Input
            type='text'
            placeholder='외부 강사 이름을 입력하세요'
            value={formData.instructorName}
            onChange={(e) => onInputChange('instructorName', e.target.value)}
            fullWidth
            containerClassName='!h-[5.6rem] !px-[2rem] !py-0'
          />
        </div>
      )}

      {/* 강사 소개 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강사 소개</h2>
        <Textarea
          placeholder='자기소개를 작성해주세요 경력, 전문분야, 강좌 스타일 등을 포함해주세요'
          value={formData.instructorIntro}
          onChange={(e) => onInputChange('instructorIntro', e.target.value)}
          rows={4}
          fullWidth
          containerClassName='!w-full !h-[12rem] !px-[2rem] !py-[2rem] !pb-[3.2rem] !gap-[0.6rem]'
        />
      </div>

      {/* 강좌 소개 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강좌 소개</h2>
        <Textarea
          placeholder='강좌 내용과 목표를 자세히 작성해주세요'
          value={formData.lessonIntro}
          onChange={(e) => onInputChange('lessonIntro', e.target.value)}
          rows={4}
          fullWidth
          containerClassName='!w-full !h-[12rem] !px-[2rem] !py-[2rem] !pb-[3.2rem] !gap-[0.6rem]'
        />
      </div>
    </>
  );
};