'use client';

import { Input, Dropdown } from '@/components';
import { categoryOptions } from '@/constants/lesson-options';
import type { components } from '@/types/api';
import type { LessonFormData } from '@/types/lesson';
import {
  handleNumberKeyDown,
  handleNumberInput,
  createNumberChangeHandler,
} from '@/utils/numberInput';

interface CategoryAndBranchFieldsProps {
  formData: LessonFormData;
  isAdmin: boolean;
  branches: components['schemas']['BranchResponseDTO'][];
  onInputChange: (
    field: keyof LessonFormData,
    value: string | boolean | File | null | string[]
  ) => void;
}

export const CategoryAndBranchFields = ({
  formData,
  isAdmin,
  branches,
  onInputChange,
}: CategoryAndBranchFieldsProps) => {
  return (
    <>
      {/* 비용 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>비용</h2>
        <Input
          type='number'
          placeholder='10,000'
          value={formData.fee}
          onChange={createNumberChangeHandler('fee', (field, value) =>
            onInputChange(field as keyof LessonFormData, value)
          )}
          onKeyDown={handleNumberKeyDown}
          onInput={handleNumberInput}
          fullWidth
          containerClassName='!h-[5.6rem] !px-[2rem] !py-0'
        />
      </div>

      {/* 카테고리 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>카테고리</h2>
        <Dropdown
          options={categoryOptions}
          value={formData.category}
          placeholder='카테고리를 선택하세요'
          onChange={(value) => onInputChange('category', value)}
          className='!h-[5.6rem] !px-[2rem] !py-0'
        />
      </div>

      {/* 지점 선택 (관리자만) */}
      {isAdmin && (
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>지점 선택</h2>
          <Dropdown
            options={branches.map((branch) => ({
              label: branch.locationName 
                ? `${branch.locationName} ${branch.branchName}` 
                : branch.branchName || '',
              value: String(branch.branchId || ''),
            }))}
            value={formData.branchId}
            placeholder='지점을 선택하세요'
            onChange={(value) => onInputChange('branchId', value)}
            className='!h-[5.6rem] !px-[2rem] !py-0'
          />
        </div>
      )}
    </>
  );
};