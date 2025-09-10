'use client';

import type { components } from '@/types/api';
import type { LessonFormData, Lesson } from '@/types/lesson';
import React from 'react';
import { LessonForm } from './LessonForm';

interface LessonEditFormFieldsProps {
  formData: LessonFormData;
  imageError?: string;
  disabledTimeSlots?: string[];
  isCheckingAvailability?: boolean;
  isAdmin?: boolean;
  branches?: components['schemas']['BranchResponseDTO'][];
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  onInputChange: (
    field: keyof LessonFormData,
    value: string | boolean | File | null | string[]
  ) => void;
  onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage?: () => void;
  onAddContent: () => void;
  onAdditionalContentChange: (index: number, value: string) => void;
  onRemoveAdditionalContent: (index: number) => void;
  getTodayFormatted?: () => string;
  initial?: Lesson | null;
}

export const LessonEditFormFields = ({
  imageError = '',
  disabledTimeSlots = [],
  isCheckingAvailability = false,
  isAdmin = false,
  branches = [],
  fileInputRef = { current: null },
  onImageUpload = () => {},
  onRemoveImage = () => {},
  getTodayFormatted = () => new Date().toISOString().split('T')[0],
  initial = null,
  ...props
}: LessonEditFormFieldsProps) => {
  return (
    <LessonForm
      mode='edit'
      imageError={imageError}
      disabledTimeSlots={disabledTimeSlots}
      isCheckingAvailability={isCheckingAvailability}
      isAdmin={isAdmin}
      branches={branches}
      fileInputRef={fileInputRef}
      onImageUpload={onImageUpload}
      onRemoveImage={onRemoveImage}
      getTodayFormatted={getTodayFormatted}
      initial={initial}
      {...props}
    />
  );
};
