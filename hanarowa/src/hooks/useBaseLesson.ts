'use client';

import type { LessonFormData, LessonFormErrors } from '@/types/lesson';
import { validateLessonData } from '@/utils/lesson-mappers';
import React from 'react';
import { useState, useRef, useCallback } from 'react';

export interface BaseLessonConfig {
  initialData?: Partial<LessonFormData>;
  onSuccess?: () => void;
}

export function useBaseLessonForm(config: BaseLessonConfig = {}) {
  const { initialData, onSuccess } = config;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<string>('');

  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    instructorName: '',
    instructorIntro: '',
    lessonIntro: '',
    fee: '',
    category: '',
    branchId: '',
    startDate: '',
    endDate: '',
    days: '',
    time: '',
    lessonImage: null,
    lessonDescription: '',
    expectedParticipants: '20',
    additionalContents: [],
    ...initialData,
  });

  const [errors, setErrors] = useState<LessonFormErrors>({});

  const updateFormData = useCallback((newData: Partial<LessonFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  }, []);

  const handleInputChange = useCallback(
    (field: keyof LessonFormData, value: string | boolean | File | null | string[]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear field-specific error when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleAddContent = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      additionalContents: [...prev.additionalContents, ''],
    }));
  }, []);

  const handleAdditionalContentChange = useCallback(
    (index: number, value: string) => {
      setFormData((prev) => {
        const newContents = [...prev.additionalContents];
        newContents[index] = value;
        return { ...prev, additionalContents: newContents };
      });
    },
    []
  );

  const removeAdditionalContent = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalContents: prev.additionalContents.filter((_, i) => i !== index),
    }));
  }, []);

  const handleRemoveImage = useCallback(() => {
    handleInputChange('lessonImage', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImageError('');
  }, [handleInputChange]);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const maxSize = 512 * 1024; // 512KB

        if (file.size > maxSize) {
          setImageError('이미지 크기 512KB이하로 선택해주세요.');
          target.value = '';
          return;
        }

        setImageError('');
        handleInputChange('lessonImage', file);
      }
    },
    [handleInputChange]
  );

  const validateForm = useCallback(() => {
    const validation = validateLessonData(formData);
    const fieldErrors: LessonFormErrors = {};

    validation.errors.forEach((error) => {
      // Map error messages to field names (simplified mapping)
      if (error.includes('강좌명')) fieldErrors.title = error;
      else if (error.includes('강사명')) fieldErrors.instructorName = error;
      else if (error.includes('카테고리')) fieldErrors.category = error;
      else if (error.includes('시작일')) fieldErrors.startDate = error;
      else if (error.includes('종료일')) fieldErrors.endDate = error;
      else if (error.includes('요일')) fieldErrors.days = error;
      else if (error.includes('시간')) fieldErrors.time = error;
    });

    setErrors(fieldErrors);
    return validation.isValid;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      instructorName: '',
      instructorIntro: '',
      lessonIntro: '',
      fee: '',
      category: '',
      branchId: '',
      startDate: '',
      endDate: '',
      days: '',
      time: '',
      lessonImage: null,
      lessonDescription: '',
      expectedParticipants: '20',
      additionalContents: [],
      ...initialData,
    });
    setErrors({});
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [initialData]);

  return {
    // Form state
    formData,
    errors,
    imageError,

    // Refs
    fileInputRef,

    // Handlers
    handleInputChange,
    handleAddContent,
    handleAdditionalContentChange,
    removeAdditionalContent,
    handleRemoveImage,
    handleImageUpload,
    setFormData: updateFormData,

    // Utilities
    validateForm,
    resetForm,
    onSuccess,
  };
}