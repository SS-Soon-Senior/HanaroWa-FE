'use client';

import React from 'react';
import type { components } from '@/types/api';
import type { LessonFormData, Lesson } from '@/types/lesson';
import { BasicInfoFields } from './fields/BasicInfoFields';
import { CategoryAndBranchFields } from './fields/CategoryAndBranchFields';
import { ContentFields } from './fields/ContentFields';
import { ImageUploadField } from './fields/ImageUploadField';
import { ScheduleFields } from './fields/ScheduleFields';

export type LessonFormMode = 'create' | 'edit';

interface LessonFormProps {
  mode: LessonFormMode;
  isAdmin: boolean;
  branches?: components['schemas']['BranchResponseDTO'][];
  // 기본 필수 props
  formData: LessonFormData;
  imageError: string;
  disabledTimeSlots: string[];
  isCheckingAvailability: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (
    field: keyof LessonFormData,
    value: string | boolean | File | null | string[]
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onAddContent: () => void;
  onAdditionalContentChange: (index: number, value: string) => void;
  onRemoveAdditionalContent: (index: number) => void;
  getTodayFormatted: () => string;
  // 옵셔널 props (useLessonForm에서만 필요한 것들)
  isPending?: boolean;
  checkTimeAvailability?: () => Promise<void>;
  handleSubmit?: () => void;
  validateForm?: () => boolean;
  setFormData?: (newData: Partial<LessonFormData>) => void;
  initial?: Lesson | null;
}

export const LessonForm = ({
  mode,
  isAdmin,
  branches = [],
  formData,
  imageError,
  disabledTimeSlots,
  isCheckingAvailability,
  fileInputRef,
  onInputChange,
  onImageUpload,
  onRemoveImage,
  onAddContent,
  onAdditionalContentChange,
  onRemoveAdditionalContent,
  getTodayFormatted,
  initial,
  // 사용하지 않는 props들은 구조분해할당에서 제외하고 나머지로 처리
  ...rest
}: LessonFormProps) => {
  return (
    <div className='flex flex-col gap-[2.4rem]'>
      {/* Basic Information Section */}
      <BasicInfoFields
        formData={formData}
        isAdmin={isAdmin}
        branches={branches}
        onInputChange={onInputChange}
      />

      {/* Category and Branch Section */}
      <CategoryAndBranchFields
        formData={formData}
        isAdmin={isAdmin}
        branches={branches}
        onInputChange={onInputChange}
      />

      {/* Schedule Section */}
      <ScheduleFields
        formData={formData}
        disabledTimeSlots={disabledTimeSlots}
        isCheckingAvailability={isCheckingAvailability}
        onInputChange={onInputChange}
        getTodayFormatted={getTodayFormatted}
      />

      {/* Image Upload Section */}
      <ImageUploadField
        formData={formData}
        imageError={imageError}
        fileInputRef={fileInputRef}
        onInputChange={onInputChange}
        onImageUpload={onImageUpload}
        onRemoveImage={onRemoveImage}
      />

      {/* Content Section */}
      <ContentFields
        formData={formData}
        onInputChange={onInputChange}
        onAddContent={onAddContent}
        onAdditionalContentChange={onAdditionalContentChange}
        onRemoveAdditionalContent={onRemoveAdditionalContent}
      />
    </div>
  );
};