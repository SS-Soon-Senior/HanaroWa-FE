'use client';

import type { components } from '@/types/api';
import type { LessonFormData } from '@/types/lesson';
import React from 'react';
import { LessonForm } from './LessonForm';

interface LessonFormFieldsProps {
  formData: LessonFormData;
  imageError: string;
  disabledTimeSlots: string[];
  isCheckingAvailability: boolean;
  isAdmin: boolean;
  branches?: components['schemas']['BranchResponseDTO'][];
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
}

export const LessonFormFields = (props: LessonFormFieldsProps) => {
  return <LessonForm mode='create' {...props} />;
};
